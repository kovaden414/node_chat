import { ApiError } from '../exeptions/api.error.js';
import { userService } from '../services/user.service.js';

const createUser = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    throw ApiError.badRequest('Enter the username');
  }

  await userService.createUser(username);

  res.status(201).send({ message: 'User created'});
};

export const userController = {
  createUser,
};
