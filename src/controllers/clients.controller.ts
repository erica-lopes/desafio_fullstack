import { Request, Response } from "express";
import {
  IClientRequest,
  IClientUpdateRequest,
} from "../interfaces/clients.interface";
import { instanceToPlain } from "class-transformer";
import createClientService from "../services/clients/createClient.services";
import retrieveClientService from "../services/clients/retrieveClient.services";
import updateClientService from "../services/clients/updateClient.services";
import deleteClientService from "../services/clients/deleteClient.services";


const createClientController = async (request: Request, response: Response) => {
  const client: IClientRequest = request.body;
  const id: string = request.user.id;
  const createdClient = await createClientService(client, id);
  return response.status(201).json(instanceToPlain(createdClient));
};

const retrieveClientController = async (
  request: Request,
  response: Response
) => {
  const id = request.params.id;
  const client = await retrieveClientService(id);
  return response.json(client);
};

const updateClientController = async (request: Request, response: Response) => {
  const client: IClientUpdateRequest = request.body;
  const { id } = request.params;
  const updatedClient = await updateClientService(client, id);
  return response.json(updatedClient);
};

const deleteClientController = async (request: Request, response: Response) => {
  const id: string = request.params.id;
  await deleteClientService(id);
  return response.status(204).json({
    message: "Deleted successfully",
  });
};

export {
  createClientController,
  retrieveClientController,
  updateClientController,
  deleteClientController,
};
