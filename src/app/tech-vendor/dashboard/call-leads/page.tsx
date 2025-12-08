

// "use client"
// import React from 'react'
// import VendorLeads from '@/components/VendorLeads'
// import { useNewAuth } from '@/context/NewAuthContext';;

// const Page = () => {  // Changed from 'page' to 'Page'
//     const { vendorId, userType } = useNewAuth();
    
//     return (
//         <VendorLeads userId={vendorId}/>
//     )
// }

// export default Page  // Make sure to update the export as well
"use client"
import React from 'react'
import VendorLeads from '@/components/VendorLeads'
import { useNewAuth } from '@/context/NewAuthContext';;

const Page = () => {
  const { vendorId, userType, isLoading } = useNewAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <VendorLeads userId={vendorId}/>
  )
}

export default Page