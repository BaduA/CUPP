import { NextFunction, Request, Response } from "express";
import { IPlaceInteractor } from "../../interactors/place/IPlaceInteractor";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { CreatePlaceSchema } from "../../entities/schemas/AppOwnerSchemas";
import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";

export class AppOwnerController {
    private placeInteractor: IPlaceInteractor;
    private placeWorkerInteractor: IPlaceWorkerInteractor
    constructor(placeInteractor: IPlaceInteractor, placeWorkerInteractor: IPlaceWorkerInteractor) {
        this.placeInteractor = placeInteractor;
        this.placeWorkerInteractor = placeWorkerInteractor
    }
    console.log("AA")
    onCreatePlace = async (req: Request, res: Response, next: NextFunction) => {
        if (req.user.role != "APP_ADMIN") throw new BadRequestsException("Not authorized", ErrorCode.UNAUTHORIZED)
        CreatePlaceSchema.parse(req.body)
        const { name, workerAdminId, appFeedingRate } = req.body
        const place = await this.placeInteractor.createPlace({ name, appFeedingRate })
        await this.placeWorkerInteractor.addAdminToPlace({ placeId: place.id, userId: workerAdminId })
        res.json(place)
    }
    onDeletePlace = async (req: Request, res: Response, next: NextFunction) => {
        if (req.user.role != "APP_ADMIN") throw new BadRequestsException("Not authorized", ErrorCode.UNAUTHORIZED)
        const placeId = parseInt(req.params.placeId)
        var result = await this.placeInteractor.deletePlace(placeId)
        res.json(result)
    }
}