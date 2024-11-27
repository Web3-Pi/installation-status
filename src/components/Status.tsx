import { AlertCircle, Plug, Unplug } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { StageAccordion } from "./StageAccordion";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { useHostname } from "@/hooks/useHostname";
import { Skeleton } from "./ui/skeleton";
import { useIp } from "@/hooks/useIp";
import { useUptime } from "@/hooks/useUptime";
import { useConnection } from "@/hooks/useConnection";
import { useLogs } from "@/hooks/useLogs";
import { secondsToHumanReadable } from "@/lib/time";

export function Status() {
  const { data: hostname, isLoading: hostnameLoading } = useHostname();
  const { data: ip, isLoading: ipLoading } = useIp();
  const { data: uptime } = useUptime();
  const { failureReason } = useConnection();
  const connectionIsFailing = !!failureReason;

  const { data: logs } = useLogs();
  const stageWithError = logs?.find((stage) => stage.status === "error");
  const installationComplete = logs?.every((stage) => stage.status === "done");
  return (
    <section className="flex flex-col md:grid  grid-cols-3 gap-4 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Connection status</CardTitle>
        </CardHeader>
        <CardContent>
          {!connectionIsFailing ? (
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
          <p className="flex items-center gap-1">
            Node IP:{" "}
            {ipLoading ? (
              <Skeleton className="h-[21px] w-[100px] " />
            ) : (
              <a href={`http://${ip}`} className="font-bold underline">
                {ip}
              </a>
            )}
          </p>
          <p className="flex items-center gap-1">
            Hostname:{" "}
            {hostnameLoading ? (
              <Skeleton className="h-[21px] w-[100px] " />
            ) : (
              <a
                href={`http://${hostname}.local`}
                className="font-bold underline"
              >
                {hostname}
              </a>
            )}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Uptime</CardTitle>
        </CardHeader>
        <CardContent>
          {!uptime ? (
            <Skeleton className="h-[21px] w-[100px] " />
          ) : (
            <p>{secondsToHumanReadable(uptime)}</p>
          )}
        </CardContent>
      </Card>

      {stageWithError && (
        <Alert variant="destructive" className="col-span-3">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>
            Error during{" "}
            <span className="font-bold">
              Stage {stageWithError.number}: {stageWithError.name}
            </span>
          </AlertTitle>
          <AlertDescription>
            {stageWithError.logs.at(-1)?.status}
          </AlertDescription>
        </Alert>
      )}

      {installationComplete && (
        <Alert variant="success" className="col-span-3">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Installation complete</AlertTitle>
          <AlertDescription>
            Installation completed successfully. The Grafana dashboard and JSON
            API will be available in a few minutes.
          </AlertDescription>
        </Alert>
      )}

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Installation progress</CardTitle>
        </CardHeader>
        <CardContent>
          {logs ? (
            logs.map((stage) => (
              <StageAccordion key={stage.number} {...stage} />
            ))
          ) : (
            <div className="flex flex-col items-center gap-[1px]">
              <Skeleton className="h-[56px] w-full" />
              <Skeleton className="h-[56px] w-full" />
              <Skeleton className="h-[56px] w-full" />
              <Skeleton className="h-[56px] w-full" />
              <Skeleton className="h-[56px] w-full" />
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
