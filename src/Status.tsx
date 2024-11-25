import { AlertCircle, Plug, Unplug } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Stage } from "./Stage";
import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";

const STAGES = [
  { number: 0, name: "rc.local - started", status: "done" },
  { number: 0, name: "Checking internet connection", status: "done" },
  {
    number: 0,
    name: "rc.local - Install essential dependencies",
    status: "done",
  },
  { number: 0, name: "rc.local - time sync with NTP", status: "done" },
  {
    number: 0,
    name: "rc.local - Ethereum-On-Raspberry-Pi repo clone",
    status: "done",
  },
  { number: 1, name: "rc.local - Run installation script", status: "done" },
  { number: 1, name: "install.sh - start", status: "done" },
  { number: 1, name: "Clone basic-status-http repository", status: "done" },
  { number: 1, name: "Configure HTTP status service", status: "done" },
  {
    number: 2,
    name: "Run HTTP status service",
    status: "error",
    errorMessage:
      "Unable to start the HTTP service. Double check that there are no firewall rules preventing the device from accessing the internet.",
  },
  { number: 3, name: "stop unattended-upgrades.service", status: "todo" },
  { number: 3, name: "Firmware Update", status: "todo" },
  { number: 3, name: "Rebooting after rpi-eeprom-update", status: "todo" },
  { number: 3, name: "rc.local exit 0", status: "todo" },
  { number: 3, name: "rc.local - started", status: "todo" },
  { number: 3, name: "Checking internet connection", status: "todo" },
  { number: 3, name: "rc.local - Run installation script", status: "todo" },
  { number: 3, name: "install.sh - start", status: "todo" },
  { number: 3, name: "Run HTTP status service", status: "todo" },
  { number: 3, name: "stop unattended-upgrades.service", status: "todo" },
  { number: 3, name: "time sync with NTP", status: "todo" },
  { number: 3, name: "Adding Ethereum repositories", status: "todo" },
  { number: 3, name: "Adding nimbus repositories", status: "todo" },
  { number: 3, name: "Adding Grafana repositories", status: "todo" },
  { number: 3, name: "Installing required dependencies", status: "todo" },
  { number: 3, name: "Looking for a valid drive", status: "todo" },
  { number: 3, name: "rc.local exit 0", status: "todo" },
  { number: 3, name: "rc.local - started", status: "todo" },
  { number: 3, name: "Checking internet connection", status: "todo" },
  { number: 3, name: "rc.local - Run installation script", status: "todo" },
  { number: 3, name: "install.sh - start", status: "todo" },
  { number: 3, name: "Run HTTP status service", status: "todo" },
  { number: 3, name: "stop unattended-upgrades.service", status: "todo" },
  { number: 3, name: "time sync with NTP", status: "todo" },
  { number: 3, name: "Adding Ethereum repositories", status: "todo" },
  { number: 3, name: "Adding nimbus repositories", status: "todo" },
  { number: 3, name: "Adding Grafana repositories", status: "todo" },
  { number: 3, name: "Installing required dependencies", status: "todo" },
  { number: 3, name: "Looking for a valid drive", status: "todo" },
  {
    number: 3,
    name: "Preparing /dev/nvme0n1 for installation",
    status: "todo",
  },
  { number: 3, name: "ACCOUNT CONFIGURATION", status: "todo" },
  { number: 3, name: "SWAP SPACE CONFIGURATION", status: "todo" },
  { number: 3, name: "ETHEREUM INSTALLATION", status: "todo" },
  { number: 3, name: "MISC CONF STEPS", status: "todo" },
  { number: 3, name: "Istalling UFW (firewall)", status: "todo" },
  { number: 3, name: "Configuring UFW (firewall)", status: "todo" },
  { number: 3, name: "Enable UFW (firewall)", status: "todo" },
  { number: 3, name: "Installing InfluxDB v1.8.10", status: "todo" },
  { number: 3, name: "Installing Grafana", status: "todo" },
  { number: 3, name: "Start Grafana", status: "todo" },
  { number: 3, name: "SERVICES CONFIGURATION", status: "todo" },
  { number: 3, name: "CLIENTS CONFIGURATION", status: "todo" },
  {
    number: 3,
    name: "Adding client directories required to run the node",
    status: "todo",
  },
  { number: 3, name: "CONVENIENCE CONFIGURATION", status: "todo" },
  { number: 3, name: "CLEANUP", status: "todo" },
  { number: 3, name: "READ CONFIG FROM CONFIG.TXT", status: "todo" },
  { number: 100, name: "Rebooting...", status: "todo" },
  { number: 100, name: "rc.local - started", status: "todo" },
  { number: 100, name: "Checking internet connection", status: "todo" },
  { number: 100, name: "rc.local - Run installation script", status: "todo" },
  { number: 100, name: "install.sh - start", status: "todo" },
  { number: 100, name: "Run HTTP status service", status: "todo" },
  {
    number: 100,
    name: "Not First Run - READ CONFIG FROM CONFIG.TXT",
    status: "todo",
  },
  { number: 100, name: "END install.sh exit 0", status: "todo" },
  { number: 100, name: "rc.local exit 0", status: "todo" },
  { number: 100, name: "Installation completed", status: "todo" },
  { number: 100, name: "rc.local - started", status: "todo" },
  { number: 100, name: "Checking internet connection", status: "todo" },
  { number: 100, name: "rc.local - Run installation script", status: "todo" },
  { number: 100, name: "install.sh - start", status: "todo" },
  { number: 100, name: "Run HTTP status service", status: "todo" },
  {
    number: 100,
    name: "Not First Run - READ CONFIG FROM CONFIG.TXT",
    status: "todo",
  },
  { number: 100, name: "END install.sh exit 0", status: "todo" },
  { number: 100, name: "rc.local exit 0", status: "todo" },
  { number: 100, name: "Installation completed", status: "todo" },
] as {
  number: number;
  name: string;
  status: "todo" | "done" | "error" | "in-progress";
  errorMessage?: string;
}[];

const CONNECTION_STATUS: "connected" | "disconnected" = "disconnected";

export function Status() {
  const stages = Object.groupBy(STAGES, (stage) => stage.number);

  const stageWithError = STAGES.find((stage) => stage.status === "error");

  return (
    <section className="flex flex-col md:grid  grid-cols-3 gap-4 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Connection status</CardTitle>
        </CardHeader>
        <CardContent>
          {CONNECTION_STATUS === "connected" ? (
            <div className="flex gap-1">
              <Plug className="text-green-500" />
              <p className="font-bold text-lg text-green-500">Connected</p>
            </div>
          ) : (
            <>
              <div className="flex gap-1">
                <Unplug className="text-red-500" />
                <p className="font-bold text-lg text-red-500">Disconnected</p>
              </div>
              <p className="text-sm text-gray-500">
                Cannot connect to your device, it may be restarting or not
                connected to the internet. If the problem persists, please try
                to restart your device.
              </p>
            </>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Node IP:{" "}
            <a href="http://192.168.1.100" className="font-bold underline">
              192.168.1.100
            </a>
          </p>
          <p>
            Hostname:{" "}
            <a href="http://eop-1.local" className="font-bold underline">
              eop-1.local
            </a>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Uptime</CardTitle>
        </CardHeader>
        <CardContent>
          <p>1 day, 2 hours, 3 minutes</p>
        </CardContent>
      </Card>

      {stageWithError && (
        <Alert variant="destructive" className="col-span-3">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>
            Error during{" "}
            <span className="font-bold">
              Stage {stageWithError.number}: {stageWithError.name}{" "}
            </span>
          </AlertTitle>
          <AlertDescription>{stageWithError.errorMessage}</AlertDescription>
        </Alert>
      )}

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Installation progress</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(stages).map(([key, value]) => {
            if (!value) return null;
            return <Stage key={key} number={Number(key)} stages={value} />;
          })}
        </CardContent>
      </Card>
    </section>
  );
}
