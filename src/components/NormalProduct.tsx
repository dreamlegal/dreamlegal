
// const userCategories = [
//   { name: "Law firms", icon: "/lawfirmicon.svg" },
//   { name: "Individual Practitioner", icon: "/prac.svg" },
//   { name: "Government departments", icon: "/govdepticon.svg" },
//   { name: "Startups", icon: "/startupicon.svg" },
//   { name: "Enterprises", icon: "/enterpriceicon.svg" },
//   { name: "Judiciary", icon: "/judge1.svg" },
//   { name: "In-House Counsels", icon: "/lawyers.svg" },
// ];


// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { FaBookmark } from 'react-icons/fa6';
// import { FiShare2 } from 'react-icons/fi';
// import { IoIosArrowRoundForward } from 'react-icons/io';
// import { data } from "@/app/(home)/category/_components/data";
// import { useNewAuth } from '@/context/NewAuthContext';;

// const ProductCard = ({ id, image, title, description, category, product }) => {
//   // ... keep existing state and effects code ...
//   // const userId = typeof window !== "undefined" && localStorage.getItem("userId");
//    const { userId, userType } = useNewAuth();
//    console.log(`userId: ${userId}, userType: ${userType}`);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [ratings, setRatings] = useState({ overallRating: 0, message: "" });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const checkBookmark = async () => {
//       if (!userId) return;
      
//       try {
//         const response = await fetch("/api/check-bookmark", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId, productId: id }),
//         });
//         if (response.ok) {
//           const result = await response.json();
//           setIsBookmarked(result.isBookmarked);
//         }
//       } catch (error) {
//         console.error("Error checking bookmark", error);
//       }
//     };
//     checkBookmark();
//   }, [userId, id]);

//   useEffect(() => {
//     const fetchRatings = async () => {
//       try {
//         const response = await fetch("/api/cal-review", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ productId: id }),
//         });
//         if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//         const data = await response.json();
//         if (data.message === "No reviews found for this product") {
//           setRatings({
//             overallRating: 0,
//             message: "No reviews found for this product",
//           });
//         } else {
//           setRatings(data);
//         }
//       } catch (error) {
//         setError(error instanceof Error ? error.message : "Unknown error");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (product?.id) {
//       fetchRatings();
//     } else {
//       setLoading(false);
//       setError("Product ID is missing.");
//     }
//   }, [product, id]);

//   const handleBookmarkClick = async () => {
//     if (userType === "vendor") {
//       alert("Vendor can't bookmark products");
//       return;
//     }
//     if (!userId) {
//       alert("Please log in as User to bookmark products");
//       return;
//     }
    
//     try {
//       console.log(id);
//       const response = await fetch("/api/save-product", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, productId: product.id }),
//       });
//       if (response.ok) {
//         const result = await response.json();
//         setIsBookmarked(!isBookmarked);
//         alert(result.message);
//       } else {
//         const error = await response.json();
//         alert(error.message);
//       }
//     } catch (error) {
//       console.error("Error bookmarking product", error);
//       alert("Failed to bookmark product");
//     }
//   };

//   const roundedRating = (ratings.overallRating ?? 0).toFixed(1);
//   const parseUserCategory = (category) => {
//     const [name] = category.split("|");
//     return name;
//   };

//   const userCategoryIcons = product.userCategory
//     .map((category) => {
//       const parsedCategory = parseUserCategory(category);
//       return userCategories.find((cat) => cat.name === parsedCategory) || null;
//     })
//     .filter(Boolean);

//   if (loading) {
//     return (
//       <div className="w-full p-8">
//         <div className="animate-pulse flex space-x-4">
//           <div className="relative w-16 h-16">
//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 animate-gradient"></div>
//           </div>
//           <div className="flex-1 space-y-4 py-1">
//             <div className="h-4 bg-gradient-to-r from-blue-100 to-transparent rounded-full w-3/4"></div>
//             <div className="space-y-2">
//               <div className="h-4 bg-gradient-to-r from-blue-50 to-transparent rounded-full"></div>
//               <div className="h-4 bg-gradient-to-r from-blue-50 to-transparent rounded-full w-5/6"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full px-8 py-6 pt-16">
//       {/* Main Content */}
//       <div className="flex flex-col md:flex-row md:items-start gap-6">
//         {/* Left Section - Logo and Title */}
//         <div className="flex gap-5 flex-1">
//           {/* Enhanced Logo Section */}
//           <div className="relative group">
//             {/* Background Glow Effect */}
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-sky-500 
//                           rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-all 
//                           duration-500"></div>
            
//             {/* Logo Container */}
//             <div className="relative">
//               <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white p-0.5">
//                 <div className="relative w-full h-full rounded-xl overflow-hidden 
//                              ring-1 ring-black/5 shadow-sm">
//                   <img
//                     src={image}
//                     alt={title}
//                     className="w-full h-full object-cover transition-transform duration-500 
//                              group-hover:scale-110"
//                   />
//                   {/* Overlay Gradient */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 
//                                via-transparent to-sky-500/10 opacity-0 group-hover:opacity-100 
//                                transition-opacity duration-500"></div>
//                 </div>
//               </div>
              
//               {/* Status Indicator */}
//               <span className="absolute -right-1 -bottom-1 w-4 h-4 bg-gradient-to-r 
//                            from-blue-600 to-blue-500 rounded-full ring-2 ring-white 
//                            shadow-lg flex items-center justify-center">
//                 <span className="absolute inset-0 rounded-full bg-blue-600 animate-ping 
//                              opacity-50"></span>
//               </span>
//             </div>
//           </div>
          
//           {/* Title and Categories */}
//           <div className="flex-1 min-w-0">
//             <h3 className="font-semibold text-lg text-gray-900 mb-3 group-hover:text-blue-700 
//                         transition-colors duration-300">{title}</h3>
//             <div className="flex flex-wrap gap-2">
//               {category.map((cat) => (
//                 <div 
//                   key={cat} 
//                   className="group/tag relative overflow-hidden"
//                 >
//                   <div className="relative px-4 py-2 rounded-full bg-gradient-to-br 
//                                from-blue-50 via-blue-50/80 to-white backdrop-blur-sm 
//                                shadow-sm hover:shadow transition-all duration-300">
//                     <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 
//                                 to-sky-500/10 opacity-0 group-hover/tag:opacity-100 
//                                 transition-all duration-300"></div>
//                     <span className="relative text-xs font-medium bg-gradient-to-r 
//                                  from-blue-700 to-blue-600 bg-clip-text text-transparent">
//                       {data.map((item) => {
//                         const formattedStr = cat.toLowerCase().replace(/ /g, "-");
//                         return formattedStr === item.slug && item.name;
//                       })}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Section - Actions */}
//         <div className="flex items-center gap-3">
//           <Link
//             href={`/product/${product.slug}`}
//             className="group relative flex items-center gap-2 px-6 py-3 rounded-full 
//                      text-sm font-medium transition-all duration-300"
//           >
//             {/* Button Background */}
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 
//                           rounded-full transition-all duration-300 group-hover:scale-105"></div>
            
//             {/* Button Content */}
//             <span className="relative text-white flex items-center gap-2">
//               View Details
//               <IoIosArrowRoundForward className="text-xl transition-transform duration-300 
//                                              group-hover:translate-x-1" />
//             </span>
            
//             {/* Hover Glow Effect */}
//             <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 
//                           transition-opacity duration-300 blur-md bg-gradient-to-r 
//                           from-blue-600 to-blue-400"></div>
//           </Link>

//           {/* Action Buttons with Enhanced Styling */}
//           {['bookmark', 'share'].map((action, index) => (
//             <button
//               key={action}
//               onClick={action === 'bookmark' ? handleBookmarkClick : undefined}
//               className="relative p-3 rounded-full bg-gradient-to-br from-white to-blue-50/80 
//                        shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
//             >
//               {action === 'bookmark' ? (
//                 <FaBookmark
//                   className={`text-xl transition-colors duration-300 ${
//                     isBookmarked ? "text-blue-600" : "text-gray-400"
//                   }`}
//                 />
//               ) : (
//                 <FiShare2 className="text-xl text-gray-600 hover:text-blue-600 
//                                  transition-colors duration-300" />
//               )}
              
//               {/* Button Glow on Hover */}
//               <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 
//                           transition-opacity duration-300 blur-sm bg-blue-500"></div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Overview Section */}
//       <div className="mt-8">
//         <h4 className="text-sm font-medium bg-gradient-to-r from-blue-700 to-blue-600 
//                      bg-clip-text text-transparent mb-2">Overview</h4>
//         <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
//       </div>

//       {/* Footer Section */}
//       <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-6">
//         {/* User Categories */}
//         <div className="flex-1">
//           <h4 className="text-sm font-medium bg-gradient-to-r from-blue-700 to-blue-600 
//                      bg-clip-text text-transparent mb-4">Target Users</h4>
//           <div className="flex flex-wrap gap-4">
//             {userCategoryIcons.map((category) => (
//               <div key={category.name} className="group/icon relative">
//                 <div className="relative overflow-hidden p-3 rounded-xl bg-gradient-to-br 
//                              from-white to-blue-50/80 shadow-sm hover:shadow-md 
//                              transition-all duration-300 hover:scale-105">
//                   {/* Icon Container */}
//                   <div className="relative z-10">
//                     <img 
//                       src={category.icon} 
//                       alt={category.name} 
//                       className="w-6 h-6 transition-transform duration-300 
//                                group-hover/icon:scale-110" 
//                     />
//                   </div>
                  
//                   {/* Hover Glow */}
//                   <div className="absolute inset-0 rounded-xl opacity-0 
//                                group-hover/icon:opacity-20 transition-opacity duration-300 
//                                blur-sm bg-blue-500"></div>
                  
//                   {/* Enhanced Tooltip */}
//                   <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 
//                                opacity-0 group-hover/icon:opacity-100 transition-all 
//                                duration-300 pointer-events-none z-20">
//                     <div className="relative">
//                       <div className="absolute inset-0 bg-gray-900/95 rounded-lg blur-sm"></div>
//                       <div className="relative bg-gray-900/95 text-white text-xs font-medium 
//                                   rounded-lg px-3 py-2 whitespace-nowrap">
//                         {category.name}
//                         <div className="absolute -top-1 left-1/2 -translate-x-1/2 
//                                     border-[6px] border-transparent 
//                                     border-b-gray-900/95"></div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Stats with Enhanced Styling */}
//         {/* <div className="flex gap-8">
//           <div className="group">
//             <h4 className="text-sm font-medium bg-gradient-to-r from-blue-700 to-blue-600 
//                         bg-clip-text text-transparent mb-1">Adoption Time</h4>
//             <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-700 
//                        transition-colors duration-300">
//               {product.avgTimeAdoption}
//             </p>
//           </div>
//           <div className="group">
//             <h4 className="text-sm font-medium bg-gradient-to-r from-blue-700 to-blue-600 
//                         bg-clip-text text-transparent mb-1">Rating</h4>
//             <div className="flex items-baseline">
//               <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 
//                            to-yellow-500 bg-clip-text text-transparent">
//                 {roundedRating}
//               </span>
//               <span className="text-sm text-gray-400 ml-1">/5</span>
//             </div>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

