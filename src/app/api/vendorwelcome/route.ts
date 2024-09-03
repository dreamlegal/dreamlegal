// // pages/api/send-email.js
// import nodemailer from "nodemailer";

// import { render } from "@react-email/components";
// import VerificationEmail from "../../../../email/VerificationEmail";
// import WelcomeEmail from "../../../../email/WelcomeEmail";
// import VendorWelcome from "../../../../email/VendorWelcome";

// export async function POST(request: Request) {
//   const { name, email } = await request.json();

//   const transporter = nodemailer.createTransport({
//     service: "gmail", // You can use other services
//     auth: {
//       user: "dreamlegal31@gmail.com", // Your email
//       pass: "opsw vmxy qtoj lhqm", // Your email password
//     },
//   });

//   const emailHtml = render(VendorWelcome({ name }));

//   const mailOptions = {
//     from: "dreamlegal31@gmail.com",
//     to: email,
//     subject: "Welcome",
//     html: emailHtml,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     return Response.json({ message: "Email sent successfully" });
//   } catch (error) {
//     return Response.json({ message: "Error sending email" });
//   }
// }

import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import { render } from "@react-email/components";
import VendorWelcome from "../../../../email/VendorWelcome";

interface RequestBody {
  name: string;
  email: string;
}

export async function POST(request: Request): Promise<Response> {
  const { name, email }: RequestBody = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use other services
    auth: {
      user: "dreamlegal31@gmail.com", // Your email
      pass: "opsw vmxy qtoj lhqm", // Your email password
    },
  });

  const emailHtml = render(VendorWelcome({ name }));

  // Construct the path to the PDF file
  const pdfFilePath = path.join(process.cwd(), "public", "Vendor_Guide_on_DreamLegal.pdf");

  // Read the PDF file as a buffer
  const pdfContent = fs.readFileSync(pdfFilePath);

  const mailOptions: nodemailer.SendMailOptions = {
    from: "dreamlegal31@gmail.com",
    to: email,
    subject: "Welcome",
    html: emailHtml,
    attachments: [
      {
        filename: "Vendor_Guide_on_DreamLegal.pdf",
        content: pdfContent,
        encoding: "base64", // Optional, usually inferred from content
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error sending email", error: error instanceof Error ? error.message : "Unknown error" }), { status: 500 });
  }
}

