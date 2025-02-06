// "use client";
// import React, { useEffect, useState } from "react";
// // import NormalProduct from "./NormalProduct";
// import NormalProduct from "@/components/NormalProduct";
// import CompareProduct from "@/components/CompareProduct";
// import { IoIosArrowRoundForward } from "react-icons/io";
// import { FaArrowUp } from "react-icons/fa6";
// import Search from "@/components/animated-ui/Search";
// import DirectoryFilter from "./DirectoryFilter";
// import Image from "next/image";
// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
// import { Component } from "lucide-react";
// import Modal from '@/components/Modal'; // Import the Modal component
// import { FaCircleCheck } from "react-icons/fa6";
// import ProcessLifecycle from "@/components/ProcessLifecycle";
// import ProductFeature from "@/components/ProductFeature";
// import CompareProductFeatures from "@/components/CompareProductFeatures";
// import { Package, Grid, List, RefreshCw, Filter, X } from 'lucide-react';
// import { SheetClose } from '@/components/ui/sheet';

// const placeholders = [
//   "Contract Management",
//   "Case Management",
//   "Compliance Management",
// ];

// const categoryKeywords: { [key: string]: string[] } = {
//   "Client Relationship Management ": [
//     "CRM",
//     "Client Relationship Management",
//     "Customer Relationship Management",
//     "Client Relationship Management ",
//     "CRM",
//     "CMS",
//   ],
//   "Governance, Risk and Compliance": [
//     "GRC",
//     "Governance",
//     "Risk Compliance",
//     "Governance",
//     "Risk Management",
//     "Compliance and Risk Management",
//     "Compliance Management",
//     "GCR",
//   ],
//   "Contract Lifecycle Management": [
//     "CLM",
//     "CMS",
//     "Contract Software",
//     "Contract Lifecycle Management",
//     "Contract Management",
//   ],
//   "E-Signature": [
//     "E-Signature",
//     "Electronic Signature",
//     "E-Signature",
//     "E-Signature",
//     "Signature",
//     "DS",
//     "Signature Software",
//   ],
//   "Document Management System": [
//     "DMS",
//     "DMA",
//     "Document Management",
//     "Automation System",
//     "Automation Management",
//     "Document Management Software",
//     "Document Management System",
//   ],
//   "E-billing and Invoicing": [
//     "E-billing",
//     "Invoicing",
//     "Billing",
//     "Invoicing Software",
//     "Billing Software",
//     "E-billing and invoicing",
//   ],
//   "E-discovery": [
//     "E-discovery",
//     "Electronic Discovery",
//     "Discovery",
//     "Discovery Management",
//     "Discovery Software",
//   ],
//   "Intellectual Property Management": [
//     "IP Management",
//     "Intellectual Property Management",
//     "IPM",
//     "Property Management",
//   ],
//   "Litigation Management and Analytics": [
//     "Litigation Management",
//     "Litigation Analytics",
//     "Analytics Management",
//     "Litigation Analytics",
//     "Litigation management and analytics",
//   ],
//   "Legal Workflow Automation": [
//     "Workflow Automation",
//     "Legal Management",
//     "Legal Automation",
//     "Workflow Management",
//     "LWA",
//     "Legal Workflow Automation",
//   ],
// };



// interface ProcessLifecycleProps {
//   product: {
//     processLifecycle: {
//       category: string;
//       subcategories: string[];
//     }[];
//   };
// }

// const lifecycleStages = [
//   {
//     category: "Client Relationship Management ",
//     stages: [
//       "Intake",
//       "Assessment",
//       "Strategize",
//       "Represent",
//       "Communication",
//       "Review",
//     ],
//   },
//   {
//     category: "Governance, Risk and Compliance",
//     stages: [
//       "Coverage",
//       "Assessment",
//       "Validation",
//       "Implementation",
//       "Monitoring",
//       "Analysis",
//     ],
//   },
//   {
//     category: "Contract Lifecycle Management",
//     stages: [
//       "Create",
//       "Negotiation",
//       "Authentication",
//       "Execute",
//       "Store",
//       "Tracking",
//     ],
//   },
//   {
//     category: "E-Signature",
//     stages: [
//       "Document Preparation",
//       "Authentication",
//       "Signing",
//       "Encryption",
//       "Verification",
//       "Distribution",
//     ],
//   },
//   {
//     category: "Document Management System",
//     stages: [
//       "Capture",
//       "Change management",
//       "Review",
//       "Organize",
//       "Access management",
//       "Retrieval",
//     ],
//   },
//   {
//     category: "Document Management System Software",
//     stages: [
//       "Capture",
//       "Change management",
//       "Review",
//       "Organize",
//       "Access management",
//       "Retrieval",
//     ],
//   },
//   {
//     category: "E-billing and Invoicing",
//     stages: [
//       "Invoice generation",
//       "Authorization",
//       "Distribution and Accessibility",
//       "Payment Facilitation",
//       "Tracking",
//       "Analysis",
//     ],
//   },
//   {
//     category: "E-discovery",
//     stages: [
//       "Discover",
//       "Preserve",
//       "Acquire",
//       "Examine",
//       "Evaluate",
//       "Present",
//     ],
//   },
//   {
//     category: "Intellectual Property Management",
//     stages: [
//       "Cataloging",
//       "Analysis",
//       "Protection",
//       "Monitoring",
//       "Enforcement",
//       "Reporting",
//     ],
//   },
//   {
//     category: "Litigation Management and Analytics",
//     stages: [
//       "Intake",
//       "Strategize",
//       "Preparation",
//       "Litigation Support",
//       "Analytics",
//       "Outcome evaluation",
//     ],
//   },
//   {
//     category: "Legal Workflow Automation",
//     stages: [
//       "Process Identification",
//       "Workflow configuration",
//       "Validation",
//       "Implementation",
//       "Tracking",
//       "Optimization",
//     ],
//   },
//   {
//     category: "Legal Research",
//     stages: [
//       "Query Identification",
//      " Source and Type Selection",
//      " Filtration and sorting",
//      " Data extraction",
//       "Data Analysis and Organization",
//       "Storage or retrieval"
//     ],
//   },
// ];

// function DirectoryProduct() {
//   const [featureProduct, setFeatureProduct] = useState([]);
//   const [latestProduct, setLatestProduct] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedFilters, setSelectedFilters] = useState({
//     categories: [],
//     userCategory: [],
//     language: [],
//     country: [],
//     industry: [],
//     practiceAreas: [],
//     mobileAvailable: [],
//     price: [],
//     // Add more filter parameters here
//   });

//   const [compareProducts, setCompareProducts] = useState<any[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);


//   const fetchProducts = async (search = "") => {
//     try {
//       const response = await fetch("/api/get-all-products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ number: 10 }),
//         cache: "no-cache",
//         next: { revalidate: 10 },
//       });
//       const data = await response.json();

//       if (data.success) {
//         const products = data.products.filter(
//           (product: any) => product.active === "publish"
//         );
//         const searchLower = search.toLowerCase();
//         console.log("all products here ",products)

//         const filtered = products.filter((product: any) => {
//           const matchesName = product.name.toLowerCase().includes(searchLower);
//           const matchesCategory = product.category.some((cat: any) => {
//             const keywords = categoryKeywords[cat] || [];
//             return keywords.some(
//               (keyword) =>
//                 keyword.toLowerCase().includes(searchLower) ||
//                 searchLower.includes(keyword.toLowerCase())
//             );
//           });

//           const matchesSelectedCategory =
//             selectedFilters.categories.length === 0 ||
//             product.category.some((cat: any) =>
//               selectedFilters.categories.includes(cat as never)
//             );

//           const matchesSelectedLanguage =
//             selectedFilters.language.length === 0 ||
//             selectedFilters.language.includes(product.language as never);

//           const matchesSelectedCountry =
//             selectedFilters.country.length === 0 ||
//             selectedFilters.country.includes(product.country as never);

//           // **User Category Filtering**
//           // const matchesSelectedUserCategory =
//           //   selectedFilters.userCategory.length === 0 ||
//           //   product.userCategory.some((cat: any) =>
//           //     selectedFilters.userCategory.includes(cat as never)
//           //   );
//           const matchesSelectedUserCategory =
//   selectedFilters.userCategory.length === 0 ||
//   product.userCategory.some((cat: string) => {
//     const categoryName = cat.split('|')[0]; // Extract the category name
//     return selectedFilters.userCategory.includes(categoryName as never);
//   });


//           // **Add more filter matches here**

//           return (
//             (matchesName || matchesCategory) &&
//             matchesSelectedCategory &&
//             matchesSelectedLanguage &&
//             matchesSelectedCountry &&
//             matchesSelectedUserCategory
//             // **Add more filter matches here**
//           );
//         });

//         setFeatureProduct(filtered.filter((product: any) => product.featured));
//         setLatestProduct(filtered.filter((product: any) => !product.featured));
//         setFilteredProducts(filtered);
//       }
//     } catch (error) {
//       console.error("An error occurred while fetching the products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [selectedFilters]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     fetchProducts(searchTerm);
//   };

// //   const handleFilterChange = (
// //     filterType: keyof typeof selectedFilters,
// //     value: string
// //   ) => {
// //     setSelectedFilters((prevFilters) => {
// //       const currentValues = prevFilters[filterType];
// //       return {
// //         ...prevFilters,
// //         [filterType]: currentValues.includes(value as never)
// //           ? currentValues.filter((v) => v !== (value as never))
// //           : [...currentValues, value as never],
// //       };
// //     });
// //   };
//   const handleFilterChange = (filterType, value) => {
//     setSelectedFilters(prev => ({
//       ...prev,
//       [filterType]: prev[filterType].includes(value)
//         ? prev[filterType].filter(item => item !== value)
//         : [...prev[filterType], value]
//     }));
//   };

//   // const toggleCompareProduct = (product: any) => {
//   //   setCompareProducts((prev) => {
//   //     const isAlreadySelected = prev.some((p) => p.id === product.id);
//   //     if (isAlreadySelected) {
//   //       return prev.filter((p) => p.id !== product.id);
//   //     }
//   //     return [...prev, product];
//   //   });
//   // };
//   const toggleCompareProduct = (product: any) => {
//     setCompareProducts((prev) => {
//       const isAlreadySelected = prev.some((p) => p.id === product.id);
//       const maxProducts = 2;
  
//       // If the product is already selected, remove it from the list
//       if (isAlreadySelected) {
//         return prev.filter((p) => p.id !== product.id);
//       }
  
//       // Check if the new product's category matches the existing ones
//       const allProducts = [...prev, product];
//       const categories = new Set(allProducts.map((p) => p.category));
      
//       // If more than one category is present, show an error message
//       if (categories.size > 1) {
//         alert('Category not matching. Choose products from the same category.');
//         return prev;
//       }
  
//       // Ensure only up to two products are selected for comparison
//       if (allProducts.length > maxProducts) {
//         alert('You can only compare up to two products.');
//         return prev;
//       }
  
//       return allProducts;
//     });
//   };
  

//   const handleCompareClick = () => {
//     setIsModalOpen(true);
//   };



//   const [viewMode, setViewMode] = useState('list');
//   const [isFilterOpen, setIsFilterOpen] = useState(false);

 

//   // Custom Modal Component
//   const FilterModal = ({ isOpen, onClose, children }) => {
//     if (!isOpen) return null;
    
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end transition-all duration-300">
//         <div className="bg-white h-full w-full max-w-md transform transition-all duration-300 overflow-auto">
//           <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
//             <h3 className="text-xl font-bold text-gray-900">Filters</h3>
//             <button 
//               onClick={onClose}
//               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             >
//               <X className="w-5 h-5 text-gray-500" />
//             </button>
//           </div>
//           <div className="p-6">
//             {children}
//           </div>
//         </div>
//       </div>
//     );
//   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
// //         <div className="w-16 h-16 mb-6 relative">
// //           <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-purple-500 animate-spin"></div>
// //           <Package className="w-8 h-8 text-purple-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
// //         </div>
// //         <p className="text-gray-600 animate-pulse">Loading products...</p>
// //       </div>
// //     );
// //   }
//   return (
// //     <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 font-clarity">
// //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
// //       <div className="col-span-2 overflow-y-scroll no-scrollbar">
// //         <div className="w-full flex flex-col md:flex-row items-center justify-between">
// //           <h2 className="text-xl font-bold mb-5 md:mb-0">Directory search</h2>
// //           <div className="flex gap-2">
// //             <Search
// //               placeholders={placeholders}
// //               onChange={handleChange}
// //               onSubmit={onSubmit}
// //             />
// //             <div className="block md:hidden">
// //               <Sheet>
// //                 <SheetTrigger asChild>
// //                   <button className="flex gap-2 rounded-full bg-white text-gray-900 border border-gray-700 font-bold px-6 py-3 text-xs transition-all w-fit items-center hover:bg-primary1 hover:text-white hover:border-white">
// //                     <Image
// //                       src={"/filtericon.svg"}
// //                       width={20}
// //                       height={20}
// //                       alt="icon"
// //                     />
// //                     <span className="text-sm mr-2">Filter</span>
// //                   </button>
// //                 </SheetTrigger>
// //                 <SheetContent>
// //                   <DirectoryFilter
// //                     selectedFilters={selectedFilters}
// //                     handleFilterChange={handleFilterChange}
// //                     setSelectedFilters={setSelectedFilters}
// //                   />
// //                 </SheetContent>
// //               </Sheet>
// //             </div>
// //           </div>
// //         </div>
// //         {/* Displaying Comparison Button */}
// //         {compareProducts.length === 2 && (
// //           <button
// //             onClick={handleCompareClick}
// //             className="mb-4 mt-4 bg-green-500 text-white px-4 py-2 rounded"
// //           >
// //             Compare Products
// //           </button>
// //         )}
// //         {/* Displaying Comparison Modal */}
// //         <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Product Comparison">
// //           <div className="bg-white rounded-md max-w-screen-md mx-auto overflow-x-auto font-clarity">
// //           {compareProducts.length === 2 && (
// //           <div className="w-full border border-gray-200">
// //         {/* Header Section */}
// //         <div className="flex bg-gray-100 border-b border-gray-200">
// //           <div className="flex-1 border-r border-gray-200 px-4 py-2 text-center">Product 1</div>
// //           <div className="flex-1 px-4 py-2 text-center">Product 2</div>
// //         </div>
      
// //         {/* Content Section */}
 

// //         <div className="flex flex-col">
// //           {/* Logos */}
// //           <div className="flex border-b border-gray-200">
// //             <div className="flex-1 border-r border-gray-200 px-4 py-2 flex items-center justify-center">
// //               <img src={compareProducts[0].logoUrl} alt="Product 1 Logo" className="h-24 w-24" />
// //             </div>
// //             <div className="flex-1 px-4 py-2 flex items-center justify-center">
// //               <img src={compareProducts[1].logoUrl} alt="Product 2 Logo" className="h-24 w-24" />
// //             </div>
// //           </div>
      
// //          {/* Product Names */}
// // {/* Product Names */}
// //           <div className="flex border-b border-gray-200">
// //             <div className="w-[50%] border-r border-gray-200 px-4 py-2 break-words">
// //               {compareProducts[0].name}
// //             </div>
// //             <div className="w-[50%] px-4 py-2 break-words">
// //               {compareProducts[1].name}
// //             </div>
// //           </div>

      
// //           {/* Categories */}
// //           <div className="flex border-b border-gray-200">
// //             <div className="w-[50%] border-r border-gray-200 px-4 py-2 break-words">
// //             <h1 className="text-lg font-bold mb-2">Category </h1>
// //               {compareProducts[0].category}
// //             </div>
// //             <div className="w-[50%] px-4 py-2 break-words">
// //             <h1 className="text-lg font-bold mb-2">Category </h1>
// //               {compareProducts[1].category}
// //             </div>
// //           </div>


      
// //           {/* Deployment */}
// //           <div className="flex border-b border-gray-200">
// //             <div className="w-[50%] break-words flex-1 border-r border-gray-200 px-4 py-2">
// //             <h1 className="text-lg font-bold mb-2 ">Deployment </h1>
// //               <ul className="mb-4 ml-1 space-y-2">
// //                 {compareProducts[0].deployement.map((option: string, index: number) => (
// //                   <li key={index} className="flex items-start">
// //                     <span className="mr-1">
// //                       <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
// //                     </span>
// //                     {option}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //             <div className="w-[50%] break-words flex-1 px-4 py-2">
// //             <h1 className="text-lg font-bold mb-2">Deployment </h1>
// //               <ul className="mb-4 ml-1 space-y-2">
// //                 {compareProducts[1].deployement.map((option: string, index: number) => (
// //                   <li key={index} className="flex items-start">
// //                     <span className="mr-1">
// //                       <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
// //                     </span>
// //                     {option}
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>
// //           </div>
      
// //           {/* Mobile Availability */}
// //           <div className="flex border-b border-gray-200">
// //             <div className="w-[50%]  break-words flex-1 border-r border-gray-200 px-4 py-2">
// //               <h1 className="text-lg font-bold mb-2">Mobile Availibility</h1>
// //               {compareProducts[0].mobileAvailable}
// //               </div>
// //             <div className="w-[50%] break-words flex-1 px-4 py-2">
             
// //             <h1 className="text-lg font-bold   mb-2">Mobile Availibility</h1>
// //               {compareProducts[1].mobileAvailable}
              
// //               </div>
// //           </div>
      
// //           {/* Average Time Adoption */}
// //           <div className="flex border-b border-gray-200">
// //             <div className="flex-1 border-r border-gray-200 px-4 py-2">
// //             <h1 className="text-lg font-bold mb-2">Average Adoption Time</h1>
// //               {compareProducts[0].avgTimeAdoption}</div>
// //             <div className="flex-1 px-4 py-2">
// //             <h1 className="text-lg font-bold mb-2">Average Adoption Time</h1>
// //               {compareProducts[1].avgTimeAdoption}</div>
// //           </div>
      
// //           {/* Team Size */}
// //           <div className="flex border-b border-gray-200">
// //             <div className="flex-1 border-r border-gray-200 px-4 py-2">
// //             <h1 className="text-lg font-bold mb-2">Target client's team size
// //             </h1>
// //               {compareProducts[0].company.TeamSize}</div>
// //             <div className="flex-1 px-4 py-2">
// //             <h1 className="text-lg font-bold mb-2">Target client's team size
// //             </h1>{compareProducts[1].company.TeamSize}</div>
// //           </div>
      
// //           {/* Features */}
// //           <div className="flex border-b border-gray-200">
// //             <div className="flex-1 w-[50%] break-words border-r border-gray-200 px-4 py-2">
// //             <h6 className="text-xl font-bold mb-4">Features</h6>
// //               <CompareProductFeatures features={compareProducts[0].features} productId={compareProducts[0].slug} />
// //             </div>
// //             <div className="flex-1 w-[50%] break-words px-4 py-2">
// //             <h6 className="text-xl font-bold mb-4">Features</h6>
// //               <CompareProductFeatures features={compareProducts[1].features} productId={compareProducts[1].slug} />
// //             </div>
// //           </div>
      
// //           {/* Process Lifecycle */}
// //           <div className="flex border-b border-gray-200">
// //             <div className="flex-1 border-r border-gray-200 px-4 py-2">
// //             <h1 className="text-lg font-bold mb-2">Process lifecycle </h1>
// //               <ProcessLifecycle product={compareProducts[0]} />
// //             </div>
// //             <div className="flex-1 px-4 py-2">
// //             <h1 className="text-lg font-bold mb-2">Process lifecycle </h1>
// //               <ProcessLifecycle product={compareProducts[1]} />
// //             </div>
// //           </div>
      
// //           {/* Practice Areas */}
// //           <div className="flex flex-wrap border-b border-gray-200">
// //             <div className="flex-1 border-r border-gray-200 px-4 py-2">
// //               <h1 className=" py-4  text-lg font-bold "> Practice Areas</h1>
// //               {compareProducts[0].practiceAreas.map((segment: string) => (

// //                 <div
// //                   key={segment}
// //                   className="py-1 mb-4  px-2.5 border transition-all duration-200 hover:cursor-pointer rounded-full text-xs bg-primary2 border-primary1 text-primary1"
// //                 >

// //                   {segment}
// //                 </div>
// //               ))}
// //             </div>
// //             <div className="flex-1 px-4 py-2">
// //             <h1 className=" py-4  text-lg font-bold "> Practice Areas</h1>
// //               {compareProducts[1].practiceAreas.map((segment: string) => (
// //                 <div
// //                   key={segment}
// //                   className="py-1 mb-4  px-2.5 border transition-all duration-200 hover:cursor-pointer rounded-full text-xs bg-primary2 border-primary1 text-primary1"
// //                 >
// //                   {segment}
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
      
// //           {/* User Categories */}
// //           <div className="flex flex-wrap border-b border-gray-200">
// //             <div className="flex-1 border-r border-gray-200 px-4 py-2">
// //             <h1 className=" py-4  text-lg font-bold "> Target Customer  Segments</h1>
// //               {compareProducts[0].userCategory.map((segment: string) => (
// //                 <div
// //                   key={segment}
// //                   className="py-1 mb-4  px-2.5 border transition-all duration-200 hover:cursor-pointer rounded-full text-xs bg-primary2 border-primary1 text-primary1"
// //                 >
// //                   {segment}
// //                 </div>
// //               ))}
// //             </div>
// //             <div className="flex-1   px-4 py-2">
// //             <h1 className=" py-4  text-lg font-bold"> Target Customer  Segments</h1>
// //               {compareProducts[1].userCategory.map((segment: string) => (
// //                 <div
// //                   key={segment}
// //                   className="py-1 mb-4  px-2.5 border transition-all duration-200 hover:cursor-pointer rounded-full text-xs bg-primary2 border-primary1 text-primary1"
// //                 >
// //                   {segment}
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
      
// //           {/* Industry */}
// //           <div className="flex flex-wrap border-b border-gray-200">
// //             <div className="flex-1 border-r border-gray-200 px-4 py-2">
// //             <h1 className=" py-4  text-lg font-bold "> Target industries 
// //             </h1>
// //               {compareProducts[0].industry.map((segment: string) => (
// //                 <div
// //                   key={segment}
// //                   className="py-1 mb-4 px-2.5 border transition-all duration-200 hover:cursor-pointer rounded-full text-xs bg-primary2 border-primary1 text-primary1"
// //                 >
// //                   {segment}
// //                 </div>
// //               ))}
// //             </div>
// //             <div className="flex-1 px-4 py-2">
// //             <h1 className=" py-4  text-lg font-bold "> Target industries 
// //             </h1>
// //               {compareProducts[1].industry.map((segment: string) => (
// //                 <div
// //                   key={segment}
// //                   className="py-1  mb-4 px-2.5 border transition-all duration-200 hover:cursor-pointer rounded-full text-xs bg-primary2 border-primary1 text-primary1"
// //                 >
// //                   {segment}
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
      
// //           {/* Add other properties similarly */}
// //         </div>
// //       </div>
// //     )}
// //   </div>
// // </Modal>



// //         <div className="flex flex-col gap-4 mt-4 mb-4">
// //           {filteredProducts.length > 0 ? (
// //             filteredProducts.map((product: any) => (
// //               <div key={product.id} className="relative">
// //                 <NormalProduct
// //                   id={product.id}
// //                   image={product.logoUrl}
// //                   title={product.name}
// //                   description={product.description}
// //                   category={product.category}
// //                   product={product}
// //                 />
// //                 <button
// //                   onClick={() => toggleCompareProduct(product)}
// //                   className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
// //                 >
// //                   {compareProducts.some((p) => p.id === product.id)
// //                     ? 'Remove from Compare'
// //                     : 'Compare'}
// //                 </button>
// //               </div>
// //             ))
// //           ) : (
// //             <div className="text-center text-gray-600">No products found</div>
// //           )}
// //         </div>
// //         <div className="w-full flex items-center justify-center mt-10">
// //           <button className="flex gap-2 rounded-full bg-primary1 text-white font-bold px-6 py-3 text-xs transition-all w-fit items-center hover:bg-gray-900 hover:gap-4 duration-200">
// //             Next
// //             <IoIosArrowRoundForward className="text-xl" />
// //           </button>
// //         </div>
// //       </div>
// //       <div className="h-fit w-full md:w-[300px] md:col-span-1 sticky top-0 hidden md:block">
// //         <h2 className="text-lg font-bold text-gray-900 mb-4">Filters</h2>
// //         <DirectoryFilter
// //           selectedFilters={selectedFilters}
// //           handleFilterChange={handleFilterChange}
// //           setSelectedFilters={setSelectedFilters}
// //         />
// //       </div>
// //     </div>
// //   </div>
// <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
// <div className="max-w-screen-xl mx-auto px-4 py-12">
//   {/* Custom Header Section */}
//   <div className="relative mb-8">
//     <div className="relative px-8 py-8 rounded-3xl bg-white border border-purple-100 shadow-lg">
//       <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl opacity-50" />
//       <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//         <div>
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//             Directory Search
//           </h1>
//           <p className="mt-2 text-gray-600">
//             Find and compare the perfect products for your needs
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
//           {/* Custom Search Input */}
//           <div className="relative flex-1 sm:flex-none group">
//             <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-200" />
//             <div className="relative flex items-center">
//               {/* <Search className="absolute left-4 w-5 h-5 text-gray-400" /> */}
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 onChange={handleChange}
//                 className="w-full sm:w-72 pl-12 pr-4 py-3 rounded-xl bg-white border-0 focus:ring-2 focus:ring-purple-500 outline-none shadow-sm"
//               />
//             </div>
//           </div>

//           {/* Custom Filter Button */}
//           <button
//             onClick={() => setIsFilterOpen(true)}
//             className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-purple-200 text-gray-700 
//                      hover:border-purple-300 hover:bg-purple-50 hover:shadow-md transition-all duration-200 
//                      active:scale-95 group"
//           >
//             <Filter className="w-5 h-5 text-purple-500 group-hover:text-purple-600" />
//             <span className="font-medium">Filters</span>
//           </button>

//           {/* Custom View Toggle */}
//           <div className="flex items-center gap-1 p-1 bg-purple-50 rounded-lg">
//             <button
//               onClick={() => setViewMode('grid')}
//               className={`p-2 rounded-lg transition-all duration-200 ${
//                 viewMode === 'grid'
//                   ? 'bg-white text-purple-600 shadow-sm'
//                   : 'text-gray-600 hover:text-purple-600'
//               }`}
//             >
//               <Grid className="w-5 h-5" />
//             </button>
//             <button
//               onClick={() => setViewMode('list')}
//               className={`p-2 rounded-lg transition-all duration-200 ${
//                 viewMode === 'list'
//                   ? 'bg-white text-purple-600 shadow-sm'
//                   : 'text-gray-600 hover:text-purple-600'
//               }`}
//             >
//               <List className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Compare Button */}
//   {compareProducts.length === 2 && (
//     <div className="mb-8">
//       <button
//         onClick={handleCompareClick}
//         className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
//                  text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 
//                  shadow-lg hover:shadow-xl active:scale-[0.99] relative group overflow-hidden"
//       >
//         <span className="relative z-10">Compare Selected Products</span>
//         <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
//       </button>
//     </div>
//   )}

//   {/* Products Grid */}
//   <div className={`grid gap-6 ${
//     viewMode === 'grid' 
//       ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2' 
//       : 'grid-cols-1'
//   }`}>
    
//     {filteredProducts.map((product) => (
//   <div 
//     key={product.id} 
//     className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl 
//              transition-all duration-300 border border-purple-100/50 overflow-hidden"
//   >
//     <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 
//                   opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
//     <NormalProduct
//       id={product.id}
//       image={product.logoUrl}
//       title={product.name}
//       description={product.description}
//       category={product.category}
//       product={product}
//     />
    
//     {/* Compare Button - Positioned at bottom right */}
//     <div className="absolute bottom-6 right-6">
//       <button
//         onClick={() => toggleCompareProduct(product)}
//         className="bg-white/90 backdrop-blur-sm hover:bg-white text-purple-600 
//                  px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 
//                  shadow-sm border border-purple-200 hover:shadow-md hover:scale-105"
//       >
//         {compareProducts.some((p) => p.id === product.id)
//           ? 'Remove Compare'
//           : 'Compare'}
//       </button>
//     </div>
//   </div>
// ))}
//   </div>

//   {/* Custom Filter Modal */}
//   <FilterModal 
//     isOpen={isFilterOpen} 
//     onClose={() => setIsFilterOpen(false)}
//   >
//     <DirectoryFilter
//       selectedFilters={selectedFilters}
//       handleFilterChange={handleFilterChange}
//       setSelectedFilters={setSelectedFilters}
//     />
//   </FilterModal>
// </div>
// </div>

// );
// }

// export default DirectoryProduct;

"use client";
import React, { useEffect, useState } from "react";
import NormalProduct from "@/components/NormalProduct";
import CompareProduct from "@/components/CompareProduct";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa6";
import Search from "@/components/animated-ui/Search";
import DirectoryFilter from "./DirectoryFilter";
import Image from "next/image";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Component } from "lucide-react";
import Modal from '@/components/Modal';
import { FaCircleCheck } from "react-icons/fa6";
import ProcessLifecycle from "@/components/ProcessLifecycle";
import ProductFeature from "@/components/ProductFeature";
import CompareProductFeatures from "@/components/CompareProductFeatures";
import { Package, Grid, List, RefreshCw, Filter, X } from 'lucide-react';
import { SheetClose } from '@/components/ui/sheet';

const placeholders = [
  "Contract Management",
  "Case Management",
  "Compliance Management",
];

const categoryKeywords: { [key: string]: string[] } = {
  "Client Relationship Management ": [
    "CRM",
    "Client Relationship Management",
    "Customer Relationship Management",
    "Client Relationship Management ",
    "CRM",
    "CMS",
  ],
  "Governance, Risk and Compliance": [
    "GRC",
    "Governance",
    "Risk Compliance",
    "Governance",
    "Risk Management",
    "Compliance and Risk Management",
    "Compliance Management",
    "GCR",
  ],
  "Contract Lifecycle Management": [
    "CLM",
    "CMS",
    "Contract Software",
    "Contract Lifecycle Management",
    "Contract Management",
  ],
  "E-Signature": [
    "E-Signature",
    "Electronic Signature",
    "E-Signature",
    "E-Signature",
    "Signature",
    "DS",
    "Signature Software",
  ],
  "Document Management System": [
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
  // ... rest of your category keywords remain the same
};

interface ProcessLifecycleProps {
  product: {
    processLifecycle: {
      category: string;
      subcategories: string[];
    }[];
  };
}

const lifecycleStages = [
  {
    category: "Client Relationship Management ",
    stages: [
      "Intake",
      "Assessment",
      "Strategize",
      "Represent",
      "Communication",
      "Review",
    ],
  },
  // ... rest of your lifecycle stages remain the same
];

// Custom Filter Modal Component
const FilterModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end transition-all duration-300">
      <div className="bg-white h-full w-full max-w-md transform transition-all duration-300 overflow-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Filters</h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Comparison Modal Content Component
const ComparisonContent = ({ products }) => {
  if (!Array.isArray(products) || products.length !== 2) return null;

  const renderSection = (title, content1, content2) => (
    <div className="flex border-b border-gray-200">
      <div className="w-[50%] border-r border-gray-200 px-4 py-2 break-words">
        <h1 className="text-lg font-bold mb-2">{title}</h1>
        {content1}
      </div>
      <div className="w-[50%] px-4 py-2 break-words">
        <h1 className="text-lg font-bold mb-2">{title}</h1>
        {content2}
      </div>
    </div>
  );

  const renderDeployment = (deployement) => (
    <ul className="mb-4 ml-1 space-y-2">
      {deployement.map((option: string, index: number) => (
        <li key={index} className="flex items-start">
          <span className="mr-1">
            <FaCircleCheck className="w-5 h-5 mt-px text-teal-500" />
          </span>
          {option}
        </li>
      ))}
    </ul>
  );

  const renderTags = (items) => (
    items.map((segment: string) => (
      <div
        key={segment}
        className="py-1 mb-4 px-2.5 border transition-all duration-200 hover:cursor-pointer rounded-full text-xs bg-primary2 border-primary1 text-primary1"
      >
        {segment}
      </div>
    ))
  );

  return (
    <div className="bg-white rounded-md max-w-screen-md mx-auto overflow-x-auto font-clarity">
      <div className="w-full border border-gray-200">
        {/* Headers */}
        <div className="flex bg-gray-100 border-b border-gray-200">
          <div className="flex-1 border-r border-gray-200 px-4 py-2 text-center">Product 1</div>
          <div className="flex-1 px-4 py-2 text-center">Product 2</div>
        </div>

        {/* Logos */}
        <div className="flex border-b border-gray-200">
          <div className="flex-1 border-r border-gray-200 px-4 py-2 flex items-center justify-center">
            <img src={products[0].logoUrl} alt="Product 1 Logo" className="h-24 w-24" />
          </div>
          <div className="flex-1 px-4 py-2 flex items-center justify-center">
            <img src={products[1].logoUrl} alt="Product 2 Logo" className="h-24 w-24" />
          </div>
        </div>

        {/* Product Names */}
        {renderSection("Product Name", products[0].name, products[1].name)}
        
        {/* Categories */}
        {renderSection("Category", products[0].category, products[1].category)}
        
        {/* Deployment */}
        {renderSection("Deployment", 
          renderDeployment(products[0].deployement),
          renderDeployment(products[1].deployement)
        )}
        
        {/* Mobile Availability */}
        {renderSection("Mobile Availability", 
          products[0].mobileAvailable,
          products[1].mobileAvailable
        )}
        
        {/* Average Time Adoption */}
        {renderSection("Average Adoption Time", 
          products[0].avgTimeAdoption,
          products[1].avgTimeAdoption
        )}
        
        {/* Team Size */}
        {renderSection("Target client's team size", 
          products[0].company.TeamSize,
          products[1].company.TeamSize
        )}
        
        {/* Features */}
        {renderSection("Features",
          <CompareProductFeatures features={products[0].features} productId={products[0].slug} />,
          <CompareProductFeatures features={products[1].features} productId={products[1].slug} />
        )}
        
        {/* Process Lifecycle */}
        {renderSection("Process lifecycle",
          <ProcessLifecycle product={products[0]} />,
          <ProcessLifecycle product={products[1]} />
        )}
        
        {/* Practice Areas */}
        {renderSection("Practice Areas",
          renderTags(products[0].practiceAreas),
          renderTags(products[1].practiceAreas)
        )}
        
        {/* User Categories */}
        {renderSection("Target Customer Segments",
          renderTags(products[0].userCategory),
          renderTags(products[1].userCategory)
        )}
        
        {/* Industry */}
        {renderSection("Target industries",
          renderTags(products[0].industry),
          renderTags(products[1].industry)
        )}
      </div>
    </div>
  );
};

function DirectoryProduct() {
  // State Management
  const [featureProduct, setFeatureProduct] = useState([]);
  const [latestProduct, setLatestProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [compareProducts, setCompareProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    userCategory: [],
    language: [],
    country: [],
    industry: [],
    practiceAreas: [],
    mobileAvailable: [],
    price: [],
  });

  // Enhanced fetch products function
  const fetchProducts = async (search = "") => {
    try {
      const response = await fetch("/api/get-all-products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number: 10 }),
        cache: "no-cache",
        next: { revalidate: 10 },
      });
      const data = await response.json();

      if (data.success) {
        const products = data.products.filter(
          (product: any) => product.active === "publish"
        );
        const searchLower = search.toLowerCase().trim();

        const filtered = products.filter((product: any) => {
          // Improved search functionality
          if (searchLower) {
            const searchTerms = searchLower.split(/\s+/);
            const matchesSearch = searchTerms.every(term => 
              product.name?.toLowerCase().includes(term) ||
              product.description?.toLowerCase().includes(term) ||
              product.category?.some((cat: string) => {
                const keywords = categoryKeywords[cat] || [];
                return keywords.some(keyword =>
                  keyword.toLowerCase().includes(term) ||
                  term.includes(keyword.toLowerCase())
                );
              }) ||
              product.industry?.some((ind: string) => 
                ind.toLowerCase().includes(term)
              )
            );
            if (!matchesSearch) return false;
          }

          // Filter functionality
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

          const matchesSelectedUserCategory =
            selectedFilters.userCategory.length === 0 ||
            product.userCategory.some((cat: string) => {
              const categoryName = cat.split('|')[0];
              return selectedFilters.userCategory.includes(categoryName as never);
            });

          return (
            matchesSelectedCategory &&
            matchesSelectedLanguage &&
            matchesSelectedCountry &&
            matchesSelectedUserCategory
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

  // Enhanced comparison functionality
  const toggleCompareProduct = (product: any) => {
    setCompareProducts((prev) => {
      const isAlreadySelected = prev.some((p) => p.id === product.id);
      const maxProducts = 2;

      // If the product is already selected, remove it
      if (isAlreadySelected) {
        return prev.filter((p) => p.id !== product.id);
      }

      const allProducts = [...prev, product];
      
      // Check if we're trying to add more than the maximum allowed
      if (allProducts.length > maxProducts) {
        alert('You can only compare up to two products at a time.');
        return prev;
      }

      // Check if categories match when adding a second product
      if (prev.length === 1) {
        const firstCategory = prev[0].category;
        const newCategory = product.category;
        
        // Check if categories have any overlap
        const hasMatchingCategory = firstCategory.some((cat1: string) =>
          newCategory.some((cat2: string) => cat1 === cat2)
        );

        if (!hasMatchingCategory) {
          alert('Please select products from the same category for comparison.');
          return prev;
        }
      }

      return allProducts;
    });
  };

  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchProducts(value); // Immediate search without debounce
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const handleCompareClick = () => {
    setIsModalOpen(true);
  };

  // Effects
  useEffect(() => {
    fetchProducts(searchTerm);
  }, [selectedFilters]);

  // Continue from Part 3...
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        {/* Custom Header Section */}
        <div className="relative mb-8">
          <div className="relative px-8 py-8 rounded-3xl bg-white border border-purple-100 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl opacity-50" />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Directory Search
                </h1>
                <p className="mt-2 text-gray-600">
                  Find and compare the perfect products for your needs
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Search Input */}
                <div className="relative flex-1 sm:flex-none group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-200" />
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="w-full sm:w-72 pl-12 pr-4 py-3 rounded-xl bg-white border-0 focus:ring-2 focus:ring-purple-500 outline-none shadow-sm"
                    />
                  </div>
                </div>

                {/* Filter Button */}
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-purple-200 text-gray-700 
                           hover:border-purple-300 hover:bg-purple-50 hover:shadow-md transition-all duration-200 
                           active:scale-95 group"
                >
                  <Filter className="w-5 h-5 text-purple-500 group-hover:text-purple-600" />
                  <span className="font-medium">Filters</span>
                </button>

                {/* View Toggle */}
                <div className="flex items-center gap-1 p-1 bg-purple-50 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === 'list'
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compare Bar */}
        {compareProducts.length === 2 && (
          <div className="mb-8">
            <button
              onClick={handleCompareClick}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                       text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 
                       shadow-lg hover:shadow-xl active:scale-[0.99] relative group overflow-hidden"
            >
              <span className="relative z-10">Compare Selected Products</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </div>
        )}

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl 
                       transition-all duration-300 border border-purple-100/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <NormalProduct
                id={product.id}
                image={product.logoUrl}
                title={product.name}
                description={product.description}
                category={product.category}
                product={product}
              />
              
              {/* Compare Button */}
              <div className="absolute bottom-6 right-6">
                <button
                  onClick={() => toggleCompareProduct(product)}
                  className="bg-white/90 backdrop-blur-sm hover:bg-white text-purple-600 
                           px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                           shadow-sm border border-purple-200 hover:shadow-md hover:scale-105"
                >
                  {compareProducts.some((p) => p.id === product.id)
                    ? 'Remove Compare'
                    : 'Compare'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modals */}
        <FilterModal 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)}
        >
          <DirectoryFilter
            selectedFilters={selectedFilters}
            handleFilterChange={handleFilterChange}
            setSelectedFilters={setSelectedFilters}
          />
        </FilterModal>

        <Modal 
          open={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Product Comparison"
        >
          <ComparisonContent products={compareProducts} />
        </Modal>
      </div>
    </div>
  );
}

export default DirectoryProduct;