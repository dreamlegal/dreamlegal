
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/pages/homePageComponents/Navbar";
import Footer from "./Footer";
import "../app/globals.css"
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();

  const showNavbarAndFooter = !pathname.startsWith("/tech_vendor/dashboard") && 
                             !pathname.startsWith("/web-admin");

  return (
    <main>
      {showNavbarAndFooter && <Navbar />}
      {children}
      {showNavbarAndFooter && <Footer />}
    </main>
  );
};

export default MainLayout;