
import { Resend } from "resend";
import VerificationEmail from "../../../../email/VerificationEmail";
const resend = new Resend('re_KB831gFC_8zktRRdHqYocpgoJASgYS3YP');

export async function sendVerificationEmail(
  email: string,
  
  otp: string
) {
  try {
    await resend.emails.send({
      from: "email@dreamlegal.in",
      to: email,
      subject: "Dreamlegal Verification Code",
      react: VerificationEmail({  otp }),
    });
    return { success: true, msg: "Email sent" };
  } catch (error) {
    return { success: false, msg: error };
  }
}
