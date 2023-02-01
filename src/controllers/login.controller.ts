import { Request, Response } from "express";
import { ILoginRequest } from "./../interfaces/login.interface";
import createLoginService from "../services/createLogin.services";

const createLoginController = async (request: Request, response: Response) => {
  try {
    const data: ILoginRequest = request.body;
    const token = await createLoginService(data);
    return response.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
};

export default createLoginController;
