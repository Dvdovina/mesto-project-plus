import { Router } from "express";
import { createCard } from "controllers/cards";

const cardRouter = Router();

cardRouter.post('/cards', createCard);




export default cardRouter

