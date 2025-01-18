
// // import { Metadata } from "next";
// // import "../../globals.css";

// // import { ClarityCity } from "@/utils/customFont";
// // // import Sidebar from "../_components/Sidebar";
// // import Sidebar from "../_components/Sidebar";
// // export const metadata: Metadata = {
// //   title: "DreamLegal",
// //   description: "Your only legal directory for Legal solutions",
// // };

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <html lang="en">
// //       <body className={`${ClarityCity.variable} flex min-h-screen bg-gray-50`}>
// //               {/* Sidebar */}
// //               <Sidebar />
      
// //               {/* Main Content Area */}

// //               <div className="flex-1 md:pl-96 p-6 mt-10 md:mt-0">
                            
// //                 {children}
                
// //                 </div>
// //       </body>
// //     </html>
// //   );
// // }


import { Metadata } from "next";
import "../../globals.css";
import { ClarityCity } from "@/utils/customFont";
import LegalProfessionalsLayout from "../_components/LegalProfessionalsLayout"

// import LegalProfessionalsLayout from "../_components/LegalProfessionalsLayout"
export const metadata: Metadata = {
  title: "DreamLegal",
  description: "Your only legal directory for Legal solutions",
};

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${ClarityCity.variable} flex min-h-screen bg-gray-50`}>
//         <LegalProfessionalsLayout>
//           {children}
//         </LegalProfessionalsLayout>
//       </body>
//     </html>
//   );
// }
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