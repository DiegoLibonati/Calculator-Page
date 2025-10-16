interface DefaultProps {
  className?: string;
  children?: string;
}

export interface ButtonActionProps extends DefaultProps {
  id: string;
  ariaLabel: string;
  onClick: (e: MouseEvent) => void;
}
