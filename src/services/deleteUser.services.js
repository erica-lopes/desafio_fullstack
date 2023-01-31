import users from "../database";

const deleteUserService = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (!userIndex === -1) {
    throw new Error("User not found!");
  }

  users.splice(userIndex, 1);
};

export default deleteUserService;
