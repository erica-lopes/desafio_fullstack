import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserRequest } from "../../interfaces/users.interface";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/appError";

const createUserService = async ({
  name,
  email,
  phoneNumber,
  password,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  if (!password) {
    throw new AppError("Password is missing");
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    phoneNumber,
    password: hashedPassword,
  });

  await userRepository.save(user);

  return user;
};

export default createUserService;
