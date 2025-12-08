// // // "use client";
// // // import { useSession } from "next-auth/react";
// // // import { useRouter } from "next/navigation";
// // // import React, { useEffect } from "react";

// // // const CheckPage = () => {
// // //   const router = useRouter();
// // //   const { data: session, status } = useSession();
// // //   const userEmail = session?.user?.email;

// // //   useEffect(() => {
// // //     const fetchUser = async () => {
// // //       if (userEmail) {
// // //         try {
// // //           const response = await fetch("/api/google-user", {
// // //             method: "POST",
// // //             headers: {
// // //               "Content-Type": "application/json",
// // //             },
// // //             body: JSON.stringify({ email: userEmail }),
// // //           });
// // //           const data = await response.json();
// // //           if (data.success && data.user  && typeof window !== "undefined" ) {
// // //             localStorage.setItem("userId", data.user.id);
// // //             localStorage.setItem("userEmail", data.user.email);

// // //             router.push(`/user/${data.user.id}/complete`);
// // //           } else {
// // //             // Handle user not found scenario
// // //             router.push("/error");
// // //           }
// // //         } catch (error) {
// // //           console.error("Error fetching user:", error);
// // //           router.push("/error");
// // //         }
// // //       }
// // //     };

// // //     fetchUser();
// // //   }, [userEmail, router]);

// // //   return <div>Loading...</div>;
// // // };

// // // export default CheckPage;
// // "use client";
// // export const dynamic = 'force-dynamic';

// // import { useSession } from "next-auth/react";
// // import { useRouter } from "next/navigation";
// // import React, { useEffect } from "react";

// // const CheckPage = () => {
// //   const router = useRouter();
// //   const { data: session, status } = useSession();
// //   const userEmail = session?.user?.email;

// //   useEffect(() => {
// //     const fetchUser = async () => {
// //       if (userEmail) {
// //         try {
// //           const response = await fetch("/api/google-user", {
// //             method: "POST",
// //             headers: {
// //               "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({ email: userEmail }),
// //           });
// //           const data = await response.json();
// //           if (data.success && data.user  && typeof window !== "undefined" ) {
// //             localStorage.setItem("userId", data.user.id);
// //             localStorage.setItem("userEmail", data.user.email);

// //             router.push(`/user/${data.user.id}/complete`);
// //           } else {
// //             // Handle user not found scenario
// //             router.push("/error");
// //           }
// //         } catch (error) {
// //           console.error("Error fetching user:", error);
// //           router.push("/error");
// //         }
// //       }
// //     };

// //     fetchUser();
// //   }, [userEmail, router]);

// //   return <div>Loading...</div>;
// // };

// // // export default CheckPage;
// "use client";
// export const dynamic = 'force-dynamic';

// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import React, { useEffect } from "react";

// const CheckPage = () => {
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const userEmail = session?.user?.email;

//   useEffect(() => {
//     // Don't run during SSR or if still loading
//     if (status === "loading") return;
    
//     // If not authenticated, redirect
//     if (status === "unauthenticated") {
//       router.push("/auth/user/login");
//       return;
//     }

//     const fetchUser = async () => {
//       if (userEmail) {
//         try {
//           const response = await fetch("/api/google-user", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email: userEmail }),
//           });
//           const data = await response.json();
//           if (data.success && data.user && typeof window !== "undefined") {
//             localStorage.setItem("userId", data.user.id);
//             localStorage.setItem("userEmail", data.user.email);

//             router.push(`/user/${data.user.id}/complete`);
//           } else {
//             // Handle user not found scenario
//             router.push("/error");
//           }
//         } catch (error) {
//           console.error("Error fetching user:", error);
//           router.push("/error");
//         }
//       }
//     };

//     fetchUser();
//   }, [userEmail, router, status]);

//   // Show loading state during authentication check
//   if (status === "loading") {
//     return (
//       <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e2556]"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e2556]"></div>
//     </div>
//   );
// };

// export default CheckPage;
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CheckPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  // Ensure this only runs on client
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/auth/user/login");
      return;
    }

    const fetchUser = async () => {
      const userEmail = session?.user?.email;
      if (userEmail) {
        try {
          const response = await fetch("/api/google-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: userEmail }),
          });
          const data = await response.json();
          if (data.success && data.user && typeof window !== "undefined") {
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("userEmail", data.user.email);

            router.push(`/user/${data.user.id}/complete`);
          } else {
            router.push("/error");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          router.push("/error");
        }
      }
    };

    if (status === "authenticated") {
      fetchUser();
    }
  }, [mounted, status, session, router]);

  // Don't render anything during SSR
  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1e2556]"></div>
    </div>
  );
};

// Force this to be a dynamic route
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export default CheckPage;