"use client"
import { useState, useEffect } from "react";
import UserPage from "@/pages/UserPage";
// import Complete from "./_components/Complete";
import Loading from "@/components/Loading";
import ProfilePage from "../_components/ProfilePage";

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
    return <div>Error: {error}</div>;
  }

  if (data && data.success) {
    console.log(data)
    // return <div>hello ji</div>;
    return <ProfilePage data={data}  userId={params.userid} />
  }

  return <div>no no </div>;
}

// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Loading from "@/components/Loading";

// interface UserProfile {
//   success: boolean;
//   profile: any;
//   account: any;
// }

// const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-user?userId=${userId}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     const data: UserProfile = await response.json();

//     if (data.success) {
//       return data;
//     } else {
//       console.error("API response error:", data);
//       return null;
//     }
//   } catch (err) {
//     console.error("Fetch error:", err);
//     return null;
//   }
// };

// export default function Page({ params }: { params: { userid: string } }) {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState<UserProfile | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoaded, setIsLoaded] = useState(false); // Track if the API call is completed
//   const router = useRouter();

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const result = await fetchProfile(params.userid);

//         if (result && result.success) {
//           setData(result); // Valid user ID
//         } else {
//           setData(null); // Invalid user ID
//         }
//       } catch (err) {
//         setError("Failed to load data");
//       } finally {
//         setIsLoaded(true); // Mark as loaded after API call finishes
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [params.userid]);

//   useEffect(() => {
//     if (isLoaded && !data) {
//       // Redirect only after data is loaded and determined to be invalid
//       router.push("/auth/user/login");
//     }
//   }, [isLoaded, data, router]);

//   if (loading) {
//     return <Loading />;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (data) {
//     return <div>hello ji</div>; // Render "hello ji" for valid user ID
//   }

//   return null; // Render nothing during redirection
// }
