
import React, { useEffect, useState } from "react";
import NormalProduct from "@/components/NormalProduct";
import { Grid, List, Search, Package, FilterIcon, X } from 'lucide-react';
import DirectoryFilter from "./DirectoryFilter";

function DirectoryProduct() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState('list');
    const [compareProducts, setCompareProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    
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

    // Close filter panel when screen size changes to desktop
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1024) {
          setIsMobileFilterOpen(false);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
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
          let filtered = data.products.filter(
            (product) => product.active === "publish"
          );
  
          // Apply search filter
          if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(product => 
              product.name.toLowerCase().includes(searchLower) ||
              product.description.toLowerCase().includes(searchLower)
            );
          }
  
          // Apply filters
          if (selectedFilters.categories.length > 0) {
            filtered = filtered.filter(product =>
              product.category.some(cat => selectedFilters.categories.includes(cat))
            );
          }
  
          if (selectedFilters.userCategory.length > 0) {
            filtered = filtered.filter(product =>
              product.userCategory.some(cat => selectedFilters.userCategory.includes(cat))
            );
          }
  
          if (selectedFilters.language.length > 0) {
            filtered = filtered.filter(product => 
              selectedFilters.language.includes(product.language)
            );
          }
  
          if (selectedFilters.country.length > 0) {
            filtered = filtered.filter(product => 
              selectedFilters.country.includes(product.country)
            );
          }
  
          setFilteredProducts(filtered);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    useEffect(() => {
      fetchProducts(searchTerm);
    }, [selectedFilters, searchTerm]);
  
    const toggleCompareProduct = (product) => {
      setCompareProducts(prev => {
        if (prev.find(p => p.id === product.id)) {
          return prev.filter(p => p.id !== product.id);
        }
        if (prev.length >= 2) {
          alert('You can only compare up to 2 products');
          return prev;
        }
        return [...prev, product];
      });
    };
    
    const handleFilterChange = (filterType, value) => {
      setSelectedFilters(prev => ({
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter(item => item !== value)
          : [...prev[filterType], value]
      }));
    };

    // Prevent body scroll when mobile filter is open
    useEffect(() => {
      if (isMobileFilterOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
      return () => {
        document.body.style.overflow = 'unset';
      };
    }, [isMobileFilterOpen]);
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-24 pb-8">
            <div className="flex gap-8">
              <div className="hidden lg:block w-80 flex-shrink-0">
                <div className="sticky top-32">
                  <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden h-[calc(100vh-8rem)]">
                    <div className="overflow-y-auto h-full">
                      <DirectoryFilter
                        selectedFilters={selectedFilters}
                        handleFilterChange={handleFilterChange}
                        setSelectedFilters={setSelectedFilters}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Filter Button - Shown only on mobile */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-20 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <FilterIcon className="w-6 h-6" />
              </button>

              {/* Mobile Filter Slide-out Panel */}
              <div className={`lg:hidden fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
                isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'
              }`}>
                <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                     onClick={() => setIsMobileFilterOpen(false)} />
                <div className="absolute right-0 h-full w-full max-w-xs bg-white shadow-xl">
                  <div className="h-full flex flex-col">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                      <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                      <button
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="p-2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      <DirectoryFilter
                        selectedFilters={selectedFilters}
                        handleFilterChange={handleFilterChange}
                        setSelectedFilters={setSelectedFilters}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1">
                {/* Premium Header Section */}
                <div className="mb-8">
                  <div className="relative rounded-2xl bg-white border border-blue-100 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-sky-50 opacity-50" />
                    <div className="relative px-4 py-6 sm:px-6 md:px-8 lg:px-12">
                      <div className="flex flex-col gap-6">
                        <div>
                          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                            Legal Tech Directory
                          </h1>
                          <p className="mt-2 text-gray-600 text-sm sm:text-base">
                            Discover and compare the best legal software solutions
                          </p>
                        </div>

                        {/* Search and View Toggle */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                          <div className="relative flex-1 group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-200" />
                            {/* <div className="relative">
                              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-0 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                              />
                            </div> */}
                            <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
      <input
        type="text"
        placeholder="Coming soon..."
        disabled
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-0 cursor-not-allowed text-gray-400 placeholder-gray-400"
      />
      {/* <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <span className="text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded">Coming Soon</span>
      </div> */}
    </div>
                          </div>

                          <div className="flex justify-center sm:justify-start items-center gap-1 p-1 bg-white rounded-lg shadow-sm border border-blue-100">
                            <button
                              onClick={() => setViewMode('grid')}
                              className={`flex-1 sm:flex-none p-2.5 rounded-lg transition-all duration-200 ${
                                viewMode === 'grid'
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <Grid className="w-5 h-5 mx-auto" />
                            </button>
                            <button
                              onClick={() => setViewMode('list')}
                              className={`flex-1 sm:flex-none p-2.5 rounded-lg transition-all duration-200 ${
                                viewMode === 'list'
                                  ? 'bg-blue-100 text-blue-600'
                                  : 'text-gray-600 hover:bg-gray-50'
                              }`}
                            >
                              <List className="w-5 h-5 mx-auto" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compare Products Bar */}
                {compareProducts.length > 0 && (
                  <div className="mb-8">
                    <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-4">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <Package className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-gray-600">Selected for comparison</p>
                            <p className="text-lg font-semibold text-blue-600">
                              {compareProducts.length} product{compareProducts.length > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        {compareProducts.length === 2 && (
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 
                                     text-white rounded-lg font-medium shadow-lg 
                                     hover:from-blue-700 hover:to-sky-700 
                                     transition-all duration-200 transform hover:scale-[1.02]"
                          >
                            Compare Products
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Products Grid */}
                <div className={`grid gap-4 sm:gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2' 
                    : 'grid-cols-1'
                }`}>

                  {filteredProducts.map((product) => (
  <div 
    key={product.id} 
    className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl 
             transition-all duration-300 border border-blue-100 overflow-hidden"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    
    {/* Product Component */}
    <NormalProduct
      id={product.id}
      image={product.logoUrl}
      title={product.name}
      description={product.description}
      category={product.category}
      product={product}
    />
    
    {/* Compare Button - Moved to bottom right */}
    <div className="absolute bottom-6 right-6 z-10">
      <button
        onClick={() => toggleCompareProduct(product)}
        className="bg-white/90 backdrop-blur-sm hover:bg-white text-blue-600 
                 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                 shadow-sm border border-blue-200 hover:shadow-md transform hover:scale-105"
      >
        {compareProducts.some((p) => p.id === product.id)
          ? 'Remove Compare'
          : 'Compare'
        }
      </button>
    </div>
  </div>
))}
                </div>

                {/* Empty State */}
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto border border-blue-100">
                      <Package className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No products found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default DirectoryProduct;
// import React, { useEffect, useState, useCallback, useRef } from "react";
// import { Grid, List, Search, Package, FilterIcon, X, Check } from 'lucide-react';
// import DirectoryFilter from "./DirectoryFilter";
// import NormalProduct from "@/components/NormalProduct";

// // Custom debounce hook
// const useDebounce = (callback, delay) => {
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   const debouncedCallback = useCallback((...args) => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }

//     timeoutRef.current = setTimeout(() => {
//       callback(...args);
//     }, delay);
//   }, [callback, delay]);

//   return debouncedCallback;
// };

// // Custom Modal Component
// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
//         <div 
//           className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
//           onClick={onClose}
//         />

//         <div className="relative inline-block w-full max-w-6xl px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Comparison Modal Component
// const ComparisonModal = ({ isOpen, onClose, products }) => {
//   if (!isOpen || !Array.isArray(products) || products.length !== 2) return null;

//   // Helper function to safely get nested object values
//   const getNestedValue = (obj, path) => {
//     return path.split('.').reduce((acc, part) => acc?.[part], obj) ?? '';
//   };

//   const ComparisonRow = ({ label, field, render }) => (
//     <div className="flex border-b border-gray-200">
//       <div className="w-32 bg-gray-50 px-4 py-3 font-medium text-sm text-gray-600">
//         {label}
//       </div>
//       <div className="flex-1 grid grid-cols-2">
//         {products.map((product, idx) => {
//           const value = getNestedValue(product, field);
//           return (
//             <div key={idx} className={`px-4 py-3 ${idx === 0 ? 'border-r border-gray-200' : ''}`}>
//               {render ? render(value, product) : value}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );

//   const renderFeatures = (features) => {
//     if (!Array.isArray(features)) return null;
//     return (
//       <div className="space-y-2">
//         {features.map((feature, idx) => (
//           <div key={idx} className="flex items-center gap-2">
//             <Check className="w-4 h-4 text-green-500" />
//             <span className="text-sm">{feature}</span>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderTags = (tags) => {
//     if (!Array.isArray(tags)) return null;
//     return (
//       <div className="flex flex-wrap gap-2">
//         {tags.map((tag, idx) => (
//           <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
//             {tag}
//           </span>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className="h-[80vh] flex flex-col pt-12">
//         {/* Modal Header */}
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900">Product Comparison</h2>
//           <button
//             onClick={onClose}
//             className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Modal Content */}
//         <div className="flex-1 overflow-y-auto">
//           <div className="divide-y divide-gray-200">
//             {/* Product Headers */}
//             <div className="flex">
//               <div className="w-32" />
//               <div className="flex-1 grid grid-cols-2">
//                 {products.map((product, idx) => (
//                   <div key={idx} className={`p-4 flex flex-col items-center ${idx === 0 ? 'border-r border-gray-200' : ''}`}>
//                     {product.logoUrl && (
//                       <img 
//                         src={product.logoUrl} 
//                         alt={product.name} 
//                         className="h-16 w-16 object-contain mb-2" 
//                       />
//                     )}
//                     <h3 className="font-medium text-gray-900">{product.name}</h3>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Comparison Rows */}
//             <ComparisonRow 
//               label="Category" 
//               field="category" 
//               render={(value) => Array.isArray(value) ? renderTags(value) : value} 
//             />
            
//             <ComparisonRow 
//               label="Deployment" 
//               field="deployement" 
//               render={(value) => Array.isArray(value) ? renderTags(value) : value} 
//             />
            
//             <ComparisonRow 
//               label="Mobile Available" 
//               field="mobileAvailable" 
//             />
            
//             <ComparisonRow 
//               label="Adoption Time" 
//               field="avgTimeAdoption" 
//             />
            
//             <ComparisonRow 
//               label="Team Size" 
//               field="company.TeamSize" 
//             />
            
//             <ComparisonRow 
//               label="Features" 
//               field="features" 
//               render={renderFeatures} 
//             />
            
//             <ComparisonRow 
//               label="Practice Areas" 
//               field="practiceAreas" 
//               render={(value) => Array.isArray(value) ? renderTags(value) : value} 
//             />
            
//             <ComparisonRow 
//               label="User Categories" 
//               field="userCategory" 
//               render={(value) => Array.isArray(value) ? renderTags(value) : value} 
//             />
            
//             <ComparisonRow 
//               label="Industries" 
//               field="industry" 
//               render={(value) => Array.isArray(value) ? renderTags(value) : value} 
//             />
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// // Main Directory Product Component
// const DirectoryProduct = () => {
//   // State Management
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState('list');
//   const [compareProducts, setCompareProducts] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   const [selectedFilters, setSelectedFilters] = useState({
//     categories: [],
//     userCategory: [],
//     language: [],
//     country: [],
//     industry: [],
//     practiceAreas: [],
//     mobileAvailable: [],
//     price: [],
//   });

//   // Fetch Products Function
//   const fetchProducts = async (search = "") => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch("/api/get-all-products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           number: 50  // Required parameter for the API
//         }),
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.msg || 'Failed to fetch products');
//       }

//       const data = await response.json();
      
//       if (data.success && Array.isArray(data.products)) {
//         let filtered = data.products.filter(product => product.active === "publish");
        
//         // Apply search filter if search term exists
//         if (search) {
//           const searchLower = search.toLowerCase();
//           filtered = filtered.filter(product => 
//             product.name.toLowerCase().includes(searchLower) ||
//             product.description.toLowerCase().includes(searchLower)
//           );
//         }

//         // Apply selected filters
//         if (selectedFilters.categories.length > 0) {
//           filtered = filtered.filter(product =>
//             product.category.some(cat => selectedFilters.categories.includes(cat))
//           );
//         }

//         if (selectedFilters.userCategory.length > 0) {
//           filtered = filtered.filter(product =>
//             product.userCategory.some(cat => selectedFilters.userCategory.includes(cat))
//           );
//         }

//         if (selectedFilters.language.length > 0) {
//           filtered = filtered.filter(product => 
//             product.languages && selectedFilters.language.some(lang => 
//               product.languages.includes(lang)
//             )
//           );
//         }

//         if (selectedFilters.country.length > 0) {
//           filtered = filtered.filter(product => 
//             product.focusCountries && selectedFilters.country.some(country => 
//               product.focusCountries.includes(country)
//             )
//           );
//         }

//         if (selectedFilters.industry.length > 0) {
//           filtered = filtered.filter(product =>
//             product.industry.some(ind => selectedFilters.industry.includes(ind))
//           );
//         }

//         if (selectedFilters.practiceAreas.length > 0) {
//           filtered = filtered.filter(product =>
//             product.practiceAreas.some(area => selectedFilters.practiceAreas.includes(area))
//           );
//         }

//         setFilteredProducts(filtered);
//       } else {
//         setFilteredProducts([]);
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setError(error.message || 'Failed to load products. Please try again later.');
//       setFilteredProducts([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Using custom debounce hook for search
//   const debouncedSearch = useDebounce((searchValue) => {
//     fetchProducts(searchValue);
//   }, 300);

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     debouncedSearch(value);
//   };

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

//   // Effect to fetch products when filters change
//   useEffect(() => {
//     fetchProducts(searchTerm);
//   }, [selectedFilters]);

//   // Continue from Part 2...
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
//       <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="pt-24 pb-8">
//           <div className="flex gap-8">
//             {/* Filter Section */}
//             <div className="hidden lg:block w-80 flex-shrink-0">
//               <div className="sticky top-32">
//                 <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
//                   <DirectoryFilter
//                     selectedFilters={selectedFilters}
//                     handleFilterChange={(type, value) => {
//                       setSelectedFilters(prev => ({
//                         ...prev,
//                         [type]: prev[type].includes(value)
//                           ? prev[type].filter(item => item !== value)
//                           : [...prev[type], value]
//                       }));
//                     }}
//                     setSelectedFilters={setSelectedFilters}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1">
//               {/* Search Header */}
//               <div className="mb-8">
//                 <div className="relative rounded-2xl bg-white border border-blue-100 shadow-xl overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-sky-50 opacity-50" />
//                   <div className="relative px-4 py-6 sm:px-6 md:px-8 lg:px-12">
//                     <div className="flex flex-col gap-6">
//                       <div>
//                         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
//                           Legal Tech Directory
//                         </h1>
//                         <p className="mt-2 text-gray-600 text-sm sm:text-base">
//                           Discover and compare the best legal software solutions
//                         </p>
//                       </div>

//                       <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
//                         <div className="relative flex-1 group">
//                           <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-200" />
//                           <div className="relative">
//                             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                             <input
//                               type="text"
//                               placeholder="Search products..."
//                               value={searchTerm}
//                               onChange={handleSearchChange}
//                               className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-0 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
//                             />
//                           </div>
//                         </div>

//                         <div className="flex justify-center sm:justify-start items-center gap-1 p-1 bg-white rounded-lg shadow-sm border border-blue-100">
//                           <button
//                             onClick={() => setViewMode('grid')}
//                             className={`flex-1 sm:flex-none p-2.5 rounded-lg transition-all duration-200 ${
//                               viewMode === 'grid'
//                                 ? 'bg-blue-100 text-blue-600'
//                                 : 'text-gray-600 hover:bg-gray-50'
//                             }`}
//                           >
//                             <Grid className="w-5 h-5 mx-auto" />
//                           </button>
//                           <button
//                             onClick={() => setViewMode('list')}
//                             className={`flex-1 sm:flex-none p-2.5 rounded-lg transition-all duration-200 ${
//                               viewMode === 'list'
//                                 ? 'bg-blue-100 text-blue-600'
//                                 : 'text-gray-600 hover:bg-gray-50'
//                             }`}
//                           >
//                             <List className="w-5 h-5 mx-auto" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Compare Products Bar */}
//               {compareProducts.length > 0 && (
//                 <div className="mb-8">
//                   <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-4">
//                     <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//                       <div className="flex items-center gap-3">
//                         <div className="bg-blue-100 p-2 rounded-lg">
//                           <Package className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <div>
//                           <p className="text-gray-600">Selected for comparison</p>
//                           <p className="text-lg font-semibold text-blue-600">
//                             {compareProducts.length} product{compareProducts.length > 1 ? 's' : ''}
//                           </p>
//                         </div>
//                       </div>
//                       {compareProducts.length === 2 && (
//                         <button
//                           onClick={() => setIsModalOpen(true)}
//                           className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 
//                                    text-white rounded-lg font-medium shadow-lg 
//                                    hover:from-blue-700 hover:to-sky-700 
//                                    transition-all duration-200 transform hover:scale-[1.02]"
//                         >
//                           Compare Products
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Products Grid */}
//               {!isLoading && !error && (
//                 <div className={`grid gap-4 sm:gap-6 ${
//                   viewMode === 'grid' 
//                     ? 'grid-cols-1 md:grid-cols-2' 
//                     : 'grid-cols-1'
//                 }`}>
//                   {filteredProducts.map((product) => (
//                     <div 
//                       key={product.id} 
//                       className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl 
//                                transition-all duration-300 border border-blue-100 overflow-hidden"
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5 
//                                     opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
//                       {/* Product Component */}
//                       <NormalProduct
//                         id={product.id}
//                         image={product.logoUrl}
//                         title={product.name}
//                         description={product.description}
//                         category={product.category}
//                         product={product}
//                       />
                      
//                       {/* Compare Button */}
//                       <div className="absolute bottom-6 right-6 z-10">
//                         <button
//                           onClick={() => toggleCompareProduct(product)}
//                           className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
//                                     shadow-sm border transform hover:scale-105
//                                     ${compareProducts.some((p) => p.id === product.id)
//                                       ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
//                                       : 'bg-white/90 backdrop-blur-sm hover:bg-white text-blue-600 border-blue-200'
//                                     }`}
//                         >
//                           {compareProducts.some((p) => p.id === product.id)
//                             ? 'Remove Compare'
//                             : 'Compare'
//                           }
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Loading State */}
//               {isLoading && (
//                 <div className="flex justify-center items-center py-12">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
//                 </div>
//               )}

//               {/* Error State */}
//               {error && (
//                 <div className="text-center py-8">
//                   <div className="bg-red-50 text-red-600 p-4 rounded-lg">
//                     {error}
//                   </div>
//                 </div>
//               )}

//               {/* Empty State */}
//               {!isLoading && !error && filteredProducts.length === 0 && (
//                 <div className="text-center py-12">
//                   <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto border border-blue-100">
//                     <Package className="w-12 h-12 text-blue-300 mx-auto mb-4" />
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                       No products found
//                     </h3>
//                     <p className="text-gray-500">
//                       Try adjusting your search or filter criteria
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Comparison Modal */}
//       <ComparisonModal 
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         products={compareProducts}
//       />

//       {/* Mobile Filter Button */}
//       <button
//         onClick={() => setIsMobileFilterOpen(true)}
//         className="lg:hidden fixed bottom-6 right-6 z-20 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
//       >
//         <FilterIcon className="w-6 h-6" />
//       </button>

//       {/* Mobile Filter Panel */}
//       {isMobileFilterOpen && (
//         <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
//           <div className="absolute right-0 h-full w-full max-w-xs bg-white shadow-xl">
//             <div className="flex items-center justify-between p-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold">Filters</h2>
//               <button
//                 onClick={() => setIsMobileFilterOpen(false)}
//                 className="p-2 text-gray-500 hover:text-gray-700"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             <div className="overflow-y-auto h-full pb-20">
//               <DirectoryFilter
//                 selectedFilters={selectedFilters}
//                 handleFilterChange={(type, value) => {
//                   setSelectedFilters(prev => ({
//                     ...prev,
//                     [type]: prev[type].includes(value)
//                       ? prev[type].filter(item => item !== value)
//                       : [...prev[type], value]
//                   }));
//                 }}
//                 setSelectedFilters={setSelectedFilters}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DirectoryProduct;
// import React, { useEffect, useState } from "react";
// import { Grid, List, Search, Package, FilterIcon, X, Check } from 'lucide-react';
// import DirectoryFilter from "./DirectoryFilter";
// import NormalProduct from "@/components/NormalProduct";

// // Custom Modal Component
// const Modal = ({ isOpen, onClose, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 overflow-y-auto">
//       <div 
//         className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
//         onClick={onClose}
//       />
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div className="relative w-full max-w-6xl bg-white rounded-lg shadow-xl">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Comparison Modal Component
// const ComparisonModal = ({ isOpen, onClose, products }) => {
//   if (!isOpen || !Array.isArray(products) || products.length !== 2) return null;

//   const ComparisonRow = ({ label, field, render }) => (
//     <div className="flex border-b border-gray-200">
//       <div className="w-32 bg-gray-50 px-4 py-3 font-medium text-sm text-gray-600">
//         {label}
//       </div>
//       <div className="flex-1 grid grid-cols-2">
//         {products.map((product, idx) => {
//           const value = field.split('.').reduce((acc, part) => acc?.[part], product) ?? '';
//           return (
//             <div key={idx} className={`px-4 py-3 ${idx === 0 ? 'border-r border-gray-200' : ''}`}>
//               {render ? render(value, product) : value}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );

//   const renderFeatures = (features) => {
//     if (!Array.isArray(features)) return null;
//     return (
//       <div className="space-y-2">
//         {features.map((feature, idx) => (
//           <div key={idx} className="flex items-center gap-2">
//             <Check className="w-4 h-4 text-green-500" />
//             <span className="text-sm">{feature}</span>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderTags = (tags) => {
//     if (!Array.isArray(tags)) return null;
//     return (
//       <div className="flex flex-wrap gap-2">
//         {tags.map((tag, idx) => (
//           <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
//             {tag}
//           </span>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <div className="h-[80vh] flex flex-col">
//         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-900">Product Comparison</h2>
//           <button
//             onClick={onClose}
//             className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           <div className="divide-y divide-gray-200">
//             {/* Product Headers */}
//             <div className="flex">
//               <div className="w-32" />
//               <div className="flex-1 grid grid-cols-2">
//                 {products.map((product, idx) => (
//                   <div key={idx} className={`p-4 flex flex-col items-center ${idx === 0 ? 'border-r border-gray-200' : ''}`}>
//                     {product.logoUrl && (
//                       <img 
//                         src={product.logoUrl} 
//                         alt={product.name} 
//                         className="h-16 w-16 object-contain mb-2" 
//                       />
//                     )}
//                     <h3 className="font-medium text-gray-900">{product.name}</h3>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Comparison Rows */}
//             <ComparisonRow 
//               label="Category" 
//               field="category" 
//               render={(value) => Array.isArray(value) ? renderTags(value) : value} 
//             />
//             <ComparisonRow 
//               label="Deployment" 
//               field="deployement" 
//               render={(value) => Array.isArray(value) ? renderTags(value) : value} 
//             />
//             <ComparisonRow 
//               label="Mobile Available" 
//               field="mobileAvailable" 
//             />
//             <ComparisonRow 
//               label="Adoption Time" 
//               field="avgTimeAdoption" 
//             />
//             <ComparisonRow 
//               label="Team Size" 
//               field="company.TeamSize" 
//             />
//             <ComparisonRow 
//               label="Features" 
//               field="features" 
//               render={renderFeatures} 
//             />
//             <ComparisonRow 
//               label="Practice Areas" 
//               field="practiceAreas" 
//               render={(value) => Array.isArray(value) ? renderTags(value) : value} 
//             />
//             <ComparisonRow 
//               label="User Categories" 
//               field="userCategory" 
//               render={(value) => Array.isArray(value) ? renderTags(value) : value} 
//             />
//             <ComparisonRow 
//               label="Industries" 
//               field="industry" 
//               render={(value) => Array.isArray(value) ? renderTags(value) : value} 
//             />
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// // Main Directory Product Component
// const DirectoryProduct = () => {
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [viewMode, setViewMode] = useState('list');
//   const [compareProducts, setCompareProducts] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   const [selectedFilters, setSelectedFilters] = useState({
//     categories: [],
//     userCategory: [],
//     language: [],
//     country: [],
//     industry: [],
//     practiceAreas: [],
//     mobileAvailable: [],
//     price: [],
//   });

//   // const fetchProducts = async (searchValue = "") => {
//   //   setIsLoading(true);
//   //   setError(null);
    
//   //   try {
//   //     const response = await fetch("/api/get-all-products", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         number: 50
//   //       }),
//   //     });
      
//   //     if (!response.ok) {
//   //       const errorData = await response.json();
//   //       throw new Error(errorData.msg || 'Failed to fetch products');
//   //     }

//   //     const data = await response.json();
      
//   //     if (data.success && Array.isArray(data.products)) {
//   //       let filtered = data.products.filter(product => product.active === "publish");
        
//   //       // Apply search filter
//   //       if (searchValue.trim()) {
//   //         const searchTerms = searchValue.toLowerCase().trim().split(/\s+/);
//   //         filtered = filtered.filter(product => 
//   //           searchTerms.every(term => 
//   //             product.name?.toLowerCase().includes(term) ||
//   //             product.description?.toLowerCase().includes(term) ||
//   //             product.category?.some(cat => cat.toLowerCase().includes(term)) ||
//   //             product.industry?.some(ind => ind.toLowerCase().includes(term))
//   //           )
//   //         );
//   //       }

//   //       // Apply filters
//   //       Object.entries(selectedFilters).forEach(([filterType, selectedValues]) => {
//   //         if (selectedValues.length > 0) {
//   //           filtered = filtered.filter(product => {
//   //             switch (filterType) {
//   //               case 'categories':
//   //                 return product.category?.some(cat => selectedValues.includes(cat));
//   //               case 'userCategory':
//   //                 return product.userCategory?.some(cat => selectedValues.includes(cat));
//   //               case 'language':
//   //                 return product.languages?.some(lang => selectedValues.includes(lang));
//   //               case 'country':
//   //                 return product.focusCountries?.some(country => selectedValues.includes(country));
//   //               case 'industry':
//   //                 return product.industry?.some(ind => selectedValues.includes(ind));
//   //               case 'practiceAreas':
//   //                 return product.practiceAreas?.some(area => selectedValues.includes(area));
//   //               default:
//   //                 return true;
//   //             }
//   //           });
//   //         }
//   //       });

//   //       setFilteredProducts(filtered);
//   //     } else {
//   //       setFilteredProducts([]);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching products:", error);
//   //     setError(error.message || 'Failed to load products. Please try again later.');
//   //     setFilteredProducts([]);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
//   const fetchProducts = async (searchValue = "") => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const response = await fetch("/api/get-all-products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           number: 50
//         }),
//       });
      
//       const data = await response.json();
      
//       if (!response.ok) {
//         throw new Error(data.error || data.msg || `HTTP error! status: ${response.status}`);
//       }
      
//       if (!data.success) {
//         throw new Error(data.msg || 'Failed to fetch products');
//       }
  
//       if (data.success && Array.isArray(data.products)) {
//         console.log("Products fetched successfully:", {
//           total: data.products.length,
//           sample: data.products[0]?.name
//         });
  
//         let filtered = data.products;
        
//         // Apply search filter
//         if (searchValue.trim()) {
//           const searchTerms = searchValue.toLowerCase().trim().split(/\s+/);
//           filtered = filtered.filter(product => {
//             try {
//               return searchTerms.every(term => 
//                 (product.name || '').toLowerCase().includes(term) ||
//                 (product.description || '').toLowerCase().includes(term) ||
//                 (Array.isArray(product.category) && product.category.some(cat => (cat || '').toLowerCase().includes(term))) ||
//                 (Array.isArray(product.industry) && product.industry.some(ind => (ind || '').toLowerCase().includes(term)))
//               );
//             } catch (filterError) {
//               console.error("Error filtering product:", product.id, filterError);
//               return false;
//             }
//           });
//         }
  
//         // Apply filters with error handling
//         Object.entries(selectedFilters).forEach(([filterType, selectedValues]) => {
//           if (selectedValues.length > 0) {
//             filtered = filtered.filter(product => {
//               try {
//                 switch (filterType) {
//                   case 'categories':
//                     return Array.isArray(product.category) && 
//                            product.category.some(cat => selectedValues.includes(cat));
//                   case 'userCategory':
//                     return Array.isArray(product.userCategory) && 
//                            product.userCategory.some(cat => selectedValues.includes(cat));
//                   case 'language':
//                     return Array.isArray(product.languages) && 
//                            product.languages.some(lang => selectedValues.includes(lang));
//                   case 'country':
//                     return Array.isArray(product.focusCountries) && 
//                            product.focusCountries.some(country => selectedValues.includes(country));
//                   case 'industry':
//                     return Array.isArray(product.industry) && 
//                            product.industry.some(ind => selectedValues.includes(ind));
//                   case 'practiceAreas':
//                     return Array.isArray(product.practiceAreas) && 
//                            product.practiceAreas.some(area => selectedValues.includes(area));
//                   default:
//                     return true;
//                 }
//               } catch (filterError) {
//                 console.error(`Error applying ${filterType} filter to product:`, product.id, filterError);
//                 return false;
//               }
//             });
//           }
//         });
  
//         console.log("Filtered products:", {
//           before: data.products.length,
//           after: filtered.length
//         });
  
//         setFilteredProducts(filtered);
//       } else {
//         console.warn("Invalid data structure received:", data);
//         setFilteredProducts([]);
//         setError('Received invalid data structure from server');
//       }
//     } catch (error) {
//       console.error("Error fetching products:", {
//         message: error.message,
//         stack: error.stack,
//         name: error.name
//       });
//       setError(error.message || 'Failed to load products. Please try again later.');
//       setFilteredProducts([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
//     fetchProducts(value);
//   };

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

//   useEffect(() => {
//     fetchProducts(searchTerm);
//   }, [selectedFilters]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
//       <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="pt-24 pb-8">
//           <div className="flex gap-8">
//             {/* Filter Section */}
//             <div className="hidden lg:block w-80 flex-shrink-0">
//               <div className="sticky top-32">
//                 <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
//                   <div className="max-h-[calc(100vh-10rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
//                     <DirectoryFilter
//                       selectedFilters={selectedFilters}
//                       handleFilterChange={(type, value) => {
//                         setSelectedFilters(prev => ({
//                           ...prev,
//                           [type]: prev[type].includes(value)
//                             ? prev[type].filter(item => item !== value)
//                             : [...prev[type], value]
//                         }));
//                       }}
//                       setSelectedFilters={setSelectedFilters}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1">
//               {/* Search Header */}
//               <div className="mb-8">
//                 <div className="relative rounded-2xl bg-white border border-blue-100 shadow-xl overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-sky-50 opacity-50" />
//                   <div className="relative px-4 py-6 sm:px-6 md:px-8 lg:px-12">
//                     <div className="flex flex-col gap-6">
//                       <div>
//                         <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
//                           Legal Tech Directory
//                         </h1>
//                         <p className="mt-2 text-gray-600 text-sm sm:text-base">
//                           Discover and compare the best legal software solutions
//                         </p>
//                       </div>

//                       <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
//                         <div className="relative flex-1 group">
//                           <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-200" />
//                           <div className="relative">
//                             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                             <input
//                               type="text"
//                               placeholder="Search products..."
//                               value={searchTerm}
//                               onChange={handleSearchChange}
//                               className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-0 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
//                             />
//                           </div>
//                         </div>

//                         <div className="flex justify-center sm:justify-start items-center gap-1 p-1 bg-white rounded-lg shadow-sm border border-blue-100">
//                           <button
//                             onClick={() => setViewMode('grid')}
//                             className={`flex-1 sm:flex-none p-2.5 rounded-lg transition-all duration-200 ${
//                               viewMode === 'grid'
//                                 ? 'bg-blue-100 text-blue-600'
//                                 : 'text-gray-600 hover:bg-gray-50'
//                             }`}
//                           >
//                             <Grid className="w-5 h-5 mx-auto" />
//                           </button>
//                           <button
//                             onClick={() => setViewMode('list')}
//                             className={`flex-1 sm:flex-none p-2.5 rounded-lg transition-all duration-200 ${
//                               viewMode === 'list'
//                                 ? 'bg-blue-100 text-blue-600'
//                                 : 'text-gray-600 hover:bg-gray-50'
//                             }`}
//                           >
//                             <List className="w-5 h-5 mx-auto" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Compare Products Bar */}
//               {compareProducts.length > 0 && (
//                 <div className="mb-8">
//                   <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-4">
//                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//                       <div className="flex items-center gap-3">
//                         <div className="bg-blue-100 p-2 rounded-lg">
//                           <Package className="w-5 h-5 text-blue-600" />
//                         </div>
//                         <div>
//                           <p className="text-gray-600">Selected for comparison</p>
//                           <p className="text-lg font-semibold text-blue-600">
//                             {compareProducts.length} product{compareProducts.length > 1 ? 's' : ''}
//                           </p>
//                         </div>
//                       </div>
//                       {compareProducts.length === 2 && (
//                         <button
//                           onClick={() => setIsModalOpen(true)}
//                           className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 
//                                    text-white rounded-lg font-medium shadow-lg 
//                                    hover:from-blue-700 hover:to-sky-700 
//                                    transition-all duration-200 transform hover:scale-[1.02]"
//                         >
//                           Compare Products
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Products Grid */}
//               {!isLoading && !error && (
//                 <div className={`grid gap-4 sm:gap-6 ${
//                   viewMode === 'grid' 
//                     ? 'grid-cols-1 md:grid-cols-2' 
//                     : 'grid-cols-1'
//                 }`}>
//                   {filteredProducts.map((product) => (
//                     <div 
//                       key={product.id} 
//                       className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl 
//                                transition-all duration-300 border border-blue-100 overflow-hidden"
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-sky-500/5 
//                                     opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
//                       {/* Product Component */}
//                       <NormalProduct
//                         id={product.id}
//                         image={product.logoUrl}
//                         title={product.name}
//                         description={product.description}
//                         category={product.category}
//                         product={product}
//                       />
                      
//                       {/* Compare Button */}
//                       <div className="absolute bottom-6 right-6 z-10">
//                         <button
//                           onClick={() => toggleCompareProduct(product)}
//                           className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
//                                     shadow-sm border transform hover:scale-105
//                                     ${compareProducts.some((p) => p.id === product.id)
//                                       ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700'
//                                       : 'bg-white/90 backdrop-blur-sm hover:bg-white text-blue-600 border-blue-200'
//                                     }`}
//                         >
//                           {compareProducts.some((p) => p.id === product.id)
//                             ? 'Remove Compare'
//                             : 'Compare'
//                           }
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Loading State */}
//               {isLoading && (
//                 <div className="flex justify-center items-center py-12">
//                   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
//                 </div>
//               )}

//               {/* Error State */}
//               {error && (
//                 <div className="text-center py-8">
//                   <div className="bg-red-50 text-red-600 p-4 rounded-lg">
//                     {error}
//                   </div>
//                 </div>
//               )}

//               {/* Empty State */}
//               {!isLoading && !error && filteredProducts.length === 0 && (
//                 <div className="text-center py-12">
//                   <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto border border-blue-100">
//                     <Package className="w-12 h-12 text-blue-300 mx-auto mb-4" />
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                       No products found
//                     </h3>
//                     <p className="text-gray-500">
//                       Try adjusting your search or filter criteria
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Comparison Modal */}
//       <ComparisonModal 
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         products={compareProducts}
//       />

//       {/* Mobile Filter Button */}
//       <button
//         onClick={() => setIsMobileFilterOpen(true)}
//         className="lg:hidden fixed bottom-6 right-6 z-20 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200"
//       >
//         <FilterIcon className="w-6 h-6" />
//       </button>

//       {/* Mobile Filter Panel */}
//       {isMobileFilterOpen && (
//         <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
//           <div className="absolute right-0 h-full w-full max-w-xs bg-white shadow-xl">
//             <div className="flex items-center justify-between p-4 border-b border-gray-200">
//               <h2 className="text-lg font-semibold">Filters</h2>
//               <button
//                 onClick={() => setIsMobileFilterOpen(false)}
//                 className="p-2 text-gray-500 hover:text-gray-700"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>
//             <div className="overflow-y-auto h-full pb-20">
//               <DirectoryFilter
//                 selectedFilters={selectedFilters}
//                 handleFilterChange={(type, value) => {
//                   setSelectedFilters(prev => ({
//                     ...prev,
//                     [type]: prev[type].includes(value)
//                       ? prev[type].filter(item => item !== value)
//                       : [...prev[type], value]
//                   }));
//                 }}
//                 setSelectedFilters={setSelectedFilters}
//               />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DirectoryProduct;