import type { ButtonActionProps } from "@/types/props";
import type { ButtonActionComponent } from "@/types/components";

import "@/components/ButtonAction/ButtonAction.css";

export const ButtonAction = ({
  id,
  ariaLabel,
  children,
  className,
  onClick,
}: ButtonActionProps): ButtonActionComponent => {
  const button = document.createElement("button") as ButtonActionComponent;
  button.className = `button-action ${className ?? ""}`;
  button.type = "button";
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.innerHTML = children ?? "";

  const handleClick = (e: MouseEvent): void => {
    onClick(e);
  };

  button.addEventListener("click", handleClick);

  button.cleanup = (): void => {
    button.removeEventListener("click", handleClick);
  };

  return button;
};
