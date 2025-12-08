
"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { useNewAuth } from '@/context/NewAuthContext';;
import ProfilePage from '../../_components/ProfilePage';

interface UserProfile {
    success: boolean;
    profile: any;
    account: any;
}

const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    if (!userId) return null;  // Add early return if no userId
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data: UserProfile = await response.json();
        
        if (data.success) {
            console.log(data)
            return data;
        } else {
            console.error("API response error:", data);
            return null;
        }
    } catch (err) {
        console.error("Fetch error:", err);
        return null;
    }
};

const Page = () => {
    const { userId, userType } = useNewAuth();
    const [data, setData] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    console.log(userId, userType)
    useEffect(() => {
        // Only fetch if userId exists
        if (!userId) {
            setLoading(false);
            return;
        }

        const loadData = async () => {
            try {
                const result = await fetchProfile(userId);
                setData(result);
            } catch (err) {
                setError("Failed to load data");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [userId]);

    // Show loading state while waiting for userId and data
    if (loading) {
        return <div className="p-6">Loading...</div>;
    }

    // Show message if no userId is available
    if (!userId) {
        return <div className="p-6">Please log in to view profile</div>;
    }

    // Show error state
    if (error) {
        return <div className="p-6 text-red-500">{error}</div>;
    }

    return (
        <Suspense fallback={<div className="p-6">Loading...</div>}>
            <ProfilePage data={data} userId={userId} />
        </Suspense>
    );
};

export default Page;