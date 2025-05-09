import { ApiError } from '../exeptions/api.error.js';
import { User } from '../models/user.js';
import { jwtService } from './jwt.service.js';

function findByUserName(username) {
  return User.findOne({ where: { username } });
}

function normalize({ id, username }) {
  return { id, username };
}

async function createUser(username) {
  const existUser = await User.findOne({ where: { username } });

  if (existUser) {
    throw ApiError.badRequest('User already exist');
  }

  await User.create({ username });
}

async function getUser(req) {
  const { refreshToken } = req.cookies;
  const userData = await jwtService.verifyRefresh(refreshToken);

  if (!userData || !refreshToken) {
    throw ApiError.unauthorized();
  }

  const user = await findByUserName(userData.username);

  return user;
}

export const userService = {
  findByUserName,
  normalize,
  createUser,
  getUser,
};
