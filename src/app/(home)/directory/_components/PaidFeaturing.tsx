
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// const categories = [
//   "Client Relationship Management",
//   "Contract Lifecycle Management",
//   "E-Signature",
//   "Document Management System",
//   "E-billing and Invoicing",
//   "E-discovery",
//   "Governance, Risk and Compliance",
//   "Intellectual Property Management",
//   "Legal Research",
//   "Legal Workflow Automation",
//   "Litigation Management and Analytics"
// ];

// const ProductCard = ({ product }) => {
//   // Format user categories for display
//   const formatUserCategories = () => {
//     if (!product.userCategory || product.userCategory.length === 0) return null;
    
//     const formattedCategories = product.userCategory.map(cat => {
//       const parts = cat.split('|');
//       return parts[0]; // Return just the category name
//     });
    
//     if (formattedCategories.length <= 2) {
//       return formattedCategories.join(', ');
//     } else {
//       return `${formattedCategories[0]}, ${formattedCategories[1]}... +${formattedCategories.length - 2} more`;
//     }
//   };
  
//   const handleClick = () => {
//     window.location.href = `/product/${product.slug}`;
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="bg-[#f5f7fa] rounded-lg border border-gray-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300 h-full cursor-pointer relative group"
//       onClick={handleClick}
//     >
//       {/* View icon that appears on hover */}
//       <div className="absolute top-0 right-0 m-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#7cc6ee] text-white p-2 rounded-full">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//         </svg>
//       </div>
      
//       <div className="p-6 flex flex-col h-full">
//         {/* Logo */}
//         <div className="flex items-center justify-center mb-4 h-16">
//           {product.logoUrl ? (
//             <img 
//               src={product.logoUrl} 
//               alt={`${product.name} logo`} 
//               className="max-h-full max-w-full object-contain" 
//             />
//           ) : (
//             <div className="w-12 h-12 bg-[#1e2556]/10 rounded-full flex items-center justify-center">
//               <span className="text-[#1e2556] font-semibold text-lg">
//                 {product.name.charAt(0)}
//               </span>
//             </div>
//           )}
//         </div>
        
//         {/* Name */}
//         <h3 className="text-base font-semibold text-[#1e2556] mb-2 text-center">{product.name}</h3>
        
//         {/* User Categories */}
//         {formatUserCategories && formatUserCategories() && (
//           <p className="text-xs text-[#2d2d2d] mt-auto text-center">
//             <span className="font-medium">For:</span> {formatUserCategories()}
//           </p>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// const CategoriesProducts = () => {
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categoryProducts, setCategoryProducts] = useState({});

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
        
//         const response = await fetch(`/api/paid-listing-products?category=${encodeURIComponent(selectedCategory)}`);
//         const data = await response.json();
        
//         console.log("API response:", data);
        
//         if (data && data.products && data.products.length > 0) {
//           setCategoryProducts(prev => ({
//             ...prev,
//             [selectedCategory]: data.products
//           }));
//           setProducts(data.products);
//         } else {
//           // Generate mock products for demonstration while API is being fixed
//           const mockProducts = Array.from({ length: 9 }, (_, i) => ({
//             id: `product-${i}`,
//             name: `${selectedCategory} Solution ${i + 1}`,
//             logoUrl: "/api/placeholder/64/64",
//             userCategory: [
//               `Enterprises|100|true`,
//               `Startups|0|false`,
//               i % 2 === 0 ? `Law Firms|50|true` : null
//             ].filter(Boolean),
//           }));
          
//           setCategoryProducts(prev => ({
//             ...prev,
//             [selectedCategory]: mockProducts
//           }));
//           setProducts(mockProducts);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         // Generate mock products for demonstration
//         const mockProducts = Array.from({ length: 9 }, (_, i) => ({
//           id: `product-${i}`,
//           name: `${selectedCategory} Solution ${i + 1}`,
//           logoUrl: "/api/placeholder/64/64",
//           userCategory: [
//             `Enterprises|100|true`,
//             `Startups|0|false`,
//             i % 2 === 0 ? `Law Firms|50|true` : null
//           ].filter(Boolean),
//         }));
        
//         setCategoryProducts(prev => ({
//           ...prev,
//           [selectedCategory]: mockProducts
//         }));
//         setProducts(mockProducts);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Check if we already have products for this category
//     if (categoryProducts[selectedCategory]) {
//       setProducts(categoryProducts[selectedCategory]);
//       setLoading(false);
//     } else {
//       fetchProducts();
//     }
//   }, [selectedCategory, categoryProducts]);

//   return (
//     <div className="w-full relative overflow-hidden bg-white">
//       <div className="relative py-12">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//             {/* Categories sidebar (on left) */}
//             <div className="lg:col-span-4">
//               <h2 className="text-2xl md:text-3xl font-bold text-[#1e2556] mb-4">
//                 Most Popular Software Categories
//               </h2>
//               <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`text-left px-3 lg:px-4 py-2 lg:py-3 rounded transition-colors text-xs md:text-sm
//                               ${selectedCategory === category 
//                                 ? 'bg-[#1e2556] text-white font-medium' 
//                                 : 'text-[#2d2d2d] hover:bg-[#f5f7fa]'}`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Products grid (on right) */}
//             <div className="lg:col-span-8">
//               {loading ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {[...Array(9)].map((_, index) => (
//                     <div key={index} className="bg-[#f5f7fa] rounded-lg border border-gray-200 p-6 animate-pulse h-56">
//                       <div className="h-16 bg-gray-200 rounded mb-4 mx-auto w-16"></div>
//                       <div className="h-4 bg-gray-200 rounded mx-auto w-28 mb-3"></div>
//                       <div className="h-3 bg-gray-200 rounded mx-auto w-20 mb-3"></div>
//                       <div className="h-3 bg-gray-200 rounded mx-auto w-32 mt-auto"></div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {products.length > 0 ? (
//                     products.map((product) => (
//                       <ProductCard key={product.id} product={product} />
//                     ))
//                   ) : (
//                     <div className="col-span-full flex justify-center items-center py-16">
//                       <div className="text-center">
//                         <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4M8 16l-4-4 4-4" />
//                         </svg>
//                         <h3 className="text-lg font-medium text-[#334155] mb-1">No Products Found</h3>
//                         <p className="text-[#2d2d2d] text-sm">Try selecting a different category</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoriesProducts;
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// // Display names for categories
// const categories = [
//   "Contract Lifecycle Management",
//   "Legal AI", 
//   "Document Management System",
//   "Litigation Management and Analytics",
//   "Intellectual Property Management",
//   "Legal Research",
//   "E-discovery"
// ];

// // Mapping from display names to enum values
// const categoryMapping = {
//   "Contract Lifecycle Management": "CONTRACT_LIFECYCLE_MANAGEMENT",
//   "Legal AI": "LEGAL_AI",
//   "Document Management System": "DOCUMENT_MANAGEMENT_SYSTEM", 
//   "Litigation Management and Analytics": "LITIGATION_MANAGEMENT_AND_ANALYTICS",
//   "Intellectual Property Management": "IP_MANAGEMENT",
//   "Legal Research": "LEGAL_RESEARCH",
//   "E-discovery": "E_DISCOVERY"
// };

// const ProductCard = ({ product }) => {
//   const handleClick = () => {
//     window.location.href = `/product/${product.slug}`;
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="bg-[#f5f7fa] rounded-lg border border-gray-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300 h-full cursor-pointer relative group"
//       onClick={handleClick}
//     >
//       {/* View icon that appears on hover */}
//       <div className="absolute top-0 right-0 m-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#7cc6ee] text-white p-2 rounded-full">
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//         </svg>
//       </div>
      
//       <div className="p-6 flex flex-col h-full">
//         {/* Logo */}
//         <div className="flex items-center justify-center mb-4 h-16">
//           {product.logoUrl ? (
//             <img 
//               src={product.logoUrl} 
//               alt={`${product.productName} logo`} 
//               className="max-h-full max-w-full object-contain" 
//             />
//           ) : (
//             <div className="w-12 h-12 bg-[#1e2556]/10 rounded-full flex items-center justify-center">
//               <span className="text-[#1e2556] font-semibold text-lg">
//                 {product.productName.charAt(0)}
//               </span>
//             </div>
//           )}
//         </div>
        
//         {/* Name */}
//         <h3 className="text-base font-semibold text-[#1e2556] mb-2 text-center">{product.productName}</h3>
        
//         {/* Category */}
//         <p className="text-xs text-[#2d2d2d] mt-auto text-center">
//           <span className="font-medium">Category:</span> {Object.keys(categoryMapping).find(key => categoryMapping[key] === product.category) || product.category}
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// const CategoriesProducts = () => {
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categoryProducts, setCategoryProducts] = useState({});

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
        
//         // Get the enum value for the selected category
//         const categoryEnum = categoryMapping[selectedCategory];
        
//         const response = await fetch(`/api/paid-listing-products?category=${encodeURIComponent(categoryEnum)}`);
//         const data = await response.json();
        
//         console.log("API response:", data);
        
//         if (data && data.products && data.products.length > 0) {
//           setCategoryProducts(prev => ({
//             ...prev,
//             [selectedCategory]: data.products
//           }));
//           setProducts(data.products);
//         } else {
//           // Generate mock products for demonstration while API is being fixed
//           const mockProducts = Array.from({ length: 9 }, (_, i) => ({
//             id: `product-${i}`,
//             productName: `${selectedCategory} Solution ${i + 1}`,
//             logoUrl: "/api/placeholder/64/64",
//             category: categoryEnum,
//             slug: `${selectedCategory.toLowerCase().replace(/\s+/g, '-')}-solution-${i + 1}`,
//           }));
          
//           setCategoryProducts(prev => ({
//             ...prev,
//             [selectedCategory]: mockProducts
//           }));
//           setProducts(mockProducts);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         // Generate mock products for demonstration
//         const categoryEnum = categoryMapping[selectedCategory];
//         const mockProducts = Array.from({ length: 9 }, (_, i) => ({
//           id: `product-${i}`,
//           productName: `${selectedCategory} Solution ${i + 1}`,
//           logoUrl: "/api/placeholder/64/64",
//           category: categoryEnum,
//           slug: `${selectedCategory.toLowerCase().replace(/\s+/g, '-')}-solution-${i + 1}`,
//         }));
        
//         setCategoryProducts(prev => ({
//           ...prev,
//           [selectedCategory]: mockProducts
//         }));
//         setProducts(mockProducts);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Check if we already have products for this category
//     if (categoryProducts[selectedCategory]) {
//       setProducts(categoryProducts[selectedCategory]);
//       setLoading(false);
//     } else {
//       fetchProducts();
//     }
//   }, [selectedCategory, categoryProducts]);

//   return (
//     <div className="w-full relative overflow-hidden bg-white">
//       <div className="relative py-12">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
//             {/* Categories sidebar (on left) */}
//             <div className="lg:col-span-4">
//               <h2 className="text-2xl md:text-3xl font-bold text-[#1e2556] mb-4">
//                 Most Popular Software Categories
//               </h2>
//               <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => setSelectedCategory(category)}
//                     className={`text-left px-3 lg:px-4 py-2 lg:py-3 rounded transition-colors text-xs md:text-sm
//                               ${selectedCategory === category 
//                                 ? 'bg-[#1e2556] text-white font-medium' 
//                                 : 'text-[#2d2d2d] hover:bg-[#f5f7fa]'}`}
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Products grid (on right) */}
//             <div className="lg:col-span-8">
//               {loading ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {[...Array(9)].map((_, index) => (
//                     <div key={index} className="bg-[#f5f7fa] rounded-lg border border-gray-200 p-6 animate-pulse h-56">
//                       <div className="h-16 bg-gray-200 rounded mb-4 mx-auto w-16"></div>
//                       <div className="h-4 bg-gray-200 rounded mx-auto w-28 mb-3"></div>
//                       <div className="h-3 bg-gray-200 rounded mx-auto w-20 mb-3"></div>
//                       <div className="h-3 bg-gray-200 rounded mx-auto w-32 mt-auto"></div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {products.length > 0 ? (
//                     products.map((product) => (
//                       <ProductCard key={product.id} product={product} />
//                     ))
//                   ) : (
//                     <div className="col-span-full flex justify-center items-center py-16">
//                       <div className="text-center">
//                         <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4M8 16l-4-4 4-4" />
//                         </svg>
//                         <h3 className="text-lg font-medium text-[#334155] mb-1">No Products Found</h3>
//                         <p className="text-[#2d2d2d] text-sm">Try selecting a different category</p>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoriesProducts;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Display names for categories
const categories = [
  "Contract Lifecycle Management",
  "Legal AI", 
  "Document Management System",
  "Litigation Management and Analytics",
  "Intellectual Property Management",
  "Legal Research",
  "E-discovery"
];

// Mapping from display names to enum values
const categoryMapping = {
  "Contract Lifecycle Management": "CONTRACT_LIFECYCLE_MANAGEMENT",
  "Legal AI": "LEGAL_AI",
  "Document Management System": "DOCUMENT_MANAGEMENT_SYSTEM", 
  "Litigation Management and Analytics": "LITIGATION_MANAGEMENT_AND_ANALYTICS",
  "Intellectual Property Management": "IP_MANAGEMENT",
  "Legal Research": "LEGAL_RESEARCH",
  "E-discovery": "E_DISCOVERY"
};

const ProductCard = ({ product }) => {
  const handleClick = () => {
    window.location.href = `/product/${product.slug}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-[#f5f7fa] rounded-lg border border-gray-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all duration-300 h-full cursor-pointer relative group"
      onClick={handleClick}
    >
      {/* View icon that appears on hover */}
      <div className="absolute top-0 right-0 m-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#7cc6ee] text-white p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </div>
      
      <div className="p-6 flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center mb-4 h-16">
          {product.logoUrl ? (
            <img 
              src={product.logoUrl} 
              alt={`${product.productName} logo`} 
              className="max-h-full max-w-full object-contain" 
            />
          ) : (
            <div className="w-12 h-12 bg-[#1e2556]/10 rounded-full flex items-center justify-center">
              <span className="text-[#1e2556] font-semibold text-lg">
                {product.productName.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        {/* Name */}
        <h3 className="text-base font-semibold text-[#1e2556] mb-2 text-center">{product.productName}</h3>
        
        {/* Category */}
        <p className="text-xs text-[#2d2d2d] mt-auto text-center">
          <span className="font-medium">Category:</span> {Object.keys(categoryMapping).find(key => categoryMapping[key] === product.category) || product.category}
        </p>
      </div>
    </motion.div>
  );
};

const CategoriesProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get the enum value for the selected category
        const categoryEnum = categoryMapping[selectedCategory];
        
        const response = await fetch(`/api/paid-listing-products?category=${encodeURIComponent(categoryEnum)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        console.log("API response:", data);
        
        // Only set real data from API
        if (data && data.products && Array.isArray(data.products)) {
          setCategoryProducts(prev => ({
            ...prev,
            [selectedCategory]: data.products
          }));
          setProducts(data.products);
        } else {
          // No products found for this category
          setCategoryProducts(prev => ({
            ...prev,
            [selectedCategory]: []
          }));
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
        setCategoryProducts(prev => ({
          ...prev,
          [selectedCategory]: []
        }));
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    // Check if we already have products for this category
    if (categoryProducts[selectedCategory] !== undefined) {
      setProducts(categoryProducts[selectedCategory]);
      setLoading(false);
    } else {
      fetchProducts();
    }
  }, [selectedCategory, categoryProducts]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="bg-[#f5f7fa] rounded-lg border border-gray-200 p-6 animate-pulse h-56">
              <div className="h-16 bg-gray-200 rounded mb-4 mx-auto w-16"></div>
              <div className="h-4 bg-gray-200 rounded mx-auto w-28 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded mx-auto w-20 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded mx-auto w-32 mt-auto"></div>
            </div>
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="col-span-full flex justify-center items-center py-16">
          <div className="text-center">
            <svg className="w-12 h-12 text-red-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-[#334155] mb-1">Error Loading Products</h3>
            <p className="text-[#2d2d2d] text-sm mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-[#1e2556] text-white rounded hover:bg-[#1e2556]/90 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    if (products.length === 0) {
      return (
        <div className="col-span-full flex justify-center items-center py-16">
          <div className="text-center">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-lg font-medium text-[#334155] mb-1">No Products Available</h3>
            <p className="text-[#2d2d2d] text-sm">There are currently no products in the {selectedCategory} category.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full relative overflow-hidden bg-white">
      <div className="relative py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Categories sidebar (on left) */}
            <div className="lg:col-span-4">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e2556] mb-4">
                Most Popular Software Categories
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-left px-3 lg:px-4 py-2 lg:py-3 rounded transition-colors text-xs md:text-sm
                              ${selectedCategory === category 
                                ? 'bg-[#1e2556] text-white font-medium' 
                                : 'text-[#2d2d2d] hover:bg-[#f5f7fa]'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Products grid (on right) */}
            <div className="lg:col-span-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesProducts;