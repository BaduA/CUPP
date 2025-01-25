import { NextFunction, Request, Response, Router } from "express";
import { AuthMiddleware, authorizePrismaMiddleware } from "../middlewares/auth";
import { errorHandler } from "../middlewares/error-handler";
import { placeRepository, placeWorkerRepository, userRepository } from "../repositories/PrismaRepository";
import { S3ImageService } from "../services/S3ImageService";
import multer from "multer";
import { UserInteractor } from "../../interactors/user/UserInteractor";
import { UserController } from "../../controllers/Auth/AuthController";
import { AppOwnerController } from "../../controllers/AppOwner/AppOwnerController";
import { PlaceController } from "../../controllers/Company/PlaceController";
import { PlaceInteractor } from "../../interactors/place/PlaceInteractor";
import { PlaceWorkerInteractor } from "../../interactors/placeWorker/PlaceWorkerInteractor";

const placeInteractor = new PlaceInteractor(placeRepository)
const placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository)
const controller = new AppOwnerController(placeInteractor, placeWorkerInteractor);

const appOwnerRoutes: Router = Router();

appOwnerRoutes.post("/createPlace", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onCreatePlace))
appOwnerRoutes.delete("/deletePlace/:placeId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onDeletePlace))

export default appOwnerRoutes;
