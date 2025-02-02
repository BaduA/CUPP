export interface IVerifyUserCodeInteractor{
    createForEmailVertification(email:string,userId:number):any
    createForForgotPassword(email:string,userId:number):any
    delete(code:string):any
    deleteExpiredOnes():any
    getUnique(code:string, userId:number):any
    getUniqueWithEmail(code:string, email:string):any
}