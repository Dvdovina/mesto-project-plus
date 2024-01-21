import { Router } from "express";
import { createUser, getUsers, getUserById } from "../controllers/users";

const userRouter = Router();


userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.post('/users', createUser);





export default userRouter

