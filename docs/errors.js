export class HTTPError extends Error {
    constructor(code, message) {
        super(`${code}: ${message}`);
        this.name = "HTTPError";
    }
}
export class Error404 extends Error {
    constructor(query) {
        super(`For '${query}' Nothing found`);
        this.name = "Error404";
    }
}
//# sourceMappingURL=errors.js.map