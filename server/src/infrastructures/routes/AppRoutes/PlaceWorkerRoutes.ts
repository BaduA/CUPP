import { NextFunction, Request, Response, Router } from "express";
import { PlaceWorkerInteractor } from "../../../interactors/placeWorker/PlaceWorkerInteractor";
import { placeWorkerRepository } from "../../repositories/PrismaRepository";
import { PlaceWorkerController } from "../../../controllers/Company/PlaceWorkerController";
import { errorHandler } from "../../middlewares/error-handler";
import { authorizePrismaMiddleware } from "../../middlewares/auth";


const placeWorkerAdminRoutes: Router = Router();

var placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository)
var controller = new PlaceWorkerController(placeWorkerInteractor)

placeWorkerAdminRoutes.use("/addAdmin/:placeId/:userId", authorizePrismaMiddleware.authorizeUser, errorHandler((req: Request, res: Response, next: NextFunction) => (controller.onAddAdmin(req, res, next))))
placeWorkerAdminRoutes.use("/addWorker/:placeId/:userId", authorizePrismaMiddleware.authorizeUser, errorHandler((req: Request, res: Response, next: NextFunction) => (controller.onAddWorker(req, res, next))))
placeWorkerAdminRoutes.use("/deleteWorker/:placeId/:userId", authorizePrismaMiddleware.authorizeUser, errorHandler((req: Request, res: Response, next: NextFunction) => (controller.onDeleteWorker(req, res, next))))