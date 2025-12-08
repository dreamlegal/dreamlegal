
"use client"
import React from 'react'
import AllProducts from '../../_components/AllProducts'
import { useNewAuth } from '@/context/NewAuthContext'; 

const Page = () => {
  const { isLoading } = useNewAuth();
  
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