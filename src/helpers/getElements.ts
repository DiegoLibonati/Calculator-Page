export const getElements = () => ({
  windowCalculator: document.querySelector(
    ".mirror__window"
  ) as HTMLElement,
  btnsCalculator: document.querySelectorAll(".button") as NodeList,
});
