export function handleErrors(error, callback404, callbackHTTP, timeout, others) {
    function getCallback(name) {
        switch (name) {
            case "Error404":
                return callback404;
            case "HTTPError":
                return callbackHTTP;
            case "TimeoutError":
                return timeout;
            case "AbortError":
                return () => { };
            default:
                return others;
        }
    }
    getCallback(error.name)(error);
}
//# sourceMappingURL=handleErrors.js.map