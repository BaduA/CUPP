import { NextFunction, Request, Response } from "express";
import { DeletePlaceImageSchema, GetPlaceImagesSchema, GetPlacesByArea, UpdatePlaceSchema } from "../../entities/schemas/PlaceSchemas";
import { IPlaceInteractor } from "../../interactors/place/IPlaceInteractor";
import { IPlaceImageInteractor } from "../../interactors/placeImage/IPlaceImageInteractor";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { Validator } from "../Validator";

export class PlaceController extends Validator {
    private placeInteractor: IPlaceInteractor;
    private placeImageInteractor: IPlaceImageInteractor;
    constructor(placeInteractor: IPlaceInteractor, placeImageInteractor: IPlaceImageInteractor, placeWorkerInteractor: IPlaceWorkerInteractor) {
        super(placeWorkerInteractor)
        this.placeInteractor = placeInteractor;
        this.placeImageInteractor = placeImageInteractor;
    }
    async onUpdatePlace(req: Request, res: Response, next: NextFunction) {
        UpdatePlaceSchema.parse(req.body)
        const { id } = req.body
        await this.placeAdminValidator(id, req.user.id)
        if (req.file != null) await this.placeImageInteractor.uploadImage({ file: req.file, placeId: id })
        var place = await this.placeInteractor.updatePlace(req.body)
        res.json(place)
    }
    async onDeletePlaceImage(req: Request, res: Response, next: NextFunction) {
        DeletePlaceImageSchema.parse(req.body)
        const { imageId } = req.body
        var image = await this.placeImageInteractor.getImage(imageId)
        await this.placeAdminValidator(image.placeId, req.user.id)
        var image = await this.placeImageInteractor.deleteImage(imageId)
        res.json(image)
    }
    async onGetPlaceImages(req: Request, res: Response, next: NextFunction) {
        GetPlaceImagesSchema.parse(req.body)
        let placeId: any = req.params.placeId
        placeId = parseInt(placeId)
        await this.placeAdminValidator(placeId, req.user.id)
        var images = await this.placeImageInteractor.getImages(placeId)
        res.json(images)
    }
    async onGetPlacesByName(req: Request, res: Response, next: NextFunction) {
        let name = req.params.name
        var places = await this.placeInteractor.findByName(name)
        res.json(places)
    }
    async onGetPlacesById(req: Request, res: Response, next: NextFunction) {
        let placeId = parseInt(req.params.placeId)
        var place = await this.placeInteractor.findWithId(placeId)
        res.json(place)
    }
    async onGetPlacesWithArea(req: Request, res: Response, next: NextFunction) {
        GetPlacesByArea.parse(req.body)
        const { city, district } = req.body
        var place = await this.placeInteractor.findWithLocation(city, district)
        res.json(place)
    }
}