"use client"
import React, { Suspense } from 'react'
import WorkFlowReportsPage from '../../_components/WorkFlowReportsPage'
import { useAuth } from '@/context/authContext';

const Page = () => {
  const { userId, userType } = useAuth();
  console.log(userId, userType)
  // const userId= "cm4r50izk0000uet8smvf7s7j"
  
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <WorkFlowReportsPage userId={userId} />
    </Suspense>
  )
}

export default Page