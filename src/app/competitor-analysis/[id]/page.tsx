
// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import Link from 'next/link';
// // import { useParams } from 'next/navigation';

// // interface Article {
// //   id: string;
// //   title: string;
// //   url: string;
// //   category: string;
// // }

// // interface Reviews {
// //   positive: string[];
// //   negative: string[];
// //   neutral: string[];
// //   rawContent: string;
// // }

// // interface CompanyInfo {
// //   source: string;
// //   companyName: string;
// //   website: string;
// //   yearFounded: string;
// //   headquarters: string;
// //   foundersNames: string;
// //   teamSize: string;
// //   awards: string;
// //   contact: string;
// //   founderVision?: string;
// //   regionServed?: string;
// //   overview?: string;
// //   productInfo: {
// //     id: string;
// //     name: string;
// //     logoUrl: string;
// //     category: string[];
// //   };
// // }

// // interface AnalysisDetail {
// //   id: string;
// //   companyName: string;
// //   totalArticlesCount: number;
// //   keyInsights: string[];
// //   reviews: Reviews;
// //   createdAt: string;
// //   updatedAt: string;
// //   articles: Article[];
// //   companyInfo: CompanyInfo | null;
// //   hasCompanyInfo: boolean;
// // }

// // export default function AnalysisDetailPage() {
// //   const params = useParams();
// //   const id = params.id as string;
  
// //   const [analysis, setAnalysis] = useState<AnalysisDetail | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [activeTab, setActiveTab] = useState<'insights' | 'articles' | 'reviews' | 'company'>('insights');

// //   useEffect(() => {
// //     if (id) {
// //       fetchAnalysis();
// //     }
// //   }, [id]);

// //   const fetchAnalysis = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await fetch(`/api/analyses/${id}`);
      
// //       if (!response.ok) {
// //         if (response.status === 404) {
// //           throw new Error('Analysis not found');
// //         }
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
      
// //       const data: AnalysisDetail = await response.json();
// //       setAnalysis(data);
// //       setLoading(false);
// //     } catch (err) {
// //       console.error('Error fetching analysis:', err);
// //       setError(err instanceof Error ? err.message : 'Unknown error');
// //       setLoading(false);
// //     }
// //   };

// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric',
// //       hour: '2-digit',
// //       minute: '2-digit'
// //     });
// //   };

// //   const getCategoryColor = (category: string) => {
// //     const colors: { [key: string]: string } = {
// //       'Funding': 'bg-green-100 text-green-800',
// //       'Partnerships': 'bg-blue-100 text-blue-800',
// //       'Client wins': 'bg-purple-100 text-purple-800',
// //       'Feature launches': 'bg-orange-100 text-orange-800',
// //       'Geographic expansion': 'bg-yellow-100 text-yellow-800',
// //       'Talent moves': 'bg-pink-100 text-pink-800',
// //       'Reports': 'bg-indigo-100 text-indigo-800',
// //       'Beta programs': 'bg-teal-100 text-teal-800',
// //       'Event participation': 'bg-red-100 text-red-800',
// //       'Miscellaneous': 'bg-gray-100 text-gray-800',
// //       'Uncategorized': 'bg-gray-100 text-gray-600'
// //     };
// //     return colors[category] || colors['Uncategorized'];
// //   };

// //   const getCategoryStats = () => {
// //     if (!analysis) return {};
    
// //     const stats: { [key: string]: number } = {};
// //     analysis.articles.forEach(article => {
// //       stats[article.category] = (stats[article.category] || 0) + 1;
// //     });
// //     return stats;
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading analysis...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <p className="text-red-600 mb-4">Error: {error}</p>
// //           <div className="space-x-4">
// //             <button 
// //               onClick={fetchAnalysis}
// //               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// //             >
// //               Retry
// //             </button>
// //             <Link 
// //               href="/competitor_analysis/all"
// //               className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
// //             >
// //               Back to List
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!analysis) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <p className="text-gray-600 mb-4">Analysis not found</p>
// //           <Link 
// //             href="/competitor_analysis/all"
// //             className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
// //           >
// //             Back to List
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const categoryStats = getCategoryStats();

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <div className="bg-white shadow-sm border-b">
// //         <div className="max-w-7xl mx-auto px-4 py-6">
// //           <div className="flex justify-between items-start">
// //             <div>
// //               <div className="flex items-center space-x-4 mb-2">
// //                 <Link 
// //                   href="/competitor_analysis"
// //                   className="text-blue-600 hover:text-blue-700 flex items-center"
// //                 >
// //                   ← Back to All Analyses
// //                 </Link>
// //               </div>
// //               <h1 className="text-3xl font-bold text-gray-900">
// //                 🏢 {analysis.companyName}
// //               </h1>
              
// //             </div>
            
// //           </div>
// //         </div>
// //       </div>

// //       {/* Tabs */}
// //       <div className="bg-white border-b">
// //         <div className="max-w-7xl mx-auto px-4">
// //           <nav className="flex space-x-8">
// //             {[
// //               { key: 'insights', label: '💡 Key Insights', count: analysis.keyInsights.length },
// //               { key: 'articles', label: '📄 Articles', count: analysis.articles.length },
// //               { key: 'reviews', label: '⭐ Reviews', count: (analysis.reviews.positive?.length || 0) + (analysis.reviews.negative?.length || 0) + (analysis.reviews.neutral?.length || 0) },
// //               { key: 'company', label: '🏢 Company Info', count: analysis.hasCompanyInfo ? 1 : 0 }
// //             ].map((tab) => (
// //               <button
// //                 key={tab.key}
// //                 onClick={() => setActiveTab(tab.key as any)}
// //                 className={`py-4 px-2 border-b-2 font-medium text-sm ${
// //                   activeTab === tab.key
// //                     ? 'border-blue-500 text-blue-600'
// //                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //                 }`}
// //               >
// //                 {tab.label} {tab.key !== 'company' && `(${tab.count})`}
// //               </button>
// //             ))}
// //           </nav>
// //         </div>
// //       </div>

// //       {/* Content */}
// //       <div className="max-w-7xl mx-auto px-4 py-8">
// //         {activeTab === 'insights' && (
// //           <div className="space-y-6">
// //             <div className="bg-white rounded-lg shadow-sm border p-6">
// //               <h2 className="text-xl font-semibold text-gray-900 mb-4">💡 Key Insights</h2>
// //               {analysis.keyInsights.length > 0 ? (
// //                 <ul className="space-y-3">
// //                   {analysis.keyInsights.map((insight, index) => (
// //                     <li key={index} className="flex items-start">
// //                       <span className="text-blue-500 mr-3 mt-1">•</span>
// //                       <span className="text-gray-700">{insight.replace('•', '').trim()}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               ) : (
// //                 <p className="text-gray-500">No key insights available</p>
// //               )}
// //             </div>

// //             {/* Category Overview */}
           
// //           </div>
// //         )}

// //         {activeTab === 'articles' && (
// //           <div className="space-y-6">
// //             {Object.entries(categoryStats).map(([category, count]) => (
// //               <div key={category} className="bg-white rounded-lg shadow-sm border p-6">
// //                 <div className="flex items-center justify-between mb-4">
// //                   <h2 className="text-xl font-semibold text-gray-900 flex items-center">
// //                     <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mr-3 ${getCategoryColor(category)}`}>
// //                       {category}
// //                     </span>
// //                     ({count} articles)
// //                   </h2>
// //                 </div>
// //                 <div className="space-y-3">
// //                   {analysis.articles
// //                     .filter(article => article.category === category)
// //                     .map((article) => (
// //                       <div key={article.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
// //                         <div className="flex items-start justify-between">
// //                           <div className="flex-1 min-w-0">
// //                             <h3 className="text-lg font-medium text-gray-900 mb-2">
// //                               {article.title}
// //                             </h3>
// //                             <a 
// //                               href={article.url}
// //                               target="_blank"
// //                               rel="noopener noreferrer"
// //                               className="text-blue-600 hover:text-blue-700 text-sm break-all"
// //                             >
// //                               {article.url} ↗
// //                             </a>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {activeTab === 'reviews' && (
// //           <div className="space-y-6">
// //             {/* Reviews Summary */}
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //               <div className="bg-green-50 border border-green-200 rounded-lg p-6">
// //                 <h3 className="text-lg font-semibold text-green-900 mb-2">✅ Positive</h3>
// //                 <p className="text-3xl font-bold text-green-600">{analysis.reviews.positive?.length || 0}</p>
// //                 <p className="text-sm text-green-700">positive points</p>
// //               </div>
// //               <div className="bg-red-50 border border-red-200 rounded-lg p-6">
// //                 <h3 className="text-lg font-semibold text-red-900 mb-2">❌ Negative</h3>
// //                 <p className="text-3xl font-bold text-red-600">{analysis.reviews.negative?.length || 0}</p>
// //                 <p className="text-sm text-red-700">negative points</p>
// //               </div>
// //               <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
// //                 <h3 className="text-lg font-semibold text-gray-900 mb-2">ℹ️ Neutral</h3>
// //                 <p className="text-3xl font-bold text-gray-600">{analysis.reviews.neutral?.length || 0}</p>
// //                 <p className="text-sm text-gray-700">neutral points</p>
// //               </div>
// //             </div>

// //             {/* Positive Reviews */}
// //             {analysis.reviews.positive && analysis.reviews.positive.length > 0 && (
// //               <div className="bg-white rounded-lg shadow-sm border p-6">
// //                 <h2 className="text-xl font-semibold text-green-900 mb-4">✅ Positive Reviews</h2>
// //                 <ul className="space-y-3">
// //                   {analysis.reviews.positive.map((point, index) => (
// //                     <li key={index} className="flex items-start">
// //                       <span className="text-green-500 mr-3 mt-1">✓</span>
// //                       <span className="text-gray-700">{point.replace('•', '').trim()}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             )}

// //             {/* Negative Reviews */}
// //             {analysis.reviews.negative && analysis.reviews.negative.length > 0 && (
// //               <div className="bg-white rounded-lg shadow-sm border p-6">
// //                 <h2 className="text-xl font-semibold text-red-900 mb-4">❌ Negative Reviews</h2>
// //                 <ul className="space-y-3">
// //                   {analysis.reviews.negative.map((point, index) => (
// //                     <li key={index} className="flex items-start">
// //                       <span className="text-red-500 mr-3 mt-1">✗</span>
// //                       <span className="text-gray-700">{point.replace('•', '').trim()}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             )}

// //             {/* Neutral Reviews */}
// //             {analysis.reviews.neutral && analysis.reviews.neutral.length > 0 && (
// //               <div className="bg-white rounded-lg shadow-sm border p-6">
// //                 <h2 className="text-xl font-semibold text-gray-900 mb-4">ℹ️ Neutral Facts</h2>
// //                 <ul className="space-y-3">
// //                   {analysis.reviews.neutral.map((point, index) => (
// //                     <li key={index} className="flex items-start">
// //                       <span className="text-gray-500 mr-3 mt-1">•</span>
// //                       <span className="text-gray-700">{point.replace('•', '').trim()}</span>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               </div>
// //             )}

// //             {/* Raw Reviews Content */}
// //             {analysis.reviews.rawContent && (
// //               <div className="bg-white rounded-lg shadow-sm border p-6">
// //                 <h2 className="text-xl font-semibold text-gray-900 mb-4">📝 Raw Reviews Content</h2>
// //                 <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
// //                   <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
// //                     {analysis.reviews.rawContent}
// //                   </pre>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {activeTab === 'company' && (
// //           <div className="space-y-6">
// //             {analysis.hasCompanyInfo && analysis.companyInfo ? (
// //               <>
// //                 <div className="bg-white rounded-lg shadow-sm border p-6">
// //                   <div className="flex items-center justify-between mb-4">
// //                     <h2 className="text-xl font-semibold text-gray-900">🏢 Company Information</h2>
// //                     <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
// //                       Source: {analysis.companyInfo.source}
// //                     </span>
// //                   </div>
                  
// //                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                     {/* Company Logo & Basic Info */}
// //                     <div className="col-span-1 md:col-span-2 lg:col-span-1">
// //                       <div className="flex items-center space-x-4 mb-4">
// //                         {analysis.companyInfo.productInfo?.logoUrl && (
// //                           <img 
// //                             src={analysis.companyInfo.productInfo.logoUrl} 
// //                             alt="Company Logo"
// //                             className="w-16 h-16 rounded-lg object-cover border"
// //                           />
// //                         )}
// //                         <div>
// //                           <h3 className="text-lg font-semibold text-gray-900">{analysis.companyInfo.companyName}</h3>
// //                           {analysis.companyInfo.productInfo?.name && (
// //                             <p className="text-gray-600">{analysis.companyInfo.productInfo.name}</p>
// //                           )}
// //                         </div>
// //                       </div>
// //                       {analysis.companyInfo.website && (
// //                         <a 
// //                           href={analysis.companyInfo.website} 
// //                           target="_blank" 
// //                           rel="noopener noreferrer"
// //                           className="text-blue-600 hover:text-blue-700 text-sm"
// //                         >
// //                           Visit Website ↗
// //                         </a>
// //                       )}
// //                     </div>

// //                     {/* Foundation Details */}
// //                     <div>
// //                       <h4 className="font-semibold text-gray-900 mb-3">Foundation</h4>
// //                       <div className="space-y-2 text-sm">
// //                         {analysis.companyInfo.yearFounded && (
// //                           <div>
// //                             <span className="text-gray-600">Founded:</span>
// //                             <span className="text-gray-900 ml-2">{analysis.companyInfo.yearFounded}</span>
// //                           </div>
// //                         )}
// //                         {analysis.companyInfo.headquarters && (
// //                           <div>
// //                             <span className="text-gray-600">Headquarters:</span>
// //                             <span className="text-gray-900 ml-2">{analysis.companyInfo.headquarters}</span>
// //                           </div>
// //                         )}
// //                         {analysis.companyInfo.foundersNames && (
// //                           <div>
// //                             <span className="text-gray-600">Founders:</span>
// //                             <span className="text-gray-900 ml-2">{analysis.companyInfo.foundersNames}</span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>

// //                     {/* Business Details */}
// //                     <div>
// //                       <h4 className="font-semibold text-gray-900 mb-3">Business</h4>
// //                       <div className="space-y-2 text-sm">
// //                         {analysis.companyInfo.teamSize && (
// //                           <div>
// //                             <span className="text-gray-600">Team Size:</span>
// //                             <span className="text-gray-900 ml-2">{analysis.companyInfo.teamSize}</span>
// //                           </div>
// //                         )}
// //                         {analysis.companyInfo.awards && (
// //                           <div>
// //                             <span className="text-gray-600">Awards:</span>
// //                             <span className="text-gray-900 ml-2">{analysis.companyInfo.awards}</span>
// //                           </div>
// //                         )}
// //                         {analysis.companyInfo.contact && (
// //                           <div>
// //                             <span className="text-gray-600">Contact:</span>
// //                             <span className="text-gray-900 ml-2">{analysis.companyInfo.contact}</span>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Additional Info */}
// //                 {(analysis.companyInfo.overview || analysis.companyInfo.founderVision) && (
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     {analysis.companyInfo.overview && (
// //                       <div className="bg-white rounded-lg shadow-sm border p-6">
// //                         <h4 className="font-semibold text-gray-900 mb-3">Company Overview</h4>
// //                         <p className="text-gray-700 text-sm leading-relaxed">{analysis.companyInfo.overview}</p>
// //                       </div>
// //                     )}
// //                     {analysis.companyInfo.founderVision && (
// //                       <div className="bg-white rounded-lg shadow-sm border p-6">
// //                         <h4 className="font-semibold text-gray-900 mb-3">Founder Vision</h4>
// //                         <p className="text-gray-700 text-sm leading-relaxed">{analysis.companyInfo.founderVision}</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}
// //               </>
// //             ) : (
// //               <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
// //                 <div className="text-gray-400 text-6xl mb-4">🏢</div>
// //                 <h3 className="text-lg font-semibold text-gray-900 mb-2">No Company Information Available</h3>
// //                 <p className="text-gray-600">Company information could not be found or matched for this analysis.</p>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// "use client"
// import React, { useState, useEffect } from 'react';
// import { ArrowLeft, ExternalLink, Building2, Star, TrendingUp, Users, Calendar, Globe } from 'lucide-react';

// const PremiumAnalysisPage = () => {
//   const [analysis, setAnalysis] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Get ID from URL params (you'll need to pass this as a prop or use router)
//   const id = window.location.pathname.split('/').pop() || 'demo-id';

//   useEffect(() => {
//     if (id) {
//       fetchAnalysis();
//     }
//   }, [id]);

//   const fetchAnalysis = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(`/api/analyses/${id}`);
      
//       if (!response.ok) {
//         if (response.status === 404) {
//           throw new Error('Analysis not found');
//         }
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
//       setAnalysis(data);
//       setLoading(false);
//     } catch (err) {
//       console.error('Error fetching analysis:', err);
//       setError(err instanceof Error ? err.message : 'Unknown error');
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       'Funding': 'bg-green-100 text-green-800 border-green-200',
//       'Partnerships': 'bg-blue-100 text-blue-800 border-blue-200',
//       'Client wins': 'bg-purple-100 text-purple-800 border-purple-200',
//       'Feature launches': 'bg-orange-100 text-orange-800 border-orange-200',
//       'Geographic expansion': 'bg-yellow-100 text-yellow-800 border-yellow-200',
//       'Talent moves': 'bg-pink-100 text-pink-800 border-pink-200',
//       'Reports': 'bg-indigo-100 text-indigo-800 border-indigo-200',
//       'Beta programs': 'bg-teal-100 text-teal-800 border-teal-200',
//       'Event participation': 'bg-red-100 text-red-800 border-red-200',
//       'Awards': 'bg-amber-100 text-amber-800 border-amber-200',
//       'Miscellaneous': 'bg-gray-100 text-gray-800 border-gray-200',
//       'Uncategorized': 'bg-gray-100 text-gray-600 border-gray-200'
//     };
//     return colors[category] || colors['Uncategorized'];
//   };

//   const getCategoryStats = () => {
//     if (!analysis) return {};
    
//     const stats = {};
//     analysis.articles.forEach(article => {
//       stats[article.category] = (stats[article.category] || 0) + 1;
//     });
//     return stats;
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center pt-20">
//         <div className="text-center">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-500 mx-auto mb-6"></div>
//             <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-300 animate-ping mx-auto"></div>
//           </div>
//           <p className="text-slate-600 font-medium">Loading analysis...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center pt-20">
//         <div className="text-center max-w-md mx-auto px-6">
//           <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-6">
//             <div className="text-red-500 text-5xl mb-4">⚠️</div>
//             <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Analysis</h3>
//             <p className="text-red-700 mb-6">{error}</p>
//             <div className="space-x-4">
//               <button 
//                 onClick={fetchAnalysis}
//                 className="px-6 py-3 bg-[#1e2556] text-white rounded-xl hover:bg-[#2a3369] transition-all duration-200 transform hover:scale-105 font-medium"
//               >
//                 Try Again
//               </button>
//               <button 
//                 onClick={() => window.history.back()}
//                 className="px-6 py-3 bg-[#7cc6ee] text-white rounded-xl hover:bg-[#6bb8e0] transition-all duration-200 transform hover:scale-105 font-medium"
//               >
//                 Go Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!analysis) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center pt-20">
//         <div className="text-center">
//           <p className="text-slate-600 mb-6">Analysis not found</p>
//           <button 
//             onClick={() => window.history.back()}
//             className="px-6 py-3 bg-[#1e2556] text-white rounded-xl hover:bg-[#2a3369] transition-all duration-200 transform hover:scale-105 font-medium"
//           >
//             Back to List
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const categoryStats = getCategoryStats();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
//       {/* Header */}
//       <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-40">
//         <div className="max-w-6xl mx-auto px-6 py-4">
//           <div className="flex items-center space-x-3 mb-4">
//             <button 
//               onClick={() => window.history.back()}
//               className="flex items-center space-x-2 text-[#7cc6ee] hover:text-[#6bb8e0] transition-colors duration-200 group"
//             >
//               <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
//               <span className="font-medium text-sm">Back to Analyses</span>
//             </button>
//           </div>
          
//           <div className="flex items-start justify-between">
//             <div className="flex-1">
//               <div className="flex items-center space-x-3 mb-2">
//                 <div className="w-12 h-12 bg-gradient-to-br from-[#1e2556] to-[#2a3369] rounded-xl flex items-center justify-center">
//                   <Building2 className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold text-[#1e2556] mb-1">
//                     {analysis.companyName}
//                   </h1>
//                   <p className="text-[#334155] text-sm">Comprehensive competitor analysis</p>
//                 </div>
//               </div>
//             </div>
            
//             <div className="text-right">
//               <div className="bg-[#f5f7fa] rounded-lg p-3 space-y-1">
//                 <div className="flex items-center space-x-2 text-xs">
//                   <TrendingUp className="w-3 h-3 text-[#7cc6ee]" />
//                   <span className="text-[#334155]">{analysis.totalArticlesCount || analysis.articles?.length || 0} Articles</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-xs">
//                   <Calendar className="w-3 h-3 text-[#7cc6ee]" />
//                   <span className="text-[#334155]">{analysis.createdAt ? formatDate(analysis.createdAt) : 'Recent'}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
//         {/* Articles Section */}
//         <section className="space-y-4 animate-fadeIn">
//           <div className="flex items-center space-x-2 mb-4">
//             <div className="w-8 h-8 bg-gradient-to-br from-[#7cc6ee] to-[#6bb8e0] rounded-lg flex items-center justify-center">
//               <TrendingUp className="w-4 h-4 text-white" />
//             </div>
//             <h2 className="text-xl font-bold text-[#1e2556]">Recent Articles</h2>
//             <span className="px-2 py-1 bg-[#7cc6ee] text-white rounded-full text-xs font-medium">
//               {analysis.articles?.length || 0}
//             </span>
//           </div>

//           <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
//             <div className="max-h-64 overflow-y-auto custom-scrollbar">
//               {analysis.articles && analysis.articles.length > 0 ? (
//                 <div className="divide-y divide-slate-100">
//                   {Object.entries(categoryStats).map(([category, count]) => (
//                     <div key={category} className="p-4">
//                       <div className="flex items-center justify-between mb-3">
//                         <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(category)}`}>
//                           {category}
//                         </span>
//                         <span className="text-[#334155] text-xs font-medium">{count} articles</span>
//                       </div>
//                       <div className="space-y-2">
//                         {analysis.articles
//                           .filter(article => article.category === category)
//                           .map((article, index) => (
//                             <div 
//                               key={article.id} 
//                               className="group p-3 bg-[#f5f7fa] rounded-lg hover:bg-slate-50 transition-all duration-200 hover:shadow-sm border border-transparent hover:border-slate-200"
//                               style={{ animationDelay: `${index * 0.05}s` }}
//                             >
//                               <h3 className="font-medium text-[#2d2d2d] mb-1 text-sm group-hover:text-[#1e2556] transition-colors duration-200 line-clamp-2">
//                                 {article.title}
//                               </h3>
//                               <a 
//                                 href={article.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="inline-flex items-center space-x-1 text-[#7cc6ee] hover:text-[#6bb8e0] text-xs font-medium transition-colors duration-200"
//                               >
//                                 <span>Read Article</span>
//                                 <ExternalLink className="w-3 h-3" />
//                               </a>
//                             </div>
//                           ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="p-8 text-center">
//                   <TrendingUp className="w-8 h-8 text-slate-300 mx-auto mb-3" />
//                   <p className="text-[#334155] font-medium text-sm">No articles found</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>

//         {/* Key Insights Section */}
//         <section className="space-y-4 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
//           <div className="flex items-center space-x-2 mb-4">
//             <div className="w-8 h-8 bg-gradient-to-br from-[#1e2556] to-[#2a3369] rounded-lg flex items-center justify-center">
//               <Star className="w-4 h-4 text-white" />
//             </div>
//             <h2 className="text-xl font-bold text-[#1e2556]">Key Insights</h2>
//             <span className="px-2 py-1 bg-[#1e2556] text-white rounded-full text-xs font-medium">
//               {analysis.keyInsights?.length || 0}
//             </span>
//           </div>

//           <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm">
//             {analysis.keyInsights && analysis.keyInsights.length > 0 ? (
//               <div className="space-y-3">
//                 {analysis.keyInsights.map((insight, index) => (
//                   <div 
//                     key={index} 
//                     className="flex items-start space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group"
//                     style={{ animationDelay: `${index * 0.05}s` }}
//                   >
//                     <div className="w-6 h-6 bg-gradient-to-br from-[#7cc6ee] to-[#6bb8e0] rounded-md flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
//                       <span className="text-white font-bold text-xs">{index + 1}</span>
//                     </div>
//                     <p className="text-[#2d2d2d] leading-relaxed font-medium text-sm">{insight.replace('•', '').trim()}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-8">
//                 <Star className="w-8 h-8 text-slate-300 mx-auto mb-3" />
//                 <p className="text-[#334155] font-medium text-sm">No key insights available</p>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Company Info Section */}
//         {analysis.hasCompanyInfo && analysis.companyInfo && (
//           <section className="space-y-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
//             <div className="flex items-center space-x-2 mb-4">
//               <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
//                 <Building2 className="w-4 h-4 text-white" />
//               </div>
//               <h2 className="text-xl font-bold text-[#1e2556]">Company Information</h2>
//             </div>

//             <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm">
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Company Logo & Basic Info */}
//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-3">
//                     {analysis.companyInfo.productInfo?.logoUrl ? (
//                       <img 
//                         src={analysis.companyInfo.productInfo.logoUrl} 
//                         alt="Company Logo"
//                         className="w-10 h-10 rounded-lg object-cover"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 bg-[#1e2556] rounded-lg flex items-center justify-center">
//                         <Building2 className="w-5 h-5 text-white" />
//                       </div>
//                     )}
//                     <div>
//                       <h3 className="text-lg font-bold text-[#1e2556]">{analysis.companyInfo.companyName}</h3>
//                       {analysis.companyInfo.productInfo?.name && (
//                         <p className="text-sm text-[#334155]">{analysis.companyInfo.productInfo.name}</p>
//                       )}
//                     </div>
//                   </div>
//                   {analysis.companyInfo.website && (
//                     <a 
//                       href={analysis.companyInfo.website} 
//                       target="_blank" 
//                       rel="noopener noreferrer"
//                       className="inline-flex items-center space-x-1 text-[#7cc6ee] hover:text-[#6bb8e0] text-sm transition-colors duration-200"
//                     >
//                       <span>Visit Website</span>
//                       <ExternalLink className="w-3 h-3" />
//                     </a>
//                   )}
//                 </div>

//                 {/* Foundation Details */}
//                 <div>
//                   <h4 className="font-semibold text-[#1e2556] mb-3 text-sm">Foundation</h4>
//                   <div className="space-y-2">
//                     {analysis.companyInfo.yearFounded && (
//                       <div className="flex flex-col">
//                         <span className="text-xs text-[#334155] font-medium">Founded:</span>
//                         <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.yearFounded}</span>
//                       </div>
//                     )}
//                     {analysis.companyInfo.foundersNames && (
//                       <div className="flex flex-col">
//                         <span className="text-xs text-[#334155] font-medium">Founders:</span>
//                         <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.foundersNames}</span>
//                       </div>
//                     )}
//                     {analysis.companyInfo.headquarters && (
//                       <div className="flex flex-col">
//                         <span className="text-xs text-[#334155] font-medium">Headquarters:</span>
//                         <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.headquarters}</span>
//                       </div>
//                     )}
//                     {analysis.companyInfo.regionServed && (
//                       <div className="flex flex-col">
//                         <span className="text-xs text-[#334155] font-medium">Region Served:</span>
//                         <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.regionServed}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Business Details */}
//                 <div>
//                   <h4 className="font-semibold text-[#1e2556] mb-3 text-sm">Business</h4>
//                   <div className="space-y-2">
//                     {analysis.companyInfo.teamSize && (
//                       <div className="flex flex-col">
//                         <span className="text-xs text-[#334155] font-medium">Team Size:</span>
//                         <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.teamSize}</span>
//                       </div>
//                     )}
//                     {analysis.companyInfo.awards && (
//                       <div className="flex flex-col">
//                         <span className="text-xs text-[#334155] font-medium">Awards:</span>
//                         <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.awards}</span>
//                       </div>
//                     )}
//                     {analysis.companyInfo.contact && (
//                       <div className="flex flex-col">
//                         <span className="text-xs text-[#334155] font-medium">Contact:</span>
//                         <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.contact}</span>
//                       </div>
//                     )}
//                     {analysis.companyInfo.productInfo?.category && (
//                       <div className="flex flex-col">
//                         <span className="text-xs text-[#334155] font-medium">Category:</span>
//                         <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.productInfo.category.join(', ')}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Additional Info - Compact */}
//               {(analysis.companyInfo.overview || analysis.companyInfo.founderVision) && (
//                 <div className="mt-6 pt-6 border-t border-slate-100">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {analysis.companyInfo.overview && (
//                       <div>
//                         <h4 className="font-semibold text-[#1e2556] mb-2 text-sm">Company Overview</h4>
//                         <p className="text-sm text-[#2d2d2d] leading-relaxed">{analysis.companyInfo.overview}</p>
//                       </div>
//                     )}
//                     {analysis.companyInfo.founderVision && (
//                       <div>
//                         <h4 className="font-semibold text-[#1e2556] mb-2 text-sm">Founder Vision</h4>
//                         <p className="text-sm text-[#2d2d2d] leading-relaxed">{analysis.companyInfo.founderVision}</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </section>
//         )}

//         {/* Reviews Section */}
//         <section className="space-y-4 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
//           <div className="flex items-center space-x-2 mb-4">
//             <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
//               <Star className="w-4 h-4 text-white" />
//             </div>
//             <h2 className="text-xl font-bold text-[#1e2556]">Reviews Analysis</h2>
//           </div>

//           {/* Reviews Summary */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4 hover:shadow-md transition-all duration-300">
//               <div className="flex items-center space-x-2 mb-2">
//                 <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white text-sm">✓</span>
//                 </div>
//                 <h3 className="text-sm font-bold text-green-900">Positive</h3>
//               </div>
//               <p className="text-2xl font-bold text-green-600 mb-1">{analysis.reviews.positive?.length || 0}</p>
//               <p className="text-green-700 font-medium text-xs">positive points</p>
//             </div>

//             <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 rounded-xl p-4 hover:shadow-md transition-all duration-300">
//               <div className="flex items-center space-x-2 mb-2">
//                 <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white text-sm">✗</span>
//                 </div>
//                 <h3 className="text-sm font-bold text-red-900">Negative</h3>
//               </div>
//               <p className="text-2xl font-bold text-red-600 mb-1">{analysis.reviews.negative?.length || 0}</p>
//               <p className="text-red-700 font-medium text-xs">negative points</p>
//             </div>

//             <div className="bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-300">
//               <div className="flex items-center space-x-2 mb-2">
//                 <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
//                   <span className="text-white text-sm">•</span>
//                 </div>
//                 <h3 className="text-sm font-bold text-gray-900">Neutral</h3>
//               </div>
//               <p className="text-2xl font-bold text-gray-600 mb-1">{analysis.reviews.neutral?.length || 0}</p>
//               <p className="text-gray-700 font-medium text-xs">neutral points</p>
//             </div>
//           </div>

//           {/* Reviews Details */}
//           <div className="space-y-4">
//             {/* Positive Reviews */}
//             {analysis.reviews.positive && analysis.reviews.positive.length > 0 && (
//               <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
//                 <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
//                   <h3 className="text-lg font-bold text-white flex items-center space-x-2">
//                     <span className="text-lg">✓</span>
//                     <span>Positive Feedback</span>
//                   </h3>
//                 </div>
//                 <div className="p-4">
//                   <div className="space-y-2">
//                     {analysis.reviews.positive.map((point, index) => (
//                       <div 
//                         key={index} 
//                         className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-200"
//                         style={{ animationDelay: `${index * 0.05}s` }}
//                       >
//                         <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <span className="text-white text-xs font-bold">✓</span>
//                         </div>
//                         <p className="text-[#2d2d2d] leading-relaxed text-sm">{point.replace('•', '').trim()}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Negative Reviews */}
//             {analysis.reviews.negative && analysis.reviews.negative.length > 0 && (
//               <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
//                 <div className="bg-gradient-to-r from-red-500 to-rose-500 p-4">
//                   <h3 className="text-lg font-bold text-white flex items-center space-x-2">
//                     <span className="text-lg">✗</span>
//                     <span>Areas for Improvement</span>
//                   </h3>
//                 </div>
//                 <div className="p-4">
//                   <div className="space-y-2">
//                     {analysis.reviews.negative.map((point, index) => (
//                       <div 
//                         key={index} 
//                         className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200"
//                         style={{ animationDelay: `${index * 0.05}s` }}
//                       >
//                         <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <span className="text-white text-xs font-bold">✗</span>
//                         </div>
//                         <p className="text-[#2d2d2d] leading-relaxed text-sm">{point.replace('•', '').trim()}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Neutral Reviews */}
//             {analysis.reviews.neutral && analysis.reviews.neutral.length > 0 && (
//               <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
//                 <div className="bg-gradient-to-r from-gray-500 to-slate-500 p-4">
//                   <h3 className="text-lg font-bold text-white flex items-center space-x-2">
//                     <span className="text-lg">•</span>
//                     <span>Additional Information</span>
//                   </h3>
//                 </div>
//                 <div className="p-4">
//                   <div className="space-y-2">
//                     {analysis.reviews.neutral.map((point, index) => (
//                       <div 
//                         key={index} 
//                         className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
//                         style={{ animationDelay: `${index * 0.05}s` }}
//                       >
//                         <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                           <span className="text-white text-xs font-bold">•</span>
//                         </div>
//                         <p className="text-[#2d2d2d] leading-relaxed text-sm">{point.replace('•', '').trim()}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.6s ease-out forwards;
//         }
        
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: #7cc6ee #f1f5f9;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 3px;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #7cc6ee;
//           border-radius: 3px;
//         }
        
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #6bb8e0;
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default PremiumAnalysisPage;
"use client"
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Building2, Star, TrendingUp, Users, Calendar, Globe } from 'lucide-react';
import { useParams } from 'next/navigation';
const PremiumAnalysisPage = () => {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('insights');

  // Get ID from URL params (you'll need to pass this as a prop or use router)
//   const id = window.location.pathname.split('/').pop() || 'demo-id';

  const params = useParams();
  const id = params.id; 

  useEffect(() => {
    if (id) {
      fetchAnalysis();
    }
  }, [id]);

  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analyses/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Analysis not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAnalysis(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching analysis:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Funding': 'bg-green-100 text-green-800 border-green-200',
      'Partnerships': 'bg-blue-100 text-blue-800 border-blue-200',
      'Client wins': 'bg-purple-100 text-purple-800 border-purple-200',
      'Feature launches': 'bg-orange-100 text-orange-800 border-orange-200',
      'Geographic expansion': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Talent moves': 'bg-pink-100 text-pink-800 border-pink-200',
      'Reports': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Beta programs': 'bg-teal-100 text-teal-800 border-teal-200',
      'Event participation': 'bg-red-100 text-red-800 border-red-200',
      'Awards': 'bg-amber-100 text-amber-800 border-amber-200',
      'Miscellaneous': 'bg-gray-100 text-gray-800 border-gray-200',
      'Uncategorized': 'bg-gray-100 text-gray-600 border-gray-200'
    };
    return colors[category] || colors['Uncategorized'];
  };

  const getCategoryStats = () => {
    if (!analysis) return {};
    
    const stats = {};
    analysis.articles.forEach(article => {
      stats[article.category] = (stats[article.category] || 0) + 1;
    });
    return stats;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-300 animate-ping mx-auto"></div>
          </div>
          <p className="text-slate-600 font-medium">Loading analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center pt-20">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 mb-6">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Analysis</h3>
            <p className="text-red-700 mb-6">{error}</p>
            <div className="space-x-4">
              <button 
                onClick={fetchAnalysis}
                className="px-6 py-3 bg-[#1e2556] text-white rounded-xl hover:bg-[#2a3369] transition-all duration-200 transform hover:scale-105 font-medium"
              >
                Try Again
              </button>
              <button 
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-[#7cc6ee] text-white rounded-xl hover:bg-[#6bb8e0] transition-all duration-200 transform hover:scale-105 font-medium"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <p className="text-slate-600 mb-6">Analysis not found</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-[#1e2556] text-white rounded-xl hover:bg-[#2a3369] transition-all duration-200 transform hover:scale-105 font-medium"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  const categoryStats = getCategoryStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-slate-200/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-3 mb-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-[#7cc6ee] hover:text-[#6bb8e0] transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="font-medium text-sm">Back to All Analyses</span>
            </button>
          </div>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <div className="w-14 h-14 bg-gradient-to-br from-[#1e2556] to-[#2a3369] rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#1e2556] mb-1">
                    {analysis.companyName}
                  </h1>
                  <p className="text-[#334155]">Comprehensive competitor analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex space-x-8">
            {[
              { key: 'insights', label: '💡 Key Insights', count: analysis.keyInsights?.length || 0 },
              { key: 'articles', label: '📄 Articles', count: analysis.articles?.length || 0 },
              { key: 'reviews', label: '⭐ Reviews', count: (analysis.reviews?.positive?.length || 0) + (analysis.reviews?.negative?.length || 0) + (analysis.reviews?.neutral?.length || 0) },
              { key: 'company', label: '🏢 Company Info', count: analysis.hasCompanyInfo ? 1 : 0 }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'border-[#7cc6ee] text-[#1e2556] bg-gradient-to-t from-blue-50/50 to-transparent'
                    : 'border-transparent text-[#334155] hover:text-[#1e2556] hover:border-gray-300'
                }`}
              >
                {tab.label} {tab.key !== 'company' && `(${tab.count})`}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'insights' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-xl border border-slate-200/60 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#1e2556] mb-4 flex items-center space-x-2">
                <Star className="w-5 h-5 text-[#7cc6ee]" />
                <span>Key Insights</span>
              </h2>
              {analysis.keyInsights && analysis.keyInsights.length > 0 ? (
                <div className="space-y-3">
                  {analysis.keyInsights.map((insight, index) => (
                    <div 
                      key={index} 
                      className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-[#7cc6ee] to-[#6bb8e0] rounded-md flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        <span className="text-white font-bold text-xs">{index + 1}</span>
                      </div>
                      <p className="text-[#2d2d2d] leading-relaxed text-sm">{insight.replace('•', '').trim()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-[#334155]">No key insights available</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'articles' && (
          <div className="space-y-6 animate-fadeIn">
            {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} className="bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-[#f5f7fa] to-slate-50 p-4 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-3 py-1 rounded-lg text-sm font-medium border ${getCategoryColor(category)}`}>
                      {category}
                    </span>
                    <span className="text-[#334155] text-sm font-medium">{count} articles</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    {analysis.articles
                      .filter(article => article.category === category)
                      .map((article, index) => (
                        <div 
                          key={article.id} 
                          className="group p-4 bg-[#f5f7fa] rounded-lg hover:bg-slate-50 transition-all duration-200 hover:shadow-md border border-transparent hover:border-slate-200"
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          <h3 className="font-medium text-[#2d2d2d] mb-2 group-hover:text-[#1e2556] transition-colors duration-200 text-sm">
                            {article.title}
                          </h3>
                          <a 
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 text-[#7cc6ee] hover:text-[#6bb8e0] text-xs font-medium transition-colors duration-200"
                          >
                            <span>Read Article</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            ))}
            {Object.keys(categoryStats).length === 0 && (
              <div className="bg-white rounded-xl border border-slate-200/60 p-12 text-center shadow-sm">
                <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-[#334155]">No articles found</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Reviews Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <h3 className="text-sm font-bold text-green-900">Positive</h3>
                </div>
                <p className="text-2xl font-bold text-green-600 mb-1">{analysis.reviews?.positive?.length || 0}</p>
                <p className="text-green-700 font-medium text-xs">positive points</p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">✗</span>
                  </div>
                  <h3 className="text-sm font-bold text-red-900">Negative</h3>
                </div>
                <p className="text-2xl font-bold text-red-600 mb-1">{analysis.reviews?.negative?.length || 0}</p>
                <p className="text-red-700 font-medium text-xs">negative points</p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">•</span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">Neutral</h3>
                </div>
                <p className="text-2xl font-bold text-gray-600 mb-1">{analysis.reviews?.neutral?.length || 0}</p>
                <p className="text-gray-700 font-medium text-xs">neutral points</p>
              </div>
            </div>

            {/* Positive Reviews */}
            {analysis.reviews?.positive && analysis.reviews.positive.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4">
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <span>✓</span>
                    <span>Positive Feedback</span>
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {analysis.reviews.positive.map((point, index) => (
                      <div 
                        key={index} 
                        className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-200"
                      >
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">✓</span>
                        </div>
                        <p className="text-[#2d2d2d] leading-relaxed text-sm">{point.replace('•', '').trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Negative Reviews */}
            {analysis.reviews?.negative && analysis.reviews.negative.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-red-500 to-rose-500 p-4">
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <span>✗</span>
                    <span>Areas for Improvement</span>
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {analysis.reviews.negative.map((point, index) => (
                      <div 
                        key={index} 
                        className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200"
                      >
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">✗</span>
                        </div>
                        <p className="text-[#2d2d2d] leading-relaxed text-sm">{point.replace('•', '').trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Neutral Reviews */}
            {analysis.reviews?.neutral && analysis.reviews.neutral.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200/60 overflow-hidden shadow-sm">
                <div className="bg-gradient-to-r from-gray-500 to-slate-500 p-4">
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <span>•</span>
                    <span>Additional Information</span>
                  </h3>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    {analysis.reviews.neutral.map((point, index) => (
                      <div 
                        key={index} 
                        className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                      >
                        <div className="w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">•</span>
                        </div>
                        <p className="text-[#2d2d2d] leading-relaxed text-sm">{point.replace('•', '').trim()}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Raw Reviews Content */}
            {analysis.reviews?.rawContent && (
              <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6">
                <h2 className="text-lg font-bold text-[#1e2556] mb-4 flex items-center space-x-2">
                  <span>📝</span>
                  <span>Raw Reviews Content</span>
                </h2>
                <div className="bg-[#f5f7fa] rounded-lg p-4 max-h-64 overflow-y-auto custom-scrollbar">
                  <pre className="whitespace-pre-wrap text-xs text-[#2d2d2d] font-mono leading-relaxed">
                    {analysis.reviews.rawContent}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'company' && (
          <div className="space-y-6 animate-fadeIn">
            {analysis.hasCompanyInfo && analysis.companyInfo ? (
              <>
                <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#1e2556] flex items-center space-x-2">
                      <Building2 className="w-5 h-5 text-[#7cc6ee]" />
                      <span>Company Information</span>
                    </h2>
                    <span className="text-xs px-3 py-1 bg-[#7cc6ee] text-white rounded-full">
                      Source: {analysis.companyInfo.source}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Company Logo & Basic Info */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        {analysis.companyInfo.productInfo?.logoUrl ? (
                          <img 
                            src={analysis.companyInfo.productInfo.logoUrl} 
                            alt="Company Logo"
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-[#1e2556] rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                        )}
                        <div>
                          <h3 className="text-lg font-bold text-[#1e2556]">{analysis.companyInfo.companyName}</h3>
                          {analysis.companyInfo.productInfo?.name && (
                            <p className="text-sm text-[#334155]">{analysis.companyInfo.productInfo.name}</p>
                          )}
                        </div>
                      </div>
                      {analysis.companyInfo.website && (
                        <a 
                          href={analysis.companyInfo.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-[#7cc6ee] hover:text-[#6bb8e0] text-sm transition-colors duration-200"
                        >
                          <span>Visit Website</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {/* Foundation Details */}
                    <div>
                      <h4 className="font-semibold text-[#1e2556] mb-3 text-sm">Foundation</h4>
                      <div className="space-y-2">
                        {analysis.companyInfo.yearFounded && (
                          <div className="flex flex-col">
                            <span className="text-xs text-[#334155] font-medium">Founded:</span>
                            <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.yearFounded}</span>
                          </div>
                        )}
                        {analysis.companyInfo.foundersNames && (
                          <div className="flex flex-col">
                            <span className="text-xs text-[#334155] font-medium">Founders:</span>
                            <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.foundersNames}</span>
                          </div>
                        )}
                        {analysis.companyInfo.headquarters && (
                          <div className="flex flex-col">
                            <span className="text-xs text-[#334155] font-medium">Headquarters:</span>
                            <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.headquarters}</span>
                          </div>
                        )}
                        {analysis.companyInfo.regionServed && (
                          <div className="flex flex-col">
                            <span className="text-xs text-[#334155] font-medium">Region Served:</span>
                            <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.regionServed}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Business Details */}
                    <div>
                      <h4 className="font-semibold text-[#1e2556] mb-3 text-sm">Business</h4>
                      <div className="space-y-2">
                        {analysis.companyInfo.teamSize && (
                          <div className="flex flex-col">
                            <span className="text-xs text-[#334155] font-medium">Team Size:</span>
                            <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.teamSize}</span>
                          </div>
                        )}
                        {analysis.companyInfo.awards && (
                          <div className="flex flex-col">
                            <span className="text-xs text-[#334155] font-medium">Awards:</span>
                            <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.awards}</span>
                          </div>
                        )}
                        {analysis.companyInfo.contact && (
                          <div className="flex flex-col">
                            <span className="text-xs text-[#334155] font-medium">Contact:</span>
                            <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.contact}</span>
                          </div>
                        )}
                        {analysis.companyInfo.productInfo?.category && (
                          <div className="flex flex-col">
                            <span className="text-xs text-[#334155] font-medium">Category:</span>
                            <span className="text-sm text-[#2d2d2d]">{analysis.companyInfo.productInfo.category.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {(analysis.companyInfo.overview || analysis.companyInfo.founderVision) && (
                    <div className="mt-6 pt-6 border-t border-slate-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {analysis.companyInfo.overview && (
                          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                            <h4 className="font-semibold text-[#1e2556] mb-2 text-sm">Company Overview</h4>
                            <p className="text-sm text-[#2d2d2d] leading-relaxed">{analysis.companyInfo.overview}</p>
                          </div>
                        )}
                        {analysis.companyInfo.founderVision && (
                          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                            <h4 className="font-semibold text-[#1e2556] mb-2 text-sm">Founder Vision</h4>
                            <p className="text-sm text-[#2d2d2d] leading-relaxed">{analysis.companyInfo.founderVision}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-12 text-center">
                <div className="text-slate-300 text-6xl mb-4">🏢</div>
                <h3 className="text-lg font-bold text-[#1e2556] mb-2">No Company Information Available</h3>
                <p className="text-[#334155]">Company information could not be found or matched for this analysis.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #7cc6ee #f1f5f9;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #7cc6ee;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6bb8e0;
        }
      `}</style>
    </div>
  );
};

export default PremiumAnalysisPage;