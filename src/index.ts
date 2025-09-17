import { BtnPressed, Number, Operation, Special } from "@src/entities/vite-env";

import { getElements } from "@src/helpers/getElements";
import { getResultOfOperation } from "@src/helpers/getResultOfOperation";

const numbers: Number[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operations: Operation[] = ["+", "-", "/", "x"];
const specials: Special[] = [".", "=", "c", "ce", "%"];

let prevOperation: string | null;
let prevValue: string | null;
let lastButtonPressed: string | null;
let resetScreenNumber: boolean;

const onClickNumber = (value: Number): void => {
  const { windowCalculator } = getElements();
  const currentValue = windowCalculator.textContent;

  resetScreenNumber = currentValue === "0" ? true : resetScreenNumber;

  if (resetScreenNumber) {
    windowCalculator.textContent = value;
    resetScreenNumber = false;
    return;
  }

  windowCalculator.textContent += value;
};

const onClickOperation = (value: Operation) => {
  const { windowCalculator } = getElements();
  const currentValue = windowCalculator.textContent!;
  const currentOperation = value;

  if (operations.includes(lastButtonPressed as Operation)) {
    prevOperation = currentOperation;
    return;
  }

  resetScreenNumber = true;

  if (prevOperation && prevValue) {
    const result = String(
      getResultOfOperation(prevValue, currentValue, prevOperation)
    );

    windowCalculator.textContent = result;
    prevValue = result;
    prevOperation = currentOperation;
    return;
  }

  prevValue = currentValue!;
  prevOperation = currentOperation;
  windowCalculator.textContent = "0";
};

const onClickSpecial = (value: Special) => {
  const { windowCalculator } = getElements();
  const currentValue = windowCalculator.textContent;

  if (value === "." && currentValue?.includes(".")) return;
  if (value === "=" && (!prevValue || !prevOperation)) return;

  switch (value) {
    case ".":
      windowCalculator.textContent += value;
      break;
    case "=":
      const result = String(
        getResultOfOperation(prevValue!, currentValue!, prevOperation!)
      );

      windowCalculator.textContent = result;
      prevValue = result;
      prevOperation = null;
      resetScreenNumber = true;
      break;
    case "c":
      setInitialValues();
      break;
    case "ce":
      windowCalculator.textContent = "0";
      break;
    case "%":
      windowCalculator.textContent = String(
        parseFloat(windowCalculator.textContent!) / 100
      );
      break;
    default:
      break;
  }
};

const setInitialValues = (): void => {
  const { windowCalculator } = getElements();

  prevOperation = null;
  prevValue = null;
  lastButtonPressed = null;
  resetScreenNumber = false;

  windowCalculator.textContent = "0";
};

const handleClickButtonCalculator = (e: Event) => {
  const btn = e.target as HTMLElement;
  const btnPressed = btn.id as BtnPressed;

  if (operations.includes(btnPressed as Operation))
    onClickOperation(btnPressed as Operation);
  else if (numbers.includes(btnPressed as Number))
    onClickNumber(btnPressed as Number);
  else if (specials.includes(btnPressed as Special))
    onClickSpecial(btnPressed as Special);

  lastButtonPressed = btnPressed;
};

const onInit = () => {
  const { btnsCalculator } = getElements();

  setInitialValues();

  btnsCalculator.forEach((btn) =>
    btn.addEventListener("click", (e) => handleClickButtonCalculator(e))
  );
};

document.addEventListener("DOMContentLoaded", onInit);
