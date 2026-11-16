import {
  describe,
  expect,
  test,
  jest,
  beforeEach,
  afterEach,
} from "@jest/globals";
import { debounce } from "../../src/logic/debounce";

describe("debounce function", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  test("debounce retturn a function", () => {
    const fun = jest.fn();
    const debounced = debounce(fun, 500);
    expect(typeof debounced).toBe("function");
  });
  test("should delay function call", () => {
    const fun1 = jest.fn();
    const debounced = debounce(fun1, 500);
    debounced();
    expect(fun1).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(490);
    expect(fun1).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(10);
    expect(fun1).toHaveBeenCalledTimes(1);
  });

  test("should call fn function once", async () => {
    const fun2 = jest.fn();
    const debounced = debounce(fun2, 500);
    debounced();
    jest.advanceTimersByTime(200);
    debounced();
    jest.advanceTimersByTime(200);
    debounced();
    jest.advanceTimersByTime(500);
    expect(fun2).toHaveBeenCalledTimes(1);
  });

  test("should call fn function with last argument", async () => {
    const fun2 = jest.fn();
    const debounced = debounce(fun2, 500);
    debounced("s");
    debounced("sp");
    debounced("spain");
    jest.advanceTimersByTime(500);
    expect(fun2).toHaveBeenCalledTimes(1);
    expect(fun2).toHaveBeenCalledWith("spain");
  });
});
