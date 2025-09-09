// 'use client';

// import { useState, useEffect } from 'react';
// import { useAuth } from "@/context/authContext";

// interface UserExperienceModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   productId?: string;
//   productName?: string;
//   slug?: string;
//   existingExperience?: {
//     beforeUsing: string;
//     afterUsing: string;
//     recommendationScore: number;
//   } | null;
//   onSuccess?: () => void;
//   showProductSearch?: boolean;
// }

// interface Product {
//   id: string;
//   slug: string;
//   productName: string;
//   companyName: string;
//   logoUrl: string;
// }

// const UserExperienceModal = ({ 
//   isOpen, 
//   onClose, 
//   productId, 
//   productName, 
//   slug,
//   existingExperience,
//   onSuccess,
//   showProductSearch = false 
// }: UserExperienceModalProps) => {
//   const { userId, vendorId } = useAuth();
  
//   const [formData, setFormData] = useState({
//     beforeUsing: '',
//     afterUsing: '',
//     recommendationScore: 5
//   });
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState<Product[]>([]);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isSearching, setIsSearching] = useState(false);

//   // Initialize form with existing experience
//   useEffect(() => {
//     if (existingExperience) {
//       setFormData({
//         beforeUsing: existingExperience.beforeUsing,
//         afterUsing: existingExperience.afterUsing,
//         recommendationScore: existingExperience.recommendationScore
//       });
//     } else {
//       setFormData({
//         beforeUsing: '',
//         afterUsing: '',
//         recommendationScore: 5
//       });
//     }
//   }, [existingExperience, isOpen]);

//   // Set selected product if provided
//   useEffect(() => {
//     if (productId && productName && slug) {
//       setSelectedProduct({
//         id: productId,
//         slug,
//         productName,
//         companyName: '', // Not needed for display
//         logoUrl: ''
//       });
//     }
//   }, [productId, productName, slug]);

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
//       if (showProductSearch) {
//         searchProducts(searchQuery);
//       }
//     }, 300);

//     return () => clearTimeout(timer);
//   }, [searchQuery, showProductSearch]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!userId) {
//       alert('Please login to share your experience');
//       return;
//     }

//     if (vendorId && !userId) {
//       alert('Vendors cannot submit reviews');
//       return;
//     }

//     if (!selectedProduct && showProductSearch) {
//       alert('Please select a product');
//       return;
//     }

//     if (!formData.beforeUsing.trim() || !formData.afterUsing.trim()) {
//       alert('Please fill in all fields');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       const targetSlug = selectedProduct?.slug || slug;
//       const response = await fetch(`/api/software/${targetSlug}/experiences`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId,
//           ...formData
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Experience shared successfully!');
//         onSuccess?.();
//         onClose();
//       } else {
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

//     setIsSubmitting(true);

//     try {
//       const targetSlug = selectedProduct?.slug || slug;
//       const response = await fetch(`/api/software/${targetSlug}/experiences`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert('Experience removed successfully!');
//         onSuccess?.();
//         onClose();
//       } else {
//         alert(data.error || 'Failed to remove experience');
//       }
//     } catch (error) {
//       console.error('Error removing experience:', error);
//       alert('Failed to remove experience');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div 
//         className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity"
//         onClick={onClose}
//       />
      
//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
//         <div 
//           className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto transform transition-all"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="p-6 relative overflow-hidden" style={{ backgroundColor: '#1e2556' }}>
//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
//                     <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-bold text-white">
//                       {existingExperience ? 'Update Your Experience' : 'Share Your Experience'}
//                     </h3>
//                     <p className="text-white/80 text-xs">Help others make informed decisions</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={onClose}
//                   className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
//                 >
//                   <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           {/* Content */}
//           <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Product Search */}
//               {showProductSearch && (
//                 <div>
//                   <label className="block text-sm font-bold mb-2" style={{ color: '#1e2556' }}>
//                     Select Product *
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       placeholder="Search for a product..."
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
//                     />
                    
//                     {isSearching && (
//                       <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                         <div className="animate-spin w-4 h-4 border-2 border-[#7cc6ee] border-t-transparent rounded-full"></div>
//                       </div>
//                     )}
//                   </div>
                  
//                   {/* Search Results */}
//                   {searchResults.length > 0 && (
//                     <div className="mt-2 border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
//                       {searchResults.map((product) => (
//                         <button
//                           key={product.id}
//                           type="button"
//                           onClick={() => {
//                             setSelectedProduct(product);
//                             setSearchQuery(product.productName);
//                             setSearchResults([]);
//                           }}
//                           className="w-full p-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
//                         >
//                           <div className="text-sm">
//                             <div className="font-semibold" style={{ color: '#1e2556' }}>{product.productName}</div>
//                             <div className="text-gray-500">{product.companyName}</div>
//                           </div>
//                         </button>
//                       ))}
//                     </div>
//                   )}
                  
//                   {/* Selected Product Display */}
//                   {selectedProduct && (
//                     <div className="mt-3 p-3 rounded-lg border-2" style={{ borderColor: '#7cc6ee', backgroundColor: '#f0f9ff' }}>
//                       <div className="text-sm">
//                         <div className="font-semibold" style={{ color: '#1e2556' }}>Selected: {selectedProduct.productName}</div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Before Using */}
//               <div>
//                 <label htmlFor="beforeUsing" className="block text-sm font-bold mb-2" style={{ color: '#1e2556' }}>
//                   Before using {selectedProduct?.productName || productName} *
//                 </label>
//                 <textarea
//                   id="beforeUsing"
//                   value={formData.beforeUsing}
//                   onChange={(e) => setFormData({ ...formData, beforeUsing: e.target.value })}
//                   placeholder="Describe your situation, challenges, or workflow before using this product..."
//                   rows={4}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent resize-none"
//                   style={{ color: '#2d2d2d' }}
//                   required
//                 />
//                 <p className="text-xs mt-1" style={{ color: '#334155' }}>
//                   Share the problems you were facing or what prompted you to look for this solution.
//                 </p>
//               </div>

//               {/* After Using */}
//               <div>
//                 <label htmlFor="afterUsing" className="block text-sm font-bold mb-2" style={{ color: '#1e2556' }}>
//                   After using {selectedProduct?.productName || productName} *
//                 </label>
//                 <textarea
//                   id="afterUsing"
//                   value={formData.afterUsing}
//                   onChange={(e) => setFormData({ ...formData, afterUsing: e.target.value })}
//                   placeholder="Describe how the product has impacted your work, what benefits you've seen..."
//                   rows={4}
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent resize-none"
//                   style={{ color: '#2d2d2d' }}
//                   required
//                 />
//                 <p className="text-xs mt-1" style={{ color: '#334155' }}>
//                   Share the improvements, benefits, or changes you've experienced.
//                 </p>
//               </div>

//               {/* Recommendation Score */}
//               <div>
//                 <label className="block text-sm font-bold mb-2" style={{ color: '#1e2556' }}>
//                   How likely are you to recommend this tool to another lawyer or legal team? *
//                 </label>
//                 <div className="space-y-3">
//                   <div className="flex items-center space-x-2">
//                     <input
//                       type="range"
//                       min="1"
//                       max="10"
//                       value={formData.recommendationScore}
//                       onChange={(e) => setFormData({ ...formData, recommendationScore: parseInt(e.target.value) })}
//                       className="flex-1 h-2 rounded-lg appearance-none cursor-pointer"
//                       style={{ 
//                         background: `linear-gradient(to right, #7cc6ee 0%, #7cc6ee ${(formData.recommendationScore - 1) * 11.11}%, #e5e7eb ${(formData.recommendationScore - 1) * 11.11}%, #e5e7eb 100%)`
//                       }}
//                     />
//                   </div>
                  
//                   <div className="flex items-center justify-between text-xs" style={{ color: '#334155' }}>
//                     <span>1 - Not at all likely</span>
//                     <div className="text-center">
//                       <div className="text-2xl font-bold" style={{ color: '#7cc6ee' }}>{formData.recommendationScore}</div>
//                       <div>out of 10</div>
//                     </div>
//                     <span>10 - Extremely likely</span>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
          
//           {/* Footer */}
//           <div className="p-6 border-t border-gray-200 flex justify-between items-center" style={{ backgroundColor: '#f5f7fa' }}>
//             <div>
//               {existingExperience && (
//                 <button
//                   type="button"
//                   onClick={handleDelete}
//                   disabled={isSubmitting}
//                   className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:underline disabled:opacity-50"
//                 >
//                   Delete Experience
//                 </button>
//               )}
//             </div>
            
//             <div className="flex space-x-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
//                 style={{ color: '#334155' }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSubmit}
//                 disabled={isSubmitting || (!selectedProduct && showProductSearch)}
//                 className="px-6 py-2 rounded-md text-sm font-medium text-white transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
//                 style={{ backgroundColor: '#1e2556' }}
//               >
//                 {isSubmitting ? (
//                   <div className="flex items-center space-x-2">
//                     <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
//                     <span>Submitting...</span>
//                   </div>
//                 ) : (
//                   existingExperience ? 'Update Experience' : 'Share Experience'
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserExperienceModal;
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from "@/context/authContext";

interface UserExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
  productName?: string;
  slug?: string;
  existingExperience?: {
    beforeUsing: string;
    afterUsing: string;
    recommendationScore: number;
  } | null;
  onSuccess?: () => void;
  showProductSearch?: boolean;
}

interface Product {
  id: string;
  slug: string;
  productName: string;
  companyName: string;
  logoUrl: string;
}

const UserExperienceModal = ({ 
  isOpen, 
  onClose, 
  productId, 
  productName, 
  slug,
  existingExperience,
  onSuccess,
  showProductSearch = false 
}: UserExperienceModalProps) => {
  const { userId, vendorId } = useAuth();
  
  const [formData, setFormData] = useState({
    beforeUsing: '',
    afterUsing: '',
    recommendationScore: 5
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Initialize form with existing experience
  useEffect(() => {
    if (existingExperience) {
      setFormData({
        beforeUsing: existingExperience.beforeUsing,
        afterUsing: existingExperience.afterUsing,
        recommendationScore: existingExperience.recommendationScore
      });
    } else {
      setFormData({
        beforeUsing: '',
        afterUsing: '',
        recommendationScore: 5
      });
    }
  }, [existingExperience, isOpen]);

  // Set selected product if provided
  useEffect(() => {
    if (productId && productName && slug) {
      setSelectedProduct({
        id: productId,
        slug,
        productName,
        companyName: '', // Not needed for display
        logoUrl: ''
      });
    }
  }, [productId, productName, slug]);

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
      if (showProductSearch) {
        searchProducts(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, showProductSearch]);

  // Dynamic color functions for slider
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      alert('Please login to share your experience');
      return;
    }

    if (vendorId && !userId) {
      alert('Vendors cannot submit reviews');
      return;
    }

    if (!selectedProduct && showProductSearch) {
      alert('Please select a product');
      return;
    }

    if (!formData.beforeUsing.trim() || !formData.afterUsing.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const targetSlug = selectedProduct?.slug || slug;
      const response = await fetch(`/api/software/${targetSlug}/experiences`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...formData
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Experience shared successfully!');
        onSuccess?.();
        onClose();
      } else {
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

    setIsSubmitting(true);

    try {
      const targetSlug = selectedProduct?.slug || slug;
      const response = await fetch(`/api/software/${targetSlug}/experiences`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Experience removed successfully!');
        onSuccess?.();
        onClose();
      } else {
        alert(data.error || 'Failed to remove experience');
      }
    } catch (error) {
      console.error('Error removing experience:', error);
      alert('Failed to remove experience');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 pointer-events-none">
        <div 
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden pointer-events-auto transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 sm:p-6 relative overflow-hidden" style={{ backgroundColor: '#1e2556' }}>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 sm:w-5 h-4 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-bold text-white truncate">
                      {existingExperience ? 'Update Your Experience' : 'Share Your Experience'}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm">Help others make informed decisions</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors flex-shrink-0"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-200px)] sm:max-h-[calc(90vh-180px)]">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Product Search */}
              {showProductSearch && (
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: '#1e2556' }}>
                    Select Product *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for a product..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent text-sm sm:text-base"
                    />
                    
                    {isSearching && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin w-4 h-4 border-2 border-[#7cc6ee] border-t-transparent rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Search Results */}
                  {searchResults.length > 0 && (
                    <div className="mt-2 border border-gray-200 rounded-lg max-h-48 overflow-y-auto">
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => {
                            setSelectedProduct(product);
                            setSearchQuery(product.productName);
                            setSearchResults([]);
                          }}
                          className="w-full p-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                        >
                          <div className="text-sm min-w-0 flex-1">
                            <div className="font-semibold truncate" style={{ color: '#1e2556' }}>{product.productName}</div>
                            <div className="text-gray-500 truncate">{product.companyName}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {/* Selected Product Display */}
                  {selectedProduct && (
                    <div className="mt-3 p-3 rounded-lg border-2" style={{ borderColor: '#7cc6ee', backgroundColor: '#f0f9ff' }}>
                      <div className="text-sm">
                        <div className="font-semibold truncate" style={{ color: '#1e2556' }}>Selected: {selectedProduct.productName}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Before Using */}
              <div>
                <label htmlFor="beforeUsing" className="block text-sm font-bold mb-2" style={{ color: '#1e2556' }}>
                  Before using {selectedProduct?.productName || productName} *
                </label>
                <textarea
                  id="beforeUsing"
                  value={formData.beforeUsing}
                  onChange={(e) => setFormData({ ...formData, beforeUsing: e.target.value })}
                  placeholder="Describe your situation, challenges, or workflow before using this product..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent resize-none text-sm sm:text-base"
                  style={{ color: '#2d2d2d' }}
                  required
                />
                <p className="text-xs mt-1" style={{ color: '#334155' }}>
                  Share the problems you were facing or what prompted you to look for this solution.
                </p>
              </div>

              {/* After Using */}
              <div>
                <label htmlFor="afterUsing" className="block text-sm font-bold mb-2" style={{ color: '#1e2556' }}>
                  After using {selectedProduct?.productName || productName} *
                </label>
                <textarea
                  id="afterUsing"
                  value={formData.afterUsing}
                  onChange={(e) => setFormData({ ...formData, afterUsing: e.target.value })}
                  placeholder="Describe how the product has impacted your work, what benefits you've seen..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent resize-none text-sm sm:text-base"
                  style={{ color: '#2d2d2d' }}
                  required
                />
                <p className="text-xs mt-1" style={{ color: '#334155' }}>
                  Share the improvements, benefits, or changes you've experienced.
                </p>
              </div>

              {/* Enhanced Recommendation Score Slider */}
              <div>
                <label className="block text-sm font-bold mb-3 sm:mb-4" style={{ color: '#1e2556' }}>
                  How likely are you to recommend this tool to another lawyer or legal team? *
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
            </form>
          </div>
          
          {/* Footer */}
          <div className="p-4 sm:p-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0" style={{ backgroundColor: '#f5f7fa' }}>
            <div>
              {existingExperience && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:underline disabled:opacity-50"
                >
                  Delete Experience
                </button>
              )}
            </div>
            
            <div className="flex space-x-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 sm:px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                style={{ color: '#334155' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || (!selectedProduct && showProductSearch)}
                className="flex-1 sm:flex-initial px-4 sm:px-6 py-2 rounded-md text-sm font-medium text-white transition-all duration-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#1e2556' }}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  existingExperience ? 'Update Experience' : 'Share Experience'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserExperienceModal;