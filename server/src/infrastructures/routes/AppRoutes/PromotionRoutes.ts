import { Router } from "express";
import { PlaceWorkerInteractor } from "../../../interactors/placeWorker/PlaceWorkerInteractor";
import { placeWorkerRepository, promotionRepository } from "../../repositories/PrismaRepository";
import { errorHandler } from "../../middlewares/error-handler";
import { authorizePrismaMiddleware } from "../../middlewares/auth";
import { PlacePromotionInteractor } from "../../../interactors/placePromotion/PlacePromotionInteractor";
import { s3ImageService } from "../../services/S3ImageService";
import { PromotionController } from "../../../controllers/Company/PromotionController";


const promotionAdminRouter: Router = Router();

var placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository)
var promotionInteractor = new PlacePromotionInteractor(promotionRepository, s3ImageService)
var controller = new PromotionController(placeWorkerInteractor, promotionInteractor)

promotionAdminRouter.post("/addPromotion/:placeId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onCreatePromotion))
promotionAdminRouter.delete("/deletePromotion/:placeId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onDeletePromotion))