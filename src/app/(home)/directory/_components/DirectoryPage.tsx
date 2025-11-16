
// import { useState, useEffect, useCallback, useRef } from 'react';
// import { Search, ChevronDown } from 'lucide-react';
// import ProductCard from './ProductCard';
// import ProductComparison from './ProductComparison';

// const ITEMS_PER_PAGE = 12;

// // Custom debounce function (replaces lodash debounce)
// const useDebounce = (callback, delay) => {
//   const timeoutRef = useRef(null);
  
//   return useCallback((...args) => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
    
//     timeoutRef.current = setTimeout(() => {
//       callback(...args);
//     }, delay);
//   }, [callback, delay]);
// };

// // Category mapping for display
// const categoryOptions = [
//   { value: '', label: 'All Categories' },
//   { value: 'CONTRACT_LIFECYCLE_MANAGEMENT', label: 'Contract Lifecycle Management' },
//   { value: 'LEGAL_AI', label: 'Legal AI' },
//   { value: 'DOCUMENT_MANAGEMENT_SYSTEM', label: 'Document Management System' },
//   { value: 'LITIGATION_MANAGEMENT_AND_ANALYTICS', label: 'Litigation Management & Analytics' },
//   { value: 'IP_MANAGEMENT', label: 'Intellectual Property Management' },
//   { value: 'LEGAL_RESEARCH', label: 'Legal Research' },
//   { value: 'E_DISCOVERY', label: 'E-Discovery' },
//   { value: 'CASE_MANAGEMENT', label: 'Case Management Software' },
//   { value: 'GOVERNANCE_RISK_COMPLIANCE', label: 'Governance, Risk & Compliance (GRC)' },
//   { value: 'LEGAL_DUE_DILIGENCE', label: 'Legal Due Diligence ' }
// ];



// const pricingTierOptions = [
//   { value: '', label: 'All Pricing' },
//   { value: 'BUDGET', label: 'Budget ($)' },
//   { value: 'MID_RANGE', label: 'Mid-Range ($$)' },
//   { value: 'PREMIUM', label: 'Premium ($$$)' },
//   { value: 'ENTERPRISE', label: 'Enterprise ($$$+)' }
// ];

// const targetUserOptions = [
//   { value: "", label: "All Target Users" },
//   { value: "ENTERPRISE", label: "Enterprise / Corporate Teams" },
//   { value: "LAW_FIRM", label: "Law Firm / Attorneys" },
//   { value: "INHOUSE", label: "In-House Departments / Counsel" },
//   { value: "INDIVIDUAL", label: "Individual Lawyers / Chambers" }
// ];


// const DirectoryPage = () => {
//   // State management
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [compareProducts, setCompareProducts] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Filter state - single select
//   // const [selectedCategory, setSelectedCategory] = useState('');
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   const [selectedPricingTier, setSelectedPricingTier] = useState('');
//   const [selectedTargetUser, setSelectedTargetUser] = useState("");


//   // Function to get URL parameters
//   const getUrlParams = () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     return {
//       q: urlParams.get('q') || '',
//       category: urlParams.get('category') || '',
//       pricing: urlParams.get('pricing') || ''
//     };
//   };

//   // Function to update URL without page reload
//   const updateUrl = (params) => {
//     const url = new URL(window.location);
    
//     if (params.q) {
//       url.searchParams.set('q', params.q);
//     } else {
//       url.searchParams.delete('q');
//     }
    
//     if (params.category) {
//       url.searchParams.set('category', params.category);
//     } else {
//       url.searchParams.delete('category');
//     }
    
//     if (params.pricing) {
//       url.searchParams.set('pricing', params.pricing);
//     } else {
//       url.searchParams.delete('pricing');
//     }
    
//     window.history.replaceState({}, '', url.toString());
//   };

//   // Initialize state from URL parameters
//   useEffect(() => {
//     const urlParams = getUrlParams();
    
//     if (urlParams.q) {
//       setSearchTerm(urlParams.q);
//     }
//     if (urlParams.category) {
//       setSelectedCategory(urlParams.category);
//     }
//     if (urlParams.pricing) {
//       setSelectedPricingTier(urlParams.pricing);
//     }
    
//     // If there's a search term in URL, trigger search; otherwise fetch all products
//     if (urlParams.q) {
//       performSearch(urlParams.q, 1, urlParams.category, urlParams.pricing);
//     } else {
//       fetchProducts(1, urlParams.category, urlParams.pricing);
//     }
//   }, []);

//   const toggleCompareProduct = (product) => {
//     setCompareProducts(prev => {
//       if (prev.find(p => p.id === product.id)) {
//         return prev.filter(p => p.id !== product.id);
//       }
//       if (prev.length >= 2) {
//         alert('You can only compare up to 2 products');
//         return prev;
//       }
//       return [...prev, product];
//     });
//   };

//   const getFilters = () => {
//   const filters = {};

//   if (selectedCategories.length > 0) {
//     filters.categories = selectedCategories;
//   }

//   if (selectedPricingTier) {
//     filters.pricingTiers = [selectedPricingTier];
//   }

//   if (selectedTargetUser) {
//     filters.targetUserGroup = selectedTargetUser;
//   }

//   return filters;
// };



//   const fetchProducts = async (page = 1, category = selectedCategory, pricingTier = selectedPricingTier) => {
//     try {
//       setLoading(true);
      
//       const response = await fetch('/api/get-legal-softwares', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify({
//   page,
//   limit: ITEMS_PER_PAGE,
//   filters: getFilters(category, pricingTier, selectedTargetUser)
// })

//       });

//       if (!response.ok) throw new Error('Failed to fetch products');

//       const data = await response.json();
      
//       if (!data.success) {
//         throw new Error(data.message || 'Failed to fetch products');
//       }

//       setProducts(data.products);
//       setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
//       setError(null);
      
//       // Log premium product info for debugging
//       const premiumCount = data.products.filter(p => p.isPremium).length;
//       console.log(`Loaded ${data.products.length} products, ${premiumCount} are premium`);
      
//     } catch (err) {
//       console.error('Error in fetchProducts:', err);
//       setError('Failed to load products. Please try again.');
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const performSearch = async (term, page = 1, category = selectedCategory, pricingTier = selectedPricingTier) => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/search-legal-softwares', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           searchTerm: term,
//           page: page,
//           limit: ITEMS_PER_PAGE,
//          filters: getFilters(category, pricingTier, selectedTargetUser)

//         })
//       });
      
//       if (!response.ok) throw new Error('Search failed');
      
//       const data = await response.json();
      
//       if (!data.success) {
//         throw new Error(data.message || 'Search failed');
//       }

//       setProducts(data.products);
//       setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
//       setError(null);
      
//       // Log premium product info for debugging
//       const premiumCount = data.products.filter(p => p.isPremium).length;
//       console.log(`Search returned ${data.products.length} products, ${premiumCount} are premium`);
      
//     } catch (err) {
//       console.error('Error in search:', err);
//       setError('Search failed. Please try again.');
//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Custom debounced search function
//   const debouncedSearch = useDebounce((term, page = 1) => {
//     performSearch(term, page);
//   }, 300);

//   const handleSearchChange = (e) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     setCurrentPage(1);
    
//     // Update URL
//     updateUrl({ 
//       q: term, 
//       category: selectedCategory, 
//       pricing: selectedPricingTier 
//     });
    
//     if (term.trim()) {
//       setLoading(true);
//       debouncedSearch(term, 1);
//     } else {
//       fetchProducts(1);
//     }
//   };

//   const handleCategoryChange = (value) => {
//     setSelectedCategory(value);
//     setCurrentPage(1);
    
//     // Update URL
//     updateUrl({ 
//       q: searchTerm, 
//       category: value, 
//       pricing: selectedPricingTier 
//     });
    
//     if (searchTerm.trim()) {
//       setTimeout(() => performSearch(searchTerm, 1, value, selectedPricingTier), 100);
//     } else {
//       setTimeout(() => fetchProducts(1, value, selectedPricingTier), 100);
//     }
//   };

//   const handlePricingTierChange = (value) => {
//     setSelectedPricingTier(value);
//     setCurrentPage(1);
    
//     // Update URL
//     updateUrl({ 
//       q: searchTerm, 
//       category: selectedCategory, 
//       pricing: value 
//     });
    
//     if (searchTerm.trim()) {
//       setTimeout(() => performSearch(searchTerm, 1, selectedCategory, value), 100);
//     } else {
//       setTimeout(() => fetchProducts(1, selectedCategory, value), 100);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
    
//     if (searchTerm.trim()) {
//       performSearch(searchTerm, newPage);
//     } else {
//       fetchProducts(newPage);
//     }
    
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Pagination component
//   const Pagination = () => {
//     const pages = [];
//     for (let i = 1; i <= totalPages; i++) {
//       pages.push(i);
//     }

//     const getPageNumbers = () => {
//       const pageNumbers = [];
//       let ellipsisAdded = false;

//       pages.forEach(page => {
//         if (
//           page === 1 ||
//           page === totalPages ||
//           (page >= currentPage - 1 && page <= currentPage + 1)
//         ) {
//           pageNumbers.push(page);
//         } else if (!ellipsisAdded) {
//           pageNumbers.push('...');
//           ellipsisAdded = true;
//         }
//       });

//       return pageNumbers;
//     };

//     return (
//       <div className="flex justify-center items-center gap-2 mt-8 px-4">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1 || loading}
//           className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors"
//         >
//           <span className="hidden sm:inline">Previous</span>
//           <span className="sm:hidden">Prev</span>
//         </button>

//         <div className="flex items-center gap-1 sm:gap-2">
//           {getPageNumbers().map((page, index) => (
//             page === '...' ? (
//               <span key={`ellipsis-${index}`} className="px-2 sm:px-3 text-gray-400">...</span>
//             ) : (
//               <button
//                 key={page}
//                 onClick={() => handlePageChange(page)}
//                 className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-colors ${
//                   currentPage === page
//                     ? 'bg-[#1e2556] text-white'
//                     : 'border border-gray-200 hover:bg-gray-50'
//                 }`}
//               >
//                 {page}
//               </button>
//             )
//           ))}
//         </div>

//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages || loading}
//           className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors"
//         >
//           <span className="hidden sm:inline">Next</span>
//           <span className="sm:hidden">Next</span>
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="pt-20 sm:pt-24 pb-6 sm:pb-8">
//           {/* Header Section */}
//           <div className="mb-6 sm:mb-8">
//             <h1 className="text-2xl sm:text-3xl font-bold text-[#1e2556] mb-2">
//               Legal Tech Directory
//             </h1>
//             <p className="text-[#334155] mb-4 sm:mb-6 text-sm sm:text-base">
//               Discover the best legal technology solutions for your practice
//             </p>
            
//             {/* Search and Filters */}
//             <div className="space-y-3 lg:space-y-0">
//               {/* Desktop: All in one row, Mobile: Separate rows */}
//               <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
//                 {/* Search Bar - Always first */}
//                 <div className="relative flex-1">
//                   <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
//                   <input
//                     type="text"
//                     placeholder="Search legal software..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     className="w-full pl-10 sm:pl-12 pr-4 py-3 text-sm sm:text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
//                   />
//                 </div>

//                 {/* Category Filter - 2nd on desktop */}
//                 {/* <div className="relative lg:min-w-[200px] order-3 lg:order-2">
//                   <select
//                     value={selectedCategory}
//                     onChange={(e) => handleCategoryChange(e.target.value)}
//                     className="appearance-none w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-3 text-sm sm:text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent bg-white text-[#2d2d2d] cursor-pointer"
//                   >
//                     {categoryOptions.map(option => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
//                 </div> */}
//                 <div className="relative lg:min-w-[200px] order-3 lg:order-2">
//   {/* Selected Category Tags */}
//   <div className="flex flex-wrap gap-2 mb-2">
//     {selectedCategories.map((cat) => (
//       <span
//         key={cat}
//         className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center gap-2"
//       >
//         {categoryOptions.find((c) => c.value === cat)?.label}
//         <button
//           onClick={() =>
//             setSelectedCategories(selectedCategories.filter(c => c !== cat))
//           }
//           className="text-red-500 hover:text-red-700"
//         >
//           ×
//         </button>
//       </span>
//     ))}
//   </div>

//   {/* Dropdown to Add Categories */}
//   <select
//     onChange={(e) => {
//       const val = e.target.value;
//       if (val && !selectedCategories.includes(val)) {
//         const updated = [...selectedCategories, val];
//         setSelectedCategories(updated);
//         fetchProducts(1);
//       }
//     }}
//     className="appearance-none w-full pl-3 pr-10 py-3 rounded-lg border border-gray-200 bg-white cursor-pointer"
//     value=""
//   >
//     <option value="">Select category</option>

//     {categoryOptions.map(option => (
//       <option key={option.value} value={option.value}>
//         {option.label}
//       </option>
//     ))}
//   </select>

//   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
// </div>

//                 <div className="relative lg:min-w-[220px]">
//   <select
//     value={selectedTargetUser}
//     onChange={(e) => {
//       setSelectedTargetUser(e.target.value);
//       fetchProducts(1);
//     }}
//     className="appearance-none w-full pl-3 pr-10 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#7cc6ee] bg-white"
//   >
//     {targetUserOptions.map((option) => (
//       <option key={option.value} value={option.value}>
//         {option.label}
//       </option>
//     ))}
//   </select>
//   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
// </div>


//                 {/* Pricing Tier Filter - 3rd on desktop, 2nd on mobile */}
//                 <div className="relative lg:min-w-[160px] order-2 lg:order-3">
//                   <select
//                     value={selectedPricingTier}
//                     onChange={(e) => handlePricingTierChange(e.target.value)}
//                     className="appearance-none w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-3 text-sm sm:text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent bg-white text-[#2d2d2d] cursor-pointer"
//                   >
//                     {pricingTierOptions.map(option => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Compare Products Bar */}
//           {compareProducts.length > 0 && (
//             <div className="mb-6 sm:mb-8">
//               <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-full bg-[#7cc6ee] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
//                       {compareProducts.length}
//                     </div>
//                     <span className="font-medium text-[#1e2556] text-sm sm:text-base">
//                       {compareProducts.length} products selected for comparison
//                     </span>
//                   </div>
//                   {compareProducts.length === 2 && (
//                     <button
//                       onClick={() => setIsModalOpen(true)}
//                       className="w-full sm:w-auto px-4 py-2 bg-[#1e2556] text-white rounded-lg hover:bg-[#1e2556]/90 transition-colors text-sm sm:text-base font-medium"
//                     >
//                       Compare Products
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Products Grid */}
//           {loading ? (
//             <div className="text-center py-12">
//               <div className="animate-spin w-6 h-6 sm:w-8 sm:h-8 border-4 border-[#7cc6ee] border-t-transparent rounded-full mx-auto mb-4"></div>
//               <p className="text-[#2d2d2d] text-sm sm:text-base">Loading products...</p>
//             </div>
//           ) : error ? (
//             <div className="text-center py-12">
//               <div className="text-red-600 text-sm sm:text-base px-4">{error}</div>
//             </div>
//           ) : (
//             <>
//               {/* Premium indicator if any premium products are visible */}
//               {/* {products.some(p => p.isPremium) && (
//                 <div className="mb-4 text-sm text-amber-700 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200">
//                   ⭐ Premium products are highlighted and shown first
//                 </div>
//               )}
//                */}
//               {/* 1 column on mobile, 2 columns on laptop */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//                 {products.map((product) => (
//                   <ProductCard
//                     key={product.id}
//                     product={product}
//                     onCompare={toggleCompareProduct}
//                     isCompared={compareProducts.some(p => p.id === product.id)}
//                   />
//                 ))}
//               </div>

//               {/* Pagination */}
//               {products.length > 0 && <Pagination />}
//             </>
//           )}

//           {/* Empty State */}
//           {!loading && products.length === 0 && (
//             <div className="text-center py-12 px-4">
//               <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg sm:text-xl font-medium text-[#1e2556] mb-2">
//                 No products found
//               </h3>
//               <p className="text-[#2d2d2d] text-sm sm:text-base">
//                 Try adjusting your search or filter criteria
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Product Comparison Modal */}
//       <ProductComparison
//         products={compareProducts}
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </div>
//   );
// };

// export default DirectoryPage;











import { useState, useEffect, useCallback, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductComparison from "./ProductComparison";

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
  { value: "LEGAL_DUE_DILIGENCE", label: "Legal Due Diligence" }
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

  useEffect(() => {
    fetchProducts(1);
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
  {/* Search */}
  <div className="relative flex-1 min-w-[200px]">
    <input
      type="text"
      placeholder="Search..."
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

  {/* Categories */}
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

  {/* Target User */}
  <div className="relative">
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
  </div>

  {/* Pricing */}
  <div className="relative">
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
  </div>
</div>

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
                  onCompare={() => {}}
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
      </div>
    </div>
  );
}
