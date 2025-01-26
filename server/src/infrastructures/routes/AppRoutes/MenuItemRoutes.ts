import { NextFunction, Request, Response, Router } from "express";
import { PlaceMenuItemInteractor } from "../../../interactors/placeMenuItem/PlaceMenuItemInteractor";
import { menuItemRepository, placeWorkerRepository } from "../../repositories/PrismaRepository";
import { s3ImageService } from "../../services/S3ImageService";
import { PlaceWorkerInteractor } from "../../../interactors/placeWorker/PlaceWorkerInteractor";
import { MenuItemController } from "../../../controllers/Company/MenuItemController";
import { authorizePrismaMiddleware } from "../../middlewares/auth";
import { errorHandler } from "../../middlewares/error-handler";


export const menuItemAdminRoutes: Router = Router();
export const menuItemWorkerRoutes: Router = Router();

const menuItemInteractor = new PlaceMenuItemInteractor(menuItemRepository, s3ImageService)
const placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository)
const menuItemController = new MenuItemController(placeWorkerInteractor, menuItemInteractor)

menuItemAdminRoutes.post("/createMenuItem", authorizePrismaMiddleware.authorizeUser, errorHandler(menuItemController.onCreateMenuItem))
menuItemAdminRoutes.post("/deleteMenuItem", authorizePrismaMiddleware.authorizeUser, errorHandler(menuItemController.onDeleteMenuItem))
menuItemAdminRoutes.post("/updateMenuItem", authorizePrismaMiddleware.authorizeUser, errorHandler(menuItemController.onUpdateMenuItem))

menuItemWorkerRoutes.get("/getMenuItemsByName/:placeId/:name", authorizePrismaMiddleware.authorizeUser, errorHandler(menuItemController.onGetMenuItemsByName))
menuItemWorkerRoutes.get("/getMenuItems/:placeId", authorizePrismaMiddleware.authorizeUser, errorHandler(menuItemController.onGetAllMenuItems))