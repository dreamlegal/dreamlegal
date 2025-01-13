"use client"
import VendorProfile from '@/components/VendorProfile';
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext';

const page = () => {
    
    const [verified, setVerified] = useState(true);
    const { vendorId, userType } = useAuth();
      const [profile, setProfile] = useState(null);
      
      // const vendorId = localStorage.getItem("vendorId") || '';
    
    
      useEffect(() => {
        const fetchData = async () => {
          const storedVendorId = vendorId || null;
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