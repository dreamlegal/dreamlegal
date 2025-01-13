
import { redirect } from "next/navigation";

export default function VendorPage() {
  redirect("/auth/vendor/login"); // Redirect to vendor login page
}
