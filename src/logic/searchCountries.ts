import { Country } from "../interfaces.js";

export function searchCountries(
  query: string,
  signal: AbortSignal,
): Promise<Array<Country>> {
  console.log(query, signal);
  throw new Error("NotImplemented");
}
