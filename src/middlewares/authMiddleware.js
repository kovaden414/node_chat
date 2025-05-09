import { ApiError } from '../exeptions/api.error.js';
import { localStorage } from '../utils/store.js';

export const authMiddleware = (req, res, next) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    throw ApiError.unauthorized();
  }

  next();
};
