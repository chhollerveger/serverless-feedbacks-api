import { Exception } from "./exception";

export class BadRequestException extends Exception {
  public static code = 'Bad Request';
  public static statusCode = 400;
  constructor(message: string) {
    super(BadRequestException.code, message);
  }
}