import createUserService from "../services/createUser.services";
import listUserService from "../services/listUser.services";
import retrieveUserService from "../services/retrieveUser.services";
import updateUserService from "../services/updateUser.services";
import deleteUserService from "../services/deleteUser.services";

const createUserController = async (request, response) => {
  const { name, email, phoneNumber, password } = request.body;
  const createdUser = await createUserService(name, email, phoneNumber, password);
  return response.status(201).json(createdUser);
};

const listUserController = (request, response) => {
  const listUsers = listUserService();
  return response.status(200).json(listUsers);
};

const retrieveUserController = (request, response) => {
  try {
    const id = request.params.id;
    const user = retrieveUserService(id);
    return response.json(user);
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    });
  }
};

const updateUserController = (request, response) => {
  try {
    const id = request.params.id;
    const user = request.body;
    const updatedUser = updateUserService(id, user);
    return response.json(updatedUser);
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    });
  }
};

const deleteUserController = (request, response) => {
  try {
    const id = request.params.id;
    deleteUserService(id);
    return response.status(204).send();
  } catch (error) {
    return response.status(404).json({
      message: error.message,
    });
  }
};

export {
  createUserController,
  listUserController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
};
