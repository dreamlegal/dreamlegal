
// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';

// // const categories = [
// //   "Client Relationship Management",
// //   "Contract Lifecycle Management",
// //   "E-Signature",
// //   "Document Management System",
// //   "E-billing and Invoicing",
// //   "E-discovery",
// //   "Governance, Risk and Compliance",
// //   "Intellectual Property Management",
// //   "Legal Research",
// //   "Legal Workflow Automation",
// //   "Litigation Management and Analytics"
// // ];

// // const ProductCard = ({ product }) => {
// //   // Format user categories for display
// //   const formatUserCategories = () => {
// //     if (!product.userCategory || product.userCategory.length === 0) return null;
    
// //     const formattedCategories = product.userCategory.map(cat => {
// //       const parts = cat.split('|');
// //       return parts[0]; // Return just the category name
// //     });
    
// //     if (formattedCategories.length <= 2) {
// //       return formattedCategories.join(', ');
// //     } else {
// //       return `${formattedCategories[0]}, ${formattedCategories[1]}... +${formattedCategories.length - 2} more`;
// //     }
// //   };

// //   return (
// //     <motion.div 
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       transition={{ duration: 0.3 }}
// //       className="bg-white rounded-lg transform transition-all duration-300 
// //                  hover:-translate-y-1 hover:shadow-xl group
// //                  border border-gray-200 overflow-hidden flex flex-col
// //                  aspect-square"
// //       style={{
// //         perspective: '1000px',
// //         transformStyle: 'preserve-3d'
// //       }}
// //     >
// //       {/* 3D effect border overlay */}
// //       <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-0 
// //                     group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      
// //       {/* Card content with 3D transform */}
// //       <div className="p-6 flex flex-col justify-between h-full relative z-10 
// //                     transition-transform duration-300 group-hover:translate-z-10">
// //         {/* Logo */}
// //         <div className="flex items-center justify-center mb-4 h-20 mt-4">
// //           {product.logoUrl ? (
// //             <img 
// //               src={product.logoUrl} 
// //               alt={`${product.name} logo`} 
// //               className="max-h-full max-w-full object-contain transition-transform duration-300 
// //                          group-hover:scale-110" 
// //             />
// //           ) : (
// //             <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center
// //                           transition-transform duration-300 group-hover:scale-110">
// //               <span className="text-blue-600 font-semibold text-2xl">
// //                 {product.name.charAt(0)}
// //               </span>
// //             </div>
// //           )}
// //         </div>
        
// //         {/* Product Name */}
// //         <h3 className="text-lg font-semibold text-gray-900 text-center">{product.name}</h3>
        
// //         {/* User Categories */}
// //         {formatUserCategories() && (
// //           <p className="text-sm text-gray-600 text-center mt-2">
// //             <span className="font-medium">For:</span> {formatUserCategories()}
// //           </p>
// //         )}
// //       </div>
      
// //       {/* 3D hover effect shadow */}
// //       <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 
// //                     shadow-[0_10px_20px_rgba(59,130,246,0.1),0_15px_30px_rgba(59,130,246,0.2)]
// //                     transition-opacity duration-300" />
// //     </motion.div>
// //   );
// // };

// // const CategoriesProducts = () => {
// //   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [categoryProducts, setCategoryProducts] = useState({});

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         setLoading(true);
        
// //         // For testing - log the category we're fetching
// //         console.log(`Fetching products for category: ${selectedCategory}`);
        
// //         const response = await fetch(`/api/paid-listing-products?category=${encodeURIComponent(selectedCategory)}`);
// //         const data = await response.json();
        
// //         console.log("API response:", data); // For debugging
        
// //         if (data && data.products && data.products.length > 0) {
// //           setCategoryProducts(prev => ({
// //             ...prev,
// //             [selectedCategory]: data.products
// //           }));
// //           setProducts(data.products);
// //         } else {
// //           // For testing purposes only - generate mock data if no products returned
// //           // Remove this in production
// //           const mockProducts = Array.from({ length: 9 }, (_, i) => ({
// //             id: `product-${i}`,
// //             name: `${selectedCategory} Solution ${i + 1}`,
// //             logoUrl: "/api/placeholder/64/64",
// //             userCategory: [
// //               `Enterprises|100|true`,
// //               `Startups|0|false`,
// //               i % 2 === 0 ? `Law Firms|50|true` : null
// //             ].filter(Boolean),
// //           }));
          
// //           setCategoryProducts(prev => ({
// //             ...prev,
// //             [selectedCategory]: mockProducts
// //           }));
// //           setProducts(mockProducts);
          
// //           console.log("Using mock products due to empty API response");
// //         }
// //       } catch (error) {
// //         console.error("Error fetching products:", error);
        
// //         // For testing purposes only - generate mock data on error
// //         // Remove this in production
// //         const mockProducts = Array.from({ length: 9 }, (_, i) => ({
// //           id: `product-${i}`,
// //           name: `${selectedCategory} Solution ${i + 1}`,
// //           logoUrl: "/api/placeholder/64/64",
// //           userCategory: [
// //             `Enterprises|100|true`,
// //             `Startups|0|false`,
// //             i % 2 === 0 ? `Law Firms|50|true` : null
// //           ].filter(Boolean),
// //         }));
        
// //         setCategoryProducts(prev => ({
// //           ...prev,
// //           [selectedCategory]: mockProducts
// //         }));
// //         setProducts(mockProducts);
        
// //         console.log("Using mock products due to API error");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     // Check if we already have products for this category
// //     if (categoryProducts[selectedCategory]) {
// //       console.log(`Using cached products for ${selectedCategory}`);
// //       setProducts(categoryProducts[selectedCategory]);
// //       setLoading(false);
// //     } else {
// //       fetchProducts();
// //     }
// //   }, [selectedCategory]);

// //   return (
// //     <div className="w-full bg-gradient-to-br from-blue-50 to-white py-16 relative overflow-hidden">
// //       {/* Background Elements */}
// //       <div className="absolute inset-0">
// //         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
// //         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
// //         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
// //         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
// //         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
// //       </div>

// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
// //         {/* Header */}
// //         <div className="mb-12 text-center">
// //           <span className="block text-sm font-semibold text-blue-600 mb-2 tracking-wider">
// //             LEGAL TECH SOLUTIONS
// //           </span>
// //           <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
// //             Legal Software Categories
// //             <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
// //           </h2>
// //           <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
// //             Discover the best legal tech solutions across various categories to elevate your practice
// //           </p>
// //         </div>

// //         {/* Main content grid */}
// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// //           {/* Categories sidebar */}
// //           <div className="lg:col-span-1">
// //             <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden sticky top-24">
// //               <div className="p-4 bg-gradient-to-r from-blue-50 to-transparent border-b border-gray-100">
// //                 <h3 className="font-semibold text-gray-900">Categories</h3>
// //               </div>
// //               <div className="p-2">
// //                 {categories.map((category) => (
// //                   <button
// //                     key={category}
// //                     onClick={() => setSelectedCategory(category)}
// //                     className={`w-full text-left px-4 py-3 rounded-lg transition-all text-sm hover:bg-blue-50
// //                               ${selectedCategory === category 
// //                                 ? 'bg-blue-100 text-blue-700 font-medium' 
// //                                 : 'text-gray-700'}`}
// //                   >
// //                     {category}
// //                     {selectedCategory === category && (
// //                       <span className="float-right">
// //                         <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //                         </svg>
// //                       </span>
// //                     )}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>

// //           {/* Products grid */}
// //           <div className="lg:col-span-3">
// //             {loading ? (
// //               <div className="flex justify-center">
// //                 <div className="animate-pulse grid grid-cols-2 sm:grid-cols-3 gap-6 w-full">
// //                   {[1, 2, 3, 4, 5, 6].map((item) => (
// //                     <div key={item} className="bg-white rounded-lg border border-gray-200 aspect-square p-6">
// //                       <div className="flex flex-col h-full">
// //                         <div className="flex justify-center mb-4">
// //                           <div className="w-16 h-16 bg-blue-100 rounded-lg"></div>
// //                         </div>
// //                         <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
// //                         <div className="mt-auto">
// //                           <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto mt-2"></div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             ) : (
// //               <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
// //                 {products.length > 0 ? (
// //                   products.map((product) => (
// //                     <ProductCard key={product.id} product={product} />
// //                   ))
// //                 ) : (
// //                   <div className="col-span-3 flex justify-center items-center py-16">
// //                     <div className="text-center">
// //                       <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4M8 16l-4-4 4-4" />
// //                       </svg>
// //                       <h3 className="text-lg font-medium text-gray-600 mb-1">No Products Found</h3>
// //                       <p className="text-gray-500 text-sm">Try selecting a different category</p>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CategoriesProducts;
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

//   // Star rating display
//   const Rating = ({ rating = 4.5, maxRating = 5 }) => {
//     return (
//       <div className="flex items-center">
//         <div className="flex">
//           {[...Array(maxRating)].map((_, i) => {
//             const filled = i < Math.floor(rating);
//             const halfFilled = i === Math.floor(rating) && rating % 1 > 0;
            
//             return (
//               <svg 
//                 key={i}
//                 className={`w-4 h-4 ${
//                   filled || halfFilled ? "text-yellow-400" : "text-gray-300"
//                 }`}
//                 fill="currentColor" 
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//               </svg>
//             );
//           })}
//         </div>
//         <span className="text-xs text-gray-600 ml-1">(125)</span>
//       </div>
//     );
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300"
//     >
//       <div className="p-4 flex flex-col h-full">
//         {/* Logo */}
//         <div className="flex items-center justify-center mb-3 h-14">
//           {product.logoUrl ? (
//             <img 
//               src={product.logoUrl} 
//               alt={`${product.name} logo`} 
//               className="max-h-full max-w-full object-contain" 
//             />
//           ) : (
//             <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
//               <span className="text-blue-600 font-semibold text-lg">
//                 {product.name.charAt(0)}
//               </span>
//             </div>
//           )}
//         </div>
        
//         {/* Name */}
//         <h3 className="text-sm font-semibold text-gray-900 mb-1 text-center">{product.name}</h3>
        
//         {/* Rating */}
//         <div className="flex justify-center mb-1">
//           <Rating />
//         </div>
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
//   }, [selectedCategory]);

//   return (
//     <div className="w-full bg-white py-12">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">
//             Most Popular Software Categories
//           </h2>
//           <div className="flex justify-between items-center">
//             <div>
//               {/* Placeholder for potential subheading */}
//             </div>
//             <a href="#" className="text-sm text-red-500 hover:text-red-600 font-medium">
//               See all {selectedCategory} Software
//             </a>
//           </div>
//         </div>

//         {/* Main layout - Categories on left, Products on right */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Categories list (vertical on left) */}
//           <div className="lg:col-span-1">
//             <div className="flex flex-col space-y-1">
//               {categories.map((category) => (
//                 <button
//                   key={category}
//                   onClick={() => setSelectedCategory(category)}
//                   className={`text-left px-4 py-3 rounded transition-colors text-sm
//                             ${selectedCategory === category 
//                               ? 'bg-red-50 text-red-500 border border-red-200 font-medium' 
//                               : 'text-gray-700 border border-gray-200 hover:bg-gray-50'}`}
//                 >
//                   {category}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Products grid (on right) */}
//           <div className="lg:col-span-3">
//             {loading ? (
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                 {[...Array(9)].map((_, index) => (
//                   <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
//                     <div className="h-14 bg-gray-200 rounded mb-3 mx-auto w-14"></div>
//                     <div className="h-4 bg-gray-200 rounded mx-auto w-24 mb-2"></div>
//                     <div className="h-3 bg-gray-200 rounded mx-auto w-16"></div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                 {products.length > 0 ? (
//                   products.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                   ))
//                 ) : (
//                   <div className="col-span-full flex justify-center items-center py-12">
//                     <div className="text-center">
//                       <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4M8 16l-4-4 4-4" />
//                       </svg>
//                       <h3 className="text-lg font-medium text-gray-600 mb-1">No Products Found</h3>
//                       <p className="text-gray-500 text-sm">Try selecting a different category</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoriesProducts;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const categories = [
  "Client Relationship Management",
  "Contract Lifecycle Management",
  "E-Signature",
  "Document Management System",
  "E-billing and Invoicing",
  "E-discovery",
  "Governance, Risk and Compliance",
  "Intellectual Property Management",
  "Legal Research",
  "Legal Workflow Automation",
  "Litigation Management and Analytics"
];

const ProductCard = ({ product }) => {
  // Format user categories for display
  const formatUserCategories = () => {
    if (!product.userCategory || product.userCategory.length === 0) return null;
    
    const formattedCategories = product.userCategory.map(cat => {
      const parts = cat.split('|');
      return parts[0]; // Return just the category name
    });
    
    if (formattedCategories.length <= 2) {
      return formattedCategories.join(', ');
    } else {
      return `${formattedCategories[0]}, ${formattedCategories[1]}... +${formattedCategories.length - 2} more`;
    }
  };


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300 h-full"
    >
      <div className="p-6 flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center justify-center mb-4 h-16">
          {product.logoUrl ? (
            <img 
              src={product.logoUrl} 
              alt={`${product.name} logo`} 
              className="max-h-full max-w-full object-contain" 
            />
          ) : (
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-lg">
                {product.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        {/* Name */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 text-center">{product.name}</h3>
        
        {/* Rating */}
        {/* <div className="flex justify-center mb-3">
          <Rating />
        </div> */}
        
        {/* User Categories */}
        {formatUserCategories() && (
          <p className="text-xs text-gray-600 mt-auto text-center">
            <span className="font-medium">For:</span> {formatUserCategories()}
          </p>
        )}
      </div>
    </motion.div>
  );
};

const CategoriesProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryProducts, setCategoryProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/api/paid-listing-products?category=${encodeURIComponent(selectedCategory)}`);
        const data = await response.json();
        
        console.log("API response:", data);
        
        if (data && data.products && data.products.length > 0) {
          setCategoryProducts(prev => ({
            ...prev,
            [selectedCategory]: data.products
          }));
          setProducts(data.products);
        } else {
          // Generate mock products for demonstration while API is being fixed
          const mockProducts = Array.from({ length: 9 }, (_, i) => ({
            id: `product-${i}`,
            name: `${selectedCategory} Solution ${i + 1}`,
            logoUrl: "/api/placeholder/64/64",
            userCategory: [
              `Enterprises|100|true`,
              `Startups|0|false`,
              i % 2 === 0 ? `Law Firms|50|true` : null
            ].filter(Boolean),
          }));
          
          setCategoryProducts(prev => ({
            ...prev,
            [selectedCategory]: mockProducts
          }));
          setProducts(mockProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        // Generate mock products for demonstration
        const mockProducts = Array.from({ length: 9 }, (_, i) => ({
          id: `product-${i}`,
          name: `${selectedCategory} Solution ${i + 1}`,
          logoUrl: "/api/placeholder/64/64",
          userCategory: [
            `Enterprises|100|true`,
            `Startups|0|false`,
            i % 2 === 0 ? `Law Firms|50|true` : null
          ].filter(Boolean),
        }));
        
        setCategoryProducts(prev => ({
          ...prev,
          [selectedCategory]: mockProducts
        }));
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    // Check if we already have products for this category
    if (categoryProducts[selectedCategory]) {
      setProducts(categoryProducts[selectedCategory]);
      setLoading(false);
    } else {
      fetchProducts();
    }
  }, [selectedCategory]);

  return (
    // <div className="w-full bg-white py-12">
      
    //   <div className="max-w-7xl mx-auto px-4">

    //     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
    //       {/* Categories list (vertical on left) */}
    //       <div className="lg:col-span-4">
    //         <h2 className="text-3xl font-bold text-black mb-4">
    //             Most Popular Software Categories
    //         </h2>
    //         <div className="flex flex-col space-y-2">
    //           {categories.map((category) => (
    //             <button
    //               key={category}
    //               onClick={() => setSelectedCategory(category)}
    //               className={`text-left px-4 py-3 rounded transition-colors text-sm
    //                         ${selectedCategory === category 
    //                           ? 'bg-blue-50 text-blue-500 border border-blue-200 font-medium' 
    //                           : 'text-gray-700 hover:bg-gray-50'}`}
    //             >
    //               {category}
    //             </button>
    //           ))}
    //         </div>
    //       </div>

    //       {/* Products grid (on right) */}
    //       <div className="lg:col-span-8">
    //         {loading ? (
    //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //             {[...Array(9)].map((_, index) => (
    //               <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse h-56">
    //                 <div className="h-16 bg-gray-200 rounded mb-4 mx-auto w-16"></div>
    //                 <div className="h-4 bg-gray-200 rounded mx-auto w-28 mb-3"></div>
    //                 <div className="h-3 bg-gray-200 rounded mx-auto w-20 mb-3"></div>
    //                 <div className="h-3 bg-gray-200 rounded mx-auto w-32 mt-auto"></div>
    //               </div>
    //             ))}
    //           </div>
    //         ) : (
    //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    //             {products.length > 0 ? (
    //               products.map((product) => (
    //                 <ProductCard key={product.id} product={product} />
    //               ))
    //             ) : (
    //               <div className="col-span-full flex justify-center items-center py-16">
    //                 <div className="text-center">
    //                   <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4M8 16l-4-4 4-4" />
    //                   </svg>
    //                   <h3 className="text-lg font-medium text-gray-600 mb-1">No Products Found</h3>
    //                   <p className="text-gray-500 text-sm">Try selecting a different category</p>
    //                 </div>
    //               </div>
    //             )}
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="w-full relative overflow-hidden">
  {/* Grid Background Pattern */}
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F610_1px,transparent_1px),linear-gradient(to_bottom,#3B82F610_1px,transparent_1px)] bg-[size:14px_14px]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F608_2px,transparent_2px),linear-gradient(to_bottom,#3B82F608_2px,transparent_2px)] bg-[size:28px_28px]" />
    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/40 via-white/20 to-transparent" />
    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/40 via-white/20 to-transparent" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.5)_100%)]" />
  </div>
      
  <div className="relative py-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Categories list (vertical on left) */}
        <div className="lg:col-span-4">
          <h2 className="text-3xl font-bold text-black mb-4">
            Most Popular Software Categories
          </h2>
          <div className="flex flex-col space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`text-left px-4 py-3 rounded transition-colors text-sm
                          ${selectedCategory === category 
                            ? 'bg-blue-50 text-blue-500 border border-blue-200 font-medium' 
                            : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products grid (on right) */}
        <div className="lg:col-span-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse h-56">
                  <div className="h-16 bg-gray-200 rounded mb-4 mx-auto w-16"></div>
                  <div className="h-4 bg-gray-200 rounded mx-auto w-28 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded mx-auto w-20 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded mx-auto w-32 mt-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center py-16">
                  <div className="text-center">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4M8 16l-4-4 4-4" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-600 mb-1">No Products Found</h3>
                    <p className="text-gray-500 text-sm">Try selecting a different category</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default CategoriesProducts;