import { Error404 } from "../errors.js";
import { CardInfo } from "../interfaces.js";
import { handleErrors } from "./handleErrors.js";
import { mapCountryResponse } from "./mapCountryResponse.js";
import { searchCountries } from "./searchCountries.js";

export function createMain(
  resultHandler: (data: Array<CardInfo>) => void,
  e404Handler: (err: Error404) => void,
  otherErrorsHandler: (err: Error) => void,
  cache: Map<string, Array<CardInfo>> = new Map(),
): (query: string) => void {
  let controller: AbortController | null = null;
  let latest_query: string | null = null;
  return function (query: string) {
    if (latest_query === query) {
      return;
    }
    latest_query = query;
    if (controller) {
      controller.abort();
      controller = null;
    }
    let dataSource: Promise<Array<CardInfo>>;
    if (cache.has(query)) dataSource = Promise.resolve(cache.get(query) || []);
    else {
      controller = new AbortController();
      dataSource = searchCountries(
        query,
        AbortSignal.any([controller.signal, AbortSignal.timeout(60000)]),
      )
        .then(mapCountryResponse)
        .then((data) => {
          cache.set(query, data);
          return data;
        });
    }
    dataSource
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
