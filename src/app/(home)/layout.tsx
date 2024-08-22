import type { Metadata } from "next";
import { ClarityCity } from "@/utils/customFont";
import "../../app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "DreamLegal",
  description: "Your only legal directory for Legal solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ClarityCity.variable} `}>
        <SessionProvider>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
