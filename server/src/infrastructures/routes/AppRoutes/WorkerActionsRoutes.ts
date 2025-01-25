import { NextFunction, Request, Response, Router } from "express";
import { UserRecordController } from "../../../controllers/Company/UserRecordController";
import { PlaceWorkerInteractor } from "../../../interactors/placeWorker/PlaceWorkerInteractor";
import { earnedPlacePointMenuItemRepository, earnedPlacePointRepository, placeWorkerRepository, userRecordRepository, userRepository } from "../../repositories/PrismaRepository";
import { PlaceUserRecordInteractor } from "../../../interactors/placeUserRecord/PlaceUserRecordInteractor";
import { authorizePrismaMiddleware } from "../../middlewares/auth";
import { errorHandler } from "../../middlewares/error-handler";
import { EarnedPointMenuItemInteractor } from "../../../interactors/earnedPointMenuItem/EarnedPointMenuItemInteractor";
import { EarnedPlacePointInteractor } from "../../../interactors/earnedPlacePoint/EarnedPlacePointInteractor";
import { UserInteractor } from "../../../interactors/user/UserInteractor";
import { s3ImageService } from "../../services/S3ImageService";
import { WorkerActionsController } from "../../../controllers/Company/WorkerActionsController";



const workerActionsRouter: Router = Router();

const earnedPointMenuItemInteractor = new EarnedPointMenuItemInteractor(earnedPlacePointMenuItemRepository)
const earnedPlacePointInteractor = new EarnedPlacePointInteractor(earnedPlacePointRepository)
const placeRecordInteractor = new PlaceUserRecordInteractor(userRecordRepository)
const userInteractor = new UserInteractor(userRepository, s3ImageService)
const placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository)
const controller = new WorkerActionsController(placeWorkerInteractor, earnedPointMenuItemInteractor, earnedPlacePointInteractor, placeRecordInteractor, userInteractor)

workerActionsRouter.post("/processUserOrder", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onProcessUserOrder))
