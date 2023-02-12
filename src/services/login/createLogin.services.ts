import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { ILoginRequest } from "../../interfaces/login.interface";
import { compareSync } from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/appError";
import "dotenv/config";

const createLoginService = async ({
  email,
  password,
}: ILoginRequest): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email: email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatch = await compareSync(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    { email: user.email },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "1h",
      subject: user.id,
    }
  );
  return token;
};

export default createLoginService;
