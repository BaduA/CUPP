import { Router } from "express";
import { promotionAdminRouter } from "./AppRoutes/PromotionRoutes";
import { placeWorkerAdminRoutes } from "./AppRoutes/PlaceWorkerRoutes";
import { placeAdminRoutes } from "./AppRoutes/PlaceRoutes";
import { menuItemAdminRoutes } from "./AppRoutes/MenuItemRoutes";
import { orderAdminRoutes } from "./AppRoutes/OrderRoutes";


export const adminRouter: Router = Router();

adminRouter.use("/promotion", promotionAdminRouter)
adminRouter.use("/placeWorker", placeWorkerAdminRoutes)
adminRouter.use("/place", placeAdminRoutes)
adminRouter.use("/menuItem", menuItemAdminRoutes)
adminRouter.use("/earnedPoint", orderAdminRoutes)

