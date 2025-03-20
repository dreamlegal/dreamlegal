// "use client"
// import { useState, useEffect } from 'react';
// import { useAuth } from '@/context/authContext';
// import { FaSearch, FaBookmark } from 'react-icons/fa';
// import { IoIosArrowRoundForward } from 'react-icons/io';
// import Link from 'next/link';

// const ClaimProductsPage = () => {
//   const { vendorId, userType } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (!searchTerm.trim()) return;
    
//     setLoading(true);
//     setMessage('');
    
//     try {
//       const response = await fetch('/api/search-product-simple', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ searchTerm })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         setProducts(data.products);
//         if (data.products.length === 0) {
//           setMessage('No products found. Try a different search term.');
//         }
//       } else {
//         setMessage(data.message || 'Failed to search products');
//       }
//     } catch (error) {
//       console.error('Error searching products:', error);
//       setMessage('An error occurred. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const handleClaimProduct = async (productId) => {
//     if (!vendorId) {
//       setMessage('You must be logged in as a vendor to claim products');
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
//         setMessage('Your claim request has been submitted successfully');
//       } else {
//         setMessage(data.message || 'Failed to submit claim request');
//       }
//     } catch (error) {
//       console.error('Error claiming product:', error);
//       setMessage('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-12">
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">Claim Your Products</h1>
//           <p className="text-lg text-gray-600">
//             Search for your products and claim ownership to manage them on our platform.
//           </p>
//         </div>
        
//         {/* Search Bar */}
//         <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 mb-8">
//           <form onSubmit={handleSearch} className="flex gap-4">
//             <div className="relative flex-1">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <FaSearch className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search for your product by name..."
//                 className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
//             >
//               {loading ? 'Searching...' : 'Search'}
//             </button>
//           </form>
//         </div>
        
//         {/* Status Message */}
//         {message && (
//           <div className="mb-6 p-4 rounded-lg bg-blue-50 text-blue-700 text-center">
//             {message}
//           </div>
//         )}
        
//         {/* Search Results */}
//         <div className="space-y-6">
//           {products.map((product) => (
//             <div 
//               key={product.id} 
//               className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
//             >
//               <div className="p-6">
//                 <div className="flex items-start gap-4">
//                   {/* Product Logo */}
//                   <div className="shrink-0">
//                     <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm bg-white border border-gray-200">
//                       <img
//                         src={product.logoUrl}
//                         alt={product.name}
//                         className="w-full h-full object-contain p-2"
//                       />
//                     </div>
//                   </div>
                  
//                   {/* Product Info */}
//                   <div className="flex-1 min-w-0">
//                     <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    
//                     {/* Categories */}
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {product.category && product.category.slice(0, 3).map((cat, index) => (
//                         <span 
//                           key={index} 
//                           className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
//                         >
//                           {cat}
//                         </span>
//                       ))}
//                       {product.category && product.category.length > 3 && (
//                         <span className="text-xs text-gray-500">+{product.category.length - 3} more</span>
//                       )}
//                     </div>
                    
//                     {/* Description */}
//                     <p className="mt-2 text-sm text-gray-600 line-clamp-2">
//                       {product.description || "No description available"}
//                     </p>
                    
//                     {/* Company Info */}
//                     <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
//                       <div>
//                         <span className="text-gray-500">Company:</span>{' '}
//                         <span className="font-medium text-gray-900">
//                           {product.CompanyName || product.company?.companyName || 'N/A'}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-gray-500">Headquarters:</span>{' '}
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
//                     className="flex items-center justify-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                   >
//                     View Product
//                     <IoIosArrowRoundForward className="w-5 h-5" />
//                   </Link>
                  
//                   {product.claimSubmitted ? (
//                     <button
//                       disabled
//                       className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium cursor-default"
//                     >
//                       Claim Requested
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleClaimProduct(product.id)}
//                       className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
//                     >
//                       Claim Product
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
          
//           {/* Empty State (when search is performed but no results) */}
//           {products.length === 0 && searchTerm && !loading && (
//             <div className="text-center py-12 bg-white rounded-xl shadow-md">
//               <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50">
//                 <FaSearch className="w-6 h-6 text-blue-500" />
//               </div>
//               <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
//               <p className="text-gray-600 max-w-md mx-auto">
//                 We couldn't find any products matching your search. Try different keywords or check for typos.
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
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/authContext';
import { FaSearch, FaBookmark, FaCheck } from 'react-icons/fa';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import Link from 'next/link';
import { debounce } from 'lodash';

const ClaimProductsPage = () => {
  const { vendorId, userType } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info'); // 'info', 'success', 'error'

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (!term.trim() || term.length < 2) return;
      
      setLoading(true);
      try {
        const response = await fetch('/api/search-product-simple', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ searchTerm: term })
        });
        
        const data = await response.json();
        
        if (data.success) {
          setProducts(data.products);
          if (data.products.length === 0) {
            showMessage('No products found. Try a different search term.', 'info');
          } else {
            setMessage('');
          }
        } else {
          showMessage(data.message || 'Failed to search products', 'error');
        }
      } catch (error) {
        console.error('Error searching products:', error);
        showMessage('An error occurred. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  // Trigger search when searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() && searchTerm.length >= 2) {
      debouncedSearch(searchTerm);
    } else {
      setProducts([]);
    }
  }, [searchTerm, debouncedSearch]);
  
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
  
  const handleClaimProduct = async (productId) => {
    if (!vendorId) {
      showMessage('You must be logged in as a vendor to claim products', 'error');
      return;
    }
    
    try {
      const response = await fetch('/api/product-claim-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, vendorId })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update the UI to show claim has been submitted
        setProducts(products.map(product => 
          product.id === productId 
            ? { ...product, claimSubmitted: true } 
            : product
        ));
        showMessage('Your claim request has been submitted successfully', 'success');
      } else {
        showMessage(data.message || 'Failed to submit claim request', 'error');
      }
    } catch (error) {
      console.error('Error claiming product:', error);
      showMessage('An error occurred. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-8">
            <span className="text-blue-600">Claim</span> Your Products
          </h1>
          <p className="text-2xl text-gray-800 max-w-4xl mx-auto">
            Discover, claim, and manage your products with ease on our intuitive platform.
          </p>
        </div>
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-6 mb-8 transition-all duration-300 hover:shadow-xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Start typing to search for your product..."
              className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
            />
            {loading && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
          <div className="mt-3 text-center text-sm text-gray-500">
            Enter at least 2 characters to begin searching
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
        {!searchTerm && products.length === 0 && !loading && (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-blue-50">
              <HiOutlineOfficeBuilding className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">Start searching for your products</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Use the search bar above to find and claim products that belong to your company.
            </p>
          </div>
        )}
        
        {/* Search Results */}
        <div className="space-y-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-blue-100"
            >
              <div className="p-6">
                <div className="flex items-start gap-5">
                  {/* Product Logo */}
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm bg-white border border-gray-200 flex items-center justify-center p-2">
                      {product.logoUrl ? (
                        <img
                          src={product.logoUrl}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="bg-blue-50 w-full h-full flex items-center justify-center text-blue-500 font-bold text-xl rounded-lg">
                          {product.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                    
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.category && product.category.slice(0, 3).map((cat, index) => (
                        <span 
                          key={index} 
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
                        >
                          {cat}
                        </span>
                      ))}
                      {product.category && product.category.length > 3 && (
                        <span className="text-xs text-gray-500">+{product.category.length - 3} more</span>
                      )}
                    </div>
                    
                    {/* Description */}
                    <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                      {product.description || "No description available"}
                    </p>
                    
                    {/* Company Info */}
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-1">Company:</span>
                        <span className="font-medium text-gray-900">
                          {product.CompanyName || product.company?.companyName || 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-1">Headquarters:</span>
                        <span className="font-medium text-gray-900">
                          {product.Headquarters || product.company?.headQuaters || 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3">
                  <Link
                    href={`/product/${product.slug}`}
                    target="_blank"
                    className="flex items-center justify-center gap-1 px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    View Product
                    <IoIosArrowRoundForward className="w-5 h-5" />
                  </Link>
                  
                  {product.claimSubmitted ? (
                    <button
                      disabled
                      className="flex items-center justify-center gap-1.5 px-5 py-2.5 bg-green-100 text-green-700 rounded-lg font-medium cursor-default"
                    >
                      <FaCheck className="w-4 h-4" />
                      Claim Requested
                    </button>
                  ) : (
                    <button
                      onClick={() => handleClaimProduct(product.id)}
                      className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Claim Product
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Empty State (when search is performed but no results) */}
          {products.length === 0 && searchTerm.length >= 2 && !loading && (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50">
                <FaSearch className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any products matching "{searchTerm}". Try different keywords or check for typos.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimProductsPage;