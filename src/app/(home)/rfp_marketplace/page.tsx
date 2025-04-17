// "use client"

// import React, { useEffect, useState } from "react";
// import { useAuth } from '@/context/authContext';
// import { 
//   RefreshCw, Box, ClipboardCheck, AlertTriangle, Building2, 
//   Users, Settings, Clock, Wallet2, CheckCircle2, XCircle, 
//   ChevronDown, ChevronUp, FileText, BarChart, ListFilter,
//   CheckSquare, PenLine, Target, Hash, Filter
// } from "lucide-react";

// // Custom Card Component
// const CustomCard = ({ children, className = "" }) => {
//   return (
//     <div className={`bg-white rounded-xl border border-gray-200 ${className}`}>
//       {children}
//     </div>
//   );
// };

// // Custom Select Component
// const CustomSelect = ({ options, value, onChange, className = "", placeholder = "Select" }) => {
//   return (
//     <div className="relative">
//       <select
//         value={value || ""}
//         onChange={onChange}
//         className={`w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
//       >
//         <option value="">{placeholder}</option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>
//       <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
//         <ChevronDown className="h-4 w-4 text-gray-400" />
//       </div>
//     </div>
//   );
// };

// // Section Component with Collapsible functionality
// const Section = ({ title, icon, children, defaultOpen = false }) => {
//   const [isOpen, setIsOpen] = useState(defaultOpen);
//   const Icon = icon;

//   return (
//     <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
//       <div 
//         className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <div className="flex items-center gap-2">
//           <Icon className="w-5 h-5 text-indigo-500" />
//           <h3 className="font-medium text-gray-900">{title}</h3>
//         </div>
//         {isOpen ? 
//           <ChevronUp className="w-5 h-5 text-gray-500" /> : 
//           <ChevronDown className="w-5 h-5 text-gray-500" />
//         }
//       </div>
//       {isOpen && (
//         <div className="p-4">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// // Status Badge Component
// const StatusBadge = ({ status }) => {
//   const variants = {
//     new: "bg-green-100 text-green-800 border-green-200",
//     responded: "bg-blue-100 text-blue-800 border-blue-200",
//     inProgress: "bg-yellow-100 text-yellow-800 border-yellow-200",
//     closed: "bg-gray-100 text-gray-800 border-gray-200",
//   };

//   const labels = {
//     new: "New",
//     responded: "Responded",
//     inProgress: "In Progress",
//     closed: "Closed",
//   };

//   return (
//     <span 
//       className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${variants[status] || variants.new}`}
//     >
//       {labels[status] || "New"}
//     </span>
//   );
// };

// function RfpMarketplacePage() {
//   const { vendorId, userType } = useAuth();
//   const [rfps, setRfps] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedRfp, setSelectedRfp] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [orgTypeFilter, setOrgTypeFilter] = useState("");
//   const [responses, setResponses] = useState({});
//   const [expandedCategory, setExpandedCategory] = useState(null);
//   const [respondedRfps, setRespondedRfps] = useState([]);
  
//   // Get all categories and org types from RFPs for the filters
//   const allCategories = [...new Set(rfps.map(rfp => rfp.selectedCategory))];
//   const allOrgTypes = [...new Set(rfps.map(rfp => {
//     const orgType = rfp.userOrgType?.value || rfp.userOrgType;
//     return orgType;
//   }))];
  
//   // Filter RFPs by category and org type
//   const filteredRfps = rfps.filter(rfp => {
//     const matchesCategory = !categoryFilter || rfp.selectedCategory === categoryFilter;
//     const orgType = rfp.userOrgType?.value || rfp.userOrgType;
//     const matchesOrgType = !orgTypeFilter || orgType === orgTypeFilter;
//     return matchesCategory && matchesOrgType;
//   });

//   // Fetch all RFPs 
//   const fetchAllRfps = async () => {
//     setRefreshing(true);
//     try {
//       // First fetch all RFPs
//       const response = await fetch("/api/get-all-rfps", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         }
//       });

//       const data = await response.json();

//       if (data.success) {
//         setRfps(data.data);
//         // If there are RFPs and none is selected, select the first one
//         if (data.data.length > 0 && !selectedRfp) {
//           setSelectedRfp(data.data[0].id);
//         }
        
//         // If vendor is logged in, fetch their responses
//         if (vendorId) {
//           fetchVendorResponses();
//         }
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       console.error("Failed to fetch RFPs:", err);
//       setError("Failed to fetch RFPs");
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };
  
//   // Fetch vendor's responded RFPs
//   const fetchVendorResponses = async () => {
//     try {
//       const response = await fetch("/api/get-vendor-responses", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ vendorId }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         // Set list of RFP IDs that this vendor has already responded to
//         setRespondedRfps(data.data.map(response => response.rfpId));
//       }
//     } catch (err) {
//       console.error("Failed to fetch vendor responses:", err);
//     }
//   };

//   useEffect(() => {
//     fetchAllRfps();
//   }, []);

//   // Handle basic field response changes (organization type, team size, etc.)
//   const handleBasicFieldResponse = (rfpId, field, value) => {
//     setResponses(prev => ({
//       ...prev,
//       [rfpId]: {
//         ...prev[rfpId],
//         [field]: {
//           ...prev[rfpId]?.[field],
//           response: value,
//           available: value !== "no"
//         }
//       }
//     }));
//   };

//   // Handle process lifecycle responses
//   const handleLifecycleResponse = (rfpId, stage, available, details = "") => {
//     setResponses(prev => ({
//       ...prev,
//       [rfpId]: {
//         ...prev[rfpId],
//         processLifecycle: {
//           ...prev[rfpId]?.processLifecycle,
//           [stage]: {
//             available,
//             details
//           }
//         }
//       }
//     }));
//   };

//   // Handle feature responses
//   const handleFeatureResponse = (rfpId, category, functionality, feature, response) => {
//     setResponses(prev => ({
//       ...prev,
//       [rfpId]: {
//         ...prev[rfpId],
//         features: {
//           ...prev[rfpId]?.features,
//           [category]: {
//             ...prev[rfpId]?.features?.[category],
//             [functionality]: {
//               ...prev[rfpId]?.features?.[category]?.[functionality],
//               [feature]: {
//                 available: response !== "no",
//                 details: response
//               }
//             }
//           }
//         }
//       }
//     }));
//   };

//   // Handle budget response
//   const handleBudgetResponse = (rfpId, meetable, amount, details = "") => {
//     setResponses(prev => ({
//       ...prev,
//       [rfpId]: {
//         ...prev[rfpId],
//         budget: {
//           meetable,
//           quotedAmount: amount,
//           pricingDetails: details
//         }
//       }
//     }));
//   };

//   // Handle urgency response
//   const handleUrgencyResponse = (rfpId, meetable, timeline = "") => {
//     setResponses(prev => ({
//       ...prev,
//       [rfpId]: {
//         ...prev[rfpId],
//         urgency: {
//           meetable,
//           proposedTimeline: timeline
//         }
//       }
//     }));
//   };

//   // Submit response for the selected RFP
//   const handleSubmit = async (rfpId) => {
//     if (!vendorId) {
//       alert("You must be logged in as a vendor to submit responses.");
//       return;
//     }
    
//     if (!responses[rfpId]) {
//       alert("Please provide responses before submitting.");
//       return;
//     }

//     try {
//       const response = await fetch("/api/add-vendor-response", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           rfpId,
//           vendorId,
//           responses: responses[rfpId]
//         }),
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         alert("Response submitted successfully!");
//         // Add this RFP to the list of responded RFPs
//         setRespondedRfps(prev => [...prev, rfpId]);
//         // Clear the response data for this RFP
//         setResponses(prev => {
//           const newResponses = { ...prev };
//           delete newResponses[rfpId];
//           return newResponses;
//         });
//       } else {
//         alert(`Failed to submit response: ${data.message}`);
//       }
//     } catch (err) {
//       console.error("Failed to submit response:", err);
//       alert("Error submitting response");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="flex flex-col items-center gap-4">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
//           <p className="text-gray-600 font-medium">Loading RFP Marketplace...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <CustomCard className="max-w-lg w-full p-8 text-center">
//           <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
//           <h1 className="text-xl font-bold text-gray-900 mb-2">Error Loading RFPs</h1>
//           <p className="text-gray-600">{error}</p>
//         </CustomCard>
//       </div>
//     );
//   }

//   // If no vendor ID is found
//   if (!vendorId) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <CustomCard className="max-w-lg w-full p-8 text-center">
//           <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
//           <h1 className="text-xl font-bold text-gray-900 mb-2">Authentication Required</h1>
//           <p className="text-gray-600">Please log in as a vendor to view and respond to RFPs.</p>
//         </CustomCard>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-7xl">
//       {/* Header Section */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] bg-clip-text text-transparent">
//             RFP Marketplace
//           </h1>
//           <p className="text-sm text-gray-600 mt-2">
//             Browse and respond to client requests for proposals
//           </p>
//         </div>
//         <div className="flex items-center gap-4">
//           {/* Filter Buttons */}
//           <div className="flex gap-2">
//             <div className="relative min-w-[180px]">
//               <CustomSelect
//                 options={allCategories.map(category => ({ value: category, label: category }))}
//                 value={categoryFilter}
//                 onChange={(e) => setCategoryFilter(e.target.value)}
//                 placeholder="Filter by category"
//                 className="bg-white shadow-sm"
//               />
//             </div>
//             <div className="relative min-w-[180px]">
//               <CustomSelect
//                 options={allOrgTypes.map(type => ({ value: type, label: type }))}
//                 value={orgTypeFilter}
//                 onChange={(e) => setOrgTypeFilter(e.target.value)}
//                 placeholder="Filter by org type"
//                 className="bg-white shadow-sm"
//               />
//             </div>
//             {(categoryFilter || orgTypeFilter) && (
//               <button
//                 onClick={() => {
//                   setCategoryFilter("");
//                   setOrgTypeFilter("");
//                 }}
//                 className="p-2 text-gray-600 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
//                 title="Clear filters"
//               >
//                 <XCircle className="w-5 h-5" />
//               </button>
//             )}
//           </div>
          
//           {/* Refresh Button */}
//           <button
//             onClick={fetchAllRfps}
//             disabled={loading || refreshing}
//             className="p-2 text-gray-600 hover:text-[#1e2556] rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             title="Refresh RFPs"
//           >
//             <RefreshCw 
//               className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} 
//             />
//           </button>
//         </div>
//       </div>

//       {/* Main Grid Layout */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* RFPs List */}
//         <div className="lg:col-span-1">
//           <CustomCard className="shadow-lg h-full">
//             <div className="p-4 border-b border-gray-100">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <ListFilter className="w-5 h-5 text-[#1e2556]" />
//                   <h2 className="text-lg font-semibold text-gray-900">Available RFPs</h2>
//                 </div>
//                 <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
//                   {filteredRfps.length} of {rfps.length}
//                 </span>
//               </div>
//               {(categoryFilter || orgTypeFilter) && (
//                 <div className="mt-2 flex flex-wrap items-center gap-2">
//                   <span className="text-xs text-gray-500">Filtered by:</span>
//                   {categoryFilter && (
//                     <span className="px-2 py-1 bg-[#f5f7fa] text-[#1e2556] text-xs font-medium rounded flex items-center">
//                       Category: {categoryFilter}
//                     </span>
//                   )}
//                   {orgTypeFilter && (
//                     <span className="px-2 py-1 bg-[#f5f7fa] text-[#1e2556] text-xs font-medium rounded flex items-center">
//                       Organization: {orgTypeFilter}
//                     </span>
//                   )}
//                 </div>
//               )}
//             </div>
            
//             <div className="divide-y divide-gray-100 max-h-[calc(100vh-250px)] overflow-y-auto">
//               {filteredRfps.length === 0 ? (
//                 <div className="p-6 text-center">
//                   <Box className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No RFPs Found</h3>
//                   <p className="text-gray-500 text-sm">
//                     {categoryFilter || orgTypeFilter
//                       ? "No RFPs match your current filters"
//                       : "There are currently no RFPs available"}
//                   </p>
//                 </div>
//               ) : (
//                 filteredRfps.map((rfp, index) => {
//                   const hasResponded = respondedRfps.includes(rfp.id);
//                   return (
//                     <div 
//                       key={rfp.id}
//                       className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
//                         selectedRfp === rfp.id ? 'bg-[#f5f7fa] border-l-4 border-[#1e2556]' : ''
//                       } ${hasResponded ? 'opacity-70' : ''}`}
//                       onClick={() => setSelectedRfp(rfp.id)}
//                     >
//                       <div className="flex items-center justify-between mb-2">
//                         <h3 className="font-medium text-gray-900">
//                           RFP #{filteredRfps.length - index}
//                         </h3>
//                         <StatusBadge status={hasResponded ? "responded" : "new"} />
//                       </div>
                      
//                       <div className="text-sm text-gray-500 mb-2">
//                         {rfp.selectedCategory}
//                       </div>
                      
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         <div className="flex items-center text-xs text-gray-500">
//                           <Building2 className="w-3 h-3 mr-1" />
//                           {rfp.userOrgType?.value || rfp.userOrgType || "Unknown"}
//                         </div>
//                         <div className="flex items-center text-xs text-gray-500">
//                           <Users className="w-3 h-3 mr-1" />
//                           {rfp.userTeamSize?.value || rfp.userTeamSize || "Unknown"}
//                         </div>
//                         <div className="flex items-center text-xs text-gray-500">
//                           <Clock className="w-3 h-3 mr-1" />
//                           {rfp.urgency?.value || (rfp.urgency?.askedUrgency) || "Unknown"}
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })
//               )}
//             </div>
//           </CustomCard>
//         </div>

//         {/* RFP Details and Response */}
//         <div className="lg:col-span-2">
//           {selectedRfp ? (
//             (() => {
//               const rfp = rfps.find(r => r.id === selectedRfp);
//               const hasResponded = respondedRfps.includes(rfp.id);
              
//               if (!rfp) return null;
              
//               return (
//                 <div className="space-y-6">
//                   {/* Header Card */}
//                   <CustomCard className="shadow-lg">
//                     <div className="p-6">
//                       <div className="flex items-center justify-between mb-4">
//                         <h2 className="text-xl font-bold text-[#1e2556]">
//                           {rfp.selectedCategory}
//                         </h2>
//                         <StatusBadge status={hasResponded ? "responded" : "new"} />
//                       </div>
                      
//                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
//                         <div className="space-y-1">
//                           <p className="text-xs text-gray-500">Organization</p>
//                           <p className="text-sm font-medium">{rfp.userOrgType?.value || rfp.userOrgType}</p>
//                         </div>
//                         <div className="space-y-1">
//                           <p className="text-xs text-gray-500">Team Size</p>
//                           <p className="text-sm font-medium">{rfp.userTeamSize?.value || rfp.userTeamSize}</p>
//                         </div>
//                         <div className="space-y-1">
//                           <p className="text-xs text-gray-500">Urgency</p>
//                           <p className="text-sm font-medium">{rfp.urgency?.value || rfp.urgency?.askedUrgency}</p>
//                         </div>
//                         <div className="space-y-1">
//                           <p className="text-xs text-gray-500">Budget</p>
//                           <p className="text-sm font-medium">
//                             {rfp.budget?.value?.min || rfp.budget?.askedMin} - {rfp.budget?.value?.max || rfp.budget?.askedMax} {rfp.budget?.value?.currency || rfp.budget?.budgetUnit}
//                           </p>
//                         </div>
//                       </div>
                      
//                       {hasResponded && (
//                         <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
//                           <p className="flex items-center">
//                             <CheckCircle2 className="w-4 h-4 mr-2" />
//                             You have already submitted a response to this RFP.
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </CustomCard>
                  
//                   {hasResponded ? (
//                     <CustomCard className="shadow-lg p-8 text-center">
//                       <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
//                       <h3 className="text-xl font-medium text-gray-900 mb-2">Response Submitted</h3>
//                       <p className="text-gray-600 max-w-md mx-auto mb-4">
//                         You have already submitted a response to this RFP. The client will review your proposal and may contact you for further discussion.
//                       </p>
//                       <button
//                         className="mt-4 px-4 py-2 bg-[#1e2556] text-white rounded-lg hover:bg-opacity-90 transition-colors"
//                         onClick={() => setSelectedRfp(null)}
//                       >
//                         Browse other RFPs
//                       </button>
//                     </CustomCard>
//                   ) : (
//                     /* RFP Details and Response Section */
//                     <div className="space-y-6">
//                       {/* Project Details Section */}
//                       <Section title="Project Details" icon={FileText} defaultOpen={true}>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//                           {/* Key Problems */}
//                           {(rfp.keyProblems?.value || rfp.keyProblems) && (
//                             <div className="space-y-2">
//                               <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
//                                 <AlertTriangle className="w-4 h-4 text-orange-500" />
//                                 Key Problems
//                               </h4>
//                               <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
//                                 {rfp.keyProblems?.value || rfp.keyProblems}
//                               </p>
//                               <div className="mt-4">
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                   Your Response
//                                 </label>
//                                 <textarea
//                                   className="w-full min-h-[80px] rounded-lg border border-gray-200 p-2 text-sm"
//                                   placeholder="Explain how your solution addresses these problems..."
//                                   onChange={(e) => handleBasicFieldResponse(rfp.id, 'keyProblems', e.target.value)}
//                                 />
//                               </div>
//                             </div>
//                           )}
                          
//                           {/* Key Goals */}
//                           {(rfp.keyGoals?.value || rfp.keyGoals) && (
//                             <div className="space-y-2">
//                               <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
//                                 <Target className="w-4 h-4 text-green-500" />
//                                 Key Goals
//                               </h4>
//                               <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
//                                 {rfp.keyGoals?.value || rfp.keyGoals}
//                               </p>
//                               <div className="mt-4">
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                   Your Response
//                                 </label>
//                                 <textarea
//                                   className="w-full min-h-[80px] rounded-lg border border-gray-200 p-2 text-sm"
//                                   placeholder="Explain how your solution helps achieve these goals..."
//                                   onChange={(e) => handleBasicFieldResponse(rfp.id, 'keyGoals', e.target.value)}
//                                 />
//                               </div>
//                             </div>
//                           )}
//                         </div>
                        
//                         {/* Customization Requirements */}
//                         {(rfp.customisation?.value || rfp.customisation) && (
//                           <div className="space-y-2">
//                             <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2">
//                               <Settings className="w-4 h-4 text-indigo-500" />
//                               Customization Requirements
//                             </h4>
//                             <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
//                               {rfp.customisation?.value || rfp.customisation}
//                             </p>
//                             <div className="mt-4">
//                               <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Your Response
//                               </label>
//                               <textarea
//                                 className="w-full min-h-[80px] rounded-lg border border-gray-200 p-2 text-sm"
//                                 placeholder="Explain your customization capabilities..."
//                                 onChange={(e) => handleBasicFieldResponse(rfp.id, 'customisation', e.target.value)}
//                               />
//                             </div>
//                           </div>
//                         )}
//                       </Section>
                      
//                       {/* Budget & Timeline Section */}
//                       <Section title="Budget & Timeline" icon={Clock} defaultOpen={true}>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                           {/* Budget Response */}
//                           <div className="space-y-3">
//                             <h4 className="text-sm font-medium text-gray-900">Budget Requirements</h4>
//                             <div className="bg-gray-50 p-3 rounded-lg">
//                               <p className="text-sm text-gray-600">
//                                 {rfp.budget?.value?.min || rfp.budget?.askedMin} - {rfp.budget?.value?.max || rfp.budget?.askedMax} {rfp.budget?.value?.currency || rfp.budget?.budgetUnit}
//                               </p>
//                             </div>
                            
//                             <div className="space-y-3 mt-4">
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                   Can you meet this budget?
//                                 </label>
//                                 <CustomSelect
//                                   options={[
//                                     { value: "yes", label: "Yes, within budget" },
//                                     { value: "partial", label: "Partially, with limitations" },
//                                     { value: "premium", label: "Yes, but premium pricing" },
//                                     { value: "no", label: "No, budget is too low" }
//                                   ]}
//                                   onChange={(e) => handleBudgetResponse(
//                                     rfp.id, 
//                                     e.target.value !== "no", 
//                                     responses[rfp.id]?.budget?.quotedAmount || ""
//                                   )}
//                                 />
//                               </div>
                              
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                   Your Quoted Amount
//                                 </label>
//                                 <div className="flex">
//                                   <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
//                                     {rfp.budget?.value?.currency || rfp.budget?.budgetUnit}
//                                   </span>
//                                   <input
//                                     type="text"
//                                     className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-200 text-sm"
//                                     placeholder="Enter amount"
//                                     onChange={(e) => handleBudgetResponse(
//                                       rfp.id,
//                                       responses[rfp.id]?.budget?.meetable !== undefined 
//                                         ? responses[rfp.id]?.budget?.meetable 
//                                         : true,
//                                       e.target.value
//                                     )}
//                                   />
//                                 </div>
//                               </div>
                              
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                   Pricing Details
//                                 </label>
//                                 <textarea
//                                   className="w-full min-h-[80px] rounded-lg border border-gray-200 p-2 text-sm"
//                                   placeholder="Explain your pricing structure..."
//                                   onChange={(e) => handleBudgetResponse(
//                                     rfp.id,
//                                     responses[rfp.id]?.budget?.meetable !== undefined 
//                                       ? responses[rfp.id]?.budget?.meetable 
//                                       : true,
//                                     responses[rfp.id]?.budget?.quotedAmount || "",
//                                     e.target.value
//                                   )}
//                                 />
//                               </div>
//                             </div>
//                           </div>
                          
//                           {/* Urgency Response */}
//                           <div className="space-y-3">
//                             <h4 className="text-sm font-medium text-gray-900">Urgency Requirements</h4>
//                             <div className="bg-gray-50 p-3 rounded-lg">
//                               <p className="text-sm text-gray-600">
//                                 {rfp.urgency?.value || rfp.urgency?.askedUrgency}
//                               </p>
//                             </div>
                            
//                             <div className="space-y-3 mt-4">
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                   Can you meet this timeline?
//                                 </label>
//                                 <CustomSelect
//                                   options={[
//                                     { value: "yes", label: "Yes, can meet timeline" },
//                                     { value: "partial", label: "Partially, phased approach" },
//                                     { value: "premium", label: "Yes, with expedited service" },
//                                     { value: "no", label: "No, timeline is too aggressive" }
//                                   ]}
//                                   onChange={(e) => handleUrgencyResponse(
//                                     rfp.id, 
//                                     e.target.value !== "no",
//                                     responses[rfp.id]?.urgency?.proposedTimeline || ""
//                                   )}
//                                 />
//                               </div>
                              
//                               <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                                   Your Proposed Timeline
//                                 </label>
//                                 <textarea
//                                   className="w-full min-h-[80px] rounded-lg border border-gray-200 p-2 text-sm"
//                                   placeholder="Detail your implementation timeline..."
//                                   onChange={(e) => handleUrgencyResponse(
//                                     rfp.id,
//                                     responses[rfp.id]?.urgency?.meetable !== undefined 
//                                       ? responses[rfp.id]?.urgency?.meetable 
//                                       : true,
//                                     e.target.value
//                                   )}
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </Section>
                      
//                       {/* Process Lifecycle Section */}
//                       {rfp.processLifecycle && Object.keys(rfp.processLifecycle).length > 0 && (
//                         <Section title="Process Lifecycle" icon={BarChart} defaultOpen={true}>
//                           <div className="space-y-4">
//                             <h4 className="text-sm font-medium text-gray-900">Client's Required Stages</h4>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                               {Object.entries(rfp.processLifecycle).map(([stage, details]) => (
//                                 <div key={stage} className="border border-gray-200 rounded-lg p-4">
//                                   <div className="flex items-start justify-between mb-3">
//                                     <h5 className="text-sm font-medium text-gray-900">{stage}</h5>
//                                     <StatusBadge status={details.selected ? "new" : "closed"} />
//                                   </div>
                                  
//                                   <div className="space-y-3 mt-4">
//                                     <div>
//                                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Available in your solution?
//                                       </label>
//                                       <CustomSelect
//                                         options={[
//                                           { value: "full", label: "Yes, full support" },
//                                           { value: "partial", label: "Partial support" },
//                                           { value: "premium", label: "Available as premium" },
//                                           { value: "roadmap", label: "On our roadmap" },
//                                           { value: "no", label: "Not available" }
//                                         ]}
//                                         onChange={(e) => handleLifecycleResponse(
//                                           rfp.id, 
//                                           stage, 
//                                           e.target.value !== "no",
//                                           responses[rfp.id]?.processLifecycle?.[stage]?.details || ""
//                                         )}
//                                       />
//                                     </div>
                                    
//                                     <div>
//                                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                                         Details
//                                       </label>
//                                       <textarea
//                                         className="w-full min-h-[80px] rounded-lg border border-gray-200 p-2 text-sm"
//                                         placeholder="Describe your capabilities for this stage..."
//                                         onChange={(e) => handleLifecycleResponse(
//                                           rfp.id,
//                                           stage,
//                                           responses[rfp.id]?.processLifecycle?.[stage]?.available !== undefined 
//                                             ? responses[rfp.id]?.processLifecycle?.[stage]?.available 
//                                             : true,
//                                           e.target.value
//                                         )}
//                                       />
//                                     </div>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </Section>
//                       )}
                      
//                       {/* Features Section */}
//                       {rfp.features && Object.keys(rfp.features).length > 0 && (
//                         <Section title="Features & Functionality" icon={CheckSquare} defaultOpen={true}>
//                           <div className="space-y-6">
//                             {Object.entries(rfp.features).map(([category, functionalities]) => (
//                               <div key={category} className="space-y-4">
//                                 <h4 className="text-sm font-medium text-gray-900">{category}</h4>
                                
//                                 {Object.entries(functionalities).map(([functionality, features]) => (
//                                   <div key={functionality} className="border border-gray-200 rounded-lg overflow-hidden">
//                                     <div 
//                                       className="bg-gray-50 p-3 cursor-pointer flex items-center justify-between"
//                                       onClick={() => setExpandedCategory(
//                                         expandedCategory === `${category}-${functionality}` 
//                                           ? null 
//                                           : `${category}-${functionality}`
//                                       )}
//                                     >
//                                       <span className="text-sm font-medium">{functionality}</span>
//                                       {expandedCategory === `${category}-${functionality}` ? 
//                                         <ChevronUp className="w-4 h-4 text-gray-500" /> : 
//                                         <ChevronDown className="w-4 h-4 text-gray-500" />
//                                       }
//                                     </div>
                                    
//                                     {expandedCategory === `${category}-${functionality}` && (
//                                       <div className="p-4 space-y-4">
//                                         {Object.entries(features).filter(([feature, details]) => 
//                                           feature !== 'selected' && typeof details === 'object'
//                                         ).map(([feature, details]) => (
//                                           <div key={feature} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
//                                             <div className="flex items-center justify-between mb-2">
//                                               <span className="text-sm">{feature}</span>
//                                               {details.selected !== undefined && (
//                                                 <StatusBadge status={details.selected ? "new" : "closed"} />
//                                               )}
//                                             </div>
                                            
//                                             <div className="space-y-3 mt-3">
//                                               <div>
//                                                 <label className="block text-xs font-medium text-gray-700 mb-1">
//                                                   Available in your solution?
//                                                 </label>
//                                                 <CustomSelect
//                                                   options={[
//                                                     { value: "full", label: "Yes, full support" },
//                                                     { value: "partial", label: "Partial support" },
//                                                     { value: "premium", label: "Available as premium" },
//                                                     { value: "roadmap", label: "On our roadmap" },
//                                                     { value: "no", label: "Not available" }
//                                                   ]}
//                                                   onChange={(e) => handleFeatureResponse(
//                                                     rfp.id,
//                                                     category,
//                                                     functionality,
//                                                     feature,
//                                                     e.target.value
//                                                   )}
//                                                 />
//                                               </div>
//                                             </div>
//                                           </div>
//                                         ))}
//                                       </div>
//                                     )}
//                                   </div>
//                                 ))}
//                               </div>
//                             ))}
//                           </div>
//                         </Section>
//                       )}
                      
//                       {/* Submit Button */}
//                       <div className="mt-8 pt-6 border-t border-gray-100">
//                         <button 
//                           className="w-full bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] text-white rounded-xl px-6 py-3 font-medium hover:from-[#1e2556] hover:to-[#6ab5dd] transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
//                           onClick={() => handleSubmit(rfp.id)}
//                         >
//                           <CheckCircle2 className="w-5 h-5" />
//                           Submit Response
//                         </button>
//                         <p className="text-center text-sm text-gray-500 mt-3">
//                           Please review all responses before submitting
//                         </p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               );
//             })()
//           ) : (
//             <CustomCard className="shadow-lg h-full flex items-center justify-center">
//               <div className="p-12 text-center">
//                 <PenLine className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//                 <h3 className="text-xl font-medium text-gray-900 mb-2">Select an RFP</h3>
//                 <p className="text-gray-500 max-w-md mx-auto">
//                   Choose an RFP from the list to view details and provide your response
//                 </p>
//               </div>
//             </CustomCard>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RfpMarketplacePage;
"use client"

import React, { useEffect, useState } from "react";
import { useAuth } from '@/context/authContext';
import { 
  RefreshCw, Box, ClipboardCheck, AlertTriangle, Building2, 
  Users, Settings, Clock, Wallet2, CheckCircle2, XCircle, 
  ChevronDown, ChevronUp, FileText, BarChart, ListFilter,
  CheckSquare, PenLine, Target, Hash, Filter
} from "lucide-react";

// Custom Card Component
const CustomCard = ({ children, className = "" }) => {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

// Custom Select Component
const CustomSelect = ({ options, value, onChange, className = "", placeholder = "Select" }) => {
  return (
    <div className="relative">
      <select
        value={value || ""}
        onChange={onChange}
        className={`w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};

// Tab Select Component (replaces dropdown with clickable tabs)
const TabSelect = ({ options, value, onChange, className = "" }) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange({ target: { value: option.value } })}
          className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
            value === option.value 
              ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
              : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

// Section Component with Collapsible functionality
const Section = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const Icon = icon;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
      <div 
        className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-indigo-500" />
          <h3 className="font-medium text-gray-900">{title}</h3>
        </div>
        {isOpen ? 
          <ChevronUp className="w-5 h-5 text-gray-500" /> : 
          <ChevronDown className="w-5 h-5 text-gray-500" />
        }
      </div>
      {isOpen && (
        <div className="p-4">
          {children}
        </div>
      )}
    </div>
  );
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const variants = {
    new: "bg-green-100 text-green-800 border-green-200",
    responded: "bg-blue-100 text-blue-800 border-blue-200",
    inProgress: "bg-yellow-100 text-yellow-800 border-yellow-200",
    closed: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const labels = {
    new: "New",
    responded: "Responded",
    inProgress: "In Progress",
    closed: "Closed",
  };

  return (
    <span 
      className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${variants[status] || variants.new}`}
    >
      {labels[status] || "New"}
    </span>
  );
};

// Form Field Row Component (new)
const FormFieldRow = ({ label, value, children, className = "" }) => {
  return (
    <div className={`flex flex-col md:flex-row items-start gap-4 mb-4 ${className}`}>
      <div className="w-full md:w-1/3 space-y-1">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">{value}</p>
        </div>
      </div>
      <div className="w-full md:w-2/3">
        {children}
      </div>
    </div>
  );
};

function RfpMarketplacePage() {
  const { vendorId, userType } = useAuth();
  const [rfps, setRfps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRfp, setSelectedRfp] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [orgTypeFilter, setOrgTypeFilter] = useState("");
  const [responses, setResponses] = useState({});
  const [respondedRfps, setRespondedRfps] = useState([]);
  
  // Get all categories and org types from RFPs for the filters
  const allCategories = [...new Set(rfps.map(rfp => rfp.selectedCategory))];
  const allOrgTypes = [...new Set(rfps.map(rfp => {
    const orgType = rfp.userOrgType?.value || rfp.userOrgType;
    return orgType;
  }))];
  
  // Filter RFPs by category and org type
  const filteredRfps = rfps.filter(rfp => {
    const matchesCategory = !categoryFilter || rfp.selectedCategory === categoryFilter;
    const orgType = rfp.userOrgType?.value || rfp.userOrgType;
    const matchesOrgType = !orgTypeFilter || orgType === orgTypeFilter;
    return matchesCategory && matchesOrgType;
  });

  // Fetch all RFPs 
  const fetchAllRfps = async () => {
    setRefreshing(true);
    try {
      // First fetch all RFPs
      const response = await fetch("/api/get-all-rfps", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      if (data.success) {
        setRfps(data.data);
        // If there are RFPs and none is selected, select the first one
        if (data.data.length > 0 && !selectedRfp) {
          setSelectedRfp(data.data[0].id);
        }
        
        // If vendor is logged in, fetch their responses
        if (vendorId) {
          fetchVendorResponses();
        }
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Failed to fetch RFPs:", err);
      setError("Failed to fetch RFPs");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  
  // Fetch vendor's responded RFPs
  const fetchVendorResponses = async () => {
    try {
      const response = await fetch("/api/get-vendor-responses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vendorId }),
      });

      const data = await response.json();

      if (data.success) {
        // Set list of RFP IDs that this vendor has already responded to
        setRespondedRfps(data.data.map(response => response.rfpId));
      }
    } catch (err) {
      console.error("Failed to fetch vendor responses:", err);
    }
  };

  useEffect(() => {
    fetchAllRfps();
  }, []);

  // Handle basic field response changes (organization type, team size, etc.)
  const handleBasicFieldResponse = (rfpId, field, value) => {
    setResponses(prev => ({
      ...prev,
      [rfpId]: {
        ...prev[rfpId],
        [field]: {
          ...prev[rfpId]?.[field],
          response: value,
          available: value !== "no"
        }
      }
    }));
  };

  // Handle process lifecycle responses
  const handleLifecycleResponse = (rfpId, stage, available, details = "") => {
    setResponses(prev => ({
      ...prev,
      [rfpId]: {
        ...prev[rfpId],
        processLifecycle: {
          ...prev[rfpId]?.processLifecycle,
          [stage]: {
            available,
            details
          }
        }
      }
    }));
  };

  // Handle feature responses
  const handleFeatureResponse = (rfpId, category, functionality, feature, response) => {
    setResponses(prev => ({
      ...prev,
      [rfpId]: {
        ...prev[rfpId],
        features: {
          ...prev[rfpId]?.features,
          [category]: {
            ...prev[rfpId]?.features?.[category],
            [functionality]: {
              ...prev[rfpId]?.features?.[category]?.[functionality],
              [feature]: {
                available: response !== "no",
                details: response
              }
            }
          }
        }
      }
    }));
  };

  // Handle budget response
  const handleBudgetResponse = (rfpId, meetable, amount, details = "") => {
    setResponses(prev => ({
      ...prev,
      [rfpId]: {
        ...prev[rfpId],
        budget: {
          meetable,
          quotedAmount: amount,
          pricingDetails: details
        }
      }
    }));
  };

  // Handle urgency response
  const handleUrgencyResponse = (rfpId, meetable, timeline = "") => {
    setResponses(prev => ({
      ...prev,
      [rfpId]: {
        ...prev[rfpId],
        urgency: {
          meetable,
          proposedTimeline: timeline
        }
      }
    }));
  };

  // Submit response for the selected RFP
  const handleSubmit = async (rfpId) => {
    if (!vendorId) {
      alert("You must be logged in as a vendor to submit responses.");
      return;
    }
    
    if (!responses[rfpId]) {
      alert("Please provide responses before submitting.");
      return;
    }

    try {
      const response = await fetch("/api/add-vendor-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rfpId,
          vendorId,
          responses: responses[rfpId]
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert("Response submitted successfully!");
        // Add this RFP to the list of responded RFPs
        setRespondedRfps(prev => [...prev, rfpId]);
        // Clear the response data for this RFP
        setResponses(prev => {
          const newResponses = { ...prev };
          delete newResponses[rfpId];
          return newResponses;
        });
      } else {
        alert(`Failed to submit response: ${data.message}`);
      }
    } catch (err) {
      console.error("Failed to submit response:", err);
      alert("Error submitting response");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <p className="text-gray-600 font-medium">Loading RFP Marketplace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <CustomCard className="max-w-lg w-full p-8 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Error Loading RFPs</h1>
          <p className="text-gray-600">{error}</p>
        </CustomCard>
      </div>
    );
  }

  // If no vendor ID is found
  if (!vendorId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <CustomCard className="max-w-lg w-full p-8 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">Authentication Required</h1>
          <p className="text-gray-600">Please log in as a vendor to view and respond to RFPs.</p>
        </CustomCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] bg-clip-text text-transparent">
            RFP Marketplace
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Browse and respond to client requests for proposals
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* Filter Buttons */}
          <div className="flex gap-2">
            <div className="relative min-w-[180px]">
              <CustomSelect
                options={allCategories.map(category => ({ value: category, label: category }))}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                placeholder="Filter by category"
                className="bg-white shadow-sm"
              />
            </div>
            <div className="relative min-w-[180px]">
              <CustomSelect
                options={allOrgTypes.map(type => ({ value: type, label: type }))}
                value={orgTypeFilter}
                onChange={(e) => setOrgTypeFilter(e.target.value)}
                placeholder="Filter by org type"
                className="bg-white shadow-sm"
              />
            </div>
            {(categoryFilter || orgTypeFilter) && (
              <button
                onClick={() => {
                  setCategoryFilter("");
                  setOrgTypeFilter("");
                }}
                className="p-2 text-gray-600 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                title="Clear filters"
              >
                <XCircle className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={fetchAllRfps}
            disabled={loading || refreshing}
            className="p-2 text-gray-600 hover:text-[#1e2556] rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh RFPs"
          >
            <RefreshCw 
              className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} 
            />
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RFPs List */}
        <div className="lg:col-span-1">
          <CustomCard className="shadow-lg h-full">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ListFilter className="w-5 h-5 text-[#1e2556]" />
                  <h2 className="text-lg font-semibold text-gray-900">Available RFPs</h2>
                </div>
                <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                  {filteredRfps.length} of {rfps.length}
                </span>
              </div>
              {(categoryFilter || orgTypeFilter) && (
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-500">Filtered by:</span>
                  {categoryFilter && (
                    <span className="px-2 py-1 bg-[#f5f7fa] text-[#1e2556] text-xs font-medium rounded flex items-center">
                      Category: {categoryFilter}
                    </span>
                  )}
                  {orgTypeFilter && (
                    <span className="px-2 py-1 bg-[#f5f7fa] text-[#1e2556] text-xs font-medium rounded flex items-center">
                      Organization: {orgTypeFilter}
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="divide-y divide-gray-100 max-h-[calc(100vh-250px)] overflow-y-auto">
              {filteredRfps.length === 0 ? (
                <div className="p-6 text-center">
                  <Box className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No RFPs Found</h3>
                  <p className="text-gray-500 text-sm">
                    {categoryFilter || orgTypeFilter
                      ? "No RFPs match your current filters"
                      : "There are currently no RFPs available"}
                  </p>
                </div>
              ) : (
                filteredRfps.map((rfp, index) => {
                  const hasResponded = respondedRfps.includes(rfp.id);
                  return (
                    <div 
                      key={rfp.id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedRfp === rfp.id ? 'bg-[#f5f7fa] border-l-4 border-[#1e2556]' : ''
                      } ${hasResponded ? 'opacity-70' : ''}`}
                      onClick={() => setSelectedRfp(rfp.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">
                          RFP #{filteredRfps.length - index}
                        </h3>
                        <StatusBadge status={hasResponded ? "responded" : "new"} />
                      </div>
                      
                      <div className="text-sm text-gray-500 mb-2">
                        {rfp.selectedCategory}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Building2 className="w-3 h-3 mr-1" />
                          {rfp.userOrgType?.value || rfp.userOrgType || "Unknown"}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          {rfp.userTeamSize?.value || rfp.userTeamSize || "Unknown"}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {rfp.urgency?.value || (rfp.urgency?.askedUrgency) || "Unknown"}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CustomCard>
        </div>

        {/* RFP Details and Response */}
        <div className="lg:col-span-2">
          {selectedRfp ? (
            (() => {
              const rfp = rfps.find(r => r.id === selectedRfp);
              const hasResponded = respondedRfps.includes(rfp.id);
              
              if (!rfp) return null;
              
              return (
                <div className="space-y-6">
                  {/* Header Card */}
                  <CustomCard className="shadow-lg">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-[#1e2556]">
                          {rfp.selectedCategory}
                        </h2>
                        <StatusBadge status={hasResponded ? "responded" : "new"} />
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Organization</p>
                          <p className="text-sm font-medium">{rfp.userOrgType?.value || rfp.userOrgType}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Team Size</p>
                          <p className="text-sm font-medium">{rfp.userTeamSize?.value || rfp.userTeamSize}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Urgency</p>
                          <p className="text-sm font-medium">{rfp.urgency?.value || rfp.urgency?.askedUrgency}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">Budget</p>
                          <p className="text-sm font-medium">
                            {rfp.budget?.value?.min || rfp.budget?.askedMin} - {rfp.budget?.value?.max || rfp.budget?.askedMax} {rfp.budget?.value?.currency || rfp.budget?.budgetUnit}
                          </p>
                        </div>
                      </div>
                      
                      {hasResponded && (
                        <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                          <p className="flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            You have already submitted a response to this RFP.
                          </p>
                        </div>
                      )}
                    </div>
                  </CustomCard>
                  
                  {hasResponded ? (
                    <CustomCard className="shadow-lg p-8 text-center">
                      <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-gray-900 mb-2">Response Submitted</h3>
                      <p className="text-gray-600 max-w-md mx-auto mb-4">
                        You have already submitted a response to this RFP. The client will review your proposal and may contact you for further discussion.
                      </p>
                      <button
                        className="mt-4 px-4 py-2 bg-[#1e2556] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                        onClick={() => setSelectedRfp(null)}
                      >
                        Browse other RFPs
                      </button>
                    </CustomCard>
                  ) : (
                    /* RFP Details and Response Section */
                    <div className="space-y-6">
                      {/* Project Details Section */}
                      <Section title="Project Details" icon={FileText} defaultOpen={true}>
                        {/* Key Problems */}
                        {(rfp.keyProblems?.value || rfp.keyProblems) && (
                          <FormFieldRow
                            label="Key Problems"
                            value={rfp.keyProblems?.value || rfp.keyProblems}
                          >
                            <div className="space-y-2">
                              <textarea
                                className="w-full min-h-[80px] rounded-lg border border-gray-200 p-2 text-sm"
                                placeholder="Explain how your solution addresses these problems..."
                                onChange={(e) => handleBasicFieldResponse(rfp.id, 'keyProblems', e.target.value)}
                              />
                            </div>
                          </FormFieldRow>
                        )}
                        
                        {/* Key Goals */}
                        {(rfp.keyGoals?.value || rfp.keyGoals) && (
                          <FormFieldRow
                            label="Key Goals"
                            value={rfp.keyGoals?.value || rfp.keyGoals}
                          >
                            <div className="space-y-2">
                              <textarea
                                className="w-full min-h-[80px] rounded-lg border border-gray-200 p-2 text-sm"
                                placeholder="Explain how your solution helps achieve these goals..."
                                onChange={(e) => handleBasicFieldResponse(rfp.id, 'keyGoals', e.target.value)}
                              />
                            </div>
                          </FormFieldRow>
                        )}
                        
                        {/* Customization Requirements */}
                        {(rfp.customisation?.value || rfp.customisation) && (
                          <FormFieldRow
                            label="Customization Requirements"
                            value={rfp.customisation?.value || rfp.customisation}
                          >
                            <div className="space-y-2">
                              <textarea
                                className="w-full min-h-[80px] rounded-lg border border-gray-200 p-2 text-sm"
                                placeholder="Explain your customization capabilities..."
                                onChange={(e) => handleBasicFieldResponse(rfp.id, 'customisation', e.target.value)}
                              />
                            </div>
                          </FormFieldRow>
                        )}
                      </Section>
                      
                      {/* Budget & Timeline Section */}
                      <Section title="Budget & Timeline" icon={Clock} defaultOpen={true}>
                        {/* Budget Response */}
                        <FormFieldRow
                          label="Budget Requirements"
                          value={`${rfp.budget?.value?.min || rfp.budget?.askedMin} - ${rfp.budget?.value?.max || rfp.budget?.askedMax} ${rfp.budget?.value?.currency || rfp.budget?.budgetUnit}`}
                        >
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Can you meet this budget?
                              </label>
                              <TabSelect
                                options={[
                                  { value: "yes", label: "Yes, within budget" },
                                  { value: "partial", label: "Partially, with limitations" },
                                  { value: "premium", label: "Yes, but premium pricing" },
                                  { value: "no", label: "No, budget is too low" }
                                ]}
                                value={responses[rfp.id]?.budget?.meetable === false ? "no" : responses[rfp.id]?.budget?.meetable === true ? "yes" : ""}
                                onChange={(e) => handleBudgetResponse(
                                  rfp.id, 
                                  e.target.value !== "no", 
                                  responses[rfp.id]?.budget?.quotedAmount || ""
                                )}
                              />
                            </div>
                            
                            <div className="flex gap-4">
                              <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Your Quoted Amount
                                </label>
                                <div className="flex">
                                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-200 bg-gray-50 text-gray-500 text-sm">
                                    {rfp.budget?.value?.currency || rfp.budget?.budgetUnit}
                                  </span>
                                  <input
                                    type="text"
                                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-200 text-sm"
                                    placeholder="Enter amount"
                                    onChange={(e) => handleBudgetResponse(
                                      rfp.id,
                                      responses[rfp.id]?.budget?.meetable !== undefined 
                                        ? responses[rfp.id]?.budget?.meetable 
                                        : true,
                                      e.target.value
                                    )}
                                  />
                                </div>
                              </div>
                              
                              <div className="w-1/2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Pricing Details
                                </label>
                                <textarea
                                  className="w-full min-h-[40px] rounded-lg border border-gray-200 p-2 text-sm"
                                  placeholder="Explain your pricing structure..."
                                  onChange={(e) => handleBudgetResponse(
                                    rfp.id,
                                    responses[rfp.id]?.budget?.meetable !== undefined 
                                      ? responses[rfp.id]?.budget?.meetable 
                                      : true,
                                    responses[rfp.id]?.budget?.quotedAmount || "",
                                    e.target.value
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </FormFieldRow>
                        
                        {/* Urgency Response */}
                        <FormFieldRow
                          label="Urgency Requirements"
                          value={rfp.urgency?.value || rfp.urgency?.askedUrgency}
                        >
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Can you meet this timeline?
                              </label>
                              <TabSelect
                                options={[
                                  { value: "yes", label: "Yes, can meet timeline" },
                                  { value: "partial", label: "Partially, phased approach" },
                                  { value: "premium", label: "Yes, with expedited service" },
                                  { value: "no", label: "No, timeline is too aggressive" }
                                ]}
                                value={responses[rfp.id]?.urgency?.meetable === false ? "no" : responses[rfp.id]?.urgency?.meetable === true ? "yes" : ""}
                                onChange={(e) => handleUrgencyResponse(
                                  rfp.id, 
                                  e.target.value !== "no",
                                  responses[rfp.id]?.urgency?.proposedTimeline || ""
                                )}
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Proposed Timeline
                              </label>
                              <textarea
                                className="w-full min-h-[80px] rounded-lg border border-gray-200 p-2 text-sm"
                                placeholder="Detail your implementation timeline..."
                                onChange={(e) => handleUrgencyResponse(
                                  rfp.id,
                                  responses[rfp.id]?.urgency?.meetable !== undefined 
                                    ? responses[rfp.id]?.urgency?.meetable 
                                    : true,
                                  e.target.value
                                )}
                              />
                            </div>
                          </div>
                        </FormFieldRow>
                      </Section>
                      
                      {/* Process Lifecycle Section */}
                      {rfp.processLifecycle && Object.keys(rfp.processLifecycle).length > 0 && (
                        <Section title="Process Lifecycle" icon={BarChart} defaultOpen={true}>
                          <div className="space-y-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-4">Client's Required Stages</h4>
                            
                            {Object.entries(rfp.processLifecycle).map(([stage, details]) => (
                              <FormFieldRow
                                key={stage}
                                label={stage}
                                value={details.selected ? "Required" : "Optional"}
                              >
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Available in your solution?
                                    </label>
                                    <TabSelect
                                      options={[
                                        { value: "full", label: "Yes, full support" },
                                        { value: "partial", label: "Partial support" },
                                        { value: "premium", label: "Available as premium" },
                                        { value: "roadmap", label: "On our roadmap" },
                                        { value: "no", label: "Not available" }
                                      ]}
                                      value={responses[rfp.id]?.processLifecycle?.[stage]?.available === false ? "no" : responses[rfp.id]?.processLifecycle?.[stage]?.available === true ? "full" : ""}
                                      onChange={(e) => handleLifecycleResponse(
                                        rfp.id, 
                                        stage, 
                                        e.target.value !== "no",
                                        responses[rfp.id]?.processLifecycle?.[stage]?.details || ""
                                      )}
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                      Details
                                    </label>
                                    <textarea
                                      className="w-full min-h-[80px] rounded-lg border border-gray-200 p-2 text-sm"
                                      placeholder="Describe your capabilities for this stage..."
                                      onChange={(e) => handleLifecycleResponse(
                                        rfp.id,
                                        stage,
                                        responses[rfp.id]?.processLifecycle?.[stage]?.available !== undefined 
                                          ? responses[rfp.id]?.processLifecycle?.[stage]?.available 
                                          : true,
                                        e.target.value
                                      )}
                                    />
                                  </div>
                                </div>
                              </FormFieldRow>
                            ))}
                          </div>
                        </Section>
                      )}
                      
                      {/* Features Section - All expanded by default */}
                      {rfp.features && Object.keys(rfp.features).length > 0 && (
                        <Section title="Features & Functionality" icon={CheckSquare} defaultOpen={true}>
                          <div className="space-y-6">
                            {Object.entries(rfp.features).map(([category, functionalities]) => (
                              <div key={category} className="space-y-4">
                                <h4 className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">{category}</h4>
                                
                                {Object.entries(functionalities).map(([functionality, features]) => (
                                  <div key={functionality} className="border border-gray-200 rounded-lg p-4 mb-4">
                                    <h5 className="text-sm font-medium text-gray-900 mb-4 border-b border-gray-100 pb-2">{functionality}</h5>
                                    
                                    <div className="space-y-4">
                                      {Object.entries(features).filter(([feature, details]) => 
                                        feature !== 'selected' && typeof details === 'object'
                                      ).map(([feature, details]) => (
                                        <FormFieldRow
                                          key={feature}
                                          label={feature}
                                          value={details.selected ? "Required" : "Optional"}
                                          className="pb-3 border-b border-gray-100 last:border-b-0 last:pb-0"
                                        >
                                          <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                              Available in your solution?
                                            </label>
                                            <TabSelect
                                              options={[
                                                { value: "full", label: "Yes, full support" },
                                                { value: "partial", label: "Partial support" },
                                                { value: "premium", label: "Available as premium" },
                                                { value: "roadmap", label: "On our roadmap" },
                                                { value: "no", label: "Not available" }
                                              ]}
                                              value={responses[rfp.id]?.features?.[category]?.[functionality]?.[feature]?.available === false ? "no" : responses[rfp.id]?.features?.[category]?.[functionality]?.[feature]?.available === true ? "full" : ""}
                                              onChange={(e) => handleFeatureResponse(
                                                rfp.id,
                                                category,
                                                functionality,
                                                feature,
                                                e.target.value
                                              )}
                                            />
                                          </div>
                                        </FormFieldRow>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </Section>
                      )}
                      
                      {/* Submit Button */}
                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <button 
                          className="w-full bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] text-white rounded-xl px-6 py-3 font-medium hover:from-[#1e2556] hover:to-[#6ab5dd] transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                          onClick={() => handleSubmit(rfp.id)}
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          Submit Response
                        </button>
                        <p className="text-center text-sm text-gray-500 mt-3">
                          Please review all responses before submitting
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()
          ) : (
            <CustomCard className="shadow-lg h-full flex items-center justify-center">
              <div className="p-12 text-center">
                <PenLine className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Select an RFP</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Choose an RFP from the list to view details and provide your response
                </p>
              </div>
            </CustomCard>
          )}
        </div>
      </div>
    </div>
  );
}

export default RfpMarketplacePage;