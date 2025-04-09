

// "use client"
// import VendorProfile from '@/components/VendorProfile';
// import React, { useEffect, useState } from 'react'
// import { useAuth } from '@/context/authContext';

// const Page = () => {  // Changed from 'page' to 'Page'
//     const [verified, setVerified] = useState(true);
//     const { vendorId, userType } = useAuth();
//     const [profile, setProfile] = useState(null);
    
//     useEffect(() => {
//         const fetchData = async () => {
//             const storedVendorId = vendorId || null;
//             if (storedVendorId) {
//                 try {
//                     const profileResponse = await fetch(`/api/company-info?id=${storedVendorId}`);
//                     const profileData = await profileResponse.json();
//                     setProfile(profileData.profile);
//                 } catch (error) {
//                     console.error("Error fetching data:", error);
//                 }
//             }
//         };
    
//         fetchData();
//     }, [vendorId]);

//     return (
//         <>
//             <VendorProfile verified={verified} getProfile={profile} />
//         </>
//     )
// }

// export default Page  // Make sure to update the export as well

// 3. VendorProfile Page
"use client"
import VendorProfile from '@/components/VendorProfile';
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext';

const Page = () => {
    const [verified, setVerified] = useState(true);
    const { vendorId, userType, isLoading } = useAuth();
    const [profile, setProfile] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            if (!vendorId) return;
            
            setProfileLoading(true);
            try {
                const profileResponse = await fetch(`/api/company-info?id=${vendorId}`);
                const profileData = await profileResponse.json();
                setProfile(profileData.profile);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setProfileLoading(false);
            }
        };
    
        if (vendorId) {
            fetchData();
        }
    }, [vendorId]);

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <>
            {profileLoading ? (
                <div className="flex items-center justify-center min-h-screen">Loading profile data...</div>
            ) : (
                <VendorProfile verified={verified} getProfile={profile} />
            )}
        </>
    )
}

export default Page
