import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IImageUploadService } from "../../infrastructures/services/IImageUploadService";
import { IPlaceUserRecordInteractor } from "./IPlaceUserRecordInteractor";


export class PlaceUserRecordInteractor implements IPlaceUserRecordInteractor {
    private repository: IRepository;
    constructor(repository: IRepository) {
        this.repository = repository;
    }

    async createPlaceUserRecord(userId: number, placeId: number) {
        return await this.repository.create({ userId, placeId })
    }
    async addPoints(userId: number, placeId: number, value: number) {
        var record = await this.repository.findUnique({ userId, placeId })
        return await this.repository.update(record.id, { totalPoints: record.totalPoints + value })
    }
    async extractPoints(userId: number, placeId: number, value: number) {
        var record = await this.repository.findUnique({ userId, placeId })
        return await this.repository.update(record.id, { totalPoints: record.totalPoints - value })
    }
    async getPlaceUserRecord(userId: number, placeId: number) {
        var record = await this.repository.findUnique({ userId, placeId }, {}, {})
        return await record
    }
}