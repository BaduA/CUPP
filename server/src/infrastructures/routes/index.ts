import { Router } from "express";
import userRoutes from "./UserRoutes";

const rootRouter: Router = Router();

// rootRouter.use("/place", placeRoutes);
rootRouter.use("/user", userRoutes);

export default rootRouter;
