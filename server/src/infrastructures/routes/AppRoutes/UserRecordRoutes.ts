import { NextFunction, Request, Response, Router } from "express";
import { UserRecordController } from "../../../controllers/Company/UserRecordController";
import { PlaceWorkerInteractor } from "../../../interactors/placeWorker/PlaceWorkerInteractor";
import { placeWorkerRepository, userRecordRepository } from "../../repositories/PrismaRepository";
import { PlaceUserRecordInteractor } from "../../../interactors/placeUserRecord/PlaceUserRecordInteractor";
import { authorizePrismaMiddleware } from "../../middlewares/auth";
import { errorHandler } from "../../middlewares/error-handler";



export const userRecordWorkerRoutes: Router = Router();
export const userRecordRoutes: Router = Router();

const placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository)
const userRecordInteractor = new PlaceUserRecordInteractor(userRecordRepository)
const controller = new UserRecordController(placeWorkerInteractor, userRecordInteractor)

userRecordRoutes.get("/getCurrentUserRecord/:placeId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetUserRecord))
userRecordWorkerRoutes.get("/getCurrentUserRecord/:placeId/:userId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetUserRecord))