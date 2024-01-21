import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { celebrate, Joi } from 'celebrate';
import userRouter from './routes/users';
import cardRouter from './routes/cards';

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(cardRouter);


const connect = async() => {
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  console.log("Подключились к базе данных")
  await app.listen(PORT)
  console.log("Сервер запущен на порту:", 3000)
}

connect();