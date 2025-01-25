import { NextFunction, Request, Response, Router } from "express";
import { PlaceInteractor } from "../../../interactors/place/PlaceInteractor";
import { placeImageRepository, placeRepository, placeWorkerRepository } from "../../repositories/PrismaRepository";
import { PlaceImageInteractor } from "../../../interactors/placeImage/PlaceImageInteractor";
import { s3ImageService } from "../../services/S3ImageService";
import { PlaceController } from "../../../controllers/Company/PlaceController";
import { PlaceWorkerInteractor } from "../../../interactors/placeWorker/PlaceWorkerInteractor";
import { authorizePrismaMiddleware } from "../../middlewares/auth";
import { errorHandler } from "../../middlewares/error-handler";


const placeAdminRoutes: Router = Router();
const placeWorkerRoutes: Router = Router();
const placeRoutes: Router = Router();

var placeInteractor = new PlaceInteractor(placeRepository)
var placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository)
var placeImageInteractor = new PlaceImageInteractor(placeImageRepository, s3ImageService)
var controller = new PlaceController(placeInteractor, placeImageInteractor, placeWorkerInteractor)


placeRoutes.get("/getByName/:name", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetPlacesByName))
placeRoutes.get("/getById/:placeId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetPlacesById))
placeRoutes.get("/getPlacesInArea", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetPlacesWithArea))

placeAdminRoutes.put("/updatePlace/:placeId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onUpdatePlace))
placeAdminRoutes.delete("/deletePlaceImage/:imageId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onDeletePlaceImage))