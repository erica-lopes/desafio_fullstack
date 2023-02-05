import { Request, Response } from "express";
import {
  IUserRequest,
  IUserUpdateRequest,
} from "./../interfaces/users.interface";
import createUserService from "../services/users/createUser.services";
import retrieveUserService from "../services/users/retrieveUser.services";
import updateUserService from "../services/users/updateUser.services";
import deleteUserService from "../services/users/deleteUser.services";
import { instanceToPlain } from "class-transformer";
import listClientsByUserService from "../services/users/listClientsByUser.services";

const createUserController = async (request: Request, response: Response) => {
  const user: IUserRequest = request.body;
  const createdUser = await createUserService(user);
  return response.status(201).json(instanceToPlain(createdUser));
};

const listUserController = async (request: Request, response: Response) => {
  const userId = request.user.id;
  const listUsers = await listClientsByUserService(userId);
  return response.status(200).json(instanceToPlain(listUsers));
};

const retrieveUserController = async (request: Request, response: Response) => {
  const id: string = request.params.id;
  const user = await retrieveUserService(id);
  return response.json(instanceToPlain(user));
};

const updateUserController = async (request: Request, response: Response) => {
  const user: IUserUpdateRequest = request.body;
  const id = request.params.id;
  const updatedUser = await updateUserService(user, id);
  return response.json(instanceToPlain(updatedUser));
};

const deleteUserController = async (request: Request, response: Response) => {
  const id = request.params.id;
  await deleteUserService(id);
  return response.status(204).json({
    message: "Removed!",
  });
};

export {
  createUserController,
  listUserController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
};
