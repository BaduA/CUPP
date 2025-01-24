import { NextFunction, Request, Response } from "express";
import { IPlacePromotionInteractor } from "../../interactors/placePromotion/IPlacePromotionInteractor";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor"
import { Validator } from "../Validator"
import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { CreatePromotionSchema } from "../../entities/schemas/PlaceSchemas";
import { ErrorCode } from "../../entities/exceptions/root";

export class PromotionController extends Validator {
    private placePromotionInteractor: IPlacePromotionInteractor;
    constructor(placeWorkerInteractor: IPlaceWorkerInteractor, placePromotionInteractor: IPlacePromotionInteractor) {
        super(placeWorkerInteractor)
        this.placePromotionInteractor = placePromotionInteractor
    }
    async onCreatePromotion(req: Request, res: Response, next: NextFunction) {
        CreatePromotionSchema.parse(req.body)
        var placeId: any = req.params.placeId
        await this.placeAdminValidator(placeId, req.user.id)
        var file = req.file
        var body = { placeId: placeId, image: file, pointValue: parseInt(req.body.pointValue), name: req.body.name }
        var promotion = await this.placePromotionInteractor.createPlacePromotion(body)
        res.json(promotion)
    }
    async onDeletePromotion(req: Request, res: Response, next: NextFunction) {
        var promotionId: any = parseInt(req.params.promotionId)
        var promotion = await this.placePromotionInteractor.getPlacePromotionById(promotionId)
        if (promotion == null) throw new BadRequestsException("No promotion found", ErrorCode.ENTITY_NOT_FOUND)
        await this.placeAdminValidator(promotion.placeId, req.user.id)
        var promotion = await this.placePromotionInteractor.deletePlacePromotion(promotionId)
        res.json(promotion)
    }
}