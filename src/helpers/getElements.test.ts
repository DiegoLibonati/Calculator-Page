import { getElements } from "./getElements";

import { OFFICIAL_BODY } from "../tests/jest.setup";

beforeEach(() => {
  document.body.innerHTML = OFFICIAL_BODY;
});

afterEach(() => {
  document.body.innerHTML = "";
});

test("It must render the elements of the document that the 'getElements' function exports.", () => {
  const { btnsCalculator, windowCalculator } = getElements();

  expect(windowCalculator).toBeInTheDocument();

  for (let btnCalculator of btnsCalculator) {
    expect(btnCalculator).toBeInTheDocument();
  }
});
