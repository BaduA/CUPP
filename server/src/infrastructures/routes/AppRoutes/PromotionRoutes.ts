import { Router } from "express";
import { PlaceWorkerInteractor } from "../../../interactors/placeWorker/PlaceWorkerInteractor";
import { placeWorkerRepository, promotionRepository } from "../../repositories/PrismaRepository";
import { errorHandler } from "../../middlewares/error-handler";
import { authorizePrismaMiddleware } from "../../middlewares/auth";
import { PlacePromotionInteractor } from "../../../interactors/placePromotion/PlacePromotionInteractor";
import { s3ImageService } from "../../services/S3ImageService";
import { PromotionController } from "../../../controllers/Company/PromotionController";
import multer from "multer";


export const promotionAdminRouter: Router = Router();
export const promotionRouter: Router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

var placeWorkerInteractor = new PlaceWorkerInteractor(placeWorkerRepository)
var promotionInteractor = new PlacePromotionInteractor(promotionRepository, s3ImageService)
var controller = new PromotionController(placeWorkerInteractor, promotionInteractor)

promotionAdminRouter.post("/addPromotion/:placeId", [upload.single("promotionImage"), authorizePrismaMiddleware.authorizeUser], errorHandler(controller.onCreatePromotion))
promotionAdminRouter.delete("/deletePromotion/:placeId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onDeletePromotion))

promotionRouter.get("/getPromotions/:placeId", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetPlacePromotions))
promotionRouter.get("/getPromotionsByName/:placeId/:name", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetPlacePromotionsByName))
promotionRouter.get("/getPromotionsByPointValue/:placeId/:pointValue", authorizePrismaMiddleware.authorizeUser, errorHandler(controller.onGetPlacePromotionsByPointValue))