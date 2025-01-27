import { NextFunction, Request, Response } from "express";
import { ProcessUserOrderSchema, ProcessUserPromotionSchema } from "../../entities/schemas/WorkerSchemas";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { IEarnedPointMenuItemInteractor } from "../../interactors/earnedPointMenuItem/IEarnedPointMenuItemInteractor";
import { IOrderInteractor } from "../../interactors/order/IOrderInteractor";
import { IPlaceUserRecordInteractor } from "../../interactors/placeUserRecord/IPlaceUserRecordInteractor";
import { IUserInteractor } from "../../interactors/user/IUserInteractor";
import { Validator } from "../Validator";
import { IPlaceInteractor } from "../../interactors/place/IPlaceInteractor";
import { IPlacePromotionInteractor } from "../../interactors/placePromotion/IPlacePromotionInteractor";
import { IUsedPromotionInteractor } from "../../interactors/usedPromotion/IUsedPromotionInteractor";

export class WorkerActionsController extends Validator {
    private earnedPointMenuItemInteractor: IEarnedPointMenuItemInteractor;
    private orderInteractor: IOrderInteractor;
    private placeRecordInteractor: IPlaceUserRecordInteractor;
    private placeInteractor: IPlaceInteractor;
    private userInteractor: IUserInteractor;
    private placePromotionInteractor: IPlacePromotionInteractor;
    private usedPromotionInteractor: IUsedPromotionInteractor;
    constructor(placeWorkerInteractor: IPlaceWorkerInteractor, earnedPointMenuItemInteractor: IEarnedPointMenuItemInteractor, orderInteractor: IOrderInteractor, placeRecordInteractor: IPlaceUserRecordInteractor, userInteractor: IUserInteractor, placeInteractor: IPlaceInteractor, placePromotionInteractor: IPlacePromotionInteractor, usedPromotionInteractor: IUsedPromotionInteractor) {
        super(placeWorkerInteractor)
        this.earnedPointMenuItemInteractor = earnedPointMenuItemInteractor
        this.orderInteractor = orderInteractor
        this.placeRecordInteractor = placeRecordInteractor
        this.userInteractor = userInteractor
        this.placeInteractor = placeInteractor
        this.placePromotionInteractor = placePromotionInteractor
        this.usedPromotionInteractor = usedPromotionInteractor
    }

    onProcessUserOrder = async (req: Request, res: Response, next: NextFunction) => {
        ProcessUserOrderSchema.parse(req.body)
        const { userId, menuItemVariations, totalMoney, totalEarnedPoint, placeId } = req.body
        await this.placeWorkerValidator(placeId, req.user.id)
        await this.placeInteractor.addGivenPoints({ id: placeId, points: totalEarnedPoint })
        await this.userInteractor.increaseUserPoint({ userId, point: totalEarnedPoint })
        var record = await this.placeRecordInteractor.addPoints(userId, placeId, totalEarnedPoint)
        var earnedPlacePoint = await this.orderInteractor.createOrder({ userRecordId: record.id, earnedPoint: totalEarnedPoint, totalMoney: totalMoney })
        await menuItemVariations.forEach(async (menuItemVariation: any) => {
            await this.earnedPointMenuItemInteractor.createEarnedPointMenuItem({ amount: menuItemVariation.amount, menuItemVariationId: menuItemVariation.menuItemVariationId, earnedPlacePointId: earnedPlacePoint.id })
        });
        res.json(earnedPlacePoint)
    }
    onProcessUserPromotion = async (req: Request, res: Response, next: NextFunction) => {
        ProcessUserPromotionSchema.parse(req.body)
        const { userId, promotionId } = req.body
        var promotion = await this.placePromotionInteractor.getPlacePromotionById(promotionId)
        await this.placeWorkerValidator(promotion.placeId, req.user.id)
        await this.userInteractor.decreaseUserPoint({ userId, point: promotion.pointValue })
        await this.placeInteractor.addPromotionPoints({ id: promotion.placeId, points: promotion.pointValue })
        var record = await this.placeRecordInteractor.extractPoints(userId, promotion.placeId, promotion.pointValue)
        var usedPromotion = await this.usedPromotionInteractor.createUsedPromotion(record.id, promotionId)
        res.json(usedPromotion)
    }
}
