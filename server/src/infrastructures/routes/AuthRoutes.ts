import { NextFunction, Request, Response, Router } from "express";
import { AuthMiddleware } from "../middlewares/auth";
import { errorHandler } from "../middlewares/error-handler";
import { userRepository } from "../repositories/PrismaRepository";
import { S3ImageService } from "../services/S3ImageService";
import multer from "multer";
import { UserInteractor } from "../../interactors/user/UserInteractor";
import { UserController } from "../../controllers/Auth/AuthController";


const userInteractor = (new UserInteractor(userRepository, new S3ImageService()));
const controller = new UserController(userInteractor);
const authorizeMiddleware = new AuthMiddleware(userRepository);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const authRouter: Router = Router();

authRouter.post("/signUp", upload.single("profilePicture"), errorHandler(controller.onSignUp))
authRouter.post("/signIn", errorHandler(controller.onSignIn))
authRouter.put("/update", errorHandler(controller.onUpdate))
authRouter.put("/changePassword", authorizeMiddleware.authorizeUser, errorHandler(controller.onChangePassword))
authRouter.put("/changeProfilePicture", [authorizeMiddleware.authorizeUser, upload.single("profilePicture")], errorHandler(controller.onChangeProfilePicture))
authRouter.get("/:id", errorHandler(controller.onFindWithId))

export default authRouter;
