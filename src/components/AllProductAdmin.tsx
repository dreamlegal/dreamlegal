// "use client";
// import React, { useEffect, useState } from 'react'
// import AdminProductCard from './AdminProductCard'

// function AllProductAdmin() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
  
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('/api/get-publish-product', {
//           method: 'POST', // Use POST instead of GET
//         });
    
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
    
//         const data = await response.json();
//         setProducts(data.products);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    

//     fetchProducts();
//   }, []); // Empty dependency array means this runs once after the initial render

//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   return (
//     <div>
//       {products.length > 0 ? (
//         products.map((product, index) => (
//           <AdminProductCard key={index} product={product} />
//         ))
//       ) : (
//         <div>No published products available</div>
//       )}
//     </div>
//   )
// }

// export default AllProductAdmin

// "use client";
// import React, { useState, useEffect } from 'react';
// import { Search, Package, Check, Loader2, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';

// const ITEMS_PER_PAGE = 10;

// // Custom Notification Component
// const Notification = ({ message, type, onClose }) => (
//   <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg text-white ${
//     type === 'success' ? 'bg-green-600' : 'bg-red-600'
//   } shadow-lg animate-slide-in`}>
//     <span>{message}</span>
//     <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
//       <X className="w-4 h-4" />
//     </button>
//   </div>
// );

// const AllProductAdmin = () => {
//   // State management
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedProducts, setSelectedProducts] = useState(new Set());
//   const [unpublishingProducts, setUnpublishingProducts] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [searchTimeout, setSearchTimeout] = useState(null);

//   // Show notification helper
//   const showNotification = (message, type = 'success') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 3000);
//   };

//   // Fetch products with pagination
//   const fetchProducts = async (page = 1, search = '') => {
//     try {
//       setLoading(true);
//       const endpoint = search ? '/api/search-published-products' : '/api/get-publish-product';
      
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           page,
//           limit: ITEMS_PER_PAGE,
//           searchTerm: search
//         })
//       });

//       if (!response.ok) throw new Error('Failed to fetch products');

//       const data = await response.json();
      
//       setProducts(data.products);
//       setFilteredProducts(data.products);
//       setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
//       setError(null);
//     } catch (err) {
//       setError('Failed to load products. Please try again.');
//       showNotification('Failed to load products', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle search input changes
//   const handleSearchChange = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     if (searchTimeout) {
//       clearTimeout(searchTimeout);
//     }

//     const newTimeout = setTimeout(() => {
//       setCurrentPage(1);
//       fetchProducts(1, term);
//     }, 300);

//     setSearchTimeout(newTimeout);
//   };

//   // Handle product selection
//   const toggleProductSelection = (productId) => {
//     setSelectedProducts(prev => {
//       const newSelection = new Set(prev);
//       if (newSelection.has(productId)) {
//         newSelection.delete(productId);
//       } else {
//         newSelection.add(productId);
//       }
//       return newSelection;
//     });
//   };

//   // Handle bulk select/deselect
//   const handleSelectAll = () => {
//     if (selectedProducts.size === filteredProducts.length) {
//       setSelectedProducts(new Set());
//     } else {
//       setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
//     }
//   };

//   // Handle bulk unpublish
//   const handleBulkUnpublish = async () => {
//     if (selectedProducts.size === 0) return;
    
//     if (!confirm('Are you sure you want to unpublish the selected products?')) return;
    
//     setUnpublishingProducts(true);
//     try {
//       const response = await fetch('/api/bulk-unpublish-products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ids: Array.from(selectedProducts) })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to unpublish products');
//       }

//       await fetchProducts(currentPage, searchTerm);
//       setSelectedProducts(new Set());
//       showNotification('Selected products have been unpublished successfully');
//     } catch (error) {
//       console.error('Error unpublishing products:', error);
//       showNotification('Failed to unpublish products', 'error');
//     } finally {
//       setUnpublishingProducts(false);
//     }
//   };

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//     fetchProducts(newPage, searchTerm);
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchProducts();
//     return () => {
//       if (searchTimeout) {
//         clearTimeout(searchTimeout);
//       }
//     };
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 p-6">
//       {notification && (
//         <Notification
//           message={notification.message}
//           type={notification.type}
//           onClose={() => setNotification(null)}
//         />
//       )}
      
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="bg-white rounded-2xl border border-blue-100 shadow-xl p-6">
//             <h1 className="text-2xl font-bold text-gray-900 mb-4">
//               Published Products Admin
//             </h1>
            
//             {/* Search and Actions */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search published products..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               <div className="flex gap-2">
//                 <Button
//                   onClick={handleSelectAll}
//                   variant="outline"
//                   className="whitespace-nowrap"
//                 >
//                   {selectedProducts.size === filteredProducts.length 
//                     ? 'Deselect All' 
//                     : 'Select All'}
//                 </Button>

//                 {selectedProducts.size > 0 && (
//                   <Button
//                     onClick={handleBulkUnpublish}
//                     disabled={unpublishingProducts}
//                     variant="destructive"
//                   >
//                     {unpublishingProducts ? (
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     ) : (
//                       <Check className="w-4 h-4 mr-2" />
//                     )}
//                     Unpublish ({selectedProducts.size})
//                   </Button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Products List */}
//         {loading ? (
//           <div className="text-center py-12">
//             <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
//             <p className="text-gray-600">Loading products...</p>
//           </div>
//         ) : error ? (
//           <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
//             {error}
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {filteredProducts.map((product) => (
//               <div 
//                 key={product.id}
//                 className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
//               >
//                 <div className="p-6">
//                   <div className="flex items-center gap-4">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.has(product.id)}
//                       onChange={() => toggleProductSelection(product.id)}
//                       className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
//                     />
//                    <img
//                       src={product.logoUrl}
//                       alt={product.name}
//                       className="h-16 w-16 object-contain rounded-lg"
//                     />
//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         {product.name}
//                       </h3>
//                       <p className="text-sm text-gray-500 mt-1">
//                         {product.description}
//                       </p>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {product.category?.map((cat, idx) => (
//                           <span
//                             key={idx}
//                             className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full"
//                           >
//                             {cat}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="flex gap-2">
//                       <Link
//                         href={`/product/${product.slug}`}
//                         className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//                       >
//                         View
//                       </Link>
//                       <Link
//                         href={`/web-admin/product/${product.id}`}
//                         className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
//                       >
//                         Edit
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             {filteredProducts.length === 0 && (
//               <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
//                 <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">
//                   No products found
//                 </h3>
//                 <p className="text-gray-600">
//                   {searchTerm ? 'Try adjusting your search' : 'No published products available'}
//                 </p>
//               </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex justify-center items-center gap-2 mt-8">
//                 <Button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1 || loading}
//                   className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50"
//                 >
//                   Previous
//                 </Button>

//                 {(() => {
//                   const pageNumbers = [];
//                   let ellipsisAdded = false;

//                   for (let i = 1; i <= totalPages; i++) {
//                     if (
//                       i === 1 ||
//                       i === totalPages ||
//                       (i >= currentPage - 1 && i <= currentPage + 1)
//                     ) {
//                       pageNumbers.push(
//                         <Button
//                           key={i}
//                           onClick={() => handlePageChange(i)}
//                           className={`px-4 py-2 rounded-lg ${
//                             currentPage === i
//                               ? 'bg-blue-600 text-white'
//                               : 'border border-gray-200'
//                           }`}
//                         >
//                           {i}
//                         </Button>
//                       );
//                     } else if (!ellipsisAdded) {
//                       pageNumbers.push(
//                         <span key={`ellipsis-${i}`} className="px-3">
//                           ...
//                         </span>
//                       );
//                       ellipsisAdded = true;
//                     }
//                   }

//                   return pageNumbers;
//                 })()}

//                 <Button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages || loading}
//                   className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50"
//                 >
//                   Next
//                 </Button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes slideIn {
//           from {
//             transform: translateX(100%);
//             opacity: 0;
//           }
//           to {
//             transform: translateX(0);
//             opacity: 1;
//           }
//         }

//         .animate-slide-in {
//           animation: slideIn 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AllProductAdmin;

"use client";
import React, { useState, useEffect } from 'react';
import { Search, Package, Trash2, Check, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ITEMS_PER_PAGE = 10;

// Custom Notification Component
const Notification = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg text-white ${
    type === 'success' ? 'bg-green-600' : 'bg-red-600'
  } shadow-lg animate-slide-in`}>
    <span>{message}</span>
    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
      <X className="w-4 h-4" />
    </button>
  </div>
);

const AllProductAdmin = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [unpublishingProducts, setUnpublishingProducts] = useState(false);
  const [deletingProducts, setDeletingProducts] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  // Show notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch products with pagination
  const fetchProducts = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const endpoint = search ? '/api/search-published-products' : '/api/get-publish-product';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page,
          limit: ITEMS_PER_PAGE,
          searchTerm: search
        })
      });

      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      
      setProducts(data.products);
      setFilteredProducts(data.products);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again.');
      showNotification('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const newTimeout = setTimeout(() => {
      setCurrentPage(1);
      fetchProducts(1, term);
    }, 300);

    setSearchTimeout(newTimeout);
  };

  // Handle product selection
  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(productId)) {
        newSelection.delete(productId);
      } else {
        newSelection.add(productId);
      }
      return newSelection;
    });
  };

  // Handle bulk select/deselect
  const handleSelectAll = () => {
    if (selectedProducts.size === filteredProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
    }
  };

  // Handle bulk unpublish
  const handleBulkUnpublish = async () => {
    if (selectedProducts.size === 0) return;
    
    if (!confirm('Are you sure you want to unpublish the selected products?')) return;
    
    setUnpublishingProducts(true);
    try {
      const response = await fetch('/api/bulk-unpublish-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedProducts) })
      });

      if (!response.ok) {
        throw new Error('Failed to unpublish products');
      }

      await fetchProducts(currentPage, searchTerm);
      setSelectedProducts(new Set());
      showNotification('Selected products have been unpublished successfully');
    } catch (error) {
      console.error('Error unpublishing products:', error);
      showNotification('Failed to unpublish products', 'error');
    } finally {
      setUnpublishingProducts(false);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) return;
    
    if (!confirm('Are you sure you want to delete the selected products? This action cannot be undone.')) return;
    
    setDeletingProducts(true);
    try {
      const response = await fetch('/api/bulk-delete-published', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedProducts) })
      });

      if (!response.ok) {
        throw new Error('Failed to delete products');
      }

      await fetchProducts(currentPage, searchTerm);
      setSelectedProducts(new Set());
      showNotification('Selected products have been deleted successfully');
    } catch (error) {
      console.error('Error deleting products:', error);
      showNotification('Failed to delete products', 'error');
    } finally {
      setDeletingProducts(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchProducts(newPage, searchTerm);
  };

  // Initial fetch
  useEffect(() => {
    fetchProducts();
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 p-6">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl border border-blue-100 shadow-xl p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Published Products Admin
            </h1>
            
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search published products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSelectAll}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  {selectedProducts.size === filteredProducts.length 
                    ? 'Deselect All' 
                    : 'Select All'}
                </Button>

                {selectedProducts.size > 0 && (
                  <>
                    <Button
                      onClick={handleBulkUnpublish}
                      disabled={unpublishingProducts || deletingProducts}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      {unpublishingProducts ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4 mr-2" />
                      )}
                      Unpublish ({selectedProducts.size})
                    </Button>
                    <Button
                      onClick={handleBulkDelete}
                      disabled={deletingProducts || unpublishingProducts}
                      variant="destructive"
                    >
                      {deletingProducts ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 mr-2" />
                      )}
                      Delete ({selectedProducts.size})
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <img
                      src={product.logoUrl}
                      alt={product.name}
                      className="h-16 w-16 object-contain rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {product.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.category?.map((cat, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/product/${product.slug}`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View
                      </Link>
                      <Link
                        href={`/web-admin/product/${product.id}`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Try adjusting your search' : 'No published products available'}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50"
                >
                  Previous
                </Button>

                {(() => {
                  const pageNumbers = [];
                  let ellipsisAdded = false;

                  for (let i = 1; i <= totalPages; i++) {
                    if (
                      i === 1 ||
                      i === totalPages ||
                      (i >= currentPage - 1 && i <= currentPage + 1)
                    ) {
                      pageNumbers.push(
                        <Button
                          key={i}
                          onClick={() => handlePageChange(i)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === i
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-200'
                          }`}
                        >
                          {i}
                        </Button>
                      );
                    } else if (!ellipsisAdded) {
                      pageNumbers.push(
                        <span key={`ellipsis-${i}`} className="px-3">
                          ...
                        </span>
                      );
                      ellipsisAdded = true;
                    }
                  }

                  return pageNumbers;
                })()}

                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                  className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AllProductAdmin;