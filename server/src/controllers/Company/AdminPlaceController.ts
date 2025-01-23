import { NextFunction, Request, Response } from "express";
import { IPlaceInteractor } from "../../interactors/place/IPlaceInteractor";
import { IPlaceImageInteractor } from "../../interactors/placeImage/IPlaceImageInteractor";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { AddWorkerSchema, CreateMenuItemSchema, DeleteMenuItemSchema, DeletePlaceImageSchema, GetPlaceImagesSchema, UpdateMenuItemSchema, UpdatePlaceSchema } from "../../entities/schemas/PlaceSchemas";
import { IPlaceMenuItemInteractor } from "../../interactors/placeMenuItem/IPlaceMenuItemInteractor";
import { IPlacePromotionInteractor } from "../../interactors/placePromotion/IPlacePromotionInteractor";
import { CreatePromotionSchema } from "../../entities/schemas/PromotionSchemas";

export class PlaceController {
    private placeInteractor: IPlaceInteractor;
    private placeImageInteractor: IPlaceImageInteractor;
    private placeWorkerInteractor: IPlaceWorkerInteractor;
    private placeMenuItemInteractor: IPlaceMenuItemInteractor
    private placePromotionInteractor: IPlacePromotionInteractor;
    constructor(placeInteractor: IPlaceInteractor, placeImageInteractor: IPlaceImageInteractor, placeWorkerInteractor: IPlaceWorkerInteractor, placeMenuItemInteractor: IPlaceMenuItemInteractor, placePromotionInteractor: IPlacePromotionInteractor) {
        this.placeInteractor = placeInteractor;
        this.placeImageInteractor = placeImageInteractor;
        this.placeWorkerInteractor = placeWorkerInteractor
        this.placeMenuItemInteractor = placeMenuItemInteractor
        this.placePromotionInteractor = placePromotionInteractor
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
    async onDeleteMenuItem(req: Request, res: Response, next: NextFunction) {
        DeleteMenuItemSchema.parse(req.body)
        const { menuItemId } = req.body
        var menuItem = await this.placeMenuItemInteractor.getMenuItemById(menuItemId)
        this.placeAdminValidator(menuItem.placeId, req.user.id)
        var menuItem = await this.placeMenuItemInteractor.deletePlaceMenuItem(menuItemId)
        res.json(menuItem)
    }
    async onUpdateMenuItem(req: Request, res: Response, next: NextFunction) {
        UpdateMenuItemSchema.parse(req.body)
        const body = { id: parseInt(req.body.id), name: req.body.name, price: parseInt(req.body.price), pointValue: parseInt(req.body.pointValue) }
        var menuItem = await this.placeMenuItemInteractor.getMenuItemById(body.id)
        this.placeAdminValidator(menuItem.placeId, req.user.id)
        var place = await this.placeMenuItemInteractor.updatePlaceMenuItem(body)
        res.json(place)
    }
    async onCreatePromotion(req: Request, res: Response, next: NextFunction) {
        CreatePromotionSchema.parse(req.body)
        var placeId: any = req.params.placeId
        this.placeAdminValidator(placeId, req.user.id)
        var file = req.file
        var body = { placeId: placeId, image: file, pointValue: parseInt(req.body.pointValue), name: req.body.name }
        var promotion = await this.placePromotionInteractor.createPlacePromotion(body)
        res.json(promotion)
    }
    async onDeletePromotion(req: Request, res: Response, next: NextFunction) {
        var promotionId: any = parseInt(req.params.promotionId)
        var promotion = await this.placePromotionInteractor.getPlacePromotionById(promotionId)
        if (promotion == null) throw new BadRequestsException("No promotion found", ErrorCode.ENTITY_NOT_FOUND)
        this.placeAdminValidator(promotion.placeId, req.user.id)
        var promotion = await this.placePromotionInteractor.deletePlacePromotion(promotionId)
        res.json(promotion)
    }
    async onAddAdmin(req: Request, res: Response, next: NextFunction) {
        AddWorkerSchema.parse(req.body)
        this.placeAdminValidator(req.body.placeId, req.user.id)
        this.placeWorkerInteractor.addAdminToPlace({ userId: req.body.userId, placeId: req.body.placeId })
    }
    async onAddWorker(req: Request, res: Response, next: NextFunction) {
        AddWorkerSchema.parse(req.body)
        this.placeAdminValidator(req.body.placeId, req.user.id)
        this.placeWorkerInteractor.addWaiterToPlace({ userId: req.body.userId, placeId: req.body.placeId })
    }
    async onDeleteWorker(req: Request, res: Response, next: NextFunction) {
        AddWorkerSchema.parse(req.body)
        this.placeAdminValidator(req.body.placeId, req.user.id)
        this.placeWorkerInteractor.deleteWorkerFromPlace({ workerId: req.body.userId, placeId: req.body.placeId })
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