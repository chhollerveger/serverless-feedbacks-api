import { HttpResponseHeader } from "./http-response-header";

export type HttpResponse = {
  statusCode: number;
  headers: HttpResponseHeader;
  body: string;
}