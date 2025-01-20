import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../../entities/exceptions/unauthorized";
import { ErrorCode } from "../../entities/exceptions/root";
import { JWT_SECRET } from "../../secrets";
import { IRepository } from "../repositories/IRepository";

const jwt = require("jsonwebtoken");

export class AuthMiddleware {
  private repository: IRepository;
  constructor(repository: IRepository) {
    this.repository = repository;
  }

  authorizeUser(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return next(
        new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
      );
    console.log("QQQQQ")
    var repo = this.repository
    console.log("MMMM")
    jwt.verify(token, JWT_SECRET, async (err: any, user: any) => {
      if (err) {
        console.log(err)
        return next(
          new UnauthorizedException(
            "Some Error Occured",
            ErrorCode.UNAUTHORIZED
          )
        );
      }
      const userFromId = await repo.findFirst(
        {
          id: user.userId,
        },
        {},
        {
        }
      );
      if (!userFromId)
        return next(
          new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED)
        );
      req.user = userFromId!;

      next();
    });
  }
}
