import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Error } from 'mongoose';
import {
  OK_STATUS, BAD_REQUEST_STATUS, NOT_FOUND_STATUS, INTERNAL_SERVER_ERROR
} from '../utils/constants';
import User from '../models/user';
import { handleErrors, updateUserAvatarLogic, updateUserLogic } from '../decorators/updateUserDataDecorator';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find({}).orFail(new Error('Пользователи не найдены'));
    return res.status(OK_STATUS).send(users);
  } catch (err) {
    return next(err);
  }
};

export const getUserById = (req: Request, res: Response) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(OK_STATUS).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id
        });
      } else {
        res.status(NOT_FOUND_STATUS).send({ message: 'Пользователь не найден' });
      }
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return res.status(BAD_REQUEST_STATUS).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  User.create({ name, about, avatar, email, password: hash })
    .then((user) =>
      res.status(OK_STATUS).send({ data: user }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        return res.status(BAD_REQUEST_STATUS).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

export const updateUser = handleErrors(updateUserLogic);

export const updateUserAvatar = handleErrors(updateUserAvatarLogic);
