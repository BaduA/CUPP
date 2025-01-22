import { NextFunction, Request, Response } from "express";
import { IPlaceInteractor } from "../../interactors/place/IPlaceInteractor";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { CreatePlaceSchema } from "../../entities/schemas/AppOwnerSchemas";

export class AppOwnerController {
    private placeInteractor: IPlaceInteractor;
    private placeWorkerInteractor: IPlaceWorkerInteractor
    constructor(placeInteractor: IPlaceInteractor, placeWorkerInteractor: IPlaceWorkerInteractor) {
        this.placeInteractor = placeInteractor;
        this.placeWorkerInteractor = placeWorkerInteractor
    }
    async onCreatePlace(req: Request, res: Response, next: NextFunction) {
        CreatePlaceSchema.parse(req.body)
        const { name, workerAdminId } = req.body
        const place = await this.placeInteractor.createPlace({ name })
        await this.placeWorkerInteractor.addAdminToPlace({ placeId: place.id, userId: workerAdminId })
        res.json(place)
    }
}