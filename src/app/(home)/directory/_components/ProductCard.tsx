// // import React, { useState, useEffect } from 'react';
// // import Link from 'next/link';
// // import { FaBookmark } from 'react-icons/fa6';
// // import { FiShare2 } from 'react-icons/fi';
// // import { IoIosArrowRoundForward } from 'react-icons/io';
// // import { useAuth } from '@/context/authContext';
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// //   DialogClose,
// // } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";

// // // Category icons mapping
// // const userCategories = [
// //   { name: "Law firms", icon: "/lawfirmicon.svg" },
// //   { name: "Individual Practitioner", icon: "/prac.svg" },
// //   { name: "Government departments", icon: "/govdepticon.svg" },
// //   { name: "Startups", icon: "/startupicon.svg" },
// //   { name: "Enterprises", icon: "/enterpriceicon.svg" },
// //   { name: "Judiciary", icon: "/judge1.svg" },
// //   { name: "In-House Counsels", icon: "/lawyers.svg" },
// // ];

// // const ProductCard = ({ 
// //   product, 
// //   onCompare, 
// //   isCompared = false,
// //   className = '' 
// // }) => {
// //   const { userId, userType } = useAuth();
// //   const [isBookmarked, setIsBookmarked] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [shareUrl, setShareUrl] = useState('');
// //   const [tooltip, setTooltip] = useState('');

// //   console.log(product);

// //   // Check bookmark status when component mounts or userId changes
// //   useEffect(() => {
// //     const checkBookmarkStatus = async () => {
// //       if (!userId) return;
      
// //       try {
// //         const response = await fetch("/api/check-bookmark", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ userId, productId: product.id }),
// //         });
        
// //         if (response.ok) {
// //           const { isBookmarked } = await response.json();
// //           setIsBookmarked(isBookmarked);
// //         }
// //       } catch (error) {
// //         console.error("Error checking bookmark status:", error);
// //       }
// //     };

// //     checkBookmarkStatus();
// //   }, [userId, product.id]);

// //   // Set share URL when component mounts
// //   useEffect(() => {
// //     setShareUrl(`${window.location.origin}/product/${product.slug}`);
// //   }, [product.slug]);

// //   // Handle bookmark toggle
// //   const handleBookmarkClick = async () => {
// //     if (userType === "vendor") {
// //       showTooltip("Vendors cannot bookmark products");
// //       return;
// //     }
    
// //     if (!userId) {
// //       showTooltip("Please log in to bookmark products");
// //       return;
// //     }

// //     setLoading(true);
// //     try {
// //       const response = await fetch("/api/save-product", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ 
// //           userId, 
// //           productId: product.id,
// //           idForBookmark: product.id,
// //           userOrgType: userType,
// //           country: product.company?.headQuaters || null
// //         }),
// //       });

// //       if (response.ok) {
// //         setIsBookmarked(!isBookmarked);
// //         showTooltip(isBookmarked ? "Product removed from bookmarks" : "Product bookmarked");
// //       } else {
// //         throw new Error('Failed to toggle bookmark');
// //       }
// //     } catch (error) {
// //       console.error("Error toggling bookmark:", error);
// //       showTooltip("Failed to update bookmark");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Show tooltip message temporarily
// //   const showTooltip = (message) => {
// //     setTooltip(message);
// //     setTimeout(() => setTooltip(''), 3000);
// //   };

// //   // Handle share link copy
// //   const handleCopyLink = async () => {
// //     try {
// //       await navigator.clipboard.writeText(shareUrl);
// //       showTooltip("Link copied to clipboard!");
// //     } catch (error) {
// //       showTooltip("Failed to copy link");
// //     }
// //   };

// //   // Parse user categories and match with icons
// //   const userCategoryIcons = product.userCategory
// //     .map(category => {
// //       const [name] = category.split("|");
// //       return userCategories.find(cat => cat.name === name) || null;
// //     })
// //     .filter(Boolean);

// //   // Calculate average rating
// //   const calculateRating = () => {
// //     if (!product.Review?.length) return 'N/A';
    
// //     const total = product.Review.reduce((acc, review) => {
// //       const rating = parseFloat(review.overallExperienc) || 0;
// //       return acc + rating;
// //     }, 0);
    
// //     return (total / product.Review.length).toFixed(1);
// //   };

// //   const avgRating = calculateRating();

// //   return (

// //     <div className={`relative bg-white rounded-xl shadow-lg transition-all duration-300 
// //       hover:shadow-xl ${className}`}>
// // {isCompared && (
// // <div className="absolute -top-2 -right-2 bg-blue-600 text-white px-3 py-1 
// //         rounded-full text-xs font-medium shadow-lg z-10">
// // Selected for Comparison
// // </div>
// // )}

// // <div className="p-4 sm:p-6">
// // {/* Header Section - Different layouts for mobile and desktop */}
// // <div className="flex flex-col gap-4 sm:gap-0">
// // {/* Logo, Title and Actions Container */}
// // <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
// // {/* Logo and Title */}
// // <div className="flex items-start gap-4">
// // <div className="relative shrink-0">
// //   <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm bg-white">
// //     <img
// //       src={product.logoUrl}
// //       alt={product.name}
// //       className="w-full h-full object-contain p-2"
// //     />
// //   </div>
// //   {product.featured && (
// //     <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 
// //                   to-yellow-500 text-white text-xs px-2 py-1 rounded-full 
// //                   shadow-sm">
// //       Featured
// //     </span>
// //   )}
// // </div>

// // <div className="flex-1 min-w-0">
// //   <h3 className="text-lg font-semibold text-gray-900 break-words">{product.name}</h3>
// //   <div className="flex flex-wrap gap-2 mt-2">
// //     {product.category.map(cat => (
// //       <span key={cat} className="inline-flex items-center px-3 py-1 rounded-full 
// //                               text-xs font-medium bg-blue-50 text-blue-700">
// //         {cat}
// //       </span>
// //     ))}
// //   </div>
// // </div>
// // </div>

// // {/* Action Buttons - Different layouts for mobile and desktop */}
// // <div className="flex items-center justify-between sm:justify-end gap-2 border-t border-gray-100 pt-2 sm:border-0 sm:pt-0">
// // <div className="flex items-center gap-2">
// //   {/* Bookmark Button */}
// //   <button
// //     onClick={handleBookmarkClick}
// //     disabled={loading}
// //     className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
// //   >
// //     <FaBookmark
// //       className={`w-5 h-5 ${
// //         isBookmarked ? 'text-blue-600' : 'text-gray-400'
// //       }`}
// //     />
// //   </button>

// //   {/* Share Button */}
// //   <Dialog>
// //     <DialogTrigger asChild>
// //       <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
// //         <FiShare2 className="w-5 h-5 text-gray-400" />
// //       </button>
// //     </DialogTrigger>
// //     <DialogContent className="sm:max-w-md">
// //       <DialogHeader>
// //         <DialogTitle>Share Product</DialogTitle>
// //         <DialogDescription>
// //           Share this product with your network
// //         </DialogDescription>
// //       </DialogHeader>
// //       <div className="flex items-center gap-2 p-4">
// //         <input
// //           type="text"
// //           readOnly
// //           value={shareUrl}
// //           className="flex-1 px-3 py-2 border rounded-lg bg-gray-50"
// //         />
// //         <Button onClick={handleCopyLink} variant="outline">
// //           Copy
// //         </Button>
// //       </div>
// //     </DialogContent>
// //   </Dialog>
// // </div>

// // {/* Compare Button */}
// // <button
// //   onClick={() => onCompare(product)}
// //   className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium 
// //             transition-all duration-200 ${
// //               isCompared
// //                 ? 'bg-blue-50 text-blue-600'
// //                 : 'text-gray-600 hover:bg-gray-50'
// //             }`}
// // >
// //   {isCompared ? (
// //     <span className="hidden sm:inline">Remove Compare</span>
// //   ) : (
// //     <span className="hidden sm:inline">Compare</span>
// //   )}
// //   <span className="sm:hidden">{isCompared ? 'Remove' : 'Compare'}</span>
// // </button>
// // </div>
// // </div>

// // {/* Description */}
// // <p className="text-gray-600 text-sm sm:text-base line-clamp-2">
// // {product.description}
// // </p>
// // </div>

// // {/* Target Users */}
// // <div className="mt-6">
// // <p className="text-xs text-gray-500 mb-2">Target Users</p>
// // <div className="flex flex-wrap gap-2 sm:gap-3">
// // {userCategoryIcons.map(category => (
// // <div
// //   key={category.name}
// //   className="group relative flex items-center p-2 bg-gray-50 rounded-lg 
// //             hover:bg-blue-50 transition-colors duration-200"
// // >
// //   <img
// //     src={category.icon}
// //     alt={category.name}
// //     className="w-5 h-5"
// //   />
// //   <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 
// //                 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded 
// //                 opacity-0 group-hover:opacity-100 transition-opacity 
// //                 duration-200 whitespace-nowrap z-10">
// //     {category.name}
// //   </span>
// // </div>
// // ))}
// // </div>
// // </div>

// // {/* Footer */}
// // <div className="mt-6 pt-4 sm:pt-6 border-t border-gray-200">
// // <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // <div className="grid grid-cols-2 sm:flex sm:flex-row gap-4">
// // <div>
// //   <p className="text-xs text-gray-500">Company</p>
// //   <p className="text-sm font-medium text-gray-900 truncate">
// //     {product.company?.companyName || product.CompanyName || 'N/A'}
// //   </p>
// // </div>
// // <div>
// //   <p className="text-xs text-gray-500">Headquarters</p>
// //   <p className="text-sm font-medium text-gray-900 truncate">
// //     {product.company?.headQuaters || product.Headquarters || 'N/A'}
// //   </p>
// // </div>
// // </div>
// // <Link
// // href={`/product/${product.slug}`}
// // className="flex items-center justify-center sm:justify-start gap-2 w-full 
// //         sm:w-auto px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg 
// //         hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
// // >
// // View Details
// // <IoIosArrowRoundForward className="w-5 h-5" />
// // </Link>
// // </div>
// // </div>
// // </div>
// // </div>
// //   );
// // };

// // export default ProductCard;

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { FiShare2 } from 'react-icons/fi';
// import { IoIosArrowRoundForward } from 'react-icons/io';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";

// // Category display names
// const categoryDisplayNames = {
//   'CONTRACT_LIFECYCLE_MANAGEMENT': 'Contract Lifecycle Management',
//   'LEGAL_AI': 'Legal AI',
//   'DOCUMENT_MANAGEMENT_SYSTEM': 'Document Management System',
//   'LITIGATION_MANAGEMENT_AND_ANALYTICS': 'Litigation Management & Analytics',
//   'IP_MANAGEMENT': 'Intellectual Property Management',
//   'LEGAL_RESEARCH': 'Legal Research',
//   'E_DISCOVERY': 'E-Discovery'
// };

// // Pricing tier display names
// const pricingTierDisplayNames = {
//   'BUDGET': 'Budget ($)',
//   'MID_RANGE': 'Mid-Range ($$)',
//   'PREMIUM': 'Premium ($$$)',
//   'ENTERPRISE': 'Enterprise ($$$+)'
// };

// const ProductCard = ({ 
//   product, 
//   onCompare, 
//   isCompared = false,
//   className = '' 
// }) => {
//   const [shareUrl, setShareUrl] = useState('');
//   const [tooltip, setTooltip] = useState('');
  
//   // Expandable sections state
//   const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
//   const [isTargetUsersExpanded, setIsTargetUsersExpanded] = useState(false);

//   console.log(product);

//   // Set share URL when component mounts
//   useEffect(() => {
//     setShareUrl(`${window.location.origin}/product/${product.slug}`);
//   }, [product.slug]);

//   // Show tooltip message temporarily
//   const showTooltip = (message) => {
//     setTooltip(message);
//     setTimeout(() => setTooltip(''), 3000);
//   };

//   // Handle share link copy
//   const handleCopyLink = async () => {
//     try {
//       await navigator.clipboard.writeText(shareUrl);
//       showTooltip("Link copied to clipboard!");
//     } catch (error) {
//       showTooltip("Failed to copy link");
//     }
//   };

//   // Truncate text function
//   const truncateText = (text, maxLength = 120) => {
//     if (!text) return '';
//     return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
//   };

//   return (
//     <div className={`relative bg-[#f5f7fa] rounded-xl shadow-lg transition-all duration-300 
//       hover:shadow-xl ${className}`}>
//       {isCompared && (
//         <div className="absolute -top-2 -right-2 bg-[#1e2556] text-white px-3 py-1 
//                 rounded-full text-xs font-medium shadow-lg z-10">
//           Selected for Comparison
//         </div>
//       )}

//       <div className="p-6">
//         {/* Header Section */}
//         <div className="flex flex-col gap-4">
//           {/* Logo, Title and Actions */}
//           <div className="flex items-start justify-between gap-4">
//             {/* Logo and Title */}
//             <div className="flex items-start gap-4 flex-1 min-w-0">
//               <div className="relative shrink-0">
//                 <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm bg-white">
//                   <img
//                     src={product.logoUrl || '/api/placeholder/64/64'}
//                     alt={product.productName}
//                     className="w-full h-full object-contain p-2"
//                   />
//                 </div>
//               </div>

//               <div className="flex-1 min-w-0">
//                 <h3 className="text-lg font-semibold text-[#1e2556] break-words mb-2">
//                   {product.productName}
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   <span className="inline-flex items-center px-3 py-1 rounded-full 
//                                  text-xs font-medium bg-blue-50 text-[#7cc6ee]">
//                     {categoryDisplayNames[product.category] || product.category}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center gap-2">
//               {/* Share Button */}
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
//                     <FiShare2 className="w-5 h-5 text-gray-400" />
//                   </button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-md">
//                   <DialogHeader>
//                     <DialogTitle>Share Product</DialogTitle>
//                     <DialogDescription>
//                       Share this product with your network
//                     </DialogDescription>
//                   </DialogHeader>
//                   <div className="flex items-center gap-2 p-4">
//                     <input
//                       type="text"
//                       readOnly
//                       value={shareUrl}
//                       className="flex-1 px-3 py-2 border rounded-lg bg-gray-50"
//                     />
//                     <Button onClick={handleCopyLink} variant="outline">
//                       Copy
//                     </Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>

//               {/* Compare Button */}
//               <button
//                 onClick={() => onCompare(product)}
//                 className={`px-3 py-1.5 rounded-lg text-sm font-medium 
//                           transition-all duration-200 ${
//                             isCompared
//                               ? 'bg-blue-50 text-[#7cc6ee]'
//                               : 'text-[#2d2d2d] hover:bg-gray-100'
//                           }`}
//               >
//                 {isCompared ? 'Remove' : 'Compare'}
//               </button>
//             </div>
//           </div>

//           {/* Description Section */}
//           <div className="border-t border-gray-200 pt-4">
//             <h4 className="text-sm font-medium text-[#334155] mb-2">Description</h4>
//             <div className="text-[#2d2d2d] text-sm">
//               {isDescriptionExpanded ? (
//                 <div>
//                   <p>{product.description || product.briefDescription || 'No description available'}</p>
//                   <button
//                     onClick={() => setIsDescriptionExpanded(false)}
//                     className="flex items-center gap-1 text-[#7cc6ee] hover:text-[#7cc6ee]/80 transition-colors mt-2"
//                   >
//                     <span>Read Less</span>
//                     <ChevronUp className="w-4 h-4" />
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <p>{truncateText(product.description || product.briefDescription || 'No description available')}</p>
//                   {(product.description || product.briefDescription) && 
//                    (product.description || product.briefDescription).length > 120 && (
//                     <button
//                       onClick={() => setIsDescriptionExpanded(true)}
//                       className="flex items-center gap-1 text-[#7cc6ee] hover:text-[#7cc6ee]/80 transition-colors mt-2"
//                     >
//                       <span>Read More</span>
//                       <ChevronDown className="w-4 h-4" />
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Target Users Section */}
//           {/* {product.targetUsers && (
//             <div className="border-t border-gray-200 pt-4">
//               <h4 className="text-sm font-medium text-[#334155] mb-2">Target Users</h4>
//               <div className="text-[#2d2d2d] text-sm">
//                 {isTargetUsersExpanded ? (
//                   <div>
//                     <p>{product.targetUsers}</p>
//                     <button
//                       onClick={() => setIsTargetUsersExpanded(false)}
//                       className="flex items-center gap-1 text-[#7cc6ee] hover:text-[#7cc6ee]/80 transition-colors mt-2"
//                     >
//                       <span>Show Less</span>
//                       <ChevronUp className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ) : (
//                   <div>
//                     <p>{truncateText(product.targetUsers, 80)}</p>
//                     {product.targetUsers.length > 80 && (
//                       <button
//                         onClick={() => setIsTargetUsersExpanded(true)}
//                         className="flex items-center gap-1 text-[#7cc6ee] hover:text-[#7cc6ee]/80 transition-colors mt-2"
//                       >
//                         <span>Show More</span>
//                         <ChevronDown className="w-4 h-4" />
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           )} */}
//         </div>

//         {/* Footer */}
//         <div className="mt-6 pt-4 border-t border-gray-200">
//           <div className="flex flex-col gap-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-xs text-[#334155]">Company</p>
//                 <p className="text-sm font-medium text-[#1e2556] truncate">
//                   {product.companyName || 'N/A'}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-[#334155]">Headquarters</p>
//                 <p className="text-sm font-medium text-[#1e2556] truncate">
//                   {product.headquarters || 'N/A'}
//                 </p>
//               </div>
//             </div>
            
//             {/* Pricing Information */}
//             <div className="grid grid-cols-2 gap-4">
//               {product.pricingTier && (
//                 <div>
//                   <p className="text-xs text-[#334155]">Pricing Tier</p>
//                   <p className="text-sm font-medium text-[#1e2556] truncate">
//                     {pricingTierDisplayNames[product.pricingTier] || product.pricingTier}
//                   </p>
//                 </div>
//               )}
//               {product.freeTrial && (
//                 <div>
//                   <p className="text-xs text-[#334155]">Free Trial</p>
//                   <p className="text-sm font-medium text-green-600 truncate">
//                     {product.freeTrial}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <Link
//               href={`/product/${product.slug}`}
//               className="flex items-center justify-center gap-2 w-full px-4 py-3 
//                         bg-[#1e2556] text-white rounded-lg hover:bg-[#1e2556]/90 
//                         transition-colors duration-200 text-sm font-medium"
//             >
//               View Details
//               <IoIosArrowRoundForward className="w-5 h-5" />
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Tooltip */}
//       {tooltip && (
//         <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-lg text-sm z-20">
//           {tooltip}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductCard;
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiShare2 } from 'react-icons/fi';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Category display names
const categoryDisplayNames = {
  'CONTRACT_LIFECYCLE_MANAGEMENT': 'Contract Lifecycle Management',
  'LEGAL_AI': 'Legal AI',
  'DOCUMENT_MANAGEMENT_SYSTEM': 'Document Management System',
  'LITIGATION_MANAGEMENT_AND_ANALYTICS': 'Litigation Management & Analytics',
  'IP_MANAGEMENT': 'Intellectual Property Management',
  'LEGAL_RESEARCH': 'Legal Research',
  'E_DISCOVERY': 'E-Discovery'
};

// Pricing tier display names
const pricingTierDisplayNames = {
  'BUDGET': 'Budget ($)',
  'MID_RANGE': 'Mid-Range ($$)',
  'PREMIUM': 'Premium ($$$)',
  'ENTERPRISE': 'Enterprise ($$$+)'
};

const ProductCard = ({ 
  product, 
  onCompare, 
  isCompared = false,
  className = '' 
}) => {
  const [shareUrl, setShareUrl] = useState('');
  const [tooltip, setTooltip] = useState('');
  
  // Expandable sections state
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isTargetUsersExpanded, setIsTargetUsersExpanded] = useState(false);

  console.log(product);

  // Set share URL when component mounts
  useEffect(() => {
    setShareUrl(`${window.location.origin}/product/${product.slug}`);
  }, [product.slug]);

  // Show tooltip message temporarily
  const showTooltip = (message) => {
    setTooltip(message);
    setTimeout(() => setTooltip(''), 3000);
  };

  // Handle share link copy
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showTooltip("Link copied to clipboard!");
    } catch (error) {
      showTooltip("Failed to copy link");
    }
  };

  // Truncate text function
  const truncateText = (text, maxLength = 120) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className={`relative bg-[#f5f7fa] rounded-xl shadow-lg transition-all duration-300 
      hover:shadow-xl ${className}`}>
      {isCompared && (
        <div className="absolute -top-2 -right-2 bg-[#1e2556] text-white px-3 py-1 
                rounded-full text-xs font-medium shadow-lg z-10">
          Selected for Comparison
        </div>
      )}

      <div className="p-4 sm:p-6">
        {/* Header Section */}
        <div className="flex flex-col gap-3 sm:gap-4">
          {/* Logo, Title and Actions */}
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            {/* Logo and Title */}
            <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
              <div className="relative shrink-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-sm bg-white">
                  <img
                    src={product.logoUrl || '/api/placeholder/64/64'}
                    alt={product.productName}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-semibold text-[#1e2556] break-words mb-2 leading-tight">
                  {product.productName}
                </h3>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full 
                                 text-xs font-medium bg-blue-50 text-[#7cc6ee]">
                    {categoryDisplayNames[product.category] || product.category}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Share Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <FiShare2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share Product</DialogTitle>
                    <DialogDescription>
                      Share this product with your network
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center gap-2 p-4">
                    <input
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 text-sm"
                    />
                    <Button onClick={handleCopyLink} variant="outline" className="text-xs sm:text-sm">
                      Copy
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Compare Button */}
              <button
                onClick={() => onCompare(product)}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium 
                          transition-all duration-200 ${
                            isCompared
                              ? 'bg-blue-50 text-[#7cc6ee]'
                              : 'text-[#2d2d2d] hover:bg-gray-100'
                          }`}
              >
                {isCompared ? 'Remove' : 'Compare'}
              </button>
            </div>
          </div>

          {/* Description Section */}
          <div className="border-t border-gray-200 pt-3 sm:pt-4">
            <h4 className="text-sm font-medium text-[#334155] mb-2">Description</h4>
            <div className="text-[#2d2d2d] text-sm">
              {isDescriptionExpanded ? (
                <div>
                  <p className="leading-relaxed">{product.description || product.briefDescription || 'No description available'}</p>
                  <button
                    onClick={() => setIsDescriptionExpanded(false)}
                    className="flex items-center gap-1 text-[#7cc6ee] hover:text-[#7cc6ee]/80 transition-colors mt-2"
                  >
                    <span>Read Less</span>
                    <ChevronUp className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <p className="leading-relaxed">{truncateText(product.description || product.briefDescription || 'No description available')}</p>
                  {(product.description || product.briefDescription) && 
                   (product.description || product.briefDescription).length > 120 && (
                    <button
                      onClick={() => setIsDescriptionExpanded(true)}
                      className="flex items-center gap-1 text-[#7cc6ee] hover:text-[#7cc6ee]/80 transition-colors mt-2"
                    >
                      <span>Read More</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Company Info - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <p className="text-xs text-[#334155]">Company</p>
                <p className="text-sm font-medium text-[#1e2556] truncate">
                  {product.companyName || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#334155]">Headquarters</p>
                <p className="text-sm font-medium text-[#1e2556] truncate">
                  {product.headquarters || 'N/A'}
                </p>
              </div>
            </div>
            
            {/* Pricing Information - Responsive Grid */}
            {(product.pricingTier || product.freeTrial) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {product.pricingTier && (
                  <div>
                    <p className="text-xs text-[#334155]">Pricing Tier</p>
                    <p className="text-sm font-medium text-[#1e2556] truncate">
                      {pricingTierDisplayNames[product.pricingTier] || product.pricingTier}
                    </p>
                  </div>
                )}
                {product.freeTrial && (
                  <div>
                    <p className="text-xs text-[#334155]">Free Trial</p>
                    <p className="text-sm font-medium text-green-600 truncate">
                      {product.freeTrial}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* CTA Button */}
            <Link
              href={`/product/${product.slug}`}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 
                        bg-[#1e2556] text-white rounded-lg hover:bg-[#1e2556]/90 
                        transition-colors duration-200 text-sm font-medium touch-manipulation"
            >
              View Details
              <IoIosArrowRoundForward className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-lg text-sm z-20">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default ProductCard;