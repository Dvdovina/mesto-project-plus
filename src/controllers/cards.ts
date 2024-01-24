import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import {
  OK_STATUS
} from '../utils/constants';
import { handleCardErrors, handleCardLike } from '../decorators/updateCardDataDecorator';
import BadRequestError from '../errors/badRequestError';
import NotFoundError from '../errors/NotFoundError';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({}).orFail(() => new NotFoundError('Карточки не найдены'));
    res.status(OK_STATUS).send(cards);
  } catch (error) {
    next(error);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: (req as any).user._id });
    res.status(OK_STATUS).send({ data: card });
  } catch (error) {
    if (error instanceof BadRequestError) {
      return next(error);
    }
    next(error);
  }
};

export const deleteCardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Card.deleteOne({ _id: req.params.cardId });
    if (result.deletedCount === 0) {
      throw new NotFoundError('Карточка не найдена');
    }
    res.status(OK_STATUS).send({ message: 'Карточка удалена' });
  } catch (error) {
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      return next(error);
    }
    next(error);
  }
};
export const likeCard = handleCardErrors(async (req: Request, res: Response) => {
  await handleCardLike(req, res, { $addToSet: { likes: (req as any).user._id } });
});

export const unlikeCard = handleCardErrors(async (req: Request, res: Response) => {
  await handleCardLike(req, res, { $pull: { likes: (req as any).user._id } });
});
