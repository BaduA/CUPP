import { NextFunction, Request, Response } from "express";
import { IUserInteractor } from "../interactors/user/IUserInteractor";
import { ChangePasswordSchema, CreateUserSchema, SignInSchema, UpdateUserSchema } from "../entities/schemas/UserSchemas";

export class UserController {
  private userInteractor: IUserInteractor;
  constructor(userInteractor: IUserInteractor) {
    this.userInteractor = userInteractor;
  }

  async onSignUp(req: Request, res: Response, next: NextFunction) {
    var profilePicture = req.file
    CreateUserSchema.parse(req.body);
    const body = { ...req.body, profilePicture: profilePicture };
    var result = await (this.userInteractor.signUp(body))
    return res.json(result);
  }
  async onSignIn(req: Request, res: Response, next: NextFunction) {
    SignInSchema.parse(req.body);
    var result = await (this.userInteractor.signIn(req.body))
    return res.json({ token: result });
  }
  async onUpdate(req: Request, res: Response, next: NextFunction) {
    UpdateUserSchema.parse(req.body);
    var result = await (this.userInteractor.updateUser(req.body))
    return res.json(result);
  }
  async onChangeProfilePicture(req: Request, res: Response, next: NextFunction) {
    var result = await (this.userInteractor.changeProfilePicture({ id: req.user.id, profilePicture: req.file }))
    return res.json(result);
  }
  async onChangePassword(req: Request, res: Response, next: NextFunction) {
    ChangePasswordSchema.parse(req.body);
    var result = await (this.userInteractor.changePassword({ id: req.user.id, oldPassword: req.body.oldPassword, newPassword: req.body.newPassword }))
    return res.json(result);
  }
  async onFindWithId(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id)
    var result = await this.userInteractor.findWithId(id)
    return res.json(result)
  }
}
