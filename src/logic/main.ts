import { Error404 } from "../errors";
import { CardInfo } from "../interfaces";
import { handleErrors } from "./handleErrors";
import { mapCountryResponse } from "./mapCountryResponse";
import { searchCountries } from "./searchCountries";

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
      AbortSignal.any([controller.signal, AbortSignal.timeout(2000)]),
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
