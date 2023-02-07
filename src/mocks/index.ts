import {
  IClientRequest,
  IClientUpdateRequest,
} from "../interfaces/clients.interface";
import { ILoginRequest } from "../interfaces/login.interface";
import {
  IUserRequest,
  IUserUpdateRequest,
} from "../interfaces/users.interface";

export const userData: IUserRequest = {
  name: "Usuário",
  email: "user@mail.com.br",
  phoneNumber: "1499999-0000",
  password: "1234",
};

export const userLogin: ILoginRequest = {
  email: "user@mail.com.br",
  password: "1234",
};

export const userDataUpdate: IUserUpdateRequest = {
  name: "Usuário2",
  email: "user2@mail.com.br",
};

export const clientData: IClientRequest = {
  name: "Client",
  email: "client@mail.com.br",
  phoneNumber: "1499999-0000",
};

export const clientDataUpdate: IClientUpdateRequest = {
  name: "Client2",
  email: "client2@mail.com.br",
};
