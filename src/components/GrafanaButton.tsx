import { ExternalLinkIcon } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { useEnableExternalLink } from "@/hooks/useEnableExternalLink";

type GrafanaButtonProps = ButtonProps;

export function GrafanaButton({
  disabled: disabledFromProps,
  ...props
}: GrafanaButtonProps) {
  const { ip, isInstallationComplete, isUptimeEnough } =
    useEnableExternalLink();

  const isEnabled = isInstallationComplete && isUptimeEnough && !!ip;

  if (!isEnabled || disabledFromProps) {
    return (
      <Button disabled {...props}>
        Grafana not available
        <ExternalLinkIcon />
      </Button>
    );
  }
  return (
    <a href={`http://${ip}:3000/d/web3piv2p6eiob/`} target="_blank">
      <Button {...props}>
        Grafana
        <ExternalLinkIcon />
      </Button>
    </a>
  );
}
