import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useConnection() {
  return useQuery({
    queryKey: ["connection"],
    queryFn: async () => {
      const response = await fetchApi("/health");
      if (!response.ok) {
        throw new Error("Failed to fetch connection status");
      }
      return response.json();
    },
    retryDelay: 1000,
    refetchInterval: 1000,
  });
}
