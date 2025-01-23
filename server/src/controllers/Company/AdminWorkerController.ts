import { NextFunction, Request, Response } from "express";
import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { IPlaceMenuItemInteractor } from "../../interactors/placeMenuItem/IPlaceMenuItemInteractor";
import { IPlacePromotionInteractor } from "../../interactors/placePromotion/IPlacePromotionInteractor";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { GetMenuItemsByNameSchema } from "../../entities/schemas/PlaceSchemas";

export class PlaceController {

    private placeWorkerInteractor: IPlaceWorkerInteractor;
    private placeMenuItemInteractor: IPlaceMenuItemInteractor;
    private earnedPointMenuItemInteractor: IEarnedPointMenuItemInteractor;
    constructor(placeWorkerInteractor: IPlaceWorkerInteractor, placeMenuItemInteractor: IPlaceMenuItemInteractor, placePromotionInteractor: IPlacePromotionInteractor) {
        this.placeWorkerInteractor = placeWorkerInteractor
        this.placeMenuItemInteractor = placeMenuItemInteractor
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

    }

    private async placeWorkerValidator(placeId: number, userId: number) {
        var worker = await this.placeWorkerInteractor.getWithId(placeId, userId)
        if (!worker) throw new BadRequestsException("Bu kullanıcı mekanın çalışanı değil.", ErrorCode.UNAUTHORIZED)
    }
}