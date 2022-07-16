import React from "react";
import { create } from "react-test-renderer";
import type { FC } from 'react';

import toThrowWhileRender from "./toThrowWhileRender";

const EXPECTED_ERROR = new Error("Test error");

const ThrowingComponent: FC<{ error: Error }> = ({ error = EXPECTED_ERROR }) => {
  throw error;
};

const Component: FC = () => null;

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
    consoleSpy.mockRestore();
  });

  it("throws expected error", () => {
    const render = () => create(React.createElement(ThrowingComponent));
    expect(render).toThrowWhileRender(EXPECTED_ERROR);
  });

  it("fail when not throw", () => {
    const render = () => create(React.createElement(Component));
    expect(render).not.toThrowWhileRender();
  });

  it("fail when throws unexpected error", () => {
    const unexpectedError = new Error("Test error 1");
    const render = () => create(React.createElement(ThrowingComponent, {
      error: unexpectedError
    }));

    expect(() => {
      expect(render).toThrowWhileRender(EXPECTED_ERROR);
    }).toThrow();
  });
});
