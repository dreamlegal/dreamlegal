

// "use client"
// import React from 'react'
// import VendorLeads from '@/components/VendorLeads'
// import { useAuth } from '@/context/authContext';

// const Page = () => {  // Changed from 'page' to 'Page'
//     const { vendorId, userType } = useAuth();
    
//     return (
//         <VendorLeads userId={vendorId}/>
//     )
// }

// export default Page  // Make sure to update the export as well
"use client"
import React from 'react'
import VendorLeads from '@/components/VendorLeads'
import { useAuth } from '@/context/authContext';

const Page = () => {
  const { vendorId, userType, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <VendorLeads userId={vendorId}/>
  )
}

export default Page