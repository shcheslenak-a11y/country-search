export class HTTPError extends Error {
  constructor(code: number, message: string) {
    super(`${code}: ${message}`);
  }
}

export class Error404 extends Error {
  constructor(query: string) {
    super(`For '${query}' Nothing found`);
  }
}
