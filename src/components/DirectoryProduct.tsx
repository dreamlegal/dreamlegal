"use client";
import React, { useEffect, useState } from "react";
import NormalProduct from "./NormalProduct";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa6";
import Search from "./animated-ui/Search";
import DirectoryFilter from "./DirectoryFilter";
import Image from "next/image";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

const placeholders = [
  "Contract Management",
  "Case Management",
  "Compliance Management",
];

const categoryKeywords: { [key: string]: string[] } = {
  "Client Management Software": [
    "CRM",
    "Client Relationship Management",
    "Customer Relationship Management",
    "Client Management Software",
    "CRM",
    "CMS",
  ],
  "Governance and Compliance and Risk Management": [
    "GRC",
    "Governance",
    "Risk Compliance",
    "Governance",
    "Risk Management",
    "Compliance and Risk Management",
    "Compliance Management",
    "GCR",
  ],
  "Contract Management Software": [
    "CLM",
    "CMS",
    "Contract Software",
    "Contract Lifecycle Management",
    "Contract Management",
  ],
  "Digital Signature": [
    "E-Signature",
    "Electronic Signature",
    "Digital Signature",
    "Digital Signature",
    "Signature",
    "DS",
    "Signature Software",
  ],
  "Document Management and Automation": [
    "DMS",
    "DMA",
    "Document Management",
    "Automation System",
    "Automation Management",
    "Document Management Software",
    "Document Management System",
  ],
  "E-billing and Invoicing": [
    "E-billing",
    "Invoicing",
    "Billing",
    "Invoicing Software",
    "Billing Software",
    "E-billing and invoicing",
  ],
  "E-discovery": [
    "E-discovery",
    "Electronic Discovery",
    "Discovery",
    "Discovery Management",
    "Discovery Software",
  ],
  "Intellectual Property Management": [
    "IP Management",
    "Intellectual Property Management",
    "IPM",
    "Property Management",
  ],
  "Litigation Management and Analytics": [
    "Litigation Management",
    "Litigation Analytics",
    "Analytics Management",
    "Litigation Analytics",
    "Litigation management and analytics",
  ],
  "Legal Workflow Automation": [
    "Workflow Automation",
    "Legal Management",
    "Legal Automation",
    "Workflow Management",
    "LWA",
    "Legal Workflow Automation",
  ],
};

function DirectoryProduct() {
  const [featureProduct, setFeatureProduct] = useState([]);
  const [latestProduct, setLatestProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    userCategory: [],
    language: [],
    country: [],
    industry: [],
    practiceAreas: [],
    mobileAvailable: [],
    price: [],
    // Add more filter parameters here
  });

  const fetchProducts = async (search = "") => {
    try {
      const response = await fetch("/api/get-all-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: 10 }),
      });
      const data = await response.json();

      if (data.success) {
        const products = data.products.filter(
          (product: any) => product.active === "publish"
        );
        const searchLower = search.toLowerCase();

        const filtered = products.filter((product: any) => {
          const matchesName = product.name.toLowerCase().includes(searchLower);
          const matchesCategory = product.category.some((cat: any) => {
            const keywords = categoryKeywords[cat] || [];
            return keywords.some(
              (keyword) =>
                keyword.toLowerCase().includes(searchLower) ||
                searchLower.includes(keyword.toLowerCase())
            );
          });

          const matchesSelectedCategory =
            selectedFilters.categories.length === 0 ||
            product.category.some((cat: any) =>
              selectedFilters.categories.includes(cat as never)
            );

          const matchesSelectedLanguage =
            selectedFilters.language.length === 0 ||
            selectedFilters.language.includes(product.language as never);

          const matchesSelectedCountry =
            selectedFilters.country.length === 0 ||
            selectedFilters.country.includes(product.country as never);

          // **User Category Filtering**
          const matchesSelectedUserCategory =
            selectedFilters.userCategory.length === 0 ||
            product.userCategory.some((cat: any) =>
              selectedFilters.userCategory.includes(cat as never)
            );

          // **Add more filter matches here**

          return (
            (matchesName || matchesCategory) &&
            matchesSelectedCategory &&
            matchesSelectedLanguage &&
            matchesSelectedCountry &&
            matchesSelectedUserCategory
            // **Add more filter matches here**
          );
        });

        setFeatureProduct(filtered.filter((product: any) => product.featured));
        setLatestProduct(filtered.filter((product: any) => !product.featured));
        setFilteredProducts(filtered);
      }
    } catch (error) {
      console.error("An error occurred while fetching the products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedFilters]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchProducts(searchTerm);
  };

  const handleFilterChange = (
    filterType: keyof typeof selectedFilters,
    value: string
  ) => {
    setSelectedFilters((prevFilters) => {
      const currentValues = prevFilters[filterType];
      return {
        ...prevFilters,
        [filterType]: currentValues.includes(value as never)
          ? currentValues.filter((v) => v !== (value as never))
          : [...currentValues, value as never],
      };
    });
  };

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 font-clarity">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-fit w-full md:w-[300px] md:col-span-1 sticky top-0 hidden md:block ">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>
          <DirectoryFilter
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
            setSelectedFilters={setSelectedFilters}
          />
        </div>
        <div className="col-span-2 overflow-y-scroll no-scrollbar">
          <div className="w-full flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-xl font-bold mb-5 md:mb-0">Directory search</h2>
            <div className="flex gap-2">
              <Search
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
              />
              <div className="block md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="flex gap-2 rounded-full bg-white text-gray-900 border border-gray-700 font-bold px-6 py-3 text-xs transition-all w-fit items-center hover:bg-primary1 hover:text-white hover:border-white">
                      <Image
                        src={"/filtericon.svg"}
                        width={20}
                        height={20}
                        alt="icon"
                      ></Image>
                      <span className="text-sm mr-2">Filter</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent>
                    <DirectoryFilter
                      selectedFilters={selectedFilters}
                      handleFilterChange={handleFilterChange}
                      setSelectedFilters={setSelectedFilters}
                    />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4 mb-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product: any) => (
                <NormalProduct
                  key={product.id}
                  id={product.id}
                  image={product.logoUrl}
                  title={product.name}
                  description={product.description}
                  category={product.category}
                  product={product}
                />
              ))
            ) : (
              <div className="text-center text-gray-600">No products found</div>
            )}
          </div>
          <div className="w-full flex items-center justify-center mt-10">
            <button className="flex gap-2 rounded-full bg-primary1 text-white font-bold px-6 py-3 text-xs transition-all w-fit items-center hover:bg-gray-900 hover:gap-4 duration-200">
              Next
              <IoIosArrowRoundForward className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectoryProduct;
