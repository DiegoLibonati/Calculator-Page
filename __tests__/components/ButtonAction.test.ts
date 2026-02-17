import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ButtonActionProps } from "@/types/props";
import type { ButtonActionComponent } from "@/types/components";

import { ButtonAction } from "@/components/ButtonAction/ButtonAction";

const renderComponent = (props: ButtonActionProps): ButtonActionComponent => {
  const container = ButtonAction(props);
  document.body.appendChild(container);
  return container;
};

describe("ButtonAction Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mockOnClick = jest.fn();

  const defaultProps: ButtonActionProps = {
    id: "test-action",
    ariaLabel: "Test action button",
    children: "Test",
    onClick: mockOnClick,
  };

  it("should render button with correct attributes", () => {
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test action button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("id", "test-action");
    expect(button).toHaveAttribute("type", "button");
    expect(button.innerHTML).toBe("Test");
  });

  it("should call onClick handler when clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "Test action button" });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(expect.any(MouseEvent));
  });

  it("should apply additional className when provided", () => {
    const propsWithClass: ButtonActionProps = {
      ...defaultProps,
      className: "custom-button",
    };

    renderComponent(propsWithClass);

    const button = screen.getByRole("button", { name: "Test action button" });
    expect(button).toHaveClass("button-action", "custom-button");
  });

  it("should cleanup event listener", async () => {
    const user = userEvent.setup();
    const button = renderComponent(defaultProps);

    button.cleanup?.();

    const buttonElement = screen.getByRole("button", {
      name: "Test action button",
    });
    await user.click(buttonElement);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
