import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const deleteUserService = async (id: string): Promise<void> => {
  if (!id) {
    throw new AppError("Not your profile!", 403);
  }

  const userRepository = AppDataSource.getRepository(User);
  const findUser = await userRepository.findOneBy({ id });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  await userRepository.remove(findUser);
};

export default deleteUserService;
