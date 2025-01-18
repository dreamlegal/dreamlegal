

// import type { Metadata } from "next";
// import { ClarityCity } from "@/utils/customFont";
// // import "../../../globals.css";
//  import "../../app/globals.css";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
// import { SessionProvider } from "next-auth/react";
// import { Toaster } from "@/components/ui/toaster";
// import ClientNavbar from "@/components/ClientNavbar";

// export const metadata: Metadata = {
//   title: "DreamLegal",
//   description: "Your only legal directory for Legal solutions",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <head></head>
//       <body className={`${ClarityCity.variable} `}>
//         <SessionProvider>
//           <ClientNavbar /> {/* Render ClientNavbar component here */}
//           {/* <Header /> */}
//           {children}
//           <Footer />
//           <Toaster />
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }



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

