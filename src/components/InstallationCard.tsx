import { useStages } from "@/hooks/useStages";
import { StageAccordion } from "./StageAccordionItem";
import { Accordion } from "./ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function InstallationCard() {
  const { data: stages } = useStages();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Installation progress</CardTitle>
      </CardHeader>
      <CardContent>
        {stages ? (
          <Accordion type="multiple" defaultValue={["stage-0"]}>
            {stages.map((stage) => (
              <StageAccordion key={stage.number} {...stage} />
            ))}
          </Accordion>
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
  );
}
