import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyTokenMiddleware = (request, response, next) => {
  // let token = request.headers.authorization;
  let token = request.headers["authorization"];
  if (!token) {
    response.status(401).json({
      message: "Missing authorization token",
    });
  }
  token = token.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return response.status(403).json({
        message: "Invalid Token",
      });
    }
    request.id = decoded.sub;
    next();
  });
};

export default verifyTokenMiddleware;
