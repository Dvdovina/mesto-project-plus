import Card from "../models/card";
import { Request, Response } from "express";
import { OK_STATUS, BAD_REQUEST_STATUS, NOT_FOUND_STATUS } from "../constants";


export const getCards = (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => res.status(OK_STATUS).send({ data: cards }))
    .catch(() => res.status(BAD_REQUEST_STATUS).send({ message: 'Сервер не смог обработать запрос' }));
};

export const createCard = (req: Request, res: Response) => {
  const { name, link, _id } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      res.status(OK_STATUS).send({ data: card });
    })
    .catch(() => res.status(BAD_REQUEST_STATUS).send({ message: 'Сервер не смог обработать запрос' }));
};

export const deleteCardById = (req: Request, res: Response) => {
  Card.deleteOne({ _id: req.params.cardId })
    .then((card) => {
      if (card.deletedCount === 0) {
        res.status(NOT_FOUND_STATUS).send({ message: 'Карточка не найдена' });
      }
      res.status(OK_STATUS).send({ message: 'Карточка удалена' });
    })
    .catch(() => res.status(BAD_REQUEST_STATUS).send({ message: 'Сервер не смог обработать запрос' }));
};

