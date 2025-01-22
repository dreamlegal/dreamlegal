

import { Metadata } from "next";
import "../../globals.css";
import { ClarityCity } from "@/utils/customFont";
import LegalProfessionalsLayout from "../_components/LegalProfessionalsLayout"

// import LegalProfessionalsLayout from "../_components/LegalProfessionalsLayout"
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
      <body className={`${ClarityCity.variable} min-h-screen bg-gray-50`}>
        <LegalProfessionalsLayout>
          {children}
        </LegalProfessionalsLayout>
      </body>
    </html>
  );
}
