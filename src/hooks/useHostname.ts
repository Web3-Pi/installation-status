import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useHostname() {
  return useQuery({
    queryKey: ["hostname"],
    queryFn: async () => {
      const response = await fetchApi("/hostname");
      const json = await response.json();
      return json.hostname;
    },
  });
}
