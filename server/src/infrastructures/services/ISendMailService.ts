
export interface ISendMailService {
    sendVerifyUserMail(email:string,code:string): any ;
    sendVerifyForgotPassword(email: string, code: string):any;
    sendHelloMail(email:string): any ;
  }
  