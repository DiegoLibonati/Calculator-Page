import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { CalculatorPage } from "@src/pages/CalculatorPage/CalculatorPage";

type RenderComponent = {
  container: HTMLDivElement;
  calculatorWindow: HTMLDivElement;
};

const renderComponent = (): RenderComponent => {
  const container = CalculatorPage();
  document.body.appendChild(container);

  const calculatorWindow = container.querySelector<HTMLDivElement>(
    ".calculator__window"
  )!;

  return { container: container, calculatorWindow: calculatorWindow };
};

describe("CalculatorPage.ts", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the calculator structure correctly", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLDivElement);
      expect(container.className).toBe("calculator");
      expect(
        container.querySelector<HTMLDivElement>(".calculator__mirror")
      ).toBeInTheDocument();
      expect(
        container.querySelector<HTMLDivElement>(".calculator__window")
      ).toBeInTheDocument();
      expect(
        container.querySelector<HTMLDivElement>(".calculator__actions")
      ).toBeInTheDocument();
    });

    test("It should render calculator window with initial value of 0", () => {
      const { calculatorWindow } = renderComponent();

      expect(calculatorWindow.textContent).toBe("0");
    });

    test("It should render all number buttons (0-9)", () => {
      renderComponent();

      for (let i = 0; i <= 9; i++) {
        const button = screen.getByRole("button", { name: String(i) });
        expect(button).toBeInTheDocument();
      }
    });

    test("It should render all operation buttons (+, -, x, /)", () => {
      renderComponent();

      const operations = ["+", "-", "x", "/"];
      operations.forEach((op) => {
        const button = screen.getByRole("button", { name: op });
        expect(button).toBeInTheDocument();
      });
    });

    test("It should render all special buttons (CE, C, %, =, .)", () => {
      renderComponent();

      const specials = ["ce", "c", "%", "=", "."];
      specials.forEach((special) => {
        const button = screen.getByRole("button", { name: special });
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe("Number Button Tests.", () => {
    test("It should display number when number button is clicked", async () => {
      const { calculatorWindow } = renderComponent();

      const button5 = screen.getByRole("button", { name: "5" });
      await user.click(button5);

      expect(calculatorWindow.textContent).toBe("5");
    });

    test("It should concatenate multiple numbers", async () => {
      const { calculatorWindow } = renderComponent();

      const button1 = screen.getByRole("button", { name: "1" });
      const button2 = screen.getByRole("button", { name: "2" });
      const button3 = screen.getByRole("button", { name: "3" });

      await user.click(button1);
      await user.click(button2);
      await user.click(button3);

      expect(calculatorWindow.textContent).toBe("123");
    });

    test("It should replace 0 with first number clicked", async () => {
      const { calculatorWindow } = renderComponent();

      expect(calculatorWindow.textContent).toBe("0");

      const button7 = screen.getByRole("button", { name: "7" });
      await user.click(button7);

      expect(calculatorWindow.textContent).toBe("7");
    });
  });

  describe("Operation Button Tests.", () => {
    test("It should perform addition correctly", async () => {
      const { calculatorWindow } = renderComponent();

      const button5 = screen.getByRole("button", { name: "5" });
      const button3 = screen.getByRole("button", { name: "3" });
      const buttonPlus = screen.getByRole("button", { name: "+" });
      const buttonEqual = screen.getByRole("button", { name: "=" });

      await user.click(button5);
      await user.click(buttonPlus);
      await user.click(button3);
      await user.click(buttonEqual);

      expect(calculatorWindow.textContent).toBe("8");
    });

    test("It should perform subtraction correctly", async () => {
      const { calculatorWindow } = renderComponent();

      const button9 = screen.getByRole("button", { name: "9" });
      const button4 = screen.getByRole("button", { name: "4" });
      const buttonMinus = screen.getByRole("button", { name: "-" });
      const buttonEqual = screen.getByRole("button", { name: "=" });

      await user.click(button9);
      await user.click(buttonMinus);
      await user.click(button4);
      await user.click(buttonEqual);

      expect(calculatorWindow.textContent).toBe("5");
    });

    test("It should perform multiplication correctly", async () => {
      const { calculatorWindow } = renderComponent();

      const button6 = screen.getByRole("button", { name: "6" });
      const button7 = screen.getByRole("button", { name: "7" });
      const buttonX = screen.getByRole("button", { name: "x" });
      const buttonEqual = screen.getByRole("button", { name: "=" });

      await user.click(button6);
      await user.click(buttonX);
      await user.click(button7);
      await user.click(buttonEqual);

      expect(calculatorWindow.textContent).toBe("42");
    });

    test("It should perform division correctly", async () => {
      const { calculatorWindow } = renderComponent();

      const button8 = screen.getByRole("button", { name: "8" });
      const button2 = screen.getByRole("button", { name: "2" });
      const buttonDiv = screen.getByRole("button", { name: "/" });
      const buttonEqual = screen.getByRole("button", { name: "=" });

      await user.click(button8);
      await user.click(buttonDiv);
      await user.click(button2);
      await user.click(buttonEqual);

      expect(calculatorWindow.textContent).toBe("4");
    });

    test("It should chain operations without pressing equals", async () => {
      const { calculatorWindow } = renderComponent();

      const button5 = screen.getByRole("button", { name: "5" });
      const button3 = screen.getByRole("button", { name: "3" });
      const button2 = screen.getByRole("button", { name: "2" });
      const buttonPlus = screen.getByRole("button", { name: "+" });
      const buttonMinus = screen.getByRole("button", { name: "-" });

      await user.click(button5);
      await user.click(buttonPlus);
      await user.click(button3);
      await user.click(buttonMinus);

      expect(calculatorWindow.textContent).toBe("8");

      await user.click(button2);

      const buttonEqual = screen.getByRole("button", { name: "=" });
      await user.click(buttonEqual);

      expect(calculatorWindow.textContent).toBe("6");
    });
  });

  describe("Special Button Tests.", () => {
    test("It should clear display with CE button", async () => {
      const { calculatorWindow } = renderComponent();

      const button1 = screen.getByRole("button", { name: "1" });
      const button2 = screen.getByRole("button", { name: "2" });
      const button3 = screen.getByRole("button", { name: "3" });
      const buttonCE = screen.getByRole("button", { name: "ce" });

      await user.click(button1);
      await user.click(button2);
      await user.click(button3);
      expect(calculatorWindow.textContent).toBe("123");

      await user.click(buttonCE);
      expect(calculatorWindow.textContent).toBe("0");
    });

    test("It should clear everything with C button", async () => {
      const { calculatorWindow } = renderComponent();

      const button5 = screen.getByRole("button", { name: "5" });
      const button3 = screen.getByRole("button", { name: "3" });
      const buttonPlus = screen.getByRole("button", { name: "+" });
      const buttonC = screen.getByRole("button", { name: "c" });

      await user.click(button5);
      await user.click(buttonPlus);
      await user.click(button3);
      await user.click(buttonC);

      expect(calculatorWindow.textContent).toBe("0");

      const button2 = screen.getByRole("button", { name: "2" });
      await user.click(button2);
      expect(calculatorWindow.textContent).toBe("2");
    });

    test("It should add decimal point", async () => {
      const { calculatorWindow } = renderComponent();

      const button3 = screen.getByRole("button", { name: "3" });
      const buttonPoint = screen.getByRole("button", { name: "." });
      const button1 = screen.getByRole("button", { name: "1" });
      const button4 = screen.getByRole("button", { name: "4" });

      await user.click(button3);
      await user.click(buttonPoint);
      await user.click(button1);
      await user.click(button4);

      expect(calculatorWindow.textContent).toBe("3.14");
    });

    test("It should not add multiple decimal points", async () => {
      const { calculatorWindow } = renderComponent();

      const button5 = screen.getByRole("button", { name: "5" });
      const buttonPoint = screen.getByRole("button", { name: "." });

      await user.click(button5);
      await user.click(buttonPoint);
      await user.click(button5);
      await user.click(buttonPoint);
      await user.click(button5);

      expect(calculatorWindow.textContent).toBe("5.55");
    });

    test("It should calculate percentage", async () => {
      const { calculatorWindow } = renderComponent();

      const button5 = screen.getByRole("button", { name: "5" });
      const button0 = screen.getByRole("button", { name: "0" });
      const buttonPercent = screen.getByRole("button", { name: "%" });

      await user.click(button5);
      await user.click(button0);
      await user.click(buttonPercent);

      expect(calculatorWindow.textContent).toBe("0.5");
    });

    test("It should not calculate equals without operation", async () => {
      const { calculatorWindow } = renderComponent();

      const button5 = screen.getByRole("button", { name: "5" });
      const buttonEqual = screen.getByRole("button", { name: "=" });

      await user.click(button5);
      await user.click(buttonEqual);

      expect(calculatorWindow.textContent).toBe("5");
    });
  });

  describe("Complex Operation Tests.", () => {
    test("It should handle decimal operations", async () => {
      const { calculatorWindow } = renderComponent();

      const button2 = screen.getByRole("button", { name: "2" });
      const button5 = screen.getByRole("button", { name: "5" });
      const buttonPoint = screen.getByRole("button", { name: "." });
      const buttonPlus = screen.getByRole("button", { name: "+" });
      const buttonEqual = screen.getByRole("button", { name: "=" });

      await user.click(button2);
      await user.click(buttonPoint);
      await user.click(button5);
      await user.click(buttonPlus);
      await user.click(button2);
      await user.click(buttonPoint);
      await user.click(button5);
      await user.click(buttonEqual);

      expect(calculatorWindow.textContent).toBe("5");
    });

    test("It should handle operation change before entering second number", async () => {
      const { calculatorWindow } = renderComponent();

      const button5 = screen.getByRole("button", { name: "5" });
      const button3 = screen.getByRole("button", { name: "3" });
      const buttonPlus = screen.getByRole("button", { name: "+" });
      const buttonMinus = screen.getByRole("button", { name: "-" });
      const buttonEqual = screen.getByRole("button", { name: "=" });

      await user.click(button5);
      await user.click(buttonPlus);
      await user.click(buttonMinus);
      await user.click(button3);
      await user.click(buttonEqual);

      expect(calculatorWindow.textContent).toBe("2");
    });
  });
});
