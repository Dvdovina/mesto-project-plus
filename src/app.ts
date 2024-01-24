import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
// import { celebrate, Joi } from 'celebrate';
import router from './routes/index';
import { login, createUser } from './controllers/users';
import {auth} from './middlewares/auth'

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use(router);

const connect = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
  console.log('Подключились к базе данных'); // eslint-disable-line
  await app.listen(PORT);
  console.log('Сервер запущен на порту:', 3000); // eslint-disable-line
};

connect();
