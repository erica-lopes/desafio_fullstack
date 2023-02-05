import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { User } from "../../entities/user.entity";
import { verifyOwnerUser } from "../../middlewares/verifyOwnerUser.middleware";

const listClientsByUserService = async (userId: string): Promise<Client[]> => {
  await verifyOwnerUser(userId);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId
    },
    relations: {
      client: true,
    }
  });

  return user!.client;
};

export default listClientsByUserService;
