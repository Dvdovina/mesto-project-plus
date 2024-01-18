import Card from "../models/card";
import { Request, Response } from "express";
import { OK_STATUS, ERROR_STATUS } from "../constants";


const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner:(req as any).user._id })
    .then((card) => {
      res.status(OK_STATUS).send({ data: card });
    })
    .catch((err) => res.status(ERROR_STATUS).send(err));
};


