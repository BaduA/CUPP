import { ICreateEarnedPlacePoint } from "../../entities/interfaces/EarnedPlacePointInterfaces"

export interface IEarnedPlacePointInteractor{
    createEarnedPlacePoint(input: ICreateEarnedPlacePoint):any
    getAllEarnedPlacePoints(userId:number):any
    getEarnedPlacePoints(userId:number, placeId:number):any
}