import { Request, Response } from "express";
import {
  IUserRequest,
  IUserUpdateRequest,
} from "./../interfaces/users.interface";
import createUserService from "../services/createUser.services";
import listUserService from "../services/listUser.services";
import retrieveUserService from "../services/retrieveUser.services";
import updateUserService from "../services/updateUser.services";
import deleteUserService from "../services/deleteUser.services";
import { instanceToPlain } from "class-transformer";

const createUserController = async (request: Request, response: Response) => {
  const user: IUserRequest = request.body;
  const createdUser = await createUserService(user);
  return response.status(201).json(instanceToPlain(createdUser));
};

const listUserController = async (request: Request, response: Response) => {
  const listUsers = await listUserService();
  return response.status(200).json(instanceToPlain(listUsers));
};

const retrieveUserController = async (request: Request, response: Response) => {
  const id: string = request.params.id;
  const user = await retrieveUserService(id);
  return response.json(instanceToPlain(user));
};

const updateUserController = async (request: Request, response: Response) => {
  const user: IUserUpdateRequest = request.body;
  const id: string = request.params.id;
  const updatedUser = updateUserService(user, id);
  return response.json(instanceToPlain(updatedUser));
};

const deleteUserController = async (request: Request, response: Response) => {
  const id: string = request.params.id;
  await deleteUserService(id);
  return response.status(204).send();
};

export {
  createUserController,
  listUserController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
};
