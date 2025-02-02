import { NextFunction, Request, Response } from "express";
import { IUserInteractor } from "../../interactors/user/IUserInteractor";
import {
  ChangePasswordSchema,
  CodeGenerateSchema,
  CreateUserSchema,
  SignInSchema,
  UpdateUserSchema,
} from "../../entities/schemas/UserSchemas";
import { IVerifyUserCodeInteractor } from "../../interactors/verifyUserCode/IVerifyUserCodeInteractor";
import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";

export class UserController {
  private userInteractor: IUserInteractor;
  private verifyCodeInteractor: IVerifyUserCodeInteractor;
  constructor(
    userInteractor: IUserInteractor,
    verifyCodeInteractor: IVerifyUserCodeInteractor
  ) {
    this.userInteractor = userInteractor;
    this.verifyCodeInteractor = verifyCodeInteractor;
  }

  onSignUp = async (req: Request, res: Response, next: NextFunction) => {
    var profilePicture = req.file;
    CreateUserSchema.parse(req.body);
    const body = { ...req.body, profilePicture: profilePicture };
    var result = await this.userInteractor.signUp(body);
    // var code = await this.verifyCodeInteractor.create(result.id);
    return res.json(result);
  };
  onVerifyUserAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { verifyCode } = req.params;
    CodeGenerateSchema.parse(req.body);
    var code = await this.verifyCodeInteractor.getUnique(
      verifyCode,
      req.user.id
    );
    if (!code)
      throw new BadRequestsException(
        "Code not found",
        ErrorCode.ENTITY_NOT_FOUND
      );
    if (code.expiresAt - Date.now() > 0) {
      await this.userInteractor.updateUser({ id: req.user.id, verified: true });
    } else {
      throw new BadRequestsException(
        "Token Expired",
        ErrorCode.UNPROCESSIBLE_ENTITY
      );
    }
    return res.status(200).send();
  };
  onVerifyCode = async (req: Request, res: Response, next: NextFunction) => {
    const { verifyCode } = req.params;
    CodeGenerateSchema.parse(req.body);

    var code = await this.verifyCodeInteractor.getUniqueWithEmail(
      verifyCode,
      req.body.email
    );
    if (!code)
      throw new BadRequestsException(
        "Code not found",
        ErrorCode.ENTITY_NOT_FOUND
      );
    if (code.expiresAt - Date.now() > 0) {
    } else {
      throw new BadRequestsException(
        "Token Expired",
        ErrorCode.UNPROCESSIBLE_ENTITY
      );
    }
    return res.status(200).send();
  };
  onGenerateForEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    CodeGenerateSchema.parse(req.body);
    await this.verifyCodeInteractor.create(req.body.email, req.user.id);
    res.status(200).send();
  };
  onGenerateForForgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    CodeGenerateSchema.parse(req.body);
    await this.verifyCodeInteractor.createForForgotPassword(
      req.body.email,
      req.user.id
    );
    res.status(200).send();
  };
  onSignIn = async (req: Request, res: Response, next: NextFunction) => {
    SignInSchema.parse(req.body);
    var result = await this.userInteractor.signIn(req.body);
    return res.json({ token: result });
  };
  onUpdate = async (req: Request, res: Response, next: NextFunction) => {
    UpdateUserSchema.parse(req.body);
    var result = await this.userInteractor.updateUser(req.body);
    return res.json(result);
  };
  onChangeProfilePicture = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    var result = await this.userInteractor.changeProfilePicture({
      id: req.user.id,
      profilePicture: req.file,
    });
    return res.json(result);
  };
  onChangePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    ChangePasswordSchema.parse(req.body);
    var result = await this.userInteractor.changePassword({
      id: req.user.id,
      lastPassword: req.body.lastPassword,
      newPassword: req.body.newPassword,
    });
    return res.json(result);
  };
  onChangeEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    ChangePasswordSchema.parse(req.body);
    var result = await this.userInteractor.changePassword({
      id: req.user.id,
      lastPassword: req.body.lastPassword,
      newPassword: req.body.newPassword,
    });
    return res.json(result);
  };
  onFindWithId = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    var result = await this.userInteractor.findWithId(id);
    return res.json(result);
  };
}
