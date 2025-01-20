export interface IPlaceUserRecordInteractor{
    createPlaceUserRecord(userId:number, placeId:number):any
    addPoints(userId:number,placeId:number,value:number):any
    extractPoints(userId:number,placeId:number,value:number):any
    getPlaceUserRecord(userId:number,placeId:number):any
}