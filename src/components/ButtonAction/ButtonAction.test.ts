import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { ButtonActionProps } from "@src/entities/props";

import { ButtonAction } from "@src/components/ButtonAction/ButtonAction";

type RenderComponent = {
  props: ButtonActionProps;
  container: HTMLButtonElement;
};

const renderComponent = (
  id: string,
  ariaLabel: string,
  children?: string,
  className?: string,
  onClick?: jest.Mock
): RenderComponent => {
  const props: ButtonActionProps = {
    id,
    ariaLabel,
    children,
    className,
    onClick: onClick ?? jest.fn(),
  };

  const container = ButtonAction({
    id: props.id,
    ariaLabel: props.ariaLabel,
    children: props.children,
    className: props.className,
    onClick: props.onClick,
  });

  document.body.appendChild(container);

  return { props: props, container: container };
};

describe("ButtonAction.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    const baseProps = {
      id: "test-action-btn",
      ariaLabel: "Test Action Button",
      children: "Action",
      className: "custom-action-class",
    };

    test("It should render a button element with correct attributes", () => {
      const { container } = renderComponent(
        baseProps.id,
        baseProps.ariaLabel,
        baseProps.children,
        baseProps.className
      );

      expect(container).toBeInstanceOf(HTMLButtonElement);
      expect(container.id).toBe(baseProps.id);
      expect(container.getAttribute("aria-label")).toBe(baseProps.ariaLabel);
      expect(container.innerHTML).toBe(baseProps.children);
      expect(container.type).toBe("button");
      expect(container.className).toContain("button-action");
      expect(container.className).toContain(baseProps.className);
    });

    test("It should be accessible via getByRole", () => {
      renderComponent(baseProps.id, baseProps.ariaLabel, baseProps.children);

      const button = screen.getByRole("button", { name: baseProps.ariaLabel });
      expect(button).toBeInTheDocument();
      expect(button.innerHTML).toBe(baseProps.children);
    });

    test("It should apply default button-action class", () => {
      const { container } = renderComponent(
        baseProps.id,
        baseProps.ariaLabel,
        baseProps.children
      );

      expect(container.className).toContain("button-action");
    });

    test("It should apply custom className along with button-action class", () => {
      const { container } = renderComponent(
        baseProps.id,
        baseProps.ariaLabel,
        baseProps.children,
        "my-custom-class"
      );

      expect(container.className).toContain("button-action");
      expect(container.className).toContain("my-custom-class");
    });

    test("It should handle undefined className gracefully", () => {
      const { container } = renderComponent(
        baseProps.id,
        baseProps.ariaLabel,
        baseProps.children,
        undefined
      );

      expect(container.className).toBe("button-action ");
    });
  });

  describe("Click Tests.", () => {
    test("It should call onClick handler when clicked", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "action-btn",
        "Action Button",
        "Click me",
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", { name: /action button/i });
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test("It should pass event object to onClick handler", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "event-btn",
        "Event Button",
        "Click",
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", { name: /event button/i });
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledWith(expect.any(Event));
    });

    test("It should handle multiple clicks", async () => {
      const mockOnClick = jest.fn();
      renderComponent(
        "multi-btn",
        "Multi Button",
        "Click multiple",
        undefined,
        mockOnClick
      );

      const button = screen.getByRole("button", { name: /multi button/i });
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("Content rendering.", () => {
    test("It should render plain text correctly", () => {
      const { container } = renderComponent("txt-btn", "Text Button", "OK");
      expect(container.innerHTML).toBe("OK");
    });

    test("It should render HTML content properly", () => {
      const htmlContent = '<span class="icon">🔥</span>';
      const { container } = renderComponent(
        "html-btn",
        "HTML Button",
        htmlContent
      );

      expect(container.innerHTML).toBe(htmlContent);
      expect(container.querySelector(".icon")).toBeInTheDocument();
    });

    test("It should render empty content when children is not provided", () => {
      const { container } = renderComponent("empty-btn", "Empty Button");
      expect(container.innerHTML).toBe("");
    });

    test("It should render undefined children as empty string", () => {
      const { container } = renderComponent(
        "undefined-btn",
        "Undefined Button",
        undefined
      );
      expect(container.innerHTML).toBe("");
    });
  });
});
