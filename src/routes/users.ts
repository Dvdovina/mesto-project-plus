import { Router } from 'express';
import {
  getUsers, getUserById, updateUser, updateUserAvatar, getUserMe
} from '../controllers/users';
import { validateGetUserById, validateUpdateUser, validateUpdateUserAvatar } from '../utils/validation';

const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/me', getUserMe);
userRouter.get('/:userId', validateGetUserById, getUserById);
userRouter.patch('/me', validateUpdateUser, updateUser);
userRouter.patch('/me/avatar', validateUpdateUserAvatar, updateUserAvatar);

export default userRouter;
