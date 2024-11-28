import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const schema = z.object({
  hostname: z.string(),
});

export function useHostname() {
  return useQuery({
    queryKey: ["hostname"],
    queryFn: async () => {
      const response = await fetchApi("/hostname");
      const json = await response.json();
      return schema.parse(json).hostname;
    },
  });
}
