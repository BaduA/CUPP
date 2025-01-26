import { NextFunction, Request, Response, Router } from "express";
import { PlaceInteractor } from "../../../interactors/place/PlaceInteractor";
import { placeImageRepository, placeRepository, placeWorkerRepository } from "../../repositories/PrismaRepository";
import { PlaceImageInteractor } from "../../../interactors/placeImage/PlaceImageInteractor";
import { s3ImageService } from "../../services/S3ImageService";
import { PlaceController } from "../../../controllers/Company/PlaceController";
import { PlaceWorkerInteractor } from "../../../interactors/placeWorker/PlaceWorkerInteractor";
import { authorizePrismaMiddleware } from "../../middlewares/auth";
import { errorHandler } from "../../middlewares/error-handler";
import multer from "multer";


export const placeAdminRoutes: Router = Router();
export const placeWorkerRoutes: Router = Router();
export const placeRoutes: Router = Router();

var placeInteractor = new PlaceInteractor(placeRepository)
var placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository)
var placeImageInteractor = new PlaceImageInteractor(placeImageRepository, s3ImageService)
var controller = new PlaceController(placeInteractor, placeImageInteractor, placeWorkerInteractor)


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

placeRoutes.get("/getByName/:name", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetPlacesByName))
placeRoutes.get("/getByName", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetPlacesByName))
placeRoutes.get("/getById/:placeId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetPlacesById))
placeRoutes.get("/getPlacesInArea", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetPlacesWithArea))

placeAdminRoutes.put("/updatePlace/:placeId", [upload.single("placePicture"), authorizePrismaMiddleware.authorizeUser], errorHandler(controller.onUpdatePlace))
placeAdminRoutes.delete("/deletePlaceImage/:imageId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onDeletePlaceImage))