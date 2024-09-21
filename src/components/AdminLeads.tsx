// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// // import { Rating } from "@mui/material";
// // import { useSearchParams } from "next/navigation";
// // import LeadCard from "./LeadCard";
// // import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; 


// // function AdminLeads() {
  
// //   const [loading, setLoading] = useState<boolean>(true);
// //   const [error, setError] = useState<string | null>(null);
 
// //   // @ts-ignore

// // //   useEffect(() => {
// // //     async function fetchReviews() {
// // //       try {
// // //         const response = await fetch("/api/vendor-reviews", {
// // //           method: "POST",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //           },
// // //           body: JSON.stringify({ userId }),
// // //         });

// // //         const data = await response.json();
// // //         console.log(data);

// // //         if (data.success) {
// // //           setReviewsData(data.products);
// // //           setOverallRating(data.overallRating);
// // //         } else {
// // //           setError(data.msg);
// // //         }
// // //       } catch (err) {
// // //         console.error("Failed to fetch reviews:", err);
// // //         setError("Failed to fetch reviews");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     }

// // //     fetchReviews();
// // //   }, [userId]);



 

// //   // if (loading) {
// //   //   return <div>Loading...</div>;
// //   // }

// //   // if (error) {
// //   //   return <div>{error}</div>;
// //   // }



  
    
  
// //   return (
// //     <>
// //      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
// //       {/* {leads.map((lead) => (
// //          <LeadCard key={lead.id} lead={lead} />
// //       ))} */}
// //       <LeadCard />
// //     <LeadCard />
// //     <LeadCard />
// //     <LeadCard />
// //     </div>
    
// //     </>
    
// //   );
// // }


 
// // export default AdminLeads;  
// "use client";
// import React, { useEffect, useState } from "react";
// import LeadCard from "./LeadCard";

// function AdminLeads() {
//   const [leads, setLeads] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchLeads() {
//       try {
//         const response = await fetch("/api/all-leads", {
//           method: "GET", // Use GET since you want to fetch all leads
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         const data = await response.json();

//         if (data.success) {
//           setLeads(data.leads); // Store leads in state
//         } else {
//           setError(data.msg);
//         }
//       } catch (err) {
//         console.error("Failed to fetch leads:", err);
//         setError("Failed to fetch leads");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchLeads();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//         {leads.map((lead) => (
//           <LeadCard key={lead.id} lead={lead} />
//         ))}
//       </div>
//     </>
//   );
// }

// export default AdminLeads;
"use client";
import React, { useEffect, useState } from "react";
import LeadCard from "./LeadCard";

function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const response = await fetch("/api/all-leads", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.success) {
          setLeads(data.leads); // Store leads in state
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
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {leads.length > 0 ? (
        leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))
      ) : (
        <div className="text-center">No leads available.</div>
      )}
    </div>
  );
}

export default AdminLeads;
