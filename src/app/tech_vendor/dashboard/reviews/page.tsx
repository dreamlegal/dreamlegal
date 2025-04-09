// "use client"
// import React from 'react'
// import VendorReview from '@/components/VendorReview'
// const Page = () => {
//   return (
// <VendorReview />
//   )
// }

// export default Page

// 4. VendorReview Page
"use client"
import React from 'react'
import VendorReview from '@/components/VendorReview'
import { useAuth } from '@/context/authContext';

const Page = () => {
  const { isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <VendorReview />
  )
}

export default Page
