import users from "../database";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";

const createUserService = async (name, email, phoneNumber, password) => {
  const hashedPassword = await hash(password, 10);
  const newUser = {
    uuid: uuidv4(),
    name,
    email,
    phoneNumber,
    password: hashedPassword,
    registrationDate: new Date(),
  };

  const userNotPass = { ...newUser, password: undefined };
  users.push(newUser);
  return userNotPass;
};

export default createUserService;
