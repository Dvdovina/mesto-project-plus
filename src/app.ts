import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate'
import router from './routes/index';
import { login, createUser } from './controllers/users';
import { auth } from './middlewares/auth'
import { requestLogger, errorLogger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import { validateCreateUser, validateLogin } from './utils/validation';

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);

app.use(auth);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler)

const connect = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
  console.log('Подключились к базе данных'); // eslint-disable-line
  await app.listen(PORT);
  console.log('Сервер запущен на порту:', 3000); // eslint-disable-line
};

connect();
