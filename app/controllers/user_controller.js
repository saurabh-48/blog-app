import { LogFactory } from '../../lib/logger.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import UserService from '../services/user_service.js';
import jwt from 'jsonwebtoken';

class UserController {

    async login(req, res, next){
        const {user_name, password} = req.body;
        const exitingUser = await User.findOne({
          where: {user_name}
        });
        if(!exitingUser){
          return res.status(404).json({
            message: 'User does not exist !'
          });
        }
        const isPasswordCorrect = bcrypt.compareSync(password, exitingUser.password);
        if(!isPasswordCorrect){
          return res.status(422).json({
            message: 'Incorrect password !!'
          });
        }
        const accessToken = jwt.sign({user_id: exitingUser.id}, process.env.TOKEN_SECRET, {
          expiresIn: '1h'
        });
        return res.status(200).json({
          message: 'Successfully logged in !!',
          access_token: accessToken
        });
    }

    async signUp(req, res, next){
        try{
            const {
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                gender,
                email,
                contact_number: contactNumber,
                birth_date: birthDate,
                user_name: userName,
                password,
              } = req.body;
              const exitingUser = await User.findOne({
                where: {email}
              });
              if(exitingUser){
                return res.status(400).json({
                  message: 'User already exists! Try Login'
                });
              }
              const isUserNameTaken = await User.findOne({
                where: {user_name: userName}
              });
              if(isUserNameTaken) {
                return res.status(422).json({
                  message: 'User name already taken'
                });
              }
              const hashedPassword = bcrypt.hashSync(password);
              const user = new User({
                first_name: firstName,
                middle_name: middleName,
                last_name: lastName,
                gender,
                email,
                contact_number: contactNumber,
                birth_date: new Date(birthDate),
                user_name: userName,
                password: hashedPassword,
              });
              await user.save();
              return res.status(201).json({
                message: 'User signUp successfully',
                user_name: userName,
                user_id: user.id,
              });

        } catch(error){
            LogFactory.getLogger().error('Error while signing up', error);
            return res.status(500).json({
                message: 'Something went wrong !!'
            });
        }
    }

    async requestResetPassword(req, res, next){
      try{
        const userId = req.user_id;
        if(!userId){
          return res.status(401).json({
              message: 'User not authenticated'
          });
      }
        const userService = new UserService();
        const user = await User.findOne({
          where: {id: userId}
        });
        if(!user){
          return res.status(400).json({
            message: 'User does not exist'
          })
        }
        const otpSent = await userService.generateAndSendOtp(user, 'reset_password');
        if(otpSent){
            return res.status(200).json({
            message: 'OTP sent successfully'
          });
        }

        res.status(422).json({
          message: 'Something went wrong'
        });
      }catch(error){
        LogFactory.getLogger().error('Error while requestResetPassword', error);
        return res.json(error);
      }
    }

    async verifyOtp(req, res, next){
      try{
        const userId = req.user_id;
        if(!userId){
          return res.status(401).json({
              message: 'User not authenticated'
          });
      }
        const userService = new UserService();
        const otpVerified = await userService.verifyOtp(req.body.otp, userId);
        if(otpVerified){
            return res.status(200).json({
            message: 'OTP verified successfully'
          });
        }

        return res.status(422).json({
          message: 'Otp value did not matched or otp is expired'
        })
      }catch(error){
        LogFactory.getLogger().error('Error while verifying Otp', error);
        return res.json(error);
      }
    }

    async updatePassword(req, res, next){
      try{
        const userId = req.user_id;
        if(!userId){
          return res.status(401).json({
              message: 'User not authenticated'
          });
      }
        const updatedPassword = req.body.password;
        const hashedPassword = bcrypt.hashSync(updatedPassword);
        const isUserUpdated = await User.update({
          password: hashedPassword
        },
        {
          where: {
            id: userId
          }
        });
        if(isUserUpdated[0] === 1){
          return res.status(200).json({
            message: 'Password updated successfully'
          });
        }
        return res.status(404).json({
          message: 'Something went wrong'
        });
      }catch(error){
        LogFactory.getLogger().error('Error while updating password', error);
        return res.json(error);
      }
    }
}
export default UserController;