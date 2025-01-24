import { NextFunction, Request, Response } from "express";
import { ProcessUserOrderSchema } from "../../entities/schemas/WorkerSchemas";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { IEarnedPointMenuItemInteractor } from "../../interactors/earnedPointMenuItem/IEarnedPointMenuItemInteractor";
import { IEarnedPlacePointInteractor } from "../../interactors/earnedPlacePoint/IEarnedPlacePointInteractor";
import { IPlaceUserRecordInteractor } from "../../interactors/placeUserRecord/IPlaceUserRecordInteractor";
import { IUserInteractor } from "../../interactors/user/IUserInteractor";
import { Validator } from "../Validator";

export class PlaceController extends Validator {

    private earnedPointMenuItemInteractor: IEarnedPointMenuItemInteractor;
    private earnedPlacePointInteractor: IEarnedPlacePointInteractor;
    private placeRecordInteractor: IPlaceUserRecordInteractor;
    private userInteractor: IUserInteractor
    constructor(placeWorkerInteractor: IPlaceWorkerInteractor, earnedPointMenuItemInteractor: IEarnedPointMenuItemInteractor, earnedPlacePointInteractor: IEarnedPlacePointInteractor, placeRecordInteractor: IPlaceUserRecordInteractor, userInteractor: IUserInteractor) {
        super(placeWorkerInteractor)
        this.earnedPointMenuItemInteractor = earnedPointMenuItemInteractor
        this.earnedPlacePointInteractor = earnedPlacePointInteractor
        this.placeRecordInteractor = placeRecordInteractor
        this.userInteractor = userInteractor
    }

    async processUserOrder(req: Request, res: Response, next: NextFunction) {
        ProcessUserOrderSchema.parse(req.body)
        const { userId, menuItems, totalMoney, totalEarnedPoint, placeId } = req.body
        await this.placeWorkerValidator(placeId, req.user)
        await this.userInteractor.increaseUserPoint({ userId, point: totalEarnedPoint })
        var record = await this.placeRecordInteractor.addPoints(userId, placeId, totalEarnedPoint)
        var earnedPlacePoint = await this.earnedPlacePointInteractor.createEarnedPlacePoint({ userRecordId: record.id, earnedPoint: totalEarnedPoint, totalMoney: totalMoney })
        menuItems.forEach(async (menuItem: any) => {
            await this.earnedPointMenuItemInteractor.createEarnedPointMenuItem({ amount: menuItem.amount, menuItemId: menuItem.menuItemId, earnedPlacePointId: earnedPlacePoint.id })
        });
        res.json(earnedPlacePoint)
    }
}