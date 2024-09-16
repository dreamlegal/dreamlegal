"use client";

import { useEffect, useState } from "react";

import ProductForm from "./ProductForm";


function EditProductAdmin({ editing, id }: { editing: boolean, id: string }) {
  
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);

    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const response = await fetch("/api/admin-product-detail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id }),
                });

                const data = await response.json();

                if (data.success) {
                    const product = data.product;
                    setProduct(product);
                    console.log(product);
                    // return product;
                } else {
                    console.error(data.msg);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoading(false);
            }
        };


        fetchProduct();

    }, [id]);

  

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
           <ProductForm editing = {editing} product = {product} />
        </>
    );
}

export default EditProductAdmin;
