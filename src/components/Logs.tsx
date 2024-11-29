import { useLogs } from "@/hooks/useLogs";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useEffect, useRef } from "react";

type LogsProps = {
  enableAutoScroll?: boolean;
};

export function Logs({ enableAutoScroll }: LogsProps) {
  const { data: logs } = useLogs();
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scrollAreaRef.current || !enableAutoScroll) return;
    scrollAreaRef.current.scrollTo(0, scrollAreaRef.current.scrollHeight);
  }, [logs, enableAutoScroll]);

  if (!logs) return <Skeleton className="h-[400px] w-full" />;
  return (
    <ScrollArea
      className="h-[400px] w-full pr-2 pb-2"
      viewportRef={scrollAreaRef}
    >
      <pre className="font-mono text-xs">{logs}</pre>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
