import { describe, expect, test, jest, afterAll } from "@jest/globals";
import { searchCountries } from "../../src/logic/searchCountries";
import { Error404, HTTPError } from "../../src/errors";

const controller = new AbortController();

describe("searchCountries function", () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  test("should return promise", () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new Response("[1,2,3]")));
    const response = searchCountries("data", controller.signal);
    expect(typeof response.then).toBe("function");
  });

  test("Promise contain array of ", () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() => Promise.resolve(new Response("[1,2,3]")));
    searchCountries("data", controller.signal).then((data) => {
      expect(data).toEqual([1, 2, 3]);
    });
  });

  test("empty query return empty array", async () => {
    searchCountries("", controller.signal).then((data) =>
      expect(data.length).toBe(0),
    );
  });

  test("should throw 404 error if not found", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(new Response("", { status: 404 })),
      );
    searchCountries("dd", controller.signal).catch((e) =>
      expect(e).toBeInstanceOf(Error404),
    );
  });

  test("should throw HTTP error", async () => {
    jest
      .spyOn(global, "fetch")
      .mockImplementation(() =>
        Promise.resolve(
          new Response("", { status: 502, statusText: "Bad Gateway" }),
        ),
      );
    searchCountries("dd", controller.signal).catch((e) => {
      expect(e).toBeInstanceOf(HTTPError);
      expect(e.message).toEqual("502: Bad Gateway");
    });
  });
});
