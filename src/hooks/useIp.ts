import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const schema = z.object({
  ip: z.string(),
});

export function useIp() {
  return useQuery({
    queryKey: ["ip"],
    queryFn: async () => {
      const response = await fetchApi("/ip");
      const json = await response.json();
      return schema.parse(json).ip;
    },
  });
}
