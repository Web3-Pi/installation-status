import {
  AlertCircle,
  CheckCircle,
  Circle,
  CircleX,
  Loader2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";

type StageItemProps = {
  name: string;
  status: "done" | "in-progress" | "todo" | "error";
  errorMessage?: string;
};

type StageProps = {
  number: number;
  stages: StageItemProps[];
};

function StageItem({ name, errorMessage, status }: StageItemProps) {
  const textColor = {
    done: "text-green-500",
    "in-progress": "",
    todo: "text-gray-500",
    error: "text-red-500",
  }[status];

  const textWeight = {
    done: "font-normal",
    "in-progress": "font-bold",
    todo: "font-normal",
    error: "font-bold",
  }[status];

  return (
    <li className="flex gap-5 flex-col">
      <div className="flex flex-row gap-5 items-center">
        <span>
          {
            {
              done: <CheckCircle className="text-green-500" />,
              "in-progress": <Loader2 className="animate-spin" />,
              todo: <Circle className="text-gray-500" />,
              error: <CircleX className="text-red-500" />,
            }[status]
          }
        </span>
        <span className={`${textWeight} ${textColor}`}>{name}</span>
      </div>
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </li>
  );
}

export function Stage({ number, stages }: StageProps) {
  const isAllDone = stages.every((stage) => stage.status === "done");
  const isInProgress = stages.some((stage) => stage.status === "in-progress");
  const isError = stages.some((stage) => stage.status === "error");
  const isTodo = !isAllDone && !isInProgress && !isError;

  const textColor = (() => {
    if (isAllDone) return "text-green-500";
    if (isInProgress) return "";
    if (isError) return "text-red-500";
    return "text-gray-500";
  })();

  const icon = isAllDone ? (
    <CheckCircle className={textColor} />
  ) : isInProgress ? (
    <Loader2 className="animate-spin" />
  ) : isTodo ? (
    <Circle className={textColor} />
  ) : (
    <CircleX className={textColor} />
  );

  return (
    <Accordion type="multiple">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex gap-5 items-center">
            {icon}
            <span className={textColor}>Stage {number}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col gap-2">
            {stages.map((stage, index) => (
              <StageItem key={stage.name + index} {...stage} />
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
