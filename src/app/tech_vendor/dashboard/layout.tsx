// // app/vendor/layout.tsx
// import React from 'react';
// // import VendorLayout from './_components/VendorLayout';
// import VendorLayout from '../_components/VendorLayout';
// import { headers } from 'next/headers';

// export default function VendorDashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // This ensures the layout doesn't inherit parent layouts
//   return <VendorLayout>{children}</VendorLayout>;
// }

// // To completely disable parent layout inheritance, add:
// export const metadata = {
//   // Your metadata configuration
// };



import { Metadata } from "next";
import "../../globals.css";

import { ClarityCity } from "@/utils/customFont";
import VendorLayout from '../_components/VendorLayout';
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
      <VendorLayout>{children}</VendorLayout>
      </body>
    </html>
  );
}
