import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyTokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  let token = request.headers["authorization"];

  if (!token) {
    return response.status(401).json({
      message: "Missing authorization token",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded: any) => {
    if (error) {
      return response.status(403).json({
        message: "Invalid token",
      });
    }
    request.user = {
      id: decoded.sub,
    };
    return next();
  });
};

export default verifyTokenMiddleware;
