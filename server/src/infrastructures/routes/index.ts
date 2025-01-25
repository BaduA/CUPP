import { Router } from "express";
import userRoutes from "./UserRoutes";
import appOwnerRoutes from "./AppOwnerRoutes";
import { adminRoutes } from "./AdminRoutes";

const rootRouter: Router = Router();

// rootRouter.use("/place", placeRoutes);
rootRouter.use("/user", userRoutes);
rootRouter.use("/admin", adminRoutes);
rootRouter.use("/appOwner", appOwnerRoutes);

export default rootRouter;
