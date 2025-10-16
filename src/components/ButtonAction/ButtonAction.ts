import { ButtonActionProps } from "@src/entities/props";

import "@src/components/ButtonAction/ButtonAction.css";

export const ButtonAction = ({
  id,
  ariaLabel,
  children,
  className,
  onClick,
}: ButtonActionProps): HTMLButtonElement => {
  const button = document.createElement("button");
  button.className = `button-action ${className ?? ""}`;
  button.type = "button";
  button.id = id;
  button.setAttribute("aria-label", ariaLabel);
  button.innerHTML = children ?? "";

  button.addEventListener("click", (e) => onClick(e));

  return button;
};
