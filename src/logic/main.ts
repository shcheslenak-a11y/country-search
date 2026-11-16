import { Error404 } from "../errors.js";
import { CardInfo } from "../interfaces.js";
import { handleErrors } from "./handleErrors.js";
import { mapCountryResponse } from "./mapCountryResponse.js";
import { searchCountries } from "./searchCountries.js";

export function createMain(
  resultHandler: (data: Array<CardInfo>) => void,
  e404Handler: (err: Error404) => void,
  otherErrorsHandler: (err: Error) => void,
): (query: string) => void {
  let controller: AbortController | null = null;
  return function (query: string) {
    if (controller) {
      controller.abort();
      controller = null;
    }
    controller = new AbortController();
    searchCountries(
      query,
      AbortSignal.any([controller.signal, AbortSignal.timeout(5000)]),
    )
      .then(mapCountryResponse)
      .then(resultHandler)
      .catch((e) =>
        handleErrors(
          e,
          e404Handler,
          otherErrorsHandler,
          otherErrorsHandler,
          otherErrorsHandler,
        ),
      );
  };
}
