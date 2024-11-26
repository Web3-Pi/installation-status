import { networkInterfaces } from "os";
import { NotFoundError } from "./error";

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
    throw new Error("No hostname found");
  }
}

export async function handleApiRequest(req: Request) {
  const url = new URL(req.url);
  const route = url.pathname.replace("/api", "");
  switch (route) {
    case "/health":
      return new Response(JSON.stringify("OK"));
    case "/uptime":
      return new Response(JSON.stringify({ uptime: await getUptime() }));
    case "/ip":
      return new Response(JSON.stringify({ ip: await getIp() }));
    case "/hostname":
      return new Response(JSON.stringify({ hostname: await getHostname() }));
    default:
      return new Response("Not found", { status: 404 });
  }
}
