import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { celebrate, Joi } from 'celebrate';

const app = express();

const { PORT = 3000 } = process.env;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(PORT);