
// "use client"

// import React, { useState, useEffect } from 'react';
// import { FileText, RefreshCw, Award, Clock, DollarSign, Users, ChevronDown, ChevronUp } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';



// import {  Calendar, User, Building, Target } from 'lucide-react';




// import {  BarChart3, CheckCircle2,  } from 'lucide-react';


// import {  Gem,  } from 'lucide-react';

// const RfpCard = ({ rfp, index }) => {
//   const [activeTab, setActiveTab] = useState('overview');

//   const getScoreBadgeColor = (score) => {
//     if (score >= 90) return 'bg-gradient-to-r from-emerald-500 to-teal-500';
//     if (score >= 70) return 'bg-gradient-to-r from-blue-500 to-indigo-500';
//     return 'bg-gradient-to-r from-amber-500 to-orange-500';
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
//       {/* Card Header */}
//       <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-indigo-50">
//         <div className="flex items-center gap-4">
//           <div className="relative">
//             <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg ">
//               #{index + 1}
//             </div>
//             <div className="w-14 h-14 rounded-2xl bg-violet-500/10 absolute -top-1 -left-1 -z-10"></div>
//           </div>
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900">RFP {rfp.basicDetails.title || `#${index + 1}`}</h3>
//             <p className="text-sm text-gray-500">{rfp.vendorResponses?.length || 0} vendor responses</p>
//           </div>
//         </div>

//         <div className="flex gap-2 bg-white p-1 rounded-xl shadow-md">
//           {['overview', 'vendors'].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
//                 activeTab === tab
//                   ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-md transform scale-105'
//                   : 'text-gray-600 hover:bg-gray-50'
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Tab Content */}
//       <div className="p-6">
//         {activeTab === 'overview' ? (
//           <div className="grid grid-cols-3 gap-6">
//             {Object.entries(rfp.basicDetails).map(([key, value], index) => (
//               <div key={key} className="group relative">
//                 <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 rounded-2xl transform -rotate-2 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
//                 <div className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-sm group-hover:shadow-md transition-all duration-300">
//                   <div className="bg-gradient-to-br from-violet-50 to-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
//                     <BarChart3 className="w-6 h-6 text-indigo-600" />
//                   </div>
//                   <h4 className="text-sm font-medium text-gray-500 mb-2">{key}</h4>
//                   <p className="text-lg font-semibold text-gray-900">{value || 'Not specified'}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 gap-6">
//             {rfp.vendorResponses?.map((vendor, vendorIndex) => (
//               <div key={vendorIndex} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
//                 {/* Vendor Header */}
//                 <div className="p-6 bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="relative">
//                       <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
//                         {vendor.vendorName.charAt(0)}
//                       </div>
//                       <div className="w-12 h-12 rounded-xl bg-violet-500/10 absolute -top-1 -left-1 -z-10"></div>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">{vendor.vendorName}</h3>
//                       <div className="flex items-center gap-2">
//                         <Gem className="w-4 h-4 text-violet-600" />
//                         <span className="text-sm text-gray-600">Vendor Response</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className={`px-4 py-2 rounded-lg text-white font-semibold ${getScoreBadgeColor(vendor.score)}`}>
//                     {vendor.score}
//                   </div>
//                 </div>

//                 {/* Vendor Content */}
//                 <div className="p-6">
//                   <div className="grid gap-6">
//                     {/* Urgency & Budget Response */}
//                     <div className="grid grid-cols-2 gap-6">
//                       <div className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50">
//                         <div className="flex items-center gap-2 mb-3">
//                           <Clock className="w-5 h-5 text-violet-600" />
//                           <h4 className="font-semibold text-gray-900">Urgency Response</h4>
//                         </div>
//                         <p className="text-gray-700">{vendor.urgencyResponse || 'No response provided'}</p>
//                       </div>

//                       <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
//                         <div className="flex items-center gap-2 mb-3">
//                           <DollarSign className="w-5 h-5 text-emerald-600" />
//                           <h4 className="font-semibold text-gray-900">Budget Response</h4>
//                         </div>
//                         <p className="text-gray-700">{vendor.budgetResponse || 'No response provided'}</p>
//                       </div>
//                     </div>

//                     {/* Feature Responses */}
//                     {vendor.featureResponses?.length > 0 && (
//                       <div>
//                         <div className="flex items-center gap-2 mb-4">
//                           <Target className="w-5 h-5 text-indigo-600" />
//                           <h4 className="font-semibold text-gray-900">Feature Responses</h4>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                           {vendor.featureResponses.map((feature, idx) => (
//                             <div
//                               key={idx}
//                               className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300"
//                             >
//                               <h5 className="font-medium text-gray-900 mb-2">{feature.feature}</h5>
//                               <p className="text-gray-700">{feature.response || 'No response'}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };


// const RfpPage = ({ userId }) => {
//   const [rfpData, setRfpData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const fetchRFPData = async () => {
//     if (!userId) return;
    
//     setLoading(true);
//     try {
//       const response = await fetch('/api/get-rfp-data-by-user', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ userId }),
//       });
//       const result = await response.json();
//       if (result.success) {
//         setRfpData(result.data);
//       }
//     } catch (err) {
//       console.error('Failed to fetch RFP data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (mounted && userId) {
//       fetchRFPData();
//     }
//   }, [userId, mounted]);

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchRFPData();
//     setTimeout(() => setIsRefreshing(false), 500);
//   };

//   if (!mounted) return null;

//   return (
//     <div className="min-h-screen p-6 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-indigo-50/20">
//       {/* Header */}
//       <div className="max-w-5xl mx-auto mb-8">
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-center gap-3">
//             <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg">
//               <FileText className="w-6 h-6" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">My RFPs</h1>
//               <p className="text-sm text-gray-600">
//                 {rfpData.length} RFPs available
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={handleRefresh}
//             disabled={loading || isRefreshing}
//             className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <RefreshCw 
//               className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : 'transform transition-transform hover:rotate-180 duration-500'}`} 
//             />
//           </button>
//         </div>
//       </div>

//       {/* RFP List */}
//       <div className="max-w-5xl mx-auto space-y-6">
//         {loading ? (
//           // Loading skeleton
//           [...Array(2)].map((_, i) => (
//             <Card key={i} className="animate-pulse">
//               <CardContent className="p-6">
//                 <div className="flex gap-6">
//                   <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
//                   <div className="flex-1">
//                     <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="h-24 bg-gray-200 rounded"></div>
//                       <div className="h-24 bg-gray-200 rounded"></div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))
//         ) : rfpData.length === 0 ? (
//           <Card className="border-dashed border-2">
//             <CardContent className="p-12 text-center">
//               <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
//                 <FileText className="w-10 h-10 text-white" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 No RFPs available
//               </h3>
//               <p className="text-gray-500 mb-6">
//                 There are currently no RFPs assigned to you
//               </p>
//             </CardContent>
//           </Card>
//         ) : (
//           rfpData.map((rfp, index) => (
//             <RfpCard key={index} rfp={rfp} index={index} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default RfpPage;
"use client"

import React, { useState, useEffect } from 'react';
import { 
  FileText, RefreshCw, Award, Clock, DollarSign, Users, ChevronDown, ChevronUp,
  Calendar, User, Building, Target, Check, X, BarChart3, CheckCircle2, Gem, 
  MessageCircle, Briefcase, PieChart, CreditCard
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Expandable Section Component
const ExpandableSection = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm mb-6">
      <div 
        className="p-4 bg-gradient-to-r from-gray-50 to-indigo-50 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        {isOpen ? 
          <ChevronUp className="w-5 h-5 text-gray-600" /> : 
          <ChevronDown className="w-5 h-5 text-gray-600" />
        }
      </div>
      {isOpen && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

// Badge Component
const Badge = ({ children, color = "indigo" }) => {
  const colors = {
    indigo: "bg-indigo-100 text-indigo-800",
    green: "bg-green-100 text-green-800",
    yellow: "bg-yellow-100 text-yellow-800",
    red: "bg-red-100 text-red-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800"
  };
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>
      {children}
    </span>
  );
};

// Response Status Component
const ResponseStatus = ({ available }) => {
  if (available === undefined) return null;
  
  return available ? (
    <span className="flex items-center text-green-600">
      <Check className="w-4 h-4 mr-1" />
      Available
    </span>
  ) : (
    <span className="flex items-center text-red-600">
      <X className="w-4 h-4 mr-1" />
      Unavailable
    </span>
  );
};

const RfpCard = ({ rfp, index }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get appropriate color for score badge
  const getScoreBadgeColor = (score) => {
    const scoreNum = parseFloat(score);
    if (scoreNum >= 90) return 'bg-gradient-to-r from-emerald-500 to-teal-500';
    if (scoreNum >= 70) return 'bg-gradient-to-r from-blue-500 to-indigo-500';
    return 'bg-gradient-to-r from-amber-500 to-orange-500';
  };

  // Format currency with budget
  const formatBudget = (min, max, currency = 'USD') => {
    return `${currency} ${min} - ${max}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Card Header */}
      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-indigo-50">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg ">
              #{index + 1}
            </div>
            <div className="w-14 h-14 rounded-2xl bg-violet-500/10 absolute -top-1 -left-1 -z-10"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{rfp.basicDetails.category || `RFP #${index + 1}`}</h3>
            <p className="text-sm text-gray-500">{rfp.vendorResponses?.length || 0} vendor responses</p>
          </div>
        </div>

        <div className="flex gap-2 bg-white p-1 rounded-xl shadow-md">
          {['overview', 'vendors'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-md transform scale-105'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'overview' ? (
          <div className="space-y-6">
            {/* Basic Details */}
            <ExpandableSection title="Basic Details" icon={FileText} defaultOpen={true}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Building className="w-5 h-5 text-indigo-600" />
                    <h4 className="font-medium text-gray-900">Organization</h4>
                  </div>
                  <p className="text-gray-800">{rfp.basicDetails.orgType}</p>
                  <p className="text-sm text-gray-500 mt-1">Team size: {rfp.basicDetails.teamSize}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <h4 className="font-medium text-gray-900">Budget</h4>
                  </div>
                  <p className="text-gray-800">
                    {formatBudget(
                      rfp.basicDetails.budgetMin, 
                      rfp.basicDetails.budgetMax,
                      rfp.basicDetails.budgetCurrency
                    )}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-indigo-600" />
                    <h4 className="font-medium text-gray-900">Urgency</h4>
                  </div>
                  <p className="text-gray-800">{rfp.basicDetails.urgency}</p>
                </div>
              </div>
            </ExpandableSection>
            
            {/* Project Goals & Problems */}
            <ExpandableSection title="Project Details" icon={Target} defaultOpen={true}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Key Problems</h4>
                  <p className="text-gray-700">{rfp.basicDetails.keyProblems}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Key Goals</h4>
                  <p className="text-gray-700">{rfp.basicDetails.keyGoals}</p>
                </div>
              </div>
              
              {rfp.basicDetails.customisation && rfp.basicDetails.customisation !== 'N/A' && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Customization Requirements</h4>
                  <p className="text-gray-700">{rfp.basicDetails.customisation}</p>
                </div>
              )}
            </ExpandableSection>
            
            {/* Process Lifecycle */}
            {rfp.lifecycleStages && rfp.lifecycleStages.length > 0 && (
              <ExpandableSection title="Process Lifecycle" icon={PieChart} defaultOpen={false}>
                <div className="flex flex-wrap gap-2">
                  {rfp.lifecycleStages.map((stage, idx) => (
                    <Badge key={idx} color="indigo">
                      {stage}
                    </Badge>
                  ))}
                </div>
              </ExpandableSection>
            )}
            
            {/* Selected Features */}
            {Object.keys(rfp.selectedFeatures || {}).length > 0 && (
              <ExpandableSection title="Selected Features" icon={CheckCircle2} defaultOpen={false}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(rfp.selectedFeatures).map((featureKey, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">{featureKey}</p>
                    </div>
                  ))}
                </div>
              </ExpandableSection>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {rfp.vendorResponses?.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Vendor Responses Yet</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Vendors haven't submitted any responses to this RFP yet. Check back later.
                </p>
              </div>
            ) : (
              rfp.vendorResponses.map((vendor, vendorIndex) => (
                <div key={vendorIndex} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                  {/* Vendor Header */}
                  <div className="p-6 bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                          {(vendor.vendorName || 'V').charAt(0)}
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-violet-500/10 absolute -top-1 -left-1 -z-10"></div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{vendor.vendorName}</h3>
                        <div className="flex items-center gap-2">
                          <Gem className="w-4 h-4 text-violet-600" />
                          <span className="text-sm text-gray-600">Vendor Response</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-4 py-2 rounded-lg text-white font-semibold ${getScoreBadgeColor(vendor.score)}`}>
                      {typeof vendor.score === 'number' ? `${vendor.score.toFixed(0)}%` : vendor.score}
                    </div>
                  </div>

                  {/* Vendor Content */}
                  <div className="p-6">
                    <div className="space-y-6">
                      {/* Basic Responses */}
                      <div className="grid grid-cols-2 gap-6">
                        {/* Urgency Response */}
                        <div className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50">
                          <div className="flex items-center gap-2 mb-3">
                            <Clock className="w-5 h-5 text-violet-600" />
                            <h4 className="font-semibold text-gray-900">Urgency Response</h4>
                          </div>
                          {vendor.urgencyResponse ? (
                            typeof vendor.urgencyResponse === 'object' ? (
                              <div>
                                <div className="flex items-center mb-2">
                                  <ResponseStatus available={vendor.urgencyResponse.meetable} />
                                </div>
                                {vendor.urgencyResponse.timeline && (
                                  <p className="text-gray-700 mt-2">{vendor.urgencyResponse.timeline}</p>
                                )}
                              </div>
                            ) : (
                              <p className="text-gray-700">{vendor.urgencyResponse}</p>
                            )
                          ) : (
                            <p className="text-gray-500 italic">No response provided</p>
                          )}
                        </div>

                        {/* Budget Response */}
                        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50">
                          <div className="flex items-center gap-2 mb-3">
                            <DollarSign className="w-5 h-5 text-emerald-600" />
                            <h4 className="font-semibold text-gray-900">Budget Response</h4>
                          </div>
                          {vendor.budgetResponse ? (
                            typeof vendor.budgetResponse === 'object' ? (
                              <div>
                                <div className="flex items-center mb-2">
                                  <ResponseStatus available={vendor.budgetResponse.meetable} />
                                </div>
                                {vendor.budgetResponse.amount && (
                                  <p className="text-gray-700 font-medium mt-2">
                                    Quoted: {rfp.basicDetails.budgetCurrency} {vendor.budgetResponse.amount}
                                  </p>
                                )}
                                {vendor.budgetResponse.details && (
                                  <p className="text-gray-700 mt-2">{vendor.budgetResponse.details}</p>
                                )}
                              </div>
                            ) : (
                              <p className="text-gray-700">{vendor.budgetResponse}</p>
                            )
                          ) : (
                            <p className="text-gray-500 italic">No response provided</p>
                          )}
                        </div>
                      </div>
                      
                      {/* Project Details Responses */}
                      {(vendor.problemsResponse || vendor.goalsResponse || vendor.customizationResponse) && (
                        <ExpandableSection title="Project Details Responses" icon={Target} defaultOpen={false}>
                          <div className="space-y-4">
                            {vendor.problemsResponse && (
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h5 className="font-medium text-gray-900 mb-2">Problems Response</h5>
                                <p className="text-gray-700">{vendor.problemsResponse}</p>
                              </div>
                            )}
                            
                            {vendor.goalsResponse && (
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h5 className="font-medium text-gray-900 mb-2">Goals Response</h5>
                                <p className="text-gray-700">{vendor.goalsResponse}</p>
                              </div>
                            )}
                            
                            {vendor.customizationResponse && (
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h5 className="font-medium text-gray-900 mb-2">Customization Response</h5>
                                <p className="text-gray-700">{vendor.customizationResponse}</p>
                              </div>
                            )}
                          </div>
                        </ExpandableSection>
                      )}
                      
                      {/* Process Lifecycle Responses */}
                      {vendor.processLifecycleResponses && vendor.processLifecycleResponses.length > 0 && (
                        <ExpandableSection title="Process Lifecycle Responses" icon={PieChart} defaultOpen={false}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {vendor.processLifecycleResponses.map((response, idx) => (
                              <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                                <h5 className="font-medium text-gray-900 mb-2">{response.stage}</h5>
                                <div className="flex items-center mb-2">
                                  <ResponseStatus available={response.available} />
                                </div>
                                {response.details && (
                                  <p className="text-sm text-gray-700 mt-2">{response.details}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </ExpandableSection>
                      )}

                      {/* Feature Responses */}
                      {vendor.featureResponses && vendor.featureResponses.length > 0 && (
                        <ExpandableSection title="Feature Responses" icon={CheckCircle2} defaultOpen={true}>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {vendor.featureResponses.map((feature, idx) => (
                              <div
                                key={idx}
                                className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                              >
                                <h5 className="font-medium text-gray-900 mb-2">{feature.feature}</h5>
                                <div className="flex items-center mb-2">
                                  <ResponseStatus available={feature.available} />
                                </div>
                                {feature.details && (
                                  <p className="text-sm text-gray-700 mt-2">{feature.details}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </ExpandableSection>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const RfpPage = ({ userId }) => {
  const [rfpData, setRfpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchRFPData = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/get-rfp-data-by-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const result = await response.json();
      if (result.success) {
        setRfpData(result.data);
      }
    } catch (err) {
      console.error('Failed to fetch RFP data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted && userId) {
      fetchRFPData();
    }
  }, [userId, mounted]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchRFPData();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen p-6 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-indigo-50/20">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My RFPs</h1>
              <p className="text-sm text-gray-600">
                {rfpData.length} RFPs available
              </p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw 
              className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : 'transform transition-transform hover:rotate-180 duration-500'}`} 
            />
          </button>
        </div>
      </div>

      {/* RFP List */}
      <div className="max-w-5xl mx-auto space-y-6">
        {loading ? (
          // Loading skeleton
          [...Array(2)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-gray-200 rounded"></div>
                      <div className="h-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : rfpData.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <FileText className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No RFPs available
              </h3>
              <p className="text-gray-500 mb-6">
                There are currently no RFPs assigned to you
              </p>
            </CardContent>
          </Card>
        ) : (
          rfpData.map((rfp, index) => (
            <RfpCard key={index} rfp={rfp} index={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default RfpPage;