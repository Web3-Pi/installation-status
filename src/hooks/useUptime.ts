import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useUptime() {
  return useQuery({
    queryKey: ["uptime"],
    queryFn: async () => {
      const response = await fetchApi("/uptime");
      const json = await response.json();
      return Math.floor(json.uptime);
    },
  });
}
