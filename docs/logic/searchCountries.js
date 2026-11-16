import { Error404, HTTPError } from "../errors.js";
export function searchCountries(query, signal) {
    if (query.length === 0)
        return Promise.resolve([]);
    return fetch(`https://countries.dev/name/${query}`, { signal: signal })
        .then((response) => {
        if (response.ok)
            return response;
        if (response.status === 404)
            throw new Error404(query);
        throw new HTTPError(response.status, response.statusText);
    })
        .then((resp) => resp.json());
}
//# sourceMappingURL=searchCountries.js.map