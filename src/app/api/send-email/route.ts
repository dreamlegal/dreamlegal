// pages/api/send-email.js
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    const { name, email, phone, organization, message } = await request.json();
  

    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services
      auth: {
        user: "dreamlegal31@gmail.com", // Your email
        pass: "opsw vmxy qtoj lhqm", // Your email password
      },
    });

    const mailOptions = {
      from: email,
      to: 'contact@dreamlegal.in',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nOrganization: ${organization}\nMessage: ${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
     return Response.json({ message: 'Email sent successfully' });
    } catch (error) {
      return Response.json({ message: 'Error sending email' });
    }
  } 
