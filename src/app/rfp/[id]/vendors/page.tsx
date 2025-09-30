// // app/rfp/[id]/vendors/page.jsx
// 'use client'
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Link from 'next/link';
// import { ArrowLeft, ExternalLink, Star, DollarSign, Users, MapPin, CheckCircle, Target, FileText } from 'lucide-react';

// const VendorsPage = () => {
//   const params = useParams();
//   const rfpId = params.id;
//   const [rfpData, setRfpData] = useState(null);
//   const [vendors, setVendors] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchVendorsData();
//   }, [rfpId]);

//   const fetchVendorsData = async () => {
//     try {
//       // First get RFP data to check if vendors are matched
//       const rfpResponse = await fetch(`/api/rfp/${rfpId}`);
//       const rfpResult = await rfpResponse.json();
      
//       if (!rfpResult.success) {
//         setError('RFP not found');
//         return;
//       }

//       setRfpData(rfpResult.data);

//       if (!rfpResult.data.vendors || rfpResult.data.vendors.length === 0) {
//         setError('No vendors matched yet. Please run vendor matching first.');
//         return;
//       }

//       // Get vendor details
//       const vendorsResponse = await fetch('/api/vendors/details', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           vendorIds: rfpResult.data.vendors
//         })
//       });

//       const vendorsResult = await vendorsResponse.json();
      
//       if (vendorsResult.success) {
//         setVendors(vendorsResult.data);
//       } else {
//         setError('Failed to load vendor details');
//       }

//     } catch (error) {
//       console.error('Error fetching vendors:', error);
//       setError('Failed to load vendors');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getPricingTierDisplay = (tier) => {
//     const tiers = {
//       'BUDGET': { label: 'Budget', symbol: '$', color: 'text-green-600' },
//       'MID_RANGE': { label: 'Mid-Range', symbol: '$$', color: 'text-blue-600' },
//       'PREMIUM': { label: 'Premium', symbol: '$$$', color: 'text-purple-600' },
//       'ENTERPRISE': { label: 'Enterprise', symbol: '$$$+', color: 'text-red-600' }
//     };
//     return tiers[tier] || { label: tier, symbol: '$', color: 'text-gray-600' };
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 pt-16">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <div className="flex items-center justify-center min-h-[400px]">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7cc6ee] mx-auto mb-4"></div>
//               <p className="text-[#334155]">Loading your matched vendors...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 pt-16">
//         <div className="max-w-6xl mx-auto px-4 py-8">
//           <div className="flex items-center justify-center min-h-[400px]">
//             <div className="text-center">
//               <div className="bg-white rounded-lg shadow-sm p-8">
//                 <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                 <h2 className="text-2xl font-bold text-[#1e2556] mb-4">{error}</h2>
//                 <div className="space-y-3">
//                   <Link
//                     href={`/rfp/${rfpId}`}
//                     className="inline-flex items-center px-6 py-3 bg-[#1e2556] text-white rounded-lg hover:bg-opacity-90 transition-all duration-200"
//                   >
//                     <ArrowLeft className="w-5 h-5 mr-2" />
//                     Back to RFP
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pt-16">
//       <div className="max-w-6xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
//           <div>
//             <div className="flex items-center mb-2">
//               <Link
//                 href={`/rfp/${rfpId}`}
//                 className="mr-4 p-2 text-[#334155] hover:text-[#1e2556] hover:bg-gray-100 rounded-lg transition-all duration-200"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </Link>
//               <h1 className="text-2xl lg:text-3xl font-bold text-[#1e2556]">
//                 Your RFP Has Been Sent
//               </h1>
//             </div>
//             <p className="text-[#334155] ml-14 lg:ml-14">
//               We've matched your requirements with the top 5 legal software vendors
//             </p>
//           </div>
//           <div className="bg-white rounded-lg shadow-sm p-4 lg:w-auto w-full">
//             <div className="flex items-center">
//               <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
//               <span className="text-sm font-medium text-green-600">
//                 {vendors.length} Vendors Matched
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* RFP Summary Card */}
//         {rfpData && (
//           <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
//             <h3 className="text-lg font-semibold text-[#1e2556] mb-4">RFP Summary</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//               <div>
//                 <span className="text-[#334155] font-medium">Category:</span>
//                 <p className="text-[#2d2d2d]">{rfpData.category}</p>
//               </div>
//               <div>
//                 <span className="text-[#334155] font-medium">Team Type:</span>
//                 <p className="text-[#2d2d2d]">{rfpData.teamType}</p>
//               </div>
//               <div>
//                 <span className="text-[#334155] font-medium">Timeline:</span>
//                 <p className="text-[#2d2d2d]">{rfpData.requirementUrgency}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Vendors Grid */}
//         <div className="space-y-6">
//           <h2 className="text-xl font-semibold text-[#1e2556]">Recommended Vendors</h2>
          
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {vendors.map((vendor, index) => {
//               const pricingInfo = getPricingTierDisplay(vendor.pricingTier);
              
//               return (
//                 <div key={vendor.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
//                   {/* Ranking Badge */}
//                   <div className="bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] text-white px-4 py-2">
//                     <div className="flex items-center justify-between">
//                       <span className="font-semibold">#{index + 1} Best Match</span>
//                       <Target className="w-4 h-4" />
//                     </div>
//                   </div>

//                   <div className="p-6">
//                     {/* Header */}
//                     <div className="flex items-start justify-between mb-4">
//                       <div className="flex items-center">
//                         {vendor.logoUrl && (
//                           <img 
//                             src={vendor.logoUrl} 
//                             alt={`${vendor.companyName} logo`}
//                             className="w-12 h-12 rounded-lg object-contain mr-4 bg-gray-50 p-2"
//                           />
//                         )}
//                         <div>
//                           <h3 className="text-lg font-semibold text-[#1e2556]">
//                             {vendor.productName}
//                           </h3>
//                           <p className="text-[#334155] text-sm">{vendor.companyName}</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div className={`font-semibold ${pricingInfo.color}`}>
//                           {pricingInfo.symbol}
//                         </div>
//                         <div className="text-xs text-[#334155]">
//                           {pricingInfo.label}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Description */}
//                     <p className="text-[#2d2d2d] text-sm mb-4 line-clamp-3">
//                       {vendor.description}
//                     </p>

//                     {/* Key Features */}
//                     {vendor.bestKnownFor && vendor.bestKnownFor.length > 0 && (
//                       <div className="mb-4">
//                         <h4 className="text-sm font-medium text-[#1e2556] mb-2">Best Known For:</h4>
//                         <div className="flex flex-wrap gap-2">
//                           {vendor.bestKnownFor.slice(0, 3).map((feature, i) => (
//                             <span 
//                               key={i}
//                               className="px-2 py-1 bg-blue-50 text-[#1e2556] text-xs rounded-md"
//                             >
//                               {feature}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Use Cases */}
//                     {vendor.topUseCases && vendor.topUseCases.length > 0 && (
//                       <div className="mb-4">
//                         <h4 className="text-sm font-medium text-[#1e2556] mb-2">Top Use Cases:</h4>
//                         <ul className="text-xs text-[#334155] space-y-1">
//                           {vendor.topUseCases.slice(0, 2).map((useCase, i) => (
//                             <li key={i} className="flex items-start">
//                               <span className="w-1 h-1 bg-[#7cc6ee] rounded-full mt-2 mr-2 flex-shrink-0"></span>
//                               {useCase}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}

//                     {/* Pricing Info */}
//                     {vendor.startingPrice && (
//                       <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//                         <div className="flex items-center text-sm">
//                           <DollarSign className="w-4 h-4 text-[#334155] mr-1" />
//                           <span className="text-[#334155]">Starting from:</span>
//                           <span className="font-semibold text-[#1e2556] ml-1">
//                             {vendor.startingPrice}
//                           </span>
//                         </div>
//                       </div>
//                     )}

//                     {/* Actions */}
//                     <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
//                       <button className="flex-1 bg-[#1e2556] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 text-sm font-medium">
//                         Contact Vendor
//                       </button>
//                       <button className="flex-1 bg-[#7cc6ee] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 text-sm font-medium">
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Next Steps */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
//           <h3 className="text-lg font-semibold text-[#1e2556] mb-4">What Happens Next?</h3>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="text-center">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
//                 <span className="text-[#1e2556] font-bold">1</span>
//               </div>
//               <h4 className="font-medium text-[#1e2556] mb-2">Vendors Receive Your RFP</h4>
//               <p className="text-sm text-[#334155]">The selected vendors will receive your detailed requirements</p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
//                 <span className="text-[#1e2556] font-bold">2</span>
//               </div>
//               <h4 className="font-medium text-[#1e2556] mb-2">Receive Proposals</h4>
//               <p className="text-sm text-[#334155]">Vendors will prepare customized proposals for your team</p>
//             </div>
//             <div className="text-center">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
//                 <span className="text-[#1e2556] font-bold">3</span>
//               </div>
//               <h4 className="font-medium text-[#1e2556] mb-2">Compare & Choose</h4>
//               <p className="text-sm text-[#334155]">Evaluate proposals and select the best fit for your organization</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorsPage;
// app/rfp/[id]/vendors/page.jsx
'use client'
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Star, DollarSign, Users, MapPin, CheckCircle, Target, FileText } from 'lucide-react';

const VendorsPage = () => {
  const params = useParams();
  const rfpId = params.id;
  const [rfpData, setRfpData] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVendorsData();
  }, [rfpId]);

  const fetchVendorsData = async () => {
    try {
      // First get RFP data to check if vendors are matched
      const rfpResponse = await fetch(`/api/rfp/${rfpId}`);
      const rfpResult = await rfpResponse.json();
      
      if (!rfpResult.success) {
        setError('RFP not found');
        return;
      }

      setRfpData(rfpResult.data);

      if (!rfpResult.data.vendors || rfpResult.data.vendors.length === 0) {
        setError('No vendors matched yet. Please run vendor matching first.');
        return;
      }

      // Get vendor details
      const vendorsResponse = await fetch('/api/vendors/details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vendorIds: rfpResult.data.vendors
        })
      });

      const vendorsResult = await vendorsResponse.json();
      
      if (vendorsResult.success) {
        setVendors(vendorsResult.data);
      } else {
        setError('Failed to load vendor details');
      }

    } catch (error) {
      console.error('Error fetching vendors:', error);
      setError('Failed to load vendors');
    } finally {
      setIsLoading(false);
    }
  };

  const getPricingTierDisplay = (tier) => {
    const tiers = {
      'BUDGET': { label: 'Budget', symbol: '$', color: 'text-green-600' },
      'MID_RANGE': { label: 'Mid-Range', symbol: '$$', color: 'text-blue-600' },
      'PREMIUM': { label: 'Premium', symbol: '$$$', color: 'text-purple-600' },
      'ENTERPRISE': { label: 'Enterprise', symbol: '$$$+', color: 'text-red-600' }
    };
    return tiers[tier] || { label: tier, symbol: '$', color: 'text-gray-600' };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7cc6ee] mx-auto mb-4"></div>
              <p className="text-[#334155]">Loading your matched vendors...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#1e2556] mb-4">{error}</h2>
                <div className="space-y-3">
                  <Link
                    href={`/rfp/${rfpId}`}
                    className="inline-flex items-center px-6 py-3 bg-[#1e2556] text-white rounded-lg hover:bg-opacity-90 transition-all duration-200"
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to RFP
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 space-y-4 lg:space-y-0">
          <div>
            <div className="flex items-center mb-2">
              <Link
                href={`/rfp/${rfpId}`}
                className="mr-4 p-2 text-[#334155] hover:text-[#1e2556] hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl lg:text-3xl font-bold text-[#1e2556]">
                Your RFP Has Been Sent
              </h1>
            </div>
            <p className="text-[#334155] ml-14 lg:ml-14">
              We've matched your requirements with the top 5 legal software vendors
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 lg:w-auto w-full">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm font-medium text-green-600">
                {vendors.length} Vendors Matched
              </span>
            </div>
          </div>
        </div>

        {/* RFP Summary Card */}
        {rfpData && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-[#1e2556] mb-4">RFP Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-[#334155] font-medium">Category:</span>
                <p className="text-[#2d2d2d]">{rfpData.category}</p>
              </div>
              <div>
                <span className="text-[#334155] font-medium">Team Type:</span>
                <p className="text-[#2d2d2d]">{rfpData.teamType}</p>
              </div>
              <div>
                <span className="text-[#334155] font-medium">Team Size:</span>
                <p className="text-[#2d2d2d]">{rfpData.teamSize}</p>
              </div>
              <div>
                <span className="text-[#334155] font-medium">Timeline:</span>
                <p className="text-[#2d2d2d]">{rfpData.requirementUrgency}</p>
              </div>
            </div>
          </div>
        )}

        {/* Vendors Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-[#1e2556]">Recommended Vendors</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {vendors.map((vendor, index) => {
              const pricingInfo = getPricingTierDisplay(vendor.pricingTier);
              
              return (
                <div key={vendor.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                  {/* Ranking Badge */}
                  <div className="bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] text-white px-4 py-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">#{index + 1} Best Match</span>
                      <Target className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        {vendor.logoUrl && (
                          <img 
                            src={vendor.logoUrl} 
                            alt={`${vendor.companyName} logo`}
                            className="w-12 h-12 rounded-lg object-contain mr-4 bg-gray-50 p-2"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-[#1e2556]">
                            {vendor.productName}
                          </h3>
                          <p className="text-[#334155] text-sm">{vendor.companyName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${pricingInfo.color}`}>
                          {pricingInfo.symbol}
                        </div>
                        <div className="text-xs text-[#334155]">
                          {pricingInfo.label}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#2d2d2d] text-sm mb-4 line-clamp-3">
                      {vendor.description}
                    </p>

                    {/* Key Features */}
                    {vendor.bestKnownFor && vendor.bestKnownFor.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-[#1e2556] mb-2">Best Known For:</h4>
                        <div className="flex flex-wrap gap-2">
                          {vendor.bestKnownFor.slice(0, 3).map((feature, i) => (
                            <span 
                              key={i}
                              className="px-2 py-1 bg-blue-50 text-[#1e2556] text-xs rounded-md"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Use Cases */}
                    {vendor.topUseCases && vendor.topUseCases.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-[#1e2556] mb-2">Top Use Cases:</h4>
                        <ul className="text-xs text-[#334155] space-y-1">
                          {vendor.topUseCases.slice(0, 2).map((useCase, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1 h-1 bg-[#7cc6ee] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {useCase}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pricing Info */}
                    {vendor.startingPrice && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center text-sm">
                          <DollarSign className="w-4 h-4 text-[#334155] mr-1" />
                          <span className="text-[#334155]">Starting from:</span>
                          <span className="font-semibold text-[#1e2556] ml-1">
                            {vendor.startingPrice}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                      <button className="flex-1 bg-[#1e2556] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 text-sm font-medium">
                        Contact Vendor
                      </button>
                      <button className="flex-1 bg-[#7cc6ee] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all duration-200 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h3 className="text-lg font-semibold text-[#1e2556] mb-4">What Happens Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-[#1e2556] font-bold">1</span>
              </div>
              <h4 className="font-medium text-[#1e2556] mb-2">Vendors Receive Your RFP</h4>
              <p className="text-sm text-[#334155]">The selected vendors will receive your detailed requirements</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-[#1e2556] font-bold">2</span>
              </div>
              <h4 className="font-medium text-[#1e2556] mb-2">Receive Proposals</h4>
              <p className="text-sm text-[#334155]">Vendors will prepare customized proposals for your team</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-[#1e2556] font-bold">3</span>
              </div>
              <h4 className="font-medium text-[#1e2556] mb-2">Compare & Choose</h4>
              <p className="text-sm text-[#334155]">Evaluate proposals and select the best fit for your organization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorsPage;