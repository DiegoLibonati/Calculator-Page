# Calculator-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`

## Description

I made a web page that has a calculator to use. This calculator can add, subtract, multiply and divide. You can also get percentages, use negative numbers, decimal numbers and finally you can perform actions like `CE` and `AC`.

## Technologies used

1. Typescript
2. CSS3
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/82`](https://www.diegolibonati.com.ar/#/project/82)

## Video

https://user-images.githubusercontent.com/99032604/200717158-6b4fc49c-3a07-46f6-81cd-fdfab60ed0b8.mp4

## Documentation

In `windowCalculator` we get the screen where the numbers, results etc. will be displayed:

```
const windowCalculator = document.querySelector(".mirror_container_window") as HTMLElement;
```

In `btnsCalculator` we obtain all the buttons with which we are going to execute actions of the calculator:

```
const btnsCalculator = document.querySelectorAll(".button") as NodeList;
```

The `userUseComa` variable will allow us to decide when the user will be able to use comma or not. The `resultArray` variable is where the number to calculate after an action is executed will be stored. The variable `saveLastOperation` is where the last executed action will be stored. The variable ``saveExecuteAnOperation` will be used to know when the user clicked on an action:

```
let userUseComma: boolean = false;
let resultArray: string[] = [];
let saveLastOperation: string = "";
let saveExecuteAnOperation: boolean = false;
```

In this code block, we are going to go through all the buttons and to each button we will assign the function `getButtonFunction` when you click on any button it will execute that function:

```
btnsCalculator.forEach((btn) => {
  btn.addEventListener("click", (e) => getButtonFunction(e));
});
```

We will get the ID of the element that was clicked. If the element is a number, the number will be displayed on the screen. In case it is not a number it will execute a switch to know what action the user executed, if a comma, add, subtract, etc. If it was an action such as add, subtract, multiply or divide to know the result it will execute the result of the function `resultOfOperation()` that receives two numbers and the string of the operation to be performed. Pressing the equal will return the result, pressing `AC` will erase the number and pressing `CE` will erase one by one the last digit entered:

```
const getButtonFunction = (e: Event) => {
  const btn = e.target as HTMLElement
  const btnId = btn.id;

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
        resultArray.push(windowCalculator.textContent!);
        windowCalculator.textContent = "0";
        saveLastOperation = "+";
      } else {
       windowCalculator.textContent =  String(resultOfOperation(
          resultArray[0],
          windowCalculator.textContent!,
          saveLastOperation
        ));

        saveLastOperation = "+";
        resultArray = [windowCalculator.textContent!];
        saveExecuteAnOperation = true;
      }

      break;
    case "-":
      userUseComma = false;

      if (resultArray.length === 0) {
        resultArray.push(windowCalculator.textContent!);
        windowCalculator.textContent = "0";
        saveLastOperation = "-";
      } else {
        windowCalculator.textContent = String(resultOfOperation(
          resultArray[0],
          windowCalculator.textContent!,
          saveLastOperation
        ));
        saveLastOperation = "-";
        resultArray = [windowCalculator.textContent!];
        saveExecuteAnOperation = true;
      }

      break;

    case "/":
      userUseComma = false;

      if (resultArray.length === 0) {
        resultArray.push(windowCalculator.textContent!);
        windowCalculator.textContent = "0";
        saveLastOperation = "/";
      } else {
        windowCalculator.textContent = String(resultOfOperation(
          resultArray[0],
          windowCalculator.textContent!,
          saveLastOperation
        ));
        saveLastOperation = "/";
        resultArray = [windowCalculator.textContent!];
        saveExecuteAnOperation = true;
      }

      break;

    case "x":
      userUseComma = false;

      if (resultArray.length === 0) {
        resultArray.push(windowCalculator.textContent!);
        windowCalculator.textContent = "0";
        saveLastOperation = "x";
      } else {
        windowCalculator.textContent = String(resultOfOperation(
          resultArray[0],
          windowCalculator.textContent!,
          saveLastOperation
        ))
        saveLastOperation = "x";
        resultArray = [windowCalculator.textContent!];
        saveExecuteAnOperation = true;
      }

      break;

    case "%":
      userUseComma = false;
      if (resultArray.length === 0) {
        resultArray.push(windowCalculator.textContent!);
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
        windowCalculator.textContent!.length === 0 ||
        windowCalculator.textContent!.length === 1
      ) {
        windowCalculator.textContent = "0";
      } else if (windowCalculator.textContent!.length > 0) {
        windowCalculator.textContent = windowCalculator.textContent!.slice(
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
        windowCalculator.textContent = String(resultOfOperation(
          resultArray[0],
          windowCalculator.textContent!,
          saveLastOperation
        ));

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
```
