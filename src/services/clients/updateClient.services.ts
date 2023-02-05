import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { IClientUpdateRequest } from "../../interfaces/clients.interface";

const updateClientService = async (
  { name, email, phoneNumber }: IClientUpdateRequest,
  id: string
): Promise<Client> => {
  const clientRepository = AppDataSource.getRepository(Client);

  await clientRepository.update(id, { ...{ name, email, phoneNumber } });

  const clientUpdated = await clientRepository.findOneBy({ id });

  return clientUpdated!;
};

export default updateClientService;
