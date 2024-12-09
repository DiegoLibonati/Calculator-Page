import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { OFFICIAL_BODY } from "./tests/jest.setup";

beforeEach(() => {
  document.body.innerHTML = OFFICIAL_BODY;

  require("./index.ts");
  document.dispatchEvent(new Event("DOMContentLoaded"));
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the screen and all available buttons on the calculator.", () => {
  const calculatorScreen = document.querySelector(".mirror_container_window");
  const buttons = screen.getAllByRole("button");

  expect(calculatorScreen).toBeInTheDocument();
  expect(calculatorScreen).toHaveTextContent("0");

  for (let btn of buttons) {
    expect(btn).toBeInTheDocument();
  }

  expect(buttons).toHaveLength(19);
});

test("It must render the result of a sum on the screen when that operation is performed.", async () => {
  const calculatorScreen = document.querySelector(".mirror_container_window");
  const btnTwo = screen.getByRole("button", { name: "2" });
  const btnPlus = screen.getByRole("button", { name: "+" });
  const btnEqual = screen.getByRole("button", { name: "=" });

  expect(calculatorScreen).toBeInTheDocument();
  expect(calculatorScreen).toHaveTextContent("0");
  expect(btnTwo).toBeInTheDocument();
  expect(btnPlus).toBeInTheDocument();
  expect(btnEqual).toBeInTheDocument();

  await user.click(btnTwo);

  expect(calculatorScreen).toHaveTextContent("2");

  await user.click(btnPlus);

  expect(calculatorScreen).toHaveTextContent("0");

  await user.click(btnTwo);

  expect(calculatorScreen).toHaveTextContent("2");

  await user.click(btnEqual);

  expect(calculatorScreen).toHaveTextContent("4");
});

test("It must render the result of a subtraction on the screen when that operation is performed.", async () => {
  const calculatorScreen = document.querySelector(".mirror_container_window");
  const btnTwo = screen.getByRole("button", { name: "2" });
  const btnSubstraction = screen.getByRole("button", { name: "-" });
  const btnEqual = screen.getByRole("button", { name: "=" });

  expect(calculatorScreen).toBeInTheDocument();
  expect(calculatorScreen).toHaveTextContent("0");
  expect(btnTwo).toBeInTheDocument();
  expect(btnSubstraction).toBeInTheDocument();
  expect(btnEqual).toBeInTheDocument();

  await user.click(btnTwo);

  expect(calculatorScreen).toHaveTextContent("2");

  await user.click(btnSubstraction);

  expect(calculatorScreen).toHaveTextContent("0");

  await user.click(btnTwo);

  expect(calculatorScreen).toHaveTextContent("2");

  await user.click(btnEqual);

  expect(calculatorScreen).toHaveTextContent("0");
});

test("It must render the result of a split on the screen when the split operation is performed.", async () => {
  const calculatorScreen = document.querySelector(".mirror_container_window");
  const btnTwo = screen.getByRole("button", { name: "2" });
  const btnSplit = screen.getByRole("button", { name: "/" });
  const btnEqual = screen.getByRole("button", { name: "=" });

  expect(calculatorScreen).toBeInTheDocument();
  expect(calculatorScreen).toHaveTextContent("0");
  expect(btnTwo).toBeInTheDocument();
  expect(btnSplit).toBeInTheDocument();
  expect(btnEqual).toBeInTheDocument();

  await user.click(btnTwo);

  expect(calculatorScreen).toHaveTextContent("2");

  await user.click(btnSplit);

  expect(calculatorScreen).toHaveTextContent("0");

  await user.click(btnTwo);

  expect(calculatorScreen).toHaveTextContent("2");

  await user.click(btnEqual);

  expect(calculatorScreen).toHaveTextContent("1");
});

test("It must render the result of a multiplication on the screen when that operation is performed.", async () => {
  const calculatorScreen = document.querySelector(".mirror_container_window");
  const btnTwo = screen.getByRole("button", { name: "2" });
  const btnMultiplication = screen.getByRole("button", { name: "x" });
  const btnEqual = screen.getByRole("button", { name: "=" });

  expect(calculatorScreen).toBeInTheDocument();
  expect(calculatorScreen).toHaveTextContent("0");
  expect(btnTwo).toBeInTheDocument();
  expect(btnMultiplication).toBeInTheDocument();
  expect(btnEqual).toBeInTheDocument();

  await user.click(btnTwo);

  expect(calculatorScreen).toHaveTextContent("2");

  await user.click(btnMultiplication);

  expect(calculatorScreen).toHaveTextContent("0");

  await user.click(btnTwo);

  expect(calculatorScreen).toHaveTextContent("2");

  await user.click(btnEqual);

  expect(calculatorScreen).toHaveTextContent("4");
});

test("It must render the result of a percentage on the screen when this operation is performed.", async () => {
  const calculatorScreen = document.querySelector(".mirror_container_window");
  const btnTwo = screen.getByRole("button", { name: "2" });
  const btnPercentage = screen.getByRole("button", { name: "%" });
  const btnEqual = screen.getByRole("button", { name: "=" });

  expect(calculatorScreen).toBeInTheDocument();
  expect(calculatorScreen).toHaveTextContent("0");
  expect(btnTwo).toBeInTheDocument();
  expect(btnPercentage).toBeInTheDocument();
  expect(btnEqual).toBeInTheDocument();

  await user.click(btnTwo);

  expect(calculatorScreen).toHaveTextContent("2");

  await user.click(btnPercentage);

  expect(calculatorScreen).toHaveTextContent("0.02");
});
