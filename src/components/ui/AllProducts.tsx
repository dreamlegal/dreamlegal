"use client";
import React, { useEffect, useState } from "react";
import VendorProductCard from "../VendorProductCard";
import Loading from "../Loading";
import { useSearchParams } from "next/navigation";

type Product = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
};

function AllProducts( {userId}:{userId:string}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const fetchProducts = async () => {
      const userId = localStorage.getItem("vendorId");
      try {
        const response = await fetch("/api/vendor-products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId || "" }), // Replace 'user_id' with the actual user ID
        });

        const data = await response.json();

        if (response.ok) {
          setProducts(data.products);
        } else {
          setError(data.msg);
        }
      } catch (error) {
        setError("An error occurred while fetching the products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const searchParams = useSearchParams();
  // @ts-ignore
  const verify = searchParams.get('verified') ? true : false;

  if(verify){
    return(
      <div>
        <h1 className="text-3xl font-bold text-gray-900 text-center">Please complete your profile</h1>
       <center> <span className="text-sm text-slate-500 text-center">You need to complete your profile, By clicking on profile</span></center>
      </div>
    )
  }



  if (loading) {
    return <Loading />;
  }

  if (!products || products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <div className=" flex flex-col gap-4">
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
  );
}

export default AllProducts;
