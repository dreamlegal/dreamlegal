"use client";

import FeaturedProduct from "@/components/FeaturedProduct";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { data } from "./data";
import { Button } from "@/components/ui/button";

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
  const [categoryData, setCategoryData] = useState<any | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (pathname) {
      const category = pathname.split("/category/")[1];
      const foundCategory = data.find((item) => item.slug === category);
      if (foundCategory) {
        setCategoryData(foundCategory || null);
      } else {
        router.replace("/");
      }
    }
    setLoading(false);
  }, [pathname]);

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
    if (dataState && categoryData) {
      console.log("Category Data Slug: ", categoryData.slug);
      console.log("All Products: ", dataState.products);
  
      // Normalize the category slug (convert to lowercase, replace dashes with spaces)
      const categorySlug = categoryData.slug.replace(/-/g, ' ').toLowerCase();
      console.log("Normalized Category Slug: ", categorySlug);
  
      // Filter the products based on matching categories and active status
      const matchedProducts = dataState.products.filter(product => {
        // Check if product is published
        const isPublished = product.active === 'publish';
  
        // Check if product categories include the target category
        const isInCategory = product.category.some(cat => {
          const normalizedCategory = cat.toLowerCase();
          return normalizedCategory.includes(categorySlug);
        });
  
        return isPublished && isInCategory;
      });
  
      console.log("Matched Products: ", matchedProducts);
      setFeatureProduct(matchedProducts);
    }
  }, [dataState, categoryData]);
  
  if (loading) {
    return (
      <div className="text-center">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <main className="px-4 py-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 font-clarity space-y-12">
      <div className="space-y-6">
        <h2 className=" text-2xl md:text-3xl font-bold">
          {categoryData && categoryData?.name}
        </h2>
        <div>
          <img
            src={categoryData && categoryData?.image}
            alt=""
            className="w-96"
          />
        </div>
        <div>
          <p className="text-base text-slate-500 text-justify">
            {categoryData && categoryData?.description} -
            <strong>{categoryData && categoryData.desciptionClosure}</strong>
          </p>
        </div>
        <div>
          <p className="text-base text-slate-500 text-justify">
            {categoryData && categoryData?.blogLabel} -{" "}
            <a
              className="text-primary"
              target="_blank"
              href={categoryData?.blogHref}
            >
              Click Here
            </a>
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
        {/* {categoryData &&
          categoryData?.labels.map((label: string) => (
            <div key={label}>{label}</div>
          ))} */}
        {categoryData &&
          categoryData?.labels
            .sort(() => Math.random() - 0.5)
            .map((label: string) => (
              <Button variant={"outline"} className="mx-2" key={label}>
                {label}
              </Button>
            ))}
      </div>
      <div>
        {loading && (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        )}
        {featureProduct.length === 0 && (
          <div className="text-center">
            <p>No products found in this category.</p>
          </div>
        )}
        {/* {!loading &&
          featureProduct.length > 0 &&
          featureProduct
            .slice(0, 8)
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
            ))} */}
            <div className="flex flex-wrap gap-8">
  {!loading &&
    featureProduct.length > 0 &&
    featureProduct
      .slice(0, 8)
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

      </div>
    </main>
  );
};

export default CategoryPage;
