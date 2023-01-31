import users from "../database";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const createLoginService = async (email, password) => {
  const user = users.find((e) => e.email === email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await compareSync(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
    subject: user.uuid,
  });
  return { token };
};

export default createLoginService;
