import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

const deleteUserService = async (id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new Error("User not found");
  }

  await userRepository.delete(findUser);
};

export default deleteUserService;
