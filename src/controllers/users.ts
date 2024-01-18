import User from "models/user";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { OK_STATUS, ERROR_STATUS } from "../constants";


export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(OK_STATUS).send(({ data: user }));
    })
    .catch((err) => res.status(ERROR_STATUS).send(err));
};