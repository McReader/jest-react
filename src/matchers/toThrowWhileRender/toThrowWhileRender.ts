import defaultMatchers from "../defaultMatchers";

import suppressJsDomError, { RestoreJsDomLogs } from "./suppressJsDomError";
import suppressReactErrorBoundaryError from "./suppressReactErrorBoundaryError";
import isJsDomEnv from "./isJsDomEnv";

const { toThrow } = defaultMatchers;

function toThrowWhileRender(
  this: jest.MatcherContext,
  actual: () => void,
  expected: Error,
): jest.CustomMatcherResult {
  let restoreJsDomVirtualConsole: RestoreJsDomLogs | undefined;

  if (isJsDomEnv()) {
    restoreJsDomVirtualConsole = suppressJsDomError(expected);
  }

  const restoreConsoleError = suppressReactErrorBoundaryError(expected);

  try {
    return toThrow.call(this, actual, expected);
  } finally {
    restoreJsDomVirtualConsole?.();
    restoreConsoleError();
  }
}

export default toThrowWhileRender;
