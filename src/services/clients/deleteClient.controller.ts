import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { AppError } from "../../errors/appError";

const deleteClientService = async (id: string): Promise<void> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const findClient = await clientRepository.findOneBy({ id });

  if (findClient?.isActive === false) {
    throw new AppError("User already inactive");
  }

  await clientRepository.update(id, {
    isActive: false,
  });
};

export default deleteClientService;
