import {
  createUserController,
  listUserController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/users.controller";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import { Router } from "express";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", verifyTokenMiddleware, listUserController);
userRouter.get("/:uuid", verifyTokenMiddleware, retrieveUserController);
userRouter.patch("/:uuid", verifyTokenMiddleware, updateUserController);
userRouter.delete("/:uuid", verifyTokenMiddleware, deleteUserController);

export default userRouter;
