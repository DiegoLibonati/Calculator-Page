export const getElements = () => ({
  windowCalculator: document.querySelector(
    ".mirror_container_window"
  ) as HTMLElement,
  btnsCalculator: document.querySelectorAll(".button") as NodeList,
});
