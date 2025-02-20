// "use client";
// import React, { useEffect, useState } from 'react'
// import NewProductAdminCard from './NewProductAdminCard'

// function NewProductAdmin() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
    
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('/api/get-new-products', {
//           method: 'POST', // Change the method to POST
//           headers: {
//             'Content-Type': 'application/json', // Set the content type
//           },
//           body: JSON.stringify({}) // Send an empty body if no parameters are needed
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
//   }, []); 

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {products.length > 0 ? (
//         products.map((product, index) => (
//           <NewProductAdminCard key={index} product={product} />
//         ))
//       ) : (
//         <div>No new products</div>
//       )}
//     </div>
//   )
// }

// export default NewProductAdmin
// import React, { useState, useEffect } from 'react';
// import { Search, Package, Trash2, Check, Loader2, X } from 'lucide-react';
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

// const NewProductAdmin = () => {
//   // State management
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedProducts, setSelectedProducts] = useState(new Set());
//   const [processingAction, setProcessingAction] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [searchTimeout, setSearchTimeout] = useState(null);

//   // Show notification helper
//   const showNotification = (message, type = 'success') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 3000);
//   };

//   // Custom debounced search function
//   const handleSearch = (term) => {
//     if (searchTimeout) {
//       clearTimeout(searchTimeout);
//     }

//     const newTimeout = setTimeout(async () => {
//       try {
//         const response = await fetch('/api/search-draft-products', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ 
//             searchTerm: term,
//             page: 1,
//             limit: ITEMS_PER_PAGE,
//           })
//         });
        
//         if (!response.ok) throw new Error('Search failed');
        
//         const data = await response.json();
//         setFilteredProducts(data.products);
//         setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
//         setCurrentPage(1);
//       } catch (err) {
//         setError('Search failed. Please try again.');
//         showNotification('Failed to search products', 'error');
//       }
//     }, 300);

//     setSearchTimeout(newTimeout);
//   };

//   // Fetch products with pagination
//   const fetchProducts = async (page = 1) => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/get-new-products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           page,
//           limit: ITEMS_PER_PAGE,
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
//     if (term) {
//       handleSearch(term);
//     } else {
//       setFilteredProducts(products);
//       setCurrentPage(1);
//     }
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

//   // Handle bulk publish
//   const handleBulkPublish = async () => {
//     if (selectedProducts.size === 0) return;
    
//     setProcessingAction(true);
//     try {
//       const response = await fetch('/api/bulk-publish-products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ids: Array.from(selectedProducts) })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to publish products');
//       }

//       await fetchProducts(currentPage);
//       setSelectedProducts(new Set());
//       showNotification('Selected products have been published successfully');
//     } catch (error) {
//       console.error('Error publishing products:', error);
//       showNotification('Failed to publish products', 'error');
//     } finally {
//       setProcessingAction(false);
//     }
//   };

//   // Handle bulk delete
//   const handleBulkDelete = async () => {
//     if (selectedProducts.size === 0) return;
    
//     if (!confirm('Are you sure you want to delete the selected products?')) return;
    
//     setProcessingAction(true);
//     try {
//       const response = await fetch('/api/bulk-delete-products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ids: Array.from(selectedProducts) })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete products');
//       }

//       await fetchProducts(currentPage);
//       setSelectedProducts(new Set());
//       showNotification('Selected products have been deleted successfully');
//     } catch (error) {
//       console.error('Error deleting products:', error);
//       showNotification('Failed to delete products', 'error');
//     } finally {
//       setProcessingAction(false);
//     }
//   };

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//     fetchProducts(newPage);
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
//               New Products Admin
//             </h1>
            
//             {/* Search and Actions */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               {selectedProducts.size > 0 && (
//                 <div className="flex gap-2">
//                   <Button
//                     onClick={handleBulkPublish}
//                     disabled={processingAction}
//                     className="bg-green-600 hover:bg-green-700"
//                   >
//                     {processingAction ? (
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     ) : (
//                       <Check className="w-4 h-4 mr-2" />
//                     )}
//                     Publish ({selectedProducts.size})
//                   </Button>
//                   <Button
//                     onClick={handleBulkDelete}
//                     disabled={processingAction}
//                     variant="destructive"
//                   >
//                     {processingAction ? (
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     ) : (
//                       <Trash2 className="w-4 h-4 mr-2" />
//                     )}
//                     Delete ({selectedProducts.size})
//                   </Button>
//                 </div>
//               )}
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
//                     <img
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
//                   {searchTerm ? 'Try adjusting your search' : 'No new products to review'}
//                 </p>
//               </div>
//             )}

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex justify-center gap-2 mt-8">
//                 <Button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   variant="outline"
//                 >
//                   Previous
//                 </Button>
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                   <Button
//                     key={page}
//                     onClick={() => handlePageChange(page)}
//                     variant={currentPage === page ? "default" : "outline"}
//                   >
//                     {page}
//                   </Button>
//                 ))}
//                 <Button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   variant="outline"
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

// export default NewProductAdmin;

// import React, { useState, useEffect } from 'react';
// import { Search, Package, Trash2, Check, Loader2, X } from 'lucide-react';
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

// const NewProductAdmin = () => {
//   // State management
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedProducts, setSelectedProducts] = useState(new Set());
//   const [processingAction, setProcessingAction] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [searchTimeout, setSearchTimeout] = useState(null);

//   // Show notification helper
//   const showNotification = (message, type = 'success') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 3000);
//   };

//   // Custom debounced search function
//   const handleSearch = (term) => {
//     if (searchTimeout) {
//       clearTimeout(searchTimeout);
//     }

//     const newTimeout = setTimeout(() => {
//       setCurrentPage(1);
//       fetchProducts(1, term);
//     }, 300);

//     setSearchTimeout(newTimeout);
//   };

//   // Fetch products with pagination
//   const fetchProducts = async (page = 1, search = "") => {
//     try {
//       setLoading(true);
//       const endpoint = search ? '/api/search-draft-products' : '/api/get-new-products';
      
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
//     if (term) {
//       handleSearch(term);
//     } else {
//       setFilteredProducts(products);
//       setCurrentPage(1);
//     }
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

//   // Handle bulk publish
//   const handleBulkPublish = async () => {
//     if (selectedProducts.size === 0) return;
    
//     setProcessingAction(true);
//     try {
//       const response = await fetch('/api/bulk-publish-products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ids: Array.from(selectedProducts) })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to publish products');
//       }

//       await fetchProducts(currentPage);
//       setSelectedProducts(new Set());
//       showNotification('Selected products have been published successfully');
//     } catch (error) {
//       console.error('Error publishing products:', error);
//       showNotification('Failed to publish products', 'error');
//     } finally {
//       setProcessingAction(false);
//     }
//   };

//   // Handle bulk delete
//   const handleBulkDelete = async () => {
//     if (selectedProducts.size === 0) return;
    
//     if (!confirm('Are you sure you want to delete the selected products?')) return;
    
//     setProcessingAction(true);
//     try {
//       const response = await fetch('/api/bulk-delete-products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ids: Array.from(selectedProducts) })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete products');
//       }

//       await fetchProducts(currentPage);
//       setSelectedProducts(new Set());
//       showNotification('Selected products have been deleted successfully');
//     } catch (error) {
//       console.error('Error deleting products:', error);
//       showNotification('Failed to delete products', 'error');
//     } finally {
//       setProcessingAction(false);
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
//               New Products Admin
//             </h1>
            
//             {/* Search and Actions */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               {selectedProducts.size > 0 && (
//                 <div className="flex gap-2">
//                   <Button
//                     onClick={handleBulkPublish}
//                     disabled={processingAction}
//                     className="bg-green-600 hover:bg-green-700"
//                   >
//                     {processingAction ? (
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     ) : (
//                       <Check className="w-4 h-4 mr-2" />
//                     )}
//                     Publish ({selectedProducts.size})
//                   </Button>
//                   <Button
//                     onClick={handleBulkDelete}
//                     disabled={processingAction}
//                     variant="destructive"
//                   >
//                     {processingAction ? (
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     ) : (
//                       <Trash2 className="w-4 h-4 mr-2" />
//                     )}
//                     Delete ({selectedProducts.size})
//                   </Button>
//                 </div>
//               )}
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
//                     <img
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
//                   {searchTerm ? 'Try adjusting your search' : 'No new products to review'}
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

// export default NewProductAdmin;
// import React, { useState, useEffect } from 'react';
// import { Search, Package, Trash2, Check, Loader2, X } from 'lucide-react';
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

// const NewProductAdmin = () => {
//   // State management
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selectedProducts, setSelectedProducts] = useState(new Set());
//   const [processingAction, setProcessingAction] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [searchTimeout, setSearchTimeout] = useState(null);

//   // Show notification helper
//   const showNotification = (message, type = 'success') => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 3000);
//   };

//   // Custom debounced search function
//   const handleSearch = (term) => {
//     if (searchTimeout) {
//       clearTimeout(searchTimeout);
//     }

//     const newTimeout = setTimeout(() => {
//       setCurrentPage(1);
//       fetchProducts(1, term);
//     }, 300);

//     setSearchTimeout(newTimeout);
//   };

//   // Fetch products with pagination
//   const fetchProducts = async (page = 1, search = "") => {
//     try {
//       setLoading(true);
//       const endpoint = search ? '/api/search-draft-products' : '/api/get-new-products';
      
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
//       // Reset to first page when searching
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

//   // Handle bulk publish
//   const handleBulkPublish = async () => {
//     if (selectedProducts.size === 0) return;
    
//     setProcessingAction(true);
//     try {
//       const response = await fetch('/api/bulk-publish-products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ids: Array.from(selectedProducts) })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to publish products');
//       }

//       await fetchProducts(currentPage);
//       setSelectedProducts(new Set());
//       showNotification('Selected products have been published successfully');
//     } catch (error) {
//       console.error('Error publishing products:', error);
//       showNotification('Failed to publish products', 'error');
//     } finally {
//       setProcessingAction(false);
//     }
//   };

//   // Handle bulk delete
//   const handleBulkDelete = async () => {
//     if (selectedProducts.size === 0) return;
    
//     if (!confirm('Are you sure you want to delete the selected products?')) return;
    
//     setProcessingAction(true);
//     try {
//       const response = await fetch('/api/bulk-delete-products', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ids: Array.from(selectedProducts) })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to delete products');
//       }

//       await fetchProducts(currentPage);
//       setSelectedProducts(new Set());
//       showNotification('Selected products have been deleted successfully');
//     } catch (error) {
//       console.error('Error deleting products:', error);
//       showNotification('Failed to delete products', 'error');
//     } finally {
//       setProcessingAction(false);
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
//               New Products Admin
//             </h1>
            
//             {/* Search and Actions */}
//             <div className="flex flex-col sm:flex-row gap-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//               </div>

//               {selectedProducts.size > 0 && (
//                 <div className="flex gap-2">
//                   <Button
//                     onClick={handleBulkPublish}
//                     disabled={processingAction}
//                     className="bg-green-600 hover:bg-green-700"
//                   >
//                     {processingAction ? (
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     ) : (
//                       <Check className="w-4 h-4 mr-2" />
//                     )}
//                     Publish ({selectedProducts.size})
//                   </Button>
//                   <Button
//                     onClick={handleBulkDelete}
//                     disabled={processingAction}
//                     variant="destructive"
//                   >
//                     {processingAction ? (
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                     ) : (
//                       <Trash2 className="w-4 h-4 mr-2" />
//                     )}
//                     Delete ({selectedProducts.size})
//                   </Button>
//                 </div>
//               )}
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
//                     <img
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
//                   {searchTerm ? 'Try adjusting your search' : 'No new products to review'}
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

// export default NewProductAdmin;
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

const NewProductAdmin = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [publishingProducts, setPublishingProducts] = useState(false);
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
      const endpoint = search ? '/api/search-draft-products' : '/api/get-new-products';
      
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
      
      // Only update products for current page
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
      // Reset to first page when searching
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
      // If all are selected, deselect all
      setSelectedProducts(new Set());
    } else {
      // Select all products on current page
      setSelectedProducts(new Set(filteredProducts.map(p => p.id)));
    }
  };

  // Handle bulk publish
  const handleBulkPublish = async () => {
    if (selectedProducts.size === 0) return;
    
    setPublishingProducts(true);
    try {
      const response = await fetch('/api/bulk-publish-products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedProducts) })
      });

      if (!response.ok) {
        throw new Error('Failed to publish products');
      }

      await fetchProducts(currentPage, searchTerm);
      setSelectedProducts(new Set());
      showNotification('Selected products have been published successfully');
    } catch (error) {
      console.error('Error publishing products:', error);
      showNotification('Failed to publish products', 'error');
    } finally {
      setPublishingProducts(false);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) return;
    
    if (!confirm('Are you sure you want to delete the selected products?')) return;
    
    setDeletingProducts(true);
    try {
      const response = await fetch('/api/bulk-delete-products', {
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
              New Products Admin
            </h1>
            
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
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
                      onClick={handleBulkPublish}
                      disabled={publishingProducts || deletingProducts}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {publishingProducts ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4 mr-2" />
                      )}
                      Publish ({selectedProducts.size})
                    </Button>
                    <Button
                      onClick={handleBulkDelete}
                      disabled={deletingProducts || publishingProducts}
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
                  {searchTerm ? 'Try adjusting your search' : 'No new products to review'}
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

        animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NewProductAdmin;