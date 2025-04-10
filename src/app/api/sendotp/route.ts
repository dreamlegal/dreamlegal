// pages/api/send-email.js
import nodemailer from 'nodemailer';

import { render } from '@react-email/components';
import VerificationEmail from '../../../../email/VerificationEmail';


export async function POST(request: Request) {
    const { name, email,otp } = await request.json();
  

    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services
      auth: {
        user: "dreamlegal31@gmail.com", // Your email
        pass: "opsw vmxy qtoj lhqm", // Your email password
      },
    });

    const emailHtml = render(VerificationEmail({ otp }));

    const mailOptions = {
      from: "dreamlegal31@gmail.com",
      to: email,
      subject: 'OTP Verification',
      html: emailHtml
    };

    try {
      await transporter.sendMail(mailOptions);
     return Response.json({ message: 'Email sent successfully' });
    } catch (error) {
      return Response.json({ message: 'Error sending email' });
    }
  } 
