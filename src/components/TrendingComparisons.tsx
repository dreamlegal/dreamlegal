// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';

// interface Software {
//   slug: string;
//   productName: string;
//   logoUrl: string;
//   companyName: string;
//   category: string;
// }

// interface TrendingComparison {
//   id: string;
//   slug: string;
//   software: Software[];
//   hasContent: boolean;
// }

// export default function TrendingComparisons() {
//   const [comparisons, setComparisons] = useState<TrendingComparison[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);

//   // Check screen size
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//       setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
//     };
    
//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);
//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   useEffect(() => {
//     fetchTrendingComparisons();
//   }, []);

//   const fetchTrendingComparisons = async () => {
//     try {
//       const response = await fetch('/api/trending-comparisons');
//       const data = await response.json();

//       if (data.success) {
//         setComparisons(data.comparisons);
//       }
//     } catch (error) {
//       console.error('Error fetching trending comparisons:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Responsive items per view
//   const getItemsPerView = () => {
//     if (isMobile) return 1;
//     if (isTablet) return 2;
//     return 3; // desktop
//   };

//   const itemsPerView = getItemsPerView();
//   const maxIndex = Math.max(0, comparisons.length - itemsPerView);

//   const nextSlide = () => {
//     setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
//   };

//   const prevSlide = () => {
//     setCurrentIndex(prev => Math.max(prev - 1, 0));
//   };

//   // Reset current index when screen size changes
//   useEffect(() => {
//     const newMaxIndex = Math.max(0, comparisons.length - getItemsPerView());
//     if (currentIndex > newMaxIndex) {
//       setCurrentIndex(newMaxIndex);
//     }
//   }, [isMobile, isTablet, comparisons.length, currentIndex]);

//   if (loading) {
//     return (
//       <section className="py-8 md:py-12">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8" style={{ color: '#1e2556' }}>
//             Trending Product Comparisons
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//             {[...Array(3)].map((_, i) => (
//               <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 animate-pulse">
//                 <div className="h-24 md:h-32 bg-gray-200 rounded mb-4"></div>
//                 <div className="h-4 bg-gray-200 rounded mb-2"></div>
//                 <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (comparisons.length === 0) {
//     return null; // Don't show section if no comparisons
//   }

//   return (
//     <section className="py-8 md:py-12" style={{ backgroundColor: '#f5f7fa' }}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between mb-6 md:mb-8">
//           <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#1e2556' }}>
//             Trending Product Comparisons
//           </h2>
          
//           {/* Navigation Arrows - Hidden on mobile if only 1 item per view */}
//           {comparisons.length > itemsPerView && (
//             <div className="flex space-x-2">
//               <button
//                 onClick={prevSlide}
//                 disabled={currentIndex === 0}
//                 className="p-2 md:p-3 rounded-full border border-gray-300 hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
//                 style={{ color: '#334155' }}
//               >
//                 <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               <button
//                 onClick={nextSlide}
//                 disabled={currentIndex >= maxIndex}
//                 className="p-2 md:p-3 rounded-full border border-gray-300 hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
//                 style={{ color: '#334155' }}
//               >
//                 <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Comparisons Grid */}
//         <div className="relative overflow-hidden">
//           <div 
//             className="flex transition-transform duration-300 ease-in-out"
//             style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
//           >
//             {comparisons.map((comparison) => {
//               if (comparison.software.length < 2) return null;

//               const [software1, software2] = comparison.software;

//               return (
//                 <div 
//                   key={comparison.id} 
//                   className="flex-shrink-0 px-2 md:px-3"
//                   style={{ width: `${100 / itemsPerView}%` }}
//                 >
//                   <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 lg:p-8 h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
//                     {/* Product Logos and Names */}
//                     <div className="flex items-center justify-center space-x-3 md:space-x-4 lg:space-x-6 mb-6 md:mb-8 flex-1">
//                       {/* First Product */}
//                       <div className="text-center flex-1">
//                         <div className="w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 mx-auto mb-3 md:mb-4 relative rounded-lg overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center group-hover:shadow-md transition-shadow">
//                           <img
//                             src={software1.logoUrl}
//                             alt={software1.productName}
//                             className="max-w-full max-h-full object-contain p-1 md:p-2"
//                           />
//                         </div>
//                         <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2 line-clamp-2" style={{ color: '#1e2556' }}>
//                           {software1.productName}
//                         </h3>
//                         <p className="text-xs md:text-sm line-clamp-1" style={{ color: '#334155' }}>
//                           {software1.companyName}
//                         </p>
//                       </div>

//                       {/* VS */}
//                       <div className="flex-shrink-0">
//                         <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-white shadow-sm" style={{ backgroundColor: '#7cc6ee' }}>
//                           vs
//                         </div>
//                       </div>

//                       {/* Second Product */}
//                       <div className="text-center flex-1">
//                         <div className="w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 mx-auto mb-3 md:mb-4 relative rounded-lg overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center group-hover:shadow-md transition-shadow">
//                           <img
//                             src={software2.logoUrl}
//                             alt={software2.productName}
//                             className="max-w-full max-h-full object-contain p-1 md:p-2"
//                           />
//                         </div>
//                         <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2 line-clamp-2" style={{ color: '#1e2556' }}>
//                           {software2.productName}
//                         </h3>
//                         <p className="text-xs md:text-sm line-clamp-1" style={{ color: '#334155' }}>
//                           {software2.companyName}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Compare Button */}
//                     <Link
//                       href={`/compare/${comparison.slug}`}
//                       className="group relative w-full px-4 md:px-6 py-2.5 md:py-3 rounded-lg border-2 font-medium text-center transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 overflow-hidden text-sm md:text-base"
//                       style={{ borderColor: '#7cc6ee', color: '#7cc6ee' }}
//                     >
//                       {/* Button background animation */}
//                       <div 
//                         className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" 
//                         style={{ backgroundColor: '#7cc6ee' }}
//                       ></div>
                      
//                       {/* Button text */}
//                       <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center">
//                         <svg className="w-3 h-3 md:w-4 md:h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//                         </svg>
//                         <span className="hidden sm:inline">Compare Now</span>
//                         <span className="sm:hidden">Compare</span>
//                       </span>
//                     </Link>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Pagination Dots */}
//         {comparisons.length > itemsPerView && (
//           <div className="flex justify-center mt-6 md:mt-8 space-x-2">
//             {[...Array(maxIndex + 1)].map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
//                   currentIndex === index ? 'scale-125 shadow-md' : 'hover:opacity-80'
//                 }`}
//                 style={{ backgroundColor: currentIndex === index ? '#7cc6ee' : '#d1d5db' }}
//               />
//             ))}
//           </div>
//         )}

//         {/* Mobile swipe hint */}
//         {isMobile && comparisons.length > 1 && (
//           <div className="flex justify-center mt-4">
//             <p className="text-xs text-center" style={{ color: '#334155' }}>
//               Swipe to see more comparisons
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Software {
  slug: string;
  productName: string;
  logoUrl: string;
  companyName: string;
  category: string;
}

interface TrendingComparison {
  id: string;
  slug: string;
  software: Software[];
  hasContent: boolean;
}

interface VoteData {
  likes: number;
  dislikes: number;
  userVote: 'LIKE' | 'DISLIKE' | null;
}

export default function TrendingComparisons() {
  const [comparisons, setComparisons] = useState<TrendingComparison[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [votes, setVotes] = useState<Record<string, VoteData>>({});

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    fetchTrendingComparisons();
  }, []);

  // Fetch votes when comparisons load
  useEffect(() => {
    if (comparisons.length > 0) {
      fetchVotes();
    }
  }, [comparisons]);

  const fetchTrendingComparisons = async () => {
    try {
      const response = await fetch('/api/trending-comparisons');
      const data = await response.json();

      if (data.success) {
        setComparisons(data.comparisons);
      }
    } catch (error) {
      console.error('Error fetching trending comparisons:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVotes = async () => {
    try {
      const comparisonIds = comparisons.map(c => c.slug);
      const response = await fetch(`/api/comparisons/votes?comparisonIds=${comparisonIds.join(',')}`);
      const data = await response.json();
      
      if (data.votes) {
        setVotes(data.votes);
      }
    } catch (error) {
      console.error('Error fetching votes:', error);
    }
  };

  // Responsive items per view
  const getItemsPerView = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3; // desktop
  };

  const itemsPerView = getItemsPerView();
  const maxIndex = Math.max(0, comparisons.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  // Reset current index when screen size changes
  useEffect(() => {
    const newMaxIndex = Math.max(0, comparisons.length - getItemsPerView());
    if (currentIndex > newMaxIndex) {
      setCurrentIndex(newMaxIndex);
    }
  }, [isMobile, isTablet, comparisons.length, currentIndex]);

  if (loading) {
    return (
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8" style={{ color: '#1e2556' }}>
            Trending Product Comparisons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 animate-pulse">
                <div className="h-24 md:h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (comparisons.length === 0) {
    return null; // Don't show section if no comparisons
  }

  return (
    <section className="py-8 md:py-12" style={{ backgroundColor: '#f5f7fa' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold" style={{ color: '#1e2556' }}>
            Trending Product Comparisons
          </h2>
          
          {/* Navigation Arrows - Hidden on mobile if only 1 item per view */}
          {comparisons.length > itemsPerView && (
            <div className="flex space-x-2">
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className="p-2 md:p-3 rounded-full border border-gray-300 hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ color: '#334155' }}
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                className="p-2 md:p-3 rounded-full border border-gray-300 hover:bg-white hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
                style={{ color: '#334155' }}
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Comparisons Grid */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {comparisons.map((comparison) => {
              if (comparison.software.length < 2) return null;

              const [software1, software2] = comparison.software;
              const voteData = votes[comparison.slug] || { likes: 0, dislikes: 0, userVote: null };

              return (
                <div 
                  key={comparison.id} 
                  className="flex-shrink-0 px-2 md:px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 lg:p-8 h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    {/* Product Logos and Names */}
                    <div className="flex items-center justify-center space-x-3 md:space-x-4 lg:space-x-6 mb-6 md:mb-8 flex-1">
                      {/* First Product */}
                      <div className="text-center flex-1">
                        <div className="w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 mx-auto mb-3 md:mb-4 relative rounded-lg overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center group-hover:shadow-md transition-shadow">
                          <img
                            src={software1.logoUrl}
                            alt={software1.productName}
                            className="max-w-full max-h-full object-contain p-1 md:p-2"
                          />
                        </div>
                        <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2 line-clamp-2" style={{ color: '#1e2556' }}>
                          {software1.productName}
                        </h3>
                        <p className="text-xs md:text-sm line-clamp-1" style={{ color: '#334155' }}>
                          {software1.companyName}
                        </p>
                      </div>

                      {/* VS */}
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-white shadow-sm" style={{ backgroundColor: '#7cc6ee' }}>
                          vs
                        </div>
                      </div>

                      {/* Second Product */}
                      <div className="text-center flex-1">
                        <div className="w-16 h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 mx-auto mb-3 md:mb-4 relative rounded-lg overflow-hidden shadow-sm bg-gray-50 flex items-center justify-center group-hover:shadow-md transition-shadow">
                          <img
                            src={software2.logoUrl}
                            alt={software2.productName}
                            className="max-w-full max-h-full object-contain p-1 md:p-2"
                          />
                        </div>
                        <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2 line-clamp-2" style={{ color: '#1e2556' }}>
                          {software2.productName}
                        </h3>
                        <p className="text-xs md:text-sm line-clamp-1" style={{ color: '#334155' }}>
                          {software2.companyName}
                        </p>
                      </div>
                    </div>

                    {/* Vote Display - Top Right */}
                    <div className="absolute top-3 right-3 flex items-center space-x-1">
                      <div className="flex items-center space-x-1 px-2 py-1 rounded text-xs bg-gray-50 text-gray-600">
                        <span>👍</span>
                        <span className="text-xs font-medium">{voteData.likes}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 px-2 py-1 rounded text-xs bg-gray-50 text-gray-600">
                        <span>👎</span>
                        <span className="text-xs font-medium">{voteData.dislikes}</span>
                      </div>
                    </div>

                    {/* Compare Button */}
                    <Link
                      href={`/compare/${comparison.slug}`}
                      className="group relative w-full px-4 md:px-6 py-2.5 md:py-3 rounded-lg border-2 font-medium text-center transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 overflow-hidden text-sm md:text-base"
                      style={{ borderColor: '#7cc6ee', color: '#7cc6ee' }}
                    >
                      {/* Button background animation */}
                      <div 
                        className="absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" 
                        style={{ backgroundColor: '#7cc6ee' }}
                      ></div>
                      
                      {/* Button text */}
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                        <svg className="w-3 h-3 md:w-4 md:h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="hidden sm:inline">Compare Now</span>
                        <span className="sm:hidden">Compare</span>
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        {comparisons.length > itemsPerView && (
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  currentIndex === index ? 'scale-125 shadow-md' : 'hover:opacity-80'
                }`}
                style={{ backgroundColor: currentIndex === index ? '#7cc6ee' : '#d1d5db' }}
              />
            ))}
          </div>
        )}

        {/* Mobile swipe hint */}
        {isMobile && comparisons.length > 1 && (
          <div className="flex justify-center mt-4">
            <p className="text-xs text-center" style={{ color: '#334155' }}>
              Swipe to see more comparisons
            </p>
          </div>
        )}
      </div>
    </section>
  );
}