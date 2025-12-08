// "use client"
// import React from 'react'
// import VendorRfps from '@/components/VendorRfps'
// const Page = () => {
//   return (
    
    
    
    
//     <VendorRfps  />
//   )
// }

// export default Page

// 5. VendorRfps Page
"use client"
import React from 'react'
import VendorRfps from '@/components/VendorRfps'
import { useNewAuth } from '@/context/NewAuthContext';;

const Page = () => {
  const { isLoading } = useNewAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <VendorRfps />
  )
}

export default Page
