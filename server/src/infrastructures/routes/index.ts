import { Router } from "express";
import userRoutes from "./UserRoutes";

const rootRouter: Router = Router();

// rootRouter.use("/place", placeRoutes);
rootRouter.use("/user", userRoutes);
rootRouter.use("/admin", userRoutes);

export default rootRouter;
