import { NextFunction, Request, Response } from "express";
import { GetPlaceImagesSchema, GetPlacesByArea, UpdatePlaceSchema } from "../../entities/schemas/PlaceSchemas";
import { IPlaceInteractor } from "../../interactors/place/IPlaceInteractor";
import { IPlaceImageInteractor } from "../../interactors/placeImage/IPlaceImageInteractor";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { Validator } from "../Validator";
import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";

export class PlaceController extends Validator {
    private placeInteractor: IPlaceInteractor;
    private placeImageInteractor: IPlaceImageInteractor;
    constructor(placeInteractor: IPlaceInteractor, placeImageInteractor: IPlaceImageInteractor, placeWorkerInteractor: IPlaceWorkerInteractor) {
        super(placeWorkerInteractor)
        this.placeInteractor = placeInteractor;
        this.placeImageInteractor = placeImageInteractor;
    }
    onUpdatePlace = async (req: Request, res: Response, next: NextFunction) => {
        UpdatePlaceSchema.parse(req.body)
        const id = parseInt(req.params.placeId)
        await this.placeAdminValidator(id, req.user.id)
        if (req.file != null) await this.placeImageInteractor.uploadImage({ file: req.file, placeId: id })
        await this.placeInteractor.updatePlace({ ...req.body, id })
        var place = await this.placeInteractor.checkIsComplete(id)
        res.json(place)
    }
    onDeletePlaceImage = async (req: Request, res: Response, next: NextFunction) => {
        const imageId = parseInt(req.params.imageId)
        var image = await this.placeImageInteractor.getImage(imageId)
        await this.placeAdminValidator(image.placeId, req.user.id)
        var deletedImage = await this.placeImageInteractor.deleteImage(imageId)
        var place = await this.placeInteractor.checkIsComplete(image.placeId)
        res.json(place)
    }
    onGetPlaceImages = async (req: Request, res: Response, next: NextFunction) => {
        GetPlaceImagesSchema.parse(req.body)
        let placeId: any = req.params.placeId
        placeId = parseInt(placeId)
        await this.placeAdminValidator(placeId, req.user.id)
        var images = await this.placeImageInteractor.getImages(placeId)
        res.json(images)
    }
    onGetPlacesByName = async (req: Request, res: Response, next: NextFunction) => {
        let name = req.params.name
        var places = await this.placeInteractor.findByName(name)
        res.json(places)
    }
    onGetPlacesById = async (req: Request, res: Response, next: NextFunction) => {
        let placeId = parseInt(req.params.placeId)
        var place = await this.placeInteractor.findWithId(placeId)
        res.json(place)
    }
    onGetPlacesWithArea = async (req: Request, res: Response, next: NextFunction) => {
        GetPlacesByArea.parse(req.body)
        const { city, district } = req.body
        var place = await this.placeInteractor.findWithLocation(city, district)
        res.json(place)
    }
}