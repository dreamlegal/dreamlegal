

import { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/pages/homePageComponents/Navbar";
import Footer from "@/components/Footer";
import { ClarityCity } from "@/utils/customFont";
import MainLayout from "@/components/MainLayout";
import { AuthProvider } from '@/context/AuthContext'
export const metadata: Metadata = {
  title: "DreamLegal",
  description: "Your only legal directory for Legal solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${ClarityCity.variable}`}>
        <SessionProvider>
        <AuthProvider>
        <MainLayout children={children}/>
        </AuthProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
