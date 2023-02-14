import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { AppError } from "../../errors/appError";

const deleteClientService = async (id: string): Promise<void> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const findClient = await clientRepository.findOneBy({ id });

  if (!findClient) {
    throw new AppError("Client not found", 404);
  }

  await clientRepository.remove(findClient);
};

export default deleteClientService;
