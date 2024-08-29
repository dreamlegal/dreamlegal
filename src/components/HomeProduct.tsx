"use client";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import FeaturedProduct from "./FeaturedProduct";
import NormalProduct from "./NormalProduct";
import Link from "next/link";

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

function HomeProduct() {
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
        const products = dataState.products.filter((product: { active: string }) => product.active === "publish");
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

  const category = [
    {
      name: "Client Management Software",
      link: "/directory?category=Client%20Management%20Software"
    },
    {
      name: "Contract Lifecycle Management",
      link: "/directory?category=Contract%20Lifecycle%20Management"
    },
    {
      name: "Digital Signature",
      link: "/directory?category=Digital%20Signature"
    },
    {
      name: "Document Management and Automation",
      link: "/directory?category=Document%20Management%20and%20Automation"
    },
    {
      name: "E-billing and Invoicing",
      link: "/directory?category=E-billing%20and%20Invoicing"
    },
    {
      name: "E-discovery",
      link: "/directory?category=E-discovery"
    },
    {
      name: "Governance, Risk and Compliance",
      link: "/directory?category=Governance,%20Risk%20and%20Compliance"
    },
    {
      name: "Intellectual Property Management",
      link: "/directory?category=Intellectual%20Property%20Management"
    },
    {
      name: "Legal Research",
      link: "/directory?category=Legal%20Research"
    },
    {
      name: "Legal Workflow Automation",
      link: "/directory?category=Legal%20Workflow%20Automation"
    },
    {
      name: "Litigation Management and Analytics",
      link: "/directory?category=Litigation%20Management%20and%20Analytics"
    }
  ];

  if (loading) {
    return (
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 font-clarity">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className=" col-span-2 overflow-y-scroll no-scrollbar">
            <div className=" w-full flex items-center justify-between mt-10 ">
              <h2 className=" text-2xl md:text-3xl font-bold">Featured products</h2>
              <Link href={"/directory"}>
                <button className=" flex gap-2 rounded-full bg-white text-gray-900 border border-gray-700 font-bold px-6 py-3 text-xs transition-all  w-fit items-center hover:bg-primary1 hover:text-white hover:border-white">
                  Browse all products
                </button>
              </Link>
            </div>
            <div className=" flex flex-col gap-4 mt-4 mb-4">
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              </div>

              <span className=" text-gray-400 italic text-sm">Loading ..</span>
            </div>




          </div>

        </div>
      </div>
    )

      ;
  }

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 font-clarity">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className=" col-span-2 overflow-y-scroll no-scrollbar">
          <div className=" w-full flex items-center justify-between mt-10 ">
            <h2 className=" text-2xl md:text-3xl font-bold">Featured products</h2>
            <Link href={"/directory"}>
              <button className=" flex gap-2 rounded-full bg-white text-gray-900 border border-gray-700 font-bold px-6 py-3 text-xs transition-all  w-fit items-center hover:bg-primary1 hover:text-white hover:border-white">
                Browse all products
              </button>
            </Link>
          </div>
          <div className=" flex flex-col gap-4 mt-4 mb-4">
            {featureProduct.slice(0, 4).map((product: any) => (
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



          <div className=" w-full flex items-center justify-center mt-10 ">
            <Link href={"/directory"}>
              <button className=" flex gap-2 rounded-full bg-primary2 text-primary1 font-bold px-6 py-3 text-xs transition-all  w-fit border items-center hover:border-primary1 hover:text-primary1 hover:gap-4 duration-200">
                View All
                <IoIosArrowRoundForward className=" text-xl" />
              </button>
            </Link>
          </div>
        </div>
        <div className="h-fit md:h-fit w-full md:col-span-1 sticky top-0">
          <div className=" md:px-4">
            <div className="h-fit md:h-fit bg-primary2  rounded-xl px-8 py-10 flex flex-col gap-5 ">
              <div className=" h-12 w-12 rounded-full bg-primary1 inline-flex justify-center items-center">
                <FaArrowUp className=" text-white text-[28px]" />
              </div>
              <h3 className=" font-bold text-xl ">Browse  categories</h3>



              {category.map((item: any) => (
                <Link href={item.link} key={item.name}>
                  <button className=" flex gap-2 w-full rounded-full transition-all duration-200 bg-primary2 border border-primary1 text-primary1 font-bold px-6 py-3 text-xs  items-center justify-center hover:bg-primary2 hover:text-primary1 hover:gap-4">
                    {item.name}
                    <IoIosArrowRoundForward className=" text-xl" />
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeProduct;
