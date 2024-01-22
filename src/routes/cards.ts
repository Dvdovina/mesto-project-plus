import { Router } from 'express';
import {
  createCard, getCards, deleteCardById, unlikeCard, likeCard
} from '../controllers/cards';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCardById);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', unlikeCard);

export default cardRouter;
