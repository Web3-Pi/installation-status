import { fetchApi } from "@/lib/api";
import { secondsToHumanReadable } from "@/lib/time";
import { useQuery } from "@tanstack/react-query";

export function useUptime() {
  return useQuery({
    queryKey: ["uptime"],
    queryFn: async () => {
      const response = await fetchApi("/uptime");
      const json = await response.json();
      return secondsToHumanReadable(Math.floor(json.uptime));
    },
  });
}
