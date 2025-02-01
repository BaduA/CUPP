export interface IVerifyUserCodeInteractor{
    create(userId:number):any
    delete(code:string):any
    getUnique(code:string, userId:number):any
}