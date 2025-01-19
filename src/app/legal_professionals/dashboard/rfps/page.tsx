"use client"
import React from 'react'
import RfpPage from '../../_components/RfpPage'
import { useAuth } from '@/context/authContext';
const page = () => {
   const { userId, userType } = useAuth();
    console.log(userId, userType)
  return (
    <RfpPage userId={userId}/>
  )
}

export default page