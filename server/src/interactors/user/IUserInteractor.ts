import { IChangePassword, IChangeProfilePicture, ISignIn, ISignUp, IUpdateUser, IUserPoint } from "../../entities/interfaces/UserInterfaces"

export interface IUserInteractor {
  signUp(input: ISignUp): any;
  signIn(input: ISignIn):any;
  findWithId(id:number):any;
  updateUser(input: IUpdateUser):any
  increaseUserPoint(input: IUserPoint):any
  decreaseUserPoint(input: IUserPoint):any
  changePassword(input: IChangePassword):any
  changeProfilePicture(input: IChangeProfilePicture):any
  deleteUser(id:any) :any
}
