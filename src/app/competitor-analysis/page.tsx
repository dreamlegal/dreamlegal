// // // app/home/page.tsx (New Home Page)
// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import Link from 'next/link';
// // import { useRouter } from 'next/navigation';

// // interface RandomArticle {
// //   id: string;
// //   title: string;
// //   url: string;
// //   category: string;
// //   companyName: string;
// //   analysisId: string;
// // }

// // interface CategoryChart {
// //   category: string;
// //   count: number;
// // }

// // interface DashboardData {
// //   randomArticles: RandomArticle[];
// //   categoryChart: CategoryChart[];
// //   overview: {
// //     totalAnalyses: number;
// //     totalArticles: number;
// //     categoriesUsed: number;
// //   };
// // }

// // interface AnalyzedCompany {
// //   id: string;
// //   companyName: string;
// //   totalArticlesCount: number;
// //   createdAt: string;
// //   _count: {
// //     articles: number;
// //   };
// //   product: {
// //     id: string;
// //     logoUrl: string;
// //     category: string[];
// //     productName: string;
// //   } | null;
// //   hasProductMatch: boolean;
// // }

// // // Category Chart Component
// // const CategoryChart: React.FC<{ data: CategoryChart[] }> = ({ data }) => {
// //   const maxCount = Math.max(...data.map(d => d.count));
  
// //   const getCategoryColor = (category: string) => {
// //     const colors: { [key: string]: string } = {
// //       'Funding': 'bg-green-500',
// //       'Partnerships': 'bg-blue-500',
// //       'Client wins': 'bg-purple-500',
// //       'Feature launches': 'bg-orange-500',
// //       'Geographic expansion': 'bg-yellow-500',
// //       'Talent moves': 'bg-pink-500',
// //       'Reports': 'bg-indigo-500',
// //       'Beta programs': 'bg-teal-500',
// //       'Event participation': 'bg-red-500',
// //       'Miscellaneous': 'bg-gray-500'
// //     };
// //     return colors[category] || 'bg-gray-400';
// //   };

// //   return (
// //     <div className="space-y-3">
// //       {data.filter(d => d.count > 0).map((item) => (
// //         <div key={item.category} className="flex items-center space-x-3">
// //           <div className="w-24 text-xs text-gray-600 truncate">
// //             {item.category}
// //           </div>
// //           <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
// //             <div
// //               className={`h-4 rounded-full ${getCategoryColor(item.category)} transition-all duration-500`}
// //               style={{
// //                 width: maxCount > 0 ? `${(item.count / maxCount) * 100}%` : '0%'
// //               }}
// //             />
// //             <span className="absolute right-2 top-0 text-xs text-white font-medium leading-4">
// //               {item.count}
// //             </span>
// //           </div>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // };

// // // Company Search Component
// // const CompanySearchSection: React.FC = () => {
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [message, setMessage] = useState('');
// //   const router = useRouter();

// //   const handleAnalyze = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!searchTerm.trim() || isLoading) return;

// //     setIsLoading(true);
// //     setMessage('');

// //     try {
// //       // First check if company already exists
// //       const checkResponse = await fetch('/api/ca/companies/check', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({ companyName: searchTerm.trim() }),
// //       });

// //       if (!checkResponse.ok) {
// //         throw new Error(`Check failed: ${checkResponse.status}`);
// //       }

// //       const checkData = await checkResponse.json();

// //       if (checkData.exists) {
// //         // Company already analyzed, redirect to existing analysis
// //         setMessage(`Found existing analysis for ${searchTerm}. Redirecting...`);
// //         setTimeout(() => {
// //           router.push(checkData.redirectUrl);
// //         }, 1500);
// //       } else {
// //         // Company not analyzed, run new analysis
// //         setMessage(`Analyzing ${searchTerm}...`);
        
// //         const analyzeResponse = await fetch('/api/analyze', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //           },
// //           body: JSON.stringify({ companyName: searchTerm.trim() }),
// //         });

// //         if (!analyzeResponse.ok) {
// //           throw new Error(`Analysis failed: ${analyzeResponse.status}`);
// //         }

// //         const analyzeData = await analyzeResponse.json();
        
// //         if (analyzeData.databaseId) {
// //           setMessage(`Analysis complete! Redirecting to results...`);
// //           setTimeout(() => {
// //             router.push(`/competitor_analysis/${analyzeData.databaseId}`);
// //           }, 1500);
// //         } else {
// //           throw new Error('Analysis completed but no database ID returned');
// //         }
// //       }

// //     } catch (error) {
// //       console.error('Analysis error:', error);
// //       setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="bg-white rounded-lg shadow-sm border p-6">
// //       <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
// //         🚀 Analyze a Company
// //       </h2>
// //       <p className="text-gray-600 text-center mb-6">
// //         Enter a company name to get comprehensive competitor analysis
// //       </p>
      
// //       <form onSubmit={handleAnalyze} className="space-y-4">
// //         <div className="flex space-x-3">
// //           <input
// //             type="text"
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             placeholder="Enter company name (e.g., Apple, Tesla, Microsoft)"
// //             className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //             disabled={isLoading}
// //           />
// //           <button
// //             type="submit"
// //             disabled={isLoading || !searchTerm.trim()}
// //             className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
// //           >
// //             {isLoading ? '🔄 Analyzing...' : '🚀 Analyze'}
// //           </button>
// //         </div>
        
// //         {message && (
// //           <div className={`p-3 rounded-lg text-center text-sm ${
// //             message.includes('Error') 
// //               ? 'bg-red-50 text-red-700 border border-red-200' 
// //               : 'bg-blue-50 text-blue-700 border border-blue-200'
// //           }`}>
// //             {message}
// //           </div>
// //         )}
// //       </form>
// //     </div>
// //   );
// // };

// // // Company Card Component
// // const CompanyCard: React.FC<{ company: AnalyzedCompany }> = ({ company }) => {
// //   const formatDate = (dateString: string) => {
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'short',
// //       day: 'numeric'
// //     });
// //   };

// //   return (
// //     <Link href={`/competitor_analysis/${company.id}`} className="group">
// //       <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 p-6 group-hover:border-blue-300 h-full">
// //         <div className="flex items-start space-x-4 mb-4">
// //           {/* Logo */}
// //           <div className="flex-shrink-0">
// //             {company.product?.logoUrl ? (
// //               <img
// //                 src={company.product.logoUrl}
// //                 alt={`${company.companyName} logo`}
// //                 className="w-12 h-12 rounded-lg object-cover"
// //                 onError={(e) => {
// //                   const target = e.target as HTMLImageElement;
// //                   target.style.display = 'none';
// //                   target.nextElementSibling?.classList.remove('hidden');
// //                 }}
// //               />
// //             ) : null}
// //             <div className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg ${company.product?.logoUrl ? 'hidden' : ''}`}>
// //               {company.companyName.charAt(0).toUpperCase()}
// //             </div>
// //           </div>
          
// //           {/* Company Info */}
// //           <div className="flex-1 min-w-0">
// //             <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600">
// //               {company.companyName}
// //             </h3>
            
// //             {/* Categories from Product table */}
// //             {company.product?.category && company.product.category.length > 0 && (
// //               <div className="flex flex-wrap gap-1 mt-2">
// //                 {company.product.category.slice(0, 2).map((cat, index) => (
// //                   <span
// //                     key={index}
// //                     className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
// //                   >
// //                     {cat}
// //                   </span>
// //                 ))}
// //                 {company.product.category.length > 2 && (
// //                   <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
// //                     +{company.product.category.length - 2}
// //                   </span>
// //                 )}
// //               </div>
// //             )}
// //           </div>
          
// //           {/* Match indicator */}
// //           <div className="flex-shrink-0">
// //             <div className={`w-3 h-3 rounded-full ${company.hasProductMatch ? 'bg-green-400' : 'bg-gray-300'}`} />
// //           </div>
// //         </div>
        
// //         {/* Stats */}
// //         <div className="space-y-2 mb-4">
// //           <div className="flex items-center justify-between text-sm">
// //             <span className="text-gray-600">Articles:</span>
// //             <span className="font-medium text-gray-900">{company.totalArticlesCount}</span>
// //           </div>
// //           <div className="flex items-center justify-between text-sm">
// //             <span className="text-gray-600">Categories:</span>
// //             <span className="font-medium text-gray-900">{company._count.articles}</span>
// //           </div>
// //           {company.product && (
// //             <div className="flex items-center justify-between text-sm">
// //               <span className="text-gray-600">Product:</span>
// //               <span className="font-medium text-gray-900 truncate ml-2">{company.product.productName}</span>
// //             </div>
// //           )}
// //         </div>
        
// //         {/* Date */}
// //         <div className="border-t pt-3">
// //           <div className="text-xs text-gray-500">
// //             Analyzed: {formatDate(company.createdAt)}
// //           </div>
// //         </div>
        
// //         {/* View button */}
// //         <div className="mt-4 text-center">
// //           <span className="text-sm text-blue-600 group-hover:text-blue-700 font-medium">
// //             View Analysis →
// //           </span>
// //         </div>
// //       </div>
// //     </Link>
// //   );
// // };

// // // Main Home Page Component
// // export default function HomePage() {
// //   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
// //   const [analyzedCompanies, setAnalyzedCompanies] = useState<AnalyzedCompany[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [companiesLoading, setCompaniesLoading] = useState(true);

// //   useEffect(() => {
// //     fetchDashboardData();
// //     fetchAnalyzedCompanies();
// //   }, []);

// //   const fetchDashboardData = async () => {
// //     try {
// //       const response = await fetch('/api/ca/dashboard');
// //       if (response.ok) {
// //         const data = await response.json();
// //         setDashboardData(data);
// //       }
// //     } catch (error) {
// //       console.error('Failed to fetch dashboard data:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchAnalyzedCompanies = async () => {
// //     try {
// //       const response = await fetch('/api/ca/companies/analyzed?limit=12');
// //       if (response.ok) {
// //         const data = await response.json();
// //         setAnalyzedCompanies(data.companies);
// //       }
// //     } catch (error) {
// //       console.error('Failed to fetch analyzed companies:', error);
// //     } finally {
// //       setCompaniesLoading(false);
// //     }
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
// //       'Miscellaneous': 'bg-gray-100 text-gray-800'
// //     };
// //     return colors[category] || 'bg-gray-100 text-gray-600';
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading dashboard...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <div className="bg-white shadow-sm border-b">
// //         <div className="max-w-7xl mx-auto px-4 py-6">
// //           <div className="text-center">
// //             <h1 className="text-4xl font-bold text-gray-900 mb-2">
// //               🏢 Competitor Analysis Dashboard
// //             </h1>
// //             <p className="text-gray-600 text-lg">
// //               Comprehensive AI-powered business intelligence platform
// //             </p>
// //             {dashboardData && (
// //               <div className="flex justify-center space-x-8 mt-4 text-sm text-gray-500">
// //                 <span>{dashboardData.overview.totalAnalyses} Companies Analyzed</span>
// //                 <span>{dashboardData.overview.totalArticles} Articles Processed</span>
// //                 <span>{dashboardData.overview.categoriesUsed} Active Categories</span>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
// //         {/* Top Section: Articles & Chart */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
// //           {/* Left: Random Articles */}
// //           <div className="bg-white rounded-lg shadow-sm border p-6">
// //             <h2 className="text-xl font-semibold text-gray-900 mb-4">
// //               📰 Recent Article Insights
// //             </h2>
// //             {dashboardData?.randomArticles && dashboardData.randomArticles.length > 0 ? (
// //               <div className="space-y-3 max-h-96 overflow-y-auto">
// //                 {dashboardData.randomArticles.map((article) => (
// //                   <div key={article.id} className="border-l-4 border-blue-400 pl-4 py-2">
// //                     <div className="flex items-start justify-between mb-2">
// //                       <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
// //                         {article.title}
// //                       </h3>
// //                       <span className={`ml-2 px-2 py-1 text-xs rounded-full flex-shrink-0 ${getCategoryColor(article.category)}`}>
// //                         {article.category}
// //                       </span>
// //                     </div>
// //                     <div className="text-xs text-gray-500 space-y-1">
// //                       <p>Company: <span className="font-medium">{article.companyName}</span></p>
// //                       <a 
// //                         href={article.url} 
// //                         target="_blank" 
// //                         rel="noopener noreferrer"
// //                         className="text-blue-600 hover:text-blue-700 truncate block"
// //                       >
// //                         {article.url} ↗
// //                       </a>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <p className="text-gray-500">No articles available</p>
// //             )}
// //           </div>

// //           {/* Right: Category Chart */}
// //           <div className="bg-white rounded-lg shadow-sm border p-6">
// //             <h2 className="text-xl font-semibold text-gray-900 mb-4">
// //               📊 Article Categories Distribution
// //             </h2>
// //             {dashboardData?.categoryChart ? (
// //               <CategoryChart data={dashboardData.categoryChart} />
// //             ) : (
// //               <p className="text-gray-500">No category data available</p>
// //             )}
// //           </div>
// //         </div>

// //         {/* Search Section */}
// //         <CompanySearchSection />

// //         {/* Companies Section */}
// //         <div>
// //           <div className="flex justify-between items-center mb-6">
// //             <h2 className="text-2xl font-bold text-gray-900">
// //               📈 Analyzed Companies
// //             </h2>
// //             <Link 
// //               href="/competitor_analysis/all"
// //               className="text-blue-600 hover:text-blue-700 font-medium"
// //             >
// //               View All →
// //             </Link>
// //           </div>

// //           {companiesLoading ? (
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //               {[...Array(8)].map((_, i) => (
// //                 <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
// //                   <div className="flex items-start space-x-4 mb-4">
// //                     <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
// //                     <div className="flex-1">
// //                       <div className="h-4 bg-gray-200 rounded mb-2"></div>
// //                       <div className="h-3 bg-gray-200 rounded w-3/4"></div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : analyzedCompanies.length > 0 ? (
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //               {analyzedCompanies.map((company) => (
// //                 <CompanyCard key={company.id} company={company} />
// //               ))}
// //             </div>
// //           ) : (
// //             <div className="text-center py-12">
// //               <p className="text-gray-500 text-lg">No companies analyzed yet</p>
// //               <p className="text-gray-400 text-sm mt-2">Use the search above to analyze your first company</p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { Search, TrendingUp, Building2, BarChart3, ArrowRight, ExternalLink, Zap } from 'lucide-react';

// export default function HomePage() {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [analyzedCompanies, setAnalyzedCompanies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [companiesLoading, setCompaniesLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     fetchDashboardData();
//     fetchAnalyzedCompanies();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const response = await fetch('/api/ca/dashboard');
//       if (response.ok) {
//         const data = await response.json();
//         setDashboardData(data);
//       }
//     } catch (error) {
//       console.error('Failed to fetch dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAnalyzedCompanies = async () => {
//     try {
//       const response = await fetch('/api/ca/companies/analyzed?limit=12');
//       if (response.ok) {
//         const data = await response.json();
//         setAnalyzedCompanies(data.companies);
//       }
//     } catch (error) {
//       console.error('Failed to fetch analyzed companies:', error);
//     } finally {
//       setCompaniesLoading(false);
//     }
//   };

//   const handleAnalyze = async (e) => {
//     e.preventDefault();
//     if (!searchTerm.trim() || isLoading) return;

//     setIsLoading(true);
//     setMessage('');

//     try {
//       const checkResponse = await fetch('/api/ca/companies/check', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ companyName: searchTerm.trim() }),
//       });

//       if (!checkResponse.ok) {
//         throw new Error(`Check failed: ${checkResponse.status}`);
//       }

//       const checkData = await checkResponse.json();

//       if (checkData.exists) {
//         setMessage(`Found existing analysis for ${searchTerm}. Redirecting...`);
//         setTimeout(() => {
//           router.push(checkData.redirectUrl);
//         }, 1500);
//       } else {
//         setMessage(`Analyzing ${searchTerm}...`);
        
//         const analyzeResponse = await fetch('/api/analyze', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ companyName: searchTerm.trim() }),
//         });

//         if (!analyzeResponse.ok) {
//           throw new Error(`Analysis failed: ${analyzeResponse.status}`);
//         }

//         const analyzeData = await analyzeResponse.json();
        
//         if (analyzeData.databaseId) {
//           setMessage(`Analysis complete! Redirecting to results...`);
//           setTimeout(() => {
//             router.push(`/competitor_analysis/${analyzeData.databaseId}`);
//           }, 1500);
//         } else {
//           throw new Error('Analysis completed but no database ID returned');
//         }
//       }
//     } catch (error) {
//       console.error('Analysis error:', error);
//       setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
//     } finally {
//       setIsLoading(false);
//     }
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
//       'Miscellaneous': 'bg-gray-100 text-gray-800 border-gray-200'
//     };
//     return colors[category] || 'bg-gray-100 text-gray-600 border-gray-200';
//   };

//   const getCategoryBarColor = (category) => {
//     const colors = {
//       'Funding': 'bg-green-500',
//       'Partnerships': 'bg-blue-500',
//       'Client wins': 'bg-purple-500',
//       'Feature launches': 'bg-orange-500',
//       'Geographic expansion': 'bg-yellow-500',
//       'Talent moves': 'bg-pink-500',
//       'Reports': 'bg-indigo-500',
//       'Beta programs': 'bg-teal-500',
//       'Event participation': 'bg-red-500',
//       'Miscellaneous': 'bg-gray-500'
//     };
//     return colors[category] || 'bg-gray-400';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center pt-20">
//         <div className="text-center">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-500 mx-auto mb-6"></div>
//             <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-300 animate-ping mx-auto"></div>
//           </div>
//           <p className="text-slate-600 font-medium">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   const maxCount = dashboardData?.categoryChart ? Math.max(...dashboardData.categoryChart.map(d => d.count)) : 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-20">
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
        
//         @keyframes slideIn {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.6s ease-out forwards;
//         }
        
//         .animate-slideIn {
//           animation: slideIn 0.6s ease-out forwards;
//         }
        
//         .animate-slideUp {
//           animation: slideUp 0.6s ease-out forwards;
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

//       {/* Hero Header */}
//       <div className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-[#1e2556] via-[#2a3369] to-[#1e2556] opacity-95"></div>
//         <div 
//           className="absolute inset-0 opacity-20"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//           }}
//         ></div>
        
//         <div className="relative max-w-6xl mx-auto px-6 py-16">
//           <div className="text-center">
//             <div className="inline-flex items-center space-x-3 mb-6 animate-fadeIn">
//               <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
//                 <Building2 className="w-8 h-8 text-white" />
//               </div>
//               <div className="text-left">
//                 <h1 className="text-4xl font-bold text-white mb-2">
//                   Competitor Analysis Dashboard
//                 </h1>
//                 <p className="text-blue-100 text-lg">
//                   AI-powered business intelligence platform
//                 </p>
//               </div>
//             </div>
            
//             {dashboardData && (
//               <div className="flex justify-center space-x-8 mt-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 text-center border border-white/20">
//                   <div className="text-2xl font-bold text-white">{dashboardData.overview.totalAnalyses}</div>
//                   <div className="text-blue-100 text-sm">Companies Analyzed</div>
//                 </div>
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 text-center border border-white/20">
//                   <div className="text-2xl font-bold text-white">{dashboardData.overview.totalArticles}</div>
//                   <div className="text-blue-100 text-sm">Articles Processed</div>
//                 </div>
//                 <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 text-center border border-white/20">
//                   <div className="text-2xl font-bold text-white">{dashboardData.overview.categoriesUsed}</div>
//                   <div className="text-blue-100 text-sm">Active Categories</div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
//         {/* Top Section: Articles & Chart */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
//           {/* Left: Recent Articles */}
//           <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/50 overflow-hidden">
//             <div className="bg-gradient-to-r from-[#f5f7fa] to-slate-50 p-6 border-b border-slate-100">
//               <h2 className="text-xl font-bold text-[#1e2556] flex items-center space-x-2">
//                 <TrendingUp className="w-5 h-5 text-[#7cc6ee]" />
//                 <span>Recent Article Insights</span>
//               </h2>
//             </div>
//             <div className="p-6">
//               {dashboardData?.randomArticles && dashboardData.randomArticles.length > 0 ? (
//                 <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
//                   {dashboardData.randomArticles.map((article, index) => (
//                     <div 
//                       key={article.id} 
//                       className="group p-4 bg-[#f5f7fa] rounded-xl hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200"
//                       style={{ animationDelay: `${index * 0.1}s` }}
//                     >
//                       <div className="flex items-start justify-between mb-3">
//                         <h3 className="text-sm font-medium text-[#2d2d2d] group-hover:text-[#1e2556] transition-colors duration-200 line-clamp-2 flex-1">
//                           {article.title}
//                         </h3>
//                         <span className={`ml-3 px-2 py-1 text-xs rounded-lg flex-shrink-0 border ${getCategoryColor(article.category)}`}>
//                           {article.category}
//                         </span>
//                       </div>
//                       <div className="space-y-2">
//                         <p className="text-xs text-[#334155]">
//                           Company: <span className="font-medium text-[#2d2d2d]">{article.companyName}</span>
//                         </p>
//                         <a 
//                           href={article.url} 
//                           target="_blank" 
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center space-x-1 text-[#7cc6ee] hover:text-[#6bb8e0] text-xs font-medium transition-colors duration-200"
//                         >
//                           <span>Read Article</span>
//                           <ExternalLink className="w-3 h-3" />
//                         </a>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
//                   <p className="text-[#334155]">No articles available</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right: Category Chart */}
//           <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/50 overflow-hidden">
//             <div className="bg-gradient-to-r from-[#f5f7fa] to-slate-50 p-6 border-b border-slate-100">
//               <h2 className="text-xl font-bold text-[#1e2556] flex items-center space-x-2">
//                 <BarChart3 className="w-5 h-5 text-[#7cc6ee]" />
//                 <span>Categories Distribution</span>
//               </h2>
//             </div>
//             <div className="p-6">
//               {dashboardData?.categoryChart ? (
//                 <div className="space-y-4">
//                   {dashboardData.categoryChart.filter(d => d.count > 0).map((item, index) => (
//                     <div 
//                       key={item.category} 
//                       className="flex items-center space-x-4 animate-slideIn"
//                       style={{ animationDelay: `${index * 0.1}s` }}
//                     >
//                       <div className="w-24 text-xs text-[#334155] font-medium truncate">
//                         {item.category}
//                       </div>
//                       <div className="flex-1 bg-slate-100 rounded-full h-6 relative overflow-hidden">
//                         <div
//                           className={`h-6 rounded-full ${getCategoryBarColor(item.category)} transition-all duration-1000 ease-out relative`}
//                           style={{
//                             width: maxCount > 0 ? `${(item.count / maxCount) * 100}%` : '0%'
//                           }}
//                         >
//                           <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
//                         </div>
//                         <span className="absolute right-2 top-0 text-xs text-[#2d2d2d] font-bold leading-6">
//                           {item.count}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12">
//                   <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
//                   <p className="text-[#334155]">No category data available</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Search Section */}
//         <div className="animate-fadeIn" style={{ animationDelay: '0.6s' }}>
//           <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/50 overflow-hidden">
//             <div className="bg-gradient-to-r from-[#1e2556] to-[#2a3369] p-8 text-white">
//               <div className="text-center">
//                 <div className="inline-flex items-center space-x-3 mb-4">
//                   <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
//                     <Zap className="w-6 h-6 text-white" />
//                   </div>
//                   <h2 className="text-2xl font-bold">Analyze a Company</h2>
//                 </div>
//                 <p className="text-blue-100 mb-8">
//                   Enter a company name to get comprehensive competitor analysis powered by AI
//                 </p>
//               </div>
//             </div>
            
//             <div className="p-8">
//               <form onSubmit={handleAnalyze} className="space-y-6">
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//                     <Search className="h-5 w-5 text-[#334155]" />
//                   </div>
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     placeholder="Enter company name (e.g., Apple, Tesla, Microsoft)"
//                     className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent bg-[#f5f7fa] text-[#2d2d2d] font-medium transition-all duration-200"
//                     disabled={isLoading}
//                   />
//                 </div>
                
//                 <div className="text-center">
//                   <button
//                     type="submit"
//                     disabled={isLoading || !searchTerm.trim()}
//                     className="inline-flex items-center space-x-3 px-8 py-4 bg-[#1e2556] text-white rounded-xl hover:bg-[#2a3369] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 font-medium shadow-lg"
//                   >
//                     {isLoading ? (
//                       <>
//                         <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
//                         <span>Analyzing...</span>
//                       </>
//                     ) : (
//                       <>
//                         <Zap className="w-5 h-5" />
//                         <span>Start Analysis</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
                
//                 {message && (
//                   <div className={`p-4 rounded-xl text-center text-sm font-medium ${
//                     message.includes('Error') 
//                       ? 'bg-red-50 text-red-700 border border-red-200' 
//                       : 'bg-blue-50 text-blue-700 border border-blue-200'
//                   }`}>
//                     {message}
//                   </div>
//                 )}
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* Companies Section */}
//         <div className="animate-fadeIn" style={{ animationDelay: '0.8s' }}>
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-2xl font-bold text-[#1e2556] flex items-center space-x-3">
//               <Building2 className="w-7 h-7 text-[#7cc6ee]" />
//               <span>Analyzed Companies</span>
//             </h2>
//             <Link 
//               href="/competitor_analysis/all"
//               className="inline-flex items-center space-x-2 text-[#7cc6ee] hover:text-[#6bb8e0] font-medium transition-colors duration-200 group"
//             >
//               <span>View All</span>
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
//             </Link>
//           </div>

//           {companiesLoading ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {[...Array(8)].map((_, i) => (
//                 <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
//                   <div className="flex items-start space-x-4 mb-4">
//                     <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
//                     <div className="flex-1">
//                       <div className="h-4 bg-slate-200 rounded mb-2"></div>
//                       <div className="h-3 bg-slate-200 rounded w-3/4"></div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : analyzedCompanies.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {analyzedCompanies.map((company, index) => (
//                 <Link 
//                   key={company.id} 
//                   href={`/competitor_analysis/${company.id}`} 
//                   className="group animate-slideUp"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <div className="bg-white rounded-xl border border-slate-200/60 hover:shadow-xl transition-all duration-300 p-6 group-hover:border-[#7cc6ee] h-full hover:-translate-y-1">
//                     <div className="flex items-start space-x-4 mb-4">
//                       {/* Logo */}
//                       <div className="flex-shrink-0">
//                         {company.product?.logoUrl ? (
//                           <img
//                             src={company.product.logoUrl}
//                             alt={`${company.companyName} logo`}
//                             className="w-12 h-12 rounded-lg object-cover border border-slate-100"
//                             onError={(e) => {
//                               const target = e.target;
//                               target.style.display = 'none';
//                               target.nextElementSibling?.classList.remove('hidden');
//                             }}
//                           />
//                         ) : null}
//                         <div className={`w-12 h-12 bg-gradient-to-br from-[#7cc6ee] to-[#1e2556] rounded-lg flex items-center justify-center text-white font-bold text-lg ${company.product?.logoUrl ? 'hidden' : ''}`}>
//                           {company.companyName.charAt(0).toUpperCase()}
//                         </div>
//                       </div>
                      
//                       {/* Company Info */}
//                       <div className="flex-1 min-w-0">
//                         <h3 className="text-lg font-bold text-[#2d2d2d] truncate group-hover:text-[#1e2556] transition-colors duration-200">
//                           {company.companyName}
//                         </h3>
                        
//                         {/* Categories */}
//                         {company.product?.category && company.product.category.length > 0 && (
//                           <div className="flex flex-wrap gap-1 mt-2">
//                             {company.product.category.slice(0, 2).map((cat, index) => (
//                               <span
//                                 key={index}
//                                 className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg border border-blue-200"
//                               >
//                                 {cat}
//                               </span>
//                             ))}
//                             {company.product.category.length > 2 && (
//                               <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg border border-slate-200">
//                                 +{company.product.category.length - 2}
//                               </span>
//                             )}
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Match indicator */}
//                       <div className="flex-shrink-0">
//                         <div className={`w-3 h-3 rounded-full ${company.hasProductMatch ? 'bg-green-400' : 'bg-slate-300'}`} />
//                       </div>
//                     </div>
                    
//                     {/* Stats */}
//                     <div className="space-y-3 mb-4">
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-[#334155]">Articles:</span>
//                         <span className="font-bold text-[#2d2d2d]">{company.totalArticlesCount}</span>
//                       </div>
//                       <div className="flex items-center justify-between text-sm">
//                         <span className="text-[#334155]">Categories:</span>
//                         <span className="font-bold text-[#2d2d2d]">{company._count.articles}</span>
//                       </div>
//                       {company.product && (
//                         <div className="flex items-center justify-between text-sm">
//                           <span className="text-[#334155]">Product:</span>
//                           <span className="font-bold text-[#2d2d2d] truncate ml-2">{company.product.productName}</span>
//                         </div>
//                       )}
//                     </div>
                    
//                     {/* Date */}
//                     <div className="border-t border-slate-100 pt-3 mb-4">
//                       <div className="text-xs text-[#334155]">
//                         Analyzed: {formatDate(company.createdAt)}
//                       </div>
//                     </div>
                    
//                     {/* View button */}
//                     <div className="text-center">
//                       <span className="inline-flex items-center space-x-2 text-sm text-[#7cc6ee] group-hover:text-[#6bb8e0] font-medium transition-colors duration-200">
//                         <span>View Analysis</span>
//                         <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-12">
//                 <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
//                 <p className="text-[#334155] text-lg font-medium mb-2">No companies analyzed yet</p>
//                 <p className="text-[#334155] text-sm">Use the search above to analyze your first company</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, TrendingUp, Building2, BarChart3, ArrowRight, ExternalLink, Zap } from 'lucide-react';

export default function HomePage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [analyzedCompanies, setAnalyzedCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companiesLoading, setCompaniesLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
    fetchAnalyzedCompanies();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/ca/dashboard');
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalyzedCompanies = async () => {
    try {
      const response = await fetch('/api/ca/companies/analyzed?limit=12');
      if (response.ok) {
        const data = await response.json();
        setAnalyzedCompanies(data.companies);
      }
    } catch (error) {
      console.error('Failed to fetch analyzed companies:', error);
    } finally {
      setCompaniesLoading(false);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim() || isLoading) return;

    setIsLoading(true);
    setMessage('');

    try {
      const checkResponse = await fetch('/api/ca/companies/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ companyName: searchTerm.trim() }),
      });

      if (!checkResponse.ok) {
        throw new Error(`Check failed: ${checkResponse.status}`);
      }

      const checkData = await checkResponse.json();

      if (checkData.exists) {
        setMessage(`Found existing analysis for ${searchTerm}. Redirecting...`);
        setTimeout(() => {
          router.push(checkData.redirectUrl);
        }, 1500);
      } else {
        setMessage(`Analyzing ${searchTerm}...`);
        
        const analyzeResponse = await fetch('/api/analyze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ companyName: searchTerm.trim() }),
        });

        if (!analyzeResponse.ok) {
          throw new Error(`Analysis failed: ${analyzeResponse.status}`);
        }

        const analyzeData = await analyzeResponse.json();
        
        if (analyzeData.databaseId) {
          setMessage(`Analysis complete! Redirecting to results...`);
          setTimeout(() => {
            router.push(`/competitor_analysis/${analyzeData.databaseId}`);
          }, 1500);
        } else {
          throw new Error('Analysis completed but no database ID returned');
        }
      }
    } catch (error) {
      console.error('Analysis error:', error);
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
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
      'Miscellaneous': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-600 border-gray-200';
  };

  const getCategoryBarColor = (category) => {
    const colors = {
      'Funding': 'bg-green-500',
      'Partnerships': 'bg-blue-500',
      'Client wins': 'bg-purple-500',
      'Feature launches': 'bg-orange-500',
      'Geographic expansion': 'bg-yellow-500',
      'Talent moves': 'bg-pink-500',
      'Reports': 'bg-indigo-500',
      'Beta programs': 'bg-teal-500',
      'Event participation': 'bg-red-500',
      'Miscellaneous': 'bg-gray-500'
    };
    return colors[category] || 'bg-gray-400';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-300 animate-ping mx-auto"></div>
          </div>
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const maxCount = dashboardData?.categoryChart ? Math.max(...dashboardData.categoryChart.map(d => d.count)) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* White Header Strip */}
      <div className="bg-white shadow-sm border-b pt-20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#1e2556]">Competitor Analysis</h1>
            <div className="text-right">
              <span className="text-sm text-[#334155]">
                {dashboardData ? dashboardData.overview.totalAnalyses : 0} Analyses Done
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Background with Dark Outer */}
      <div className="bg-gradient-to-br from-[#1e2556] via-[#2a3369] to-[#1e2556] py-12">
        <div className="max-w-7xl mx-auto px-6 space-y-12">
          {/* Articles & Chart Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
            {/* Left: Recent Articles */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg shadow-black/10 overflow-hidden">
              <div className="bg-gradient-to-r from-[#f5f7fa] to-slate-50 p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-[#1e2556] flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-[#7cc6ee]" />
                  <span>Recent Article Insights</span>
                </h2>
              </div>
              <div className="p-6">
                {dashboardData?.randomArticles && dashboardData.randomArticles.length > 0 ? (
                  <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
                    {dashboardData.randomArticles.map((article, index) => (
                      <div 
                        key={article.id} 
                        className="group p-4 bg-[#f5f7fa] rounded-xl hover:bg-slate-50 transition-all duration-200 border border-transparent hover:border-slate-200"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-sm font-medium text-[#2d2d2d] group-hover:text-[#1e2556] transition-colors duration-200 line-clamp-2 flex-1">
                            {article.title}
                          </h3>
                          <span className={`ml-3 px-2 py-1 text-xs rounded-lg flex-shrink-0 border ${getCategoryColor(article.category)}`}>
                            {article.category}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-xs text-[#334155]">
                            Company: <span className="font-medium text-[#2d2d2d]">{article.companyName}</span>
                          </p>
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
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-[#334155]">No articles available</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Category Chart */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg shadow-black/10 overflow-hidden">
              <div className="bg-gradient-to-r from-[#f5f7fa] to-slate-50 p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-[#1e2556] flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-[#7cc6ee]" />
                  <span>Categories Distribution</span>
                </h2>
              </div>
              <div className="p-6">
                {dashboardData?.categoryChart ? (
                  <div className="space-y-4">
                    {dashboardData.categoryChart.filter(d => d.count > 0).map((item, index) => (
                      <div 
                        key={item.category} 
                        className="flex items-center space-x-4 animate-slideIn"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="w-24 text-xs text-[#334155] font-medium truncate">
                          {item.category}
                        </div>
                        <div className="flex-1 bg-slate-100 rounded-full h-6 relative overflow-hidden">
                          <div
                            className={`h-6 rounded-full ${getCategoryBarColor(item.category)} transition-all duration-1000 ease-out relative`}
                            style={{
                              width: maxCount > 0 ? `${(item.count / maxCount) * 100}%` : '0%'
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                          </div>
                          <span className="absolute right-2 top-0 text-xs text-[#2d2d2d] font-bold leading-6">
                            {item.count}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-[#334155]">No category data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Minimal Search Section */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/50 p-8">
            <form onSubmit={handleAnalyze}>
              <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-[#334155]" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search and analyze any company (e.g., Apple, Tesla, Microsoft)..."
                    className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent bg-[#f5f7fa] text-[#2d2d2d] font-medium transition-all duration-200"
                    disabled={isLoading}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || !searchTerm.trim()}
                  className="px-8 py-4 bg-[#1e2556] text-white rounded-xl hover:bg-[#2a3369] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 font-medium shadow-lg whitespace-nowrap"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    'Analyze'
                  )}
                </button>
              </div>
              
              {message && (
                <div className={`mt-4 p-3 rounded-lg text-center text-sm font-medium ${
                  message.includes('Error') 
                    ? 'bg-red-50 text-red-700 border border-red-200' 
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Companies Section */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#1e2556] flex items-center space-x-3">
              <Building2 className="w-7 h-7 text-[#7cc6ee]" />
              <span>Analyzed Companies</span>
            </h2>
            <Link 
              href="/competitor_analysis/all"
              className="inline-flex items-center space-x-2 text-[#7cc6ee] hover:text-[#6bb8e0] font-medium transition-colors duration-200 group"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {companiesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse h-40">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-slate-200 rounded mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : analyzedCompanies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {analyzedCompanies.slice(0, 9).map((company, index) => (
                <Link 
                  key={company.id} 
                  href={`/competitor_analysis/${company.id}`} 
                  className="group animate-slideUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-white rounded-xl border border-slate-200/60 hover:shadow-xl transition-all duration-300 p-6 group-hover:border-[#7cc6ee] h-40 hover:-translate-y-1 flex flex-col justify-between">
                    <div className="flex items-start space-x-4">
                      {/* Logo */}
                      <div className="flex-shrink-0">
                        {company.product?.logoUrl ? (
                          <img
                            src={company.product.logoUrl}
                            alt={`${company.companyName} logo`}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-100"
                            onError={(e) => {
                              const target = e.target;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`w-12 h-12 bg-gradient-to-br from-[#7cc6ee] to-[#1e2556] rounded-lg flex items-center justify-center text-white font-bold text-lg ${company.product?.logoUrl ? 'hidden' : ''}`}>
                          {company.companyName.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      
                      {/* Company Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-[#2d2d2d] truncate group-hover:text-[#1e2556] transition-colors duration-200">
                          {company.companyName}
                        </h3>
                        
                        {/* Categories */}
                        {company.product?.category && company.product.category.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {company.product.category.slice(0, 2).map((cat, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg border border-blue-200"
                              >
                                {cat}
                              </span>
                            ))}
                            {company.product.category.length > 2 && (
                              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg border border-slate-200">
                                +{company.product.category.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Match indicator */}
                      <div className="flex-shrink-0">
                        <div className={`w-3 h-3 rounded-full ${company.hasProductMatch ? 'bg-green-400' : 'bg-slate-300'}`} />
                      </div>
                    </div>
                    
                    {/* Bottom section with stats and action */}
                    <div className="mt-4">
                      {/* <div className="flex items-center justify-between text-sm mb-3">
                        <span className="text-[#334155]">Articles: <span className="font-bold text-[#2d2d2d]">{company.totalArticlesCount}</span></span>
                        <span className="text-[#334155]">Categories: <span className="font-bold text-[#2d2d2d]">{company._count.articles}</span></span>
                      </div> */}
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-[#334155]">
                          {formatDate(company.createdAt)}
                        </div>
                        <span className="inline-flex items-center space-x-1 text-sm text-[#7cc6ee] group-hover:text-[#6bb8e0] font-medium transition-colors duration-200">
                          <span>View Analysis</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-12">
                <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <p className="text-[#334155] text-lg font-medium mb-2">No companies analyzed yet</p>
                <p className="text-[#334155] text-sm">Use the search above to analyze your first company</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}