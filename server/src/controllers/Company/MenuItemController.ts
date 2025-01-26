import { NextFunction, Request, Response } from "express";
import { CreateMenuItemSchema, UpdateMenuItemSchema } from "../../entities/schemas/PlaceSchemas";
import { IPlaceMenuItemInteractor } from "../../interactors/placeMenuItem/IPlaceMenuItemInteractor";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { Validator } from "../Validator";
import { BadRequestsException } from "../../entities/exceptions/bad-request";
import { ErrorCode } from "../../entities/exceptions/root";
import { IPlaceMenuItemVariationInteractor } from "../../interactors/placeMenuItemVariation/IPlaceMenuItemVariationInteractor";

export class MenuItemController extends Validator {
    private placeMenuItemInteractor: IPlaceMenuItemInteractor
    private placeMenuItemVariationInteractor: IPlaceMenuItemVariationInteractor
    constructor(placeWorkerInteractor: IPlaceWorkerInteractor, placeMenuItemInteractor: IPlaceMenuItemInteractor, placeMenuItemVariationInteractor: IPlaceMenuItemVariationInteractor) {
        super(placeWorkerInteractor)
        this.placeMenuItemInteractor = placeMenuItemInteractor
        this.placeMenuItemVariationInteractor = placeMenuItemVariationInteractor
    }
    onCreateMenuItem = async (req: Request, res: Response, next: NextFunction) => {
        CreateMenuItemSchema.parse(req.body)
        await this.placeAdminValidator(parseInt(req.body.placeId), req.user.id)
        var bodyMenuItem = { name: req.body.name, place: { connect: { id: parseInt(req.body.placeId) } }, image: req.file }
        var menuItem = await this.placeMenuItemInteractor.createPlaceMenuItem(bodyMenuItem)
        var bodyMenuItemVariation = { price: parseFloat(req.body.price), pointValue: parseFloat(req.body.pointValue), size: req.body.size, isWithDiscount: req.body.isWithDiscount, menuItemId: menuItem.id }
        var menuItemVariation = await this.placeMenuItemVariationInteractor.createPlaceMenuItemVariation(bodyMenuItemVariation)
        res.json(menuItem)
    }
    onDeleteMenuItem = async (req: Request, res: Response, next: NextFunction) => {
        const menuItemId = parseInt(req.params.menuItemId)
        var menuItem = await this.placeMenuItemInteractor.getMenuItemById(menuItemId)
        if (!menuItem) throw new BadRequestsException("Menu Item Not Found", ErrorCode.ENTITY_NOT_FOUND)
        await this.placeAdminValidator(menuItem.placeId, req.user.id)
        var menuItem = await this.placeMenuItemInteractor.deletePlaceMenuItem(menuItemId)
        res.json(menuItem)
    }
    onUpdateMenuItem = async (req: Request, res: Response, next: NextFunction) => {
        UpdateMenuItemSchema.parse(req.body)
        const id = parseInt(req.params.menuItemId)
        const file = req.file;
        var menuItem = await this.placeMenuItemInteractor.getMenuItemById(id)
        await this.placeAdminValidator(menuItem.placeId, req.user.id)
        var place = await this.placeMenuItemInteractor.updatePlaceMenuItem({ ...req.body, id, image: file })
        res.json(place)
    }
    onGetMenuItemsByName = async (req: Request, res: Response, next: NextFunction) => {
        var placeId = parseInt(req.params.placeId)
        var menuItemName = (req.params.menuItemName)
        await this.placeWorkerValidator(placeId, req.user.id)
        res.json(await this.placeMenuItemInteractor.getPlaceMenuItemsByName({ id: placeId, name: menuItemName }))
    }
    onGetAllMenuItems = async (req: Request, res: Response, next: NextFunction) => {
        var placeId = parseInt(req.params.placeId)
        await this.placeWorkerValidator(placeId, req.user.id)
        res.json(await this.placeMenuItemInteractor.getAllMenuItems(placeId))
    }
}