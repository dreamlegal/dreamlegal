// import React from 'react'
// import VendorProposalGenerator from  "@/components/VendorProposalGenerator"
// const page = () => {
//   return (
//     <VendorProposalGenerator />
//   )
// }

// export default page

// 1. VendorProposalGenerator Page
"use client"
import React from 'react'
import VendorProposalGenerator from "@/components/VendorProposalGenerator"
import { useNewAuth } from '@/context/NewAuthContext';;

const Page = () => {
  const { isLoading } = useNewAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <VendorProposalGenerator />
  )
}

export default Page
