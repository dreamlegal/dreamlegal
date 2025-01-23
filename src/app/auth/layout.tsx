

import "../../app/globals.css";
import Navbar from "@/components/Navbar"

import Footer from  "@/components/Footer"
import { Sidebar } from "./_components/Sidebar"; // Adjust path as needed
import { ClarityCity } from "@/utils/customFont";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${ClarityCity.variable} `}>
        <Navbar />
      {children}
      <Footer />
      </body>
    </html>
  );
}
