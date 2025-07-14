
'use client'

import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "./Footer"
import { useAuth } from '@/context/authContext'
import "@/app/globals.css"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const pathname = usePathname()
  const { isLoading } = useAuth()

  const showNavbarAndFooter = !pathname?.startsWith("/tech_vendor/dashboard") && 
                             !pathname?.startsWith("/web-admin") && 
                             !pathname?.startsWith("/admin") && 
                             !pathname?.startsWith("/workflow") &&
                             !pathname?.startsWith("/market-intelligence") 
                            //  &&
                            //  !pathname?.startsWith("/product")

  // Add a loading state wrapper
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {showNavbarAndFooter && <Navbar />}
      <div className="flex-1">{children}</div>
      {showNavbarAndFooter && <Footer />}
    </div>
  )
}

export default MainLayout