// "use client"
// import FeatureAnalysisDashboard from '@/components/feature_validation'
// import React from 'react'

// const page = () => {
//   return (
//    <FeatureAnalysisDashboard />
//   )
// }

// export default page

// 2. FeatureAnalysisDashboard Page
"use client"
import FeatureAnalysisDashboard from '@/components/feature_validation'
import React from 'react'
import { useNewAuth } from '@/context/NewAuthContext';;

const Page = () => {
  const { isLoading } = useNewAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  return (
   <FeatureAnalysisDashboard />
  )
}

export default Page
