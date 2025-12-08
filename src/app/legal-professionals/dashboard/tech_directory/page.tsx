
"use client"
import React, { Suspense } from 'react'
import DirectoryPage from '../../_components/DirectoryPage'
import { useNewAuth } from '@/context/NewAuthContext';;

const Page = () => {
  const { userId, userType } = useNewAuth();
  console.log(userId, userType)
  
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <DirectoryPage />
    </Suspense>
  )
}

export default Page