// "use client";
// import React, { useEffect, useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Rating } from "@mui/material";
// import { useSearchParams } from "next/navigation";
// import LeadCard from "./LeadCard";
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 


// function VendorLeads({ userId ,}: { userId: string }) {
  
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const searchParams = useSearchParams();
//   // @ts-ignore
//   const verify = searchParams.get('verified') ? true : false;

// //   useEffect(() => {
// //     async function fetchReviews() {
// //       try {
// //         const response = await fetch("/api/vendor-reviews", {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({ userId }),
// //         });

// //         const data = await response.json();
// //         console.log(data);

// //         if (data.success) {
// //           setReviewsData(data.products);
// //           setOverallRating(data.overallRating);
// //         } else {
// //           setError(data.msg);
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch reviews:", err);
// //         setError("Failed to fetch reviews");
// //       } finally {
// //         setLoading(false);
// //       }
// //     }

// //     fetchReviews();
// //   }, [userId]);

//   if(verify){
//     return(
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 text-center">Please complete your profile</h1>
//        <center> <span className="text-sm text-slate-500 text-center">You need to complete your profile, By clicking on profile</span></center>
//       </div>
//     )
//   }

 

//   // if (loading) {
//   //   return <div>Loading...</div>;
//   // }

//   // if (error) {
//   //   return <div>{error}</div>;
//   // }



  
    
  
//   return (
//     <>
//      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//       {leads.map((lead) => (
//          <LeadCard key={lead.id} lead={lead} />
//       ))}
//     </div> */}
//     <LeadCard />
//     </>
    
//   );
// }


 
// export default VendorLeads;

"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import LeadCard from "./LeadCard"; // Make sure LeadCard can handle all fields like bookingTime

function VendorLeads({ userId }: { userId: string }) {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const verify = searchParams.get('verified') ? true : false;

  console.log(userId);
  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await fetch("/api/vendor-specific-leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vendorId: userId }), // Send vendorId to the API
        });

        const data = await response.json();

        if (data.success) {
          setLeads(data.leads); // Store leads in state
          console.log("Leads fetched successfully:", data);
        } else {
          setError(data.msg);
        }
      } catch (err) {
        console.error("Failed to fetch leads:", err);
        setError("Failed to fetch leads");
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, [userId]);

  if (verify) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Please complete your profile
        </h1>
        <center>
          <span className="text-sm text-slate-500 text-center">
            You need to complete your profile by clicking on the profile link.
          </span>
        </center>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} verify={verify} />
      ))}
    </div>
  );
}

export default VendorLeads;
