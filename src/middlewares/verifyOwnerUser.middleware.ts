import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../errors/appError";

const verifyOwnerUser = async (user_id: string): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    id: user_id,
  });

  if (!user) {
    throw new AppError("Unauthorized", 401);
  }
};

export { verifyOwnerUser };
