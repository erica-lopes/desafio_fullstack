import { Router } from "express";
import verifyTokenMiddleware from "../middlewares/verifyToken.middleware";
import {
  createClientController,
  retrieveClientController,
  updateClientController,
  deleteClientController,
} from "../controllers/clients.controller";

const clientRouter = Router();

clientRouter.post("", verifyTokenMiddleware, createClientController);
clientRouter.get("/:id", verifyTokenMiddleware, retrieveClientController);
clientRouter.patch("/:id", verifyTokenMiddleware, updateClientController);
clientRouter.delete("/:id", verifyTokenMiddleware, deleteClientController);

export default clientRouter;
