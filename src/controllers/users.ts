import User from "../models/user";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { OK_STATUS, BAD_REQUEST_STATUS, NOT_FOUND_STATUS, INTERNAL_SERVER_ERROR } from "../constants";
import { Error } from "mongoose";


export const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((users) => res.status(OK_STATUS).send({ data: users }))
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

export const getUserById = (req: Request, res: Response) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(OK_STATUS).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        });
      }
      return res.status(NOT_FOUND_STATUS).send({ message: 'Пользователь не найден' });
    })
    .catch(() => res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(OK_STATUS).send({ data: user }))
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        return res.status(BAD_REQUEST_STATUS).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

export const updateUser = (req: Request, res: Response) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate((req as any).user._id, { name, about }, {
    new: true,
  })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_STATUS).send({ message: 'Пользователь не найден' });
      }
      res.status(OK_STATUS).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        return res.status(BAD_REQUEST_STATUS).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

export const updateUserAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate((req as any).user._id, { avatar }, {
    new: true,
  })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND_STATUS).send({ message: 'Пользователь не найден' });
      }
      res.status(OK_STATUS).send({ data: user });
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        return res.status(BAD_REQUEST_STATUS).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};










