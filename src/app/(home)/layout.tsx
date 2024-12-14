

// // import type { Metadata } from "next";
// // import { ClarityCity } from "@/utils/customFont";
// // import "../../app/globals.css";
// // import { Header } from "@/components/Header";
// // import { Footer } from "@/components/Footer";
// // import { SessionProvider } from "next-auth/react";
// // import { Toaster } from "@/components/ui/toaster";
// // import Navbar from "@/pages/homePageComponents/Navbar";

// // export const metadata: Metadata = {
// //   title: "DreamLegal",
// //   description: "Your only legal directory for Legal solutions",
// // };

// // export default function RootLayout({
// //   children,
// // }: Readonly<{
// //   children: React.ReactNode;
// // }>) {
// //   return (
// //     <html lang="en">
// //       <head>
// //         {/* Google Analytics Script */}
// //         <script
// //           async
// //           src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
// //         ></script>
// //         <script
// //           dangerouslySetInnerHTML={{
// //             __html: `
// //               window.dataLayer = window.dataLayer || [];
// //               function gtag(){dataLayer.push(arguments);}
// //               gtag('js', new Date());
// //               gtag('config', 'G-XXXXXXXXXX', {
// //                 page_path: window.location.pathname,
// //               });
// //             `,
// //           }}
// //         ></script>

// //         {/* Google Tag Manager Script (Head Section) */}
// //         <script
// //           dangerouslySetInnerHTML={{
// //             __html: `
// //               (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// //               new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// //               j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// //               'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// //               })(window,document,'script','dataLayer','GTM-XXXXXXX');
// //             `,
// //           }}
// //         ></script>
// //       </head>
// //       <body className={`${ClarityCity.variable} `}>
// //         {/* Google Tag Manager (No-JS Fallback) */}
// //         <noscript>
// //           <iframe
// //             src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
// //             height="0"
// //             width="0"
// //             style={{ display: "none", visibility: "hidden" }}
// //           ></iframe>
// //         </noscript>

// //         <SessionProvider>
// //           {/* <Header /> */}
// //           <Navbar />
// //           {children}
// //           <Footer />
// //           <Toaster />
// //         </SessionProvider>
// //       </body>
// //     </html>
// //   );
// // }

// import type { Metadata } from "next";
// import { ClarityCity } from "@/utils/customFont";
// import "../../../../globals.css";
// import { Header } from "@/components/Header";
// import { Footer } from "@/components/Footer";
// import { SessionProvider } from "next-auth/react";
// import { Toaster } from "@/components/ui/toaster";
// import Navbar from "@/pages/homePageComponents/Navbar";
// import { usePathname } from "next/navigation";

// export const metadata: Metadata = {
//   title: "DreamLegal",
//   description: "Your only legal directory for Legal solutions",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const pathname = usePathname();

//   // Conditionally render Navbar, excluding it for /workflow/report/[id]
//   const showNavbar = !pathname.startsWith('/workflow/report/');

//   return (
//     <html lang="en">
//       <head></head>
//       <body className={`${ClarityCity.variable} `}>
//         <SessionProvider>
//           {/* Conditionally render Navbar */}
//           {showNavbar && <Navbar />}
          
//           <Header />
//           {children}
//           <Footer />
//           <Toaster />
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { ClarityCity } from "@/utils/customFont";
// import "../../../globals.css";
 import "../../app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import ClientNavbar from "@/components/ClientNavbar";

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
      <head></head>
      <body className={`${ClarityCity.variable} `}>
        <SessionProvider>
          <ClientNavbar /> {/* Render ClientNavbar component here */}
          {/* <Header /> */}
          {children}
          <Footer />
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
