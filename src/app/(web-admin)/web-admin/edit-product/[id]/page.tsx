
'use client';

import { useRouter, usePathname } from 'next/navigation';
import AdminProductForm from '@/components/AdminProductForm';
import React, { useState, useEffect } from 'react';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [product, setProduct] = useState(null);

  const fetchProductById = async (productId) => {
    try {
      const response = await fetch('/api/get-product-info-by-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error fetching product:', errorData.error);
        return null;
      }

      const product = await response.json();
      console.log(product);
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  useEffect(() => {
    if (pathname) {
      // Extract product ID from the pathname
      const pathParts = pathname.split('/');
      const productId = pathParts[pathParts.length - 1]; // Get the last part of the URL

      if (productId) {
        // Fetch product data
        fetchProductById(productId).then((data) => {
          if (data) {
            setProduct(data);
          }
        });
      }
    }
  }, [pathname]);

  return (
    <>
      <h2>Edit Product</h2>
      <AdminProductForm editing={true} product={product} />
    </>
  );
};

export default Page;