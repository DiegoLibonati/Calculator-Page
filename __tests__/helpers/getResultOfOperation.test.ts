import { getResultOfOperation } from "@/helpers/getResultOfOperation";

describe("getResultOfOperation", () => {
  describe("addition", () => {
    it("should return the sum of two integers", () => {
      expect(getResultOfOperation("2", "3", "+")).toBe(5);
    });

    it("should return the sum of two decimal numbers", () => {
      expect(getResultOfOperation("1.5", "2.5", "+")).toBe(4);
    });

    it("should return a negative result when first operand is negative", () => {
      expect(getResultOfOperation("-2", "1", "+")).toBe(-1);
    });

    it("should return the first operand when adding zero", () => {
      expect(getResultOfOperation("7", "0", "+")).toBe(7);
    });
  });

  describe("subtraction", () => {
    it("should return the difference of two integers", () => {
      expect(getResultOfOperation("5", "3", "-")).toBe(2);
    });

    it("should return a negative result when second operand is larger", () => {
      expect(getResultOfOperation("3", "5", "-")).toBe(-2);
    });

    it("should return zero when both operands are equal", () => {
      expect(getResultOfOperation("4", "4", "-")).toBe(0);
    });
  });

  describe("multiplication", () => {
    it("should return the product of two integers", () => {
      expect(getResultOfOperation("3", "4", "x")).toBe(12);
    });

    it("should return zero when multiplying by zero", () => {
      expect(getResultOfOperation("5", "0", "x")).toBe(0);
    });

    it("should return the product of two decimal numbers", () => {
      expect(getResultOfOperation("1.5", "2", "x")).toBe(3);
    });

    it("should return a negative product when one operand is negative", () => {
      expect(getResultOfOperation("-3", "4", "x")).toBe(-12);
    });
  });

  describe("division", () => {
    it("should return the quotient of two integers", () => {
      expect(getResultOfOperation("10", "2", "/")).toBe(5);
    });

    it("should return 0 when dividing by zero", () => {
      expect(getResultOfOperation("10", "0", "/")).toBe(0);
    });

    it("should return a decimal result for non-integer division", () => {
      expect(getResultOfOperation("1", "4", "/")).toBe(0.25);
    });

    it("should return zero when dividing zero by a number", () => {
      expect(getResultOfOperation("0", "5", "/")).toBe(0);
    });
  });

  describe("unknown operation", () => {
    it("should return 0 for an unrecognized operation symbol", () => {
      expect(getResultOfOperation("5", "3", "^")).toBe(0);
    });

    it("should return 0 for an empty operation string", () => {
      expect(getResultOfOperation("5", "3", "")).toBe(0);
    });
  });
});
