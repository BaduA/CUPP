import { NextFunction, Request, Response } from "express";
import { CreateMenuItemSchema, DeleteMenuItemSchema, GetMenuItemsByNameSchema, UpdateMenuItemSchema } from "../../entities/schemas/PlaceSchemas";
import { IPlaceMenuItemInteractor } from "../../interactors/placeMenuItem/IPlaceMenuItemInteractor";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { Validator } from "../Validator";

export class MenuItemController extends Validator {
    private placeMenuItemInteractor: IPlaceMenuItemInteractor
    constructor(placeWorkerInteractor: IPlaceWorkerInteractor, placeMenuItemInteractor: IPlaceMenuItemInteractor) {
        super(placeWorkerInteractor)
        this.placeMenuItemInteractor = placeMenuItemInteractor
    }
    onCreateMenuItem = async (req: Request, res: Response, next: NextFunction) => {
        CreateMenuItemSchema.parse(req.body)
        await this.placeAdminValidator(req.body.placeId, req.user.id)
        var body = { name: req.body.name, price: parseInt(req.body.price), pointValue: parseInt(req.body.pointValue), size: req.body.size, placeId: parseInt(req.body.placeId), image: req.file }
        var menuItem = await this.placeMenuItemInteractor.createPlaceMenuItem(body)
        res.json(menuItem)
    }
    onDeleteMenuItem = async (req: Request, res: Response, next: NextFunction) => {
        DeleteMenuItemSchema.parse(req.body)
        const { menuItemId } = req.body
        var menuItem = await this.placeMenuItemInteractor.getMenuItemById(menuItemId)
        await this.placeAdminValidator(menuItem.placeId, req.user.id)
        var menuItem = await this.placeMenuItemInteractor.deletePlaceMenuItem(menuItemId)
        res.json(menuItem)
    }
    onUpdateMenuItem = async (req: Request, res: Response, next: NextFunction) => {
        UpdateMenuItemSchema.parse(req.body)
        const body = { id: parseInt(req.body.id), name: req.body.name, price: parseInt(req.body.price), pointValue: parseInt(req.body.pointValue) }
        var menuItem = await this.placeMenuItemInteractor.getMenuItemById(body.id)
        await this.placeAdminValidator(menuItem.placeId, req.user.id)
        var place = await this.placeMenuItemInteractor.updatePlaceMenuItem(body)
        res.json(place)
    }
    onGetMenuItemsByName = async (req: Request, res: Response, next: NextFunction) => {
        GetMenuItemsByNameSchema.parse(req.body)
        var placeId = parseInt(req.params.placeId)
        var menuItemName = (req.params.menuItemName)
        await this.placeWorkerValidator(placeId, req.user.id)
        res.json(this.placeMenuItemInteractor.getPlaceMenuItemsByName({ id: placeId, name: menuItemName }))
    }
    onGetAllMenuItems = async (req: Request, res: Response, next: NextFunction) => {
        var placeId = parseInt(req.params.placeId)
        await this.placeWorkerValidator(placeId, req.user.id)
        res.json(this.placeMenuItemInteractor.getAllMenuItems(placeId))
    }
}