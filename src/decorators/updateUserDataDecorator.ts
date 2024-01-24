import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import {
  BAD_REQUEST_STATUS, INTERNAL_SERVER_ERROR, OK_STATUS, NOT_FOUND_STATUS
} from '../utils/constants';
import User from '../models/user';
import BadRequestError from '../errors/badRequestError';

export const handleErrors = (
  controllerFunction: (req: Request, res: Response, next: NextFunction) => Promise<void>
) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFunction(req, res, next);
    } catch (err) {
      return next(err);
    }
  };

export const updateUserLogic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      (req as any).user?._id,
      { name, about },
      {
        new: true,
        runValidators: true
      }
    );
    if (user) {
      res.status(OK_STATUS).send({ data: user });
    }
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(err);
  }
};

export const updateUserAvatarLogic = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      (req as any).user?._id,
      { avatar },
      {
        new: true,
        runValidators: true
      }
    );
    if (user) {
      res.status(OK_STATUS).send({ data: user });
    }
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(err);
  }
};
