import { NextFunction, Request, Response, Router } from "express";
import { AuthMiddleware } from "../middlewares/auth";
import { errorHandler } from "../middlewares/error-handler";
import {
  userRepository,
  verifyUserCodeRepository,
} from "../repositories/PrismaRepository";
import { S3ImageService } from "../services/S3ImageService";
import multer from "multer";
import { UserInteractor } from "../../interactors/user/UserInteractor";
import { UserController } from "../../controllers/Auth/AuthController";
import { VerifyUserCodeInteractor } from "../../interactors/verifyUserCode/VerifyUserCodeInteractor";
import { SendMailService } from "../services/SendMailService";

const userInteractor = new UserInteractor(userRepository, new S3ImageService());
const verifyUserCodeInteractor = new VerifyUserCodeInteractor(
  verifyUserCodeRepository,
  new SendMailService()
);
const controller = new UserController(userInteractor, verifyUserCodeInteractor);
const authorizeMiddleware = new AuthMiddleware(userRepository);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const authRouter: Router = Router();

authRouter.post(
  "/signUp",
  upload.single("profilePicture"),
  errorHandler(controller.onSignUp)
);
authRouter.post("/signIn", errorHandler(controller.onSignIn));
authRouter.put(
  "/verifyUserAccount/:verifyCode",
  authorizeMiddleware.authorizeUser,
  errorHandler(controller.onVerifyUserAccount)
);
authRouter.post(
  "/verifyCode/:verifyCode",
  errorHandler(controller.onVerifyCode)
);
authRouter.get(
  "/getCurrentUser",
  authorizeMiddleware.authorizeUser,
  errorHandler(controller.onGetCurrentUser)
);
authRouter.post(
  "/generateCodeForMail",
  authorizeMiddleware.authorizeUser,
  errorHandler(controller.onGenerateForEmail)
);
authRouter.post(
  "/generateForForgotPassword",
  errorHandler(controller.onGenerateForEmail)
);
authRouter.put("/update", errorHandler(controller.onUpdate));
authRouter.put(
  "/changePassword",
  authorizeMiddleware.authorizeUser,
  errorHandler(controller.onChangePassword)
);
authRouter.put(
  "/changeEmail",
  authorizeMiddleware.authorizeUser,
  errorHandler(controller.onChangePassword)
);
authRouter.put(
  "/changeProfilePicture",
  [authorizeMiddleware.authorizeUser, upload.single("profilePicture")],
  errorHandler(controller.onChangeProfilePicture)
);
authRouter.delete(
  "/deleteExpiredOnes",
  [authorizeMiddleware.authorizeUser],
  errorHandler(controller.onDeleteExpiredOnes)
);
authRouter.get("/:id", errorHandler(controller.onFindWithId));

export default authRouter;
