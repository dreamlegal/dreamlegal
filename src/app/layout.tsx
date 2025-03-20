
// // import { Metadata } from "next"
// // import "@/app/globals.css"
// // import { Toaster } from "@/components/ui/toaster"
// // import { ClarityCity } from "@/utils/customFont"
// // import MainLayout from "@/components/MainLayout"
// // import { Providers } from "@/app/providers"

// // export const metadata: Metadata = {
// //   title: "DreamLegal",
// //   description: "Your only legal directory for Legal solutions",
// // }

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode
// // }) {
// //   return (
// //     <html lang="en">
// //       <body className={ClarityCity.variable}>
// //         <Providers>
// //           <MainLayout>
// //             {children}
// //           </MainLayout>
// //           <Toaster />
// //         </Providers>
// //       </body>
// //     </html>
// //   )
// // }
// import Script from "next/script"
// import "@/app/globals.css"
// import { Toaster } from "@/components/ui/toaster"
// import { ClarityCity } from "@/utils/customFont"
// import MainLayout from "@/components/MainLayout"
// import { Providers } from "@/app/providers"
// import { Metadata } from "next"

// export const metadata: Metadata = {
//   title: "DreamLegal",
//   description: "Your only legal directory for Legal solutions",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
     
//       <body className={ClarityCity.variable}>
//         {/* Termly Cookie Consent Script */}
//         <Script
//           id="termly-cookie-banner"
//           strategy="afterInteractive"
//           src="https://app.termly.io/embed.min.js"
//           data-auto-block="on"
//           data-website-uuid="6fdf5dcc-8a7a-4b57-b5fa-61a128e331d7" // Your actual UUID
//         />
        
//         <Providers>
//           <MainLayout>
//             {children}
//           </MainLayout>
//           <Toaster />
//         </Providers>
//       </body>
//     </html>
//   )
// }

import Script from "next/script"
import "@/app/globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ClarityCity } from "@/utils/customFont"
import MainLayout from "@/components/MainLayout"
import { Providers } from "@/app/providers"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "DreamLegal",
  description: "Your only legal directory for Legal solutions",
  // icons: "/favicon.png", 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Termly Cookie Consent Script */}
        <Script
          id="termly-cookie-banner"
          strategy="afterInteractive"
          src="https://app.termly.io/embed.min.js"
          data-website-uuid="6fdf5dcc-8a7a-4b57-b5fa-61a128e331d7"
        />
      </head>
      <body className={ClarityCity.variable}>
        <Providers>
          <MainLayout>
            {children}
          </MainLayout>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
