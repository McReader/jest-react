export type RestoreJsDomLogs = () => void;

const suppressJsDomError = (error: Error): RestoreJsDomLogs => {
  const onGlobalError = (event: ErrorEvent) => {
    if (event.error === error) {
      event.preventDefault();
    }
  };

  window.addEventListener("error", onGlobalError);

  return () => {
    window.removeEventListener("error", onGlobalError);
  };
};

export default suppressJsDomError;
