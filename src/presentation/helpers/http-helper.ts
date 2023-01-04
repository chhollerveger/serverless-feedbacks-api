import { GenericType } from "src/domain/common/generic-type";
import { BadRequestException } from "src/domain/exceptions/bad-request-exception";
import { InfrastructureException } from "src/domain/exceptions/infrastructure-exception";
import { HttpResponse } from "src/domain/http/http-response";
import { HttpResponseHeader } from "src/domain/http/http-response-header";

const makeHttpResponseHeaders = (): HttpResponseHeader => {
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  }
}

export class HttpHelper {

  public static ok = (data: GenericType<{} | []>): HttpResponse => ({
    statusCode: 200,
    headers: makeHttpResponseHeaders(),
    body: JSON.stringify({ data })
  });

  public static created = (data: GenericType<{}>): HttpResponse => ({
    statusCode: 201,
    headers: makeHttpResponseHeaders(),
    body: JSON.stringify({ data })
  });

  public static badRequestException = (error: BadRequestException): HttpResponse => ({
    statusCode: BadRequestException.statusCode,
    headers: makeHttpResponseHeaders(),
    body: JSON.stringify(error)
  });

  public static infrastructureException = (error: InfrastructureException): HttpResponse => ({
    statusCode: InfrastructureException.statusCode,
    headers: makeHttpResponseHeaders(),
    body: JSON.stringify((error instanceof InfrastructureException) ? error : new InfrastructureException('Internal server error'))
  });

  public static handleException = (error: BadRequestException | InfrastructureException): HttpResponse => {
    return (error instanceof BadRequestException)
      ? HttpHelper.badRequestException(error)
      : HttpHelper.infrastructureException(error)
  }
}
