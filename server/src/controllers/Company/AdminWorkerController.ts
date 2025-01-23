import { NextFunction, Request, Response } from "express";
import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { IPlaceMenuItemInteractor } from "../../interactors/placeMenuItem/IPlaceMenuItemInteractor";
import { IPlacePromotionInteractor } from "../../interactors/placePromotion/IPlacePromotionInteractor";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { GetMenuItemsByNameSchema } from "../../entities/schemas/PlaceSchemas";
import { IEarnedPointMenuItemInteractor } from "../../interactors/earnedPointMenuItem/IEarnedPointMenuItemInteractor";
import { ProcessUserOrderSchema } from "../../entities/schemas/WorkerSchemas";
import { IEarnedPlacePointInteractor } from "../../interactors/earnedPlacePoint/IEarnedPlacePointInteractor";
import { IPlaceUserRecordInteractor } from "../../interactors/placeUserRecord/IPlaceUserRecordInteractor";
import { IUserInteractor } from "../../interactors/user/IUserInteractor";

export class PlaceController {

    private placeWorkerInteractor: IPlaceWorkerInteractor;
    private placeMenuItemInteractor: IPlaceMenuItemInteractor;
    private earnedPointMenuItemInteractor: IEarnedPointMenuItemInteractor;
    private earnedPlacePointInteractor: IEarnedPlacePointInteractor;
    private placeRecordInteractor: IPlaceUserRecordInteractor;
    private userInteractor: IUserInteractor
    constructor(placeWorkerInteractor: IPlaceWorkerInteractor, placeMenuItemInteractor: IPlaceMenuItemInteractor, earnedPointMenuItemInteractor: IEarnedPointMenuItemInteractor, earnedPlacePointInteractor: IEarnedPlacePointInteractor, placeRecordInteractor: IPlaceUserRecordInteractor, userInteractor: IUserInteractor) {
        this.placeWorkerInteractor = placeWorkerInteractor
        this.placeMenuItemInteractor = placeMenuItemInteractor
        this.earnedPointMenuItemInteractor = earnedPointMenuItemInteractor
        this.earnedPlacePointInteractor = earnedPlacePointInteractor
        this.placeRecordInteractor = placeRecordInteractor
        this.userInteractor = userInteractor
    }

    async getMenuItemsByName(req: Request, res: Response, next: NextFunction) {
        GetMenuItemsByNameSchema.parse(req.body)
        var placeId = parseInt(req.params.placeId)
        var menuItemName = (req.params.menuItemName)
        this.placeWorkerValidator(placeId, req.user.id)
        res.json(this.placeMenuItemInteractor.getPlaceMenuItemsByName({ id: placeId, name: menuItemName }))
    }
    async getAllMenuItems(req: Request, res: Response, next: NextFunction) {
        var placeId = parseInt(req.params.placeId)
        this.placeWorkerValidator(placeId, req.user.id)
        res.json(this.placeMenuItemInteractor.getAllMenuItems(placeId))
    }
    async processUserOrder(req: Request, res: Response, next: NextFunction) {
        ProcessUserOrderSchema.parse(req.body)
        const { userId, menuItems, totalMoney, totalEarnedPoint, placeId } = req.body
        await this.userInteractor.increaseUserPoint({ userId, point: totalEarnedPoint })
        var record = await this.placeRecordInteractor.addPoints(userId, placeId, totalEarnedPoint)
        var earnedPlacePoint = await this.earnedPlacePointInteractor.createEarnedPlacePoint({ userRecordId: record.id, earnedPoint: totalEarnedPoint, totalMoney: totalMoney })
        menuItems.forEach(async (menuItem: any) => {
            await this.earnedPointMenuItemInteractor.createEarnedPointMenuItem({ amount: menuItem.amount, menuItemId: menuItem.menuItemId })
        });
        res.json(earnedPlacePoint)
    }
    private async placeWorkerValidator(placeId: number, userId: number) {
        var worker = await this.placeWorkerInteractor.getWithId(placeId, userId)
        if (!worker) throw new BadRequestsException("Bu kullanıcı mekanın çalışanı değil.", ErrorCode.UNAUTHORIZED)
    }
}