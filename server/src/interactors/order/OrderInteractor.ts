import { ICreateOrder } from "../../entities/interfaces/OrderInterfaces";
import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IOrderInteractor } from "./IOrderInteractor";

export class OrderInteracor implements IOrderInteractor {
    private repository: IRepository;
    constructor(repository: IRepository) {
        this.repository = repository;
    }
    async createOrder(input: ICreateOrder) {
        return await this.repository.create({ userRecordId: input.userRecordId, earnedPoint: input.earnedPoint, totalMoney: input.totalMoney })
    }
    async getUserOrders(userId: number) {
        return await this.repository.findMany({ userRecord: { userId: userId } }, null, { earnedPointMenuItems: true })
    }
    async getUserPlaceOrders(userId: number, placeId: number) {
        return await this.repository.findMany({ userRecord: { userId: userId, placeId: placeId } })
    }
    async getPlaceOrders(placeId: number) {
        return await this.repository.findMany({ userRecord: { placeId: placeId } })
    }
}
