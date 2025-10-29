
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
