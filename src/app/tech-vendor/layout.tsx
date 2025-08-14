

import { Metadata } from "next";
import { ClarityCity } from "@/utils/customFont";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/app/globals.css"
export const metadata: Metadata = {
  title: "Tech  Vendor",
  description: "Welcome to the Tech Vendor section.",
};

export default function TechVendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${ClarityCity.variable}`}>
      {/* <Navbar /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
}

