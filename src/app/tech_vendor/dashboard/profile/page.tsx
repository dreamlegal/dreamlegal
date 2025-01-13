"use client"
import VendorProfile from '@/components/VendorProfile';
import React, { useEffect, useState } from 'react'

const page = () => {
    
    const [verified, setVerified] = useState(true);
   
      const [profile, setProfile] = useState(null);
      
      const vendorId = localStorage.getItem("vendorId") || '';
    
    
      useEffect(() => {
        const fetchData = async () => {
          const storedVendorId = vendorId || localStorage.getItem("vendorId");
          if (storedVendorId) {
            try {
              const profileResponse = await fetch(`/api/company-info?id=${storedVendorId}`);
              const profileData = await profileResponse.json();
              setProfile(profileData.profile);
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        };
    
        fetchData();
      }, [vendorId]);
  return (
   <>
   <VendorProfile verified={verified} getProfile={profile} />
   </>
  )
}

export default page