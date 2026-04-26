import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { ButtonActionProps } from "@/types/props";
import type { ButtonActionComponent } from "@/types/components";

import ButtonAction from "@/components/ButtonAction/ButtonAction";

const mockOnClick = jest.fn();

const defaultProps: ButtonActionProps = {
  id: "btn-test",
  ariaLabel: "Test button",
  children: "Click me",
  className: "btn-primary",
  onClick: mockOnClick,
};

const renderComponent = (
  props: Partial<ButtonActionProps> = {}
): ButtonActionComponent => {
  const element = ButtonAction({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("ButtonAction", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a button element", () => {
      renderComponent();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should have type button", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("should apply the provided id", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("id", "btn-test");
    });

    it("should apply the aria-label", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Test button" })
      ).toBeInTheDocument();
    });

    it("should render children as content", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveTextContent("Click me");
    });

    it("should apply both the base and custom className", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass(
        "button-action",
        "btn-primary"
      );
    });

    it("should render with empty content when children is not provided", () => {
      renderComponent({ children: undefined! });
      expect(screen.getByRole("button")).toHaveTextContent("");
    });

    it("should still have the base class when className is not provided", () => {
      renderComponent({ className: undefined! });
      expect(screen.getByRole("button")).toHaveClass("button-action");
    });
  });

  describe("behavior", () => {
    it("should call onClick when clicked", async () => {
      renderComponent();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("should pass a MouseEvent to onClick", async () => {
      renderComponent();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledWith(expect.any(MouseEvent));
    });

    it("should call onClick on each successive click", async () => {
      renderComponent();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button"));
      await user.click(screen.getByRole("button"));
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("cleanup", () => {
    it("should expose a cleanup method", () => {
      const component = renderComponent();
      expect(typeof component.cleanup).toBe("function");
    });

    it("should stop calling onClick after cleanup is called", async () => {
      const component = renderComponent();
      component.cleanup?.();
      const user = userEvent.setup();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
