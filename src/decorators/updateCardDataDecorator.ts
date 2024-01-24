import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
import Card from '../models/card';
import {
  OK_STATUS, BAD_REQUEST_STATUS, INTERNAL_SERVER_ERROR
} from '../utils/constants';
import BadRequestError from '../errors/badRequestError';
import NotFoundError from '../errors/NotFoundError';

export const handleCardErrors = (
  controllerFunction: (req: Request, res: Response) => Promise<void>
) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await controllerFunction(req, res);
  } catch (error) {
    if (error instanceof BadRequestError) {
      return res.status(BAD_REQUEST_STATUS).send({ message: 'Переданы некорректные данные' });
    }
    next(error);
  }
};

export const handleCardLike = async (req: Request, res: Response, updateObject: any): Promise<void> => {
  const card = await Card.findByIdAndUpdate(
    req.params.cardId,
    updateObject,
    { new: true }
  );

  if (!card) {
    res.status(BAD_REQUEST_STATUS).send({ message: 'Карточка не найдена' });
  } else {
    res.status(OK_STATUS).send({ data: card });
  }
};