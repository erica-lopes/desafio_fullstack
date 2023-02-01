import createLoginController from "../controllers/login.controller";
import { Router } from "express";

const loginRouter = Router();

loginRouter.post("", createLoginController);

export default loginRouter;
