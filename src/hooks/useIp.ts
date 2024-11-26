import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useIp() {
  return useQuery({
    queryKey: ["ip"],
    queryFn: async () => {
      const response = await fetchApi("/ip");
      const json = await response.json();
      return json.ip;
    },
  });
}
