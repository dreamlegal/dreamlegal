// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Sparkles, ArrowRight } from 'lucide-react';
// import Link from 'next/link';

// const ProductCategories = () => {
//   const categories = [
//     {
//       title: "Most Popular",
//       products: [
//         { id: 1, slug: "legal-buddy-clm", name: "Legal Buddy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/rXgWqLtRscyHzXknkVB8NN.png", description: "This true SaaS application offers full organizational control, effortless tracking, and customizable.", premium: true },
//         { id: 2, slug: "mikelegal-ip-suite", name: "MikeLegal IP Suite", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/mXcqGYCMRC1EWtB3U2koPY.jpg", description: "The MikeIP Suite Ecosystem enables IP lawyers to automate end-to-end IP portfolio-related tasks, using AI technology giving your team greater bandwidth and more billable hours each day.", premium: true },
//         { id: 3, slug: "signeasy-clm", name: "SignEasy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/9tu6v3UyZnqbydshSsBH2R.png", description: "Signeasy is an AI-powered contract management platform designed to streamline the signing and management of contracts.", premium: true },
//         { id: 4, slug: "law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
//         { id: 5, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
//         { id: 6, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
//         { id: 7, slug: "doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
//         { id: 8, slug: "law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
//       ],
//       redirectUrl: "/directory/products"
//     },
//     {
//       title: "Curated for Enterprises",
//       products: [
//         { id: 1, slug: "legal-buddy-clm", name: "Legal Buddy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/rXgWqLtRscyHzXknkVB8NN.png", description: "This true SaaS application offers full organizational control, effortless tracking, and customizable.", premium: true },
//         { id: 2, slug: "mikelegal-ip-suite", name: "MikeLegal IP Suite", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/mXcqGYCMRC1EWtB3U2koPY.jpg", description: "The MikeIP Suite Ecosystem enables IP lawyers to automate end-to-end IP portfolio-related tasks, using AI technology giving your team greater bandwidth and more billable hours each day.", premium: true },
//         { id: 3, slug: "signeasy-clm", name: "SignEasy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/9tu6v3UyZnqbydshSsBH2R.png", description: "Signeasy is an AI-powered contract management platform designed to streamline the signing and management of contracts.", premium: true },
//         { id: 4, slug: "signeasy-clm", name: "SignEasy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/9tu6v3UyZnqbydshSsBH2R.png", description: "Signeasy is an AI-powered contract management platform designed to streamline the signing and management of contracts.", premium: true },
//         { id: 5, slug: "law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
//         { id: 6, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
//         { id: 7, slug: "doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
//         { id: 8, slug: "law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
//       ],
//       redirectUrl: "/directory/products"
//     },
//     {
//       title: "Curated for Law Firms",
//       products: [
//         { id: 1, slug: "legal-buddy-clm", name: "Legal Buddy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/rXgWqLtRscyHzXknkVB8NN.png", description: "This true SaaS application offers full organizational control, effortless tracking, and customizable.", premium: true },
//         { id: 2, slug: "mikelegal-ip-suite", name: "MikeLegal IP Suite", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/mXcqGYCMRC1EWtB3U2koPY.jpg", description: "The MikeIP Suite Ecosystem enables IP lawyers to automate end-to-end IP portfolio-related tasks, using AI technology giving your team greater bandwidth and more billable hours each day.", premium: true },
//         { id: 3, slug: "signeasy-clm", name: "SignEasy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/9tu6v3UyZnqbydshSsBH2R.png", description: "Signeasy is an AI-powered contract management platform designed to streamline the signing and management of contracts.", premium: true },
//         { id: 4, slug: "law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
//         { id: 5, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
//         { id: 6, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
//         { id: 7, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
//         { id: 8, slug: "doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
//       ],
//       redirectUrl: "/directory/products"
//     },
//     {
//       title: "View All",
//       products: [
//         { id: 10, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
//         { id: 11, slug: "doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
//         { id: 12, slug: "law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
//         { id: 13, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
//         { id: 14, slug: "doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
//         { id: 15, slug: "law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
//         { id: 16, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
//         { id: 17, slug: "doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
//       ],
//       redirectUrl: "/directory/products"
//     }
//   ];

//   const [hoveredProduct, setHoveredProduct] = useState(null);

//   const handleProductClick = (slug) => {
//     window.location.href = `/product/${slug}`;
//   };

//   const handleCategoryRedirect = (url) => {
//     window.location.href = url;
//   };

//   // New Grid Layout Component
//   const GridCircles = ({ category, categoryIndex, handleProductClick }) => {
//     const [hoveredProduct, setHoveredProduct] = useState(null);
//     const [isMobile, setIsMobile] = useState(false);

//     useEffect(() => {
//       const checkMobile = () => {
//         setIsMobile(window.innerWidth < 768);
//       };
      
//       checkMobile();
//       window.addEventListener('resize', checkMobile);
//       return () => window.removeEventListener('resize', checkMobile);
//     }, []);

//     // Get actual number of items to display (limited to 8 in grid)
//     const displayProducts = category.products.slice(0, 8);
    
//     // Calculate how many items per row based on number of products
//     const getGridColumns = () => {
//       if (displayProducts.length <= 4) return displayProducts.length;
//       return 4; // Max 4 columns
//     };
    
//     // Calculate rows based on product count
//     const getRows = () => {
//       return Math.ceil(displayProducts.length / getGridColumns());
//     };

//     return (
//       <div className="w-full py-4">
//         <div 
//           className={`grid gap-4 md:gap-6`} 
//           style={{ 
//             gridTemplateColumns: isMobile 
//               ? `repeat(${Math.min(2, getGridColumns())}, 1fr)` 
//               : `repeat(${getGridColumns()}, 1fr)`,
//             gridTemplateRows: `repeat(${getRows()}, 1fr)`
//           }}
//         >
//           {displayProducts.map((product, index) => (
//             <motion.div
//               key={`grid-product-${index}`}
//               className="flex flex-col items-center justify-center"
//               whileHover={{ scale: 1.05, zIndex: 50 }}
//               onHoverStart={() => setHoveredProduct(index)}
//               onHoverEnd={() => setHoveredProduct(null)}
//               onClick={() => handleProductClick(product.slug)}
//             >
//               <div className="relative w-20 h-20 md:w-24 md:h-24 cursor-pointer group">
//                 <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/5 to-indigo-500/5 blur-md group-hover:blur-lg transition-all duration-300" />
//                 <div className="absolute -inset-px rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 group-hover:from-blue-400/30 group-hover:to-indigo-400/30 transition-all duration-300" />
//                 <div className="absolute inset-0 rounded-full bg-white shadow-md" />
//                 <div className="absolute inset-0 rounded-full p-2 overflow-hidden">
//                   <img 
//                     src={product.logo} 
//                     alt={product.name}
//                     className="w-full h-full object-contain rounded-full"
//                   />
//                 </div>
//               </div>
              
//               <p className="mt-2 text-xs md:text-sm text-center font-medium text-gray-700 truncate w-full">
//                 {product.name}
//               </p>

//               <AnimatePresence>
//                 {hoveredProduct === index && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: 10 }}
//                     className="absolute z-50 mt-2 w-48 bg-white rounded-xl border border-gray-200 shadow-xl p-3"
//                     style={{ top: '100%' }}
//                   >
//                     <div className="relative">
//                       <h3 className="text-sm font-semibold mb-1 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                         {product.name}
//                       </h3>
//                       <p className="text-xs text-gray-600 mb-2 line-clamp-3">{product.description}</p>
//                       {product.premium && (
//                         <span className="flex items-center gap-1 text-xs font-medium text-yellow-600">
//                           <Sparkles className="w-3 h-3" />
//                           Premium
//                         </span>
//                       )}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     );
//   };


//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50/20 via-transparent to-blue-50/20 relative overflow-hidden">
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F610_1px,transparent_1px),linear-gradient(to_bottom,#3B82F610_1px,transparent_1px)] bg-[size:14px_14px]" />
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F608_2px,transparent_2px),linear-gradient(to_bottom,#3B82F608_2px,transparent_2px)] bg-[size:28px_28px]" />
//         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/40 via-white/20 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/40 via-white/20 to-transparent" />
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.5)_100%)]" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-24">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
//           {categories.map((category, categoryIndex) => (
//             <div key={categoryIndex} className="relative backdrop-blur-md rounded-2xl border border-white/20 shadow-xl transition-all p-8 duration-300">
//               <div className="absolute inset-0">
//                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F610_1px,transparent_1px),linear-gradient(to_bottom,#3B82F610_1px,transparent_1px)] bg-[size:14px_14px]" />
//                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F608_2px,transparent_2px),linear-gradient(to_bottom,#3B82F608_2px,transparent_2px)] bg-[size:28px_28px]" />
//                 <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/40 via-white/20 to-transparent" />
//                 <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/40 via-white/20 to-transparent" />
//                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.5)_100%)]" />
//               </div>
              
//               <div className="flex items-center gap-4 mb-6 group">
//                 <h2 className="
//                   group
//                   relative
//                   text-2xl md:text-3xl 
//                   font-extrabold 
//                   tracking-tight 
//                   text-blue-900
//                   transition-all duration-500 ease-out
//                   pb-2
//                 ">
//                   {category.title}
//                   <span className="
//                     absolute 
//                     bottom-0 
//                     left-0 
//                     w-full 
//                     h-0.5
//                     bg-blue-200
//                     z-10
//                   "/>
//                   <span className="
//                     absolute 
//                     bottom-0 
//                     left-0 
//                     w-0 
//                     h-0.5
//                     bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300
//                     transition-all duration-700 ease-out
//                     group-hover:w-full
//                     opacity-100
//                     z-20
//                   "/>
//                 </h2>
                
//                 {categoryIndex === 0 && (
//                   <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-indigo-500/90 via-blue-500/90 to-blue-600/90 rounded-full shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:from-indigo-600/90 hover:to-blue-700/90">
//                     <Sparkles className="w-3.5 h-3.5 text-white/90" />
//                     <span className="text-xs font-medium text-white/90 uppercase tracking-wide">Featured</span>
//                   </div>
//                 )}
//               </div>
//               <GridCircles 
//                   category={category}
//                   categoryIndex={categoryIndex}
//                   handleProductClick={handleProductClick}
//                 />
              
//               {/* New Redirect Button */}
//               <div className="flex justify-center mt-6 relative z-30">
//   <Link href={category.redirectUrl}>
//     <button 
//       className="group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-600 hover:to-indigo-700"
//     >
//       Explore All
//       <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
//     </button>
//   </Link>
// </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style jsx global>{`
//         @keyframes float {
//           0%, 100% { transform: translate(0, 0) rotate(0deg); }
//           50% { transform: translate(10px, -10px) rotate(5deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductCategories;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ProductCategories = () => {
  const categories = [
    {
      title: "Most Popular",
      products: [
        { id: 1, slug: "legal-buddy-clm", name: "Legal Buddy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/rXgWqLtRscyHzXknkVB8NN.png", description: "This true SaaS application offers full organizational control, effortless tracking, and customizable.", premium: true },
        { id: 2, slug: "mikelegal-ip-suite", name: "MikeLegal IP Suite", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/mXcqGYCMRC1EWtB3U2koPY.jpg", description: "The MikeIP Suite Ecosystem enables IP lawyers to automate end-to-end IP portfolio-related tasks, using AI technology giving your team greater bandwidth and more billable hours each day.", premium: true },
        { id: 3, slug: "signeasy-clm", name: "SignEasy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/9tu6v3UyZnqbydshSsBH2R.png", description: "Signeasy is an AI-powered contract management platform designed to streamline the signing and management of contracts.", premium: true },
        { id: 4, slug: "law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
        { id: 5, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
        { id: 6, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
        { id: 7, slug: "doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
        { id: 8, slug: "law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
      ],
      redirectUrl: "/directory/products"
    },
    {
      title: "Curated for Enterprises",
      products: [
        { id: 1, slug: "legal-buddy-clm", name: "Legal Buddy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/rXgWqLtRscyHzXknkVB8NN.png", description: "This true SaaS application offers full organizational control, effortless tracking, and customizable.", premium: true },
        { id: 2, slug: "mikelegal-ip-suite", name: "MikeLegal IP Suite", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/mXcqGYCMRC1EWtB3U2koPY.jpg", description: "The MikeIP Suite Ecosystem enables IP lawyers to automate end-to-end IP portfolio-related tasks, using AI technology giving your team greater bandwidth and more billable hours each day.", premium: true },
        { id: 3, slug: "signeasy-clm", name: "SignEasy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/9tu6v3UyZnqbydshSsBH2R.png", description: "Signeasy is an AI-powered contract management platform designed to streamline the signing and management of contracts.", premium: true },
        { id: 4, slug: "signeasy-clm", name: "SignEasy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/9tu6v3UyZnqbydshSsBH2R.png", description: "Signeasy is an AI-powered contract management platform designed to streamline the signing and management of contracts.", premium: true },
        { id: 5, slug: "law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
        { id: 6, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
        { id: 7, slug: "doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
        { id: 8, slug: "law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
      ],
      redirectUrl: "/directory/products"
    },
    {
      title: "Curated for Law Firms",
      products: [
        { id: 1, slug: "legal-buddy-clm", name: "Legal Buddy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/rXgWqLtRscyHzXknkVB8NN.png", description: "This true SaaS application offers full organizational control, effortless tracking, and customizable.", premium: true },
        { id: 2, slug: "mikelegal-ip-suite", name: "MikeLegal IP Suite", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/mXcqGYCMRC1EWtB3U2koPY.jpg", description: "The MikeIP Suite Ecosystem enables IP lawyers to automate end-to-end IP portfolio-related tasks, using AI technology giving your team greater bandwidth and more billable hours each day.", premium: true },
        { id: 3, slug: "signeasy-clm", name: "SignEasy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/9tu6v3UyZnqbydshSsBH2R.png", description: "Signeasy is an AI-powered contract management platform designed to streamline the signing and management of contracts.", premium: true },
        { id: 4, slug: "law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
        { id: 5, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
        { id: 6, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
        { id: 7, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
        { id: 8, slug: "doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
      ],
      redirectUrl: "/directory/products"
    },
    {
      title: "View All",
      products: [
        { id: 10, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
        { id: 11, slug: "doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
        { id: 12, slug: "law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
        { id: 13, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
        { id: 14, slug: "doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
        { id: 15, slug: "law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
        { id: 16, slug: "clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
        { id: 17, slug: "doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
      ],
      redirectUrl: "/directory/products"
    }
  ];

  const handleProductClick = (slug) => {
    window.location.href = `/product/${slug}`;
  };

  // New Grid Layout Component
  const GridCircles = ({ category, categoryIndex, handleProductClick }) => {
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Get actual number of items to display (limited to 8 in grid)
    const displayProducts = category.products.slice(0, 8);
    
    // Calculate how many items per row based on number of products
    const getGridColumns = () => {
      if (displayProducts.length <= 4) return displayProducts.length;
      return 4; // Max 4 columns
    };
    
    // Calculate rows based on product count
    const getRows = () => {
      return Math.ceil(displayProducts.length / getGridColumns());
    };

    return (
      <div className="w-full py-4">
        <div 
          className={`grid gap-4 md:gap-6`} 
          style={{ 
            gridTemplateColumns: isMobile 
              ? `repeat(${Math.min(2, getGridColumns())}, 1fr)` 
              : `repeat(${getGridColumns()}, 1fr)`,
            gridTemplateRows: `repeat(${getRows()}, 1fr)`
          }}
        >
          {displayProducts.map((product, index) => (
            <motion.div
              key={`grid-product-${index}`}
              className="flex flex-col items-center justify-center"
              whileHover={{ scale: 1.05, zIndex: 50 }}
              onHoverStart={() => setHoveredProduct(index)}
              onHoverEnd={() => setHoveredProduct(null)}
              onClick={() => handleProductClick(product.slug)}
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 cursor-pointer group">
                <div className="absolute -inset-1 rounded-full bg-[#1e2556]/5 blur-md group-hover:blur-lg transition-all duration-300" />
                <div className="absolute -inset-px rounded-full bg-[#1e2556]/10 group-hover:bg-[#1e2556]/20 transition-all duration-300" />
                <div className="absolute inset-0 rounded-full bg-white shadow-md" />
                <div className="absolute inset-0 rounded-full p-2 overflow-hidden">
                  <img 
                    src={product.logo} 
                    alt={product.name}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              </div>
              
              <p className="mt-2 text-xs md:text-sm text-center font-medium text-[#2d2d2d] truncate w-full">
                {product.name}
              </p>

              <AnimatePresence>
                {hoveredProduct === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute z-50 mt-2 w-48 bg-[#f5f7fa] rounded-xl border border-gray-200 shadow-xl p-3"
                    style={{ top: '100%' }}
                  >
                    <div className="relative">
                      <h3 className="text-sm font-semibold mb-1 text-[#1e2556]">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#2d2d2d] mb-2 line-clamp-3">{product.description}</p>
                      {product.premium && (
                        <span className="flex items-center gap-1 text-xs font-medium text-[#7cc6ee]">
                          <Sparkles className="w-3 h-3" />
                          Premium
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {categories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="relative bg-[#f5f7fa] rounded-2xl border border-gray-200 shadow-md transition-all p-8 duration-300 hover:shadow-lg">              
              <div className="flex items-center gap-4 mb-6 group">
                <h2 className="
                  group
                  relative
                  text-2xl md:text-3xl 
                  font-bold 
                  tracking-tight 
                  text-[#1e2556]
                  transition-all duration-500 ease-out
                  pb-2
                ">
                  {category.title}
                  <span className="
                    absolute 
                    bottom-0 
                    left-0 
                    w-full 
                    h-0.5
                    bg-[#1e2556]/10
                    z-10
                  "/>
                  <span className="
                    absolute 
                    bottom-0 
                    left-0 
                    w-0 
                    h-0.5
                    bg-[#7cc6ee]
                    transition-all duration-700 ease-out
                    group-hover:w-full
                    opacity-100
                    z-20
                  "/>
                </h2>
                
                {categoryIndex === 0 && (
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-[#1e2556] rounded-full shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:bg-[#1e2556]/90">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                    <span className="text-xs font-medium text-white uppercase tracking-wide">Featured</span>
                  </div>
                )}
              </div>
              <GridCircles 
                category={category}
                categoryIndex={categoryIndex}
                handleProductClick={handleProductClick}
              />
              
              {/* Redirect Button */}
              <div className="flex justify-center mt-6 relative z-30">
                <Link href={category.redirectUrl}>
                  <button 
                    className="group flex items-center gap-2 px-6 py-2.5 bg-[#7cc6ee] text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:bg-[#7cc6ee]/90"
                  >
                    Explore All
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;