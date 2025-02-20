
// // "use client";

// // import { useEffect, useState } from "react";
// // import { useSearchParams } from "next/navigation";
// // import AdminProductForm from "./AdminProductForm";
// // import { useParams } from 'next/navigation';
// // function EditProductAdmin({ editing }: { editing: boolean }) {
// //   const [loading, setLoading] = useState(true);
// //   const [product, setProduct] = useState(null);
// // //   const searchParams = useSearchParams();

// //   const params = useParams();
// // //   const id = searchParams.get('id');
// //   const Pid = params.id || null;

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       if (!Pid) {
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         const response = await fetch(`/api/get-product-info-by-id`, {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({ Pid }),
// //         });

// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }

// //         const data = await response.json();
// //         setProduct(data);
// //         console.log("this is the required dataaa",data);
// //         console.log("this is the required data",product);
        
// //       } catch (error) {
// //         console.error("Error fetching product:", error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchProduct();
// //   }, [Pid]);

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (!Pid) {
// //     return <div>No product ID provided</div>;
// //   }

// //   if (!product) {
// //     return <div>Product not found</div>;
// //   }

// //   return (
// //     <AdminProductForm editing={editing} product={product} />
// //   );
// // }

// // export default EditProductAdmin;
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from 'next/navigation';
// import AdminProductForm from "./AdminProductForm";

// function EditProductAdmin({ editing }: { editing: boolean }) {
//   const [loading, setLoading] = useState(true);
//   const [product, setProduct] = useState(null);
//   const params = useParams();
//   const Pid = params.id || null;
// useEffect(() => {
//     const fetchProduct = async () => {
//       if (!Pid) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(`/api/get-product-info-by-id`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ Pid }),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Fetched data:", data);
//         setProduct(data);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [Pid]);

//   // Separate useEffect for logging product state changes
//   useEffect(() => {
//     console.log("Product state updated:", product);
//   }, [product]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!Pid) {
//     return <div>No product ID provided</div>;
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   console.log("Rendering AdminProductForm with product:", product); // Log right before rendering

//   return (
//     <AdminProductForm editing={editing} product={product} />
//   );
// }

// export default EditProductAdmin;
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from 'next/navigation';
import AdminProductForm from "./AdminProductForm";
import { ProductInfo } from '@/store/useStore';

function EditProductAdmin({ editing }: { editing: boolean }) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [isRefreshed, setIsRefreshed] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const params = useParams();
  const router = useRouter();
  const reset = ProductInfo((state) => state.reset);
  const Pid = params.id || null;

  const handleRefresh = async () => {
    // Reset store
    reset();
    
    // Force form re-render
    setFormKey(prev => prev + 1);
    
    // Re-fetch product data
    setLoading(true);
    try {
      const response = await fetch(`/api/get-product-info-by-id`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Pid }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProduct(data);
      setIsRefreshed(true);
      
      setTimeout(() => {
        setIsRefreshed(false);
      }, 3000);
    } catch (error) {
      console.error("Error refreshing product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!Pid) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/get-product-info-by-id`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Pid }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [Pid]);

  useEffect(() => {
    console.log("Product state updated:", product);
  }, [product]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Pid) {
    return <div>No product ID provided</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  console.log("Rendering AdminProductForm with product:", product);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Edit Product</h1>
        <div className="flex items-center gap-4">
          {isRefreshed && (
            <span className="text-green-600 text-sm">
              Form has been reset and data reloaded!
            </span>
          )}
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md transition-colors
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {loading ? 'Refreshing...' : 'Refresh Form'}
          </button>
        </div>
      </div>
      <AdminProductForm 
        key={formKey} 
        editing={editing} 
        product={product} 
      />
    </div>
  );
}

export default EditProductAdmin;