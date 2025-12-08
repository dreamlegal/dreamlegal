
"use client";

import React, { useEffect, useState } from "react";
import { Package, RefreshCw, AlertCircle, Search, Grid, List } from "lucide-react";
import VendorProductCard from "@/components/VendorProductCard";
import { useNewAuth } from '@/context/NewAuthContext';;
import Alert from '@/components/Alert';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [alert, setAlert] = useState(null);
  
  const { vendorId } = useNewAuth();

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