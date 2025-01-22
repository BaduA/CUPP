import { NextFunction, Request, Response } from "express";
import { IPlaceInteractor } from "../../interactors/place/IPlaceInteractor";
import { IPlaceImageInteractor } from "../../interactors/placeImage/IPlaceImageInteractor";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { CreateMenuItemSchema, DeletePlaceImageSchema, GetPlaceImagesSchema, UpdatePlaceSchema } from "../../entities/schemas/PlaceSchemas";
import { IPlaceMenuItemInteractor } from "../../interactors/placeMenuItem/IPlaceMenuItemInteractor";

export class PlaceController {
    private placeInteractor: IPlaceInteractor;
    private placeImageInteractor: IPlaceImageInteractor;
    private placeWorkerInteractor: IPlaceWorkerInteractor;
    private placeMenuItemInteractor: IPlaceMenuItemInteractor
    constructor(placeInteractor: IPlaceInteractor, placeImageInteractor: IPlaceImageInteractor, placeWorkerInteractor: IPlaceWorkerInteractor, placeMenuItemInteractor: IPlaceMenuItemInteractor) {
        this.placeInteractor = placeInteractor;
        this.placeImageInteractor = placeImageInteractor;
        this.placeWorkerInteractor = placeWorkerInteractor
        this.placeMenuItemInteractor = placeMenuItemInteractor
    }
    async onUpdatePlace(req: Request, res: Response, next: NextFunction) {
        UpdatePlaceSchema.parse(req.body)
        const { id } = req.body
        this.placeAdminValidator(id, req.user.id)
        if (req.file != null) await this.placeImageInteractor.uploadImage({ file: req.file, placeId: id })
        var place = await this.placeInteractor.updatePlace(req.body)
        res.json(place)
    }
    async onDeletePlaceImage(req: Request, res: Response, next: NextFunction) {
        DeletePlaceImageSchema.parse(req.body)
        const { imageId } = req.body
        var image = await this.placeImageInteractor.getImage(imageId)
        this.placeAdminValidator(image.placeId, req.user.id)
        var image = await this.placeImageInteractor.deleteImage(imageId)
        res.json(image)
    }
    async onGetPlaceImages(req: Request, res: Response, next: NextFunction) {
        GetPlaceImagesSchema.parse(req.body)
        let placeId: any = req.params.placeId
        placeId = parseInt(placeId)
        this.placeAdminValidator(placeId, req.user.id)
        var images = await this.placeImageInteractor.getImages(placeId)
        res.json(images)
    }
    async onCreateMenuItem(req: Request, res: Response, next: NextFunction) {
        CreateMenuItemSchema.parse(req.body)
        this.placeAdminValidator(req.body.placeId, req.user.id)
        var body = { name: req.body.name, price: parseInt(req.body.price), pointValue: parseInt(req.body.pointValue), size: req.body.size, placeId: parseInt(req.body.placeId), image: req.file }
        var menuItem = await this.placeMenuItemInteractor.createPlaceMenuItem(body)
        res.json(menuItem)

    }






    private async placeAdminValidator(placeId: number, userId: number) {
        var worker = await this.placeWorkerInteractor.getWithId(placeId, userId)
        if (!worker) throw new BadRequestsException("Bu kullanıcı mekanın çalışanı değil.", ErrorCode.UNAUTHORIZED)
        if (worker.role != "ADMIN") throw new BadRequestsException("Bu kullanıcı mekanın admini değil.", ErrorCode.UNAUTHORIZED)
    }
    private async placeWaiterValidator(placeId: number, userId: number) {
        var worker = await this.placeWorkerInteractor.getWithId(placeId, userId)
        if (!worker) throw new BadRequestsException("Bu kullanıcı mekanın çalışanı değil.", ErrorCode.UNAUTHORIZED)
        if (worker.role != "WAITER") throw new BadRequestsException("Bu kullanıcı mekanın garsonu değil.", ErrorCode.UNAUTHORIZED)
    }
}