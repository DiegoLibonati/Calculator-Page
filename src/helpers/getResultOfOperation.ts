export const getResultOfOperation = (
  num1: string,
  num2: string,
  operation: string
): number | void => {
  if (operation === "+") return parseFloat(num1) + parseFloat(num2);
  else if (operation === "-") return parseFloat(num1) - parseFloat(num2);
  else if (operation === "x") return parseFloat(num1) * parseFloat(num2);
  else if (operation === "/") return parseFloat(num1) / parseFloat(num2);
};
