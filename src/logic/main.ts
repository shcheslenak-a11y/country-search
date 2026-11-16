import { Error404 } from "../errors.js";
import { CardInfo } from "../interfaces.js";

export function createMain(
  resultHandler: (data: Array<CardInfo>) => void,
  e404Handler: (err: Error404) => void,
  otherErrorsHandler: (err: Error) => void,
): (query: string) => void {
  console.log(resultHandler, e404Handler, otherErrorsHandler);
  throw new Error("NotImplemnted");
}
