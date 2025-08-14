
// "use client"
// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { useAuth } from '@/context/authContext';
// import { FaSearch, FaBookmark, FaCheck } from 'react-icons/fa';
// import { IoIosArrowRoundForward } from 'react-icons/io';
// import { HiOutlineOfficeBuilding } from 'react-icons/hi';
// import Link from 'next/link';
// import { debounce } from 'lodash';

// const ClaimProductsPage = () => {
//   // Use a ref to track component mounted state
//   const isMounted = React.useRef(true);
//   const { vendorId, userType, isLoading: authLoading } = useAuth();
  
//   // Handle component unmount
//   useEffect(() => {
//     return () => {
//       isMounted.current = false;
//     };
//   }, []);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('info'); // 'info', 'success', 'error'

//   // Debounced search function
//   const debouncedSearch = useCallback(
//     debounce(async (term) => {
//       if (!term.trim() || term.length < 2) return;
      
//       let isMounted = true;
//       setLoading(true);
      
//       try {
//         const response = await fetch('/api/search-product-simple', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ searchTerm: term })
//         });
        
//         const data = await response.json();
        
//         // Only update state if component is still mounted
//         if (!isMounted) return;
        
//         if (data.success) {
//           setProducts(data.products);
//           if (data.products.length === 0) {
//             showMessage('No products found. Try a different search term.', 'info');
//           } else {
//             setMessage('');
//           }
//         } else {
//           showMessage(data.message || 'Failed to search products', 'error');
//         }
//       } catch (error) {
//         // Only update state if component is still mounted
//         if (isMounted) {
//           console.error('Error searching products:', error);
//           showMessage('An error occurred. Please try again.', 'error');
//         }
//       } finally {
//         // Only update state if component is still mounted
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
      
//       // Attach a cleanup function to the debounced function
//       return () => {
//         isMounted = false;
//       };
//     }, 500),
//     []
//   );

//   // Trigger search when searchTerm changes
//   useEffect(() => {
//     let isActive = true; // Flag to track if component is still mounted
    
//     if (searchTerm.trim() && searchTerm.length >= 2) {
//       debouncedSearch(searchTerm);
//     } else if (isActive) {
//       setProducts([]);
//     }
    
//     // Cleanup function to handle unmounting
//     return () => {
//       isActive = false;
//       debouncedSearch.cancel(); // Cancel any pending debounced searches
//     };
//   }, [searchTerm, debouncedSearch]);
  
//   const showMessage = (text, type = 'info') => {
//     setMessage(text);
//     setMessageType(type);
//     // Auto-hide success messages after 5 seconds
//     if (type === 'success') {
//       const timer = setTimeout(() => {
//         // Check if component is still mounted before updating state
//         setMessage('');
//       }, 5000);
      
//       // Store the timer ID so we can clear it if component unmounts
//       return () => clearTimeout(timer);
//     }
//   };
  
//   const handleClaimProduct = async (productId) => {
//     if (!vendorId) {
//       showMessage('You must be logged in as a vendor to claim products', 'error');
//       return;
//     }
    
//     try {
//       const response = await fetch('/api/product-claim-request', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ productId, vendorId })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         // Update the UI to show claim has been submitted
//         setProducts(products.map(product => 
//           product.id === productId 
//             ? { ...product, claimSubmitted: true } 
//             : product
//         ));
//         showMessage('Your claim request has been submitted successfully', 'success');
//       } else {
//         showMessage(data.message || 'Failed to submit claim request', 'error');
//       }
//     } catch (error) {
//       console.error('Error claiming product:', error);
//       showMessage('An error occurred. Please try again.', 'error');
//     }
//   };

//   // Show loading state while auth is checking
//   if (authLoading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-lg text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-12">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="text-center mb-10">
//           <h1 className="text-5xl font-bold text-gray-900 mb-8">
//             <span className="text-blue-600">Claim</span> Your Products
//           </h1>
//           <p className="text-2xl text-gray-800 max-w-4xl mx-auto">
//             Discover, claim, and manage your products with ease on our intuitive platform.
//           </p>
//         </div>
//         {/* Search Bar */}
//         <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 mb-8 transition-all duration-300 hover:shadow-xl">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
//               <FaSearch className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Start typing to search for your product..."
//               className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
//             />
//             {loading && (
//               <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
//                 <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
//               </div>
//             )}
//           </div>
//           <div className="mt-3 text-center text-sm text-gray-500">
//             Enter at least 2 characters to begin searching
//           </div>
//         </div>
        
//         {/* Status Message */}
//         {message && (
//           <div className={`mb-6 p-4 rounded-lg text-center ${
//             messageType === 'success' ? 'bg-green-50 text-green-700' :
//             messageType === 'error' ? 'bg-red-50 text-red-700' :
//             'bg-blue-50 text-blue-700'
//           }`}>
//             {message}
//           </div>
//         )}
        
//         {/* Initial state - before search */}
//         {!searchTerm && products.length === 0 && !loading && (
//           <div className="text-center py-16 bg-white rounded-xl shadow-md">
//             <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-50">
//               <HiOutlineOfficeBuilding className="w-10 h-10 text-blue-500" />
//             </div>
//             <h3 className="text-xl font-medium text-gray-900 mb-3">Start searching for your products</h3>
//             <p className="text-gray-600 max-w-md mx-auto">
//               Use the search bar above to find and claim products that belong to your company.
//             </p>
//           </div>
//         )}
        
//         {/* Search Results */}
//         <div className="space-y-6">
//           {products.map((product) => (
//             <div 
//               key={product.id} 
//               className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-100"
//             >
//               <div className="p-6">
//                 <div className="flex items-start gap-5">
//                   {/* Product Logo */}
//                   <div className="shrink-0">
//                     <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm bg-white border border-gray-200 flex items-center justify-center p-2">
//                       {product.logoUrl ? (
//                         <img
//                           src={product.logoUrl}
//                           alt={product.name}
//                           className="w-full h-full object-contain"
//                         />
//                       ) : (
//                         <div className="bg-blue-50 w-full h-full flex items-center justify-center text-blue-500 font-bold text-xl rounded-lg">
//                           {product.name.charAt(0)}
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   {/* Product Info */}
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                    
//                     {/* Categories */}
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {product.category && product.category.slice(0, 3).map((cat, index) => (
//                         <span 
//                           key={index} 
//                           className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
//                         >
//                           {cat}
//                         </span>
//                       ))}
//                       {product.category && product.category.length > 3 && (
//                         <span className="text-xs text-gray-500">+{product.category.length - 3} more</span>
//                       )}
//                     </div>
                    
//                     {/* Description */}
//                     <p className="mt-3 text-sm text-gray-600 line-clamp-2">
//                       {product.description || "No description available"}
//                     </p>
                    
//                     {/* Company Info */}
//                     <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
//                       <div className="flex items-center">
//                         <span className="text-gray-500 mr-1">Company:</span>
//                         <span className="font-medium text-gray-900">
//                           {product.CompanyName || product.company?.companyName || 'N/A'}
//                         </span>
//                       </div>
//                       <div className="flex items-center">
//                         <span className="text-gray-500 mr-1">Headquarters:</span>
//                         <span className="font-medium text-gray-900">
//                           {product.Headquarters || product.company?.headQuaters || 'N/A'}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Actions */}
//                 <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
//                   <Link
//                     href={`/product/${product.slug}`}
//                     target="_blank"
//                     className="flex items-center justify-center gap-1 px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                   >
//                     View Product
//                     <IoIosArrowRoundForward className="w-5 h-5" />
//                   </Link>
                  
//                   {product.claimSubmitted ? (
//                     <button
//                       disabled
//                       className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-green-100 text-green-700 rounded-lg font-medium cursor-default"
//                     >
//                       <FaCheck className="w-4 h-4" />
//                       Claim Requested
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleClaimProduct(product.id)}
//                       className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                     >
//                       Claim Product
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
          
//           {/* Empty State (when search is performed but no results) */}
//           {products.length === 0 && searchTerm.length >= 2 && !loading && (
//             <div className="text-center py-12 bg-white rounded-xl shadow-md">
//               <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50">
//                 <FaSearch className="w-6 h-6 text-blue-500" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
//               <p className="text-gray-600 max-w-md mx-auto">
//                 We couldn't find any products matching "{searchTerm}". Try different keywords or check for typos.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClaimProductsPage;
"use client"
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/context/authContext';
import { FaSearch, FaBookmark, FaCheck } from 'react-icons/fa';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import Link from 'next/link';

// Custom debounce hook with debugging
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);
  
  return useCallback((...args) => {
    console.log('🎯 useDebounce called with args:', args);
    
    if (timeoutRef.current) {
      console.log('⏰ Clearing existing timeout');
      clearTimeout(timeoutRef.current);
    }
    
    console.log(`⏱️ Setting new timeout for ${delay}ms`);
    timeoutRef.current = setTimeout(() => {
      console.log('🚀 Timeout executed, calling callback');
      callback(...args);
    }, delay);
  }, [callback, delay]);
};

const ClaimLegalSoftwarePage = () => {
  const { vendorId, userType, isLoading: authLoading } = useAuth();
  
  // Debug auth
  useEffect(() => {
    console.log('🔍 Auth Debug:', {
      vendorId,
      userType,
      authLoading,
      vendorIdType: typeof vendorId
    });
  }, [vendorId, userType, authLoading]);

  const [searchTerm, setSearchTerm] = useState('');
  const [legalSoftware, setLegalSoftware] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info'); // 'info', 'success', 'error'
  const [useManualSearch, setUseManualSearch] = useState(false); // Toggle between auto and manual search

  // Search function with detailed debugging
  const searchLegalSoftware = async (term) => {
    console.log('🚀 searchLegalSoftware called with term:', term);
    
    if (!term.trim() || term.length < 2) {
      console.log('❌ Search term too short, returning early');
      setLegalSoftware([]);
      setMessage('');
      return;
    }
    
    console.log('✅ Making API call to /api/claim/search');
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/claim/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchTerm: term })
      });
      
      console.log('📡 API Response status:', response.status);
      const data = await response.json();
      console.log('📡 API Response data:', data);
      
      if (data.success) {
        let softwareList = data.legalSoftware;
        console.log('✅ Found software:', softwareList.length);
        
        // Check for existing claims if vendor is logged in
        if (vendorId && softwareList.length > 0) {
          console.log('🔍 Checking existing claims for vendor:', vendorId);
          try {
            const claimsResponse = await fetch('/api/claim/check', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                vendorId, 
                legalSoftwareIds: softwareList.map(s => s.id) 
              })
            });
            
            const claimsData = await claimsResponse.json();
            console.log('📡 Claims check response:', claimsData);
            
            if (claimsData.success) {
              // Mark software as claimed if there's an existing claim
              softwareList = softwareList.map(software => ({
                ...software,
                claimSubmitted: !!claimsData.claims[software.id],
                claimStatus: claimsData.claims[software.id] || null
              }));
            }
          } catch (claimsError) {
            console.error('❌ Error checking claims:', claimsError);
          }
        }
        
        setLegalSoftware(softwareList);
        if (softwareList.length === 0) {
          showMessage('No legal software found. Try a different search term.', 'info');
        }
      } else {
        console.log('❌ API returned error:', data.message);
        showMessage(data.message || 'Failed to search legal software', 'error');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      showMessage('An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = useDebounce((term) => {
    console.log('⏱️ Debounced search executing for term:', term);
    searchLegalSoftware(term);
  }, 500);

  // Manual search function (triggered by button)
  const handleManualSearch = () => {
    console.log('🔍 Manual search triggered');
    searchLegalSoftware(searchTerm);
  };

  // Trigger search when searchTerm changes (only if auto-search is enabled)
  useEffect(() => {
    console.log('🔄 useEffect triggered - searchTerm changed:', {
      searchTerm,
      length: searchTerm.length,
      trimmed: searchTerm.trim(),
      trimmedLength: searchTerm.trim().length,
      useManualSearch,
      condition: searchTerm.trim() && searchTerm.length >= 2 && !useManualSearch
    });
    
    if (!useManualSearch) {
      if (searchTerm.trim() && searchTerm.length >= 2) {
        console.log('✅ Calling debouncedSearch');
        debouncedSearch(searchTerm);
      } else {
        console.log('🧹 Clearing software list');
        setLegalSoftware([]);
        setMessage('');
      }
    }
  }, [searchTerm, debouncedSearch, useManualSearch]);

  // Handle input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    console.log('📝 Input changed to:', value);
    setSearchTerm(value);
  };

  // Handle Enter key press for manual search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && useManualSearch) {
      handleManualSearch();
    }
  };
  
  const showMessage = (text, type = 'info') => {
    setMessage(text);
    setMessageType(type);
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };
  
  const handleClaimLegalSoftware = async (legalSoftwareId) => {
    if (!vendorId) {
      showMessage('You must be logged in as a vendor to claim legal software', 'error');
      return;
    }
    
    try {
      const response = await fetch('/api/claim/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ legalSoftwareId, vendorId })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update the UI to show claim has been submitted
        setLegalSoftware(legalSoftware.map(software => 
          software.id === legalSoftwareId 
            ? { ...software, claimSubmitted: true, claimStatus: 'pending' } 
            : software
        ));
        showMessage('Your claim request has been submitted successfully', 'success');
      } else {
        showMessage(data.message || 'Failed to submit claim request', 'error');
      }
    } catch (error) {
      console.error('Error claiming legal software:', error);
      showMessage('An error occurred. Please try again.', 'error');
    }
  };

  // Get pricing tier display
  const getPricingTierDisplay = (tier) => {
    switch (tier) {
      case 'BUDGET': return '$';
      case 'MID_RANGE': return '$$';
      case 'PREMIUM': return '$$$';
      case 'ENTERPRISE': return '$$$+';
      default: return 'N/A';
    }
  };

  // Get category display
  const getCategoryDisplay = (category) => {
    return category?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'N/A';
  };

  // Test API function
  const testAPI = async () => {
    console.log('🧪 Testing API...');
    try {
      const response = await fetch('/api/claim/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchTerm: 'test' })
      });
      const data = await response.json();
      console.log('🧪 API Test Response:', data);
      alert(`API Test: ${data.success ? 'Success' : 'Failed'} - Check console for details`);
    } catch (error) {
      console.error('🧪 API Test Error:', error);
      alert('API Test Failed - Check console for details');
    }
  };

  // Show loading state while auth is checking
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">
            <span className="text-blue-600">Claim</span> Your Legal Software
          </h1>
          <p className="text-2xl text-gray-800 max-w-4xl mx-auto">
            Discover, claim, and manage your legal software products with ease on our intuitive platform.
          </p>
        </div>

        {/* Debug Panel - Remove this in production */}
        {/* <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-yellow-800 mb-2">Debug Panel (Remove in production)</h3>
          <div className="text-sm text-yellow-700 space-y-2">
            <p>Vendor ID: {vendorId || 'null'}</p>
            <p>User Type: {userType || 'null'}</p>
            <p>Search Term: "{searchTerm}"</p>
            <p>Results Count: {legalSoftware.length}</p>
            <p>Loading: {loading ? 'Yes' : 'No'}</p>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={testAPI}
                className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
              >
                Test API
              </button>
              <button 
                onClick={() => setUseManualSearch(!useManualSearch)}
                className={`px-3 py-1 rounded text-sm ${
                  useManualSearch 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                {useManualSearch ? 'Manual Search ON' : 'Auto Search ON'}
              </button>
            </div>
          </div>
        </div> */}

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 mb-8 transition-all duration-300 hover:shadow-xl">
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder="Start typing to search for your legal software..."
                className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
              />
              {loading && (
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
            
            {/* Search Button (always visible but more prominent in manual mode) */}
            <button
              onClick={handleManualSearch}
              disabled={loading || searchTerm.trim().length < 2}
              className={`px-6 py-4 rounded-lg font-medium transition-colors ${
                useManualSearch
                  ? 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:bg-gray-100'
              } disabled:cursor-not-allowed`}
            >
              <FaSearch className="w-4 h-4" />
            </button>
          </div>
          
          <div className="mt-3 text-center text-sm text-gray-500">
            {useManualSearch ? (
              <>Enter at least 2 characters and click search or press Enter</>
            ) : (
              <>Enter at least 2 characters to begin searching automatically</>
            )}
          </div>
        </div>
        
        {/* Status Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center ${
            messageType === 'success' ? 'bg-green-50 text-green-700' :
            messageType === 'error' ? 'bg-red-50 text-red-700' :
            'bg-blue-50 text-blue-700'
          }`}>
            {message}
          </div>
        )}
        
        {/* Initial state - before search */}
        {!searchTerm && legalSoftware.length === 0 && !loading && (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-50">
              <HiOutlineOfficeBuilding className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">Start searching for your legal software</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Use the search bar above to find and claim legal software products that belong to your company.
            </p>
          </div>
        )}
        
        {/* Search Results */}
        <div className="space-y-6">
          {legalSoftware.map((software) => (
            <div 
              key={software.id} 
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-100"
            >
              <div className="p-6">
                <div className="flex items-start gap-5">
                  {/* Software Logo */}
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm bg-white border border-gray-200 flex items-center justify-center p-2">
                      {software.logoUrl ? (
                        <img
                          src={software.logoUrl}
                          alt={software.productName}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="bg-blue-50 w-full h-full flex items-center justify-center text-blue-500 font-bold text-xl rounded-lg">
                          {software.productName.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Software Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900">{software.productName}</h3>
                    
                    {/* Category and Pricing */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {getCategoryDisplay(software.category)}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        {getPricingTierDisplay(software.pricingTier)}
                        {software.startingPrice && ` - Starting at ${software.startingPrice}`}
                      </span>
                    </div>
                    
                    {/* Description */}
                    <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                      {software.description || software.briefDescription || "No description available"}
                    </p>

                    {/* Core Functionalities */}
                    {software.coreFunctionalities && software.coreFunctionalities.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {software.coreFunctionalities.slice(0, 3).map((func, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-700"
                            >
                              {func}
                            </span>
                          ))}
                          {software.coreFunctionalities.length > 3 && (
                            <span className="text-xs text-gray-500">+{software.coreFunctionalities.length - 3} more</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Company Info */}
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-1">Company:</span>
                        <span className="font-medium text-gray-900">
                          {software.companyName || 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-1">Headquarters:</span>
                        <span className="font-medium text-gray-900">
                          {software.headquarters || 'N/A'}
                        </span>
                      </div>
                      {software.founded && (
                        <div className="flex items-center">
                          <span className="text-gray-500 mr-1">Founded:</span>
                          <span className="font-medium text-gray-900">
                            {software.founded}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
                  {software.slug && (
                    <Link
                      href={`/legal-software/${software.slug}`}
                      target="_blank"
                      className="flex items-center justify-center gap-1 px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      View Software
                      <IoIosArrowRoundForward className="w-5 h-5" />
                    </Link>
                  )}
                  
                  {software.website && (
                    <a
                      href={software.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      Visit Website
                      <IoIosArrowRoundForward className="w-5 h-5" />
                    </a>
                  )}
                  
                  {software.claimSubmitted ? (
                    <button
                      disabled
                      className={`flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg font-medium cursor-default ${
                        software.claimStatus === 'approved' 
                          ? 'bg-green-100 text-green-700' 
                          : software.claimStatus === 'rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      <FaCheck className="w-4 h-4" />
                      {software.claimStatus === 'approved' 
                        ? 'Claim Approved' 
                        : software.claimStatus === 'rejected'
                        ? 'Claim Rejected'
                        : 'Claim Pending'
                      }
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClaimLegalSoftware(software.id)}
                      className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Claim Software
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty State (when search is performed but no results) */}
          {legalSoftware.length === 0 && searchTerm.length >= 2 && !loading && message && (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50">
                <FaSearch className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No legal software found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any legal software matching "{searchTerm}". Try different keywords or check for typos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimLegalSoftwarePage;