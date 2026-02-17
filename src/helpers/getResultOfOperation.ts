export const getResultOfOperation = (
  num1: string,
  num2: string,
  operation: string
): number => {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  switch (operation) {
    case "+":
      return n1 + n2;
    case "-":
      return n1 - n2;
    case "x":
      return n1 * n2;
    case "/":
      return n2 !== 0 ? n1 / n2 : 0;
    default:
      return 0;
  }
};
