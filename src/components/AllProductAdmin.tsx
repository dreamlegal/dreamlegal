"use client";
import React, { useEffect, useState } from 'react'
import AdminProductCard from './AdminProductCard'

function AllProductAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch published products from the API
    // const fetchProducts = async () => {
    //   try {
    //     const response = await fetch('/api/get-publish-product'); // Adjust the API endpoint as needed
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     const data = await response.json();
    //     setProducts(data.products);
    //   } catch (error) {
    //     console.error('Error fetching products:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/get-publish-product', {
          method: 'POST', // Use POST instead of GET
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchProducts();
  }, []); // Empty dependency array means this runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {products.length > 0 ? (
        products.map((product, index) => (
          <AdminProductCard key={index} product={product} />
        ))
      ) : (
        <div>No published products available</div>
      )}
    </div>
  )
}

export default AllProductAdmin
