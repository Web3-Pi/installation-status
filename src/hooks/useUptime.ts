import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const schema = z.object({
  uptime: z.number(),
});

export function useUptime() {
  return useQuery({
    queryKey: ["uptime"],
    queryFn: async () => {
      const response = await fetchApi("/uptime");
      const json = await response.json();
      return Math.floor(schema.parse(json).uptime);
    },
  });
}
