import { NextFunction, Request, Response } from "express";
import { IPlaceUserRecordInteractor } from "../../interactors/placeUserRecord/IPlaceUserRecordInteractor";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { Validator } from "../Validator";

export class UserRecordController extends Validator {
    private placeRecordInteractor: IPlaceUserRecordInteractor;
    constructor(placeWorkerInteractor: IPlaceWorkerInteractor, placeRecordInteractor: IPlaceUserRecordInteractor) {
        super(placeWorkerInteractor)
        this.placeRecordInteractor = placeRecordInteractor
    }
    async onGetUserRecord(req: Request, res: Response, next: NextFunction) {
        const placeId = parseInt(req.params.placeId)
        let userId = req.user.id;
        if (req.params.userId) {
            await this.placeWorkerValidator(placeId, req.user.id)
            userId = parseInt(req.params.userId)
        }
        var record = await this.placeRecordInteractor.getPlaceUserRecord(req.user.id, placeId)
        res.json(record)
    }
}