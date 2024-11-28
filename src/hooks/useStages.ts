import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { TypeOf, z } from "zod";

const schema = z.array(
  z.object({
    name: z.string(),
    number: z.number(),
    status: z.enum(["done", "in-progress", "todo", "error"]),
    logs: z.array(
      z.object({
        time: z.string(),
        status: z.string(),
        level: z.enum(["INFO", "ERROR"]),
      })
    ),
  })
);

export type Stage = TypeOf<typeof schema>[number];
export type Log = Stage["logs"][number];

export function useStages() {
  return useQuery({
    queryKey: ["stages"],
    queryFn: async () => {
      const response = await fetchApi("/stages");
      return schema.parse(await response.json());
    },
    refetchInterval: 1000,
  });
}
