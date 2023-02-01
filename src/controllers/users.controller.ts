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
  try {
    const user: IUserRequest = request.body;
    const createdUser = await createUserService(user);
    return response.status(201).json(instanceToPlain(createdUser));
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
};

const listUserController = async (request: Request, response: Response) => {
  const listUsers = await listUserService();
  return response.status(200).json(instanceToPlain(listUsers));
};

const retrieveUserController = async (request: Request, response: Response) => {
  try {
    const id: string = request.params.id;
    const user = await retrieveUserService(id);
    return response.json(instanceToPlain(user));
  } catch (error) {
    if (error instanceof Error) {
      return response.status(404).json({
        message: error.message,
      });
    }
  }
};

const updateUserController = async (request: Request, response: Response) => {
  try {
    const user: IUserUpdateRequest = request.body;
    const id: string = request.params.id;
    const updatedUser = updateUserService(user, id);
    return response.json(instanceToPlain(updatedUser));
  } catch (error) {
    if (error instanceof Error) {
      return response.status(404).json({
        message: error.message,
      });
    }
  }
};

const deleteUserController = async (request: Request, response: Response) => {
  try {
    const id: string = request.params.id;
    await deleteUserService(id);
    return response.status(204).send();
  } catch (error) {
    if (error instanceof Error) {
      return response.status(404).json({
        message: error.message,
      });
    }
  }
};

export {
  createUserController,
  listUserController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
};
