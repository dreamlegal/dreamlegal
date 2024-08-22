import { resend } from "@/lib/resend";
import VendorWelcome from "../../../../email/VendorWelcome";


export async function sendVendorWelcomeEmail(
  email: string,
  password: string
) {
  try {
    const subject = "Welcome to Dreamlegal!";
    const htmlContent = VendorWelcome({ email, password });

    await resend.emails.send({
      from: "email@dreamlegal.in",
      to: email,
      subject,
      react: htmlContent,
    });

    return { success: true, msg: "Welcome email sent" };
  } catch (error) {
    return { success: false, msg: error instanceof Error ? error.message : "An error occurred" };
  }
}
