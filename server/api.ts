import { networkInterfaces } from "os";
import { NotFoundError } from "./error";
import { z } from "zod";

if (!Bun.env.LOG_PATH) {
  console.log("LOG_PATH not specified, using /var/log/web3pi.log");
}

if (!Bun.env.JLOG_PATH) {
  console.log("JLOG_PATH not specified, using /opt/web3pi/status.jlog");
}

async function getUptime() {
  const systemUptime = await Bun.file("/proc/uptime").text();
  const uptime = parseFloat(systemUptime.split(" ")[0]);
  return uptime;
}

async function getIp() {
  const interfacesToCheck = ["eth0", "wlan0"];
  const interfaces = networkInterfaces();
  for (const name of interfacesToCheck) {
    const iface = interfaces[name];
    if (!iface) continue;
    for (const alias of iface) {
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
  throw new NotFoundError("No IP address found");
}

async function getHostname() {
  try {
    const hostname = await Bun.file("/etc/hostname").text();
    return hostname.trim();
  } catch {
    throw new NotFoundError("No hostname found");
  }
}

const schema = z.array(
  z.object({
    time: z.string(),
    stage: z.string(),
    status: z.string(),
    level: z.string(),
  })
);

async function getStages() {
  const filePath = Bun.env.JLOG_PATH || "/opt/web3pi/status.jlog";
  const rawLogs = await Bun.file(filePath).text();
  const logs = rawLogs
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line.trim()));
  const parsedLogs = schema.parse(logs);

  const logsByStage = Object.groupBy(parsedLogs, (log) => log.stage);
  const currentStage = (() => {
    const lastLog = parsedLogs.at(-1);
    if (!lastLog) return 0;
    if (lastLog.stage === "100" && lastLog.status === "Installation completed")
      return -1;
    return Number(lastLog.stage);
  })();

  function getStageStatus(stage: number) {
    const lastLog = logsByStage[stage]?.at(-1);
    if (!lastLog) return "todo";
    if (lastLog.level === "ERROR") return "error";
    if (currentStage === stage) return "in-progress";
    return "done";
  }
  return [
    {
      number: 0,
      name: "Install essential dependencies",
      logs: logsByStage[0] || [],
      status: getStageStatus(0),
    },
    {
      number: 1,
      name: "Install HTTP status service",
      logs: logsByStage[1] || [],
      status: getStageStatus(1),
    },
    {
      number: 2,
      name: "Update firmware",
      logs: logsByStage[2] || [],
      status: getStageStatus(2),
    },
    {
      number: 3,
      name: "Main installation",
      logs: logsByStage[3] || [],
      status: getStageStatus(3),
    },
    {
      number: 100,
      name: "Start installed services",
      logs: logsByStage[100] || [],
      status: getStageStatus(100),
    },
  ];
}

async function getLogs() {
  const filePath = Bun.env.LOG_PATH || "/var/log/web3pi.log";
  const rawLogs = await Bun.file(filePath).text();
  return rawLogs;
}

export async function handleApiRequest(req: Request) {
  const url = new URL(req.url);
  const route = url.pathname.replace("/api", "");
  switch (route) {
    case "/health":
      return new Response(JSON.stringify("OK"));
    case "/uptime":
      return new Response(JSON.stringify({ uptime: await getUptime() }), {
        headers: { "Content-Type": "application/json" },
      });
    case "/ip":
      return new Response(JSON.stringify({ ip: await getIp() }), {
        headers: { "Content-Type": "application/json" },
      });
    case "/hostname":
      return new Response(JSON.stringify({ hostname: await getHostname() }), {
        headers: { "Content-Type": "application/json" },
      });
    case "/stages":
      return new Response(JSON.stringify(await getStages()), {
        headers: { "Content-Type": "application/json" },
      });
    case "/logs":
      return new Response(await getLogs(), {
        headers: { "Content-Type": "text/plain" },
      });
    default:
      return new Response("Not found", { status: 404 });
  }
}
