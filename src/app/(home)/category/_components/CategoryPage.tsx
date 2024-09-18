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
    if (dataState) {
      console.log(dataState);
      const products = dataState.products.filter((product) => {
        return product.active === "active";
      });
      const matchedProducts = products.filter(
        (product) =>
          // console.log(product)
          product.category[0].toLowerCase() ===
          categoryData?.slug.replace(/-/g, " ")
      );
      if (matchedProducts) {
        setFeatureProduct(matchedProducts);
        setLoading(false);
      } else {
        setFeatureProduct([]);
      }
    }
  }, [dataState]);

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
    </main>
  );
};

export default CategoryPage;
