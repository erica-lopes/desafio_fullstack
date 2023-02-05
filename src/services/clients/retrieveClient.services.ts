import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const retrieveClientService = async (id: string) => {
  const userRepository = AppDataSource.getRepository(User)
  const clientRepository = AppDataSource.getRepository(Client);
  const user = await userRepository.findOneBy({ id });
  const client = await clientRepository.findOneBy({ id });

  if (!client) {
    throw new AppError("User not found", 404);
  }

  return user ? user : client;
};

export default retrieveClientService;
