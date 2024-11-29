import { useId, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Logs } from "./Logs";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { ExternalLinkIcon } from "lucide-react";

export function LogsCard() {
  const [enableAutoScroll, setEnableAutoScroll] = useState(true);
  const id = useId();
  return (
    <Card>
      <CardHeader>
        <div className="flex gap-2 justify-between">
          <CardTitle>Logfile contents</CardTitle>
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id={id}
                checked={enableAutoScroll}
                onCheckedChange={setEnableAutoScroll}
              />
              <Label htmlFor={id}>Auto scroll</Label>
            </div>
            <a
              href="/api/logs"
              target="_blank"
              className="underline inline-flex gap-1 items-center"
            >
              Open in new tab
              <ExternalLinkIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Logs enableAutoScroll={enableAutoScroll} />
      </CardContent>
    </Card>
  );
}
