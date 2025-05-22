import nodemailer from 'nodemailer';
import { LogFactory } from './logger.js';
class MailerConfig {

    createTransport(){
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }

    async sendOtpEmail(emailId, otpCode){
        const mailOptions = {
            from: process.env.EMAIL_ID,
            to: emailId,
            subject: 'Reset your password',
            text: `Your OTP is ${otpCode}`
        }
        const transporter = this.createTransport();
        try{
            transporter.sendMail(mailOptions);
            LogFactory.getLogger().info('Mail sent successfully !');
        }catch (error){
            LogFactory.getLogger().error('Error while sending otp', error);
            throw new error('Error while sending otp', error);
        }
    }
}

export default MailerConfig;