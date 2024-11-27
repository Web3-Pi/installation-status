import { ExternalLinkIcon } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { useEnableExternalLink } from "@/hooks/useEnableExternalLink";

type GrafanaButtonProps = ButtonProps;

export function GrafanaButton({
  disabled: disabledFromProps,
  ...props
}: GrafanaButtonProps) {
  const { isEnabled, ip } = useEnableExternalLink();

  if (!isEnabled || disabledFromProps) {
    return (
      <Button disabled {...props}>
        Grafana not available
        <ExternalLinkIcon />
      </Button>
    );
  }
  return (
    <a href={`http://${ip}:3000/dashboards`} target="_blank">
      <Button {...props}>
        Grafana
        <ExternalLinkIcon />
      </Button>
    </a>
  );
}
