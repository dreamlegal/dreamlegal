"use client";
import React, { useEffect, useState } from 'react'
import NewProductAdminCard from './NewProductAdminCard'

function NewProductAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Function to fetch products from the API
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch('/api/get-new-products'); // Adjust the API endpoint as needed
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setProducts(data.products);
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []); 

  useEffect(() => {
    // Function to fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/get-new-products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Ensure fresh data by disabling caching
          cache: 'no-cache',
          next: { revalidate: 10 }, // Optional, revalidate after 10 seconds if in a Next.js environment
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setProducts(data.products); // Set the state with fetched products
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
  
    fetchProducts(); // Invoke the fetch function
  }, []); // Dependency array is empty to run the effect once on mount
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {products.length > 0 ? (
        products.map((product, index) => (
          <NewProductAdminCard key={index} product={product} />
        ))
      ) : (
        <div>No new products</div>
      )}
    </div>
  )
}

export default NewProductAdmin
