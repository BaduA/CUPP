import { ErrorCode, HttpException } from "./root";

export class UnprocessibleEntity extends HttpException {
  constructor(error: any, message: string, errorCode: ErrorCode) {
    super(message, errorCode, 422, error);
  }
}
