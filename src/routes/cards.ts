import { Router } from "express";
import { createCard, getCards, deleteCardById, unlikeCard, likeCard } from "../controllers/cards";

const cardRouter = Router();

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:cardId', deleteCardById);
cardRouter.put('/cards/:cardId/likes', likeCard);
cardRouter.delete('/cards/:cardId/likes', unlikeCard);


export default cardRouter


