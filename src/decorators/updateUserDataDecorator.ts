import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST_STATUS, INTERNAL_SERVER_ERROR, OK_STATUS, NOT_FOUND_STATUS } from '../utils/constants';
import User from '../models/user';
import { Error } from 'mongoose';

export const handleErrors = (controllerFunction: (req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFunction(req, res);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        return res.status(BAD_REQUEST_STATUS).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    }
  };
};

export const updateUserLogic = async (req: Request, res: Response) => {
  const { name, about } = req.body;
  const user = await User.findByIdAndUpdate(
    (req as any).user?._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!user) {
    res.status(NOT_FOUND_STATUS).send({ message: 'Пользователь не найден' });
  } else {
    res.status(OK_STATUS).send({ data: user });
  }
};

export const updateUserAvatarLogic = async (req: Request, res: Response) => {
  const { avatar } = req.body;
  const user = await User.findByIdAndUpdate((req as any).user._id, { avatar }, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    res.status(NOT_FOUND_STATUS).send({ message: 'Пользователь не найден' });
  } else {
    res.status(OK_STATUS).send({ data: user });
  }
};