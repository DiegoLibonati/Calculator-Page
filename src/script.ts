const windowCalculator = document.querySelector(
  ".mirror_container_window"
) as HTMLElement;
const btnsCalculator = document.querySelectorAll(".button") as NodeList;

let currentOperation: string;
let value1: string;
let value2: string;
let useEqual: boolean = false;

const getButtonFunction = (e: Event) => {
  const btn = e.target as HTMLElement;
  const btnId = btn.id;

  if (btnId === "." && windowCalculator.textContent?.includes(".")) return;

  if (parseInt(btnId) || btnId === "." || btnId === "0") {
    if ((windowCalculator.textContent === "0" || useEqual) && btnId !== ".") {
      windowCalculator.textContent = btnId;
      useEqual = false;
      return;
    }

    windowCalculator.textContent += btnId;
    console.log("Soy un numero");
    return;
  }

  if (btnId === "=") {
    useEqual = true;

    if (!value1) value1 = windowCalculator.textContent!;
    else value2 = windowCalculator.textContent!;

    console.log("IGUAL");
    const result = resultOfOperation(value1, value2, currentOperation);
    console.log(value1);
    windowCalculator.textContent = Math.floor(result!)
      ? String(result)
      : value1
      ? value1
      : "0";

    value1 = null!;
    value2 = null!;

    return;
  }

  if (btnId === "+" || btnId === "-" || btnId === "x" || btnId === "/") {
    currentOperation = btnId;

    // Ver de sacar esto afeura del if
    if (!value1) value1 = windowCalculator.textContent!;
  }

  if (btnId === "c") {
    windowCalculator.textContent = "0";
    value1 = null!;
    value2 = null!;
    currentOperation = null!;
    useEqual = false;
  }

  if (btnId === "ce") {
    windowCalculator.textContent = "0";
  }

  if (btnId === "%") {
    windowCalculator.textContent = String(
      parseFloat(windowCalculator.textContent!) / 100
    );
    return
  }

  windowCalculator.textContent = "0";

  console.log("Soy otra cosa");
};

const resultOfOperation = (
  num1: string,
  num2: string,
  operation: string
): number | void => {
  if (operation === "+") return parseFloat(num1) + parseFloat(num2);
  if (operation === "-") return parseFloat(num1) - parseFloat(num2);
  if (operation === "x") return parseFloat(num1) * parseFloat(num2);
  if (operation === "/") return parseFloat(num1) / parseFloat(num2);
};

btnsCalculator.forEach((btn) => {
  btn.addEventListener("click", (e) => getButtonFunction(e));
});
