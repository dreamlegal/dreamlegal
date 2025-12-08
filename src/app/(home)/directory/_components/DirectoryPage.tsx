







// import { useState, useEffect, useCallback, useRef } from "react";
// import { Search, ChevronDown } from "lucide-react";
// import ProductCard from "./ProductCard";
// import ProductComparison from "./ProductComparison";

// const ITEMS_PER_PAGE = 12;

// // Debounce
// const useDebounce = (callback, delay) => {
//   const timeoutRef = useRef(null);
//   return useCallback(
//     (...args) => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//       timeoutRef.current = setTimeout(() => callback(...args), delay);
//     },
//     [callback, delay]
//   );
// };

// // Options
// const categoryOptions = [
//   { value: "CONTRACT_LIFECYCLE_MANAGEMENT", label: "Contract Lifecycle Management" },
//   { value: "LEGAL_AI", label: "Legal AI" },
//   { value: "DOCUMENT_MANAGEMENT_SYSTEM", label: "Document Management System" },
//   { value: "LITIGATION_MANAGEMENT_AND_ANALYTICS", label: "Litigation Management & Analytics" },
//   { value: "IP_MANAGEMENT", label: "Intellectual Property Management" },
//   { value: "LEGAL_RESEARCH", label: "Legal Research" },
//   { value: "E_DISCOVERY", label: "E-Discovery" },
//   { value: "CASE_MANAGEMENT", label: "Case Management" },
//   { value: "GOVERNANCE_RISK_COMPLIANCE", label: "Governance, Risk & Compliance (GRC)" },
//   { value: "LEGAL_DUE_DILIGENCE", label: "Legal Due Diligence" },
//   { value: "TIMEKEEPING_SOFTWARE", label: "Timekeeping Software" },
//   { value: "LEGAL_INTAKE_SOFTWARE", label: "Legal Intake Software" },
//   { value: "TRANSACTION_MANAGEMENT_SOFTWARE", label: "Transaction Management Software" }
// ];

// const pricingTierOptions = [
//   { value: "", label: "All Pricing" },
//   { value: "BUDGET", label: "Budget ($)" },
//   { value: "MID_RANGE", label: "Mid-Range ($$)" },
//   { value: "PREMIUM", label: "Premium ($$$)" },
//   { value: "ENTERPRISE", label: "Enterprise ($$$+)" }
// ];

// const targetUserOptions = [
//   { value: "", label: "All Target Users" },
//   { value: "ENTERPRISE", label: "Enterprise / Corporate Teams" },
//   { value: "LAW_FIRM", label: "Law Firms / Attorneys" },
//   { value: "INHOUSE", label: "In-House Departments / Counsel" },
//   { value: "INDIVIDUAL", label: "Individual Lawyers / Chambers" }
// ];

// export default function DirectoryPage() {
//   const [products, setProducts] = useState([]);
//   const [compareProducts, setCompareProducts] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [searchTerm, setSearchTerm] = useState("");

//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedPricingTier, setSelectedPricingTier] = useState("");
//   const [selectedTargetUser, setSelectedTargetUser] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // Build filters (state OR override)
//   const getFilters = (override = {}) => {
//     const cats = override.categories ?? selectedCategories;
//     const price = override.pricingTiers ?? (selectedPricingTier ? [selectedPricingTier] : []);
//     const target = override.targetUserGroup ?? selectedTargetUser;

//     const filters = {};
//     if (cats.length > 0) filters.categories = cats;
//     if (price.length > 0) filters.pricingTiers = price;
//     if (target) filters.targetUserGroup = target;

//     return filters;
//   };
//   useEffect(() => {
//   const params = new URLSearchParams(window.location.search);

//   const targetUser = params.get("targetUser");
//   const category = params.get("category");
//   const pricing = params.get("pricing");
//   const search = params.get("search");

//   if (targetUser) {
//     setSelectedTargetUser(targetUser);
//   }

//   if (category) {
//     setSelectedCategories([category]);
//   }

//   if (pricing) {
//     setSelectedPricingTier(pricing);
//   }

//   if (search) {
//     setSearchTerm(search);
//   }

//   // Now fetch based on these params
//   fetchProducts(1, {
//     categories: category ? [category] : [],
//     pricingTiers: pricing ? [pricing] : [],
//     targetUserGroup: targetUser || "",
//   });
// }, []);


//   // Fetch products
//   const fetchProducts = async (page = 1, override = {}) => {
//     try {
//       setLoading(true);

//       const response = await fetch("/api/get-legal-softwares", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           page,
//           limit: ITEMS_PER_PAGE,
//           filters: getFilters(override)
//         })
//       });

//       const data = await response.json();
//       if (!data.success) throw new Error(data.error);

//       setProducts(data.products);
//       setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Search API
//   const performSearch = async (term, page = 1, override = {}) => {
//     try {
//       setLoading(true);

//       const response = await fetch("/api/search-legal-softwares", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           searchTerm: term,
//           page,
//           limit: ITEMS_PER_PAGE,
//           filters: getFilters(override)
//         })
//       });

//       const data = await response.json();
//       if (!data.success) throw new Error(data.error);

//       setProducts(data.products);
//       setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
//     } catch (err) {
//       console.error(err);
//       setError("Search failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const debouncedSearch = useDebounce((term) => {
//     performSearch(term, 1);
//   }, 300);

//   const handleSearchChange = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);

//     if (term.trim()) debouncedSearch(term);
//     else fetchProducts(1);
//   };

//   const toggleCompareProduct = (product) => {
//   setCompareProducts(prev => {
//     if (prev.find(p => p.id === product.id)) {
//       return prev.filter(p => p.id !== product.id);
//     }
//     if (prev.length >= 2) {
//       alert("You can only compare up to 2 products");
//       return prev;
//     }
//     return [...prev, product];
//   });
// };

//   useEffect(() => {
//     fetchProducts(1);
//   }, []);

//   // Pagination
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     if (searchTerm.trim()) performSearch(searchTerm, page);
//     else fetchProducts(page);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pt-24 px-4">
//       <div className="max-w-7xl mx-auto">

//         <h1 className="text-3xl font-bold text-[#1e2556]">Legal Tech Directory</h1>
//         <p className="text-gray-600 mb-6">Find the best legal-tech tools for your practice.</p>

//         {/* FILTER BAR - All in one row */}
//      <div className="flex flex-wrap items-center gap-3 mb-6">
//   {/* Search */}
//   <div className="relative flex-1 min-w-[200px]">
//     <input
//       type="text"
//       placeholder="Search..."
//       className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//     <svg 
//       className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
//       fill="none" 
//       stroke="currentColor" 
//       viewBox="0 0 24 24"
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//     </svg>
//   </div>

//   {/* Categories */}
//   <div className="relative">
//     {selectedCategories.length > 0 && (
//       <div className="flex flex-wrap gap-2 mb-2">
//         {selectedCategories.map((cat) => (
//           <span
//             key={cat}
//             className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
//           >
//             {categoryOptions.find((c) => c.value === cat)?.label}
//             <button
//               onClick={() => {
//                 const updated = selectedCategories.filter((c) => c !== cat);
//                 setSelectedCategories(updated);
//                 fetchProducts(1, {
//                   categories: updated,
//                   pricingTiers: selectedPricingTier ? [selectedPricingTier] : [],
//                   targetUserGroup: selectedTargetUser
//                 });
//               }}
//               className="hover:text-blue-900"
//             >
//               ×
//             </button>
//           </span>
//         ))}
//       </div>
//     )}
//     <div className="relative">
//       <select
//         onChange={(e) => {
//           const val = e.target.value;
//           if (!val) return;
//           const updated = selectedCategories.includes(val)
//             ? selectedCategories
//             : [...selectedCategories, val];
//           setSelectedCategories(updated);
//           fetchProducts(1, {
//             categories: updated,
//             pricingTiers: selectedPricingTier ? [selectedPricingTier] : [],
//             targetUserGroup: selectedTargetUser
//           });
//           e.target.value = "";
//         }}
//         className="w-full pl-3 pr-10 py-3 border rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//       >
//         <option value="">Select category...</option>
//         {categoryOptions.map((o) => (
//           <option key={o.value} value={o.value}>
//             {o.label}
//           </option>
//         ))}
//       </select>
//       <svg 
//         className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//         fill="none" 
//         stroke="currentColor" 
//         viewBox="0 0 24 24"
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//       </svg>
//     </div>
//   </div>

//   {/* Target User */}
//   <div className="relative">
//     <select
//       value={selectedTargetUser}
//       onChange={(e) => {
//         const val = e.target.value;
//         setSelectedTargetUser(val);
//         fetchProducts(1, {
//           categories: selectedCategories,
//           pricingTiers: selectedPricingTier ? [selectedPricingTier] : [],
//           targetUserGroup: val
//         });
//       }}
//       className="w-full pl-3 pr-10 py-3 border rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//     >
//       {targetUserOptions.map((o) => (
//         <option key={o.value} value={o.value}>
//           {o.label}
//         </option>
//       ))}
//     </select>
//     <svg 
//       className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//       fill="none" 
//       stroke="currentColor" 
//       viewBox="0 0 24 24"
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//     </svg>
//   </div>

//   {/* Pricing */}
//   <div className="relative">
//     <select
//       value={selectedPricingTier}
//       onChange={(e) => {
//         const val = e.target.value;
//         setSelectedPricingTier(val);
//         fetchProducts(1, {
//           categories: selectedCategories,
//           pricingTiers: val ? [val] : [],
//           targetUserGroup: selectedTargetUser
//         });
//       }}
//       className="w-full pl-3 pr-10 py-3 border rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//     >
//       {pricingTierOptions.map((o) => (
//         <option key={o.value} value={o.value}>
//           {o.label}
//         </option>
//       ))}
//     </select>
//     <svg 
//       className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//       fill="none" 
//       stroke="currentColor" 
//       viewBox="0 0 24 24"
//     >
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//     </svg>
//   </div>
// </div>


// {compareProducts.length > 0 && (
//   <div className="mb-6 sm:mb-8">
//     <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 rounded-full bg-[#7cc6ee] text-white flex items-center justify-center text-sm font-bold">
//             {compareProducts.length}
//           </div>
//           <span className="font-medium text-[#1e2556]">
//             {compareProducts.length} products selected for comparison
//           </span>
//         </div>

//         {compareProducts.length === 2 && (
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="px-4 py-2 bg-[#1e2556] text-white rounded-lg"
//           >
//             Compare Products
//           </button>
//         )}

//       </div>
//     </div>
//   </div>
// )}

//         {/* Products */}
//         {loading ? (
//           <div className="py-10 text-center">Loading...</div>
//         ) : products.length === 0 ? (
//           <div className="py-10 text-center">No products found</div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//               {products.map((p) => (
//                <ProductCard
//   key={p.id}
//   product={p}
//   onCompare={toggleCompareProduct}
//   isCompared={compareProducts.some(cp => cp.id === p.id)}
// />

//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center gap-2 mt-6">
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => handlePageChange(page)}
//                   className={`px-4 py-2 rounded-lg ${
//                     page === currentPage ? "bg-[#1e2556] text-white" : "border"
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
//             </div>
//           </>
//         )}

//         <ProductComparison
//   products={compareProducts}
//   isOpen={isModalOpen}
//   onClose={() => setIsModalOpen(false)}
// />

//       </div>
//     </div>
//   );
// }
// import { useState, useEffect, useCallback, useRef } from "react";
// import { Search, ChevronDown } from "lucide-react";
// import ProductCard from "./ProductCard";
// import ProductComparison from "./ProductComparison";

// const ITEMS_PER_PAGE = 12;

// // Debounce
// const useDebounce = (callback, delay) => {
//   const timeoutRef = useRef(null);
//   return useCallback(
//     (...args) => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//       timeoutRef.current = setTimeout(() => callback(...args), delay);
//     },
//     [callback, delay]
//   );
// };

// // Options
// const categoryOptions = [
//   { value: "CONTRACT_LIFECYCLE_MANAGEMENT", label: "Contract Lifecycle Management" },
//   { value: "LEGAL_AI", label: "Legal AI" },
//   { value: "DOCUMENT_MANAGEMENT_SYSTEM", label: "Document Management System" },
//   { value: "LITIGATION_MANAGEMENT_AND_ANALYTICS", label: "Litigation Management & Analytics" },
//   { value: "IP_MANAGEMENT", label: "Intellectual Property Management" },
//   { value: "LEGAL_RESEARCH", label: "Legal Research" },
//   { value: "E_DISCOVERY", label: "E-Discovery" },
//   { value: "CASE_MANAGEMENT", label: "Case Management" },
//   { value: "GOVERNANCE_RISK_COMPLIANCE", label: "Governance, Risk & Compliance (GRC)" },
//   { value: "LEGAL_DUE_DILIGENCE", label: "Legal Due Diligence" },
//   { value: "TIMEKEEPING_SOFTWARE", label: "Timekeeping Software" },
//   { value: "LEGAL_INTAKE_SOFTWARE", label: "Legal Intake Software" },
//   { value: "TRANSACTION_MANAGEMENT_SOFTWARE", label: "Transaction Management Software" }
// ];

// const pricingTierOptions = [
//   { value: "", label: "All Pricing" },
//   { value: "BUDGET", label: "Budget ($)" },
//   { value: "MID_RANGE", label: "Mid-Range ($$)" },
//   { value: "PREMIUM", label: "Premium ($$$)" },
//   { value: "ENTERPRISE", label: "Enterprise ($$$+)" }
// ];

// const targetUserOptions = [
//   { value: "", label: "All Target Users" },
//   { value: "ENTERPRISE", label: "Enterprise / Corporate Teams" },
//   { value: "LAW_FIRM", label: "Law Firms / Attorneys" },
//   { value: "INHOUSE", label: "In-House Departments / Counsel" },
//   { value: "INDIVIDUAL", label: "Individual Lawyers / Chambers" }
// ];

// export default function DirectoryPage() {
//   const [products, setProducts] = useState([]);
//   const [compareProducts, setCompareProducts] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [searchTerm, setSearchTerm] = useState("");

//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedPricingTier, setSelectedPricingTier] = useState("");
//   const [selectedTargetUser, setSelectedTargetUser] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // Build filters (state OR override)
//   const getFilters = (override = {}) => {
//     const cats = override.categories ?? selectedCategories;
//     const price = override.pricingTiers ?? (selectedPricingTier ? [selectedPricingTier] : []);
//     const target = override.targetUserGroup ?? selectedTargetUser;

//     const filters = {};
//     if (cats.length > 0) filters.categories = cats;
//     if (price.length > 0) filters.pricingTiers = price;
//     if (target) filters.targetUserGroup = target;

//     return filters;
//   };

//   // Fetch products
//   const fetchProducts = async (page = 1, override = {}) => {
//     try {
//       setLoading(true);

//       const response = await fetch("/api/get-legal-softwares", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           page,
//           limit: ITEMS_PER_PAGE,
//           filters: getFilters(override)
//         })
//       });

//       const data = await response.json();
//       if (!data.success) throw new Error(data.error);

//       setProducts(data.products);
//       setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Search API
//   const performSearch = async (term, page = 1, override = {}) => {
//     try {
//       setLoading(true);

//       const response = await fetch("/api/search-legal-softwares", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           searchTerm: term,
//           page,
//           limit: ITEMS_PER_PAGE,
//           filters: getFilters(override)
//         })
//       });

//       const data = await response.json();
//       if (!data.success) throw new Error(data.error);

//       setProducts(data.products);
//       setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
//     } catch (err) {
//       console.error(err);
//       setError("Search failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const debouncedSearch = useDebounce((term) => {
//     performSearch(term, 1);
//   }, 300);

//   const handleSearchChange = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);

//     if (term.trim()) debouncedSearch(term);
//     else fetchProducts(1);
//   };

//   const toggleCompareProduct = (product) => {
//     setCompareProducts(prev => {
//       if (prev.find(p => p.id === product.id)) {
//         return prev.filter(p => p.id !== product.id);
//       }
//       if (prev.length >= 2) {
//         alert("You can only compare up to 2 products");
//         return prev;
//       }
//       return [...prev, product];
//     });
//   };

//   // Initial load with URL params
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);

//     const targetUser = params.get("targetUser");
//     const category = params.get("category");
//     const pricing = params.get("pricing");
//     const search = params.get("q"); // Changed from "search" to "q"

//     if (targetUser) {
//       setSelectedTargetUser(targetUser);
//     }

//     if (category) {
//       setSelectedCategories([category]);
//     }

//     if (pricing) {
//       setSelectedPricingTier(pricing);
//     }

//     if (search) {
//       setSearchTerm(search);
//       // Trigger search if search param exists
//       performSearch(search, 1, {
//         categories: category ? [category] : [],
//         pricingTiers: pricing ? [pricing] : [],
//         targetUserGroup: targetUser || "",
//       });
//     } else {
//       // Fetch products with filters if no search term
//       fetchProducts(1, {
//         categories: category ? [category] : [],
//         pricingTiers: pricing ? [pricing] : [],
//         targetUserGroup: targetUser || "",
//       });
//     }
//   }, []);

//   // Pagination
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     if (searchTerm.trim()) performSearch(searchTerm, page);
//     else fetchProducts(page);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pt-24 px-4">
//       <div className="max-w-7xl mx-auto">

//         <h1 className="text-3xl font-bold text-[#1e2556]">Legal Tech Directory</h1>
//         <p className="text-gray-600 mb-6">Find the best legal-tech tools for your practice.</p>

//         {/* FILTER BAR - All in one row */}
//         <div className="flex flex-wrap items-center gap-3 mb-6">
//           {/* Search */}
//           <div className="relative flex-1 min-w-[200px]">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <svg 
//               className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>

//           {/* Categories */}
//           <div className="relative">
//             {selectedCategories.length > 0 && (
//               <div className="flex flex-wrap gap-2 mb-2">
//                 {selectedCategories.map((cat) => (
//                   <span
//                     key={cat}
//                     className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
//                   >
//                     {categoryOptions.find((c) => c.value === cat)?.label}
//                     <button
//                       onClick={() => {
//                         const updated = selectedCategories.filter((c) => c !== cat);
//                         setSelectedCategories(updated);
//                         fetchProducts(1, {
//                           categories: updated,
//                           pricingTiers: selectedPricingTier ? [selectedPricingTier] : [],
//                           targetUserGroup: selectedTargetUser
//                         });
//                       }}
//                       className="hover:text-blue-900"
//                     >
//                       ×
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}
//             <div className="relative">
//               <select
//                 onChange={(e) => {
//                   const val = e.target.value;
//                   if (!val) return;
//                   const updated = selectedCategories.includes(val)
//                     ? selectedCategories
//                     : [...selectedCategories, val];
//                   setSelectedCategories(updated);
//                   fetchProducts(1, {
//                     categories: updated,
//                     pricingTiers: selectedPricingTier ? [selectedPricingTier] : [],
//                     targetUserGroup: selectedTargetUser
//                   });
//                   e.target.value = "";
//                 }}
//                 className="w-full pl-3 pr-10 py-3 border rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//               >
//                 <option value="">Select category...</option>
//                 {categoryOptions.map((o) => (
//                   <option key={o.value} value={o.value}>
//                     {o.label}
//                   </option>
//                 ))}
//               </select>
//               <svg 
//                 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//           </div>

//           {/* Target User */}
//           <div className="relative">
//             <select
//               value={selectedTargetUser}
//               onChange={(e) => {
//                 const val = e.target.value;
//                 setSelectedTargetUser(val);
//                 fetchProducts(1, {
//                   categories: selectedCategories,
//                   pricingTiers: selectedPricingTier ? [selectedPricingTier] : [],
//                   targetUserGroup: val
//                 });
//               }}
//               className="w-full pl-3 pr-10 py-3 border rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//             >
//               {targetUserOptions.map((o) => (
//                 <option key={o.value} value={o.value}>
//                   {o.label}
//                 </option>
//               ))}
//             </select>
//             <svg 
//               className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </div>

//           {/* Pricing */}
//           <div className="relative">
//             <select
//               value={selectedPricingTier}
//               onChange={(e) => {
//                 const val = e.target.value;
//                 setSelectedPricingTier(val);
//                 fetchProducts(1, {
//                   categories: selectedCategories,
//                   pricingTiers: val ? [val] : [],
//                   targetUserGroup: selectedTargetUser
//                 });
//               }}
//               className="w-full pl-3 pr-10 py-3 border rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
//             >
//               {pricingTierOptions.map((o) => (
//                 <option key={o.value} value={o.value}>
//                   {o.label}
//                 </option>
//               ))}
//             </select>
//             <svg 
//               className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
//               fill="none" 
//               stroke="currentColor" 
//               viewBox="0 0 24 24"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </div>
//         </div>

//         {compareProducts.length > 0 && (
//           <div className="mb-6 sm:mb-8">
//             <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-full bg-[#7cc6ee] text-white flex items-center justify-center text-sm font-bold">
//                     {compareProducts.length}
//                   </div>
//                   <span className="font-medium text-[#1e2556]">
//                     {compareProducts.length} products selected for comparison
//                   </span>
//                 </div>

//                 {compareProducts.length === 2 && (
//                   <button
//                     onClick={() => setIsModalOpen(true)}
//                     className="px-4 py-2 bg-[#1e2556] text-white rounded-lg"
//                   >
//                     Compare Products
//                   </button>
//                 )}

//               </div>
//             </div>
//           </div>
//         )}

//         {/* Products */}
//         {loading ? (
//           <div className="py-10 text-center">Loading...</div>
//         ) : products.length === 0 ? (
//           <div className="py-10 text-center">No products found</div>
//         ) : (
//           <>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
//               {products.map((p) => (
//                 <ProductCard
//                   key={p.id}
//                   product={p}
//                   onCompare={toggleCompareProduct}
//                   isCompared={compareProducts.some(cp => cp.id === p.id)}
//                 />
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center gap-2 mt-6">
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                 <button
//                   key={page}
//                   onClick={() => handlePageChange(page)}
//                   className={`px-4 py-2 rounded-lg ${
//                     page === currentPage ? "bg-[#1e2556] text-white" : "border"
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}
//             </div>
//           </>
//         )}

//         <ProductComparison
//           products={compareProducts}
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//         />

//       </div>
//     </div>
//   );
// }
import { useState, useEffect, useCallback, useRef } from "react";
import { Search, ChevronDown, Lock } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductComparison from "./ProductComparison";
import LoginGate from '@/components/LoginGate';
import { useNewAuth } from '@/context/NewAuthContext';

const ITEMS_PER_PAGE = 12;

// Debounce
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);
  return useCallback(
    (...args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay]
  );
};

// Options
const categoryOptions = [
  { value: "CONTRACT_LIFECYCLE_MANAGEMENT", label: "Contract Lifecycle Management" },
  { value: "LEGAL_AI", label: "Legal AI" },
  { value: "DOCUMENT_MANAGEMENT_SYSTEM", label: "Document Management System" },
  { value: "LITIGATION_MANAGEMENT_AND_ANALYTICS", label: "Litigation Management & Analytics" },
  { value: "IP_MANAGEMENT", label: "Intellectual Property Management" },
  { value: "LEGAL_RESEARCH", label: "Legal Research" },
  { value: "E_DISCOVERY", label: "E-Discovery" },
  { value: "CASE_MANAGEMENT", label: "Case Management" },
  { value: "GOVERNANCE_RISK_COMPLIANCE", label: "Governance, Risk & Compliance (GRC)" },
  { value: "LEGAL_DUE_DILIGENCE", label: "Legal Due Diligence" },
  { value: "TIMEKEEPING_SOFTWARE", label: "Timekeeping Software" },
  { value: "LEGAL_INTAKE_SOFTWARE", label: "Legal Intake Software" },
  { value: "TRANSACTION_MANAGEMENT_SOFTWARE", label: "Transaction Management Software" }
];

const pricingTierOptions = [
  { value: "", label: "All Pricing" },
  { value: "BUDGET", label: "Budget ($)" },
  { value: "MID_RANGE", label: "Mid-Range ($$)" },
  { value: "PREMIUM", label: "Premium ($$$)" },
  { value: "ENTERPRISE", label: "Enterprise ($$$+)" }
];

const targetUserOptions = [
  { value: "", label: "All Target Users" },
  { value: "ENTERPRISE", label: "Enterprise / Corporate Teams" },
  { value: "LAW_FIRM", label: "Law Firms / Attorneys" },
  { value: "INHOUSE", label: "In-House Departments / Counsel" },
  { value: "INDIVIDUAL", label: "Individual Lawyers / Chambers" }
];

export default function DirectoryPage() {
  const { isAuthenticated, showAuthModal } = useNewAuth();
  
  const [products, setProducts] = useState([]);
  const [compareProducts, setCompareProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPricingTier, setSelectedPricingTier] = useState("");
  const [selectedTargetUser, setSelectedTargetUser] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Build filters (state OR override)
  const getFilters = (override = {}) => {
    const cats = override.categories ?? selectedCategories;
    const price = override.pricingTiers ?? (selectedPricingTier ? [selectedPricingTier] : []);
    const target = override.targetUserGroup ?? selectedTargetUser;

    const filters = {};
    if (cats.length > 0) filters.categories = cats;
    if (price.length > 0) filters.pricingTiers = price;
    if (target) filters.targetUserGroup = target;

    return filters;
  };

  // Fetch products
  const fetchProducts = async (page = 1, override = {}) => {
    try {
      setLoading(true);

      const response = await fetch("/api/get-legal-softwares", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page,
          limit: ITEMS_PER_PAGE,
          filters: getFilters(override)
        })
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // Search API
  const performSearch = async (term, page = 1, override = {}) => {
    try {
      setLoading(true);

      const response = await fetch("/api/search-legal-softwares", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          searchTerm: term,
          page,
          limit: ITEMS_PER_PAGE,
          filters: getFilters(override)
        })
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.error);

      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
    } catch (err) {
      console.error(err);
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const debouncedSearch = useDebounce((term) => {
    performSearch(term, 1);
  }, 300);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim()) debouncedSearch(term);
    else fetchProducts(1);
  };

  const toggleCompareProduct = (product) => {
    setCompareProducts(prev => {
      if (prev.find(p => p.id === product.id)) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 2) {
        alert("You can only compare up to 2 products");
        return prev;
      }
      return [...prev, product];
    });
  };

  // HANDLE PROTECTED FILTER CLICKS
  const handleProtectedFilterClick = () => {
    if (!isAuthenticated) {
      showAuthModal();
    }
  };

  // Initial load with URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const targetUser = params.get("targetUser");
    const category = params.get("category");
    const pricing = params.get("pricing");
    const search = params.get("q");

    if (targetUser) {
      setSelectedTargetUser(targetUser);
    }

    if (category) {
      setSelectedCategories([category]);
    }

    if (pricing) {
      setSelectedPricingTier(pricing);
    }

    if (search) {
      setSearchTerm(search);
      performSearch(search, 1, {
        categories: category ? [category] : [],
        pricingTiers: pricing ? [pricing] : [],
        targetUserGroup: targetUser || "",
      });
    } else {
      fetchProducts(1, {
        categories: category ? [category] : [],
        pricingTiers: pricing ? [pricing] : [],
        targetUserGroup: targetUser || "",
      });
    }
  }, []);

  // Pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (searchTerm.trim()) performSearch(searchTerm, page);
    else fetchProducts(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold text-[#1e2556]">Legal Tech Directory</h1>
        <p className="text-gray-600 mb-6">Find the best legal-tech tools for your practice.</p>

        {/* FILTER BAR - All in one row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          {/* Search - ALWAYS VISIBLE */}
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Categories - ALWAYS VISIBLE */}
          <div className="relative">
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {categoryOptions.find((c) => c.value === cat)?.label}
                    <button
                      onClick={() => {
                        const updated = selectedCategories.filter((c) => c !== cat);
                        setSelectedCategories(updated);
                        fetchProducts(1, {
                          categories: updated,
                          pricingTiers: selectedPricingTier ? [selectedPricingTier] : [],
                          targetUserGroup: selectedTargetUser
                        });
                      }}
                      className="hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="relative">
              <select
                onChange={(e) => {
                  const val = e.target.value;
                  if (!val) return;
                  const updated = selectedCategories.includes(val)
                    ? selectedCategories
                    : [...selectedCategories, val];
                  setSelectedCategories(updated);
                  fetchProducts(1, {
                    categories: updated,
                    pricingTiers: selectedPricingTier ? [selectedPricingTier] : [],
                    targetUserGroup: selectedTargetUser
                  });
                  e.target.value = "";
                }}
                className="w-full pl-3 pr-10 py-3 border rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="">Select category...</option>
                {categoryOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <svg 
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Target User - PROTECTED */}
          <div className="relative">
            {isAuthenticated ? (
              // AUTHENTICATED: Show working dropdown
              <>
                <select
                  value={selectedTargetUser}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedTargetUser(val);
                    fetchProducts(1, {
                      categories: selectedCategories,
                      pricingTiers: selectedPricingTier ? [selectedPricingTier] : [],
                      targetUserGroup: val
                    });
                  }}
                  className="w-full pl-3 pr-10 py-3 border rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {targetUserOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <svg 
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            ) : (
              // NOT AUTHENTICATED: Show locked version
              <button
                onClick={handleProtectedFilterClick}
                className="relative w-full pl-3 pr-10 py-3 border rounded-lg bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#7cc6ee]" />
                  Target Users
                </span>
                <span className="text-xs bg-[#7cc6ee] text-white px-2 py-1 rounded">Sign In</span>
              </button>
            )}
          </div>

          {/* Pricing - PROTECTED */}
          <div className="relative">
            {isAuthenticated ? (
              // AUTHENTICATED: Show working dropdown
              <>
                <select
                  value={selectedPricingTier}
                  onChange={(e) => {
                    const val = e.target.value;
                    setSelectedPricingTier(val);
                    fetchProducts(1, {
                      categories: selectedCategories,
                      pricingTiers: val ? [val] : [],
                      targetUserGroup: selectedTargetUser
                    });
                  }}
                  className="w-full pl-3 pr-10 py-3 border rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  {pricingTierOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <svg 
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            ) : (
              // NOT AUTHENTICATED: Show locked version
              <button
                onClick={handleProtectedFilterClick}
                className="relative w-full pl-3 pr-10 py-3 border rounded-lg bg-gray-50 text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors flex items-center justify-between"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#7cc6ee]" />
                  Pricing Tiers
                </span>
                <span className="text-xs bg-[#7cc6ee] text-white px-2 py-1 rounded">Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* PREMIUM FEATURES BANNER - Only show to non-authenticated users */}
        {!isAuthenticated && (
          <div className="mb-6 bg-gradient-to-r from-[#7cc6ee] to-[#1e2556] rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <Lock className="w-6 h-6" />
                <div>
                  <p className="font-bold">Unlock Advanced Filters</p>
                  <p className="text-sm text-white/90">Sign in to filter by Target Users and Pricing Tiers</p>
                </div>
              </div>
              <button
                onClick={showAuthModal}
                className="bg-white text-[#1e2556] px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {compareProducts.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7cc6ee] text-white flex items-center justify-center text-sm font-bold">
                    {compareProducts.length}
                  </div>
                  <span className="font-medium text-[#1e2556]">
                    {compareProducts.length} products selected for comparison
                  </span>
                </div>

                {compareProducts.length === 2 && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-[#1e2556] text-white rounded-lg"
                  >
                    Compare Products
                  </button>
                )}

              </div>
            </div>
          </div>
        )}

        {/* Products */}
        {loading ? (
          <div className="py-10 text-center">Loading...</div>
        ) : products.length === 0 ? (
          <div className="py-10 text-center">No products found</div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onCompare={toggleCompareProduct}
                  isCompared={compareProducts.some(cp => cp.id === p.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg ${
                    page === currentPage ? "bg-[#1e2556] text-white" : "border"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        )}

        <ProductComparison
          products={compareProducts}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

      </div>
    </div>
  );
}