export interface Component {
  cleanup?: () => void;
}

export interface ButtonActionComponent extends Component, HTMLButtonElement {}
