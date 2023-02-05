import { AppDataSource } from "../../data-source";
import { IClientRequest } from "../../interfaces/clients.interface";
import { Client } from "../../entities/clients.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/appError";

const createClientService = async (
  { name, email, phoneNumber }: IClientRequest,
  id: string
): Promise<any> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  const clientAlreadyExists = await clientRepository.findOneBy({ id });

  if (clientAlreadyExists) {
    if (clientAlreadyExists.email === email) {
      throw new AppError("Client already exists", 409);
    }
  }

  const newClient = clientRepository.create({
    name,
    email,
    phoneNumber,
    user: user!,
  });

  await clientRepository.save(newClient);

  const userResponse = {
    id: newClient.user.id,
    name: newClient.user.name,
  };

  const clientResponse = {
    name: newClient.name,
    email: newClient.email,
    phoneNumber: newClient.phoneNumber,
    user: userResponse,
  };

  return clientResponse;
};

export default createClientService;
