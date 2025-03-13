import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useLogs() {
  return useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      const response = await fetchApi("/logs?lines=5000");
      return response.text();
    },
    refetchInterval: 1000,
  });
}
