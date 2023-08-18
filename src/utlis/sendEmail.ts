import nodemailer from 'nodemailer';
import Token from '@/models/tokenModel';

import bcrypt from 'bcryptjs';

interface EmailProps {
  email: string;
  emailType: string;
  userId: string;
}

interface EmailOption {
  from: string;
  to: string;
  subject?: string;
  html?: string;
  test?: string;
}

// send Email use nodemailer
export const sendEmail = async ({ email, emailType, userId }: EmailProps) => {
  try {
    const token = await bcrypt.hash(userId, 10);

    const newToken = new Token({
      userId,
      token,
      emailType,
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.forwardemail.net',
      port: 465,
      secure: true,
      auth: {
        user: process.env.auth_email,
        pass: process.env.auth_password,
      },
    });

    const mailOption: EmailOption = {
      from: process.env.auth_email!,
      to: email,
    };

    // verifying the account
    // 1- backend generate the token and send it to mail
    //2- click the link in mail and go to frontend
    //3- frontend  send token to backend to make isEmailVerified = true

    if (emailType === 'emailVerification') {
      mailOption.subject = 'Email Verification';
      mailOption.html = `
            <h1>Click on the link below to verify your email </h1>
            <a href=${process.env.domain!}/verifyemail?token=${token}>Verify Email </a>
            `;
    } else {
      mailOption.subject = 'Reset Password';
      mailOption.html = `
            <h1>Click on the link below to reset your email </h1>
            <a href=${process.env.domain!}/resetpassword?token=${token}>Reset Password </a>
            `;
    }
    const mailRes = await transporter.sendMail(mailOption);
    return mailRes;
  } catch (e: any) {
    throw new Error(e.message);
  }
};
