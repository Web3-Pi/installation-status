import { useUptime } from "@/hooks/useUptime";

export function GrafanaCountdown() {
  const { uptime } = useUptime();
  if (!uptime) {
    return (
      <span>
        Grafana dashboard will be available 3 minutes after the device is up and
        running.
      </span>
    );
  }
  if (uptime >= 180) {
    return <span>Grafana dashboard is available now.</span>;
  }
  return (
    <span>Grafana dashboard will be available in {180 - uptime} seconds.</span>
  );
}
