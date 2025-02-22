
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const ProductCategories = () => {
  const categories = [
    {
      title: "Most Popular",
      products: [
        { id: 1,slug:"legal-buddy-clm", name: "Legal Buddy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/rXgWqLtRscyHzXknkVB8NN.png", description: "This true SaaS application offers full organizational control, effortless tracking, and customizable.", premium: true },
        { id: 2,slug:"mikelegal-ip-suite", name: "MikeLegal IP Suite", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/mXcqGYCMRC1EWtB3U2koPY.jpg", description: "The MikeIP Suite Ecosystem enables IP lawyers to automate end-to-end IP portfolio-related tasks, using AI technology giving your team greater bandwidth and more billable hours each day.", premium: true },
        { id: 3,slug:"signeasy-clm", name: "SignEasy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/9tu6v3UyZnqbydshSsBH2R.png", description: "Signeasy is an AI-powered contract management platform designed to streamline the signing and management of contracts.", premium: true }
      ]
    },
    {
      title: "Best tools for Enterprises",
      products: [
        { id: 4,slug:"signeasy-clm", name: "SignEasy CLM", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/9tu6v3UyZnqbydshSsBH2R.png", description: "Signeasy is an AI-powered contract management platform designed to streamline the signing and management of contracts.", premium: true },
        { id: 5,slug:"law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },


        { id: 6,slug:"clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false }
      ]
    },
    {
      title: "Best Tools for Law Firms",
      products: [
        { id: 7,slug:"clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
        { id: 8,slug:"doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
        { id:9,slug:"law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
      ]
    },
    {
      title: "View All - Directory",
      products:[
        { id: 10,slug:"clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
        { id: 11,slug:"doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
        { id:12,slug:"law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
        { id: 13,slug:"clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
        { id: 14,slug:"doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
        { id:15,slug:"law-ruler", name: "Law Ruler", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/8ZKJEi5EtonyRHarZwswu7.png", description: "Law Ruler is a comprehensive legal software solution designed to enhance law firm operations through advanced client intake, legal CRM, and marketing automation tools. ", premium: true },
        { id: 16,slug:"clio", name: "Clio", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/r79HHANhFatLMsG33N4Lai.png", description: "Clio Grow is a cloud-based client intake and legal CRM software designed to help law firms efficiently manage client acquisition and relationships. ", premium: false },
        { id: 17,slug:"doqfy", name: "DOQFY", logo: "https://dreamlegal-backend.s3-ap-south-1.amazonaws.com/logos/7QzHNpRvuN7aD1wN1B8jdb.png", description: "Doqfy's Contract Lifecycle Management (CLM) feature streamlines the entire contract process, from creation and negotiation to execution and renewal.", premium: true },
        ]
    }
  ];

  const [hoveredProduct, setHoveredProduct] = useState(null);

  const handleProductClick = (slug) => {
    window.location.href = `/product/${slug}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/20 via-transparent to-blue-50/20 relative overflow-hidden ">
     <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F610_1px,transparent_1px),linear-gradient(to_bottom,#3B82F610_1px,transparent_1px)] bg-[size:14px_14px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F608_2px,transparent_2px),linear-gradient(to_bottom,#3B82F608_2px,transparent_2px)] bg-[size:28px_28px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/40 via-white/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/40 via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.5)_100%)]" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-xl backdrop-blur-sm"
            style={{
              width: `${Math.random() * 30 + 15}px`,
              height: `${Math.random() * 30 + 15}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-24">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

    {categories.map((category, categoryIndex) => (
      <div key={categoryIndex} className="relative backdrop-blur-md rounded-2xl border border-white/20 shadow-xl transition-all p-8 duration-300">
         <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F610_1px,transparent_1px),linear-gradient(to_bottom,#3B82F610_1px,transparent_1px)] bg-[size:14px_14px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F608_2px,transparent_2px),linear-gradient(to_bottom,#3B82F608_2px,transparent_2px)] bg-[size:28px_28px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/40 via-white/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white/40 via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.5)_100%)]" />
      </div>
              <div className="flex items-center gap-4 mb-14 group">
              <h2 className="
  group
  relative
  text-2xl md:text-3xl 
  font-extrabold 
  tracking-tight 
  text-blue-900
  transition-all duration-500 ease-out
  pb-2
">
  {category.title}
  {/* Default static line */}
  <span className="
    absolute 
    bottom-0 
    left-0 
    w-full 
    h-0.5
    bg-blue-200
    z-10
  "/>
  {/* Animated hover line */}
  <span className="
    absolute 
    bottom-0 
    left-0 
    w-0 
    h-0.5
    bg-gradient-to-r from-blue-600 via-blue-400 to-blue-300
    transition-all duration-700 ease-out
    group-hover:w-full
    opacity-100
    z-20
  "/>
</h2>
                
                {categoryIndex === 0 && (
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-indigo-500/90 via-blue-500/90 to-blue-600/90 rounded-full shadow-sm transition-all duration-300 ease-in-out hover:shadow-md hover:from-indigo-600/90 hover:to-blue-700/90">
                    <Sparkles className="w-3.5 h-3.5 text-white/90" />
                    <span className="text-xs font-medium text-white/90 uppercase tracking-wide">Featured</span>
                  </div>
                )}
              </div>

              <div className="relative h-64 md:h-72">
                {categoryIndex !== 3 ? (
                  <>
                    {category.products.map((product, index) => {
                    const positions = [
                        "left-4 bottom-4 w-32 md:w-48 h-32 md:h-48",
                        "right-4 bottom-4 w-24 md:w-36 h-24 md:h-36",
                        "left-1/2 top-4 w-20 md:w-24 h-20 md:h-24"
                    ];

                      return (
                        <motion.div
                          key={product.id}
                          className={`absolute ${positions[index]} z-${10 + index}`}
                          whileHover={{ scale: 1.05 }}
                          onHoverStart={() => setHoveredProduct({ category: categoryIndex, product: index })}
                          onHoverEnd={() => setHoveredProduct(null)}
                          onClick={() => handleProductClick(product.slug)}
                        >
                          <div className="relative w-full h-full cursor-pointer group">
                            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/5 to-indigo-500/5 blur-md group-hover:blur-lg transition-all duration-300" />
                            <div className="absolute -inset-px rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 group-hover:from-blue-400/30 group-hover:to-indigo-400/30 transition-all duration-300" />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-sm" />
                            <div className="absolute inset-0 rounded-full p-4 overflow-hidden shadow-lg">
                              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/90 to-blue-600/90" />
                              <img 
                                src={product.logo} 
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover p-1 rounded-full"
                              />
                            </div>
                          </div>

                          <AnimatePresence>
                            {hoveredProduct?.category === categoryIndex && 
                             hoveredProduct?.product === index && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute bottom-full mb-4  -translate-x-1/2 w-64 bg-white rounded-2xl border border-gray-200 shadow-xl p-4 z-9999"
                            >
                                <div className="relative">
                                    <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                                    {/* <div className="flex items-center justify-between">
                                        {product.premium && (
                                            <span className="flex items-center gap-1 text-xs font-medium text-yellow-600">
                                                <Sparkles className="w-3 h-3" />
                                                Premium
                                            </span>
                                        )}
                                        <span className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                                            Learn More
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div> */}
                                </div>
                            </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="flex flex-col items-center space-y-8">
                    {[0, 1].map((rowIndex) => (
                      <div key={rowIndex} className="flex items-center justify-center">
                        {category.products.slice(rowIndex * 4, (rowIndex + 1) * 4).map((product, index) => (
                          <motion.div
                            key={product.id}
                            className={`relative ${index > 0 ? '-ml-4' : ''}`}
                            style={{ zIndex: index }}
                            whileHover={{ scale: 1.05, zIndex: 30 }}
                            onHoverStart={() => setHoveredProduct({ category: categoryIndex, product: rowIndex * 4 + index })}
                            onHoverEnd={() => setHoveredProduct(null)}
                            onClick={() => handleProductClick(product.id)}
                          >
                            <div className="relative w-16 h-16 md:w-28 md:h-28 cursor-pointer group">
                              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500/5 to-indigo-500/5 blur-md group-hover:blur-lg transition-all duration-300" />
                              <div className="absolute -inset-px rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 group-hover:from-blue-400/30 group-hover:to-indigo-400/30 transition-all duration-300" />
                              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-sm" />
                              <div className="absolute inset-0 rounded-full p-4 overflow-hidden shadow-lg">
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500/90 to-blue-600/90" />
                                <img 
                                  src={product.logo} 
                                  alt={product.name}
                                  className="absolute inset-0 w-full h-full object-cover p-1 rounded-full"
                                />
                              </div>
                            </div>

                            <AnimatePresence>
                              {hoveredProduct?.category === categoryIndex && 
                               hoveredProduct?.product === (rowIndex * 4 + index) && (
                                <motion.div
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 bg-white rounded-2xl border border-gray-200 shadow-xl p-4 z-9999"
                                >
                                  <div className="relative">
                                    <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                      {product.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                                    {/* <div className="flex items-center justify-between">
                                      {product.premium && (
                                        <span className="flex items-center gap-1 text-xs font-medium text-yellow-600">
                                          <Sparkles className="w-3 h-3" />
                                          Premium
                                        </span>
                                      )}
                                      <span className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                                        Learn More
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                      </span>
                                    </div> */}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}
                      </div>
                    ))}
                    <button 
  onClick={() => window.location.href = '/directory/products'}
  className="group mt-8 px-8 py-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 text-white rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:from-indigo-700 hover:via-blue-700 hover:to-violet-700 flex items-center justify-center gap-3 relative overflow-hidden"
>
  <span className="relative z-10 flex items-center gap-3">
    View All Products
    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
  </span>
  <div className="absolute inset-0 bg-gradient-to-r from-violet-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, -10px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default ProductCategories;

