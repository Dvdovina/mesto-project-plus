import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY, UNAUTHORIZED_ERROR_STATUS } from '../utils/constants';
import UnauthorizedError from '../errors/unauthorizedError';

interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

export const auth = (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new UnauthorizedError('Неверный логин или пароль'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return next(new UnauthorizedError('Неверный логин или пароль'));
  }
  req.user = payload;
  return next();
};


