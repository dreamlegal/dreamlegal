
import { redirect } from "next/navigation";

export default function UserPage() {
  redirect("/auth/user/login"); // Redirect to user login page
}
