import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { IUserUpdateRequest } from "../interfaces/users.interface";
import { hash } from "bcryptjs";

const updateUserService = async (
  { name, email, phoneNumber, password }: IUserUpdateRequest,
  id: string
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new Error("User not found");
  }

  await userRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    phoneNumber: phoneNumber ? phoneNumber : findUser.phoneNumber,
    password: password ? await hash(password, 10) : findUser.password,
  });

  const user = await userRepository.findOneBy({ id });

  return user!;
};

export default updateUserService;
