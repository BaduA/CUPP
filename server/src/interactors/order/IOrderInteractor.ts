import { ICreateEarnedPlacePoint } from "../../entities/interfaces/EarnedPlacePointInterfaces"

export interface IOrderInteractor {
    createOrder(input: ICreateEarnedPlacePoint): any
    getUserOrders(userId: number): any
    getPlaceOrders(placeId: number): any
    getUserPlaceOrders(userId: number, placeId: number): any
}