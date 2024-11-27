import { ExternalLinkIcon } from "lucide-react";
import { ButtonProps, Button } from "./ui/button";
import { useEnableExternalLink } from "@/hooks/useEnableExternalLink";

type JsonApiButtonProps = ButtonProps;

export function JsonApiButton({
  disabled: disabledFromProps,
  ...props
}: JsonApiButtonProps) {
  const { isEnabled, ip } = useEnableExternalLink();

  if (!isEnabled || disabledFromProps) {
    return (
      <Button disabled {...props}>
        JSON API not available
        <ExternalLinkIcon />
      </Button>
    );
  }
  return (
    <a href={`http://${ip}:7197/node/system/status`} target="_blank">
      <Button {...props}>
        JSON API
        <ExternalLinkIcon />
      </Button>
    </a>
  );
}
