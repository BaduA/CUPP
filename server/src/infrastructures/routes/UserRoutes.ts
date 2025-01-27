import { Router } from "express";
import { menuItemWorkerRoutes } from "./AppRoutes/MenuItemRoutes";
import { placeRoutes, placeWorkerRoutes } from "./AppRoutes/PlaceRoutes";
import { userRecordRoutes, userRecordWorkerRoutes } from "./AppRoutes/UserRecordRoutes";
import { workerActionsRouter } from "./AppRoutes/WorkerActionsRoutes";
import { earnedPointRoutes } from "./AppRoutes/EarnedPointRoutes";
import { promotionRouter } from "./AppRoutes/PromotionRoutes";

export const userRouter: Router = Router();

userRouter.use("/place", placeRoutes)
userRouter.use("/userRecord", userRecordRoutes)
userRouter.use("/earnedPoint", earnedPointRoutes)
userRouter.use("/promotion", promotionRouter)

