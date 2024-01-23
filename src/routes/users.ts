import { Router } from 'express';
import {
  getUsers, getUserById, updateUser, updateUserAvatar, getUserMe
} from '../controllers/users';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getUserMe);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateUserAvatar);

export default userRouter;
