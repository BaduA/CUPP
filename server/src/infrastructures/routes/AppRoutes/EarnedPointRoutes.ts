import { NextFunction, Request, Response, Router } from "express";
import { EarnedPlacePointInteractor } from "../../../interactors/earnedPlacePoint/EarnedPlacePointInteractor";
import { earnedPlacePointRepository, placeWorkerRepository } from "../../repositories/PrismaRepository";
import { PlaceWorkerInteractor } from "../../../interactors/placeWorker/PlaceWorkerInteractor";
import { EarnedPointController } from "../../../controllers/Company/EarnedPointController";
import { authorizePrismaMiddleware } from "../../middlewares/auth";
import { errorHandler } from "../../middlewares/error-handler";

const earnedPointAdminRoutes: Router = Router();
const earnedPointRoutes: Router = Router();

var earnedPointInteractor = new EarnedPlacePointInteractor(earnedPlacePointRepository)
var placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository)
var controller = new EarnedPointController(placeWorkerInteractor, earnedPointInteractor)

earnedPointRoutes.get("/getCurrentUserPoints",authorizePrismaMiddleware.authorizeUser,errorHandler((req: Request, res: Response, next: NextFunction) => (controller.onGetCurrentUserPoints(req, res, next))))
earnedPointRoutes.get("/getPlaceUserEarnedPoints/:placeId/:useId",authorizePrismaMiddleware.authorizeUser,errorHandler((req: Request, res: Response, next: NextFunction) => (controller.onGetPlaceUserEarnedPoints(req, res, next))))

earnedPointAdminRoutes.get("/getPlaceEarnedPoints/:placeId",authorizePrismaMiddleware.authorizeUser,errorHandler((req: Request, res: Response, next: NextFunction) => (controller.onGetPlaceEarnedPoints(req, res, next))))

