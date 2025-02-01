import { NextFunction, Request, Response, Router } from "express";
import { UserRecordController } from "../../../controllers/Company/UserRecordController";
import { PlaceWorkerInteractor } from "../../../interactors/placeWorker/PlaceWorkerInteractor";
import {
  earnedPlacePointMenuItemRepository,
  orderRepository,
  placeRepository,
  placeWorkerRepository,
  promotionRepository,
  usedPromotionRepository,
  userRecordRepository,
  userRepository,
} from "../../repositories/PrismaRepository";
import { PlaceUserRecordInteractor } from "../../../interactors/placeUserRecord/PlaceUserRecordInteractor";
import { authorizePrismaMiddleware } from "../../middlewares/auth";
import { errorHandler } from "../../middlewares/error-handler";
import { EarnedPointMenuItemInteractor } from "../../../interactors/earnedPointMenuItem/EarnedPointMenuItemInteractor";
import { OrderInteracor } from "../../../interactors/order/OrderInteractor";
import { UserInteractor } from "../../../interactors/user/UserInteractor";
import { s3ImageService } from "../../services/S3ImageService";
import { WorkerActionsController } from "../../../controllers/Company/WorkerActionsController";
import { PlaceInteractor } from "../../../interactors/place/PlaceInteractor";
import { PlacePromotionInteractor } from "../../../interactors/placePromotion/PlacePromotionInteractor";
import { UsedPromotionInteractor } from "../../../interactors/usedPromotion/UsedPromotionInteractor";
import { SendMailService } from "../../services/SendMailService";

export const workerActionsRouter: Router = Router();

const earnedPointMenuItemInteractor = new EarnedPointMenuItemInteractor(
  earnedPlacePointMenuItemRepository
);
const earnedPlacePointInteractor = new OrderInteracor(orderRepository);
const placeRecordInteractor = new PlaceUserRecordInteractor(
  userRecordRepository
);
const userInteractor = new UserInteractor(
  userRepository,
  s3ImageService,
  new SendMailService()
);
const placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository);
const placeInteractor = new PlaceInteractor(placeRepository);
const promotionInteractor = new PlacePromotionInteractor(
  promotionRepository,
  s3ImageService
);
const usedPromotionInteractor = new UsedPromotionInteractor(
  usedPromotionRepository
);
const controller = new WorkerActionsController(
  placeWorkerInteractor,
  earnedPointMenuItemInteractor,
  earnedPlacePointInteractor,
  placeRecordInteractor,
  userInteractor,
  placeInteractor,
  promotionInteractor,
  usedPromotionInteractor
);

workerActionsRouter.post(
  "/processUserOrder",
  authorizePrismaMiddleware.authorizeUser,
  errorHandler(controller.onProcessUserOrder)
);
workerActionsRouter.post(
  "/processUserPromotion",
  authorizePrismaMiddleware.authorizeUser,
  errorHandler(controller.onProcessUserPromotion)
);
