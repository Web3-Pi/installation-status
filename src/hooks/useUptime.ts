import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { z } from "zod";

const schema = z.object({
  uptime: z.number(),
});

export function useUptime() {
  const [uptime, setUptime] = useState<number>(0);
  const { data: serverUptime } = useQuery({
    queryKey: ["uptime"],
    queryFn: async () => {
      const response = await fetchApi("/uptime");
      const json = await response.json();
      return Math.floor(schema.parse(json).uptime);
    },
  });

  useEffect(() => {
    if (serverUptime) {
      setUptime(serverUptime);
    }
    const interval = setInterval(() => {
      setUptime((uptime) => uptime + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [serverUptime]);

  return { uptime };
}
