// // "use client"

// // import {  Sparkles } from 'lucide-react';


// // const ReviewCard = dynamic(() => Promise.resolve(({ review }) => {
// //   const [isHovered, setIsHovered] = useState(false);
// //   const [isVisible, setIsVisible] = useState(false);

// //   useEffect(() => {
// //     const timer = setTimeout(() => setIsVisible(true), 100);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   const formatDate = (dateString) => {
// //     if (!dateString) return '';
// //     const date = new Date(dateString);
// //     return new Intl.DateTimeFormat('en-US', { 
// //       month: 'short',
// //       day: 'numeric',
// //       year: 'numeric'
// //     }).format(date);
// //   };

// //   const ratings = [
// //     review.easeOfLearning,
// //     review.integration,
// //     review.roi,
// //     review.support
// //   ].filter(Boolean);
  
// //   const avgRating = ratings.length > 0 
// //     ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
// //     : null;

// //   return (
// //     <Card 
// //       className={`group relative overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 
// //         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
// //       onMouseEnter={() => setIsHovered(true)}
// //       onMouseLeave={() => setIsHovered(false)}
// //     >
// //       <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
// //       <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 opacity-0 group-hover:opacity-20 blur transition-all duration-500" />
      
// //       <CardContent className="p-8 relative">
// //         <div className="flex gap-8 items-start">
// //           <div className="relative">
// //             <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-violet-100 to-fuchsia-50 flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-105">
// //               <img
// //                 src={review.productImage || "/api/placeholder/112/112"}
// //                 alt={review.productName}
// //                 className="w-20 h-20 object-contain"
// //               />
// //             </div>
// //             {avgRating && (
// //               <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
// //                 {avgRating} ★
// //               </div>
// //             )}
// //           </div>

// //           <div className="flex-1 space-y-4">
// //             <div className="flex justify-between items-start">
// //               <div>
// //                 <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 group-hover:from-fuchsia-600 group-hover:to-pink-600 transition-all duration-500">
// //                   {review.productName}
// //                 </h3>
// //                 <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
// //                   <Calendar className="w-4 h-4" />
// //                   {formatDate(review.createdAt)}
// //                 </p>
// //               </div>
// //               <div className="flex gap-2">
// //                 <button className="p-2 rounded-full hover:bg-violet-50 text-violet-600 transition-colors">
// //                   <Edit className="w-4 h-4" />
// //                 </button>
// //               </div>
// //             </div>

// //             <p className="text-gray-600 leading-relaxed">
// //               {review.content}
// //             </p>

// //             <div className="flex gap-6 pt-4">
// //               <div className="flex items-center gap-2 text-violet-600">
// //                 <ThumbsUp className="w-4 h-4" />
// //                 <span className="text-sm font-medium">{review.likes || 0} likes</span>
// //               </div>
// //               <div className="flex items-center gap-2 text-fuchsia-600">
// //                 <MessageSquare className="w-4 h-4" />
// //                 <span className="text-sm font-medium">{review.comments || 0} comments</span>
// //               </div>
// //               <div className="flex items-center gap-2 text-pink-600">
// //                 <Activity className="w-4 h-4" />
// //                 <span className="text-sm font-medium">{review.views || 0} views</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   );
// // }), { ssr: false });



// // import React, { useState, useEffect } from 'react';
// // import { Newspaper, RefreshCw, Edit, MessageSquare, ThumbsUp, Activity, Star, Calendar } from 'lucide-react';
// // import { Card, CardContent } from '@/components/ui/card';
// // import Link from 'next/link';
// // import dynamic from 'next/dynamic';



// // const ReviewsPage = ({ userId }) => {
// //   const [userReviews, setUserReviews] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isRefreshing, setIsRefreshing] = useState(false);
// //   const [mounted, setMounted] = useState(false);

// //   useEffect(() => {
// //     setMounted(true);
// //   }, []);

// //   const fetchReviews = async () => {
// //     if (!userId) return;
    
// //     setLoading(true);
// //     try {
// //       const response = await fetch("/api/get-user-review", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ userId }),
// //       });
// //       const data = await response.json();
// //       setUserReviews(data.userReviews || []);
// //     } catch (error) {
// //       console.error("Error fetching reviews:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (mounted && userId) {
// //       fetchReviews();
// //     }
// //   }, [userId, mounted]);

// //   const handleRefresh = async () => {
// //     setIsRefreshing(true);
// //     await fetchReviews();
// //     setTimeout(() => setIsRefreshing(false), 500);
// //   };

// //   if (!mounted) return null;

// //   return (
// //     <div className="min-h-screen p-6 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-emerald-50/20 shadow-md">
// //       {/* Header */}
// //       <div className="max-w-5xl mx-auto mb-8">
// //         <div className="flex items-center justify-between mb-2">
// //           <div className="flex items-center gap-3">
// //             <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
// //               <Newspaper className="w-6 h-6" />
// //             </div>
// //             <div>
// //               <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
// //               <p className="text-sm text-gray-600">
// //                 {userReviews.length} product reviews
// //               </p>
// //             </div>
// //           </div>
// //           <button
// //             onClick={handleRefresh}
// //             disabled={loading || isRefreshing}
// //             className="p-2 text-gray-600 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// //           >
// //             <RefreshCw 
// //               className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : 'transform transition-transform hover:rotate-180 duration-500'}`} 
// //             />
// //           </button>
// //         </div>
// //       </div>

// //       {/* Reviews List */}
// //       <div className="max-w-5xl mx-auto space-y-4">
// //         {loading ? (
// //           // Loading skeleton
// //           [...Array(3)].map((_, i) => (
// //             <Card key={i} className="animate-pulse">
// //               <CardContent className="p-6">
// //                 <div className="flex gap-6">
// //                   <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
// //                   <div className="flex-1">
// //                     <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
// //                     <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
// //                     <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
// //                     <div className="h-4 bg-gray-200 rounded w-2/3"></div>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           ))
// //         ) : userReviews.length === 0 ? (
// //           <Card className="border-dashed border-2">
// //             <CardContent className="p-12 text-center">
// //               <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
// //                 <MessageSquare className="w-10 h-10 text-white" />
// //               </div>
// //               <h3 className="text-xl font-semibold text-gray-900 mb-2">
// //                 No reviews yet
// //               </h3>
// //               <p className="text-gray-500 mb-6">
// //                 Share your experience with products you've used
// //               </p>
// //               <button className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
// //                 Write a Review
// //               </button>
// //             </CardContent>
// //           </Card>
// //         ) : (
// //           userReviews.map((review) => (
// //             <ReviewCard 
// //               key={review.id} 
// //               review={review}
// //             />
// //           ))
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ReviewsPage;
// import React, { useState, useEffect } from 'react';
// import { Newspaper, RefreshCw, Edit, MessageSquare, ThumbsUp, Activity, Star, Calendar } from 'lucide-react';

// const ReviewCard = ({ review }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', { 
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     }).format(date);
//   };

//   const ratings = [
//     review.easeOfLearning,
//     review.integration,
//     review.roi,
//     review.support
//   ].filter(Boolean);
  
//   const avgRating = ratings.length > 0 
//     ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
//     : null;

//   return (
//     <div 
//       className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
//       <div className="p-6">
//         <div className="flex gap-6">
//           <div className="relative">
//             <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-50 flex items-center justify-center shadow-lg">
//               <img
//                 src={review.productImage || "/api/placeholder/96/96"}
//                 alt={review.productName}
//                 className="w-16 h-16 object-contain"
//               />
//             </div>
//             {avgRating && (
//               <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-2 py-1 rounded-full text-sm font-medium">
//                 {avgRating} ★
//               </div>
//             )}
//           </div>

//           <div className="flex-1">
//             <div className="flex justify-between items-start">
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-900">
//                   {review.productName}
//                 </h3>
//                 <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
//                   <Calendar className="w-4 h-4" />
//                   {formatDate(review.createdAt)}
//                 </p>
//               </div>
//               <button className="p-2 rounded-full hover:bg-violet-50 text-violet-600 transition-colors">
//                 <Edit className="w-4 h-4" />
//               </button>
//             </div>

//             <p className="text-gray-600 mt-4 leading-relaxed">
//               {review.content}
//             </p>

//             <div className="flex gap-6 mt-4">
//               <div className="flex items-center gap-2 text-violet-600">
//                 <ThumbsUp className="w-4 h-4" />
//                 <span className="text-sm font-medium">{review.likes || 0} likes</span>
//               </div>
//               <div className="flex items-center gap-2 text-fuchsia-600">
//                 <MessageSquare className="w-4 h-4" />
//                 <span className="text-sm font-medium">{review.comments || 0} comments</span>
//               </div>
//               <div className="flex items-center gap-2 text-pink-600">
//                 <Activity className="w-4 h-4" />
//                 <span className="text-sm font-medium">{review.views || 0} views</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ReviewsPage = ({ userId }) => {
//   const [userReviews, setUserReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const fetchReviews = async () => {
//     if (!userId) return;
    
//     setLoading(true);
//     try {
//       const response = await fetch("/api/get-user-review", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId }),
//       });
//       const data = await response.json();
//       setUserReviews(data.userReviews || []);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, [userId]);

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchReviews();
//     setTimeout(() => setIsRefreshing(false), 500);
//   };

//   return (
//     <div className="min-h-screen p-6 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-emerald-50/20">
//       {/* Header */}
//       <div className="max-w-5xl mx-auto mb-8">
//         <div className="flex items-center justify-between mb-2">
//           <div className="flex items-center gap-3">
//             <div className="p-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg">
//               <Newspaper className="w-6 h-6" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
//               <p className="text-sm text-gray-600">
//                 {userReviews.length} product reviews
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={handleRefresh}
//             disabled={loading || isRefreshing}
//             className="p-2 text-gray-600 hover:text-violet-600 rounded-full hover:bg-violet-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <RefreshCw 
//               className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : 'transform transition-transform hover:rotate-180 duration-500'}`} 
//             />
//           </button>
//         </div>
//       </div>

//       {/* Reviews List */}
//       <div className="max-w-5xl mx-auto space-y-4">
//         {loading ? (
//           // Loading skeleton
//           [...Array(3)].map((_, i) => (
//             <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
//               <div className="flex gap-6">
//                 <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
//                 <div className="flex-1">
//                   <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
//                   <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
//                   <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : userReviews.length === 0 ? (
//           <div className="bg-white rounded-lg border-2 border-dashed p-12 text-center">
//             <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center">
//               <MessageSquare className="w-10 h-10 text-white" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               No reviews yet
//             </h3>
//             <p className="text-gray-500 mb-6">
//               Share your experience with products you've used
//             </p>
//             <button className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
//               Write a Review
//             </button>
//           </div>
//         ) : (
//           userReviews.map((review) => (
//             <ReviewCard 
//               key={review.id} 
//               review={review}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReviewsPage;

// import React, { useState, useEffect } from 'react';
// import { Newspaper, RefreshCw, Edit, MessageSquare, ThumbsUp, Activity, Star, Calendar, Share2, Trash2, ExternalLink } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import Link from 'next/link';

// const ReviewCard = ({ review, onDelete }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat('en-US', { 
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     }).format(date);
//   };

//   // Calculate average rating
//   const ratings = [
//     review.easeOfLearning,
//     review.integration,
//     review.roi,
//     review.support
//   ].filter(Boolean);
  
//   const avgRating = ratings.length > 0 
//     ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
//     : null;

//   return (
//     <Card 
//       className="group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-purple-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
//       <CardContent className="p-6">
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Left Column - Product Logo */}
//           <div className="flex-shrink-0">
//             <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gradient-to-br from-violet-50 to-purple-50 shadow-inner">
//               {review.product?.logoUrl ? (
//                 <img
//                   src={review.product.logoUrl}
//                   alt={review.product.name}
//                   className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center bg-violet-100">
//                   <MessageSquare className="w-8 h-8 text-violet-600" />
//                 </div>
//               )}
//               {avgRating && avgRating >= 4.5 && (
//                 <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 p-1 rounded-bl-xl">
//                   <Star className="w-4 h-4 text-white" />
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Middle Column - Review Content */}
//           <div className="flex-1 min-w-0">
//             <div className="flex items-start justify-between">
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
//                   {review.product?.name}
//                 </h3>
//                 <div className="flex flex-wrap gap-2 mb-3">
//                   {review.involvement?.map((role, index) => (
//                     <span
//                       key={index}
//                       className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-violet-50 to-purple-50 text-violet-800 border border-violet-100"
//                     >
//                       {role}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               {/* Quick Actions */}
//               <div className={`flex items-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
//                 <button className="p-2 text-gray-400 hover:text-violet-600 rounded-full hover:bg-violet-50 transition-colors">
//                   <Share2 className="w-5 h-5" />
//                 </button>
//                 <Link
//                   href={`/review/edit?id=${review.id}`}
//                   className="p-2 text-gray-400 hover:text-violet-600 rounded-full hover:bg-violet-50 transition-colors"
//                 >
//                   <Edit className="w-5 h-5" />
//                 </Link>
//                 <button 
//                   onClick={() => onDelete && onDelete(review.id)}
//                   className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
//                 >
//                   <Trash2 className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             {/* Review Content */}
//             <div className="space-y-4">
//               <p className="text-sm text-gray-600 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
//                 {review.bestThing}
//               </p>
              
//               {/* Rating Metrics */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 {[
//                   { label: 'Learning', value: review.easeOfLearning, icon: Activity },
//                   { label: 'Integration', value: review.integration, icon: ThumbsUp },
//                   { label: 'ROI', value: review.roi, icon: Activity },
//                   { label: 'Support', value: review.support, icon: MessageSquare },
//                 ].map((metric, index) => (
//                   metric.value && (
//                     <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-violet-50/50 to-purple-50/50">
//                       <metric.icon className="w-4 h-4 text-violet-500" />
//                       <div className="flex flex-col">
//                         <span className="text-xs text-gray-500">{metric.label}</span>
//                         <span className="font-semibold text-violet-700">{metric.value}/5</span>
//                       </div>
//                     </div>
//                   )
//                 ))}
//               </div>
//             </div>

//             {/* Footer Info */}
//             <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
//               <div className="flex items-center gap-1">
//                 <Calendar className="w-4 h-4" />
//                 <span>Reviewed {formatDate(review.createdAt)}</span>
//               </div>

//               <div className="flex items-center gap-4">
//                 {avgRating && (
//                   <div className="flex items-center gap-1">
//                     <Star className="w-4 h-4 text-yellow-400" />
//                     <span>{avgRating} Average</span>
//                   </div>
//                 )}
//                 {review.recommend && (
//                   <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-violet-50 to-purple-50">
//                     <ThumbsUp className="w-4 h-4 text-violet-500" />
//                     <span className="font-medium text-violet-700">{review.recommend}/10</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Column - CTA */}
//           <div className="flex-shrink-0 flex flex-col items-end justify-between">
//             <Link
//               href={`/products/${review.product?.id}`}
//               className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium shadow-lg shadow-violet-100 hover:shadow-xl hover:shadow-violet-200 transition-all duration-300 hover:-translate-y-0.5"
//             >
//               <span className="mr-2">View Product</span>
//               <ExternalLink className="w-4 h-4" />
//             </Link>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// const ReviewsPage = ({ userId }) => {
//   const [userReviews, setUserReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const fetchReviews = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch("/api/get-user-review", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId }),
//       });
//       const data = await response.json();
//       setUserReviews(data.userReviews);
//     } catch (error) {
//       console.error("Error fetching reviews:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchReviews();
//     }
//   }, [userId]);

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchReviews();
//     setTimeout(() => setIsRefreshing(false), 500);
//   };

//   const handleDelete = async (reviewId) => {
//     // Add delete logic here
//     console.log('Delete review:', reviewId);
//   };

//   return (
//     <div className="min-h-screen p-6 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-violet-50/20 shadow-md">
//       {/* Header */}
//       <div className="max-w-5xl mx-auto mb-8">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <div className="p-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg">
//               <Newspaper className="w-6 h-6" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
//               <p className="text-sm text-gray-600">
//                 {userReviews.length} product reviews
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <Link
//               href="/review/new"
//               className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
//             >
//               Write a Review
//             </Link>
//             <button
//               onClick={handleRefresh}
//               disabled={loading || isRefreshing}
//               className="p-2 text-gray-600 hover:text-violet-600 rounded-full hover:bg-violet-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <RefreshCw 
//                 className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : 'transform transition-transform hover:rotate-180 duration-500'}`} 
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Reviews List */}
//       <div className="max-w-5xl mx-auto space-y-4">
//         {loading ? (
//           // Loading skeleton
//           [...Array(3)].map((_, i) => (
//             <Card key={i} className="animate-pulse">
//               <CardContent className="p-6">
//                 <div className="flex gap-6">
//                   <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
//                   <div className="flex-1">
//                     <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
//                     <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
//                     <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
//                     <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))
//         ) : userReviews.length === 0 ? (
//           <Card className="border-dashed border-2">
//             <CardContent className="p-12 text-center">
//               <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center">
//                 <MessageSquare className="w-10 h-10 text-white" />
//               </div>
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 No reviews yet
//               </h3>
//               <p className="text-gray-500 mb-6">
//                 Share your experience with products you've used
//               </p>
//               <Link
//                 href="/review/new"
//                 className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
//               >
//                 Write Your First Review
//               </Link>
//             </CardContent>
//           </Card>
//         ) : (
//           userReviews.map((review) => (
//             <ReviewCard 
//               key={review.id} 
//               review={review}
//               onDelete={handleDelete}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReviewsPage;
import React, { useState, useEffect } from 'react';
import { Newspaper, RefreshCw, Edit, MessageSquare, ThumbsUp, Activity, Star, Calendar, Share2, Trash2, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const ReviewCard = ({ review, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Calculate average rating
  const ratings = [
    review.easeOfLearning,
    review.integration,
    review.roi,
    review.support
  ].filter(Boolean);
  
  const avgRating = ratings.length > 0 
    ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
    : null;

  return (
    <Card 
      className="group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Product Logo */}
          <div className="flex-shrink-0">
            <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 shadow-inner">
              {review.product?.logoUrl ? (
                <img
                  src={review.product.logoUrl}
                  alt={review.product.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-emerald-100">
                  <MessageSquare className="w-8 h-8 text-emerald-600" />
                </div>
              )}
              {avgRating && avgRating >= 4.5 && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 p-1 rounded-bl-xl">
                  <Star className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Review Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {review.product?.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {review.involvement?.map((role, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-800 border border-emerald-100"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className={`flex items-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <button className="p-2 text-gray-400 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <Link
                  href={`/review/edit?id=${review.id}`}
                  className="p-2 text-gray-400 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </Link>
                <button 
                  onClick={() => onDelete && onDelete(review.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Review Content */}
            <div className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                {review.bestThing}
              </p>
              
              {/* Rating Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Learning', value: review.easeOfLearning, icon: Activity },
                  { label: 'Integration', value: review.integration, icon: ThumbsUp },
                  { label: 'ROI', value: review.roi, icon: Activity },
                  { label: 'Support', value: review.support, icon: MessageSquare },
                ].map((metric, index) => (
                  metric.value && (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-emerald-50/50 to-teal-50/50">
                      <metric.icon className="w-4 h-4 text-emerald-500" />
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">{metric.label}</span>
                        <span className="font-semibold text-emerald-700">{metric.value}/5</span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Footer Info */}
            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Reviewed {formatDate(review.createdAt)}</span>
              </div>

              <div className="flex items-center gap-4">
                {avgRating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{avgRating} Average</span>
                  </div>
                )}
                {review.recommend && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50">
                    <ThumbsUp className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium text-emerald-700">{review.recommend}/10</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - CTA */}
          <div className="flex-shrink-0 flex flex-col items-end justify-between">
            <Link
              href={`/products/${review.product?.id}`}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium shadow-lg shadow-emerald-100 hover:shadow-xl hover:shadow-emerald-200 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="mr-2">View Product</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ReviewsPage = ({ userId }) => {
  const [userReviews, setUserReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get-user-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      setUserReviews(data.userReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchReviews();
    }
  }, [userId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchReviews();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleDelete = async (reviewId) => {
    // Add delete logic here
    console.log('Delete review:', reviewId);
  };

  return (
    <div className="min-h-screen p-6 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-emerald-50/20 shadow-md">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
              <Newspaper className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
              <p className="text-sm text-gray-600">
                {userReviews.length} product reviews
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/review/new"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              Write a Review
            </Link>
            <button
              onClick={handleRefresh}
              disabled={loading || isRefreshing}
              className="p-2 text-gray-600 hover:text-emerald-600 rounded-full hover:bg-emerald-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw 
                className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : 'transform transition-transform hover:rotate-180 duration-500'}`} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="max-w-5xl mx-auto space-y-4">
        {loading ? (
          // Loading skeleton
          [...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : userReviews.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-500 mb-6">
                Share your experience with products you've used
              </p>
              <Link
                href="/review/new"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                Write Your First Review
              </Link>
            </CardContent>
          </Card>
        ) : (
          userReviews.map((review) => (
            <ReviewCard 
              key={review.id} 
              review={review}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;