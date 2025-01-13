
// // "use client";

// // import { usePathname } from "next/navigation";
// // import Navbar from "@/pages/homePageComponents/Navbar";
// // import Footer from "./Footer";
// // import "../app/globals.css"
// // interface MainLayoutProps {
// //   children: React.ReactNode;
// // }

// // const MainLayout = ({ children }: MainLayoutProps) => {
// //   const pathname = usePathname();

// //   const showNavbarAndFooter = !pathname.startsWith("/tech_vendor/dashboard") && 
// //                              !pathname.startsWith("/web-admin");

// //   return (
// //     <main>
// //       {showNavbarAndFooter && <Navbar />}
// //       {children}
// //       {showNavbarAndFooter && <Footer />}
// //     </main>
// //   );
// // };

// // export default MainLayout;
// 'use client'

// import { usePathname } from "next/navigation"
// import Navbar from "@/pages/homePageComponents/Navbar"
// import Footer from "./Footer"
// import "../app/globals.css"

// interface MainLayoutProps {
//   children: React.ReactNode
// }

// const MainLayout = ({ children }: MainLayoutProps) => {
//   const pathname = usePathname()

//   // URLs where we don't want to show navbar and footer
//   const showNavbarAndFooter = !pathname.startsWith("/tech_vendor/dashboard") && 
//                              !pathname.startsWith("/web-admin")

//   return (
//     <div className="flex min-h-screen flex-col">
//       {showNavbarAndFooter && <Navbar />}
//       <main className="flex-1">{children}</main>
//       {showNavbarAndFooter && <Footer />}
//     </div>
//   )
// }

// export default MainLayout

'use client'

import { usePathname } from "next/navigation"
import Navbar from "@/pages/homePageComponents/Navbar"
import Footer from "./Footer"
import { useAuth } from '@/context/authContext'

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname()
  const { isLoading } = useAuth()

  const showNavbarAndFooter = !pathname.startsWith("/tech_vendor/dashboard") && 
                             !pathname.startsWith("/web-admin")

  if (isLoading) {
    return <div className="flex min-h-screen flex-col">{children}</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      {showNavbarAndFooter && <Navbar />}
      <main className="flex-1">{children}</main>
      {showNavbarAndFooter && <Footer />}
    </div>
  )
}

export default MainLayout