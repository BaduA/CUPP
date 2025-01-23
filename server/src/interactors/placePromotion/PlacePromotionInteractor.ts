import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { ICreatePlacePromotion } from "../../entities/interfaces/PlacePromotionInterfaces";
import { IRepository } from "../../infrastructures/repositories/IRepository";
import { IImageUploadService } from "../../infrastructures/services/IImageUploadService";
import { IPlacePromotionInteractor } from "./IPlacePromotionInteractor";

export class PlacePromotionInteractor implements IPlacePromotionInteractor {
    private repository: IRepository;
    private imageService: IImageUploadService;
    constructor(repository: IRepository, imageService: IImageUploadService) {
        this.repository = repository;
        this.imageService = imageService;
    }
    async getPlacePromotionById(promotionId: number) {
        return await this.repository.findUnique({ id: promotionId })
    }
    async createPlacePromotion(input: ICreatePlacePromotion) {
        return await this.repository.create({
            name: input.name,
            placeId: input.placeId,
            pointValue: input.pointValue,
            imageAddress: input.image == null ? null : await this.imageService.uploadSingleImage(input.image, "places/" + input.placeId + "/promotions/")
        })
    }
    async deletePlacePromotion(id: number) {
        var promotion = await this.repository.findUnique({ id })
        if (!promotion) throw new BadRequestsException("No promotion found.", ErrorCode.ENTITY_NOT_FOUND)
        this.imageService.delete(promotion.imageAddress)
        return await this.repository.delete(id)
    }
    async updatePlacePromotion() {
        throw new Error("Method not implemented.");
    }
    async getPlacePromotions(placeId: number) {
        return await this.repository.findMany({ placeId })
    }
    async getPlacePromotionsByName(placeId: number, promotionName:string) {
        return await this.repository.findMany({ placeId, name:promotionName })
    }
    async getPlacePromotionsByPoint(placeId: number, pointValue: number) {
        return await this.repository.findMany({
            placeId, pointValue: {
                gt: pointValue
            }
        })
    }


}