// // components/MainLayout.tsx

// "use client"; // Mark this as a client component

// import { usePathname } from "next/navigation";
// import Navbar from "@/pages/homePageComponents/Navbar";
// import Footer from "./Footer";

// const MainLayout = ({ children }: { children: React.ReactNode }) => {
//   const pathname = usePathname();  // Get the current route

//   // Determine if we should show Navbar and Footer based on the pathname
//   const showNavbarAndFooter = !pathname.startsWith("/tech_vendor/dashboard") && !pathname.startsWith("/web-admin");

//   return (
//     <div>
//       {showNavbarAndFooter && <Navbar />}  {/* Conditionally render Navbar */}
//       {children}
//       {showNavbarAndFooter && <Footer />}  {/* Conditionally render Footer */}
//     </div>
//   );
// };

// export default MainLayout;

"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/pages/homePageComponents/Navbar";
import Footer from "./Footer";
import "../app/globals.css"
interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname();

  const showNavbarAndFooter = !pathname.startsWith("/tech_vendor/dashboard") && 
                             !pathname.startsWith("/web-admin");

  return (
    <main>
      {showNavbarAndFooter && <Navbar />}
      {children}
      {showNavbarAndFooter && <Footer />}
    </main>
  );
};

export default MainLayout;