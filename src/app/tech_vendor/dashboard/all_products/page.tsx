// "use client"
// import React from 'react'
// import AllProducts from '@/components/ui/AllProducts'
// const Page = () => {
//   return (
//     <>
//     <AllProducts  />
    
//     </>
//   )
// }

// export default Page
"use client"
import React from 'react'
import AllProducts from '@/components/ui/AllProducts'
import { useAuth } from '@/context/authContext' 

const Page = () => {
  const { isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
    <>
      <AllProducts />
    </>
  )
}

export default Page