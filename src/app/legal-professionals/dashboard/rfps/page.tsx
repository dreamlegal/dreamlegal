"use client"
import React from 'react'
import RfpPage from '../../_components/RfpPage'
import { useNewAuth } from '@/context/NewAuthContext';;
// const page = () => {
//    const { userId, userType } = useNewAuth();
//     console.log(userId, userType)
//   return (
//     <RfpPage userId={userId}/>
//   )
// }

// export default page
const Page = () => {
  const { userId, userType } = useNewAuth();
  console.log(userId, userType)
  
  return (
   <RfpPage userId={userId}/>
  )
}

export default Page