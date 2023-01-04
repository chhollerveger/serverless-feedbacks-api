import { Exception } from "./exception";

export class InfrastructureException extends Exception {
  public static statusCode = 500;
  public static code = 'Server Error';
  constructor(message: string) {
    super(InfrastructureException.code, message);
  }
}