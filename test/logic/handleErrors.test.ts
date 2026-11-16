import { describe, expect, test, jest } from "@jest/globals";
import { handleErrors } from "../../docs/logic/handleErrors";
import { Error404, HTTPError } from "../../docs/errors";

describe("handleErrors function", () => {
  test("should handle 404 error", () => {
    const handle404 = jest.fn();
    const empty = jest.fn();
    handleErrors(new Error404(""), handle404, empty, empty, empty);
    expect(handle404).toHaveBeenCalledTimes(1);
    expect(empty).toHaveBeenCalledTimes(0);
  });

  test("should handle HTTP errors", () => {
    const handleHTTP = jest.fn();
    const empty = jest.fn();
    handleErrors(new HTTPError(100, ""), empty, handleHTTP, empty, empty);
    expect(handleHTTP).toHaveBeenCalledTimes(1);
    expect(empty).toHaveBeenCalledTimes(0);
  });

  test("should handle unkonwn error", async () => {
    const timeout = jest.fn();
    const empty = jest.fn();
    handleErrors(
      new DOMException("", "TimeoutError"),
      empty,
      empty,
      timeout,
      empty,
    );
    expect(timeout).toHaveBeenCalledTimes(1);
    expect(empty).toHaveBeenCalledTimes(0);
  });

  test("should handle others", async () => {
    const others = jest.fn();
    const empty = jest.fn();
    handleErrors(new Error(""), empty, empty, empty, others);
    expect(others).toHaveBeenCalledTimes(1);
    expect(empty).toHaveBeenCalledTimes(0);
  });

  test("should ignore AbortError", async () => {
    const abort = jest.fn();
    const empty = jest.fn();
    handleErrors(
      new DOMException("", "AbortError"),
      empty,
      empty,
      abort,
      empty,
    );
    expect(abort).toHaveBeenCalledTimes(0);
    expect(empty).toHaveBeenCalledTimes(0);
  });

  test("should proccess other DOMException as unkonwn error", async () => {
    const others = jest.fn();
    const empty = jest.fn();
    handleErrors(
      new DOMException("", "SomeError"),
      empty,
      empty,
      empty,
      others,
    );
    expect(others).toHaveBeenCalledTimes(1);
    expect(empty).toHaveBeenCalledTimes(0);
  });
});
