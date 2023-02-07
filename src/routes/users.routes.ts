import { Router } from "express";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import {
  createUserController,
  listUserController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/users.controller";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("/clients", verifyTokenMiddleware, listUserController);
userRouter.get("/profile", verifyTokenMiddleware, retrieveUserController);
userRouter.patch("", verifyTokenMiddleware, updateUserController);
userRouter.delete("/:id", verifyTokenMiddleware, deleteUserController);

export default userRouter;
