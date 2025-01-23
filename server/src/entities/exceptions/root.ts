// message, statuscode, errorcodes, error

export class HttpException extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  errors: any;

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    error: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = error;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  ENTITY_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  UNPROCESSIBLE_ENTITY = 1004,
  INTERNAL_EXCEPTION = 1005,
  UNAUTHORIZED = 1006,
  FILTER_NOT_EXISTING = 1007,
  WRONG_PLACE_ID = 1008,
  UNSUPPORTED_FILE_TYPE = 1009,
  ENTITY_NOT_FOUND = 2001,
  INSUFFICIENT = 2002
}
