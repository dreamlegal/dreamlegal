
// import React, { useEffect, useState } from "react";
// import NormalProduct from "@/components/NormalProduct";
// import { Grid, List, Search, Package } from 'lucide-react';
// import DirectoryFilter from "./DirectoryFilter";

// function DirectoryProduct() {
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [viewMode, setViewMode] = useState('grid');
//     const [compareProducts, setCompareProducts] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
    
//     const [selectedFilters, setSelectedFilters] = useState({
//       categories: [],
//       userCategory: [],
//       language: [],
//       country: [],
//       industry: [],
//       practiceAreas: [],
//       mobileAvailable: [],
//       price: [],
//     });
  
//     const fetchProducts = async (search = "") => {
//       try {
//         const response = await fetch("/api/get-all-products", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ number: 10 }),
//         });
        
//         const data = await response.json();
  
//         if (data.success) {
//           let filtered = data.products.filter(
//             (product) => product.active === "publish"
//           );
  
//           // Apply search filter
//           if (search) {
//             const searchLower = search.toLowerCase();
//             filtered = filtered.filter(product => 
//               product.name.toLowerCase().includes(searchLower) ||
//               product.description.toLowerCase().includes(searchLower)
//             );
//           }
  
//           // Apply category filter
//           if (selectedFilters.categories.length > 0) {
//             filtered = filtered.filter(product =>
//               product.category.some(cat => selectedFilters.categories.includes(cat))
//             );
//           }
  
//           // Apply user category filter
//           if (selectedFilters.userCategory.length > 0) {
//             filtered = filtered.filter(product =>
//               product.userCategory.some(cat => selectedFilters.userCategory.includes(cat))
//             );
//           }
  
//           // Apply other filters similarly
//           if (selectedFilters.language.length > 0) {
//             filtered = filtered.filter(product => 
//               selectedFilters.language.includes(product.language)
//             );
//           }
  
//           if (selectedFilters.country.length > 0) {
//             filtered = filtered.filter(product => 
//               selectedFilters.country.includes(product.country)
//             );
//           }
  
//           setFilteredProducts(filtered);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
  
//     useEffect(() => {
//       fetchProducts(searchTerm);
//     }, [selectedFilters, searchTerm]);
  
//     const toggleCompareProduct = (product) => {
//       setCompareProducts(prev => {
//         if (prev.find(p => p.id === product.id)) {
//           return prev.filter(p => p.id !== product.id);
//         }
//         if (prev.length >= 2) {
//           alert('You can only compare up to 2 products');
//           return prev;
//         }
//         return [...prev, product];
//       });
//     };
    
//   const handleFilterChange = (filterType, value) => {
//     setSelectedFilters(prev => ({
//       ...prev,
//       [filterType]: prev[filterType].includes(value)
//         ? prev[filterType].filter(item => item !== value)
//         : [...prev[filterType], value]
//     }));
//   };
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
//       <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="py-8">
//           <div className="flex gap-8">
//             {/* Left Sidebar - Filters */}
//             <div className="w-80 flex-shrink-0">
//               <div className="sticky top-24">
//                 <div className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden">
//                   <DirectoryFilter
//                     selectedFilters={selectedFilters}
//                     handleFilterChange={handleFilterChange}
//                     setSelectedFilters={setSelectedFilters}
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Right Content Area */}
//             <div className="flex-1">
//               {/* Premium Header Section */}
//               <div className="mb-8">
//                 <div className="relative rounded-2xl bg-white border border-purple-100 shadow-xl overflow-hidden">
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-50" />
//                   <div className="relative px-6 py-8 md:px-8 lg:px-12">
//                     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//                       <div>
//                         <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//                           Legal Tech Directory
//                         </h1>
//                         <p className="mt-2 text-gray-600">
//                           Discover and compare the best legal software solutions
//                         </p>
//                       </div>

//                       {/* Enhanced Search Bar */}
//                       <div className="flex flex-col sm:flex-row items-center gap-4">
//                         <div className="relative w-full sm:w-80 group">
//                           <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-200" />
//                           <div className="relative">
//                             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                             <input
//                               type="text"
//                               placeholder="Search products..."
//                               value={searchTerm}
//                               onChange={(e) => setSearchTerm(e.target.value)}
//                               className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-0 focus:ring-2 focus:ring-purple-500 outline-none shadow-sm"
//                             />
//                           </div>
//                         </div>

//                         {/* View Toggle */}
//                         <div className="flex items-center gap-1 p-1 bg-white rounded-lg shadow-sm border border-purple-100">
//                           <button
//                             onClick={() => setViewMode('grid')}
//                             className={`p-2.5 rounded-lg transition-all duration-200 ${
//                               viewMode === 'grid'
//                                 ? 'bg-purple-100 text-purple-600'
//                                 : 'text-gray-600 hover:bg-gray-50'
//                             }`}
//                           >
//                             <Grid className="w-5 h-5" />
//                           </button>
//                           <button
//                             onClick={() => setViewMode('list')}
//                             className={`p-2.5 rounded-lg transition-all duration-200 ${
//                               viewMode === 'list'
//                                 ? 'bg-purple-100 text-purple-600'
//                                 : 'text-gray-600 hover:bg-gray-50'
//                             }`}
//                           >
//                             <List className="w-5 h-5" />
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
//                   <div className="bg-white border border-purple-100 rounded-xl shadow-lg p-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <div className="bg-purple-100 p-2 rounded-lg">
//                           <Package className="w-5 h-5 text-purple-600" />
//                         </div>
//                         <div>
//                           <p className="text-gray-600">Selected for comparison</p>
//                           <p className="text-lg font-semibold text-purple-600">
//                             {compareProducts.length} product{compareProducts.length > 1 ? 's' : ''}
//                           </p>
//                         </div>
//                       </div>
//                       {compareProducts.length === 2 && (
//                         <button
//                           onClick={() => setIsModalOpen(true)}
//                           className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
//                                    text-white rounded-lg font-medium shadow-lg 
//                                    hover:from-purple-700 hover:to-pink-700 
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
//               <div className={`grid gap-6 ${
//                 viewMode === 'grid' 
//                   ? 'grid-cols-1 lg:grid-cols-2' 
//                   : 'grid-cols-1'
//               }`}>
//                 {filteredProducts.map((product) => (
//                   <div 
//                     key={product.id} 
//                     className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl 
//                              transition-all duration-300 border border-purple-100 overflow-hidden"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 
//                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                     <button
//                       onClick={() => toggleCompareProduct(product)}
//                       className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm 
//                                hover:bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium 
//                                transition-all duration-200 shadow-sm border border-purple-200
//                                hover:shadow-md transform hover:scale-105"
//                     >
//                       {compareProducts.some((p) => p.id === product.id)
//                         ? 'Remove Compare'
//                         : 'Compare'
//                       }
//                     </button>
//                     <NormalProduct
//                       id={product.id}
//                       image={product.logoUrl}
//                       title={product.name}
//                       description={product.description}
//                       category={product.category}
//                       product={product}
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Empty State */}
//               {filteredProducts.length === 0 && (
//                 <div className="text-center py-12">
//                   <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto border border-purple-100">
//                     <Package className="w-12 h-12 text-purple-300 mx-auto mb-4" />
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
//     </div>
//   );
// }

// export default DirectoryProduct;
// import React, { useEffect, useState } from "react";
// import NormalProduct from "@/components/NormalProduct";
// import { Grid, List, Search, Package } from 'lucide-react';
// import DirectoryFilter from "./DirectoryFilter";

// function DirectoryProduct() {
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [viewMode, setViewMode] = useState('grid');
//     const [compareProducts, setCompareProducts] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
    
//     const [selectedFilters, setSelectedFilters] = useState({
//       categories: [],
//       userCategory: [],
//       language: [],
//       country: [],
//       industry: [],
//       practiceAreas: [],
//       mobileAvailable: [],
//       price: [],
//     });
  
//     const fetchProducts = async (search = "") => {
//       try {
//         const response = await fetch("/api/get-all-products", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ number: 10 }),
//         });
        
//         const data = await response.json();
  
//         if (data.success) {
//           let filtered = data.products.filter(
//             (product) => product.active === "publish"
//           );
  
//           // Apply search filter
//           if (search) {
//             const searchLower = search.toLowerCase();
//             filtered = filtered.filter(product => 
//               product.name.toLowerCase().includes(searchLower) ||
//               product.description.toLowerCase().includes(searchLower)
//             );
//           }
  
//           // Apply filters
//           if (selectedFilters.categories.length > 0) {
//             filtered = filtered.filter(product =>
//               product.category.some(cat => selectedFilters.categories.includes(cat))
//             );
//           }
  
//           if (selectedFilters.userCategory.length > 0) {
//             filtered = filtered.filter(product =>
//               product.userCategory.some(cat => selectedFilters.userCategory.includes(cat))
//             );
//           }
  
//           if (selectedFilters.language.length > 0) {
//             filtered = filtered.filter(product => 
//               selectedFilters.language.includes(product.language)
//             );
//           }
  
//           if (selectedFilters.country.length > 0) {
//             filtered = filtered.filter(product => 
//               selectedFilters.country.includes(product.country)
//             );
//           }
  
//           setFilteredProducts(filtered);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
  
//     useEffect(() => {
//       fetchProducts(searchTerm);
//     }, [selectedFilters, searchTerm]);
  
//     const toggleCompareProduct = (product) => {
//       setCompareProducts(prev => {
//         if (prev.find(p => p.id === product.id)) {
//           return prev.filter(p => p.id !== product.id);
//         }
//         if (prev.length >= 2) {
//           alert('You can only compare up to 2 products');
//           return prev;
//         }
//         return [...prev, product];
//       });
//     };
    
//     const handleFilterChange = (filterType, value) => {
//       setSelectedFilters(prev => ({
//         ...prev,
//         [filterType]: prev[filterType].includes(value)
//           ? prev[filterType].filter(item => item !== value)
//           : [...prev[filterType], value]
//       }));
//     };
  
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
//         <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Added extra padding-top for floating navbar */}
//           <div className="pt-24 pb-8">
//             <div className="flex gap-8">
//               {/* Left Sidebar - Filters */}
//               <div className="w-80 flex-shrink-0">
//                 <div className="sticky top-32"> {/* Adjusted top spacing */}
//                   <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
//                     <DirectoryFilter
//                       selectedFilters={selectedFilters}
//                       handleFilterChange={handleFilterChange}
//                       setSelectedFilters={setSelectedFilters}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Right Content Area */}
//               <div className="flex-1">
//                 {/* Premium Header Section */}
//                 <div className="mb-8">
//                   <div className="relative rounded-2xl bg-white border border-blue-100 shadow-xl overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-sky-50 opacity-50" />
//                     <div className="relative px-6 py-8 md:px-8 lg:px-12">
//                       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//                         <div>
//                           <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
//                             Legal Tech Directory
//                           </h1>
//                           <p className="mt-2 text-gray-600">
//                             Discover and compare the best legal software solutions
//                           </p>
//                         </div>

//                         {/* Enhanced Search Bar */}
//                         <div className="flex flex-col sm:flex-row items-center gap-4">
//                           <div className="relative w-full sm:w-80 group">
//                             <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition duration-200" />
//                             <div className="relative">
//                               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                               <input
//                                 type="text"
//                                 placeholder="Search products..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-0 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
//                               />
//                             </div>
//                           </div>

//                           {/* View Toggle */}
//                           <div className="flex items-center gap-1 p-1 bg-white rounded-lg shadow-sm border border-blue-100">
//                             <button
//                               onClick={() => setViewMode('grid')}
//                               className={`p-2.5 rounded-lg transition-all duration-200 ${
//                                 viewMode === 'grid'
//                                   ? 'bg-blue-100 text-blue-600'
//                                   : 'text-gray-600 hover:bg-gray-50'
//                               }`}
//                             >
//                               <Grid className="w-5 h-5" />
//                             </button>
//                             <button
//                               onClick={() => setViewMode('list')}
//                               className={`p-2.5 rounded-lg transition-all duration-200 ${
//                                 viewMode === 'list'
//                                   ? 'bg-blue-100 text-blue-600'
//                                   : 'text-gray-600 hover:bg-gray-50'
//                               }`}
//                             >
//                               <List className="w-5 h-5" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Compare Products Bar */}
//                 {compareProducts.length > 0 && (
//                   <div className="mb-8">
//                     <div className="bg-white border border-blue-100 rounded-xl shadow-lg p-4">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className="bg-blue-100 p-2 rounded-lg">
//                             <Package className="w-5 h-5 text-blue-600" />
//                           </div>
//                           <div>
//                             <p className="text-gray-600">Selected for comparison</p>
//                             <p className="text-lg font-semibold text-blue-600">
//                               {compareProducts.length} product{compareProducts.length > 1 ? 's' : ''}
//                             </p>
//                           </div>
//                         </div>
//                         {compareProducts.length === 2 && (
//                           <button
//                             onClick={() => setIsModalOpen(true)}
//                             className="px-6 py-3 bg-gradient-to-r from-blue-600 to-sky-600 
//                                      text-white rounded-lg font-medium shadow-lg 
//                                      hover:from-blue-700 hover:to-sky-700 
//                                      transition-all duration-200 transform hover:scale-[1.02]"
//                           >
//                             Compare Products
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Products Grid */}
//                 <div className={`grid gap-6 ${
//                   viewMode === 'grid' 
//                     ? 'grid-cols-1 lg:grid-cols-2' 
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
//                       <button
//                         onClick={() => toggleCompareProduct(product)}
//                         className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm 
//                                  hover:bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium 
//                                  transition-all duration-200 shadow-sm border border-blue-200
//                                  hover:shadow-md transform hover:scale-105"
//                       >
//                         {compareProducts.some((p) => p.id === product.id)
//                           ? 'Remove Compare'
//                           : 'Compare'
//                         }
//                       </button>
//                       <NormalProduct
//                         id={product.id}
//                         image={product.logoUrl}
//                         title={product.name}
//                         description={product.description}
//                         category={product.category}
//                         product={product}
//                       />
//                     </div>
//                   ))}
//                 </div>

//                 {/* Empty State */}
//                 {filteredProducts.length === 0 && (
//                   <div className="text-center py-12">
//                     <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto border border-blue-100">
//                       <Package className="w-12 h-12 text-blue-300 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                         No products found
//                       </h3>
//                       <p className="text-gray-500">
//                         Try adjusting your search or filter criteria
//                       </p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
// }

// export default DirectoryProduct;
// DirectoryProduct.jsx
import React, { useEffect, useState } from "react";
import NormalProduct from "@/components/NormalProduct";
import { Grid, List, Search, Package, FilterIcon, X } from 'lucide-react';
import DirectoryFilter from "./DirectoryFilter";

function DirectoryProduct() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState('grid');
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
              {/* Desktop Sidebar - Hidden on mobile */}
              <div className="hidden lg:block w-80 flex-shrink-0">
                <div className="sticky top-32">
                  <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
                    <DirectoryFilter
                      selectedFilters={selectedFilters}
                      handleFilterChange={handleFilterChange}
                      setSelectedFilters={setSelectedFilters}
                    />
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
                            <div className="relative">
                              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                              <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border-0 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                              />
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
                      <button
                        onClick={() => toggleCompareProduct(product)}
                        className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm 
                                 hover:bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium 
                                 transition-all duration-200 shadow-sm border border-blue-200
                                 hover:shadow-md transform hover:scale-105"
                      >
                        {compareProducts.some((p) => p.id === product.id)
                          ? 'Remove Compare'
                          : 'Compare'
                        }
                      </button>
                      <NormalProduct
                        id={product.id}
                        image={product.logoUrl}
                        title={product.name}
                        description={product.description}
                        category={product.category}
                        product={product}
                      />
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
