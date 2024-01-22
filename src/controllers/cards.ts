import { Request, Response } from 'express';
import { Error } from 'mongoose';
import Card from '../models/card';
import {
  OK_STATUS, BAD_REQUEST_STATUS, NOT_FOUND_STATUS, INTERNAL_SERVER_ERROR
} from '../utils/constants';

export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) =>
      res.status(OK_STATUS).send({ data: cards }))
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: (req as any).user._id })
    .then((card) => {
      res.status(OK_STATUS).send({ data: card });
    })
    .catch((err) => {
      if (err instanceof Error.ValidationError) {
        return res.status(BAD_REQUEST_STATUS).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

export const deleteCardById = (req: Request, res: Response) => {
  Card.deleteOne({ _id: req.params.cardId })
    .then((card) => {
      if (card.deletedCount === 0) {
        res.status(NOT_FOUND_STATUS).send({ message: 'Карточка не найдена' });
      }
      res.status(OK_STATUS).send({ message: 'Карточка удалена' });
    })
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return res.status(BAD_REQUEST_STATUS).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

export const likeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $addToSet: { likes: (req as any).user._id }
    },
    {
      new: true
    }
  )
    .then((card) =>
      res.status(OK_STATUS).send(({ data: card })))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return res.status(BAD_REQUEST_STATUS).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};

export const unlikeCard = (req: Request, res: Response) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    {
      $pull: { likes: (req as any).user._id }
    },
    {
      new: true
    }
  )
    .then((card) =>
      res.status(OK_STATUS).send({ data: card }))
    .catch((err) => {
      if (err instanceof Error.CastError) {
        return res.status(BAD_REQUEST_STATUS).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Внутренняя ошибка сервера' });
    });
};
