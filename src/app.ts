import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

const app = express();

const { PORT = 3000 } = process.env;
