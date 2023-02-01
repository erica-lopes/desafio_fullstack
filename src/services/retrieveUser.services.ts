import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

const retrieveUserService = async (id: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new Error("User not found");
  }

  return findUser;
};

export default retrieveUserService;
