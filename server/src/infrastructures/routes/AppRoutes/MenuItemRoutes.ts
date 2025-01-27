import { NextFunction, Request, Response, Router } from "express";
import { PlaceMenuItemInteractor } from "../../../interactors/placeMenuItem/PlaceMenuItemInteractor";
import { menuItemRepository, placeMenuItemVariationRepository, placeWorkerRepository } from "../../repositories/PrismaRepository";
import { s3ImageService } from "../../services/S3ImageService";
import { PlaceWorkerInteractor } from "../../../interactors/placeWorker/PlaceWorkerInteractor";
import { MenuItemController } from "../../../controllers/Company/MenuItemController";
import { authorizePrismaMiddleware } from "../../middlewares/auth";
import { errorHandler } from "../../middlewares/error-handler";
import multer from "multer";
import { PlaceMenuItemVariationInteractor } from "../../../interactors/placeMenuItemVariation/PlaceMenuItemVariationInteractor";


export const menuItemAdminRoutes: Router = Router();
export const menuItemWorkerRoutes: Router = Router();

const menuItemInteractor = new PlaceMenuItemInteractor(menuItemRepository, s3ImageService)
const placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository)
const placeMenuItemVariationInteractor = new PlaceMenuItemVariationInteractor(placeMenuItemVariationRepository)
const menuItemController = new MenuItemController(placeWorkerInteractor, menuItemInteractor, placeMenuItemVariationInteractor)

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

menuItemAdminRoutes.post("/createMenuItem", [upload.single("menuItemImage"), authorizePrismaMiddleware.authorizeUser], errorHandler(menuItemController.onCreateMenuItem))
menuItemAdminRoutes.delete("/deleteMenuItem/:menuItemId", authorizePrismaMiddleware.authorizeUser, errorHandler(menuItemController.onDeleteMenuItem))
menuItemAdminRoutes.put("/updateMenuItem/:menuItemId", [upload.single("menuItemImage"), authorizePrismaMiddleware.authorizeUser], errorHandler(menuItemController.onUpdateMenuItem))
menuItemAdminRoutes.post("/createMenuItemVariation", authorizePrismaMiddleware.authorizeUser, errorHandler(menuItemController.onCreateMenuItemVariation))
menuItemAdminRoutes.delete("/deleteMenuItemVariation/:variationId", authorizePrismaMiddleware.authorizeUser, errorHandler(menuItemController.onDeleteMenuItemVariation))
menuItemAdminRoutes.put("/updateMenuItemVariation/:variationId", authorizePrismaMiddleware.authorizeUser, errorHandler(menuItemController.onUpdateMenuItemVariation))

menuItemWorkerRoutes.get("/getMenuItemsByName/:placeId/:menuItemName", authorizePrismaMiddleware.authorizeUser, errorHandler(menuItemController.onGetMenuItemsByName))
menuItemWorkerRoutes.get("/getMenuItems/:placeId", authorizePrismaMiddleware.authorizeUser, errorHandler(menuItemController.onGetAllMenuItems))
menuItemWorkerRoutes.get("/getMenuItemById/:menuItemId", authorizePrismaMiddleware.authorizeUser, errorHandler(menuItemController.onGetMenuItemById))