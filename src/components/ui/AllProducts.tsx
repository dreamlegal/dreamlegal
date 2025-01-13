"use client";
// import React, { useEffect, useState } from "react";
// import VendorProductCard from "../VendorProductCard";
// import Loading from "../Loading";
// import { useSearchParams } from "next/navigation";

// type Product = {
//   id: string;
//   name: string;
//   description: string;
//   logoUrl: string;
// };

// function AllProducts( ) {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const userId = localStorage.getItem("vendorId");
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const userId = localStorage.getItem("vendorId");
//       try {
//         const response = await fetch("/api/vendor-products", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ userId: userId || "" }), // Replace 'user_id' with the actual user ID
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setProducts(data.products);
//         } else {
//           setError(data.msg);
//         }
//       } catch (error) {
//         setError("An error occurred while fetching the products");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const searchParams = useSearchParams();
//   // @ts-ignore
//   const verify = searchParams.get('verified') ? true : false;

//   if(verify){
//     return(
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900 text-center">Please complete your profile</h1>
//        <center> <span className="text-sm text-slate-500 text-center">You need to complete your profile, By clicking on profile</span></center>
//       </div>
//     )
//   }



//   if (loading) {
//     return <Loading />;
//   }

//   if (!products || products.length === 0) {
//     return <p>No products found</p>;
//   }

//   return (
//     <div className=" flex flex-col gap-4">
//       {products.map((product) => (
//         <VendorProductCard
//           key={product.id}
//           id={product.id}
//           image={product.logoUrl}
//           title={product.name}
//           description={product.description}
//           userId={userId}
//         />
//       ))}
//     </div>
//   );
// }

// export default AllProducts;
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UserCircle2, Package, RefreshCw, AlertCircle, Search, Grid, List } from "lucide-react";
import VendorProductCard from "../VendorProductCard";
import { useAuth } from '@/context/AuthContext';
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  // const userId = localStorage.getItem("vendorId");
  // const { vendorId, userType } = useAuth();

  //   const userId= vendorId
  // const fetchProducts = async () => {
  //   // const userId = localStorage.getItem("vendorId");

    
  //   console.log(userId)
  //   setRefreshing(true);
  //   try {
  //     const response = await fetch("/api/vendor-products", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ userId: userId || "" }),
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       setProducts(data.products);
  //     } else {
  //       setError(data.msg);
  //     }
  //   } catch (error) {
  //     setError("An error occurred while fetching the products");
  //   } finally {
  //     setLoading(false);
  //     setRefreshing(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  const { vendorId, userType } = useAuth();
  const userId = vendorId;
// State declarations should be at the top level of your component

const fetchProducts = async () => {
  // Reset error state before new fetch attempt
  setError(null);
  setRefreshing(true);
  
  // Return early if no vendorId is available
  if (!vendorId) {
    setError("Vendor ID is required");
    setLoading(false);
    setRefreshing(false);
    return;
  }

  try {
    const response = await fetch("/api/vendor-products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: vendorId }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.msg || "Failed to fetch products");
    }
    
    setProducts(data.products || []);
  } catch (error) {
    setError(error.message || "An error occurred while fetching the products");
    setProducts([]); // Reset products on error
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

useEffect(() => {
  fetchProducts();
}, [vendorId]); // Add vendorId as dependency

  const searchParams = useSearchParams();
  const verify = searchParams.get('verified') ? true : false;

  if (verify) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
          <UserCircle2 className="w-8 h-8 text-indigo-500" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Complete Your Profile
        </h2>
        <p className="text-gray-600 max-w-md mb-6">
          Please complete your profile information to continue. This helps us provide a better experience.
        </p>
        <button
          onClick={() => window.location.href = '/profile'}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white 
                   font-medium shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 
                   transition-all duration-200 hover:from-indigo-600 hover:to-purple-600 active:scale-95"
        >
          Go to Profile
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 mb-6 relative">
          <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin"></div>
          <Package className="w-8 h-8 text-indigo-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-gray-600 animate-pulse">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Products</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={fetchProducts}
          className="px-6 py-2.5 rounded-xl border border-gray-200 text-gray-700 
                   font-medium hover:bg-gray-50 transition-all duration-200 
                   hover:border-gray-300 hover:shadow-md active:scale-95"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
          <Package className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h2>
        <p className="text-gray-600">Start by adding your first product.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-50 rounded-3xl"></div>
        <div className="relative px-8 py-6 rounded-3xl border border-gray-100/80 backdrop-blur-xl shadow-xl shadow-indigo-200/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Your Products
                </span>
              </h1>
              <p className="mt-2 text-gray-600">
                Manage and monitor all your products in one place
              </p>
            </div>

           
            
            <div className="flex items-center gap-4">
              {/* Search Box */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 w-64 rounded-xl border-0 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
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
                onClick={fetchProducts}
                disabled={refreshing}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600
                         bg-white hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-200 
                         active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {products.map((product) => (
          <VendorProductCard 
          
          key={product.id}
                    id={product.id}
                    image={product.logoUrl}
                    title={product.name}
                    description={product.description}
                    userId={userId}
          
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;