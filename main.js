const windowCalculator = document.querySelector(".mirror_container_window");
const btnsCalculator = document.querySelectorAll(".button");

let userUseComma = false;
let resultArray = [];
let saveLastOperation = "";
let saveExecuteAnOperation = false;

const getButtonFunction = (e) => {
  const btnId = e.target.id;

  if (parseFloat(btnId) || btnId === "0") {
    if (windowCalculator.textContent === "0" || saveExecuteAnOperation) {
      windowCalculator.textContent = btnId;
      saveExecuteAnOperation = false;
      return;
    }

    windowCalculator.textContent += btnId;
    return;
  }

  switch (btnId) {
    case "+":
      userUseComma = false;
      if (resultArray.length === 0) {
        resultArray.push(windowCalculator.textContent);
        windowCalculator.textContent = "0";
        saveLastOperation = "+";
      } else {
        windowCalculator.textContent = resultOfOperation(
          resultArray[0],
          windowCalculator.textContent,
          saveLastOperation
        );

        saveLastOperation = "+";
        resultArray = [windowCalculator.textContent];
        saveExecuteAnOperation = true;
      }

      break;
    case "-":
      userUseComma = false;

      if (resultArray.length === 0) {
        resultArray.push(windowCalculator.textContent);
        windowCalculator.textContent = "0";
        saveLastOperation = "-";
      } else {
        windowCalculator.textContent = resultOfOperation(
          resultArray[0],
          windowCalculator.textContent,
          saveLastOperation
        );
        saveLastOperation = "-";
        resultArray = [windowCalculator.textContent];
        saveExecuteAnOperation = true;
      }

      break;

    case "/":
      userUseComma = false;

      if (resultArray.length === 0) {
        resultArray.push(windowCalculator.textContent);
        windowCalculator.textContent = "0";
        saveLastOperation = "/";
      } else {
        windowCalculator.textContent = resultOfOperation(
          resultArray[0],
          windowCalculator.textContent,
          saveLastOperation
        );
        saveLastOperation = "/";
        resultArray = [windowCalculator.textContent];
        saveExecuteAnOperation = true;
      }

      break;

    case "x":
      userUseComma = false;

      if (resultArray.length === 0) {
        resultArray.push(windowCalculator.textContent);
        windowCalculator.textContent = "0";
        saveLastOperation = "x";
      } else {
        windowCalculator.textContent = resultOfOperation(
          resultArray[0],
          windowCalculator.textContent,
          saveLastOperation
        );
        saveLastOperation = "x";
        resultArray = [windowCalculator.textContent];
        saveExecuteAnOperation = true;
      }

      break;

    case "%":
      userUseComma = false;
      if (resultArray.length === 0) {
        resultArray.push(windowCalculator.textContent);
      }
      windowCalculator.textContent = `${parseFloat(resultArray[0]) / 100}`;
      resultArray = [];
      saveExecuteAnOperation = true;
      break;

    case "ce":
      userUseComma = false;
      windowCalculator.textContent = "0";

      break;

    case "ac":
      if (
        windowCalculator.textContent === "0" ||
        windowCalculator.textContent.length === 0 ||
        windowCalculator.textContent.length === 1
      ) {
        windowCalculator.textContent = "0";
      } else if (windowCalculator.textContent.length > 0) {
        windowCalculator.textContent = windowCalculator.textContent.slice(
          0,
          -1
        );
      }

      break;
    case "=":
      userUseComma = false;
      if (resultArray.length === 0) {
        windowCalculator.textContent = windowCalculator.textContent;
      } else {
        windowCalculator.textContent = resultOfOperation(
          resultArray[0],
          windowCalculator.textContent,
          saveLastOperation
        );

        resultArray = [];
        saveExecuteAnOperation = true;
      }

      break;
    default:
      if (!userUseComma) {
        windowCalculator.textContent += btnId;
        userUseComma = true;
      }
      break;
  }
};

const resultOfOperation = (num1, num2, operation) => {
  if (operation === "+") return parseFloat(num1) + parseFloat(num2);
  if (operation === "-") return parseFloat(num1) - parseFloat(num2);
  if (operation === "x") return parseFloat(num1) * parseFloat(num2);
  if (operation === "/") return parseFloat(num1) / parseFloat(num2);
};

btnsCalculator.forEach((btn) => {
  btn.addEventListener("click", (e) => getButtonFunction(e));
});
