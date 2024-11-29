import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useLogs() {
  return useQuery({
    queryKey: ["logs"],
    queryFn: async () => {
      const response = await fetchApi("/logs");
      return response.text();
    },
    refetchInterval: 1000,
  });
}
