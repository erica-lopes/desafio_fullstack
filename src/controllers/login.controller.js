import createLoginService from "../services/createLogin.services";

const createLoginController = async (request, response) => {
  try {
    const { email, password } = request.body;
    const token = await createLoginService(email, password);
    return response.status(200).json(token);
  } catch (error) {
    return response.status(400).json({
      message: error.message,
    });
  }
};

export default createLoginController;
