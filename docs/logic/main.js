import { handleErrors } from "./handleErrors.js";
import { mapCountryResponse } from "./mapCountryResponse.js";
import { searchCountries } from "./searchCountries.js";
export function createMain(resultHandler, e404Handler, otherErrorsHandler, cache = new Map()) {
    let controller = null;
    let latest_query = null;
    return function (query) {
        if (latest_query === query) {
            return;
        }
        latest_query = query;
        if (controller) {
            controller.abort();
            controller = null;
        }
        let dataSource;
        if (cache.has(query))
            dataSource = Promise.resolve(cache.get(query) || []);
        else {
            controller = new AbortController();
            dataSource = searchCountries(query, AbortSignal.any([controller.signal, AbortSignal.timeout(60000)]))
                .then(mapCountryResponse)
                .then((data) => {
                cache.set(query, data);
                return data;
            });
        }
        dataSource
            .then(resultHandler)
            .catch((e) => handleErrors(e, e404Handler, otherErrorsHandler, otherErrorsHandler, otherErrorsHandler));
    };
}
//# sourceMappingURL=main.js.map