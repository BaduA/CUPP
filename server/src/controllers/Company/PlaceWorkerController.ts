import { NextFunction, Request, Response } from "express";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { Validator } from "../Validator";
import { AddWorkerSchema } from "../../entities/schemas/PlaceSchemas";

export class PlaceWorkerController extends Validator {

    constructor(placeWorkerInteractor: IPlaceWorkerInteractor) {
        super(placeWorkerInteractor)
    }
    onAddAdmin = async (req: Request, res: Response, next: NextFunction) => {
        AddWorkerSchema.parse(req.body)
        await this.placeAdminValidator(req.body.placeId, req.user.id)
        await this.placeWorkerInteractor.addAdminToPlace({ userId: req.body.userId, placeId: req.body.placeId })
    }
    onAddWorker = async (req: Request, res: Response, next: NextFunction) => {
        AddWorkerSchema.parse(req.body)
        await this.placeAdminValidator(req.body.placeId, req.user.id)
        await this.placeWorkerInteractor.addWaiterToPlace({ userId: req.body.userId, placeId: req.body.placeId })
    }
    onDeleteWorker = async (req: Request, res: Response, next: NextFunction) => {
        AddWorkerSchema.parse(req.body)
        await this.placeAdminValidator(req.body.placeId, req.user.id)
        await this.placeWorkerInteractor.deleteWorkerFromPlace({ workerId: req.body.userId, placeId: req.body.placeId })
    }
}