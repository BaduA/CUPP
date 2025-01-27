import { NextFunction, Request, Response } from "express";
import { ProcessUserOrderSchema } from "../../entities/schemas/WorkerSchemas";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { IEarnedPointMenuItemInteractor } from "../../interactors/earnedPointMenuItem/IEarnedPointMenuItemInteractor";
import { IEarnedPlacePointInteractor } from "../../interactors/earnedPlacePoint/IEarnedPlacePointInteractor";
import { IPlaceUserRecordInteractor } from "../../interactors/placeUserRecord/IPlaceUserRecordInteractor";
import { IUserInteractor } from "../../interactors/user/IUserInteractor";
import { Validator } from "../Validator";
import { IPlaceInteractor } from "../../interactors/place/IPlaceInteractor";

export class WorkerActionsController extends Validator {
    private earnedPointMenuItemInteractor: IEarnedPointMenuItemInteractor;
    private earnedPlacePointInteractor: IEarnedPlacePointInteractor;
    private placeRecordInteractor: IPlaceUserRecordInteractor;
    private placeInteractor: IPlaceInteractor;
    private userInteractor: IUserInteractor
    constructor(placeWorkerInteractor: IPlaceWorkerInteractor, earnedPointMenuItemInteractor: IEarnedPointMenuItemInteractor, earnedPlacePointInteractor: IEarnedPlacePointInteractor, placeRecordInteractor: IPlaceUserRecordInteractor, userInteractor: IUserInteractor, placeInteractor: IPlaceInteractor) {
        super(placeWorkerInteractor)
        this.earnedPointMenuItemInteractor = earnedPointMenuItemInteractor
        this.earnedPlacePointInteractor = earnedPlacePointInteractor
        this.placeRecordInteractor = placeRecordInteractor
        this.userInteractor = userInteractor
        this.placeInteractor = placeInteractor
    }

    onProcessUserOrder = async (req: Request, res: Response, next: NextFunction) => {
        ProcessUserOrderSchema.parse(req.body)
        const { userId, menuItemVariations, totalMoney, totalEarnedPoint, placeId } = req.body
        await this.placeWorkerValidator(placeId, req.user.id)
        await this.placeInteractor.addGivenPoints({ id: placeId, points: totalEarnedPoint })
        await this.userInteractor.increaseUserPoint({ userId, point: totalEarnedPoint })
        var record = await this.placeRecordInteractor.addPoints(userId, placeId, totalEarnedPoint)
        var earnedPlacePoint = await this.earnedPlacePointInteractor.createEarnedPlacePoint({ userRecordId: record.id, earnedPoint: totalEarnedPoint, totalMoney: totalMoney })
        await menuItemVariations.forEach(async (menuItemVariation: any) => {
            await this.earnedPointMenuItemInteractor.createEarnedPointMenuItem({ amount: menuItemVariation.amount, menuItemVariationId: menuItemVariation.menuItemVariationId, earnedPlacePointId: earnedPlacePoint.id })
        });
        res.json(earnedPlacePoint)
    }
}
