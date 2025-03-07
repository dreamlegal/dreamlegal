
import { Metadata } from "next"
import "@/app/globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ClarityCity } from "@/utils/customFont"
import MainLayout from "@/components/MainLayout"
import { Providers } from "@/app/providers"
import Navbar from "../community/_components/Navbar"
export const metadata: Metadata = {
  title: "DreamLegal",
  description: "Your only legal directory for Legal solutions",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ClarityCity.variable}>
        <Providers>
            <Navbar />
          
            {children}

         
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}


// import { Metadata } from "next"
// import "@/app/globals.css"
// import { Toaster } from "@/components/ui/toaster"
// import { ClarityCity } from "@/utils/customFont"
// import MainLayout from "@/components/MainLayout"
// import { Providers } from "@/app/providers"

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