
"use client"
import React from 'react'
import AllProducts from '../../_components/AllProducts'
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