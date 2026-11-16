export function handleErrors(
  error: Error,
  callback404: (err: Error) => void,
  callbackHTTP: (err: Error) => void,
  timeout: (err: Error) => void,
  others: (err: Error) => void,
): void {
  console.log(error, callback404, callbackHTTP, timeout, timeout, others);
  throw new Error("NotImplemented");
}
