import bcrypt from 'bcryptjs';
import dayjs from 'dayjs';
import { LogFactory } from '../../lib/logger.js';
import MailerConfig from '../../lib/mailer.js';
import sequelize from '../../lib/sequelize.js';
import Otp from '../models/otps.js';
import crypto from 'crypto';

class UserService{
    
    async generateAndSendOtp(userDetails, otpType){
        try{
            const otpCode = crypto.randomInt(100000, 999999).toString();
            const otpExpiration = sequelize.literal('CURRENT_TIMESTAMP + INTERVAL \'10 minutes\'');
            await Otp.create({
                otp_code: otpCode,
                otp_type: otpType,
                otp_expiration: otpExpiration,
                otp_target_id: userDetails.id
              });
            
              const mailerConfig = new MailerConfig();
              mailerConfig.sendOtpEmail(userDetails.email, otpCode);
              
              return true;
        }catch (error){
            LogFactory.getLogger().error('Error while sending otp', error);
            throw error;
        }
    }

    async verifyOtp(otpCode, userId){
        const otp = await Otp.findOne({
            where: {
                otp_target_id: userId,
                otp_type: 'reset_password',
            },
            order: [['created_at', 'DESC']],
        });

        try{
            if (otp && dayjs().isAfter(otp.otp_expiration)) {
                LogFactory.getLogger('OtpService').info('OTP is expired');
        
                return false;
              }
            if(otp){
                const isOtpMatched = bcrypt.compareSync(otpCode, otp.otp_code);
                if(isOtpMatched){
                    LogFactory.getLogger().info('Otp matched suucessfully for user',userId);
                    await otp.expireNow();
                }
                return isOtpMatched;
            }
        }catch(error){
            LogFactory.getLogger().error('Error while validating OTP', error);
            throw error;
        }
    }
}

export default UserService;