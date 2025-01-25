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

const userRoutes: Router = Router();

userRoutes.post("/signUp", upload.single("profilePicture"), errorHandler(controller.onSignUp))
userRoutes.post("/signIn", errorHandler(controller.onSignIn))
userRoutes.put("/update", errorHandler(controller.onUpdate))
userRoutes.put("/changePassword", authorizeMiddleware.authorizeUser, errorHandler(controller.onChangePassword))
userRoutes.put("/changeProfilePicture", [authorizeMiddleware.authorizeUser, upload.single("profilePicture")], errorHandler(controller.onChangeProfilePicture))
userRoutes.get("/:id", errorHandler(controller.onFindWithId))

export default userRoutes;
