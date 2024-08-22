import { resend } from "@/lib/resend";
import WelcomeEmail from "../../../../email/WelcomeEmail";

export async function sendWelcomeEmail(
  email: string,
  name: string
) {
  try {
    await resend.emails.send({
      from: "email@dreamlegal.in",
      to: email,
      subject: "Welcome to Dreamlegal!",
      react: WelcomeEmail({ name }),
    });
    return { success: true, msg: "Welcome email sent" };
  } catch (error) {
    return { success: false, msg: error || "An error occurred" };
  }
}
