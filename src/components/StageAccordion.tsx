import { CheckCircle, Circle, CircleX, Loader2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Log, Stage } from "@/hooks/useStages";

function StageItem({ level, status, isDone, time }: Log & { isDone: boolean }) {
  const textColor =
    level === "ERROR" ? "text-red-500" : isDone ? "text-green-500" : "";

  const icon =
    level === "ERROR" ? (
      <CircleX className={textColor} />
    ) : isDone ? (
      <CheckCircle className={textColor} />
    ) : (
      <Loader2 className="animate-spin" />
    );

  const formattedTime = new Date(time);
  const year = formattedTime.getFullYear();
  const month = String(formattedTime.getMonth() + 1).padStart(2, "0");
  const day = String(formattedTime.getDate()).padStart(2, "0");
  const hours = String(formattedTime.getHours()).padStart(2, "0");
  const minutes = String(formattedTime.getMinutes()).padStart(2, "0");
  const seconds = String(formattedTime.getSeconds()).padStart(2, "0");
  const timeZone = formattedTime
    .toLocaleTimeString("en", { timeZoneName: "short" })
    .split(" ")[2];

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${timeZone}`;

  return (
    <li className="flex flex-col sm:flex-row  items-start justify-between">
      <div className="flex gap-2 items-center">
        <span>{icon}</span>
        <span className={`${textColor}`}>{status}</span>
      </div>
      <span className="text-xs">{formattedDate}</span>
    </li>
  );
}

export function StageAccordion({ number, name, status, logs }: Stage) {
  const textColor = {
    done: "text-green-500",
    "in-progress": "",
    todo: "text-gray-500",
    error: "text-red-500",
  }[status];

  const icon = {
    done: <CheckCircle className={textColor} />,
    "in-progress": <Loader2 className="animate-spin" />,
    todo: <Circle className={textColor} />,
    error: <CircleX className={textColor} />,
  }[status];

  return (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex gap-2 items-center">
            {icon}
            <span className={textColor}>
              Stage {number}: {name}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col gap-5 sm:gap-2">
            {logs.map((log, index) => (
              <StageItem
                key={log.status + index}
                isDone={status !== "in-progress" || index !== logs.length - 1}
                {...log}
              />
            ))}
          </ul>
          {status === "todo" && (
            <span className="italic text-gray-500">
              Stage has not started yet
            </span>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
