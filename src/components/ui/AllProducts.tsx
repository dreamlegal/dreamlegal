// "use client";

// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { UserCircle2, Package, RefreshCw, AlertCircle, Search, Grid, List } from "lucide-react";
// import VendorProductCard from "../VendorProductCard";
// import { useAuth } from '@/context/authContext';
// const AllProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [refreshing, setRefreshing] = useState(false);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
//   const { vendorId, userType } = useAuth();
//   const userId = vendorId;
//   console.log(userId)
// // State declarations should be at the top level of your component

// const fetchProducts = async () => {
//   // Reset error state before new fetch attempt
//   setError(null);
//   setRefreshing(true);
  
//   // Return early if no vendorId is available
//   if (!vendorId) {
//     setError("Vendor ID is required");
//     setLoading(false);
//     setRefreshing(false);
//     return;
//   }

//   try {
//     const response = await fetch("/api/vendor-products", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId: vendorId }),
//     });
    
//     const data = await response.json();
    
//     if (!response.ok) {
//       throw new Error(data.msg || "Failed to fetch products");
//     }
    
//     setProducts(data.products || []);
//   } catch (error) {
//     setError(error.message || "An error occurred while fetching the products");
//     setProducts([]); // Reset products on error
//   } finally {
//     setLoading(false);
//     setRefreshing(false);
//   }
// };

// useEffect(() => {
//   fetchProducts();
// }, [vendorId]); // Add vendorId as dependency

 
 

//   if (loading) {
//     return (
//       <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
//         <div className="w-16 h-16 mb-6 relative">
//           <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin"></div>
//           <Package className="w-8 h-8 text-indigo-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
//         </div>
//         <p className="text-gray-600 animate-pulse">Loading products...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
//         <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
//           <AlertCircle className="w-8 h-8 text-red-500" />
//         </div>
//         <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h2>
//         <p className="text-gray-600 mb-6">{error}</p>
//         <button
//           onClick={fetchProducts}
//           className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 
//                    font-medium hover:bg-gray-50 transition-all duration-200 
//                    hover:border-gray-300 hover:shadow-md active:scale-95"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   if (!products || products.length === 0) {
//     return (
//       <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
//         <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
//           <Package className="w-8 h-8 text-gray-400" />
//         </div>
//         <h2 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h2>
//         <p className="text-gray-600">Start by adding your first product.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Enhanced Header Section */}
//       <div className="relative">
//         <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-50 rounded-3xl"></div>
//         <div className="relative px-8 py-6 rounded-3xl border border-gray-100/80 backdrop-blur-xl shadow-xl shadow-indigo-200/10">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold">
//                 <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                   Your Products
//                 </span>
//               </h1>
//               <p className="mt-2 text-gray-600">
//                 Manage and monitor all your products in one place
//               </p>
//             </div>

           
            
//             <div className="flex items-center gap-4">
//               {/* Search Box */}
//               <div className="relative group">
//                 <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Search products..."
//                     className="pl-10 pr-4 py-2 w-64 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
//                   />
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 </div>
//               </div>

//               {/* View Toggle */}
//               <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded-lg transition-all duration-200 ${
//                     viewMode === 'grid'
//                       ? 'bg-white text-indigo-600 shadow-sm'
//                       : 'text-gray-600 hover:text-indigo-600'
//                   }`}
//                 >
//                   <Grid className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded-lg transition-all duration-200 ${
//                     viewMode === 'list'
//                       ? 'bg-white text-indigo-600 shadow-sm'
//                       : 'text-gray-600 hover:text-indigo-600'
//                   }`}
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Refresh Button */}
//               <button
//                 onClick={fetchProducts}
//                 disabled={refreshing}
//                 className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600
//                          bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-200 
//                          active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
//                 Refresh
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Products Grid */}
//       <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//         {products.map((product) => (
//           <VendorProductCard 
          
//           key={product.id}
//                     id={product.id}
//                     image={product.logoUrl}
//                     title={product.name}
//                     description={product.description}
//                     userId={userId}
          
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllProducts;
// "use client";

// import React, { useEffect, useState } from "react";
// import { Package, RefreshCw, AlertCircle, Search, Grid, List } from "lucide-react";
// // import VendorProductCard from "./VendorProductCard";
// import VendorProductCard from "@/components/VendorProductCard"
// import { useAuth } from '@/context/authContext';
// import Alert from '@/components/Alert';

// const AllProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [refreshing, setRefreshing] = useState(false);
//   const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
//   const [alert, setAlert] = useState(null);
  
//   const { vendorId } = useAuth();

//   const showAlert = (message, type = 'success') => {
//     setAlert({ message, type });
//     // Auto dismiss after 3 seconds
//     setTimeout(() => {
//       setAlert(null);
//     }, 3000);
//   };

//   const fetchProducts = async () => {
//     if (!vendorId) {
//       setError("Vendor ID is required");
//       setLoading(false);
//       return;
//     }

//     setRefreshing(true);
    
//     try {
//       const response = await fetch("/api/vendor-products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId: vendorId }),
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.msg || "Failed to fetch products");
//       }
      
//       const data = await response.json();
//       setProducts(data.products || []);
//       setError(null);
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching products");
//       // Don't reset products array on error - keep existing data if available
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     if (vendorId) {
//       fetchProducts();
//     }
//   }, [vendorId]);

//   const handleRefresh = () => {
//     if (!refreshing) {
//       fetchProducts();
//     }
//   };

//   const handleProductDeleted = (deletedId) => {
//     // Update the products list without causing a full re-render
//     setProducts(currentProducts => 
//       currentProducts.filter(product => product.id !== deletedId)
//     );
    
//     showAlert("Product has been successfully removed", "success");
//   };

//   // Loading state - simplified to avoid DOM reconciliation issues
//   if (loading && !refreshing) {
//     return (
//       <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
//         <div className="relative w-16 h-16 mb-6">
//           <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin"></div>
//           <Package className="w-8 h-8 text-indigo-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
//         </div>
//         <p className="text-gray-600">Loading products...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-8">
//       {/* Alert Component */}
//       {alert && (
//         <Alert 
//           message={alert.message} 
//           type={alert.type} 
//           onClose={() => setAlert(null)} 
//         />
//       )}

//       {/* Header Section */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//         <div className="px-6 py-5">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">Your Products</h1>
//               <p className="mt-1 text-gray-600">Manage and monitor all your products</p>
//             </div>
            
//             <div className="flex flex-wrap items-center gap-3">
//               {/* Search Box */}
//               <div className="relative flex-grow sm:flex-grow-0 max-w-xs">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
//                 />
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               </div>

//               {/* View Toggle */}
//               <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
//                 <button
//                   onClick={() => setViewMode('grid')}
//                   className={`p-2 rounded-lg transition-all ${
//                     viewMode === 'grid'
//                       ? 'bg-white text-indigo-600 shadow-sm'
//                       : 'text-gray-600 hover:text-indigo-600'
//                   }`}
//                 >
//                   <Grid className="w-4 h-4" />
//                 </button>
//                 <button
//                   onClick={() => setViewMode('list')}
//                   className={`p-2 rounded-lg transition-all ${
//                     viewMode === 'list'
//                       ? 'bg-white text-indigo-600 shadow-sm'
//                       : 'text-gray-600 hover:text-indigo-600'
//                   }`}
//                 >
//                   <List className="w-4 h-4" />
//                 </button>
//               </div>

//               {/* Refresh Button */}
//               <button
//                 onClick={handleRefresh}
//                 disabled={refreshing}
//                 className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600
//                          bg-white hover:bg-gray-50 transition-all
//                          disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
//                 Refresh
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-gray-200 shadow-sm">
//           <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
//             <AlertCircle className="w-6 h-6 text-red-500" />
//           </div>
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={handleRefresh}
//             className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 
//                      font-medium hover:bg-gray-50 transition-all hover:border-gray-400"
//           >
//             Try Again
//           </button>
//         </div>
//       )}

//       {/* Empty State */}
//       {!error && (!products || products.length === 0) && (
//         <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-gray-200 shadow-sm">
//           <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
//             <Package className="w-6 h-6 text-gray-400" />
//           </div>
//           <h2 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h2>
//           <p className="text-gray-600">Start by adding your first product.</p>
//         </div>
//       )}

//       {/* Products Grid */}
//       {products && products.length > 0 && (
//         <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
//           {products.map((product) => (
//             <VendorProductCard 
//               key={product.id}
//               id={product.id}
//               image={product.logoUrl || '/placeholder-product.png'}
//               title={product.name || product.prname}
//               description={product.description || ''}
//               userId={vendorId}
//               onDelete={handleProductDeleted}
//               showAlert={showAlert}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllProducts;
"use client";

import React, { useEffect, useState } from "react";
import { Package, RefreshCw, AlertCircle, Search, Grid, List } from "lucide-react";
import VendorProductCard from "@/components/VendorProductCard";
import { useAuth } from '@/context/authContext';
import Alert from '@/components/Alert';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [alert, setAlert] = useState(null);
  
  const { vendorId } = useAuth();

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const fetchProducts = async () => {
    if (!vendorId) {
      setError("Vendor ID is required");
      setLoading(false);
      return;
    }

    setRefreshing(true);
    
    try {
      const response = await fetch("/api/vendor-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: vendorId }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to fetch products");
      }
      
      const data = await response.json();
      setProducts(data.products || []);
      setError(null);
    } catch (err) {
      setError(err.message || "An error occurred while fetching products");
      // Don't reset products array on error - keep existing data if available
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (vendorId) {
      fetchProducts();
    }
  }, [vendorId]);

  const handleRefresh = () => {
    if (!refreshing) {
      fetchProducts();
    }
  };

  const handleProductDeleted = (deletedId) => {
    // Update the products list without causing a full re-render
    setProducts(currentProducts => 
      currentProducts.filter(product => product.id !== deletedId)
    );
    
    showAlert("Product has been successfully removed", "success");
  };

  // Simplified loading state that takes full screen height
  if (loading && !refreshing) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Alert Component */}
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)} 
        />
      )}

      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="px-6 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Your Products</h1>
              <p className="mt-1 text-gray-600">Manage and monitor all your products</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Box */}
              <div className="relative flex-grow sm:flex-grow-0 max-w-xs">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600
                         bg-white hover:bg-gray-50 transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 
                     font-medium hover:bg-gray-50 transition-all hover:border-gray-400"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State - Only show when explicitly no products AND loading is complete */}
      {!loading && !error && (!products || products.length === 0) && (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Package className="w-6 h-6 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h2>
          <p className="text-gray-600">Start by adding your first product.</p>
        </div>
      )}

      {/* Products Grid */}
      {products && products.length > 0 && (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {products.map((product) => (
            <VendorProductCard 
              key={product.id}
              id={product.id}
              image={product.logoUrl || '/placeholder-product.png'}
              title={product.name || product.prname}
              description={product.description || ''}
              userId={vendorId}
              onDelete={handleProductDeleted}
              showAlert={showAlert}
              slug={product.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;