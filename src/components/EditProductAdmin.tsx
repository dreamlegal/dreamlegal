
// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import AdminProductForm from "./AdminProductForm";
// import { useParams } from 'next/navigation';
// function EditProductAdmin({ editing }: { editing: boolean }) {
//   const [loading, setLoading] = useState(true);
//   const [product, setProduct] = useState(null);
// //   const searchParams = useSearchParams();

//   const params = useParams();
// //   const id = searchParams.get('id');
//   const Pid = params.id || null;

//   useEffect(() => {
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
//         setProduct(data);
//         console.log("this is the required dataaa",data);
//         console.log("this is the required data",product);
        
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [Pid]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!Pid) {
//     return <div>No product ID provided</div>;
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   return (
//     <AdminProductForm editing={editing} product={product} />
//   );
// }

// export default EditProductAdmin;
"use client";

import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import AdminProductForm from "./AdminProductForm";

function EditProductAdmin({ editing }: { editing: boolean }) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const params = useParams();
  const Pid = params.id || null;

//   useEffect(() => {
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
//         console.log("Fetched data:", data); // Log the fetched data
//         setProduct(data);
        
//         // Move this inside a useEffect to see the updated state
//         useEffect(() => {
//           console.log("Product state updated:", product);
//         }, [product]);
        
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [Pid]);
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

  // Separate useEffect for logging product state changes
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

  console.log("Rendering AdminProductForm with product:", product); // Log right before rendering

  return (
    <AdminProductForm editing={editing} product={product} />
  );
}

export default EditProductAdmin;