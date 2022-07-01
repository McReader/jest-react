/* eslint-disable no-console */

export type RestoreConsoleError = () => void;

const isReactWarning = (error: unknown) =>
  typeof error === "string" && error.indexOf("The above error occurred") === 0;

const suppressReactErrorBoundaryError = (error: Error): RestoreConsoleError => {
  const logError = console.error;

  console.error = (e, ...args) => {
    if (isReactWarning(e)) {
      return;
    }

    if (e === error) {
      return;
    }

    logError(e, ...args);
  };

  return () => {
    console.error = logError;
  };
};

export default suppressReactErrorBoundaryError;
