// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import SearchModal from '@/components/SearchModal';

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
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-blue-900 text-white py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <nav className="text-sm mb-4">
//             <span className="text-blue-300">Business Software</span>
//             <span className="mx-2">/</span>
//             <span>Compare Software</span>
//           </nav>
          
//           <h1 className="text-4xl font-bold mb-4">Discover & Compare Software</h1>
//           <p className="text-blue-100 max-w-4xl">
//             In-depth comparison between software for all business types based on features, pricing, specifications, reviews and more. 
//             Explore some of our most viewed software comparisons for trending products to find out what's best for you.
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add Product to Compare</h2>

//         {/* Comparison Slots */}
//         <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Selected Software Slots */}
//             {Array.from({ length: 3 }, (_, index) => {
//               const software = selectedSoftware[index];
              
//               if (software) {
//                 return (
//                   <div key={software.slug} className="relative">
//                     <div className="border border-gray-200 rounded-lg p-4">
//                       <button
//                         onClick={() => handleRemoveSoftware(software.slug)}
//                         className="absolute -top-2 -right-2 bg-gray-400 hover:bg-gray-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm"
//                       >
//                         ×
//                       </button>
                      
//                       <div className="flex items-center mb-4">
//                         <img
//                           src={software.logoUrl}
//                           alt={software.productName}
//                           className="w-12 h-12 rounded-lg mr-3 object-contain"
//                         />
//                         <div>
//                           <h3 className="font-semibold text-gray-900">{software.productName}</h3>
//                           <div className="flex items-center text-yellow-400 text-sm">
//                             <span className="flex">★★★★★</span>
//                             <span className="ml-1 text-gray-600">4.6</span>
//                           </div>
//                         </div>
//                       </div>

//                       {index < selectedSoftware.length - 1 && (
//                         <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-600 hidden md:flex">
//                           vs
//                         </div>
//                       )}

//                       <button className="w-full border border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
//                         Change Product
//                       </button>
//                     </div>
//                   </div>
//                 );
//               }

//               return (
//                 <div key={index} className="relative">
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//                     <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
//                       <span className="text-2xl text-gray-400">+</span>
//                     </div>
//                     <button
//                       onClick={() => setShowSearchModal(true)}
//                       className="w-full border border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
//                       disabled={selectedSoftware.length >= 3}
//                     >
//                       + Add Product
//                     </button>
//                   </div>

//                   {index < 2 && selectedSoftware.length > index && (
//                     <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-full w-8 h-8 items-center justify-center text-sm font-medium text-gray-600 hidden md:flex">
//                       vs
//                     </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/* Compare Button */}
//           <div className="flex justify-center mt-8">
//             <div className="flex items-center space-x-4">
//               <span className="text-gray-500 text-sm">
//                 Select at least two software of your choice for comparison
//               </span>
//               <button
//                 onClick={handleCompare}
//                 disabled={selectedSoftware.length < 2 || loading}
//                 className={`px-6 py-2 rounded-lg font-medium transition-colors ${
//                   selectedSoftware.length >= 2 && !loading
//                     ? 'bg-blue-600 text-white hover:bg-blue-700'
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 {loading ? 'Creating...' : 'Compare Now'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

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

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SearchModal from '@/components/SearchModal';
import TrendingComparisons from '@/components/TrendingComparisons';

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
  const [selectedSoftware, setSelectedSoftware] = useState<Software[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddSoftware = (software: Software) => {
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
      <div className="text-white py-12" style={{ backgroundColor: '#1e2556' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm mb-4">
            <span style={{ color: '#7cc6ee' }}>Business Software</span>
            <span className="mx-2">/</span>
            <span>Compare Software</span>
          </nav>
          
          <h1 className="text-4xl font-bold mb-4 text-white">Discover & Compare Software</h1>
          <p className="text-white opacity-90 max-w-4xl">
            In-depth comparison between software for all business types based on features, pricing, specifications, reviews and more. 
            Explore some of our most viewed software comparisons for trending products to find out what's best for you.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e2556' }}>Add Product to Compare</h2>

        {/* Comparison Slots */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Selected Software Slots */}
            {Array.from({ length: 3 }, (_, index) => {
              const software = selectedSoftware[index];
              
              if (software) {
                return (
                  <div key={software.slug} className="relative h-80">
                    <div className="border border-gray-200 rounded-lg p-4 h-full flex flex-col">
                      <button
                        onClick={() => handleRemoveSoftware(software.slug)}
                        className="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center text-white text-sm hover:opacity-80 transition-opacity"
                        style={{ backgroundColor: '#334155' }}
                      >
                        ×
                      </button>
                      
                      <div className="flex items-center mb-4 flex-1">
                        <img
                          src={software.logoUrl}
                          alt={software.productName}
                          className="w-12 h-12 rounded-lg mr-3 object-contain bg-gray-50 p-1"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-sm" style={{ color: '#1e2556' }}>{software.productName}</h3>
                          <div className="flex items-center text-yellow-400 text-xs mt-1">
                            <span className="flex">★★★★★</span>
                            <span className="ml-1" style={{ color: '#334155' }}>4.6</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs leading-relaxed" style={{ color: '#2d2d2d' }}>
                          {software.description.length > 120 
                            ? `${software.description.substring(0, 120)}...` 
                            : software.description
                          }
                        </p>
                      </div>

                      {index < selectedSoftware.length - 1 && (
                        <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium text-white hidden md:flex z-10" style={{ backgroundColor: '#7cc6ee' }}>
                          vs
                        </div>
                      )}

                      <button
                        onClick={() => setShowSearchModal(true)}
                        className="w-full border py-2 px-4 rounded-lg font-medium transition-colors hover:opacity-80 text-sm"
                        style={{ borderColor: '#7cc6ee', color: '#7cc6ee' }}
                      >
                        Change Product
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <div key={index} className="relative h-80">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
                      <span className="text-2xl" style={{ color: '#7cc6ee' }}>+</span>
                    </div>
                    <p className="text-sm mb-4" style={{ color: '#334155' }}>
                      Add {index === 0 ? 'first' : index === 1 ? 'second' : 'third'} product to compare
                    </p>
                    <button
                      onClick={() => setShowSearchModal(true)}
                      className="w-full border py-2 px-4 rounded-lg font-medium transition-colors hover:opacity-90"
                      style={{ borderColor: '#7cc6ee', color: '#7cc6ee' }}
                      disabled={selectedSoftware.length >= 3}
                    >
                      + Add Product
                    </button>
                  </div>

                  {index < 2 && selectedSoftware.length > index && (
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rounded-full w-8 h-8 items-center justify-center text-sm font-medium text-white hidden md:flex z-10" style={{ backgroundColor: '#7cc6ee' }}>
                      vs
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Compare Button */}
          <div className="flex flex-col items-center mt-8 space-y-4">
            <p className="text-sm" style={{ color: '#334155' }}>
              Select at least two software of your choice for comparison
            </p>
            <button
              onClick={handleCompare}
              disabled={selectedSoftware.length < 2 || loading}
              className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 text-white ${
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
                  Creating Comparison...
                </div>
              ) : (
                'Compare Now'
              )}
            </button>
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
    </div>
  );
}
