import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Error } from 'mongoose';
import {
  CREATED_STATUS,
  OK_STATUS, SECRET_KEY, NOT_FOUND_STATUS
} from '../utils/constants';
import UnauthorizedError from '../errors/unauthorizedError';
import BadRequestError from '../errors/badRequestError';
import ConflictError from '../errors/confictError';
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

export const getUserMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById((req as any).user?._id).orFail(new Error('Пользователь не найден'));
    return res.status(OK_STATUS).send({ user });
  } catch (err) {
    return next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.userId);
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
  } catch (err) {
    if (err instanceof Error.CastError) {
      next(new BadRequestError('Переданы некорректные данные'));
    } else {
      next(err);
    }
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      name, about, avatar, email, password
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash
    });
    const userWithoutPassword = { ...user.toJSON(), password: undefined };
    res.status(CREATED_STATUS).send({ data: userWithoutPassword });
  } catch (err: any) {
    if (err instanceof Error.ValidationError) {
      return next(new BadRequestError('Переданы некорректные данные'));
    } if (err.code === 11000) {
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }
    return next(err);
  }
  return undefined;
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, SECRET_KEY as string, { expiresIn: '7d' });
    res.send({ token });
  } catch (err) {
    next(new UnauthorizedError('Неверный логин или пароль'));
  }
};

export const updateUser = handleErrors(updateUserLogic);

export const updateUserAvatar = handleErrors(updateUserAvatarLogic);
