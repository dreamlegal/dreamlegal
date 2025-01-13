"use client"
import React, { useEffect, useState } from 'react'
import VendorDashborad from '@/components/VendorDashborad'
import { useAuth } from '@/context/authContext';
const page = () => {
    
    // const vendorId = localStorage.getItem("vendorId");
    const { vendorId, userType } = useAuth();
    
      const [profile, setProfile] = useState(null);
      const [productId, setProductId] = useState(null);
      const [products, setProducts] = useState([]);
     

      useEffect(() => {
        const fetchData = async () => {
          const storedVendorId = vendorId || localStorage.getItem("vendorId");
          if (storedVendorId) {
            try {
              const profileResponse = await fetch(`/api/company-info?id=${storedVendorId}`);
              const profileData = await profileResponse.json();
              setProfile(profileData.profile);
    
              const productsResponse = await fetch(`/api/get-products-userid`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: storedVendorId }),
              });
              const productsData = await productsResponse.json();
              if (productsData.success) {
                setProducts(productsData.products);
                if (productsData.products.length > 0) {
                  setProductId(productsData.products[0].id);
                }
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          }
        };
    
        fetchData();
      }, [vendorId]);
  return (
    <VendorDashborad productId={productId} allProducts={products} />
  )
}

export default page