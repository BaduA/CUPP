import { NextFunction, Request, Response, Router } from "express";
import { OrderInteracor } from "../../../interactors/order/OrderInteractor";
import { orderRepository, placeWorkerRepository } from "../../repositories/PrismaRepository";
import { PlaceWorkerInteractor } from "../../../interactors/placeWorker/PlaceWorkerInteractor";
import { OrderController } from "../../../controllers/Company/OrderController";
import { authorizePrismaMiddleware } from "../../middlewares/auth";
import { errorHandler } from "../../middlewares/error-handler";

export const orderAdminRoutes: Router = Router();
export const orderRoutes: Router = Router();

var orderInteractor = new OrderInteracor(orderRepository)
var placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository)
var controller = new OrderController(placeWorkerInteractor, orderInteractor)

orderRoutes.get("/getUserOrders", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetCurrentUserOrders))
orderRoutes.get("/getPlaceUserOrders/:placeId/:userId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetPlaceUserOrders))

orderAdminRoutes.get("/getPlaceOrders/:placeId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetPlaceOrders))

