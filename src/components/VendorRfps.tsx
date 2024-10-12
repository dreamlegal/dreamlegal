



// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// function VendorLeads({ userId }: { userId: string }) {
//   const [rfpLeads, setRfpLeads] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [responses, setResponses] = useState<any>({});
//   const searchParams = useSearchParams();
//   const verify = searchParams.get("verified") ? true : false;

//   useEffect(() => {
//     async function fetchRfpLeads() {
//       try {
//         const response = await fetch("/api/get-vendor-wise-rfp-data", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ vendorId: userId }),
//         });

//         const data = await response.json();

//         if (data.success) {
//           setRfpLeads(data.data);
//         } else {
//           setError(data.message);
//         }
//       } catch (err) {
//         console.error("Failed to fetch RFP leads:", err);
//         setError("Failed to fetch RFP leads");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchRfpLeads();
//   }, [userId]);

//   const handleInputChange = (leadId: string, field: string, value: string) => {
//     setResponses((prev) => ({
//       ...prev,
//       [leadId]: {
//         ...prev[leadId],
//         [field]: value,
//       },
//     }));
//   };

//   const handleFeatureChange = (leadId: string, category: string, subCategory: string, feature: string, value: string) => {
//     setResponses((prev) => ({
//       ...prev,
//       [leadId]: {
//         ...prev[leadId],
//         features: {
//           ...prev[leadId]?.features,
//           [category]: {
//             ...prev[leadId]?.features?.[category],
//             [subCategory]: {
//               ...prev[leadId]?.features?.[category]?.[subCategory],
//               [feature]: value,
//             },
//           },
//         },
//       },
//     }));
//   };

//   const handleSubmit = async (leadId: string) => {
//     const leadResponses = responses[leadId];
//     if (!leadResponses) {
//       alert("Please provide responses before submitting.");
//       return;
//     }

//     try {
//       const { urgencyResponse, budgetResponse, features } = leadResponses;

//       const response = await fetch("/api/add-vendor-response", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           leadId,
//           vendorId: userId,
//           urgencyResponse,
//           budgetResponse,
//           features,
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         alert("Response submitted successfully!");
//       } else {
//         alert("Failed to submit response: " + data.message);
//       }
//     } catch (err) {
//       console.error("Failed to submit response:", err);
//       alert("Error submitting response");
//     }
//   };

//   if (verify) {
//     return (
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 text-center">
//           Please complete your profile
//         </h1>
//         <center>
//           <span className="text-sm text-slate-500 text-center">
//             You need to complete your profile by clicking on the profile link.
//           </span>
//         </center>
//       </div>
//     );
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
  
//     <div className="container mx-auto p-6">
//     <h1 className="text-3xl font-bold text-gray-900 mb-8">Vendor Leads</h1>
//     <div className="grid grid-cols-1 gap-6">
//       {rfpLeads.map((lead) => (
//         <div key={lead.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
//           <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-200">
           
//             <div className="mt-4 flex flex-col gap-4 text-sm">
//               <div className="space-y-1">
//                 <span className="font-medium text-gray-600">Organisation Type:</span>
//                 <p className="text-gray-800">{lead.userOrgType}</p>
//               </div>
//               <div className="space-y-1">
//                 <span className="font-medium text-gray-600">Team Size:</span>
//                 <p className="text-gray-800">{lead.userTeamSize}</p>
//               </div>
//               <div className="space-y-1">
//                 <span className="font-medium text-gray-600">Customisation:</span>
//                 <p className="text-gray-800">{lead.customisation}</p>
//               </div>
//               <div className="space-y-1">
//                 <span className="font-medium text-gray-600">Urgency:</span>
//                 <p className="text-gray-800">{lead.urgency.askedUrgency}</p>
//               </div>
//               <div className="space-y-1">
//                 <span className="font-medium text-gray-600">Budget:</span>
//                 <p className="text-gray-800">{lead.budget.askedMin} - {lead.budget.askedMax} {lead.budget.budgetUnit}</p>
//               </div>
//             </div>
//             <div className="mt-6 space-y-4">
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Urgency Response:</label>
//                 <select 
//                   className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                   onChange={(e) => handleInputChange(lead.id, "urgencyResponse", e.target.value)}
//                 >
//                   <option value="">Select</option>
//                   <option value="yes">Yes</option>
//                   <option value="no">No</option>
//                 </select>
//               </div>
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Budget Response:</label>
//                 <select 
//                   className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//                   onChange={(e) => handleInputChange(lead.id, "budgetResponse", e.target.value)}
//                 >
//                   <option value="">Select</option>
//                   <option value="yes">Yes</option>
//                   <option value="no">No</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div className="w-full md:w-1/2 p-6 space-y-6">
//             <h3 className="font-bold text-lg text-gray-800">Features:</h3>
//             {Object.entries(lead.features).map(([category, subCategories]) => (
//               <div key={category} className="space-y-3 bg-gray-50 p-4 rounded-md">
//                 <h4 className="font-semibold text-gray-700 border-b pb-2">{category}</h4>
//                 {Object.entries(subCategories as any).map(([subCategory, features]) => (
//                   <div key={subCategory} className="space-y-2">
//                     <h5 className="font-medium text-gray-600">{subCategory}</h5>
//                     <div className="flex flex-col gap-2">
//                       {Object.entries(features as any).map(([feature, details]) => (
//                         <div key={feature} className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm">
//                           <label className="text-sm text-gray-600 mr-2">{feature}</label>
//                           <select 
//                             className="block w-24 pl-2 pr-8 py-1 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
//                             onChange={(e) => handleFeatureChange(lead.id, category, subCategory, feature, e.target.value)}
//                           >
//                             <option value="">Select</option>
//                             <option value="yes">Yes</option>
//                             <option value="no">No</option>
//                             <option value="configurable">Configurable</option>
//                           </select>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ))}
//             <button 
//               className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
//               onClick={() => handleSubmit(lead.id)}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
//   );
// }

// export default VendorLeads;

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function VendorLeads({ userId }: { userId: string }) {
  const [rfpLeads, setRfpLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<any>({});
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const verify = searchParams.get("verified") ? true : false;

  useEffect(() => {
    async function fetchRfpLeads() {
      try {
        const response = await fetch("/api/get-vendor-wise-rfp-data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vendorId: userId }),
        });

        const data = await response.json();

        if (data.success) {
        
          setRfpLeads(data.data);
          if (data.data.length > 0) {
            setSelectedLead(data.data[0].id);
          }
        } else {
          setError(data.message);
        }
      } catch (err) {
        console.error("Failed to fetch RFP leads:", err);
        setError("Failed to fetch RFP leads");
      } finally {
        setLoading(false);
      }
    }

    fetchRfpLeads();
  }, [userId]);

  const handleInputChange = (leadId: string, field: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [leadId]: {
        ...prev[leadId],
        [field]: value,
      },
    }));
  };

  const handleFeatureChange = (leadId: string, category: string, subCategory: string, feature: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [leadId]: {
        ...prev[leadId],
        features: {
          ...prev[leadId]?.features,
          [category]: {
            ...prev[leadId]?.features?.[category],
            [subCategory]: {
              ...prev[leadId]?.features?.[category]?.[subCategory],
              [feature]: value,
            },
          },
        },
      },
    }));
  };

  const handleSubmit = async (leadId: string) => {
    const leadResponses = responses[leadId];
    if (!leadResponses) {
      alert("Please provide responses before submitting.");
      return;
    }

    try {
      const { urgencyResponse, budgetResponse, features } = leadResponses;

      const response = await fetch("/api/add-vendor-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId,
          vendorId: userId,
          urgencyResponse,
          budgetResponse,
          features,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Response submitted successfully!");
        setSelectedLead(null);
      } else {
        alert("Failed to submit response: " + data.message);
      }
    } catch (err) {
      console.error("Failed to submit response:", err);
      alert("Error submitting response");
    }
  };

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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Requests For Proposal</h1>
      {/* <div className="flex justify-between mb-6">
        {rfpLeads.map((lead, index) => (
          <button
            key={lead.id}
            className={`px-6 py-3 rounded-full ${
              selectedLead === lead.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            } hover:bg-blue-400 hover:text-white transition-colors duration-200`}
            onClick={() => setSelectedLead(lead.id === selectedLead ? null : lead.id)}
          >
            Lead {rfpLeads.length - index}
          </button>
        ))}
      </div> */}
      <p className="text-sm text-gray-600 mb-4">Click a number to open details of the proposal</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {rfpLeads.map((lead, index) => (
          <button
            key={lead.id}
            
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedLead === lead.id
                ? 'bg-blue-500 text-white'  
                : 'bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-800'
            } transition-colors duration-200`}
            onClick={() => setSelectedLead(lead.id === selectedLead ? null : lead.id)}
          >
            User {rfpLeads.length - index}
          </button>
        ))}
      </div>
      
      {selectedLead && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 ml-4">Details</h2>
          {rfpLeads.map((lead, index) => {
            if (lead.id === selectedLead) {
              return (
                <div key={lead.id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-200">
                    {/* <h3 className="text-xl font-bold text-gray-800 mb-4">Proposal {rfpLeads.length - index}</h3> */}
                    <div className="mt-4 flex flex-col gap-4 text-sm">
                      <div className="space-y-1">
                        <span className="font-medium text-gray-600">Organisation Type:</span>
                        <p className="text-gray-800">{lead.userOrgType}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="font-medium text-gray-600">Team Size:</span>
                        <p className="text-gray-800">{lead.userTeamSize}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="font-medium text-gray-600">Customisation:</span>
                        <p className="text-gray-800">{lead.customisation}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="font-medium text-gray-600">Urgency:</span>
                        <p className="text-gray-800">{lead.urgency.askedUrgency}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="font-medium text-gray-600">Budget:</span>
                        <p className="text-gray-800">{lead.budget.askedMin} - {lead.budget.askedMax} {lead.budget.budgetUnit}</p>
                      </div>
                    </div>
                    <div className="mt-6 space-y-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Urgency Response:</label>
                        <select 
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          onChange={(e) => handleInputChange(lead.id, "urgencyResponse", e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Budget Response:</label>
                        <select 
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                          onChange={(e) => handleInputChange(lead.id, "budgetResponse", e.target.value)}
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-6 space-y-6">
                    <h3 className="font-bold text-lg text-gray-800">Features:</h3>
                    {Object.entries(lead.features).map(([category, subCategories]) => (
                      <div key={category} className="space-y-3 bg-gray-50 p-4 rounded-md">
                        <h4 className="font-semibold text-gray-700 border-b pb-2">{category}</h4>
                        {Object.entries(subCategories as any).map(([subCategory, features]) => (
                          <div key={subCategory} className="space-y-2">
                            <h5 className="font-medium text-gray-600">{subCategory}</h5>
                            <div className="flex flex-col gap-2">
                              {Object.entries(features as any).map(([feature, details]) => (
                                <div key={feature} className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm">
                                  <label className="text-sm text-gray-600 mr-2">{feature}</label>
                                  <select 
                                    className="block w-24 pl-2 pr-8 py-1 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
                                    onChange={(e) => handleFeatureChange(lead.id, category, subCategory, feature, e.target.value)}
                                  >
                                    <option value="">Select</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    <option value="configurable">Configurable</option>
                                  </select>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                    <button 
                      className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                      onClick={() => handleSubmit(lead.id)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

export default VendorLeads;