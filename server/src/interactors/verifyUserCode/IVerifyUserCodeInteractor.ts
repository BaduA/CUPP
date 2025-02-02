export interface IVerifyUserCodeInteractor{
    create(email:string,userId:number):any
    delete(code:string):any
    getUnique(code:string, userId:number):any
}