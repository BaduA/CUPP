import { Router } from "express";
import userRoutes from "./UserRoutes";
import appOwnerRoutes from "./AppOwnerRoutes";

const rootRouter: Router = Router();

// rootRouter.use("/place", placeRoutes);
rootRouter.use("/user", userRoutes);
rootRouter.use("/appOwner", appOwnerRoutes);

export default rootRouter;
