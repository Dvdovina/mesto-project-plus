import { Router } from "express";
import { createCard, getCards, deleteCardById } from "../controllers/cards";

const cardRouter = Router();

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', deleteCardById);



export default cardRouter


