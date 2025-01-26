import { Router } from "express";
import authRouter from "./AuthRoutes";
import { adminRouter } from "./AdminRoutes";
import appOwnerRouter from "./AppOwnerRoutes";
import { workerRoutes } from "./WorkerRoutes";
import { userRouter } from "./UserRoutes";

const rootRouter: Router = Router();

// rootRouter.use("/place", placeRoutes);
rootRouter.use("/auth", authRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/worker", workerRoutes);
rootRouter.use("/admin", adminRouter);
rootRouter.use("/appOwner", appOwnerRouter);

export default rootRouter;
