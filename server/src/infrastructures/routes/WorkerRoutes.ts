import { Router } from "express";
import { menuItemWorkerRoutes } from "./AppRoutes/MenuItemRoutes";
import { placeWorkerRoutes } from "./AppRoutes/PlaceRoutes";
import { userRecordWorkerRoutes } from "./AppRoutes/UserRecordRoutes";
import { workerActionsRouter } from "./AppRoutes/WorkerActionsRoutes";

export const workerRoutes: Router = Router();

workerRoutes.use("/place", placeWorkerRoutes)
workerRoutes.use("/userRecord", userRecordWorkerRoutes)
workerRoutes.use("/menuItem", menuItemWorkerRoutes)
workerRoutes.use("/workerActions", workerActionsRouter)

