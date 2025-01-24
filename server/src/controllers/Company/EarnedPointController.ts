import { NextFunction, Request, Response } from "express";
import { IEarnedPlacePointInteractor } from "../../interactors/earnedPlacePoint/IEarnedPlacePointInteractor";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { Validator } from "../Validator";

export class EarnedPointController extends Validator {
    private earnedPointInteractor: IEarnedPlacePointInteractor;
    constructor(placeWorkerInteractor: IPlaceWorkerInteractor, earnedPointInteractor: IEarnedPlacePointInteractor) {
        super(placeWorkerInteractor)
        this.earnedPointInteractor = earnedPointInteractor
    }
    async onGetCurrentUserPoints(req: Request, res: Response, next: NextFunction) {
        var record = await this.earnedPointInteractor.getAllEarnedPlacePoints(req.user.id)
        res.json(record)
    }
    async onGetPlaceEarnedPoints(req: Request, res: Response, next: NextFunction) {
        var placeId = parseInt(req.params.placeId)
        await this.placeAdminValidator(placeId, req.user.id)
        var points = await this.earnedPointInteractor.getEarnedPlacePoints(placeId)
        res.json(points)
    }
    async onGetPlaceUserEarnedPoints(req: Request, res: Response, next: NextFunction) {
        var placeId = parseInt(req.params.placeId)
        var userId = parseInt(req.params.userId)
        var points = await this.earnedPointInteractor.getUsersEarnedPlacePoints(userId, placeId)
        res.json(points)
    }
}