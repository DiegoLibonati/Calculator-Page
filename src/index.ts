import { CalculatorPage } from "@src/pages/CalculatorPage/CalculatorPage";

const onInit = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const calculatorPage = CalculatorPage();
  app.appendChild(calculatorPage);
};

document.addEventListener("DOMContentLoaded", onInit);
