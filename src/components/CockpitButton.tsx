import { ExternalLinkIcon } from "lucide-react";
import { Button, type ButtonProps } from "./ui/button";
import { useEnableExternalLink } from "@/hooks/useEnableExternalLink";

type CockpitButtonProps = ButtonProps;

export function CockpitButton({
  disabled: disabledFromProps,
  ...props
}: CockpitButtonProps) {
  const { ip, isInstallationComplete } =
    useEnableExternalLink();

  if (!ip || !isInstallationComplete || disabledFromProps) {
    return (
      <Button disabled {...props}>
          Cockpit not available
          <ExternalLinkIcon />
      </Button>
    );
  }
  return (
    <a href={`http://${ip}:9090/`} target="_blank" rel="noreferrer">
      <Button {...props}>
        Cockpit
        <ExternalLinkIcon />
      </Button>
    </a>
  );
}
