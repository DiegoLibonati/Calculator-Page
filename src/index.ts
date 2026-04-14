import "@/index.css";
import CalcifyPage from "@/pages/CalcifyPage/CalcifyPage";

const onInit = (): void => {
  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) throw new Error(`You must render a container to mount the app.`);

  const calcifyPage = CalcifyPage();
  app.appendChild(calcifyPage);
};

document.addEventListener("DOMContentLoaded", onInit);
