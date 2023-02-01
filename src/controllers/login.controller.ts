import { Request, Response } from "express";
import { ILoginRequest } from "./../interfaces/login.interface";
import createLoginService from "../services/createLogin.services";

const createLoginController = async (request: Request, response: Response) => {
  const data: ILoginRequest = request.body;
  const token = await createLoginService(data);
  return response.status(200).json({ token });
};

export default createLoginController;
