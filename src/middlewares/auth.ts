import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY, UNAUTHORIZED_ERROR_STATUS } from 'utils/constants';

interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

const auth = (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization!.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return res.status(UNAUTHORIZED_ERROR_STATUS).send({ message: 'Неверный логин или пароль' });
  }
  req.user = payload;
  return next();
};

export default auth;