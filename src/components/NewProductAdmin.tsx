// "use client";
// import React, { useEffect, useState } from 'react'
// import NewProductAdminCard from './NewProductAdminCard'

// function NewProductAdmin() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // useEffect(() => {
//   //   // Function to fetch products from the API
//   //   const fetchProducts = async () => {
//   //     try {
//   //       const response = await fetch('/api/get-new-products'); // Adjust the API endpoint as needed
//   //       if (!response.ok) {
//   //         throw new Error('Network response was not ok');
//   //       }
//   //       const data = await response.json();
//   //       setProducts(data.products);
//   //     } catch (error) {
//   //       console.error('Error fetching products:', error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchProducts();
//   // }, []); 

  
//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(`/api/get-new-products?_=${new Date().getTime()}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         // Ensure fresh data by disabling caching
//         cache: 'no-cache',
//         next: { revalidate: 0 },  // Forces no revalidation caching
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       setProducts(data.products); // Update the state with fetched products
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false); // Stop loading once data is fetched
//     }
//   };

//   useEffect(() => {
//     fetchProducts(); // Fetch products on component mount
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

// import { useEffect, useState } from 'react';

// // Fetch products server-side on each request
// export async function getServerSideProps() {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-new-products`, {
//     method: 'GET',
//     headers: {
//       'Cache-Control': 'no-cache, no-store, must-revalidate',
//       'Pragma': 'no-cache',
//       'Expires': '0',
//     },
//   });

//   // Handle potential errors
//   if (!res.ok) {
//     return {
//       notFound: true, // Return 404 if the fetch fails
//     };
//   }

//   const { products } = await res.json();

//   return {
//     props: {
//       initialProducts: products, // Use this prop for initial rendering
//     },
//   };
// }

// const ProductsPage = ({ initialProducts }) => {
//   const [products, setProducts] = useState(initialProducts || []);
//   const [loading, setLoading] = useState(false);

//   // Fetch products from the API on client-side
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-new-products`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Cache-Control': 'no-cache, no-store, must-revalidate',
//         },
//       });

//       if (!response.ok) {
//         throw new Error('Failed to fetch products');
//       }

//       const data = await response.json();
//       setProducts(data.products);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Products List</h1>
//       <ul>
//         {products.map((product) => (
          
//           <NewProductAdminCard key={index} product={product} />
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductsPage;

// Import necessary modules
import { useEffect, useState } from 'react';
import NewProductAdminCard from './NewProductAdminCard';

// Fetch products server-side on each request
export async function getServerSideProps() {
  const res = await fetch(`https://dreamlegal-five.vercel.app/api/get-new-products`, {
    method: 'GET',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });

  // Handle potential errors
  if (!res.ok) {
    return {
      notFound: true, // Return 404 if the fetch fails
    };
  }

  const { products } = await res.json();

  return {
    props: {
      initialProducts: products, // Use this prop for initial rendering
    },
  };
}

const NewProductAdmin = ({ initialProducts }) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products from the API on client-side
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://dreamlegal-five.vercel.app/api/get-new-products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load new products.'); // Update error state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner/message
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching fails
  }

  return (
    <div>
      <h1>New Products List</h1>
      {products.length > 0 ? (
        products.map((product, index) => (
          <NewProductAdminCard key={index} product={product} />
        ))
      ) : (
        <div>No new products</div>
      )}
    </div>
  );
};

export default NewProductAdmin;
