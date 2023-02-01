import express from "express";
import "express-async-errors";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import "reflect-metadata";
import { startDatabase } from "./database";
import userRouter from "./routes/users.routes";
import loginRouter from "./routes/login.routes";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/login", loginRouter);

app.use(handleErrorMiddleware);

app.listen(3000, () => {
  console.log("Listen in port 3000");
  startDatabase();
});
