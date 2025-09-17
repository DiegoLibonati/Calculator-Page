import { getResultOfOperation } from "@src/helpers/getResultOfOperation";

describe("getResultOfOperation.ts", () => {
  describe("General Tests.", () => {
    const value1Test = "2";
    const value2Test = "2";

    test("It must return the sum of two string.", () => {
      const result = getResultOfOperation(value1Test, value2Test, "+");

      expect(result).toEqual(4);
    });

    test("It must return the subtraction of two string.", () => {
      const result = getResultOfOperation(value1Test, value2Test, "-");

      expect(result).toEqual(0);
    });

    test("It must return the multiplication of two string.", () => {
      const result = getResultOfOperation(value1Test, value2Test, "x");

      expect(result).toEqual(4);
    });

    test("It must return the division of two string.", () => {
      const result = getResultOfOperation(value1Test, value2Test, "/");

      expect(result).toEqual(1);
    });
  });
});
