"use client"
import { useState, useEffect } from "react";
import UserPage from "@/pages/UserPage";
import Complete from "./_components/Complete";
import Loading from "@/components/Loading";

interface UserProfile {
  success: boolean;
  profile: any;
  account: any;
}

const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data: UserProfile = await response.json();
    
    if (data.success) {
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

export default function Page({ params }: { params: { userid: string } }) {
  const [data, setData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchProfile(params.userid);
        setData(result);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [params.userid]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    // Optionally handle error display here
    return <div>Error: {error}</div>;
  }

  if (data && data.success) {
    return <UserPage data={data} />;
  }

  return <Complete />;
}
