"use client";
// import React, { useEffect, useState } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { Rating } from "@mui/material";
// import { useSearchParams } from "next/navigation";

//  // Adjust the import based on your Rating component's location
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // You can use these icons or any other icons you prefer


// function VendorReview() {
//   const userId = localStorage.getItem("vendorId");
//   const [reviewsData, setReviewsData] = useState<any[]>([]);
//   const [overallRating, setOverallRating] = useState<number>(0);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const searchParams = useSearchParams();
//   // @ts-ignore
//   const verify = searchParams.get('verified') ? true : false;

//   useEffect(() => {
//     async function fetchReviews() {
//       try {
//         const response = await fetch("/api/vendor-reviews", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ userId }),
//         });

//         const data = await response.json();
//         console.log(data);

//         if (data.success) {
//           setReviewsData(data.products);
//           setOverallRating(data.overallRating);
//         } else {
//           setError(data.msg);
//         }
//       } catch (err) {
//         console.error("Failed to fetch reviews:", err);
//         setError("Failed to fetch reviews");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchReviews();
//   }, [userId]);

//   if(verify){
//     return(
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 text-center">Please complete your profile</h1>
//        <center> <span className="text-sm text-slate-500 text-center">You need to complete your profile, By clicking on profile</span></center>
//       </div>
//     )
//   }

 

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if( !reviewsData  || reviewsData.length === 0) {
//     return <div>No reviews found</div>;

//   }

  
    
  
//   return (
//     <div>
//       <div className="border rounded-md px-5 py-4">
//         {/* Map over products and display reviews for each */}
//         {reviewsData.map((product) => (
//           <div key={product.id}>
//             <h2 className="text-lg font-bold text-gray-600 italic">{product.name}</h2>
//             {product.reviews.map((review: any) => (
//               <ReviewCard
//                 key={review.id}
//                 review={review}
//                 overallRating={overallRating}
//                 productName={product.name} // Pass the product name to ReviewCard
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function ReviewCard({ review, overallRating, productName }: any) {
//   const [isCollapsed, setIsCollapsed] = useState(true);
  
//     const handleToggle = () => {
//       setIsCollapsed(!isCollapsed);
//     };
//   return (
//     <div className="my-2 bg-[#f8f8fb] p-3 rounded-[10px]">
//       <div className=" flex flex-col justify-between md:flex-row md:justify-between gap-4">
//       <div className="flex gap-4">
//           <Avatar>
//             <AvatarImage src={review.user.image} />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//           <h3 className="text-sm text-gray-900 font-bold mt-2">{review.user.name}</h3>
//       </div>
       

//        <div  className="flex gap-4">
//          <div className="flex gap-2">
//               <p>Overall Rating:</p>
//               <Rating value={overallRating} precision={0.5} readOnly />

//           </div>
//         <button
//           onClick={handleToggle}
//           className="ml-auto flex items-center text-gray-600 hover:text-gray-900"
//         >
//           {isCollapsed ? <FaChevronDown /> : <FaChevronUp />}
//         </button>
//        </div>
       
//       </div>

//       {!isCollapsed && (
//         <>
//           <hr className="mt-3" />
//           <div className="flex flex-col gap-2">
//             <div className="text-base text-slate-600 mt-3">
//               <p className="text-lg text-black font-semibold">What did they like the best about the product:</p>
//               <p>{review.bestThing}</p>
//             </div>
//             <hr />
//             <div className="text-base text-slate-600 mt-3">
//               <p className="text-lg text-black font-semibold">What did they not like about the product?</p>
//               <p>{review.worstThing}</p>
//             </div>
//             <hr />
//             <div className="text-base text-slate-600 mt-3">
//               <p className="text-lg text-black font-semibold">How likely are they to recommend this product to someone?</p>
//               <p>{review.recommend}</p>
//             </div>
//             <hr />
//             <div className="text-base text-slate-600 mt-3">
//               <p className="text-lg text-black font-semibold">Would they be available for someone for reference?</p>
//               <p>{review.reference}</p>
//             </div>
//             <hr />
//             <div className="text-base text-slate-600 mt-3">
//               <p className="text-lg text-black font-semibold">Document attached to verify that they are a genuine user of the product.</p>
//               <p>{review.uploadedFile}</p>
//             </div>

//             <hr />
//             <div className="flex flex-col space-y-4 mt-4">
//               <p className="font-bold text-xl">Overall experience</p>
//               <p>Ease of learning</p>
//               <Rating name="ease-of-learning-rating" value={review.easeOfLearning} precision={0.5} readOnly />

//               <p>Integration with existing workflow</p>
//               <Rating name="integration-rating" value={review.integration} precision={0.5} readOnly />

//               <p>Support and service</p>
//               <Rating name="support-rating" value={review.support} precision={0.5} readOnly />

//               <p>Return on Investment</p>
//               <Rating name="roi-rating" value={review.roi} precision={0.5} readOnly />
//             </div>

//             <hr className="mt-3" />
//             <div className="flex flex-col space-y-4 mt-4">
//               <p className="font-bold text-xl">Features</p>
//               {review.functionality.map((feature) => (
//                 <div key={feature.category}>
//                   <p>{feature.category}</p>
//                   <Rating value={feature.rating} precision={0.5} />
//                 </div>
//               ))}
//             </div>

//             <hr className="mt-3" />
//             <div className="flex flex-col space-y-4 mt-4">
//               <p className="font-bold text-xl">Process Lifecycle</p>
//               {review.processStep.map((lifecycle) => {
//                 const extractedCategory = lifecycle.category.split("Document Management System Software - ")[1];
//                 return (
//                   <div key={lifecycle.category}>
//                     <h4>{extractedCategory}</h4>
//                     <Rating name={extractedCategory} value={lifecycle.rating} precision={0.5} />
//                   </div>
//                 );
//               })}
//             </div>

//             <hr className="mt-3" />
//             <div className="flex flex-col md:flex-col items-center gap-2">
//               <p>Overall Rating:</p>
//               <Rating value={overallRating} precision={0.5} readOnly />
//             </div>
//           </div>
//         </>
//         )}
//     </div>
//     )}

 
// export default VendorReview;
// import React, { useEffect, useState } from "react";
// import { 
//   Star,
//   ThumbsUp,
//   MessageSquare,
//   Activity,
//   ChevronDown,
//   ChevronUp,
//   RefreshCw,
//   FileText,
//   Verified,
//   AlertCircle
// } from "lucide-react";

// const RatingDisplay = ({ value, precision = 0.5, size = "md" }) => {
//   const totalStars = 5;
//   const filledStars = Math.floor(value);
//   const hasHalfStar = value % 1 >= precision;
  
//   const sizeClasses = {
//     sm: "w-4 h-4",
//     md: "w-5 h-5",
//     lg: "w-6 h-6"
//   };

//   return (
//     <div className="flex items-center gap-1">
//       {[...Array(totalStars)].map((_, index) => (
//         <Star
//           key={index}
//           className={`${sizeClasses[size]} ${
//             index < filledStars
//               ? "text-yellow-400 fill-yellow-400"
//               : index === filledStars && hasHalfStar
//               ? "text-yellow-400 fill-yellow-400/50"
//               : "text-gray-300"
//           }`}
//         />
//       ))}
//       <span className="ml-2 text-sm font-medium text-gray-600">{value.toFixed(1)}</span>
//     </div>
//   );
// };

// const ReviewCard = ({ review, overallRating, productName }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const ratingCategories = [
//     { label: "Ease of Learning", value: review.easeOfLearning, icon: Activity },
//     { label: "Integration", value: review.integration, icon: ThumbsUp },
//     { label: "Support", value: review.support, icon: MessageSquare },
//     { label: "ROI", value: review.roi, icon: Activity }
//   ];

//   return (
//     <div 
//       className={`my-4 rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 ${
//         isHovered ? "shadow-md" : ""
//       }`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="p-6">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
//                 {review.user.image ? (
//                   <img
//                     src={review.user.image}
//                     alt={review.user.name}
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-xl font-semibold text-indigo-600">
//                     {review.user.name?.charAt(0)}
//                   </span>
//                 )}
//               </div>
//               {review.verified && (
//                 <div className="absolute -bottom-1 -right-1 bg-indigo-500 rounded-full p-1">
//                   <Verified className="w-3 h-3 text-white" />
//                 </div>
//               )}
//             </div>
//             <div>
//               <h3 className="font-semibold text-gray-900">{review.user.name}</h3>
//               <p className="text-sm text-gray-500">Verified Reviewer</p>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <RatingDisplay value={overallRating} size="lg" />
//             </div>
//             <button
//               onClick={() => setIsExpanded(!isExpanded)}
//               className={`p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors ${
//                 isExpanded ? "rotate-180" : ""
//               }`}
//             >
//               <ChevronDown className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         {/* Quick Metrics */}
//         <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//           {ratingCategories.map(({ label, value, icon: Icon }) => (
//             <div
//               key={label}
//               className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-indigo-50/20 border border-gray-100"
//             >
//               <div className="flex items-center gap-2 mb-2">
//                 <Icon className="w-4 h-4 text-indigo-600" />
//                 <span className="text-sm font-medium text-gray-600">{label}</span>
//               </div>
//               <RatingDisplay value={value} size="sm" />
//             </div>
//           ))}
//         </div>

//         {/* Expanded Content */}
//         {isExpanded && (
//           <div className="mt-6 space-y-6">
//             {/* Best Things */}
//             <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50/20">
//               <h4 className="text-lg font-semibold text-gray-900 mb-3">
//                 What They Loved
//               </h4>
//               <p className="text-gray-700 leading-relaxed">{review.bestThing}</p>
//             </div>

//             {/* Areas for Improvement */}
//             <div className="p-6 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50/20">
//               <h4 className="text-lg font-semibold text-gray-900 mb-3">
//                 Areas for Improvement
//               </h4>
//               <p className="text-gray-700 leading-relaxed">{review.worstThing}</p>
//             </div>

//             {/* Features Ratings */}
//             <div className="space-y-4">
//               <h4 className="text-lg font-semibold text-gray-900">Features</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {review.functionality.map((feature) => (
//                   <div
//                     key={feature.category}
//                     className="p-4 rounded-xl bg-white border border-gray-100 hover:border-indigo-200 transition-colors"
//                   >
//                     <p className="text-sm font-medium text-gray-700 mb-2">
//                       {feature.category}
//                     </p>
//                     <RatingDisplay value={feature.rating} />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Process Lifecycle */}
//             <div className="space-y-4">
//               <h4 className="text-lg font-semibold text-gray-900">Process Lifecycle</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {review.processStep.map((step) => {
//                   const category = step.category.split("Document Management System Software - ")[1];
//                   return (
//                     <div
//                       key={step.category}
//                       className="p-4 rounded-xl bg-white border border-gray-100 hover:border-indigo-200 transition-colors"
//                     >
//                       <p className="text-sm font-medium text-gray-700 mb-2">
//                         {category}
//                       </p>
//                       <RatingDisplay value={step.rating} />
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Additional Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50/20">
//                 <h4 className="text-sm font-medium text-gray-900 mb-2">
//                   Likelihood to Recommend
//                 </h4>
//                 <div className="flex items-center gap-2">
//                   <ThumbsUp className="w-5 h-5 text-indigo-600" />
//                   <span className="text-lg font-semibold text-gray-900">
//                     {review.recommend}/10
//                   </span>
//                 </div>
//               </div>

//               <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50/20">
//                 <h4 className="text-sm font-medium text-gray-900 mb-2">
//                   Reference Availability
//                 </h4>
//                 <p className="text-gray-700">{review.reference}</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const VendorReview = () => {
//   const [reviewsData, setReviewsData] = useState([]);
//   const [overallRating, setOverallRating] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const fetchReviews = async () => {
//     try {
//       const userId = localStorage.getItem("vendorId");
//       const response = await fetch("/api/vendor-reviews", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId }),
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         setReviewsData(data.products);
//         setOverallRating(data.overallRating);
//       } else {
//         setError(data.msg);
//       }
//     } catch (err) {
//       console.error("Failed to fetch reviews:", err);
//       setError("Failed to fetch reviews");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchReviews();
//     setTimeout(() => setIsRefreshing(false), 500);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mb-4"></div>
//           <p className="text-gray-600">Loading reviews...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
//           <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Reviews</h3>
//           <p className="text-gray-600">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!reviewsData || reviewsData.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center max-w-md mx-auto">
//           <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-xl font-medium text-gray-900 mb-2">No Reviews Yet</h3>
//           <p className="text-gray-600 mb-6">
//             Start collecting reviews from your customers to build trust and credibility.
//           </p>
//           <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
//             Get Started
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Product Reviews</h1>
//             <p className="text-gray-600">
//               {reviewsData.reduce((total, product) => total + product.reviews.length, 0)} reviews across {reviewsData.length} products
//             </p>
//           </div>
//           <button
//             onClick={handleRefresh}
//             disabled={loading || isRefreshing}
//             className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <RefreshCw 
//               className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} 
//             />
//           </button>
//         </div>

//         {/* Reviews List */}
//         <div className="space-y-8">
//           {reviewsData.map((product) => (
//             <div key={product.id} className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                   {product.name}
//                 </h2>
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm text-gray-600">
//                     {product.reviews.length} reviews
//                   </span>
//                 </div>
//               </div>
//               {product.reviews.map((review) => (
//                 <ReviewCard
//                   key={review.id}
//                   review={review}
//                   overallRating={overallRating}
//                   productName={product.name}
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorReview;

// import React, { useState, useEffect } from "react";
// import { 
//   Star,
//   ThumbsUp,
//   MessageSquare, 
//   Activity,
//   RefreshCw,
//   ChevronDown,
//   ChevronUp,
//   Building2,
//   Sparkles,
//   Clock,
//   FileText,
//   Shield,
//   Medal,
//   BadgeCheck
// } from "lucide-react";

// // Custom Star Rating Component with fluid animations
// const StarRating = ({ value, size = "md", showValue = true }) => {
//   const starSizes = {
//     sm: "w-4 h-4",
//     md: "w-5 h-5",
//     lg: "w-6 h-6"
//   };

//   return (
//     <div className="flex items-center gap-1.5 group">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <div 
//           key={star}
//           className="relative"
//         >
//           <Star 
//             className={`${starSizes[size]} ${
//               star <= value 
//                 ? "text-amber-400 fill-amber-400" 
//                 : "text-gray-200"
//             } transition-all duration-300 group-hover:scale-105`}
//           />
//           <div className={`absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 
//             opacity-0 blur transition-all duration-300 group-hover:opacity-20`} />
//         </div>
//       ))}
//       {showValue && (
//         <span className="ml-2 font-semibold bg-gradient-to-r from-amber-500 to-orange-500 
//           bg-clip-text text-transparent">
//           {value.toFixed(1)}
//         </span>
//       )}
//     </div>
//   );
// };

// // Review Card Component
// const ReviewCard = ({ review }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   const metrics = [
//     { label: "Ease of Use", value: review.easeOfLearning, icon: Activity },
//     { label: "Integration", value: review.integration, icon: Building2 },
//     { label: "Support", value: review.support, icon: MessageSquare },
//     { label: "ROI", value: review.roi, icon: ThumbsUp }
//   ];

//   return (
//     <div 
//       className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
//         isHovered ? "shadow-xl" : "shadow-md"
//       }`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Animated gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50" />
//       <div className={`absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 
//         to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 
//         blur-2xl transform group-hover:scale-105`} />

//       <div className="relative p-6 space-y-6">
//         {/* Header */}
//         <div className="flex items-start justify-between">
//           <div className="flex gap-4">
//             {/* User Avatar */}
//             <div className="relative group">
//               <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 
//                 p-1 transform transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
//                 <div className="w-full h-full rounded-lg overflow-hidden">
//                   {review.user.image ? (
//                     <img 
//                       src={review.user.image} 
//                       alt={review.user.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 
//                       flex items-center justify-center">
//                       <span className="text-xl font-bold text-indigo-600">
//                         {review.user.name?.[0]}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               {review.verified && (
//                 <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-green-400 to-emerald-500 
//                   rounded-full p-1.5 shadow-lg">
//                   <BadgeCheck className="w-3 h-3 text-white" />
//                 </div>
//               )}
//             </div>

//             {/* User Info */}
//             <div>
//               <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//                 {review.user.name}
//                 {review.recommend >= 8 && (
//                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
//                     bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border border-amber-100">
//                     <Medal className="w-3 h-3 mr-1" />
//                     Top Reviewer
//                   </span>
//                 )}
//               </h3>
//               <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
//                 <Clock className="w-4 h-4" />
//                 <span>{new Date(review.createdAt).toLocaleDateString()}</span>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className={`p-2 text-gray-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 
//               transition-all duration-300 ${isExpanded ? "rotate-180" : ""}`}
//           >
//             <ChevronDown className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Quick Metrics */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {metrics.map(({ label, value, icon: Icon }) => (
//             <div 
//               key={label}
//               className="relative group overflow-hidden rounded-xl border border-gray-100 
//                 bg-gradient-to-br from-white to-gray-50 p-4 transition-all duration-300 
//                 hover:shadow-md hover:-translate-y-0.5"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 
//                 opacity-0 group-hover:opacity-100 transition-all duration-300" />
//               <div className="relative">
//                 <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600">
//                   <Icon className="w-4 h-4 text-indigo-500" />
//                   {label}
//                 </div>
//                 <StarRating value={value} size="sm" />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Expanded Content */}
//         {isExpanded && (
//           <div className="space-y-6 pt-4">
//             {/* Best Things */}
//             <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/50 relative overflow-hidden group">
//               <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 
//                 opacity-0 group-hover:opacity-100 transition-all duration-500" />
//               <div className="relative">
//                 <h4 className="flex items-center gap-2 text-lg font-semibold text-emerald-800 mb-3">
//                   <Sparkles className="w-5 h-5" />
//                   Highlights
//                 </h4>
//                 <p className="text-emerald-700 leading-relaxed">{review.bestThing}</p>
//               </div>
//             </div>

//             {/* Areas for Improvement */}
//             <div className="p-6 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50/50 relative overflow-hidden group">
//               <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5 
//                 opacity-0 group-hover:opacity-100 transition-all duration-500" />
//               <div className="relative">
//                 <h4 className="flex items-center gap-2 text-lg font-semibold text-amber-800 mb-3">
//                   <Shield className="w-5 h-5" />
//                   Areas for Growth
//                 </h4>
//                 <p className="text-amber-700 leading-relaxed">{review.worstThing}</p>
//               </div>
//             </div>

//             {/* Feature Ratings */}
//             {review.functionality?.length > 0 && (
//               <div className="space-y-4">
//                 <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-indigo-500" />
//                   Feature Ratings
//                 </h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {review.functionality.map((feature) => (
//                     <div 
//                       key={feature.category}
//                       className="p-4 rounded-xl border border-gray-100 bg-white transition-all duration-300 
//                         hover:shadow-md hover:-translate-y-0.5"
//                     >
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-sm font-medium text-gray-700">
//                           {feature.category}
//                         </span>
//                         <StarRating value={feature.rating} size="sm" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Additional Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 
//                   opacity-0 group-hover:opacity-100 transition-all duration-500" />
//                 <div className="relative">
//                   <h4 className="text-sm font-medium text-gray-900 mb-2">
//                     Recommendation Score
//                   </h4>
//                   <div className="flex items-center gap-2">
//                     <ThumbsUp className={`w-5 h-5 ${
//                       review.recommend >= 8 ? 'text-green-500' : 
//                       review.recommend >= 5 ? 'text-amber-500' : 'text-red-500'
//                     }`} />
//                     <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
//                       bg-clip-text text-transparent">
//                       {review.recommend}/10
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden group">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 
//                   opacity-0 group-hover:opacity-100 transition-all duration-500" />
//                 <div className="relative">
//                   <h4 className="text-sm font-medium text-gray-900 mb-2">
//                     Reference Availability
//                   </h4>
//                   <p className="text-gray-700">{review.reference}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Main Component
// const VendorReview = () => {
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   const fetchReviews = async () => {
//     try {
//       const userId = localStorage.getItem("vendorId");
//       const response = await fetch("/api/vendor-reviews", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setReviews(data.products);
//       } else {
//         setError(data.msg);
//       }
//     } catch (err) {
//       setError("Failed to fetch reviews");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const handleRefresh = async () => {
//     setIsRefreshing(true);
//     await fetchReviews();
//     setTimeout(() => setIsRefreshing(false), 500);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
//         <div className="text-center space-y-4">
//           <div className="relative">
//             <div className="w-16 h-16 rounded-full border-4 border-indigo-100 animate-pulse" />
//             <div className="absolute inset-0 w-16 h-16 rounded-full border-t-4 border-indigo-500 animate-spin" />
//           </div>
//           <p className="text-gray-600">Loading reviews...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
//         <div className="text-center space-y-4 max-w-md mx-auto p-6">
//           <div className="w-16 h-16 mx-auto text-red-500">
//             <Shield className="w-full h-full" />
//           </div>
//           <h3 className="text-xl font-semibold text-gray-900">Error Loading Reviews</h3>
//           <p className="text-gray-600">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!reviews || reviews.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
//         <div className="text-center max-w-xl mx-auto p-8">
//           <div className="relative mb-6">
//             <div className="w-24 h-24 mx-auto bg-gradient-to-r from-indigo-50 to-purple-50 
//               rounded-2xl flex items-center justify-center transform transition-transform duration-500 hover:scale-110">
//               <FileText className="w-12 h-12 text-indigo-500" />
//             </div>
//             <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 
//               blur-xl opacity-50 rounded-full" />
//           </div>
//           <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
//             bg-clip-text text-transparent mb-4">
//             No Reviews Yet
//           </h3>
//           <p className="text-gray-600 mb-8 leading-relaxed">
//             Start collecting reviews from your customers to build trust and showcase your product's value.
//             Reviews help potential customers make informed decisions.
//           </p>
//           <button className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r 
//             from-indigo-500 to-purple-500 text-white font-semibold shadow-lg 
//             hover:shadow-xl transform transition-all duration-300 hover:-translate-y-0.5">
//             <Sparkles className="w-5 h-5 mr-2" />
//             Get Started with Reviews
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6 md:p-8">
//       <div className="max-w-6xl mx-auto space-y-8">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6 
//           bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
//           {/* Background Effects */}
//           <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-50" />
//           <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
//           <div className="relative flex items-center gap-4">
//             <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
//               text-white shadow-lg transform transition-transform duration-300 hover:scale-110">
//               <Star className="w-6 h-6" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
//                 bg-clip-text text-transparent">
//                 Product Reviews
//               </h1>
//               <div className="text-gray-600 flex items-center gap-2">
//                 <span className="flex items-center gap-1">
//                   <FileText className="w-4 h-4" />
//                   {reviews.reduce((total, product) => total + product.reviews.length, 0)} total reviews
//                 </span>
//                 <span className="text-gray-300">•</span>
//                 <span className="flex items-center gap-1">
//                   <Building2 className="w-4 h-4" />
//                   {reviews.length} products
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <button
//                 onClick={handleRefresh}
//                 disabled={loading || isRefreshing}
//                 className="p-3 rounded-xl bg-white border border-gray-100 text-gray-600 
//                   hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 
//                   shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 
//                   disabled:cursor-not-allowed transform hover:scale-105"
//               >
//                 <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
//               </button>
//               <div className="absolute inset-0 bg-indigo-500/10 blur-xl opacity-0 
//                 hover:opacity-100 transition-opacity duration-300" />
//             </div>
//           </div>
//         </div>

//         {/* Reviews Grid */}
//         <div className="grid gap-6">
//           {reviews.map((product) => (
//             <div key={product.id} className="space-y-6">
//               {/* Product Header */}
//               <div className="flex items-center gap-4 pl-4">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 
//                   p-2 shadow-sm">
//                   {product.logoUrl ? (
//                     <img
//                       src={product.logoUrl}
//                       alt={product.name}
//                       className="w-full h-full object-contain rounded-lg"
//                     />
//                   ) : (
//                     <Building2 className="w-full h-full text-indigo-500" />
//                   )}
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 
//                     bg-clip-text text-transparent">
//                     {product.name}
//                   </h2>
//                   <p className="text-sm text-gray-500">
//                     {product.reviews.length} {product.reviews.length === 1 ? "review" : "reviews"}
//                   </p>
//                 </div>
//               </div>

//               {/* Reviews List */}
//               <div className="space-y-4">
//                 {product.reviews.map((review) => (
//                   <ReviewCard key={review.id} review={review} />
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorReview;

// // Add this CSS to your stylesheet for the grid pattern
// const style = document.createElement('style');
// style.textContent = `
//   .bg-grid-pattern {
//     background-image: linear-gradient(to right, rgb(226 232 240 / 0.1) 1px, transparent 1px),
//                       linear-gradient(to bottom, rgb(226 232 240 / 0.1) 1px, transparent 1px);
//     background-size: 24px 24px;
//   }
// `;
// document.head.appendChild(style);
// import React, { useEffect, useState } from "react";
// import { 
//   Star,
//   ThumbsUp,
//   MessageSquare, 
//   Activity,
//   ChevronDown,
//   Building2,
//   Sparkles,
//   Clock,
//   Shield,
//   Medal,
//   BadgeCheck,
//   ArrowRight
// } from "lucide-react";

// // Star Rating Component
// const StarRating = ({ value, size = "md", showValue = true }) => {
//   const starSizes = {
//     sm: "w-4 h-4",
//     md: "w-5 h-5",
//     lg: "w-6 h-6"
//   };

//   return (
//     <div className="flex items-center gap-1.5">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <Star 
//           key={star}
//           className={`${starSizes[size]} ${
//             star <= value 
//               ? "text-amber-400 fill-amber-400" 
//               : "text-gray-200"
//           } transition-all duration-300`}
//         />
//       ))}
//       {showValue && (
//         <span className="ml-2 font-semibold text-amber-500">
//           {value.toFixed(1)}
//         </span>
//       )}
//     </div>
//   );
// };

// // Badge Component
// const Badge = ({ children, color }) => (
//   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
//     ${color === 'amber' ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/10' : 
//     color === 'emerald' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10' :
//     'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/10'}`}>
//     {children}
//   </span>
// );

// // Metric Card Component
// const MetricCard = ({ label, value, icon: Icon }) => (
//   <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
//     <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
//       <Icon className="w-4 h-4 text-indigo-500" />
//       {label}
//     </div>
//     <StarRating value={value} size="sm" />
//   </div>
// );

// // Feature Section Component
// const FeatureSection = ({ icon: Icon, title, children, variant = "default" }) => {
//   const variants = {
//     default: "bg-white ring-1 ring-gray-100",
//     highlight: "bg-gradient-to-br from-emerald-50 to-teal-50 ring-1 ring-emerald-100",
//     growth: "bg-gradient-to-br from-amber-50 to-orange-50 ring-1 ring-amber-100"
//   };

//   const textColors = {
//     default: "text-gray-900",
//     highlight: "text-emerald-900",
//     growth: "text-amber-900"
//   };

//   return (
//     <div className={`rounded-xl ${variants[variant]} p-6 shadow-sm`}>
//       <h4 className={`flex items-center gap-2 text-lg font-semibold ${textColors[variant]} mb-3`}>
//         <Icon className="w-5 h-5" />
//         {title}
//       </h4>
//       <div className={variant === 'default' ? 'text-gray-600' : 
//         variant === 'highlight' ? 'text-emerald-700' : 'text-amber-700'}>
//         {children}
//       </div>
//     </div>
//   );
// };

// // Review Card Component
// const ReviewCard = ({ review }) => {
//   const [isExpanded, setIsExpanded] = useState(false);

 

//   const [reviews, setReviews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isRefreshing, setIsRefreshing] = useState(false);
  
//     const fetchReviews = async () => {
//       try {
//         const userId = localStorage.getItem("vendorId");
//         const response = await fetch("/api/vendor-reviews", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId }),
//         });
  
//         const data = await response.json();
//         if (data.success) {
//           setReviews(data.products);
//         } else {
//           setError(data.msg);
//         }
//       } catch (err) {
//         setError("Failed to fetch reviews");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     useEffect(() => {
//       fetchReviews();
//     }, []);
  
//     const handleRefresh = async () => {
//       setIsRefreshing(true);
//       await fetchReviews();
//       setTimeout(() => setIsRefreshing(false), 500);
//     };
  
//     if (loading) {
//       return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
//           <div className="text-center space-y-4">
//             <div className="relative">
//               <div className="w-16 h-16 rounded-full border-4 border-indigo-100 animate-pulse" />
//               <div className="absolute inset-0 w-16 h-16 rounded-full border-t-4 border-indigo-500 animate-spin" />
//             </div>
//             <p className="text-gray-600">Loading reviews...</p>
//           </div>
//         </div>
//       );
//     }
//     const metrics = [
//       { label: "Ease of Use", value: review.easeOfLearning, icon: Activity },
//       { label: "Integration", value: review.integration, icon: Building2 },
//       { label: "Support", value: review.support, icon: MessageSquare },
//       { label: "ROI", value: review.roi, icon: ThumbsUp }
//     ];
  
//     if (error) {
//       return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
//           <div className="text-center space-y-4 max-w-md mx-auto p-6">
//             <div className="w-16 h-16 mx-auto text-red-500">
//               <Shield className="w-full h-full" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900">Error Loading Reviews</h3>
//             <p className="text-gray-600">{error}</p>
//           </div>
//         </div>
//       );
//     }
  
//     if (!reviews || reviews.length === 0) {
//       return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
//           <div className="text-center max-w-xl mx-auto p-8">
//             <div className="relative mb-6">
//               <div className="w-24 h-24 mx-auto bg-gradient-to-r from-indigo-50 to-purple-50 
//                 rounded-2xl flex items-center justify-center transform transition-transform duration-500 hover:scale-110">
//                 <FileText className="w-12 h-12 text-indigo-500" />
//               </div>
//               <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 
//                 blur-xl opacity-50 rounded-full" />
//             </div>
//             <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
//               bg-clip-text text-transparent mb-4">
//               No Reviews Yet
//             </h3>
//             <p className="text-gray-600 mb-8 leading-relaxed">
//               Start collecting reviews from your customers to build trust and showcase your product's value.
//               Reviews help potential customers make informed decisions.
//             </p>
//             <button className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r 
//               from-indigo-500 to-purple-500 text-white font-semibold shadow-lg 
//               hover:shadow-xl transform transition-all duration-300 hover:-translate-y-0.5">
//               <Sparkles className="w-5 h-5 mr-2" />
//               Get Started with Reviews
//             </button>
//           </div>
//         </div>
//       );
//     }
  

//   return (
//     <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
//       <div className="p-6 space-y-6">
//         {/* Header */}
//         <div className="flex items-start justify-between">
//           <div className="flex gap-4">
//             {/* Avatar */}
//             <div className="relative">
//               <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 
//                 p-1 shadow-sm ring-1 ring-indigo-100">
//                 <div className="w-full h-full rounded-lg overflow-hidden">
//                   {review.user.image ? (
//                     <img 
//                       src={review.user.image} 
//                       alt={review.user.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 
//                       flex items-center justify-center">
//                       <span className="text-xl font-bold text-indigo-600">
//                         {review.user.name?.[0]}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               {review.verified && (
//                 <div className="absolute -bottom-1 -right-1 rounded-full bg-emerald-500 p-1.5 
//                   ring-2 ring-white">
//                   <BadgeCheck className="w-3 h-3 text-white" />
//                 </div>
//               )}
//             </div>

//             {/* User Info */}
//             <div>
//               <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//                 {review.user.name}
//                 {review.recommend >= 8 && (
//                   <Badge color="amber">
//                     <Medal className="w-3 h-3 mr-1" />
//                     Top Reviewer
//                   </Badge>
//                 )}
//               </h3>
//               <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
//                 <Clock className="w-4 h-4" />
//                 <span>{new Date(review.createdAt).toLocaleDateString()}</span>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg 
//               transition-transform duration-300"
//             aria-label={isExpanded ? "Show less" : "Show more"}
//           >
//             <ChevronDown className={`w-5 h-5 transform transition-transform duration-300
//               ${isExpanded ? "rotate-180" : ""}`} />
//           </button>
//         </div>

//         {/* Quick Metrics */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {metrics.map((metric) => (
//             <MetricCard key={metric.label} {...metric} />
//           ))}
//         </div>

//         {/* Expanded Content */}
//         {isExpanded && (
//           <div className="space-y-6 pt-4">
//             <FeatureSection 
//               icon={Sparkles}
//               title="Highlights"
//               variant="highlight"
//             >
//               {review.bestThing}
//             </FeatureSection>

//             <FeatureSection 
//               icon={Shield}
//               title="Areas for Growth"
//               variant="growth"
//             >
//               {review.worstThing}
//             </FeatureSection>

//             {/* Features Grid */}
//             {review.functionality?.length > 0 && (
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Sparkles className="w-5 h-5 text-indigo-500" />
//                     Feature Ratings
//                   </h4>
//                   <Badge>
//                     {review.functionality.length} Features
//                   </Badge>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {review.functionality.map((feature) => (
//                     <div key={feature.category} 
//                       className="flex items-center justify-between p-4 rounded-xl 
//                         bg-white shadow-sm ring-1 ring-gray-100">
//                       <span className="text-sm font-medium text-gray-700">
//                         {feature.category}
//                       </span>
//                       <div className="flex items-center gap-3">
//                         <StarRating value={feature.rating} size="sm" />
//                         <ArrowRight className="w-4 h-4 text-gray-400" />
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Additional Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 
//                 p-4 ring-1 ring-indigo-100">
//                 <h4 className="text-sm font-medium text-gray-900 mb-2">
//                   Recommendation Score
//                 </h4>
//                 <div className="flex items-center gap-2">
//                   <ThumbsUp className={`w-5 h-5 ${
//                     review.recommend >= 8 ? 'text-emerald-500' : 
//                     review.recommend >= 5 ? 'text-amber-500' : 'text-red-500'
//                   }`} />
//                   <span className="text-2xl font-bold text-indigo-600">
//                     {review.recommend}/10
//                   </span>
//                 </div>
//               </div>

//               <div className="rounded-xl bg-white p-4 ring-1 ring-gray-100">
//                 <h4 className="text-sm font-medium text-gray-900 mb-2">
//                   Reference Availability
//                 </h4>
//                 <p className="text-gray-600">{review.reference}</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReviewCard;
import React, { useState, useEffect } from "react";
import { 
  Star,
  ThumbsUp,
  MessageSquare, 
  Activity,
  RefreshCw,
  ChevronDown,
  Building2,
  Sparkles,
  Clock,
  Shield,
  Medal,
  BadgeCheck,
  ArrowRight,
  FileText
} from "lucide-react";
import { useAuth } from '@/context/authContext';
// Star Rating Component
const StarRating = ({ value, size = "md", showValue = true }) => {
  const starSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6"
  };

  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star}
          className={`${starSizes[size]} ${
            star <= value 
              ? "text-amber-400 fill-amber-400" 
              : "text-gray-200"
          } transition-all duration-300`}
        />
      ))}
      {showValue && (
        <span className="ml-2 font-semibold text-amber-500">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};

// Badge Component
const Badge = ({ children, color }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
    ${color === 'amber' ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/10' : 
    color === 'emerald' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10' :
    'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/10'}`}>
    {children}
  </span>
);

// Metric Card Component
const MetricCard = ({ label, value, icon: Icon }) => (
  <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
    <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
      <Icon className="w-4 h-4 text-indigo-500" />
      {label}
    </div>
    <StarRating value={value} size="sm" />
  </div>
);

// Feature Section Component
const FeatureSection = ({ icon: Icon, title, children, variant = "default" }) => {
  const variants = {
    default: "bg-white ring-1 ring-gray-100",
    highlight: "bg-gradient-to-br from-emerald-50 to-teal-50 ring-1 ring-emerald-100",
    growth: "bg-gradient-to-br from-amber-50 to-orange-50 ring-1 ring-amber-100"
  };

  const textColors = {
    default: "text-gray-900",
    highlight: "text-emerald-900",
    growth: "text-amber-900"
  };

  return (
    <div className={`rounded-xl ${variants[variant]} p-6 shadow-sm`}>
      <h4 className={`flex items-center gap-2 text-lg font-semibold ${textColors[variant]} mb-3`}>
        <Icon className="w-5 h-5" />
        {title}
      </h4>
      <div className={variant === 'default' ? 'text-gray-600' : 
        variant === 'highlight' ? 'text-emerald-700' : 'text-amber-700'}>
        {children}
      </div>
    </div>
  );
};

// Review Card Component
const ReviewCard = ({ review }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const metrics = [
    { label: "Ease of Use", value: review?.easeOfLearning || 0, icon: Activity },
    { label: "Integration", value: review?.integration || 0, icon: Building2 },
    { label: "Support", value: review?.support || 0, icon: MessageSquare },
    { label: "ROI", value: review?.roi || 0, icon: ThumbsUp }
  ];

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 
                p-1 shadow-sm ring-1 ring-indigo-100">
                <div className="w-full h-full rounded-lg overflow-hidden">
                  {review?.user?.image ? (
                    <img 
                      src={review.user.image} 
                      alt={review.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 
                      flex items-center justify-center">
                      <span className="text-xl font-bold text-indigo-600">
                        {review?.user?.name?.[0] || '?'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {review?.verified && (
                <div className="absolute -bottom-1 -right-1 rounded-full bg-emerald-500 p-1.5 
                  ring-2 ring-white">
                  <BadgeCheck className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div>
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                {review?.user?.name || 'Anonymous'}
                {(review?.recommend || 0) >= 8 && (
                  <Badge color="amber">
                    <Medal className="w-3 h-3 mr-1" />
                    Top Reviewer
                  </Badge>
                )}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>
                  {review?.createdAt ? 
                    new Date(review.createdAt).toLocaleDateString() : 
                    'Unknown date'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg 
              transition-transform duration-300"
            aria-label={isExpanded ? "Show less" : "Show more"}
          >
            <ChevronDown className={`w-5 h-5 transform transition-transform duration-300
              ${isExpanded ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-6 pt-4">
            <FeatureSection 
              icon={Sparkles}
              title="Highlights"
              variant="highlight"
            >
              {review?.bestThing || 'No highlights provided'}
            </FeatureSection>

            <FeatureSection 
              icon={Shield}
              title="Areas for Growth"
              variant="growth"
            >
              {review?.worstThing || 'No improvement areas specified'}
            </FeatureSection>

            {/* Features Grid */}
            {review?.functionality?.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-500" />
                    Feature Ratings
                  </h4>
                  <Badge>
                    {review.functionality.length} Features
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {review.functionality.map((feature) => (
                    <div key={feature.category} 
                      className="flex items-center justify-between p-4 rounded-xl 
                        bg-white shadow-sm ring-1 ring-gray-100">
                      <span className="text-sm font-medium text-gray-700">
                        {feature.category}
                      </span>
                      <div className="flex items-center gap-3">
                        <StarRating value={feature.rating} size="sm" />
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 
                p-4 ring-1 ring-indigo-100">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Recommendation Score
                </h4>
                <div className="flex items-center gap-2">
                  <ThumbsUp className={`w-5 h-5 ${
                    (review?.recommend || 0) >= 8 ? 'text-emerald-500' : 
                    (review?.recommend || 0) >= 5 ? 'text-amber-500' : 'text-red-500'
                  }`} />
                  <span className="text-2xl font-bold text-indigo-600">
                    {review?.recommend || 0}/10
                  </span>
                </div>
              </div>

              <div className="rounded-xl bg-white p-4 ring-1 ring-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  Reference Availability
                </h4>
                <p className="text-gray-600">
                  {review?.reference || 'No reference information provided'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
const VendorReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
    const { vendorId, userType } = useAuth();
    const userId= vendorId
  const fetchReviews = async () => {
    try {
      
      const response = await fetch("/api/vendor-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      
      const data = await response.json();
      if (data.success) {
        setReviews(data.products);
      } else {
        setError(data.msg);
      }
    } catch (err) {
      setError("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchReviews();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-indigo-100 animate-pulse" />
            <div className="absolute inset-0 w-16 h-16 rounded-full border-t-4 border-indigo-500 animate-spin" />
          </div>
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <div className="w-16 h-16 mx-auto text-red-500">
            <Shield className="w-full h-full" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Error Loading Reviews</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center max-w-xl mx-auto p-8">
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-indigo-50 to-purple-50 
              rounded-2xl flex items-center justify-center transform transition-transform duration-500 hover:scale-110">
              <FileText className="w-12 h-12 text-indigo-500" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 
              blur-xl opacity-50 rounded-full" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
            bg-clip-text text-transparent mb-4">
            No Reviews Yet
          </h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Start collecting reviews from your customers to build trust and showcase your product's value.
            Reviews help potential customers make informed decisions.
          </p>
          <button className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r
          from-indigo-500 to-purple-500 text-white font-semibold shadow-lg 
            hover:shadow-xl transform transition-all duration-300 hover:-translate-y-0.5">
            <Sparkles className="w-5 h-5 mr-2" />
            Get Started with Reviews
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 
          bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-50" />
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          <div className="relative flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 
              text-white shadow-lg transform transition-transform duration-300 hover:scale-110">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 
                bg-clip-text text-transparent">
                Product Reviews
              </h1>
              <div className="text-gray-600 flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {reviews.reduce((total, product) => total + (product.reviews?.length || 0), 0)} total reviews
                </span>
                <span className="text-gray-300">•</span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {reviews.length} products
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={handleRefresh}
                disabled={loading || isRefreshing}
                className="p-3 rounded-xl bg-white border border-gray-100 text-gray-600 
                  hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50 
                  shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 
                  disabled:cursor-not-allowed transform hover:scale-105"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
              </button>
              <div className="absolute inset-0 bg-indigo-500/10 blur-xl opacity-0 
                hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6">
          {reviews.map((product) => (
            <div key={product.id} className="space-y-6">
              {/* Product Header */}
              <div className="flex items-center gap-4 pl-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 
                  p-2 shadow-sm">
                  {product.logoUrl ? (
                    <img
                      src={product.logoUrl}
                      alt={product.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <Building2 className="w-full h-full text-indigo-500" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 
                    bg-clip-text text-transparent">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {product.reviews?.length || 0} {product.reviews?.length === 1 ? "review" : "reviews"}
                  </p>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {product.reviews?.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Add CSS for grid pattern
const style = document.createElement('style');
style.textContent = `
  .bg-grid-pattern {
    background-image: linear-gradient(to right, rgb(226 232 240 / 0.1) 1px, transparent 1px),
                      linear-gradient(to bottom, rgb(226 232 240 / 0.1) 1px, transparent 1px);
    background-size: 24px 24px;
  }
`;
document.head.appendChild(style);

export default VendorReviews;