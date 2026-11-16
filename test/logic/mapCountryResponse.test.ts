import { describe, expect, test } from "@jest/globals";
import { mapCountryResponse } from "../../src/logic/mapCountryResponse";
import cases from "./mapCountryResponseCases.json" with { type: "json" };
import { CardInfo, Country } from "../../src/interfaces";

describe("mapCountryResponse function", () => {
  test("should parse country info", () => {
    cases.forEach((item: { in: Array<Country>; out: Array<CardInfo> }) =>
      expect(mapCountryResponse(item.in)).toEqual(item.out),
    );
  });
});
