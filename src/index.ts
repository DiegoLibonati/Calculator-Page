import "@/index.css";
import { CalculatorPage } from "@/pages/CalculatorPage/CalculatorPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const calculatorPage = CalculatorPage();
  app.appendChild(calculatorPage);
};

document.addEventListener("DOMContentLoaded", onInit);
