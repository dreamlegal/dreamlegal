"use client";
import React, { useEffect, useState } from 'react'
import NewProductAdminCard from './NewProductAdminCard'

function NewProductAdmin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/get-new-products'); // Adjust the API endpoint as needed
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
  }, []); 

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
