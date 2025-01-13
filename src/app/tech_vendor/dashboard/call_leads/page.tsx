"use client"
import React from 'react'
import VendorLeads from '@/components/VendorLeads'
import { useAuth } from '@/context/authContext';
const page = () => {
    // const vendorId = localStorage.getItem("vendorId") || '';
    const { vendorId, userType } = useAuth();
    
  return (
    <VendorLeads userId={vendorId}/>
  )
}

export default page