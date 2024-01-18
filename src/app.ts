import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { celebrate, Joi } from 'celebrate';
import userRouter from 'routes/users';
import cardRouter from 'routes/cards';

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

const { PORT = 3000 } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRouter);
app.use(cardRouter);



app.listen(PORT, () => {
  console.log(`Server is active on port ${PORT}`);
});