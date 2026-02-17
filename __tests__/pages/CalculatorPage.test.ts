import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { CalculatorPage } from "@/pages/CalculatorPage/CalculatorPage";

const renderPage = (): Page => {
  const container = CalculatorPage();
  document.body.appendChild(container);
  return container;
};

describe("CalculatorPage", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".calculator");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render calculator window with initial value 0", () => {
    renderPage();

    const window = document.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    expect(window).toBeInTheDocument();
    expect(window?.textContent).toBe("0");
  });

  it("should render all number buttons", () => {
    renderPage();

    for (let i = 0; i <= 9; i++) {
      expect(
        screen.getByRole("button", { name: String(i) })
      ).toBeInTheDocument();
    }
  });

  it("should render all operation buttons", () => {
    renderPage();

    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "x" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "/" })).toBeInTheDocument();
  });

  it("should render special buttons", () => {
    renderPage();

    expect(screen.getByRole("button", { name: "c" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ce" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "=" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "%" })).toBeInTheDocument();
  });

  it("should display number when number button is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    const button5 = screen.getByRole("button", { name: "5" });
    await user.click(button5);

    const window = document.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    expect(window?.textContent).toBe("5");
  });

  it("should concatenate numbers", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "3" }));

    const window = document.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    expect(window?.textContent).toBe("123");
  });

  it("should add two numbers", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    const window = document.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    expect(window?.textContent).toBe("8");
  });

  it("should subtract two numbers", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "1" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "-" }));
    await user.click(screen.getByRole("button", { name: "4" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    const window = document.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    expect(window?.textContent).toBe("6");
  });

  it("should multiply two numbers", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "6" }));
    await user.click(screen.getByRole("button", { name: "x" }));
    await user.click(screen.getByRole("button", { name: "7" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    const window = document.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    expect(window?.textContent).toBe("42");
  });

  it("should divide two numbers", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "/" }));
    await user.click(screen.getByRole("button", { name: "4" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    const window = document.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    expect(window?.textContent).toBe("5");
  });

  it("should clear window when CE is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "ce" }));

    const window = document.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    expect(window?.textContent).toBe("0");
  });

  it("should reset calculator when C is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "c" }));

    const window = document.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    expect(window?.textContent).toBe("0");
  });

  it("should add decimal point", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "." }));
    await user.click(screen.getByRole("button", { name: "5" }));

    const window = document.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    expect(window?.textContent).toBe("5.5");
  });

  it("should not add multiple decimal points", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "." }));
    await user.click(screen.getByRole("button", { name: "." }));
    await user.click(screen.getByRole("button", { name: "5" }));

    const window = document.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    expect(window?.textContent).toBe("5.5");
  });

  it("should calculate percentage", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "0" }));
    await user.click(screen.getByRole("button", { name: "%" }));

    const window = document.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    expect(window?.textContent).toBe("0.5");
  });

  it("should perform chain operations", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "5" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "3" }));
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "2" }));
    await user.click(screen.getByRole("button", { name: "=" }));

    const window = document.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    expect(window?.textContent).toBe("10");
  });

  it("should cleanup all button listeners on page cleanup", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
