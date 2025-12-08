
"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useNewAuth } from '@/context/NewAuthContext';;
import { Package, AlertCircle } from 'lucide-react';

// Import the ProductForm component with SSR disabled
const ProductForm = dynamic(() => import('@/components/ProductForm'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-16 h-16 relative">
        <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin"></div>
        <Package className="w-8 h-8 text-indigo-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  )
});

const EditProductPage = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const { isLoading, vendorId } = useNewAuth();
  const [product, setProduct] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Only attempt to fetch product if we have both id and vendorId
    if (!id || !vendorId) {
      if (vendorId !== undefined) {
        setIsLoadingProduct(false);
      }
      return;
    }
    
    const fetchProduct = async () => {
      try {
        setIsLoadingProduct(true);
        const response = await fetch(`/api/products/get-product/${id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch product details");
        }
        
        // Verify product belongs to this vendor
        if (data.product.userId !== vendorId) {
          throw new Error("You don't have permission to edit this product");
        }
        
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
        setFetchError(error.message);
      } finally {
        setIsLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id, vendorId]);

  // Prevent rendering anything until we're on the client
  if (!isClient) {
    return null;
  }

  // Show loading state if auth is loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mb-6 relative mx-auto">
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin"></div>
            <Package className="w-8 h-8 text-indigo-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (fetchError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 mx-auto">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Product</h2>
          <p className="text-gray-600 mb-6">{fetchError}</p>
          <button
            onClick={() => router.push('/tech_vendor/dashboard/products')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Show product loading state
  if (isLoadingProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mb-6 relative mx-auto">
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin"></div>
            <Package className="w-8 h-8 text-indigo-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center lg:text-left bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Edit Product
      </h1>
      {product && <ProductForm editing={true} product={product} />}
    </div>
  );
};

export default EditProductPage;