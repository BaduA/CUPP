import { NextFunction, Request, Response, Router } from "express";
import { AuthMiddleware, authorizePrismaMiddleware } from "../middlewares/auth";
import { errorHandler } from "../middlewares/error-handler";
import { orderRepository, placeRepository, placeWorkerRepository, userRepository } from "../repositories/PrismaRepository";
import { S3ImageService } from "../services/S3ImageService";
import multer from "multer";
import { UserInteractor } from "../../interactors/user/UserInteractor";
import { UserController } from "../../controllers/Auth/AuthController";
import { AppOwnerController } from "../../controllers/AppOwner/AppOwnerController";
import { PlaceController } from "../../controllers/Company/PlaceController";
import { PlaceInteractor } from "../../interactors/place/PlaceInteractor";
import { PlaceWorkerInteractor } from "../../interactors/placeWorker/PlaceWorkerInteractor";
import { OrderInteracor } from "../../interactors/order/OrderInteractor";

const placeInteractor = new PlaceInteractor(placeRepository)
const placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository)
const orderInteractor = new OrderInteracor(orderRepository)

const controller = new AppOwnerController(placeInteractor, placeWorkerInteractor, orderInteractor);

const appOwnerRouter: Router = Router();

appOwnerRouter.post("/createPlace", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onCreatePlace))
appOwnerRouter.delete("/deletePlace/:placeId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onDeletePlace))
appOwnerRouter.get("/getTotalPointsDaily", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetPointsDaily))
appOwnerRouter.get("/getTotalPointsMonthly", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetPointsMonthly))
appOwnerRouter.get("/getTotalPlaces", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetTotalPlaces))

export default appOwnerRouter;
