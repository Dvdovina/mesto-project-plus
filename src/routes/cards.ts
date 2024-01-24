import { Router } from 'express';
import {
  createCard, getCards, deleteCardById, unlikeCard, likeCard
} from '../controllers/cards';
import { validateCreateCard, validateDeleteCard, validateLikeCard } from '../utils/validation';

const cardRouter = Router();

cardRouter.get('/', getCards);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.delete('/:cardId', validateDeleteCard, deleteCardById);
cardRouter.put('/:cardId/likes', validateLikeCard, likeCard);
cardRouter.delete('/:cardId/likes', validateLikeCard, unlikeCard);

export default cardRouter;
