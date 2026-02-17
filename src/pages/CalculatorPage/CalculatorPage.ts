import type { Operation, Special, Number as NumberT } from "@/types/app";
import type { Page } from "@/types/pages";

import { ButtonAction } from "@/components/ButtonAction/ButtonAction";

import { getResultOfOperation } from "@/helpers/getResultOfOperation";

import { operations } from "@/constants/vars";

import "@/pages/CalculatorPage/CalculatorPage.css";

export const CalculatorPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "calculator";

  main.innerHTML = `
    <div class="calculator__mirror">
        <div class="calculator__window">0</div>
    </div>

    <div class="calculator__actions">
    </div>
  `;

  let prevOperation: string | null = null;
  let prevValue: string | null = null;
  let lastButtonPressed: string | null = null;
  let resetScreenNumber = false;

  const calculatorActions = main.querySelector<HTMLDivElement>(
    ".calculator__actions"
  );

  const onClickNumber = (value: NumberT): void => {
    const calculatorWindow = main.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    const currentValue = calculatorWindow!.textContent;

    resetScreenNumber = currentValue === "0" ? true : resetScreenNumber;

    if (resetScreenNumber) {
      calculatorWindow!.textContent = value;
      resetScreenNumber = false;
      lastButtonPressed = value;
      return;
    }

    calculatorWindow!.textContent += value;
    lastButtonPressed = value;
  };

  const onClickOperation = (value: Operation): void => {
    const calculatorWindow = main.querySelector<HTMLDivElement>(
      ".calculator__window"
    );
    const currentValue = calculatorWindow!.textContent;
    const currentOperation = value;

    if (operations.includes(lastButtonPressed! as Operation)) {
      prevOperation = currentOperation;
      lastButtonPressed = value;
      return;
    }

    resetScreenNumber = true;

    if (prevOperation && prevValue) {
      const result = String(
        getResultOfOperation(prevValue, currentValue, prevOperation)
      );

      calculatorWindow!.textContent = result;
      prevValue = result;
      prevOperation = currentOperation;
      lastButtonPressed = value;
      return;
    }

    prevValue = currentValue!;
    prevOperation = currentOperation;
    calculatorWindow!.textContent = "0";
    lastButtonPressed = value;
  };

  const onClickSpecial = (value: Special): void => {
    const calculatorWindow = main.querySelector<HTMLDivElement>(
      ".calculator__window"
    )!;
    const currentValue = calculatorWindow.textContent;

    if (value === "." && currentValue.includes(".")) return;
    if (value === "=" && (!prevValue || !prevOperation)) return;

    switch (value) {
      case ".":
        calculatorWindow.textContent += value;
        break;
      case "=": {
        const result = String(
          getResultOfOperation(prevValue!, currentValue, prevOperation!)
        );

        calculatorWindow.textContent = result;
        prevValue = result;
        prevOperation = null;
        resetScreenNumber = true;
        break;
      }
      case "c":
        prevOperation = null;
        prevValue = null;
        lastButtonPressed = null;
        resetScreenNumber = false;

        calculatorWindow.textContent = "0";
        break;
      case "ce":
        calculatorWindow.textContent = "0";
        break;
      case "%":
        calculatorWindow.textContent = String(
          parseFloat(calculatorWindow.textContent) / 100
        );
        break;
      default:
        break;
    }

    lastButtonPressed = value;
  };

  const buttonActionCe = ButtonAction({
    id: "ce",
    className: "button-action-ce button-action--red",
    children: "CE",
    ariaLabel: "ce",
    onClick: () => {
      onClickSpecial("ce");
    },
  });
  const buttonActionC = ButtonAction({
    id: "c",
    className: "button-action-c button-action--red",
    children: "C",
    ariaLabel: "c",
    onClick: () => {
      onClickSpecial("c");
    },
  });
  const buttonActionX = ButtonAction({
    id: "x",
    className: "button-action-x",
    children: "X",
    ariaLabel: "x",
    onClick: () => {
      onClickOperation("x");
    },
  });
  const buttonActionPercentage = ButtonAction({
    id: "%",
    className: "button-action-%",
    children: "%",
    ariaLabel: "%",
    onClick: () => {
      onClickSpecial("%");
    },
  });
  const buttonActionDiv = ButtonAction({
    id: "/",
    className: "button-action-/",
    children: "/",
    ariaLabel: "/",
    onClick: () => {
      onClickOperation("/");
    },
  });
  const buttonAction1 = ButtonAction({
    id: "1",
    className: "button-action-1",
    children: "1",
    ariaLabel: "1",
    onClick: () => {
      onClickNumber("1");
    },
  });
  const buttonAction2 = ButtonAction({
    id: "2",
    className: "button-action-2",
    children: "2",
    ariaLabel: "2",
    onClick: () => {
      onClickNumber("2");
    },
  });
  const buttonAction3 = ButtonAction({
    id: "3",
    className: "button-action-3",
    children: "3",
    ariaLabel: "3",
    onClick: () => {
      onClickNumber("3");
    },
  });
  const buttonActionEqual = ButtonAction({
    id: "=",
    className: "button-action-=",
    children: "=",
    ariaLabel: "=",
    onClick: () => {
      onClickSpecial("=");
    },
  });
  const buttonActionMinus = ButtonAction({
    id: "-",
    className: "button-action--",
    children: "-",
    ariaLabel: "-",
    onClick: () => {
      onClickOperation("-");
    },
  });
  const buttonAction4 = ButtonAction({
    id: "4",
    className: "button-action-4",
    children: "4",
    ariaLabel: "4",
    onClick: () => {
      onClickNumber("4");
    },
  });
  const buttonAction5 = ButtonAction({
    id: "5",
    className: "button-action-5",
    children: "5",
    ariaLabel: "5",
    onClick: () => {
      onClickNumber("5");
    },
  });
  const buttonAction6 = ButtonAction({
    id: "6",
    className: "button-action-6",
    children: "6",
    ariaLabel: "6",
    onClick: () => {
      onClickNumber("6");
    },
  });
  const buttonActionPoint = ButtonAction({
    id: ".",
    className: "button-action-.",
    children: ".",
    ariaLabel: ".",
    onClick: () => {
      onClickSpecial(".");
    },
  });
  const buttonActionPlus = ButtonAction({
    id: "+",
    className: "button-action-+ button-action--plus",
    children: "+",
    ariaLabel: "+",
    onClick: () => {
      onClickOperation("+");
    },
  });
  const buttonAction7 = ButtonAction({
    id: "7",
    className: "button-action-7",
    children: "7",
    ariaLabel: "7",
    onClick: () => {
      onClickNumber("7");
    },
  });
  const buttonAction8 = ButtonAction({
    id: "8",
    className: "button-action-8",
    children: "8",
    ariaLabel: "8",
    onClick: () => {
      onClickNumber("8");
    },
  });
  const buttonAction9 = ButtonAction({
    id: "9",
    className: "button-action-9",
    children: "9",
    ariaLabel: "9",
    onClick: () => {
      onClickNumber("9");
    },
  });
  const buttonAction0 = ButtonAction({
    id: "0",
    className: "button-action-0",
    children: "0",
    ariaLabel: "0",
    onClick: () => {
      onClickNumber("0");
    },
  });

  calculatorActions?.append(
    buttonActionCe,
    buttonActionC,
    buttonActionX,
    buttonActionPercentage,
    buttonActionDiv,
    buttonAction1,
    buttonAction2,
    buttonAction3,
    buttonActionEqual,
    buttonActionMinus,
    buttonAction4,
    buttonAction5,
    buttonAction6,
    buttonActionPoint,
    buttonActionPlus,
    buttonAction7,
    buttonAction8,
    buttonAction9,
    buttonAction0
  );

  main.cleanup = (): void => {
    buttonActionCe.cleanup?.();
    buttonActionC.cleanup?.();
    buttonActionX.cleanup?.();
    buttonActionPercentage.cleanup?.();
    buttonActionDiv.cleanup?.();
    buttonAction1.cleanup?.();
    buttonAction2.cleanup?.();
    buttonAction3.cleanup?.();
    buttonActionEqual.cleanup?.();
    buttonActionMinus.cleanup?.();
    buttonAction4.cleanup?.();
    buttonAction5.cleanup?.();
    buttonAction6.cleanup?.();
    buttonActionPoint.cleanup?.();
    buttonActionPlus.cleanup?.();
    buttonAction7.cleanup?.();
    buttonAction8.cleanup?.();
    buttonAction9.cleanup?.();
    buttonAction0.cleanup?.();
  };

  return main;
};
