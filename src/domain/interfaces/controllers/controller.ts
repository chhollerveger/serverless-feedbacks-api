import { HttpResponse } from "src/domain/http/http-response";

export interface IController {
  handle: (body: string) => Promise<HttpResponse>;
}