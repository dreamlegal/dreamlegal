
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { FiShare2 } from 'react-icons/fi';
// import { IoIosArrowRoundForward } from 'react-icons/io';
// import { ChevronDown, ChevronUp, Star } from 'lucide-react';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import DLScoreBadge from '@/components/DLScoreBadge';

// import ProductBadges from '@/components/ProductBadges';

// // In your product page:

// // Category display names
// const categoryDisplayNames = {
//   'CONTRACT_LIFECYCLE_MANAGEMENT': 'Contract Lifecycle Management',
//   'LEGAL_AI': 'Legal AI',
//   'DOCUMENT_MANAGEMENT_SYSTEM': 'Document Management System',
//   'LITIGATION_MANAGEMENT_AND_ANALYTICS': 'Litigation Management & Analytics',
//   'IP_MANAGEMENT': 'Intellectual Property Management',
//   'LEGAL_RESEARCH': 'Legal Research',
//   'E_DISCOVERY': 'E-Discovery',
//   'CASE_MANAGEMENT': 'Case Management',
//   'GOVERNANCE_RISK_COMPLIANCE': 'Governance Risk Compliance',
//   'LEGAL_DUE_DILIGENCE': 'Legal Due Diligence'
// };
// import BadgesList from '@/components/BadgesList';

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
//   const router = useRouter();
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

//   // Handle card click
//   const handleCardClick = () => {
//     router.push(`/product/${product.slug}`);
//   };

//   // Handle interactive element clicks (prevent card navigation)
//   const handleInteractiveClick = (e) => {
//     e.stopPropagation();
//   };

//   // Truncate text function
//   const truncateText = (text, maxLength = 120) => {
//     if (!text) return '';
//     return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
//   };

//   // Premium product styling - Modified to remove gold backgrounds and rings
//   const isPremium = product.isPremium;
//   const cardBgClass = 'bg-[#f5f7fa]'; // Same background for all products
  
//   const buttonClass = isPremium
//     ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white'
//     : 'bg-[#1e2556] text-white hover:bg-[#1e2556]/90';

//   return (
//     <div 
//       onClick={handleCardClick}
//       className={`relative ${cardBgClass} rounded-xl shadow-lg transition-all duration-300 
//         hover:shadow-xl cursor-pointer ${className}`}
//     >
//       {isCompared && (
//         <div className="absolute -top-2 -right-2 bg-[#1e2556] text-white px-3 py-1 
//                 rounded-full text-xs font-medium shadow-lg z-10">
//           Selected for Comparison
//         </div>
//       )}

//       {/* Premium Badge */}
//       {isPremium && product.tag && (
//         <div className="absolute -top-2 -left-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-3 py-1 
//                 rounded-full text-xs font-medium shadow-lg z-10 flex items-center gap-1">
//           <Star className="w-3 h-3 fill-current" />
//           {product.tag}
//         </div>
//       )}
//        {/* ADD DL SCORE IN TOP RIGHT */}
//   <div className="absolute -top-2 -right-2 z-10">
//     <DLScoreBadge 
//       productId={product.id} 
//       slug={product.slug}
//       size="small"
//     />
//   </div>
    

//       <div className="p-4 sm:p-6">
//         {/* Header Section */}
//         <div className="flex flex-col gap-3 sm:gap-4">
//           {/* Logo, Title and Actions */}
//           <div className="flex items-start justify-between gap-3 sm:gap-4">
//             {/* Logo and Title */}
//             <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
//               <div className="relative shrink-0">
//                 <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-sm bg-white">
//                   <img
//                     src={product.logoUrl || '/api/placeholder/64/64'}
//                     alt={product.productName}
//                     className="w-full h-full object-contain p-2"
//                   />

//                 </div>
//               </div>

//               <div className="flex-1 min-w-0">
//                 <h3 className="text-base sm:text-lg font-semibold text-[#1e2556] break-words mb-2 leading-tight">
//                   {product.productName}
//                 </h3>
              
               
               
//                 {/* <div className="flex flex-wrap gap-1 sm:gap-2">
//                   <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full 
//                                  text-xs font-medium bg-blue-50 text-[#7cc6ee]">
//                     {categoryDisplayNames[product.category] || product.category}
//                   </span>
//                 </div> */}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex items-center gap-1 sm:gap-2" onClick={handleInteractiveClick}>
//               {/* Share Button */}
            
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
//                     <FiShare2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
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
//                       className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 text-sm"
//                     />
//                     <Button onClick={handleCopyLink} variant="outline" className="text-xs sm:text-sm">
//                       Copy
//                     </Button>
//                   </div>
//                 </DialogContent>
//               </Dialog>

//               {/* Compare Button */}
//               <button
//                 onClick={() => onCompare(product)}
//                 className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium 
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
//           <div className="border-t border-gray-200 pt-3 sm:pt-4">
//             <div className="flex col justify-between">
//             <h4 className="text-sm font-medium text-[#334155] mb-2">Description</h4>
//               <div className="flex flex-wrap gap-1 sm:gap-2">
//                   <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full 
//                                  text-xs font-medium bg-blue-50 text-[#7cc6ee]">
//                     {categoryDisplayNames[product.category] || product.category}
//                   </span>
//             </div>
//             </div>
//             <div className="text-[#2d2d2d] text-sm">
//               {isDescriptionExpanded ? (
//                 <div>
//                   <p className="leading-relaxed">{product.description || product.briefDescription || 'No description available'}</p>
//                   <button
//                     onClick={(e) => {
//                       handleInteractiveClick(e);
//                       setIsDescriptionExpanded(false);
//                     }}
//                     className="flex items-center gap-1 text-[#7cc6ee] hover:text-[#7cc6ee]/80 transition-colors mt-2"
//                   >
//                     <span>Read Less</span>
//                     <ChevronUp className="w-4 h-4" />
//                   </button>
//                 </div>
//               ) : (
//                 <div>
//                   <p className="leading-relaxed">{truncateText(product.description || product.briefDescription || 'No description available')}</p>
//                   {(product.description || product.briefDescription) && 
//                    (product.description || product.briefDescription).length > 120 && (
//                     <button
//                       onClick={(e) => {
//                         handleInteractiveClick(e);
//                         setIsDescriptionExpanded(true);
//                       }}
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
//         </div>

//         {/* Footer */}
//         <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
//           <div className="flex flex-col gap-3 sm:gap-4">
         
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
            
//             {/* Pricing Information - Responsive Grid */}
//             {(product.pricingTier || product.freeTrial) && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//                 {product.pricingTier && (
//                   <div>
//                     <p className="text-xs text-[#334155]">Pricing Tier</p>
//                     <p className="text-sm font-medium text-[#1e2556] truncate">
//                       {pricingTierDisplayNames[product.pricingTier] || product.pricingTier}
//                     </p>
//                   </div>
//                 )}
//                 {product.freeTrial && (
//                   <div>
//                     <p className="text-xs text-[#334155]">Free Trial</p>
//                     <p className="text-sm font-medium text-green-600 truncate">
//                       {product.freeTrial}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* CTA Button */}
//             <div
//               className={`flex items-center justify-center gap-2 w-full px-4 py-3 
//                         rounded-lg transition-colors duration-200 text-sm font-medium touch-manipulation ${buttonClass}`}
//             >
//               View Details
//               <IoIosArrowRoundForward className="w-5 h-5" />
//             </div>
//           </div>
//         </div>
//         {/* <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
//           <div className="flex flex-col gap-3 sm:gap-4">
         
//          <ProductBadges productId={product.id} />
        
//           </div>
//         </div> */}
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
import { useRouter } from 'next/navigation';
import { FiShare2 } from 'react-icons/fi';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { ChevronDown, ChevronUp, Star } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import DLScoreBadge from '@/components/DLScoreBadge';

// CATEGORY DISPLAY NAMES
const categoryDisplayNames = {
  'CONTRACT_LIFECYCLE_MANAGEMENT': 'Contract Lifecycle Management',
  'LEGAL_AI': 'Legal AI',
  'DOCUMENT_MANAGEMENT_SYSTEM': 'Document Management System',
  'LITIGATION_MANAGEMENT_AND_ANALYTICS': 'Litigation Management & Analytics',
  'IP_MANAGEMENT': 'Intellectual Property Management',
  'LEGAL_RESEARCH': 'Legal Research',
  'E_DISCOVERY': 'E-Discovery',
  'CASE_MANAGEMENT': 'Case Management',
  'GOVERNANCE_RISK_COMPLIANCE': 'Governance, Risk & Compliance',
  'LEGAL_DUE_DILIGENCE': 'Legal Due Diligence',
  'TIMEKEEPING_SOFTWARE': 'Timekeeping Software',
  'LEGAL_INTAKE_SOFTWARE': 'Legal Intake Software',
  'TRANSACTION_MANAGEMENT_SOFTWARE': 'Transaction Management Software',
};

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

  const router = useRouter();
  const [shareUrl, setShareUrl] = useState('');
  const [tooltip, setTooltip] = useState('');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const isPremium = product.isPremium;
  const cardBgClass = 'bg-[#f5f7fa]';
  console.log(product)

  const buttonClass = isPremium
    ? "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white"
    : "bg-[#1e2556] text-white hover:bg-[#1e2556]/90";

  useEffect(() => {
    setShareUrl(`${window.location.origin}/product/${product.slug}`);
  }, [product.slug]);

  const handleCardClick = () => router.push(`/product/${product.slug}`);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setTooltip("Link copied!");
      setTimeout(() => setTooltip(""), 2000);
    } catch {
      setTooltip("Failed to copy");
      setTimeout(() => setTooltip(""), 2000);
    }
  };

  const truncateText = (text, max = 120) =>
    !text ? "" : text.length > max ? text.substring(0, max) + "..." : text;

  // MULTI-CATEGORY FALLBACK LOGIC
  const categoryList =
    Array.isArray(product.categories) && product.categories.length > 0
      ? product.categories
      : product.category
      ? [product.category]
      : [];
  
  console.log("Categories:", product.categories);
console.log("CategoryList:", categoryList);


  return (
    <div
      onClick={handleCardClick}
      className={`relative rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer ${cardBgClass} ${className}`}
    >
      {/* Compare Badge */}
      {isCompared && (
        <div className="absolute -top-2 -right-2 bg-[#1e2556] text-white text-xs px-3 py-1 rounded-full shadow z-10">
          Selected
        </div>
      )}

      {/* Premium Badge */}
      {isPremium && product.tag && (
        <div className="absolute -top-2 -left-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-3 py-1 text-xs rounded-full shadow z-10 flex items-center gap-1">
          <Star className="w-3 h-3" />
          {product.tag}
        </div>
      )}

      {/* DL SCORE TOP RIGHT */}
      <div className="absolute -top-2 -right-2 z-10">
        <DLScoreBadge productId={product.id} slug={product.slug} size="small" />
      </div>

      {/* MAIN CONTENT */}
      <div className="p-4 sm:p-6">
        {/* HEADER */}
        <div className="flex justify-between items-start gap-4">
          {/* Logo + Title */}
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white shadow overflow-hidden flex items-center justify-center">
              <img
                src={product.logoUrl}
                alt={product.productName}
                className="w-full h-full object-contain p-2"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-[#1e2556] leading-tight break-words">
                {product.productName}
              </h3>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
            {/* SHARE */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <FiShare2 className="w-5 h-5 text-gray-500" />
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Product</DialogTitle>
                  <DialogDescription>Copy shareable link</DialogDescription>
                </DialogHeader>

                <div className="flex gap-2 py-4">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="border px-3 py-2 rounded w-full bg-gray-100 text-sm"
                  />
                  <Button onClick={handleCopyLink}>Copy</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* COMPARE BUTTON */}
            <button
              onClick={() => onCompare(product)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                isCompared ? "bg-blue-50 text-[#7cc6ee]" : "hover:bg-gray-100"
              }`}
            >
              {isCompared ? "Remove" : "Compare"}
            </button>
          </div>
        </div>

        {/* DESCRIPTION AREA */}
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-sm font-medium text-[#334155]">Description</h4>

            {/* MULTI-CATEGORY BADGES */}
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-end">
              {categoryList.map((cat) => (
                <span
                  key={cat}
                  className="px-2 sm:px-3 py-1 bg-blue-50 text-[#1e2556] text-xs rounded-full"
                >
                  {categoryDisplayNames[cat] || cat}
                </span>
              ))}
            </div>
          </div>

          {/* DESCRIPTION TEXT */}
          <div className="text-sm text-[#2d2d2d] leading-relaxed">
            {isDescriptionExpanded ? (
              <>
                {product.description || product.briefDescription}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDescriptionExpanded(false);
                  }}
                  className="flex items-center gap-1 text-[#7cc6ee] mt-2"
                >
                  Read Less <ChevronUp className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                {truncateText(product.description || product.briefDescription)}
                {(product.description || "").length > 120 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDescriptionExpanded(true);
                    }}
                    className="flex items-center gap-1 text-[#7cc6ee] mt-2"
                  >
                    Read More <ChevronDown className="w-4 h-4" />
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-6 border-t pt-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-gray-500">Company</p>
              <p className="font-medium text-[#1e2556]">{product.companyName || "N/A"}</p>
            </div>

            <div>
              <p className="text-xs text-gray-500">Headquarters</p>
              <p className="font-medium text-[#1e2556]">{product.headquarters || "N/A"}</p>
            </div>
          </div>

          {(product.pricingTier || product.freeTrial) && (
            <div className="grid grid-cols-2 gap-4 text-sm mt-4">
              {product.pricingTier && (
                <div>
                  <p className="text-xs text-gray-500">Pricing Tier</p>
                  <p className="font-medium text-[#1e2556]">
                    {pricingTierDisplayNames[product.pricingTier]}
                  </p>
                </div>
              )}

              {product.freeTrial && (
                <div>
                  <p className="text-xs text-gray-500">Free Trial</p>
                  <p className="text-green-600 font-medium">{product.freeTrial}</p>
                </div>
              )}
            </div>
          )}

          {/* VIEW DETAILS */}
          <div
            className={`flex justify-center items-center gap-2 mt-6 py-3 rounded-lg text-sm font-medium ${buttonClass}`}
          >
            View Details <IoIosArrowRoundForward className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* TOOLTIP */}
      {tooltip && (
        <div className="absolute top-4 right-4 bg-black text-white text-xs px-3 py-1 rounded shadow">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default ProductCard;
