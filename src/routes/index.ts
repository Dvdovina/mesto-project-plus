import {
  Router, NextFunction, Request, Response
} from 'express';
import userRouter from './users';
import cardRouter from './cards';
import NotFoundError from '../utils/errors';

const router = Router();

router.use('/users', userRouter);
router.use('/cards', cardRouter);

// Ошибка 404
router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Страница не найдена'));
});

export default router;
