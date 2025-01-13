'use client'; // Mark this component as client-side

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ClientNavbar() {
  const pathname = usePathname();

  // Conditionally render Navbar, excluding it for /workflow/report/[id]
  if (pathname.startsWith('/workflow/report/')) {
    return null; // Do not render Navbar for this route
  }

  return <Navbar />;
}
