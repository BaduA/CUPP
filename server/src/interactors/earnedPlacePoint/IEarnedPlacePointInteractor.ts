export interface IEarnedPlacePointInteractor{
    createEarnedPlacePoint(userRecordId:number, earnedPoint:number):any
    getAllEarnedPlacePoints(userId:number):any
    getEarnedPlacePoints(userId:number, placeId:number):any
}