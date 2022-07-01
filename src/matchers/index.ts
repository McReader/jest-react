/* eslint-disable import/prefer-default-export */

interface CustomMatchers<R = unknown> {
  toThrowWhileRender(error?: Error): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

export { default as toThrowWhileRender } from './toThrowWhileRender/toThrowWhileRender';
