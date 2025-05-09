import { ApiError } from '../exeptions/api.error.js';
import { User } from '../models/user.js';
import { localStorage } from '../utils/store.js';

async function createUser(username) {
  const existUser = await User.findOne({ where: { username } });

  if (existUser) {
    throw ApiError.badRequest('User already exist');
  }

  const user = await User.create({ username });

  localStorage.setItem('user', JSON.stringify(user));
}

export const userService = {
  createUser,
};
