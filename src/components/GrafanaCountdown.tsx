import { useUptime } from "@/hooks/useUptime";

export function GrafanaCountdown() {
  const { uptime } = useUptime();
  if (uptime >= 180) {
    return <span>Grafana dashboard is available now.</span>;
  }
  return (
    <span>Grafana dashboard will be available in {180 - uptime} seconds.</span>
  );
}
