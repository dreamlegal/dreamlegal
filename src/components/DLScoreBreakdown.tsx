// import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronUp } from 'lucide-react';

// interface DLScoreBreakdownProps {
//   productId?: string;
//   slug?: string;
//   isMobile?: boolean;
// }

// const DLScoreBreakdown = ({ productId, slug, isMobile = false }: DLScoreBreakdownProps) => {
//   const [scoreData, setScoreData] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [isExpanded, setIsExpanded] = useState(false);

//   useEffect(() => {
//     const fetchScore = async () => {
//       try {
//         const params = new URLSearchParams();
//         if (productId) params.append('productId', productId);
//         if (slug) params.append('slug', slug);
//         params.append('breakdown', 'true');

//         const response = await fetch(`/api/dl-score?${params}`);
//         const data = await response.json();
        
//         if (data.success) {
//           setScoreData(data);
//         }
//       } catch (error) {
//         console.error('Error fetching DL score:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (productId || slug) {
//       fetchScore();
//     }
//   }, [productId, slug]);

//   if (loading) {
//     return (
//       <div className="bg-gray-50 rounded-lg p-3">
//         <div className="animate-pulse space-y-3">
//           <div className="h-16 bg-gray-200 rounded"></div>
//           <div className="h-8 bg-gray-200 rounded"></div>
//         </div>
//       </div>
//     );
//   }

//   if (!scoreData?.hasScore) {
//     return (
//       <div className="bg-gray-50 rounded-lg p-3 text-center">
//         <div className="text-gray-400 mb-1">
//           <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//           </svg>
//         </div>
//         <p className="text-sm font-medium text-gray-600">DL Score</p>
//         <p className="text-xs text-gray-500 mt-1">Not Available</p>
//       </div>
//     );
//   }

//   const getBandColor = (band: string) => {
//     const colors = {
//       'TOP_PERFORMER': { bg: 'from-green-500 to-emerald-600', text: 'text-green-600' },
//       'STRONG_MOMENTUM': { bg: 'from-blue-500 to-cyan-600', text: 'text-blue-600' },
//       'STEADY_PLAYER': { bg: 'from-yellow-500 to-amber-600', text: 'text-yellow-600' },
//       'LOW_VISIBILITY': { bg: 'from-orange-500 to-red-600', text: 'text-orange-600' },
//       'DORMANT': { bg: 'from-gray-500 to-gray-600', text: 'text-gray-600' }
//     };
//     return colors[band as keyof typeof colors] || colors.DORMANT;
//   };

//   const getBandLabel = (band: string) => {
//     return band?.replace(/_/g, ' ') || 'N/A';
//   };

//   const bandColors = getBandColor(scoreData.dlBand);

//   return (
//     <div className="bg-gray-50 rounded-lg p-3">
//       {/* Main Score Display */}
//       <div 
//         className={`bg-gradient-to-r ${bandColors.bg} rounded-lg p-4 mb-3 text-white shadow-sm`}
//       >
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-xs font-medium opacity-90 mb-1">DL Score</p>
//             <div className="flex items-baseline gap-2">
//               <span className="text-3xl font-bold">{scoreData.dlScore}</span>
//               <span className="text-sm opacity-75">/ 100</span>
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
//               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             </div>
//           </div>
//         </div>
//         <div className="mt-2 pt-2 border-t border-white/20">
//           <p className="text-xs font-medium">{getBandLabel(scoreData.dlBand)}</p>
//         </div>
//       </div>

//       {/* Breakdown Toggle */}
//       <button
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-100 transition-colors text-left"
//       >
//         <span className="text-sm font-medium" style={{ color: '#1e2556' }}>
//           Score Breakdown
//         </span>
//         {isExpanded ? (
//           <ChevronUp className="w-4 h-4 text-gray-600" />
//         ) : (
//           <ChevronDown className="w-4 h-4 text-gray-600" />
//         )}
//       </button>

//       {/* Expanded Breakdown */}
//       {isExpanded && scoreData.breakdown && (
//         <div className="mt-2 space-y-2">
//           {/* Engagement Momentum */}
//           <div className="bg-white rounded-lg p-3 border border-gray-200">
//             <div className="flex items-center justify-between mb-2">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//                 <span className="text-xs font-medium" style={{ color: '#1e2556' }}>
//                   Engagement
//                 </span>
//               </div>
//               <span className="text-xs font-bold" style={{ color: '#7cc6ee' }}>
//                 {scoreData.breakdown.engagementMomentum.percent}%
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-1.5">
//               <div 
//                 className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
//                 style={{ width: `${scoreData.breakdown.engagementMomentum.percent}%` }}
//               ></div>
//             </div>
//           </div>

//           {/* Trust & Credibility */}
//           <div className="bg-white rounded-lg p-3 border border-gray-200">
//             <div className="flex items-center justify-between mb-2">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                 <span className="text-xs font-medium" style={{ color: '#1e2556' }}>
//                   Trust
//                 </span>
//               </div>
//               <span className="text-xs font-bold text-green-600">
//                 {scoreData.breakdown.trustCredibility.percent}%
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-1.5">
//               <div 
//                 className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
//                 style={{ width: `${scoreData.breakdown.trustCredibility.percent}%` }}
//               ></div>
//             </div>
//           </div>

//           {/* Buyer Intent */}
//           <div className="bg-white rounded-lg p-3 border border-gray-200">
//             <div className="flex items-center justify-between mb-2">
//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 rounded-full bg-purple-500"></div>
//                 <span className="text-xs font-medium" style={{ color: '#1e2556' }}>
//                   Buyer Intent
//                 </span>
//               </div>
//               <span className="text-xs font-bold text-purple-600">
//                 {scoreData.breakdown.buyerIntent.percent}%
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-1.5">
//               <div 
//                 className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
//                 style={{ width: `${scoreData.breakdown.buyerIntent.percent}%` }}
//               ></div>
//             </div>
//           </div>

//           {/* Info Footer */}
//           <div className="mt-3 p-2 bg-blue-50 rounded-md">
//             <p className="text-xs text-gray-600">
//               <span className="font-medium" style={{ color: '#1e2556' }}>Updated:</span> {new Date().toLocaleDateString('default', { month: 'short', year: 'numeric' })}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DLScoreBreakdown;
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DLScoreBreakdownProps {
  productId?: string;
  slug?: string;
  isMobile?: boolean;
}

const DLScoreBreakdown = ({ productId, slug, isMobile = false }: DLScoreBreakdownProps) => {
  const [scoreData, setScoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const params = new URLSearchParams();
        if (productId) params.append('productId', productId);
        if (slug) params.append('slug', slug);
        params.append('breakdown', 'true');

        const response = await fetch(`/api/dl-score?${params}`);
        const data = await response.json();
        
        if (data.success) {
          setScoreData(data);
        }
      } catch (error) {
        console.error('Error fetching DL score:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId || slug) {
      fetchScore();
    }
  }, [productId, slug]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg p-3 border border-gray-100">
        <div className="animate-pulse space-y-2">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!scoreData?.hasScore) {
    return (
      <div className="bg-white rounded-lg p-3 border border-gray-100 text-center">
        <div className="text-gray-300 mb-1">
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-xs font-medium" style={{ color: '#334155' }}>DL Score</p>
        <p className="text-xs text-gray-400 mt-0.5">Not Available</p>
      </div>
    );
  }

  const getBandColor = (band: string) => {
    const colors = {
      'TOP_PERFORMER': '#22c55e',
      'STRONG_MOMENTUM': '#7cc6ee',
      'STEADY_PLAYER': '#eab308',
      'LOW_VISIBILITY': '#f97316',
      'DORMANT': '#9ca3af'
    };
    return colors[band as keyof typeof colors] || '#9ca3af';
  };

  const getBandLabel = (band: string) => {
    const labels = {
      'TOP_PERFORMER': 'Top Performer',
      'STRONG_MOMENTUM': 'Strong Momentum',
      'STEADY_PLAYER': 'Steady Player',
      'LOW_VISIBILITY': 'Low Visibility',
      'DORMANT': 'Dormant'
    };
    return labels[band as keyof typeof labels] || 'N/A';
  };

  const bandColor = getBandColor(scoreData.dlBand);

  return (
    // <div className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
    //   {/* Compact Main Score */}
    //   <div className="p-3" style={{ backgroundColor: '#f5f7fa' }}>
    //     <div className="flex items-center justify-between">
    //       <div className="flex items-center gap-2">
    //         <div 
    //           className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm"
    //           style={{ backgroundColor: bandColor }}
    //         >
    //           <span className="text-white text-base font-bold">{scoreData.dlScore}</span>
    //         </div>
    //         <div>
    //           <p className="text-xs font-bold" style={{ color: '#1e2556' }}>DL Score</p>
    //           <p className="text-xs" style={{ color: bandColor }}>{getBandLabel(scoreData.dlBand)}</p>
    //         </div>
    //       </div>
          
    //       <button
    //         onClick={() => setIsExpanded(!isExpanded)}
    //         className="p-1.5 rounded-md hover:bg-white transition-colors"
    //         title={isExpanded ? "Hide breakdown" : "Show breakdown"}
    //       >
    //         {isExpanded ? (
    //           <ChevronUp className="w-4 h-4" style={{ color: '#334155' }} />
    //         ) : (
    //           <ChevronDown className="w-4 h-4" style={{ color: '#334155' }} />
    //         )}
    //       </button>
    //     </div>
    //   </div>

    //   {/* Compact Breakdown */}
    //   {isExpanded && scoreData.breakdown && (
    //     <div className="px-3 pb-3 space-y-2">
    //       {/* Engagement */}
    //       <div className="pt-2 border-t border-gray-100">
    //         <div className="flex items-center justify-between mb-1">
    //           <div className="flex items-center gap-1.5">
    //             <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#7cc6ee' }}></div>
    //             <span className="text-xs font-medium" style={{ color: '#334155' }}>Features</span>
    //           </div>
    //           <span className="text-xs font-bold" style={{ color: '#7cc6ee' }}>
    //             {scoreData.breakdown.engagementMomentum.percent}%
    //           </span>
    //         </div>
    //         <div className="w-full bg-gray-100 rounded-full h-1">
    //           <div 
    //             className="h-1 rounded-full transition-all duration-500"
    //             style={{ 
    //               backgroundColor: '#7cc6ee',
    //               width: `${scoreData.breakdown.engagementMomentum.percent}%` 
    //             }}
    //           ></div>
    //         </div>
    //       </div>

    //       {/* Trust */}
    //       <div>
    //         <div className="flex items-center justify-between mb-1">
    //           <div className="flex items-center gap-1.5">
    //             <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
    //             <span className="text-xs font-medium" style={{ color: '#334155' }}>Reviews</span>
    //           </div>
    //           <span className="text-xs font-bold text-green-600">
    //             {scoreData.breakdown.trustCredibility.percent}%
    //           </span>
    //         </div>
    //         <div className="w-full bg-gray-100 rounded-full h-1">
    //           <div 
    //             className="bg-green-500 h-1 rounded-full transition-all duration-500"
    //             style={{ width: `${scoreData.breakdown.trustCredibility.percent}%` }}
    //           ></div>
    //         </div>
    //       </div>

    //       {/* Buyer Intent */}
    //       <div>
    //         <div className="flex items-center justify-between mb-1">
    //           <div className="flex items-center gap-1.5">
    //             <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#1e2556' }}></div>
    //             <span className="text-xs font-medium" style={{ color: '#334155' }}>Momentum</span>
    //           </div>
    //           <span className="text-xs font-bold" style={{ color: '#1e2556' }}>
    //             {scoreData.breakdown.buyerIntent.percent}%
    //           </span>
    //         </div>
    //         <div className="w-full bg-gray-100 rounded-full h-1">
    //           <div 
    //             className="h-1 rounded-full transition-all duration-500"
    //             style={{ 
    //               backgroundColor: '#1e2556',
    //               width: `${scoreData.breakdown.buyerIntent.percent}%` 
    //             }}
    //           ></div>
    //         </div>
    //       </div>

    //       {/* Compact Info */}
    //       <div className="pt-2 text-center">
    //         <p className="text-xs" style={{ color: '#9ca3af' }}>
    //           Updated {new Date().toLocaleDateString('default', { month: 'short' })} {new Date().getFullYear()}
    //         </p>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <></>
  );
};

export default DLScoreBreakdown;