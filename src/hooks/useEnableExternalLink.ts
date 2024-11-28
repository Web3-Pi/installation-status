import { useIp } from "./useIp";
import { useStages } from "./useStages";
import { useUptime } from "./useUptime";

/**
 * External links are only available if the installation is complete and the
 * device has been up and running for at least 3 minutes
 */
export function useEnableExternalLink() {
  const { data: logs } = useStages();
  const { data: ip } = useIp();
  const { data: uptime } = useUptime();
  const isInstallationComplete = logs?.every(
    (stage) => stage.status === "done"
  );
  const hasIp = !!ip;
  const isUptimeEnough = !!uptime && uptime > 180;
  const isEnabled = hasIp && !!isInstallationComplete && isUptimeEnough;
  return {
    isEnabled,
    isInstallationComplete,
    hasIp,
    isUptimeEnough,
    uptime,
    ip,
  };
}
