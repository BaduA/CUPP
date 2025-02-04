export interface IVerifyUserCodeInteractor{
    createForEmailVertification(email:string,userId:string):any
    createForForgotPassword(email:string,userId:string):any
    delete(code:string):any
    deleteExpiredOnes():any
    getUnique(code:string, userId:string):any
    getUniqueWithEmail(code:string, email:string):any
}