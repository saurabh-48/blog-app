import express from 'express';
import UserController from '../controllers/user_controller.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.route('/login').get(userController.login);

export default userRouter;