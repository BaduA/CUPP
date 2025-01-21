import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IEarnedPlacePointInteractor } from "./IEarnedPlacePointInteractor";

export class EarnedPlacePointInteractor implements IEarnedPlacePointInteractor {
    private repository: IRepository;
    constructor(repository: IRepository) {
        this.repository = repository;
    }
    async createEarnedPlacePoint(userRecordId: number, earnedPoint: number) {
        return await this.repository.create({ userRecordId, earnedPoint })
    }
    async getAllEarnedPlacePoints(userId: number) {
        return await this.repository.findMany({ userRecord: { userId: userId } })
    }
    async getEarnedPlacePoints(userId: number, placeId: number) {
        return await this.repository.findMany({ userRecord: { userId: userId, placeId: placeId } })
    }
}
