export function handleErrors(
  error: Error,
  callback404: (err: Error) => void,
  callbackHTTP: (err: Error) => void,
  timeout: (err: Error) => void,
  others: (err: Error) => void,
): void {
  function getCallback(name: string) {
    switch (name) {
      case "Error404":
        return callback404;
      case "HTTPError":
        return callbackHTTP;
      case "TimeoutError":
        return timeout;
      case "AbortError":
        return () => {};
      default:
        return others;
    }
  }
  getCallback(error.name)(error);
}
