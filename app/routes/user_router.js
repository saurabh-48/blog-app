import express from 'express';
import UserController from '../controllers/user_controller.js';

const userRouter = express.Router();
const userController = new UserController();

userRouter.route('/login').post(userController.login);
userRouter.route('/signup').post(userController.signUp);
userRouter.route('/reset-password').post(userController.requestResetPassword);
userRouter.route('/verify-otp').post(userController.verifyOtp);

export default userRouter;