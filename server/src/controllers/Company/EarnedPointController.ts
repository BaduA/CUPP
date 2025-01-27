import { NextFunction, Request, Response } from "express";
import { IOrderInteractor } from "../../interactors/order/IOrderInteractor";
import { IPlaceWorkerInteractor } from "../../interactors/placeWorker/IPlaceWorkerInteractor";
import { Validator } from "../Validator";

export class OrderController extends Validator {
    private orderInteractor: IOrderInteractor;
    constructor(placeWorkerInteractor: IPlaceWorkerInteractor, orderInteractor: IOrderInteractor) {
        super(placeWorkerInteractor)
        this.orderInteractor = orderInteractor
    }
    onGetCurrentUserOrders= async (req: Request, res: Response, next: NextFunction) => {
        var record = await this.orderInteractor.getUserOrders(req.user.id)
        res.json(record)
    }
    onGetPlaceOrders= async (req: Request, res: Response, next: NextFunction) => {
        var placeId = parseInt(req.params.placeId)
        await this.placeAdminValidator(placeId, req.user.id)
        var points = await this.orderInteractor.getPlaceOrders(placeId)
        res.json(points)
    }
    onGetPlaceUserOrders = async (req: Request, res: Response, next: NextFunction) => {
        var placeId = parseInt(req.params.placeId)
        var userId = parseInt(req.params.userId)
        var points = await this.orderInteractor.getUserPlaceOrders(userId, placeId)
        res.json(points)
    }
}