import { ICreatePlaceWorker, IDeletePlaceWorker } from "../../entities/interfaces/PlaceWorkerInterface";
import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IPlaceWorkerInteractor } from "./IPlaceWorkerInteractor";

enum PlaceWorkerRole {
    ADMIN,
    WAITER
}
export class PlaceWorkerInteractor implements IPlaceWorkerInteractor {
    private repository: IRepository;
    constructor(repository: IRepository) {
        this.repository = repository;
    }
    async deleteWorkerFromPlace(input: IDeletePlaceWorker) {
        return await this.repository.deleteWithUniqueData({ userId: input.workerId, placeId: input.placeId })
    }
    async addAdminToPlace(input: ICreatePlaceWorker) {
        return await this.repository.create({ userId: input.userId, placeId: input.placeId, role: "ADMIN" })
    }
    async addWaiterToPlace(input: ICreatePlaceWorker) {
        return await this.repository.create({ userId: input.userId, placeId: input.placeId, role: "WAITER" })
    }
    async getWaiters(placeId: number) {
        return await this.repository.findMany({ placeId, role: "WAITER" })
    }
    async getAdmins(placeId: number) {
        return await this.repository.findMany({ placeId, role: "ADMIN" })
    }
    async getWithId(placeId: number, userId: number) {
        return await this.repository.findMany({ placeId, userId })
    }
    async getAll(placeId: number) {
        return await this.repository.findMany({ placeId })
    }
}