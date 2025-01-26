import { NextFunction, Request, Response, Router } from "express";
import { PlaceWorkerInteractor } from "../../../interactors/placeWorker/PlaceWorkerInteractor";
import { placeWorkerRepository } from "../../repositories/PrismaRepository";
import { PlaceWorkerController } from "../../../controllers/Company/PlaceWorkerController";
import { errorHandler } from "../../middlewares/error-handler";
import { authorizePrismaMiddleware } from "../../middlewares/auth";


export const placeWorkerAdminRoutes: Router = Router();

var placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository)
var controller = new PlaceWorkerController(placeWorkerInteractor)

placeWorkerAdminRoutes.post("/addAdmin/:placeId/:userId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onAddAdmin))
placeWorkerAdminRoutes.post("/addWorker/:placeId/:userId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onAddWorker))
placeWorkerAdminRoutes.delete("/deleteWorker/:placeId/:userId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onDeleteWorker))