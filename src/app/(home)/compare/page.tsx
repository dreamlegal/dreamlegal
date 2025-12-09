
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import SearchModal from '@/components/SearchModal';
// import TrendingComparisons from '@/components/TrendingComparisons';

// interface Software {
//   id: string;
//   slug: string;
//   productName: string;
//   companyName: string;
//   logoUrl: string;
//   category: string;
//   description: string;
// }

// export default function ComparePage() {
//   const router = useRouter();
//   const [selectedSoftware, setSelectedSoftware] = useState<Software[]>([]);
//   const [showSearchModal, setShowSearchModal] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleAddSoftware = (software: Software) => {
//     if (selectedSoftware.length < 3 && !selectedSoftware.find(s => s.slug === software.slug)) {
//       setSelectedSoftware([...selectedSoftware, software]);
//     }
//     setShowSearchModal(false);
//   };

//   const handleRemoveSoftware = (slug: string) => {
//     setSelectedSoftware(selectedSoftware.filter(s => s.slug !== slug));
//   };

//   const handleCompare = async () => {
//     if (selectedSoftware.length < 2) return;

//     setLoading(true);
//     try {
//       const response = await fetch('/api/comparisons', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           softwareSlugs: selectedSoftware.map(s => s.slug)
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         router.push(data.redirect);
//       } else {
//         console.error('Failed to create comparison:', data.error);
//       }
//     } catch (error) {
//       console.error('Error creating comparison:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const excludedSlugs = selectedSoftware.map(s => s.slug);

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: '#f5f7fa' }}>
//       {/* Header */}
//       <div className="text-white py-8 sm:py-10" style={{ backgroundColor: '#1e2556' }}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* <nav className="text-sm mb-3">
//             <span style={{ color: '#7cc6ee' }}>Business Software</span>
//             <span className="mx-2">/</span>
//             <span>Compare Software</span>
//           </nav> */}
          
//           <h1 className="text-2xl py-10 sm:text-3xl lg:text-4xl font-bold mb-3 text-white">Discover & Compare Software</h1>
//           <p className="text-white opacity-90 max-w-4xl text-sm sm:text-base">
//             In-depth comparison between software for all business types based on features, pricing, specifications, reviews and more. 
//             Explore some of our most viewed software comparisons for trending products to find out what's best for you.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#1e2556' }}>Add Products to Compare</h2>

//         {/* Comparison Slots */}
//         <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-4 shadow-sm">
//           <div className="flex flex-col lg:flex-row gap-4">
//             {/* Products Grid */}
//             <div className="flex-1">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//                 {/* Selected Software Slots */}
//                 {Array.from({ length: 3 }, (_, index) => {
//                   const software = selectedSoftware[index];
                  
//                   if (software) {
//                     return (
//                       <div key={software.slug} className="relative">
//                         <div className="border border-gray-200 rounded-lg p-3 h-full flex flex-col min-h-[140px]">
//                           <button
//                             onClick={() => handleRemoveSoftware(software.slug)}
//                             className="absolute -top-1.5 -right-1.5 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs hover:opacity-80 transition-opacity z-10"
//                             style={{ backgroundColor: '#334155' }}
//                           >
//                             ×
//                           </button>
                          
//                           <div className="flex items-start mb-2">
//                             <img
//                               src={software.logoUrl}
//                               alt={software.productName}
//                               className="w-8 h-8 rounded-md mr-2 object-contain bg-gray-50 p-0.5 flex-shrink-0"
//                             />
//                             <div className="flex-1 min-w-0">
//                               <h3 className="font-bold text-xs sm:text-sm leading-tight" style={{ color: '#1e2556' }}>
//                                 {software.productName}
//                               </h3>
//                               <div className="flex items-center text-yellow-400 text-xs mt-0.5">
//                                 <span className="flex">★★★★★</span>
//                                 <span className="ml-1 text-xs" style={{ color: '#334155' }}>4.6</span>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="mb-2 flex-1">
//                             <p className="text-xs leading-snug" style={{ color: '#2d2d2d' }}>
//                               {software.description.length > 60 
//                                 ? `${software.description.substring(0, 60)}...` 
//                                 : software.description
//                               }
//                             </p>
//                           </div>

//                           {/* VS indicator for desktop */}
//                           {index < selectedSoftware.length - 1 && (
//                             <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium text-white hidden lg:flex z-10" style={{ backgroundColor: '#7cc6ee' }}>
//                               vs
//                             </div>
//                           )}

//                           <button
//                             onClick={() => setShowSearchModal(true)}
//                             className="w-full border py-1.5 px-2 rounded-md font-medium transition-colors hover:opacity-80 text-xs mt-auto"
//                             style={{ borderColor: '#7cc6ee', color: '#7cc6ee' }}
//                           >
//                             Change
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   }

//                   return (
//                     <div key={index} className="relative">
//                       <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 h-full flex flex-col items-center justify-center text-center min-h-[140px]">
//                         <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
//                           <span className="text-lg" style={{ color: '#7cc6ee' }}>+</span>
//                         </div>
//                         <p className="text-xs mb-2" style={{ color: '#334155' }}>
//                           Add {index === 0 ? '1st' : index === 1 ? '2nd' : '3rd'} product
//                         </p>
//                         <button
//                           onClick={() => setShowSearchModal(true)}
//                           className="w-full border py-1.5 px-2 rounded-md font-medium transition-colors hover:opacity-90 text-xs"
//                           style={{ borderColor: '#7cc6ee', color: '#7cc6ee' }}
//                           disabled={selectedSoftware.length >= 3}
//                         >
//                           + Add
//                         </button>
//                       </div>

//                       {/* VS indicator for desktop */}
//                       {index < 2 && selectedSoftware.length > index && (
//                         <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rounded-full w-6 h-6 items-center justify-center text-xs font-medium text-white hidden lg:flex z-10" style={{ backgroundColor: '#7cc6ee' }}>
//                           vs
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* Mobile VS indicators */}
//               {selectedSoftware.length >= 2 && (
//                 <div className="flex justify-center items-center space-x-4 my-3 lg:hidden">
//                   {Array.from({ length: selectedSoftware.length - 1 }, (_, index) => (
//                     <div key={index} className="rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium text-white" style={{ backgroundColor: '#7cc6ee' }}>
//                       vs
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Compare Button Section */}
//             <div className="lg:w-64 flex flex-col justify-center items-center lg:items-end space-y-3 lg:border-l lg:border-gray-200 lg:pl-6">
//               <div className="text-center lg:text-right">
//                 <p className="text-xs sm:text-sm mb-3" style={{ color: '#334155' }}>
//                   Select at least two software for comparison
//                 </p>
//                 <button
//                   onClick={handleCompare}
//                   disabled={selectedSoftware.length < 2 || loading}
//                   className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 text-white text-sm ${
//                     selectedSoftware.length >= 2 && !loading
//                       ? 'hover:opacity-90 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg'
//                       : 'opacity-50 cursor-not-allowed'
//                   }`}
//                   style={{ 
//                     backgroundColor: selectedSoftware.length >= 2 && !loading ? '#1e2556' : '#9ca3af'
//                   }}
//                 >
//                   {loading ? (
//                     <div className="flex items-center">
//                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
//                       Comparing...
//                     </div>
//                   ) : (
//                     'Compare Now'
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Trending Comparisons Section */}
//       <TrendingComparisons />

//       {/* Search Modal */}
//       {showSearchModal && (
//         <SearchModal
//           onClose={() => setShowSearchModal(false)}
//           onSelect={handleAddSoftware}
//           excludeSlugs={excludedSlugs}
//         />
//       )}
//     </div>
//   );
// }
'use client';
export const dynamic = "force-dynamic";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, CheckCircle } from 'lucide-react';
import SearchModal from '@/components/SearchModal';
import TrendingComparisons from '@/components/TrendingComparisons';
import { useNewAuth } from '@/context/NewAuthContext';

// Import tracking utilities
import { canAccessComparison, trackComparisonView, getRemainingComparisons } from '@/lib/access-tracking';

interface Software {
  id: string;
  slug: string;
  productName: string;
  companyName: string;
  logoUrl: string;
  category: string;
  description: string;
}

export default function ComparePage() {
  const router = useRouter();
  const { isAuthenticated, showAuthModal } = useNewAuth();
  
  const [selectedSoftware, setSelectedSoftware] = useState<Software[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // ACCESS CONTROL STATE
  const [canCompare, setCanCompare] = useState(true);
  const [remainingComparisons, setRemainingComparisons] = useState(1);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const [show3rdProductWarning, setShow3rdProductWarning] = useState(false);

  // Check access on mount and when auth changes
  useEffect(() => {
    const checkAccess = () => {
      const hasAccess = canAccessComparison(isAuthenticated);
      const remaining = getRemainingComparisons(isAuthenticated);
      
      setCanCompare(hasAccess);
      setRemainingComparisons(remaining);
    };

    checkAccess();
  }, [isAuthenticated]);

  const handleAddSoftware = (software: Software) => {
    // CHECK 1: Prevent 3rd product for non-authenticated users
    if (!isAuthenticated && selectedSoftware.length >= 2) {
      setShow3rdProductWarning(true);
      setShowSearchModal(false);
      return;
    }

    // CHECK 2: Normal addition
    if (selectedSoftware.length < 3 && !selectedSoftware.find(s => s.slug === software.slug)) {
      setSelectedSoftware([...selectedSoftware, software]);
    }
    setShowSearchModal(false);
  };

  const handleRemoveSoftware = (slug: string) => {
    setSelectedSoftware(selectedSoftware.filter(s => s.slug !== slug));
  };

  const handleCompare = async () => {
    if (selectedSoftware.length < 2) return;

    // CHECK: Access before comparing (for 1/day limit)
    if (!canCompare) {
      setShowLimitWarning(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/comparisons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          softwareSlugs: selectedSoftware.map(s => s.slug)
        }),
      });

      const data = await response.json();

      if (data.success) {
        // TRACK THE COMPARISON VIEW
        trackComparisonView(isAuthenticated);
        
        // Update remaining count
        setCanCompare(canAccessComparison(isAuthenticated));
        setRemainingComparisons(getRemainingComparisons(isAuthenticated));
        
        router.push(data.redirect);
      } else {
        console.error('Failed to create comparison:', data.error);
      }
    } catch (error) {
      console.error('Error creating comparison:', error);
    } finally {
      setLoading(false);
    }
  };

  const excludedSlugs = selectedSoftware.map(s => s.slug);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f7fa' }}>
      {/* Header */}
      <div className="text-white py-8 sm:py-10" style={{ backgroundColor: '#1e2556' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl py-10 sm:text-3xl lg:text-4xl font-bold mb-3 text-white">
            Discover & Compare Software
          </h1>
          <p className="text-white opacity-90 max-w-4xl text-sm sm:text-base">
            In-depth comparison between software for all business types based on features, pricing, specifications, reviews and more. 
            Explore some of our most viewed software comparisons for trending products to find out what's best for you.
          </p>
        </div>
      </div>

      {/* DAILY LIMIT WARNING BANNER - Red */}
      {!isAuthenticated && remainingComparisons === 0 && (
        <div className="bg-gradient-to-r from-red-500 to-orange-600 text-white py-4 px-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Lock className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-bold text-base">You've used your daily comparison</p>
                <p className="text-sm opacity-90">Sign in for unlimited comparisons or come back tomorrow</p>
              </div>
            </div>
            <button
              onClick={showAuthModal}
              className="bg-white text-orange-600 px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Sign In for Unlimited
            </button>
          </div>
        </div>
      )}

      {/* LAST COMPARISON WARNING - Yellow */}
      {!isAuthenticated && remainingComparisons === 1 && selectedSoftware.length >= 2 && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-3 px-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
            <p className="font-semibold text-sm">
              ⚠️ This is your last comparison today! Sign in for unlimited access.
            </p>
            <button
              onClick={showAuthModal}
              className="bg-white text-orange-600 px-4 py-1.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: '#1e2556' }}>
          Add Products to Compare
        </h2>

        {/* Comparison Slots */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 mb-4 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {/* Selected Software Slots */}
                {Array.from({ length: 3 }, (_, index) => {
                  const software = selectedSoftware[index];
                  
                  if (software) {
                    return (
                      <div key={software.slug} className="relative">
                        <div className="border border-gray-200 rounded-lg p-3 h-full flex flex-col min-h-[140px]">
                          <button
                            onClick={() => handleRemoveSoftware(software.slug)}
                            className="absolute -top-1.5 -right-1.5 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs hover:opacity-80 transition-opacity z-10"
                            style={{ backgroundColor: '#334155' }}
                          >
                            ×
                          </button>
                          
                          <div className="flex items-start mb-2">
                            <img
                              src={software.logoUrl}
                              alt={software.productName}
                              className="w-8 h-8 rounded-md mr-2 object-contain bg-gray-50 p-0.5 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-xs sm:text-sm leading-tight" style={{ color: '#1e2556' }}>
                                {software.productName}
                              </h3>
                              <div className="flex items-center text-yellow-400 text-xs mt-0.5">
                                <span className="flex">★★★★★</span>
                                <span className="ml-1 text-xs" style={{ color: '#334155' }}>4.6</span>
                              </div>
                            </div>
                          </div>

                          <div className="mb-2 flex-1">
                            <p className="text-xs leading-snug" style={{ color: '#2d2d2d' }}>
                              {software.description.length > 60 
                                ? `${software.description.substring(0, 60)}...` 
                                : software.description
                              }
                            </p>
                          </div>

                          {/* VS indicator for desktop */}
                          {index < selectedSoftware.length - 1 && (
                            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium text-white hidden lg:flex z-10" style={{ backgroundColor: '#7cc6ee' }}>
                              vs
                            </div>
                          )}

                          <button
                            onClick={() => setShowSearchModal(true)}
                            className="w-full border py-1.5 px-2 rounded-md font-medium transition-colors hover:opacity-80 text-xs mt-auto"
                            style={{ borderColor: '#7cc6ee', color: '#7cc6ee' }}
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    );
                  }

                  // Empty slot
                  return (
                    <div key={index} className="relative">
                      {/* LOCKED 3RD SLOT for non-authenticated users */}
                      {!isAuthenticated && index === 2 ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 h-full flex flex-col items-center justify-center text-center min-h-[140px] bg-gray-50 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#7cc6ee]/10 to-[#1e2556]/10"></div>
                          <div className="relative z-10">
                            <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center bg-[#7cc6ee]">
                              <Lock className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-xs mb-2 font-semibold" style={{ color: '#1e2556' }}>
                              3rd Product Locked
                            </p>
                            <p className="text-xs mb-3" style={{ color: '#334155' }}>
                              Sign in to compare 3 products
                            </p>
                            <button
                              onClick={showAuthModal}
                              className="w-full border-2 py-1.5 px-2 rounded-md font-bold transition-colors hover:opacity-90 text-xs"
                              style={{ borderColor: '#7cc6ee', color: '#7cc6ee', backgroundColor: 'white' }}
                            >
                              Sign In
                            </button>
                          </div>
                        </div>
                      ) : (
                        // Regular empty slot
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 h-full flex flex-col items-center justify-center text-center min-h-[140px]">
                          <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
                            <span className="text-lg" style={{ color: '#7cc6ee' }}>+</span>
                          </div>
                          <p className="text-xs mb-2" style={{ color: '#334155' }}>
                            Add {index === 0 ? '1st' : index === 1 ? '2nd' : '3rd'} product
                          </p>
                          <button
                            onClick={() => setShowSearchModal(true)}
                            className="w-full border py-1.5 px-2 rounded-md font-medium transition-colors hover:opacity-90 text-xs"
                            style={{ borderColor: '#7cc6ee', color: '#7cc6ee' }}
                            disabled={selectedSoftware.length >= 3}
                          >
                            + Add
                          </button>
                        </div>
                      )}

                      {/* VS indicator for desktop */}
                      {index < 2 && selectedSoftware.length > index && (
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rounded-full w-6 h-6 items-center justify-center text-xs font-medium text-white hidden lg:flex z-10" style={{ backgroundColor: '#7cc6ee' }}>
                          vs
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Mobile VS indicators */}
              {selectedSoftware.length >= 2 && (
                <div className="flex justify-center items-center space-x-4 my-3 lg:hidden">
                  {Array.from({ length: selectedSoftware.length - 1 }, (_, index) => (
                    <div key={index} className="rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium text-white" style={{ backgroundColor: '#7cc6ee' }}>
                      vs
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Compare Button Section */}
            <div className="lg:w-64 flex flex-col justify-center items-center lg:items-end space-y-3 lg:border-l lg:border-gray-200 lg:pl-6">
              <div className="text-center lg:text-right">
                <p className="text-xs sm:text-sm mb-3" style={{ color: '#334155' }}>
                  Select at least two software for comparison
                </p>
                <button
                  onClick={handleCompare}
                  disabled={selectedSoftware.length < 2 || loading}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 text-white text-sm ${
                    selectedSoftware.length >= 2 && !loading
                      ? 'hover:opacity-90 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg'
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  style={{ 
                    backgroundColor: selectedSoftware.length >= 2 && !loading ? '#1e2556' : '#9ca3af'
                  }}
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Comparing...
                    </div>
                  ) : (
                    'Compare Now'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Comparisons Section */}
      <TrendingComparisons />

      {/* Search Modal */}
      {showSearchModal && (
        <SearchModal
          onClose={() => setShowSearchModal(false)}
          onSelect={handleAddSoftware}
          excludeSlugs={excludedSlugs}
        />
      )}

      {/* DAILY LIMIT MODAL */}
      {showLimitWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center border-2 border-[#7cc6ee]">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#7cc6ee] to-[#1e2556] rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-[#1e2556]">
              Daily Comparison Limit Reached
            </h2>
            
            <p className="text-lg text-gray-600 mb-6">
              You've used your 1 free comparison for today. Sign in to get unlimited comparisons!
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-[#1e2556] mb-3 text-lg">Sign in to unlock:</h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Unlimited product comparisons</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Compare up to 3 products at once</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Unlimited article access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Access to Legal Tech Map</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>AI prompts library</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLimitWarning(false)}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowLimitWarning(false);
                  showAuthModal();
                }}
                className="flex-1 bg-[#7cc6ee] hover:bg-[#1e2556] text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Sign In
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Your limit resets daily at midnight
            </p>
          </div>
        </div>
      )}

      {/* 3RD PRODUCT MODAL */}
      {show3rdProductWarning && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full text-center border-2 border-[#7cc6ee]">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#7cc6ee] to-[#1e2556] rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-[#1e2556]">
              Want to Compare 3 Products?
            </h2>
            
            <p className="text-lg text-gray-600 mb-6">
              Sign in to unlock the ability to compare up to 3 products at once and get deeper insights!
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="font-bold text-[#1e2556] mb-3 text-lg">Premium features:</h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Compare up to 3 products simultaneously</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Unlimited daily comparisons</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Side-by-side feature analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Save comparison history</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShow3rdProductWarning(false)}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Maybe Later
              </button>
              <button
                onClick={() => {
                  setShow3rdProductWarning(false);
                  showAuthModal();
                }}
                className="flex-1 bg-[#7cc6ee] hover:bg-[#1e2556] text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Sign In Now
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              It's free and takes less than a minute
            </p>
          </div>
        </div>
      )}
    </div>
  );
}