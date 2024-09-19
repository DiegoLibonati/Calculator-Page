# Calculator Page

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

[`https://www.diegolibonati.com.ar/#/project/Calculator-Page`](https://www.diegolibonati.com.ar/#/project/Calculator-Page)

## Video

https://github.com/DiegoLibonati/Calculator-Page/assets/99032604/eb5de2d8-87f8-4fd1-8b2c-fdb2e182ac84

## Documentation

In `windowCalculator` we get the screen where the numbers, results etc. will be displayed:

```
const windowCalculator = document.querySelector(".mirror_container_window") as HTMLElement;
```

In `btnsCalculator` we obtain all the buttons with which we are going to execute actions of the calculator:

```
const btnsCalculator = document.querySelectorAll(".button") as NodeList;
```

We declare 4 variables. Which `currentOperation` refers to the operation that was clicked. Then we have two variables which are `value1` and `value2` which are the values to calculate. And finally we have the `useEqual` which refers to when the equal is clicked:

```
let currentOperation: string;
let value1: string;
let value2: string;
let useEqual: boolean = false;
```

In this code block, we are going to go through all the buttons and to each button we will assign the function `getButtonFunction` when you click on any button it will execute that function:

```
btnsCalculator.forEach((btn) => {
  btn.addEventListener("click", (e) => getButtonFunction(e));
});
```

This function basically executes the function of each particular button. Through validations it knows which key is touched and which is its function:

```
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
    return;
  }

  if (btnId === "=") {
    useEqual = true;

    if (!value1) value1 = windowCalculator.textContent!;
    else value2 = windowCalculator.textContent!;

    const result = resultOfOperation(value1, value2, currentOperation);

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
}
```
