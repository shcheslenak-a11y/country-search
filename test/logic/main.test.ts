import {
  describe,
  expect,
  test,
  jest,
  beforeAll,
  afterAll,
} from "@jest/globals";
import { createMain } from "../../src/logic/main";
import { debounce } from "../../src/logic/debounce";

describe("main function", () => {
  beforeAll(() => {
    jest.spyOn(global, "fetch").mockImplementation((path: string) => {
      const query = path.slice(path.lastIndexOf("/") + 1);
      let resp;
      switch (query) {
        case "s":
          resp = '[{"name": "s1", "region": "A", "subregion": "B"}]';
          break;
        case "sp":
          resp = '[{"name": "s2", "region": "A", "subregion": "B"}]';
          break;
        default:
          resp = "[]";
          break;
      }
      return Promise.resolve(new Response(resp));
    });
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });
  test("race test", async () => {
    const normal = jest.fn();
    const e404 = jest.fn();
    const others = jest.fn();
    const main = createMain(normal, e404, others);
    const debounced = debounce(main, 500);
    new Promise(() => {
      debounced("s");
      main("sp");
    }).then(() => {
      expect(e404).toHaveBeenCalledTimes(0);
      expect(others).toHaveBeenCalledTimes(0);
      expect(normal).toHaveBeenCalledTimes(1);
      expect(normal).toHaveBeenCalledWith([
        {
          name: "s2",
          flag: "none",
          capital: "",
          region: "A/B",
          population: 0,
          languages: [],
          currencies: [],
          area: 0,
          borders: [],
        },
      ]);
    });
  });
});
