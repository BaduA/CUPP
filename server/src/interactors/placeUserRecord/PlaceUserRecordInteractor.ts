import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IPlaceUserRecordInteractor } from "./IPlaceUserRecordInteractor";

export class PlaceUserRecordInteractor implements IPlaceUserRecordInteractor {
    private repository: IRepository;
    constructor(repository: IRepository) {
        this.repository = repository;
    }

    async createPlaceUserRecord(userId: number, placeId: number) {
        if (await this.repository.findFirst(({ userId, placeId }))) throw new BadRequestsException("Already a record found", ErrorCode.ENTITY_ALREADY_EXISTS)
        return await this.repository.create({ userId, placeId })
    }
    async addPoints(userId: number, placeId: number, value: number) {
        var record = await this.repository.findUnique({ userId, placeId })
        if (record == null) record = await this.repository.create({ userId, placeId })
        return await this.repository.update(record.id, { totalPoints: record.totalPoints + value })
    }
    async extractPoints(userId: number, placeId: number, value: number) {
        var record = await this.repository.findUnique({ userId, placeId })
        if (record == null) record = await this.repository.create({ userId, placeId })
        return await this.repository.update(record.id, { totalPoints: record.totalPoints - value })
    }
    async getPlaceUserRecord(userId: number, placeId: number) {
        var record = await this.repository.findUnique({ userId, placeId }, {}, { placePromotion: true, earnedPlacePoints: true })
        return await record
    }
}