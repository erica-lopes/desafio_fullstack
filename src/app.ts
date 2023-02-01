import express from "express";
import "reflect-metadata";
import { startDatabase } from "./database";
import userRouter from "./routes/users.routes";
import loginRouter from "./routes/login.routes";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/login", loginRouter);

app.listen(3000, () => {
  console.log("Listen in port 3000");
  startDatabase();
});
