import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import "reflect-metadata";
import userRouter from "./routes/users.routes";
import loginRouter from "./routes/login.routes";
import clientRouter from "./routes/clients.routes";
import cors from "cors"

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/login", loginRouter);
app.use("/clients", clientRouter);

app.use(handleErrorMiddleware);

export default app;
