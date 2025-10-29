
// // // 'use client';

// // // import React, { useState, useEffect, useRef, useCallback } from 'react';
// // // import { Loader2, Filter, MapPin, Layers, Move, ArrowUpRight, ChevronRight, ChevronLeft, ChevronUp, ChevronDown } from 'lucide-react';

// // // interface Product {
// // //   id: string;
// // //   productName: string;
// // //   logoUrl: string;
// // //   category: string;
// // //   headquarters: string;
// // //   description: string;
// // //   companyName: string;
// // //   isPremium: boolean;
// // //   tag?: string | null;
// // //   slug?: string | null;
// // // }

// // // interface ProductPosition {
// // //   x: number;
// // //   y: number;
// // //   product: Product;
// // // }

// // // interface FilterOption {
// // //   value: string;
// // //   count: number;
// // // }

// // // const formatCategory = (cat: string): string => {
// // //   return cat.split('_').map(word => 
// // //     word.charAt(0) + word.slice(1).toLowerCase()
// // //   ).join(' ');
// // // };


// // // const generatePositions = (products: Product[], viewportOffset: { x: number; y: number }): ProductPosition[] => {
// // //   const positions: ProductPosition[] = [];
// // //   const gridSize = 200;
// // //   const jitter = 40;
// // //   const cols = 5;
  
// // //   products.forEach((product, index) => {
// // //     const row = Math.floor(index / cols);
// // //     const col = index % cols;
    
// // //     const staggerOffset = (row % 2) * (gridSize / 2);
// // //     const waveOffset = Math.sin(row * 0.5) * 50;
    
// // //     const seed = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
// // //     const randomX = (Math.sin(seed * 0.1) * jitter);
// // //     const randomY = (Math.cos(seed * 0.1) * jitter);
    
// // //     positions.push({
// // //       x: col * gridSize + staggerOffset + waveOffset + randomX + 100,
// // //       y: row * gridSize + randomY + 100,
// // //       product
// // //     });
// // //   });
  
// // //   return positions;
// // // };
// // // export default function LegalSoftwareCanvas() {
// // //   const [allProducts, setAllProducts] = useState<Product[]>([]);
// // //   const [productPositions, setProductPositions] = useState<ProductPosition[]>([]);
// // //   const [loading, setLoading] = useState(true);
  
// // //   const [categories, setCategories] = useState<FilterOption[]>([]);
// // //   const [countries, setCountries] = useState<FilterOption[]>([]);
  
// // //   const [selectedCategory, setSelectedCategory] = useState('all');
// // //   const [selectedCountry, setSelectedCountry] = useState('all');
// // //   const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  
// // //   const [isDragging, setIsDragging] = useState(false);
// // //   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
// // //   const [viewportOffset, setViewportOffset] = useState({ x: 0, y: 0 });
// // //   const [dragDirection, setDragDirection] = useState<{ x: number; y: number } | null>(null);
// // //   const [showHint, setShowHint] = useState(true);
  
// // //   const canvasRef = useRef<HTMLDivElement>(null);
// // //   const containerRef = useRef<HTMLDivElement>(null);
// // //   const lastPositionRef = useRef({ x: 0, y: 0 });

// // //   // Fetch products
// // //   const fetchProducts = useCallback(async () => {
// // //     setLoading(true);
// // //     try {
// // //       const params = new URLSearchParams();
// // //       if (selectedCategory !== 'all') params.append('category', selectedCategory);
// // //       if (selectedCountry !== 'all') params.append('country', selectedCountry);

// // //       const response = await fetch(`/api/legal-software/canvas?${params}`);
// // //       const result = await response.json();

// // //       if (result.success) {
// // //         setAllProducts(result.data.products);
// // //         setCategories(result.data.filters.categories);
// // //         setCountries(result.data.filters.countries);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching products:', error);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, [selectedCategory, selectedCountry]);

// // //   useEffect(() => {
// // //     fetchProducts();
// // //   }, [fetchProducts]);

// // //   useEffect(() => {
// // //     if (allProducts.length > 0) {
// // //       const positions = generatePositions(allProducts);
// // //       setProductPositions(positions);
// // //     }
// // //   }, [allProducts]);

// // //   const getVisibleProducts = useCallback(() => {
// // //     if (!containerRef.current) return [];
    
// // //     const container = containerRef.current.getBoundingClientRect();
// // //     const buffer = 400;
    
// // //     return productPositions.filter(pos => {
// // //       const x = pos.x + viewportOffset.x;
// // //       const y = pos.y + viewportOffset.y;
      
// // //       return (
// // //         x > -buffer && 
// // //         x < container.width + buffer &&
// // //         y > -buffer && 
// // //         y < container.height + buffer
// // //       );
// // //     }).slice(0, 10);
// // //   }, [productPositions, viewportOffset]);

// // //   const visibleProducts = getVisibleProducts();

// // //   const handleMouseDown = (e: React.MouseEvent) => {
// // //     if ((e.target as HTMLElement).closest('.product-card')) return;
// // //     setIsDragging(true);
// // //     setDragStart({ x: e.clientX - viewportOffset.x, y: e.clientY - viewportOffset.y });
// // //     lastPositionRef.current = { x: e.clientX, y: e.clientY };
// // //     setShowHint(false);
// // //   };

// // //   const handleMouseMove = useCallback((e: MouseEvent) => {
// // //     if (!isDragging) return;
    
// // //     const newX = e.clientX - dragStart.x;
// // //     const newY = e.clientY - dragStart.y;
    
// // //     // Calculate drag direction
// // //     const deltaX = e.clientX - lastPositionRef.current.x;
// // //     const deltaY = e.clientY - lastPositionRef.current.y;
    
// // //     if (Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) {
// // //       setDragDirection({ x: deltaX, y: deltaY });
// // //       lastPositionRef.current = { x: e.clientX, y: e.clientY };
// // //     }
    
// // //     setViewportOffset({ x: newX, y: newY });
// // //   }, [isDragging, dragStart]);

// // //   const handleMouseUp = useCallback(() => {
// // //     setIsDragging(false);
// // //     setDragDirection(null);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (isDragging) {
// // //       window.addEventListener('mousemove', handleMouseMove);
// // //       window.addEventListener('mouseup', handleMouseUp);
// // //       return () => {
// // //         window.removeEventListener('mousemove', handleMouseMove);
// // //         window.removeEventListener('mouseup', handleMouseUp);
// // //       };
// // //     }
// // //   }, [isDragging, handleMouseMove, handleMouseUp]);

// // //   // Hide hint after 5 seconds
// // //   useEffect(() => {
// // //     const timer = setTimeout(() => setShowHint(false), 5000);
// // //     return () => clearTimeout(timer);
// // //   }, []);

// // //   // Get arrow direction guidance
// // //   const getGuidanceArrows = () => {
// // //     if (!containerRef.current || visibleProducts.length === 0) return null;
    
// // //     const container = containerRef.current.getBoundingClientRect();
// // //     const centerX = container.width / 2;
// // //     const centerY = container.height / 2;
    
// // //     // Find where most products are relative to viewport
// // //     const avgX = visibleProducts.reduce((sum, p) => sum + (p.x + viewportOffset.x), 0) / visibleProducts.length;
// // //     const avgY = visibleProducts.reduce((sum, p) => sum + (p.y + viewportOffset.y), 0) / visibleProducts.length;
    
// // //     const arrows = [];
    
// // //     // Show arrows pointing to more content
// // //     if (avgX < centerX - 100) arrows.push('left');
// // //     if (avgX > centerX + 100) arrows.push('right');
// // //     if (avgY < centerY - 100) arrows.push('up');
// // //     if (avgY > centerY + 100) arrows.push('down');
    
// // //     // Always suggest diagonal movement (our products are arranged diagonally)
// // //     if (!isDragging) {
// // //       arrows.push('diagonal');
// // //     }
    
// // //     return arrows;
// // //   };

// // //   const guidanceArrows = getGuidanceArrows();

// // //   return (
// // //     <div className="relative min-h-screen bg-gradient-to-br from-[#fafbfc] via-[#f8f9fb] to-[#f5f7fa] pt-28 pb-8 px-4">
      
// // //       {/* Floating Filter Panel - Left Side with more top space */}
// // //       <div className="fixed left-6 top-32 z-40 w-64">
// // //         <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 backdrop-blur-sm bg-white/95">
// // //           {/* Header */}
// // //           <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
// // //             <Filter className="w-5 h-5 text-[#7cc6ee]" />
// // //             <h3 className="font-bold text-[#1e2556] text-sm">Filters</h3>
// // //           </div>

// // //           {/* Category Filter */}
// // //           <div className="mb-4">
// // //             <label className="flex items-center gap-2 text-xs font-semibold text-[#334155] mb-2">
// // //               <Layers className="w-4 h-4 text-[#7cc6ee]" />
// // //               Category
// // //             </label>
// // //             <select
// // //               value={selectedCategory}
// // //               onChange={(e) => setSelectedCategory(e.target.value)}
// // //               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent bg-white transition-all"
// // //             >
// // //               <option value="all">All ({allProducts.length})</option>
// // //               {categories.map(cat => (
// // //                 <option key={cat.value} value={cat.value}>
// // //                   {formatCategory(cat.value)} ({cat.count})
// // //                 </option>
// // //               ))}
// // //             </select>
// // //           </div>

// // //           {/* Country Filter */}
// // //           <div>
// // //             <label className="flex items-center gap-2 text-xs font-semibold text-[#334155] mb-2">
// // //               <MapPin className="w-4 h-4 text-[#7cc6ee]" />
// // //               Country
// // //             </label>
// // //             <select
// // //               value={selectedCountry}
// // //               onChange={(e) => setSelectedCountry(e.target.value)}
// // //               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent bg-white transition-all"
// // //             >
// // //               <option value="all">All ({allProducts.length})</option>
// // //               {countries.map(country => (
// // //                 <option key={country.value} value={country.value}>
// // //                   {country.value} ({country.count})
// // //                 </option>
// // //               ))}
// // //             </select>
// // //           </div>

// // //           {/* Total Count */}
// // //           <div className="mt-4 pt-3 border-t border-gray-200">
// // //             <p className="text-xs text-[#334155] text-center">
// // //               <span className="font-bold text-[#1e2556]">{allProducts.length}</span> products found
// // //             </p>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Main Canvas Container - Right Side */}
// // //       <div className="ml-80 mr-6">
// // //         <div 
// // //           ref={containerRef}
// // //           className="relative bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden"
// // //           style={{ height: 'calc(100vh - 160px)' }}
// // //         >
// // //           {/* Background Pattern */}
// // //           <div className="absolute inset-0 opacity-20">
// // //             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
// // //               <defs>
// // //                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
// // //                   <circle cx="20" cy="20" r="1" fill="#7cc6ee" />
// // //                 </pattern>
// // //               </defs>
// // //               <rect width="100%" height="100%" fill="url(#grid)" />
// // //             </svg>
// // //           </div>

// // //           {/* Decorative Blurs */}
// // //           <div className="absolute inset-0 pointer-events-none overflow-hidden">
// // //             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7cc6ee] rounded-full blur-3xl opacity-10"></div>
// // //             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1e2556] rounded-full blur-3xl opacity-10"></div>
// // //           </div>

// // //           {/* Initial Drag Hint */}
// // //           {showHint && !loading && (
// // //             <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
// // //               <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-[#7cc6ee] p-8 animate-pulse">
// // //                 <div className="flex flex-col items-center gap-4">
// // //                   <Move className="w-12 h-12 text-[#7cc6ee]" />
// // //                   <p className="text-[#1e2556] font-bold text-lg">Drag Up & Right to Explore</p>
// // //                   <ArrowUpRight className="w-8 h-8 text-[#7cc6ee] animate-bounce" />
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* Dynamic Guidance Arrows - Show where to drag */}
// // //           {!loading && !showHint && guidanceArrows && guidanceArrows.length > 0 && (
// // //             <>
// // //               {guidanceArrows.includes('diagonal') && (
// // //                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
// // //                   <div className="bg-[#7cc6ee]/20 rounded-full p-8 animate-pulse">
// // //                     <ArrowUpRight className="w-12 h-12 text-[#7cc6ee]" strokeWidth={3} />
// // //                   </div>
// // //                 </div>
// // //               )}
              
// // //               {guidanceArrows.includes('right') && (
// // //                 <div className="absolute top-1/2 right-8 -translate-y-1/2 pointer-events-none z-20 animate-slideRight">
// // //                   <ChevronRight className="w-10 h-10 text-[#7cc6ee]" strokeWidth={3} />
// // //                 </div>
// // //               )}
              
// // //               {guidanceArrows.includes('left') && (
// // //                 <div className="absolute top-1/2 left-8 -translate-y-1/2 pointer-events-none z-20 animate-slideLeft">
// // //                   <ChevronLeft className="w-10 h-10 text-[#7cc6ee]" strokeWidth={3} />
// // //                 </div>
// // //               )}
              
// // //               {guidanceArrows.includes('up') && (
// // //                 <div className="absolute top-8 left-1/2 -translate-x-1/2 pointer-events-none z-20 animate-slideUp">
// // //                   <ChevronUp className="w-10 h-10 text-[#7cc6ee]" strokeWidth={3} />
// // //                 </div>
// // //               )}
              
// // //               {guidanceArrows.includes('down') && (
// // //                 <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20 animate-slideDown">
// // //                   <ChevronDown className="w-10 h-10 text-[#7cc6ee]" strokeWidth={3} />
// // //                 </div>
// // //               )}
// // //             </>
// // //           )}

// // //           {/* Active Drag Direction Indicator */}
// // //           {isDragging && dragDirection && (
// // //             <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#7cc6ee] text-white px-4 py-2 rounded-full shadow-lg z-30 flex items-center gap-2">
// // //               {Math.abs(dragDirection.x) > Math.abs(dragDirection.y) ? (
// // //                 <>
// // //                   {dragDirection.x > 0 ? (
// // //                     <>
// // //                       <ChevronRight className="w-5 h-5" />
// // //                       <span className="text-sm font-semibold">Dragging Right</span>
// // //                     </>
// // //                   ) : (
// // //                     <>
// // //                       <ChevronLeft className="w-5 h-5" />
// // //                       <span className="text-sm font-semibold">Dragging Left</span>
// // //                     </>
// // //                   )}
// // //                 </>
// // //               ) : (
// // //                 <>
// // //                   {dragDirection.y > 0 ? (
// // //                     <>
// // //                       <ChevronDown className="w-5 h-5" />
// // //                       <span className="text-sm font-semibold">Dragging Down</span>
// // //                     </>
// // //                   ) : (
// // //                     <>
// // //                       <ChevronUp className="w-5 h-5" />
// // //                       <span className="text-sm font-semibold">Dragging Up</span>
// // //                     </>
// // //                   )}
// // //                 </>
// // //               )}
// // //             </div>
// // //           )}

// // //           {/* Draggable Canvas */}
// // //           <div
// // //             ref={canvasRef}
// // //             className={`relative w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
// // //             onMouseDown={handleMouseDown}
// // //           >
// // //             {/* Products */}
// // //             {visibleProducts.map(({ product, x, y }) => {
// // //               const isHovered = hoveredProduct === product.id;
// // //               const finalX = x + viewportOffset.x;
// // //               const finalY = y + viewportOffset.y;

// // //               return (
// // //                 <div
// // //                   key={product.id}
// // //                   className="product-card absolute transition-transform duration-200"
// // //                   style={{
// // //                     left: `${finalX}px`,
// // //                     top: `${finalY}px`,
// // //                     transform: isHovered ? 'scale(1.1)' : 'scale(1)',
// // //                     zIndex: isHovered ? 100 : 10
// // //                   }}
// // //                   onMouseEnter={() => setHoveredProduct(product.id)}
// // //                   onMouseLeave={() => setHoveredProduct(null)}
// // //                 >
// // //                   {/* Logo */}
// // //                   <div className="relative">
// // //                     <div className={`w-20 h-20 rounded-2xl overflow-hidden border-3 shadow-lg transition-all duration-300 ${
// // //                       isHovered 
// // //                         ? 'border-[#7cc6ee] shadow-2xl' 
// // //                         : 'border-white shadow-md'
// // //                     }`}>
// // //                       <img
// // //                         src={product.logoUrl}
// // //                         alt={product.productName}
// // //                         className="w-full h-full object-cover"
// // //                         draggable={false}
// // //                       />
// // //                     </div>
                    
// // //                     {product.isPremium && (
// // //                       <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#1e2556] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
// // //                         <span className="text-white text-xs font-bold">★</span>
// // //                       </div>
// // //                     )}
// // //                   </div>

// // //                   {/* Hover Card */}
// // //                   {isHovered && (
// // //                     <div className="absolute top-24 left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl shadow-2xl border-2 border-[#7cc6ee] p-5 animate-fadeIn z-50 pointer-events-auto">
// // //                       <div className="flex items-start gap-4 mb-4">
// // //                         <img
// // //                           src={product.logoUrl}
// // //                           alt={product.productName}
// // //                           className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200 flex-shrink-0"
// // //                           draggable={false}
// // //                         />
// // //                         <div className="flex-1 min-w-0">
// // //                           <h4 className="font-bold text-[#1e2556] text-base mb-1 truncate">
// // //                             {product.productName}
// // //                           </h4>
// // //                           <p className="text-sm text-[#334155] mb-2">
// // //                             {product.companyName}
// // //                           </p>
// // //                           {product.tag && (
// // //                             <span className="inline-block text-xs bg-[#7cc6ee] text-white px-3 py-1 rounded-full">
// // //                               {product.tag}
// // //                             </span>
// // //                           )}
// // //                         </div>
// // //                       </div>
                      
// // //                       <div className="space-y-3 mb-4">
// // //                         <div className="flex items-start gap-2">
// // //                           <span className="font-semibold text-[#334155] text-xs whitespace-nowrap">Category:</span>
// // //                           <span className="text-[#2d2d2d] text-xs">{formatCategory(product.category)}</span>
// // //                         </div>
// // //                         <div className="flex items-start gap-2">
// // //                           <span className="font-semibold text-[#334155] text-xs whitespace-nowrap">Location:</span>
// // //                           <span className="text-[#2d2d2d] text-xs">{product.headquarters}</span>
// // //                         </div>
// // //                         <p className="text-xs text-[#2d2d2d] leading-relaxed pt-3 border-t border-gray-200">
// // //                           {product.description}
// // //                         </p>
// // //                       </div>

// // //                       <button 
// // //                         className="w-full bg-[#7cc6ee] hover:bg-[#1e2556] text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
// // //                         onClick={() => {
// // //                           if (product.slug) {
// // //                             window.location.href = `/software/${product.slug}`;
// // //                           }
// // //                         }}
// // //                       >
// // //                         View Details
// // //                       </button>
// // //                     </div>
// // //                   )}
// // //                 </div>
// // //               );
// // //             })}

// // //             {/* Empty State */}
// // //             {!loading && visibleProducts.length === 0 && (
// // //               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
// // //                 <p className="text-[#334155] text-lg mb-2">No products in this area</p>
// // //                 <p className="text-[#334155] text-sm">Drag diagonally to explore more</p>
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Loading Overlay */}
// // //           {loading && (
// // //             <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
// // //               <div className="text-center">
// // //                 <Loader2 className="w-16 h-16 animate-spin text-[#7cc6ee] mx-auto mb-4" />
// // //                 <p className="text-[#1e2556] font-semibold text-lg">Loading products...</p>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {/* Product Counter - Bottom Right */}
// // //           <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-xl border border-gray-200">
// // //             <div className="flex items-center gap-3">
// // //               <div className="flex gap-1">
// // //                 <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-pulse"></div>
// // //                 <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
// // //                 <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
// // //               </div>
// // //               <p className="text-sm font-bold text-[#1e2556]">
// // //                 {visibleProducts.length} <span className="text-[#334155] font-normal">of</span> {allProducts.length}
// // //               </p>
// // //             </div>
// // //           </div>

// // //           {/* Subtle Drag Indicator - Bottom Center */}
// // //           {!loading && !isDragging && (
// // //             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200 flex items-center gap-2">
// // //               <Move className="w-4 h-4 text-[#7cc6ee]" />
// // //               <span className="text-xs font-semibold text-[#334155]">Drag to Explore</span>
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>

// // //       <style jsx>{`
// // //         @keyframes fadeIn {
// // //           from {
// // //             opacity: 0;
// // //             transform: translateX(-50%) translateY(10px);
// // //           }
// // //           to {
// // //             opacity: 1;
// // //             transform: translateX(-50%) translateY(0);
// // //           }
// // //         }
        
// // //         @keyframes slideRight {
// // //           0%, 100% { transform: translateY(-50%) translateX(0); }
// // //           50% { transform: translateY(-50%) translateX(10px); }
// // //         }
        
// // //         @keyframes slideLeft {
// // //           0%, 100% { transform: translateY(-50%) translateX(0); }
// // //           50% { transform: translateY(-50%) translateX(-10px); }
// // //         }
        
// // //         @keyframes slideUp {
// // //           0%, 100% { transform: translateX(-50%) translateY(0); }
// // //           50% { transform: translateX(-50%) translateY(-10px); }
// // //         }
        
// // //         @keyframes slideDown {
// // //           0%, 100% { transform: translateX(-50%) translateY(0); }
// // //           50% { transform: translateX(-50%) translateY(10px); }
// // //         }
        
// // //         .animate-fadeIn {
// // //           animation: fadeIn 0.3s ease-out;
// // //         }
        
// // //         .animate-slideRight {
// // //           animation: slideRight 1.5s ease-in-out infinite;
// // //         }
        
// // //         .animate-slideLeft {
// // //           animation: slideLeft 1.5s ease-in-out infinite;
// // //         }
        
// // //         .animate-slideUp {
// // //           animation: slideUp 1.5s ease-in-out infinite;
// // //         }
        
// // //         .animate-slideDown {
// // //           animation: slideDown 1.5s ease-in-out infinite;
// // //         }
        
// // //         .product-card {
// // //           will-change: transform;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }
// // 'use client';

// // import React, { useState, useEffect, useCallback } from 'react';
// // import { Loader2, Filter, MapPin, Layers } from 'lucide-react';

// // interface Product {
// //   id: string;
// //   productName: string;
// //   logoUrl: string;
// //   category: string;
// //   headquarters: string;
// //   description: string;
// //   companyName: string;
// //   isPremium: boolean;
// //   tag?: string | null;
// //   slug?: string | null;
// // }

// // interface FilterOption {
// //   value: string;
// //   count: number;
// // }

// // const formatCategory = (cat: string): string => {
// //   return cat.split('_').map(word => 
// //     word.charAt(0) + word.slice(1).toLowerCase()
// //   ).join(' ');
// // };

// // export default function LegalSoftwareCanvas() {
// //   const [allProducts, setAllProducts] = useState<Product[]>([]);
// //   const [loading, setLoading] = useState(true);
  
// //   const [categories, setCategories] = useState<FilterOption[]>([]);
// //   const [countries, setCountries] = useState<FilterOption[]>([]);
  
// //   const [selectedCategory, setSelectedCategory] = useState('all');
// //   const [selectedCountry, setSelectedCountry] = useState('all');
// //   const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

// //   // Fetch products
// //   const fetchProducts = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const params = new URLSearchParams();
// //       if (selectedCategory !== 'all') params.append('category', selectedCategory);
// //       if (selectedCountry !== 'all') params.append('country', selectedCountry);

// //       const response = await fetch(`/api/legal-software/canvas?${params}`);
// //       const result = await response.json();

// //       if (result.success) {
// //         setAllProducts(result.data.products);
// //         setCategories(result.data.filters.categories);
// //         setCountries(result.data.filters.countries);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [selectedCategory, selectedCountry]);

// //   useEffect(() => {
// //     fetchProducts();
// //   }, [fetchProducts]);

// //   return (
// //     <div className="relative min-h-screen bg-gradient-to-br from-[#fafbfc] via-[#f8f9fb] to-[#f5f7fa] pt-28 pb-8 px-4">
      
// //       {/* Floating Filter Panel - Left Side */}
// //       <div className="fixed left-6 top-32 z-40 w-64">
// //         <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 backdrop-blur-sm bg-white/95">
// //           {/* Header */}
// //           <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
// //             <Filter className="w-5 h-5 text-[#7cc6ee]" />
// //             <h3 className="font-bold text-[#1e2556] text-sm">Filters</h3>
// //           </div>

// //           {/* Category Filter */}
// //           <div className="mb-4">
// //             <label className="flex items-center gap-2 text-xs font-semibold text-[#334155] mb-2">
// //               <Layers className="w-4 h-4 text-[#7cc6ee]" />
// //               Category
// //             </label>
// //             <select
// //               value={selectedCategory}
// //               onChange={(e) => setSelectedCategory(e.target.value)}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent bg-white transition-all"
// //             >
// //               <option value="all">All ({allProducts.length})</option>
// //               {categories.map(cat => (
// //                 <option key={cat.value} value={cat.value}>
// //                   {formatCategory(cat.value)} ({cat.count})
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Country Filter */}
// //           <div>
// //             <label className="flex items-center gap-2 text-xs font-semibold text-[#334155] mb-2">
// //               <MapPin className="w-4 h-4 text-[#7cc6ee]" />
// //               Country
// //             </label>
// //             <select
// //               value={selectedCountry}
// //               onChange={(e) => setSelectedCountry(e.target.value)}
// //               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent bg-white transition-all"
// //             >
// //               <option value="all">All ({allProducts.length})</option>
// //               {countries.map(country => (
// //                 <option key={country.value} value={country.value}>
// //                   {country.value} ({country.count})
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Total Count */}
// //           <div className="mt-4 pt-3 border-t border-gray-200">
// //             <p className="text-xs text-[#334155] text-center">
// //               <span className="font-bold text-[#1e2556]">{allProducts.length}</span> products found
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content Area - Scrollable Grid */}
// //       <div className="ml-80 mr-6">
// //         <div 
// //           className="relative bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden"
// //           style={{ height: 'calc(100vh - 160px)' }}
// //         >
// //           {/* Background Pattern */}
// //           <div className="absolute inset-0 opacity-20 pointer-events-none">
// //             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
// //               <defs>
// //                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
// //                   <circle cx="20" cy="20" r="1" fill="#7cc6ee" />
// //                 </pattern>
// //               </defs>
// //               <rect width="100%" height="100%" fill="url(#grid)" />
// //             </svg>
// //           </div>

// //           {/* Decorative Blurs */}
// //           <div className="absolute inset-0 pointer-events-none overflow-hidden">
// //             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7cc6ee] rounded-full blur-3xl opacity-10"></div>
// //             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1e2556] rounded-full blur-3xl opacity-10"></div>
// //           </div>

// //           {/* Scrollable Products Grid */}
// //           <div className="relative h-full overflow-y-auto custom-scrollbar">
// //             <div className="p-8">
// //               {loading ? (
// //                 <div className="flex items-center justify-center h-96">
// //                   <div className="text-center">
// //                     <Loader2 className="w-16 h-16 animate-spin text-[#7cc6ee] mx-auto mb-4" />
// //                     <p className="text-[#1e2556] font-semibold text-lg">Loading products...</p>
// //                   </div>
// //                 </div>
// //               ) : allProducts.length === 0 ? (
// //                 <div className="flex items-center justify-center h-96">
// //                   <div className="text-center">
// //                     <p className="text-[#334155] text-lg mb-2">No products found</p>
// //                     <p className="text-[#334155] text-sm">Try adjusting your filters</p>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
// //                   {allProducts.map((product) => {
// //                     const isHovered = hoveredProduct === product.id;

// //                     return (
// //                       <div
// //                         key={product.id}
// //                         className="relative flex flex-col items-center"
// //                         onMouseEnter={() => setHoveredProduct(product.id)}
// //                         onMouseLeave={() => setHoveredProduct(null)}
// //                       >
// //                         {/* Logo */}
// //                         <div className="relative">
// //                           <div className={`w-24 h-24 rounded-2xl overflow-hidden border-3 shadow-lg transition-all duration-300 ${
// //                             isHovered 
// //                               ? 'border-[#7cc6ee] shadow-2xl transform scale-110' 
// //                               : 'border-white shadow-md'
// //                           }`}>
// //                             <img
// //                               src={product.logoUrl}
// //                               alt={product.productName}
// //                               className="w-full h-full object-cover"
// //                             />
// //                           </div>
                          
// //                           {product.isPremium && (
// //                             <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1e2556] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
// //                               <span className="text-white text-sm font-bold">★</span>
// //                             </div>
// //                           )}
// //                         </div>

// //                         {/* Product Name */}
// //                         <p className="mt-3 text-sm font-semibold text-[#1e2556] text-center px-2">
// //                           {product.productName}
// //                         </p>

// //                         {/* Hover Card */}
// //                         {isHovered && (
// //                           <div className="absolute top-32 left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl shadow-2xl border-2 border-[#7cc6ee] p-5 animate-fadeIn z-50">
// //                             <div className="flex items-start gap-4 mb-4">
// //                               <img
// //                                 src={product.logoUrl}
// //                                 alt={product.productName}
// //                                 className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200 flex-shrink-0"
// //                               />
// //                               <div className="flex-1 min-w-0">
// //                                 <h4 className="font-bold text-[#1e2556] text-base mb-1 truncate">
// //                                   {product.productName}
// //                                 </h4>
// //                                 <p className="text-sm text-[#334155] mb-2">
// //                                   {product.companyName}
// //                                 </p>
// //                                 {product.tag && (
// //                                   <span className="inline-block text-xs bg-[#7cc6ee] text-white px-3 py-1 rounded-full">
// //                                     {product.tag}
// //                                   </span>
// //                                 )}
// //                               </div>
// //                             </div>
                            
// //                             <div className="space-y-3 mb-4">
// //                               <div className="flex items-start gap-2">
// //                                 <span className="font-semibold text-[#334155] text-xs whitespace-nowrap">Category:</span>
// //                                 <span className="text-[#2d2d2d] text-xs">{formatCategory(product.category)}</span>
// //                               </div>
// //                               <div className="flex items-start gap-2">
// //                                 <span className="font-semibold text-[#334155] text-xs whitespace-nowrap">Location:</span>
// //                                 <span className="text-[#2d2d2d] text-xs">{product.headquarters}</span>
// //                               </div>
// //                               <p className="text-xs text-[#2d2d2d] leading-relaxed pt-3 border-t border-gray-200">
// //                                 {product.description}
// //                               </p>
// //                             </div>

// //                             <button 
// //                               className="w-full bg-[#7cc6ee] hover:bg-[#1e2556] text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
// //                               onClick={() => {
// //                                 if (product.slug) {
// //                                   window.location.href = `/software/${product.slug}`;
// //                                 }
// //                               }}
// //                             >
// //                               View Details
// //                             </button>
// //                           </div>
// //                         )}
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Product Counter - Bottom Right */}
// //           <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-xl border border-gray-200 pointer-events-none">
// //             <div className="flex items-center gap-3">
// //               <div className="flex gap-1">
// //                 <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-pulse"></div>
// //                 <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
// //                 <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
// //               </div>
// //               <p className="text-sm font-bold text-[#1e2556]">
// //                 {allProducts.length} <span className="text-[#334155] font-normal">products</span>
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         @keyframes fadeIn {
// //           from {
// //             opacity: 0;
// //             transform: translateX(-50%) translateY(10px);
// //           }
// //           to {
// //             opacity: 1;
// //             transform: translateX(-50%) translateY(0);
// //           }
// //         }
        
// //         .animate-fadeIn {
// //           animation: fadeIn 0.3s ease-out;
// //         }

// //         .custom-scrollbar::-webkit-scrollbar {
// //           width: 12px;
// //         }

// //         .custom-scrollbar::-webkit-scrollbar-track {
// //           background: #f1f5f9;
// //           border-radius: 10px;
// //           margin: 8px;
// //         }

// //         .custom-scrollbar::-webkit-scrollbar-thumb {
// //           background: #7cc6ee;
// //           border-radius: 10px;
// //           border: 2px solid #f1f5f9;
// //         }

// //         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
// //           background: #1e2556;
// //         }

// //         .custom-scrollbar {
// //           scrollbar-width: thin;
// //           scrollbar-color: #7cc6ee #f1f5f9;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }
// 'use client';

// import React, { useState, useEffect, useCallback } from 'react';
// import { Loader2, Filter, MapPin, Layers } from 'lucide-react';

// interface Product {
//   id: string;
//   productName: string;
//   logoUrl: string;
//   category: string;
//   headquarters: string;
//   description: string;
//   companyName: string;
//   isPremium: boolean;
//   tag?: string | null;
//   slug?: string | null;
// }

// interface FilterOption {
//   value: string;
//   count: number;
// }

// const formatCategory = (cat: string): string => {
//   return cat.split('_').map(word => 
//     word.charAt(0) + word.slice(1).toLowerCase()
//   ).join(' ');
// };

// export default function LegalSoftwareCanvas() {
//   const [allProducts, setAllProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
  
//   const [categories, setCategories] = useState<FilterOption[]>([]);
//   const [countries, setCountries] = useState<FilterOption[]>([]);
  
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [selectedCountry, setSelectedCountry] = useState('all');
//   const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

//   // Fetch products
//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams();
//       if (selectedCategory !== 'all') params.append('category', selectedCategory);
//       if (selectedCountry !== 'all') params.append('country', selectedCountry);

//       const response = await fetch(`/api/legal-software/canvas?${params}`);
//       const result = await response.json();

//       if (result.success) {
//         setAllProducts(result.data.products);
//         setCategories(result.data.filters.categories);
//         setCountries(result.data.filters.countries);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [selectedCategory, selectedCountry]);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-[#fafbfc] via-[#f8f9fb] to-[#f5f7fa] pt-28 pb-8 px-4">
      
//       {/* Floating Filter Panel - Left Side */}
//       <div className="fixed left-6 top-32 z-40 w-64">
//         <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 backdrop-blur-sm bg-white/95">
//           {/* Header */}
//           <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
//             <Filter className="w-5 h-5 text-[#7cc6ee]" />
//             <h3 className="font-bold text-[#1e2556] text-sm">Filters</h3>
//           </div>

//           {/* Category Filter */}
//           <div className="mb-4">
//             <label className="flex items-center gap-2 text-xs font-semibold text-[#334155] mb-2">
//               <Layers className="w-4 h-4 text-[#7cc6ee]" />
//               Category
//             </label>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent bg-white transition-all"
//             >
//               <option value="all">All ({allProducts.length})</option>
//               {categories.map(cat => (
//                 <option key={cat.value} value={cat.value}>
//                   {formatCategory(cat.value)} ({cat.count})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Country Filter */}
//           <div>
//             <label className="flex items-center gap-2 text-xs font-semibold text-[#334155] mb-2">
//               <MapPin className="w-4 h-4 text-[#7cc6ee]" />
//               Country
//             </label>
//             <select
//               value={selectedCountry}
//               onChange={(e) => setSelectedCountry(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent bg-white transition-all"
//             >
//               <option value="all">All ({allProducts.length})</option>
//               {countries.map(country => (
//                 <option key={country.value} value={country.value}>
//                   {country.value} ({country.count})
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Total Count */}
//           <div className="mt-4 pt-3 border-t border-gray-200">
//             <p className="text-xs text-[#334155] text-center">
//               <span className="font-bold text-[#1e2556]">{allProducts.length}</span> products found
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area - Scrollable Grid */}
//       <div className="ml-80 mr-6">
//         <div 
//           className="relative bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden"
//           style={{ height: 'calc(100vh - 160px)' }}
//         >
//           {/* Background Pattern */}
//           <div className="absolute inset-0 opacity-20 pointer-events-none">
//             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//               <defs>
//                 <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//                   <circle cx="20" cy="20" r="1" fill="#7cc6ee" />
//                 </pattern>
//               </defs>
//               <rect width="100%" height="100%" fill="url(#grid)" />
//             </svg>
//           </div>

//           {/* Decorative Blurs */}
//           <div className="absolute inset-0 pointer-events-none overflow-hidden">
//             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7cc6ee] rounded-full blur-3xl opacity-10"></div>
//             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1e2556] rounded-full blur-3xl opacity-10"></div>
//           </div>

//           {/* Scrollable Products Grid */}
//           <div className="relative h-full overflow-y-auto custom-scrollbar">
//             <div className="p-8">
//               {loading ? (
//                 <div className="flex items-center justify-center h-96">
//                   <div className="text-center">
//                     <Loader2 className="w-16 h-16 animate-spin text-[#7cc6ee] mx-auto mb-4" />
//                     <p className="text-[#1e2556] font-semibold text-lg">Loading products...</p>
//                   </div>
//                 </div>
//               ) : allProducts.length === 0 ? (
//                 <div className="flex items-center justify-center h-96">
//                   <div className="text-center">
//                     <p className="text-[#334155] text-lg mb-2">No products found</p>
//                     <p className="text-[#334155] text-sm">Try adjusting your filters</p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
//                   {allProducts.map((product) => {
//                     const isHovered = hoveredProduct === product.id;

//                     return (
//                       <div
//                         key={product.id}
//                         className="relative flex flex-col items-center"
//                         onMouseEnter={() => setHoveredProduct(product.id)}
//                         onMouseLeave={() => setHoveredProduct(null)}
//                       >
//                         {/* Logo - Made Smaller */}
//                         <div className="relative">
//                           <div className={`w-16 h-16 rounded-xl overflow-hidden border-2 shadow-md transition-all duration-200 ${
//                             isHovered 
//                               ? 'border-[#7cc6ee] shadow-lg transform scale-105' 
//                               : 'border-white'
//                           }`}>
//                             <img
//                               src={product.logoUrl}
//                               alt={product.productName}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
                          
//                           {product.isPremium && (
//                             <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#1e2556] rounded-full flex items-center justify-center shadow-md border-2 border-white">
//                               <span className="text-white text-xs font-bold">★</span>
//                             </div>
//                           )}
//                         </div>

//                         {/* Product Name */}
//                         <p className="mt-2 text-xs font-semibold text-[#1e2556] text-center px-2 line-clamp-2">
//                           {product.productName}
//                         </p>

//                         {/* Simplified Hover Card */}
//                         {isHovered && (
//                           <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white rounded-xl shadow-2xl border-2 border-[#7cc6ee] p-4 animate-fadeIn z-50">
//                             <div className="flex items-center gap-3 mb-3">
//                               <img
//                                 src={product.logoUrl}
//                                 alt={product.productName}
//                                 className="w-12 h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0"
//                               />
//                               <div className="flex-1 min-w-0">
//                                 <h4 className="font-bold text-[#1e2556] text-sm mb-0.5 truncate">
//                                   {product.productName}
//                                 </h4>
//                                 <p className="text-xs text-[#334155]">
//                                   {product.companyName}
//                                 </p>
//                               </div>
//                             </div>
                            
//                             {product.tag && (
//                               <span className="inline-block text-xs bg-[#7cc6ee] text-white px-2 py-1 rounded-full mb-3">
//                                 {product.tag}
//                               </span>
//                             )}
                            
//                             <div className="space-y-2 mb-3">
//                               <div className="flex items-center gap-2">
//                                 <span className="text-xs text-[#334155] font-medium">Category:</span>
//                                 <span className="text-xs text-[#2d2d2d]">{formatCategory(product.category)}</span>
//                               </div>
//                               <div className="flex items-center gap-2">
//                                 <span className="text-xs text-[#334155] font-medium">Location:</span>
//                                 <span className="text-xs text-[#2d2d2d]">{product.headquarters}</span>
//                               </div>
//                             </div>

//                             <button 
//                               className="w-full bg-[#7cc6ee] hover:bg-[#1e2556] text-white text-xs font-semibold py-2 px-3 rounded-lg transition-all duration-200"
//                               onClick={() => {
//                                 if (product.slug) {
//                                   window.location.href = `/software/${product.slug}`;
//                                 }
//                               }}
//                             >
//                               View Details
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Product Counter - Bottom Right */}
//           <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-xl border border-gray-200 pointer-events-none">
//             <div className="flex items-center gap-3">
//               <div className="flex gap-1">
//                 <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-pulse"></div>
//                 <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
//                 <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
//               </div>
//               <p className="text-sm font-bold text-[#1e2556]">
//                 {allProducts.length} <span className="text-[#334155] font-normal">products</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateX(-50%) translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(-50%) translateY(0);
//           }
//         }
        
//         .animate-fadeIn {
//           animation: fadeIn 0.2s ease-out;
//         }

//         .custom-scrollbar::-webkit-scrollbar {
//           width: 12px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f5f9;
//           border-radius: 10px;
//           margin: 8px;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #7cc6ee;
//           border-radius: 10px;
//           border: 2px solid #f1f5f9;
//         }

//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #1e2556;
//         }

//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: #7cc6ee #f1f5f9;
//         }
//       `}</style>
//     </div>
//   );
// }
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, Filter, MapPin, Layers } from 'lucide-react';

interface Product {
  id: string;
  productName: string;
  logoUrl: string;
  category: string;
  headquarters: string;
  description: string;
  companyName: string;
  isPremium: boolean;
  tag?: string | null;
  slug?: string | null;
}

interface FilterOption {
  value: string;
  count: number;
}

const formatCategory = (cat: string): string => {
  return cat.split('_').map(word => 
    word.charAt(0) + word.slice(1).toLowerCase()
  ).join(' ');
};

export default function LegalSoftwareCanvas() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [categories, setCategories] = useState<FilterOption[]>([]);
  const [countries, setCountries] = useState<FilterOption[]>([]);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedCountry !== 'all') params.append('country', selectedCountry);

      const response = await fetch(`/api/legal-software/canvas?${params}`);
      const result = await response.json();

      if (result.success) {
        setAllProducts(result.data.products);
        setCategories(result.data.filters.categories);
        setCountries(result.data.filters.countries);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedCountry]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#fafbfc] via-[#f8f9fb] to-[#f5f7fa] pt-28 pb-8 px-4">
      
      {/* Floating Filter Panel - Left Side - Fixed positioning with max-height */}
      <div className="fixed left-6 top-32 z-40 w-64" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 backdrop-blur-sm bg-white/95">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
            <Filter className="w-5 h-5 text-[#7cc6ee]" />
            <h3 className="font-bold text-[#1e2556] text-sm">Filters</h3>
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#334155] mb-2">
              <Layers className="w-4 h-4 text-[#7cc6ee]" />
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent bg-white transition-all"
            >
              <option value="all">All ({allProducts.length})</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {formatCategory(cat.value)} ({cat.count})
                </option>
              ))}
            </select>
          </div>

          {/* Country Filter */}
          <div>
            <label className="flex items-center gap-2 text-xs font-semibold text-[#334155] mb-2">
              <MapPin className="w-4 h-4 text-[#7cc6ee]" />
              Country
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent bg-white transition-all"
            >
              <option value="all">All ({allProducts.length})</option>
              {countries.map(country => (
                <option key={country.value} value={country.value}>
                  {country.value} ({country.count})
                </option>
              ))}
            </select>
          </div>

          {/* Total Count */}
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-xs text-[#334155] text-center">
              <span className="font-bold text-[#1e2556]">{allProducts.length}</span> products found
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area - Scrollable Grid */}
      <div className="ml-80 mr-6">
        <div 
          className="relative bg-white rounded-3xl shadow-2xl border-2 border-gray-200 overflow-hidden"
          style={{ height: 'calc(100vh - 160px)' }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1" fill="#7cc6ee" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Decorative Blurs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7cc6ee] rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#1e2556] rounded-full blur-3xl opacity-10"></div>
          </div>

          {/* Scrollable Products Grid */}
          <div className="relative h-full overflow-y-auto custom-scrollbar">
            <div className="p-8 pb-20">
              {loading ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <Loader2 className="w-16 h-16 animate-spin text-[#7cc6ee] mx-auto mb-4" />
                    <p className="text-[#1e2556] font-semibold text-lg">Loading products...</p>
                  </div>
                </div>
              ) : allProducts.length === 0 ? (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <p className="text-[#334155] text-lg mb-2">No products found</p>
                    <p className="text-[#334155] text-sm">Try adjusting your filters</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {allProducts.map((product, index) => {
                    const isHovered = hoveredProduct === product.id;
                    
                    // Calculate position for smart hover card placement
                    const isBottomRow = index >= allProducts.length - 6;
                    const columnIndex = index % 6;
                    const isLeftColumn = columnIndex <= 1;
                    const isRightColumn = columnIndex >= 4;

                    return (
                      <div
                        key={product.id}
                        className="relative flex flex-col items-center"
                        onMouseEnter={() => setHoveredProduct(product.id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                      >
                        {/* Logo */}
                        <div className="relative">
                          <div className={`w-16 h-16 rounded-xl overflow-hidden border-2 shadow-md transition-all duration-200 ${
                            isHovered 
                              ? 'border-[#7cc6ee] shadow-lg transform scale-105' 
                              : 'border-white'
                          }`}>
                            <img
                              src={product.logoUrl}
                              alt={product.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {product.isPremium && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#1e2556] rounded-full flex items-center justify-center shadow-md border-2 border-white">
                              <span className="text-white text-xs font-bold">★</span>
                            </div>
                          )}
                        </div>

                        {/* Product Name */}
                        <p className="mt-2 text-xs font-semibold text-[#1e2556] text-center px-2 line-clamp-2">
                          {product.productName}
                        </p>

                        {/* Smart Positioned Hover Card */}
                        {isHovered && (
                          <div 
                            className={`absolute bg-white rounded-xl shadow-2xl border-2 border-[#7cc6ee] p-4 animate-fadeIn z-50 w-64
                              ${isBottomRow ? 'bottom-20' : 'top-20'}
                              ${isLeftColumn ? 'left-0' : isRightColumn ? 'right-0' : 'left-1/2 -translate-x-1/2'}
                            `}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <img
                                src={product.logoUrl}
                                alt={product.productName}
                                className="w-12 h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-[#1e2556] text-sm mb-0.5 truncate">
                                  {product.productName}
                                </h4>
                                <p className="text-xs text-[#334155]">
                                  {product.companyName}
                                </p>
                              </div>
                            </div>
                            
                            {product.tag && (
                              <span className="inline-block text-xs bg-[#7cc6ee] text-white px-2 py-1 rounded-full mb-3">
                                {product.tag}
                              </span>
                            )}
                            
                            <div className="space-y-2 mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#334155] font-medium">Category:</span>
                                <span className="text-xs text-[#2d2d2d]">{formatCategory(product.category)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#334155] font-medium">Location:</span>
                                <span className="text-xs text-[#2d2d2d]">{product.headquarters}</span>
                              </div>
                            </div>

                            <button 
                              className="w-full bg-[#7cc6ee] hover:bg-[#1e2556] text-white text-xs font-semibold py-2 px-3 rounded-lg transition-all duration-200"
                              onClick={() => {
                                if (product.slug) {
                                  window.location.href = `/product/${product.slug}`;
                                }
                              }}
                            >
                              View Details
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Product Counter - Bottom Right */}
          <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-xl border border-gray-200 pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <p className="text-sm font-bold text-[#1e2556]">
                {allProducts.length} <span className="text-[#334155] font-normal">products</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
          margin: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #7cc6ee;
          border-radius: 10px;
          border: 2px solid #f1f5f9;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #1e2556;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #7cc6ee #f1f5f9;
        }
      `}</style>
    </div>
  );
}
