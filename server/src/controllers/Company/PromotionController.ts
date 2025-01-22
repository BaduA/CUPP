import { NextFunction, Request, Response } from "express";
import { IPlacePromotionInteractor } from "../../interactors/placePromotion/IPlacePromotionInteractor";
import { CreatePromotionSchema } from "../../entities/schemas/PromotionSchemas";

export class PromotionController {
    private promotionInteractor: IPlacePromotionInteractor;
    constructor(promotionInteractor: IPlacePromotionInteractor) {
        this.promotionInteractor = promotionInteractor;
    }
    async onCreatePromotion(req: Request, res: Response, next: NextFunction) {
        CreatePromotionSchema.parse(req.body)
        var promotionImage = req.file
        var body = { ...req.body, image: promotionImage }
        return await this.promotionInteractor.createPlacePromotion(body)
    }

}