import { getResultOfOperation } from "@/helpers/getResultOfOperation";

describe("getResultOfOperation", () => {
  it("should add two numbers", () => {
    expect(getResultOfOperation("5", "3", "+")).toBe(8);
  });

  it("should subtract two numbers", () => {
    expect(getResultOfOperation("10", "4", "-")).toBe(6);
  });

  it("should multiply two numbers", () => {
    expect(getResultOfOperation("6", "7", "x")).toBe(42);
  });

  it("should divide two numbers", () => {
    expect(getResultOfOperation("20", "4", "/")).toBe(5);
  });

  it("should return 0 when dividing by zero", () => {
    expect(getResultOfOperation("10", "0", "/")).toBe(0);
  });

  it("should handle decimal numbers", () => {
    expect(getResultOfOperation("5.5", "2.5", "+")).toBe(8);
    expect(getResultOfOperation("10.5", "2.5", "-")).toBe(8);
  });

  it("should return 0 for unknown operation", () => {
    expect(getResultOfOperation("5", "3", "unknown")).toBe(0);
  });
});
