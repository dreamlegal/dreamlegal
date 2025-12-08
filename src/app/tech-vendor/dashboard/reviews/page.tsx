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
import { useNewAuth } from '@/context/NewAuthContext';;

const Page = () => {
  const { isLoading } = useNewAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <VendorReview />
  )
}

export default Page
