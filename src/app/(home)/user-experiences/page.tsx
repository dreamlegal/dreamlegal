
// 'use client';

// import { useState, useEffect, Suspense } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { useNewAuth } from '@/context/NewAuthContext';
// import Link from 'next/link';

// interface Product {
//   id: string;
//   slug: string;
//   productName: string;
//   companyName: string;
//   logoUrl: string;
//   description: string;
// }

// interface UserExperience {
//   id: string;
//   userId: string;
//   beforeUsing: string;
//   afterUsing: string;
//   recommendationScore: number;
//   createdAt: string;
//   updatedAt: string;
// }

// const ReviewPageContent = () => {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const { userId, vendorId, isLoading: authLoading } = useNewAuth();
  
//   // Product selection state
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<Product[]>([]);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isSearching, setIsSearching] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Form state
//   const [formData, setFormData] = useState({
//     beforeUsing: '',
//     afterUsing: '',
//     recommendationScore: 5
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Experiences state
//   const [experiences, setExperiences] = useState<UserExperience[]>([]);
//   const [userExperience, setUserExperience] = useState<UserExperience | null>(null);
//   const [loadingExperiences, setLoadingExperiences] = useState(false);
//   const [expandedExperience, setExpandedExperience] = useState<string | null>(null);

//   // Check if a product is pre-selected via URL parameter
//   useEffect(() => {
//     const productSlug = searchParams.get('product');
//     if (productSlug) {
//       fetchProductBySlug(productSlug);
//     }
//   }, [searchParams]);

//   const fetchProductBySlug = async (slug: string) => {
//     setLoading(true);
//     try {
//       const response = await fetch(`/api/software/${slug}`);
//       if (response.ok) {
//         const data = await response.json();
//         setSelectedProduct({
//           id: data.id,
//           slug: data.slug,
//           productName: data.productName,
//           companyName: data.companyName,
//           logoUrl: data.logoUrl,
//           description: data.description
//         });
//         setSearchQuery(data.productName);
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Search for products
//   const searchProducts = async (query: string) => {
//     if (!query.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     setIsSearching(true);
//     try {
//       const response = await fetch(`/api/ue-search?q=${encodeURIComponent(query)}`);
//       if (response.ok) {
//         const data = await response.json();
//         setSearchResults(data.products || []);
//       }
//     } catch (error) {
//       console.error('Error searching products:', error);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   // Debounced search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (!selectedProduct) {
//         searchProducts(searchQuery);
//       }
//     }, 300);
//     return () => clearTimeout(timer);
//   }, [searchQuery, selectedProduct]);

//   // Fetch experiences when product is selected
//   const fetchExperiences = async (slug: string) => {
//     try {
//       setLoadingExperiences(true);
//       const queryParams = userId ? `?userId=${userId}` : '';
//       const response = await fetch(`/api/software/${slug}/experiences${queryParams}`);
      
//       if (response.ok) {
//         const data = await response.json();
//         setExperiences(data.experiences || []);
//         setUserExperience(data.userExperience || null);
        
//         if (data.userExperience) {
//           setFormData({
//             beforeUsing: data.userExperience.beforeUsing,
//             afterUsing: data.userExperience.afterUsing,
//             recommendationScore: data.userExperience.recommendationScore
//           });
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching user experiences:', error);
//     } finally {
//       setLoadingExperiences(false);
//     }
//   };

//   useEffect(() => {
//     if (selectedProduct) {
//       fetchExperiences(selectedProduct.slug);
//     }
//   }, [selectedProduct, userId]);

//   const handleSubmit = async () => {
//     if (!userId) {
//       alert('Please login to share your experience');
//       return;
//     }

//     if (!selectedProduct) {
//       alert('Please select a product');
//       return;
//     }

//     if (!formData.beforeUsing.trim() || !formData.afterUsing.trim()) {
//       alert('Please fill in all fields');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const response = await fetch(`/api/software/${selectedProduct.slug}/experiences`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId,
//           ...formData
//         }),
//       });

//       if (response.ok) {
//         alert('Experience shared successfully!');
//         fetchExperiences(selectedProduct.slug);
//       } else {
//         const data = await response.json();
//         alert(data.error || 'Failed to submit experience');
//       }
//     } catch (error) {
//       console.error('Error submitting experience:', error);
//       alert('Failed to submit experience');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!confirm('Are you sure you want to delete your experience?')) return;
//     if (!selectedProduct) return;

//     setIsSubmitting(true);

//     try {
//       const response = await fetch(`/api/software/${selectedProduct.slug}/experiences`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (response.ok) {
//         alert('Experience removed successfully!');
//         fetchExperiences(selectedProduct.slug);
//       } else {
//         alert('Failed to remove experience');
//       }
//     } catch (error) {
//       console.error('Error removing experience:', error);
//       alert('Failed to remove experience');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getScoreColor = (score: number) => {
//     if (score <= 2) return '#ef4444'; // red
//     if (score <= 4) return '#f97316'; // orange
//     if (score <= 6) return '#eab308'; // yellow
//     if (score <= 8) return '#84cc16'; // lime
//     return '#22c55e'; // green
//   };

//   const getScoreLabel = (score: number) => {
//     if (score <= 2) return 'Poor';
//     if (score <= 4) return 'Fair';
//     if (score <= 6) return 'Good';
//     if (score <= 8) return 'Great';
//     return 'Excellent';
//   };

//   const truncateText = (text: string, maxLength: number = 150) => {
//     if (text.length <= maxLength) return text;
//     return text.substr(0, maxLength).trim() + '...';
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getRecommendationColor = (score: number) => {
//     if (score >= 9) return { bg: 'bg-green-100', text: 'text-green-800' };
//     if (score >= 7) return { bg: 'bg-blue-100', text: 'text-blue-800' };
//     if (score >= 5) return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
//     return { bg: 'bg-red-100', text: 'text-red-800' };
//   };

//   const averageScore = experiences.length > 0 
//     ? Math.round((experiences.reduce((sum, exp) => sum + exp.recommendationScore, 0) / experiences.length) * 10) / 10
//     : 0;

//   if (authLoading || loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen mt-8 bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b mt-16 border-gray-200 px-6 py-4">
//         <div className="max-w-4xl mx-auto flex items-center justify-between">
//           <div>
//             <h1 className="text-xl font-bold text-gray-900">Share Your Experience</h1>
//             <p className="text-sm text-gray-600">Help the legal community make informed decisions</p>
//           </div>
//           <Link
//             href="/"
//             className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//             </svg>
//             Back to Home
//           </Link>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-4xl mx-auto px-6 py-8">
        
//         {/* Centered Form Container */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          
//           {/* Search Section */}
//           <div className="mb-8">
//             <label className="block text-lg font-semibold text-gray-900 mb-3">
//               Search for a product
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Type the name of the legal tool or software..."
//                 className="w-full h-12 px-4 text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white"
//               />
              
//               {isSearching && (
//                 <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
//                   <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
//                 </div>
//               )}
//             </div>
            
//             {/* Search Results */}
//             {searchResults.length > 0 && !selectedProduct && (
//               <div className="mt-3 bg-white border border-gray-200 rounded-xl shadow-sm max-h-48 overflow-y-auto">
//                 {searchResults.map((product) => (
//                   <button
//                     key={product.id}
//                     onClick={() => {
//                       setSelectedProduct(product);
//                       setSearchQuery(product.productName);
//                       setSearchResults([]);
//                     }}
//                     className="w-full p-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
//                   >
//                     <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//                       <img
//                         src={product.logoUrl || '/placeholder-logo.png'}
//                         alt={product.productName}
//                         className="w-6 h-6 object-contain"
//                       />
//                     </div>
//                     <div>
//                       <div className="font-semibold text-gray-900">{product.productName}</div>
//                       <div className="text-sm text-gray-500">{product.companyName}</div>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             )}

//             {/* Selected Product Display */}
//             {selectedProduct && (
//               <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
//                       <img
//                         src={selectedProduct.logoUrl || '/placeholder-logo.png'}
//                         alt={selectedProduct.productName}
//                         className="w-8 h-8 object-contain"
//                       />
//                     </div>
//                     <div>
//                       <div className="font-semibold text-gray-900">{selectedProduct.productName}</div>
//                       <div className="text-sm text-gray-600">by {selectedProduct.companyName}</div>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => {
//                       setSelectedProduct(null);
//                       setSearchQuery('');
//                     }}
//                     className="text-gray-500 hover:text-gray-700 p-1"
//                   >
//                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Form Fields */}
//           {selectedProduct && (
//             <>
//               {/* Before/After Fields - Horizontal Layout */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//                 <div>
//                   <label className="block text-lg font-semibold text-gray-900 mb-3">
//                     Before using {selectedProduct.productName}
//                   </label>
//                   <textarea
//                     value={formData.beforeUsing}
//                     onChange={(e) => setFormData({ ...formData, beforeUsing: e.target.value })}
//                     placeholder="Describe your situation, challenges, or workflow before using this product..."
//                     rows={6}
//                     className="w-full p-4 text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-lg font-semibold text-gray-900 mb-3">
//                     After using {selectedProduct.productName}
//                   </label>
//                   <textarea
//                     value={formData.afterUsing}
//                     onChange={(e) => setFormData({ ...formData, afterUsing: e.target.value })}
//                     placeholder="Describe how the product has impacted your work, what benefits you've seen..."
//                     rows={6}
//                     className="w-full p-4 text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
//                   />
//                 </div>
//               </div>

//               {/* Recommendation Score Slider */}
//               <div className="mb-8">
//                 <label className="block text-lg font-semibold text-gray-900 mb-4">
//                   How likely are you to recommend this tool?
//                 </label>
                
//                 <div className="space-y-6">
//                   <div className="relative">
//                     <input
//                       type="range"
//                       min="1"
//                       max="10"
//                       value={formData.recommendationScore}
//                       onChange={(e) => setFormData({ ...formData, recommendationScore: parseInt(e.target.value) })}
//                       className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
//                     />
//                     <style jsx>{`
//                       .slider::-webkit-slider-thumb {
//                         appearance: none;
//                         height: 24px;
//                         width: 24px;
//                         border-radius: 50%;
//                         background: ${getScoreColor(formData.recommendationScore)};
//                         cursor: pointer;
//                         border: 3px solid white;
//                         box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//                       }
//                       .slider::-moz-range-thumb {
//                         height: 24px;
//                         width: 24px;
//                         border-radius: 50%;
//                         background: ${getScoreColor(formData.recommendationScore)};
//                         cursor: pointer;
//                         border: 3px solid white;
//                         box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
//                       }
//                     `}</style>
//                   </div>
                  
//                   <div className="flex items-center justify-between">
//                     <span className="text-sm text-gray-500">Not likely</span>
                    
//                     <div className="text-center">
//                       <div 
//                         className="text-3xl font-bold mb-1" 
//                         style={{ color: getScoreColor(formData.recommendationScore) }}
//                       >
//                         {formData.recommendationScore}
//                       </div>
//                       <div 
//                         className="text-sm font-medium px-3 py-1 rounded-full"
//                         style={{ 
//                           backgroundColor: getScoreColor(formData.recommendationScore) + '20',
//                           color: getScoreColor(formData.recommendationScore)
//                         }}
//                       >
//                         {getScoreLabel(formData.recommendationScore)}
//                       </div>
//                     </div>
                    
//                     <span className="text-sm text-gray-500">Very likely</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Submit/Delete Buttons */}
//               <div className="flex justify-between items-center">
//                 <div>
//                   {userExperience && (
//                     <button
//                       onClick={handleDelete}
//                       disabled={isSubmitting}
//                       className="px-6 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors disabled:opacity-50"
//                     >
//                       Delete Experience
//                     </button>
//                   )}
//                 </div>
                
//                 <button
//                   onClick={handleSubmit}
//                   disabled={isSubmitting || !userId || !formData.beforeUsing.trim() || !formData.afterUsing.trim()}
//                   className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isSubmitting ? (
//                     <div className="flex items-center space-x-2">
//                       <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
//                       <span>Submitting...</span>
//                     </div>
//                   ) : (
//                     userExperience ? 'Update Experience' : 'Share Experience'
//                   )}
//                 </button>
//               </div>
//             </>
//           )}

//           {/* No Product Selected State */}
//           {!selectedProduct && (
//             <div className="text-center py-8">
//               <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 Search for a product to get started
//               </h3>
//               <p className="text-gray-600">
//                 Type the name of the legal tool you want to review
//               </p>
//             </div>
//           )}
//         </div>

//         {/* User Experiences Section */}
//         {selectedProduct && (
//           <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">
//               User Experiences with {selectedProduct.productName}
//             </h2>

//             {loadingExperiences ? (
//               <div className="flex items-center justify-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600"></div>
//                 <span className="ml-3 text-lg text-gray-600">Loading experiences...</span>
//               </div>
//             ) : (
//               <>
//                 {/* Summary Stats */}
//                 {experiences.length > 0 && (
//                   <div className="bg-gray-50 rounded-xl p-6 mb-6">
//                     <div className="grid grid-cols-3 gap-6 text-center">
//                       <div>
//                         <div className="text-2xl font-bold text-gray-900">{experiences.length}</div>
//                         <div className="text-sm text-gray-600">
//                           {experiences.length === 1 ? 'Experience' : 'Experiences'}
//                         </div>
//                       </div>
                      
//                       <div>
//                         <div className="text-2xl font-bold text-blue-600">{averageScore}</div>
//                         <div className="text-sm text-gray-600">Average Rating</div>
//                       </div>
                      
//                       <div>
//                         <div className="text-2xl font-bold text-gray-900">
//                           {Math.round((experiences.filter(exp => exp.recommendationScore >= 7).length / experiences.length) * 100)}%
//                         </div>
//                         <div className="text-sm text-gray-600">Would Recommend</div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* User's Experience */}
//                 {userExperience && (
//                   <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center space-x-3">
//                         <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                           You
//                         </div>
//                         <div>
//                           <div className="font-semibold text-gray-900">Your Experience</div>
//                           <div className="text-xs text-gray-600">
//                             Last updated: {formatDate(userExperience.updatedAt)}
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRecommendationColor(userExperience.recommendationScore).bg} ${getRecommendationColor(userExperience.recommendationScore).text}`}>
//                         {userExperience.recommendationScore}/10
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <h4 className="font-semibold text-gray-700 mb-2">Before</h4>
//                         <div className="p-3 bg-white rounded-lg">
//                           <p className="text-sm text-gray-700">
//                             {userExperience.beforeUsing}
//                           </p>
//                         </div>
//                       </div>
                      
//                       <div>
//                         <h4 className="font-semibold text-gray-700 mb-2">After</h4>
//                         <div className="p-3 bg-white rounded-lg">
//                           <p className="text-sm text-gray-700">
//                             {userExperience.afterUsing}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Other Experiences */}
//                 {experiences.length > 0 ? (
//                   <div className="space-y-4">
//                     {experiences
//                       .filter(exp => exp.userId !== userId)
//                       .map((experience, index) => (
//                         <div key={experience.id} className="border border-gray-200 rounded-xl p-6">
//                           <div className="flex items-center justify-between mb-4">
//                             <div className="flex items-center space-x-3">
//                               <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                                 {index + 1}
//                               </div>
//                               <div>
//                                 <div className="font-semibold text-gray-900">Anonymous User</div>
//                                 <div className="text-xs text-gray-600">{formatDate(experience.createdAt)}</div>
//                               </div>
//                             </div>
                            
//                             <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getRecommendationColor(experience.recommendationScore).bg} ${getRecommendationColor(experience.recommendationScore).text}`}>
//                               {experience.recommendationScore}/10
//                             </div>
//                           </div>
                          
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                               <h4 className="font-semibold text-gray-700 mb-2">Before</h4>
//                               <div className="p-3 bg-gray-50 rounded-lg">
//                                 <p className="text-sm text-gray-700">
//                                   {expandedExperience === experience.id 
//                                     ? experience.beforeUsing 
//                                     : truncateText(experience.beforeUsing, 120)
//                                   }
//                                 </p>
//                               </div>
//                             </div>
                            
//                             <div>
//                               <h4 className="font-semibold text-gray-700 mb-2">After</h4>
//                               <div className="p-3 bg-blue-50 rounded-lg">
//                                 <p className="text-sm text-gray-700">
//                                   {expandedExperience === experience.id 
//                                     ? experience.afterUsing 
//                                     : truncateText(experience.afterUsing, 120)
//                                   }
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
                          
//                           {(experience.beforeUsing.length > 120 || experience.afterUsing.length > 120) && (
//                             <div className="text-center mt-3">
//                               <button
//                                 onClick={() => setExpandedExperience(
//                                   expandedExperience === experience.id ? null : experience.id
//                                 )}
//                                 className="text-blue-600 hover:text-blue-700 font-medium text-sm"
//                               >
//                                 {expandedExperience === experience.id ? 'Show less' : 'Read more'}
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                   </div>
//                 ) : !userExperience ? (
//                   <div className="text-center py-8">
//                     <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                       </svg>
//                     </div>
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">No experiences yet</h3>
//                     <p className="text-gray-600">
//                       Be the first to share your experience with {selectedProduct.productName}
//                     </p>
//                   </div>
//                 ) : null}
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Main component with Suspense wrapper
// const ReviewPage = () => {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600"></div>
//       </div>
//     }>
//       <ReviewPageContent />
//     </Suspense>
//   );
// };

// export default ReviewPage;
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useNewAuth } from '@/context/NewAuthContext';
import Link from 'next/link';

interface Product {
  id: string;
  slug: string;
  productName: string;
  companyName: string;
  logoUrl: string;
  description: string;
}

interface UserExperience {
  id: string;
  userId: string;
  beforeUsing: string;
  afterUsing: string;
  recommendationScore: number;
  createdAt: string;
  updatedAt: string;
}

const ReviewPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userId, vendorId, isLoading: authLoading } = useNewAuth();
  
  // Product selection state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    beforeUsing: '',
    afterUsing: '',
    recommendationScore: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Experiences state
  const [experiences, setExperiences] = useState<UserExperience[]>([]);
  const [userExperience, setUserExperience] = useState<UserExperience | null>(null);
  const [loadingExperiences, setLoadingExperiences] = useState(false);
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);

  // Check if a product is pre-selected via URL parameter
  useEffect(() => {
    const productSlug = searchParams.get('product');
    if (productSlug) {
      fetchProductBySlug(productSlug);
    }
  }, [searchParams]);

  const fetchProductBySlug = async (slug: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/software/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedProduct({
          id: data.id,
          slug: data.slug,
          productName: data.productName,
          companyName: data.companyName,
          logoUrl: data.logoUrl,
          description: data.description
        });
        setSearchQuery(data.productName);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  // Search for products
  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/ue-search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.products || []);
      }
    } catch (error) {
      console.error('Error searching products:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!selectedProduct) {
        searchProducts(searchQuery);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedProduct]);

  // Fetch experiences when product is selected
  const fetchExperiences = async (slug: string) => {
    try {
      setLoadingExperiences(true);
      const queryParams = userId ? `?userId=${userId}` : '';
      const response = await fetch(`/api/software/${slug}/experiences${queryParams}`);
      
      if (response.ok) {
        const data = await response.json();
        setExperiences(data.experiences || []);
        setUserExperience(data.userExperience || null);
        
        if (data.userExperience) {
          setFormData({
            beforeUsing: data.userExperience.beforeUsing,
            afterUsing: data.userExperience.afterUsing,
            recommendationScore: data.userExperience.recommendationScore
          });
        }
      }
    } catch (error) {
      console.error('Error fetching user experiences:', error);
    } finally {
      setLoadingExperiences(false);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      fetchExperiences(selectedProduct.slug);
    }
  }, [selectedProduct, userId]);

  const handleSubmit = async () => {
    if (!userId) {
      alert('Please login to share your experience');
      return;
    }

    if (!selectedProduct) {
      alert('Please select a product');
      return;
    }

    if (!formData.beforeUsing.trim() || !formData.afterUsing.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/software/${selectedProduct.slug}/experiences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...formData
        }),
      });

      if (response.ok) {
        alert('Experience shared successfully!');
        fetchExperiences(selectedProduct.slug);
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to submit experience');
      }
    } catch (error) {
      console.error('Error submitting experience:', error);
      alert('Failed to submit experience');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your experience?')) return;
    if (!selectedProduct) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/software/${selectedProduct.slug}/experiences`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        alert('Experience removed successfully!');
        fetchExperiences(selectedProduct.slug);
      } else {
        alert('Failed to remove experience');
      }
    } catch (error) {
      console.error('Error removing experience:', error);
      alert('Failed to remove experience');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score <= 2) return '#ef4444'; // red
    if (score <= 4) return '#f97316'; // orange
    if (score <= 6) return '#eab308'; // yellow
    if (score <= 8) return '#84cc16'; // lime
    return '#22c55e'; // green
  };

  const getScoreLabel = (score: number) => {
    if (score <= 2) return 'Poor';
    if (score <= 4) return 'Fair';
    if (score <= 6) return 'Good';
    if (score <= 8) return 'Great';
    return 'Excellent';
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRecommendationColor = (score: number) => {
    if (score >= 9) return { bg: 'bg-green-100', text: 'text-green-800' };
    if (score >= 7) return { bg: 'bg-blue-100', text: 'text-blue-800' };
    if (score >= 5) return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
    return { bg: 'bg-red-100', text: 'text-red-800' };
  };

  const averageScore = experiences.length > 0 
    ? Math.round((experiences.reduce((sum, exp) => sum + exp.recommendationScore, 0) / experiences.length) * 10) / 10
    : 0;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-8 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b mt-16 border-gray-200 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Share Your Experience</h1>
            <p className="text-xs sm:text-sm text-gray-600">Help the legal community make informed decisions</p>
          </div>
          <Link
            href="/"
            className="flex items-center space-x-2 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors w-fit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        
        {/* Centered Form Container */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          
          {/* Search Section */}
          <div className="mb-6 sm:mb-8">
            <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
              Search for a product
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type the name of the legal tool or software..."
                className="w-full h-10 sm:h-12 px-3 sm:px-4 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white"
              />
              
              {isSearching && (
                <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin w-4 sm:w-5 h-4 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
            
            {/* Search Results */}
            {searchResults.length > 0 && !selectedProduct && (
              <div className="mt-3 bg-white border border-gray-200 rounded-xl shadow-sm max-h-48 overflow-y-auto">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(product);
                      setSearchQuery(product.productName);
                      setSearchResults([]);
                    }}
                    className="w-full p-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <img
                        src={product.logoUrl || '/placeholder-logo.png'}
                        alt={product.productName}
                        className="w-4 sm:w-6 h-4 sm:h-6 object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{product.productName}</div>
                      <div className="text-xs sm:text-sm text-gray-500 truncate">{product.companyName}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Selected Product Display */}
            {selectedProduct && (
              <div className="mt-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                      <img
                        src={selectedProduct.logoUrl || '/placeholder-logo.png'}
                        alt={selectedProduct.productName}
                        className="w-6 sm:w-8 h-6 sm:h-8 object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">{selectedProduct.productName}</div>
                      <div className="text-xs sm:text-sm text-gray-600 truncate">by {selectedProduct.companyName}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      setSearchQuery('');
                    }}
                    className="text-gray-500 hover:text-gray-700 p-1 flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Form Fields */}
          {selectedProduct && (
            <>
              {/* Before/After Fields - Responsive Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                  <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                    Before using {selectedProduct.productName}
                  </label>
                  <textarea
                    value={formData.beforeUsing}
                    onChange={(e) => setFormData({ ...formData, beforeUsing: e.target.value })}
                    placeholder="Describe your situation, challenges, or workflow before using this product..."
                    rows={5}
                    className="w-full p-3 sm:p-4 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
                    After using {selectedProduct.productName}
                  </label>
                  <textarea
                    value={formData.afterUsing}
                    onChange={(e) => setFormData({ ...formData, afterUsing: e.target.value })}
                    placeholder="Describe how the product has impacted your work, what benefits you've seen..."
                    rows={5}
                    className="w-full p-3 sm:p-4 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
                  />
                </div>
              </div>

              {/* Recommendation Score Slider */}
              <div className="mb-6 sm:mb-8">
                <label className="block text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                  How likely are you to recommend this tool?
                </label>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="relative px-2">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={formData.recommendationScore}
                      onChange={(e) => setFormData({ ...formData, recommendationScore: parseInt(e.target.value) })}
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, ${getScoreColor(formData.recommendationScore)} 0%, ${getScoreColor(formData.recommendationScore)} ${(formData.recommendationScore - 1) * 11.11}%, #e5e7eb ${(formData.recommendationScore - 1) * 11.11}%, #e5e7eb 100%)`
                      }}
                    />
                    <style jsx>{`
                      .slider::-webkit-slider-thumb {
                        appearance: none;
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                        background: ${getScoreColor(formData.recommendationScore)};
                        cursor: pointer;
                        border: 2px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                      }
                      .slider::-moz-range-thumb {
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                        background: ${getScoreColor(formData.recommendationScore)};
                        cursor: pointer;
                        border: 2px solid white;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                      }
                    `}</style>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-500">Not likely</span>
                    
                    <div className="text-center">
                      <div 
                        className="text-2xl sm:text-3xl font-bold mb-1" 
                        style={{ color: getScoreColor(formData.recommendationScore) }}
                      >
                        {formData.recommendationScore}
                      </div>
                      <div 
                        className="text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full"
                        style={{ 
                          backgroundColor: getScoreColor(formData.recommendationScore) + '20',
                          color: getScoreColor(formData.recommendationScore)
                        }}
                      >
                        {getScoreLabel(formData.recommendationScore)}
                      </div>
                    </div>
                    
                    <span className="text-xs sm:text-sm text-gray-500">Very likely</span>
                  </div>
                </div>
              </div>

              {/* Submit/Delete Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  {userExperience && (
                    <button
                      onClick={handleDelete}
                      disabled={isSubmitting}
                      className="px-4 sm:px-6 py-2 sm:py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors disabled:opacity-50 text-sm sm:text-base"
                    >
                      Delete Experience
                    </button>
                  )}
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !userId || !formData.beforeUsing.trim() || !formData.afterUsing.trim()}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-base sm:text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin w-4 sm:w-5 h-4 sm:h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    userExperience ? 'Update Experience' : 'Share Experience'
                  )}
                </button>
              </div>
            </>
          )}

          {/* No Product Selected State */}
          {!selectedProduct && (
            <div className="text-center py-6 sm:py-8">
              <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                Search for a product to get started
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Type the name of the legal tool you want to review
              </p>
            </div>
          )}
        </div>

        {/* User Experiences Section */}
        {selectedProduct && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              User Experiences with {selectedProduct.productName}
            </h2>

            {loadingExperiences ? (
              <div className="flex items-center justify-center py-6 sm:py-8">
                <div className="animate-spin rounded-full h-6 sm:h-8 w-6 sm:w-8 border-4 border-gray-200 border-t-blue-600"></div>
                <span className="ml-3 text-base sm:text-lg text-gray-600">Loading experiences...</span>
              </div>
            ) : (
              <>
                {/* Summary Stats */}
                {experiences.length > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="grid grid-cols-3 gap-3 sm:gap-6 text-center">
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">{experiences.length}</div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          {experiences.length === 1 ? 'Experience' : 'Experiences'}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-blue-600">{averageScore}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Average Rating</div>
                      </div>
                      
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-900">
                          {Math.round((experiences.filter(exp => exp.recommendationScore >= 7).length / experiences.length) * 100)}%
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">Would Recommend</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* User's Experience */}
                {userExperience && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                          You
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm sm:text-base">Your Experience</div>
                          <div className="text-xs text-gray-600">
                            Last updated: {formatDate(userExperience.updatedAt)}
                          </div>
                        </div>
                      </div>
                      
                      <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getRecommendationColor(userExperience.recommendationScore).bg} ${getRecommendationColor(userExperience.recommendationScore).text}`}>
                        {userExperience.recommendationScore}/10
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Before</h4>
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-xs sm:text-sm text-gray-700">
                            {userExperience.beforeUsing}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">After</h4>
                        <div className="p-3 bg-white rounded-lg">
                          <p className="text-xs sm:text-sm text-gray-700">
                            {userExperience.afterUsing}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other Experiences */}
                {experiences.length > 0 ? (
                  <div className="space-y-4">
                    {experiences
                      .filter(exp => exp.userId !== userId)
                      .map((experience, index) => (
                        <div key={experience.id} className="border border-gray-200 rounded-xl p-4 sm:p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900 text-sm sm:text-base">Anonymous User</div>
                                <div className="text-xs text-gray-600">{formatDate(experience.createdAt)}</div>
                              </div>
                            </div>
                            
                            <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${getRecommendationColor(experience.recommendationScore).bg} ${getRecommendationColor(experience.recommendationScore).text}`}>
                              {experience.recommendationScore}/10
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Before</h4>
                              <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-xs sm:text-sm text-gray-700">
                                  {expandedExperience === experience.id 
                                    ? experience.beforeUsing 
                                    : truncateText(experience.beforeUsing, 120)
                                  }
                                </p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">After</h4>
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-xs sm:text-sm text-gray-700">
                                  {expandedExperience === experience.id 
                                    ? experience.afterUsing 
                                    : truncateText(experience.afterUsing, 120)
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {(experience.beforeUsing.length > 120 || experience.afterUsing.length > 120) && (
                            <div className="text-center mt-3">
                              <button
                                onClick={() => setExpandedExperience(
                                  expandedExperience === experience.id ? null : experience.id
                                )}
                                className="text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm"
                              >
                                {expandedExperience === experience.id ? 'Show less' : 'Read more'}
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                ) : !userExperience ? (
                  <div className="text-center py-6 sm:py-8">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No experiences yet</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Be the first to share your experience with {selectedProduct.productName}
                    </p>
                  </div>
                ) : null}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Main component with Suspense wrapper
const ReviewPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="animate-spin rounded-full h-8 sm:h-10 w-8 sm:w-10 border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    }>
      <ReviewPageContent />
    </Suspense>
  );
};

export default ReviewPage;