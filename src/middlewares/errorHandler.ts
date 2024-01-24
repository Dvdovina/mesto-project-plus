import { NextFunction, Request, Response } from 'express';

export interface IError extends Error {
  statusCode: number,
  message: string
}

export const errorHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Внутренняя ошибка сервера' : message,
  });
  next();
};

