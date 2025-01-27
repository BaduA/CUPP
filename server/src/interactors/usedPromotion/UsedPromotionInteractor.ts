import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IUsedPromotionInteractor } from "./IUsedPromotionInteractor";

export class UsedPromotionInteractor implements IUsedPromotionInteractor {
    private repository: IRepository;
    constructor(repository: IRepository) {
        this.repository = repository;
    }
    async createUsedPromotion(userRecordId: number, promotionId: number) {
        return await this.repository.create({ userRecord: { connect: { id: userRecordId } }, placePromotion: { connect: { id: promotionId } } })
    }
    async deleteUsedPromotion(id: number) {
        var usedPromotion = await this.repository.findUnique({ id })
        if (!usedPromotion) throw new BadRequestsException("Used Promotion Not Found", ErrorCode.ENTITY_NOT_FOUND)
        return await this.repository.delete(id)
    }

}