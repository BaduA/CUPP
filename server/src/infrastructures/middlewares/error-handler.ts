import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { ErrorCode, HttpException } from "../../entities/exceptions/root";
import { InternalException } from "../../entities/exceptions/internal-exception";
import { BadRequestsException } from "../../entities/exceptions/bad-request";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      res = await method(req, res, next);
    } catch (error: any) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else if (error instanceof ZodError) {
        exception = new BadRequestsException(
          "Eksik alan mevcut.",
          ErrorCode.UNPROCESSIBLE_ENTITY,
          error
        );
      } else {
        console.log(error)
        exception = new InternalException(
          "Something went wrong!",
          error,
          ErrorCode.INTERNAL_EXCEPTION
        );
      }
      next(exception);
    }
  };
};
