import { create } from "react-test-renderer";
import { ReactElement } from 'react';

import toThrowWhileRender from "../toThrowWhileRender";

const EXPECTED_ERROR = new Error("Test error");

function Component() {
  return <div />;
}

function ThrowingComponent({ error = EXPECTED_ERROR }): ReactElement {
  throw error;
}

const render = (element: ReactElement) => {
  create(element);
};

describe('toThrowWhileRender', () => {
  beforeAll(() => {
    expect.extend({
      toThrowWhileRender,
    });
  });

  let consoleSpy: jest.SpyInstance;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "error");
  });

  afterEach(() => {
    // eslint-disable-next-line jest/no-standalone-expect
    expect(consoleSpy).toHaveBeenCalledTimes(0);
    consoleSpy.mockRestore();
  });

  it("throws expected error", () => {
    expect(() => { render(<ThrowingComponent />) }).toThrowWhileRender(EXPECTED_ERROR);
  });

  it("fail when not throw", () => {
    expect(() => { render(<Component /> ) }).not.toThrowWhileRender();
  });

  it("fail when throws unexpected error", () => {
    const unexpectedError = new Error("Test error 1");
    expect(() => { render(<ThrowingComponent error={unexpectedError} />) }).toThrowWhileRender(unexpectedError);
  });
});
