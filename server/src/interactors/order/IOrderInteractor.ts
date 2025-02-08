import { ICreateOrder } from "../../entities/interfaces/OrderInterfaces"

export interface IOrderInteractor {
    createOrder(input: ICreateOrder): any
    getUserOrders(userId: number): any
    getPlaceOrders(placeId: number): any
    getUserPlaceOrders(userId: number, placeId: number): any
    getTotalPointsDaily():any
    getTotalPointsMonthly():any
}