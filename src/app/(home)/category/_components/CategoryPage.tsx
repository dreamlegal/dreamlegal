"use client";

import FeaturedProduct from "@/components/FeaturedProduct";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  logoUrl: string;
  name: string;
  description: string;
  category: string;
  userCategory: string;
  active: string;
  featured: boolean;
}

interface DataState {
  products: Product[];
}

const CategoryPage = () => {
  const [dataState, setDataState] = useState<DataState | null>(null);
  const [featureProduct, setFeatureProduct] = useState<Product[]>([]);
  const [latestProduct, setLatestProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      const response = await fetch("/api/get-all-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: 10 }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      return response.json();
    }

    getData().then((data) => {
      setDataState(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (dataState) {
        const products = dataState.products.filter(
          (product: { active: string }) => product.active === "publish"
        );
        const featured = products.filter(
          (product: { featured: any }) => product.featured
        );

        console.log("latest", featured);

        const latest = products.filter(
          (product: { featured: any }) => !product.featured
        );
        console.log("latest", latest);
        if (featured.length === 0 && latest.length > 0) {
          featured.push(latest[0]);
        }

        setFeatureProduct(featured);
        setLatestProduct(latest);
      }
    };

    fetchProducts();
  }, [dataState]);
  return (
    <main className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 font-clarity space-y-12">
      <div className="space-y-6">
        <h2 className=" text-2xl md:text-3xl font-bold">Category Heading</h2>
        <div>
          <img src="/background.png" alt="" />
        </div>
        <div>
          <p className="text-base text-slate-500 text-justify">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum ut,
            deleniti accusantium iure dolor architecto reprehenderit incidunt
            harum. Pariatur nam repellat eveniet. Dignissimos et, explicabo
            asperiores error ipsa iure corrupti ea eveniet, neque porro nisi
            pariatur rerum dolore mollitia temporibus enim. Id assumenda nulla
            recusandae deserunt tempora ipsam inventore repellendus.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        <div>Labels</div>
        <div>Labels</div>
        <div>Labels</div>
        <div>Labels</div>
      </div>
      <div>
        {loading && (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        )}
        {!loading &&
          featureProduct
            .slice(0, 4)
            .map((product: any) => (
              <FeaturedProduct
                key={product.id}
                id={product.id}
                image={product.logoUrl}
                title={product.name}
                description={product.description}
                category={product.category}
                userCategory={product.userCategory}
                product={product}
              />
            ))}
      </div>
    </main>
  );
};

export default CategoryPage;
