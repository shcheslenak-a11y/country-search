import { Error404 } from "../errors.js";
import { CardInfo } from "../interfaces.js";
export declare function createMain(resultHandler: (data: Array<CardInfo>) => void, e404Handler: (err: Error404) => void, otherErrorsHandler: (err: Error) => void, cache?: Map<string, Array<CardInfo>>): (query: string) => void;
//# sourceMappingURL=main.d.ts.map