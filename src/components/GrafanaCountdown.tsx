import { useUptime } from "@/hooks/useUptime";

export function GrafanaCountdown() {
  const { uptime } = useUptime();
  if (uptime >= 180) {
    return <span>Grafana logs are available now.</span>;
  }
  return <span>Grafana logs will be available in {180 - uptime} seconds.</span>;
}
