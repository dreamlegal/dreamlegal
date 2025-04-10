// 
// old one 
"use client"
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FaCircleCheck } from 'react-icons/fa6';
import { X } from 'lucide-react';

// Helper component to render sections in comparison
const ComparisonSection = ({ title, content1, content2 }) => (
  <div className="flex border-b border-gray-200">
    <div className="w-1/2 border-r border-gray-200 px-4 py-3">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      {content1}
    </div>
    <div className="w-1/2 px-4 py-3">
      <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
      {content2}
    </div>
  </div>
);

// Helper component to render deployment options
const DeploymentSection = ({ options = [] }) => (
  <ul className="space-y-2">
    {options.map((option, index) => (
      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
        <FaCircleCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
        <span>{option}</span>
      </li>
    ))}
  </ul>
);

// Helper component to render tags
const TagsSection = ({ items = [] }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => {
      const tag = typeof item === 'string' ? item.split('|')[0] : item;
      return (
        <span
          key={tag}
          className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full"
        >
          {tag}
        </span>
      );
    })}
  </div>
);

// Main comparison component
const ProductComparison = ({ products, isOpen, onClose }) => {
  if (!Array.isArray(products) || products.length !== 2) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-full">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Product Comparison</DialogTitle>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Headers */}
            <div className="flex bg-gray-50 border-b border-gray-200">
              <div className="w-1/2 border-r border-gray-200 p-4 text-center font-medium">
                {products[0].name}
              </div>
              <div className="w-1/2 p-4 text-center font-medium">
                {products[1].name}
              </div>
            </div>

            {/* Logos */}
            <div className="flex border-b border-gray-200">
              <div className="w-1/2 border-r border-gray-200 p-6 flex justify-center">
                <img
                  src={products[0].logoUrl}
                  alt={products[0].name}
                  className="h-20 w-20 object-contain"
                />
              </div>
              <div className="w-1/2 p-6 flex justify-center">
                <img
                  src={products[1].logoUrl}
                  alt={products[1].name}
                  className="h-20 w-20 object-contain"
                />
              </div>
            </div>

            {/* Description */}
            <ComparisonSection
              title="Description"
              content1={<p className="text-sm text-gray-600">{products[0].description}</p>}
              content2={<p className="text-sm text-gray-600">{products[1].description}</p>}
            />

            {/* Categories */}
            <ComparisonSection
              title="Categories"
              content1={<TagsSection items={products[0].category} />}
              content2={<TagsSection items={products[1].category} />}
            />

            {/* Deployment */}
            <ComparisonSection
              title="Deployment Options"
              content1={<DeploymentSection options={products[0].deployement} />}
              content2={<DeploymentSection options={products[1].deployement} />}
            />

            {/* Mobile Availability */}
            <ComparisonSection
              title="Mobile Availability"
              content1={
                <span className={`text-sm ${products[0].mobileAvailable === 'Yes' ? 'text-green-600' : 'text-gray-600'}`}>
                  {products[0].mobileAvailable === 'Yes' ? 'Available' : 'Not Available'}
                </span>
              }
              content2={
                <span className={`text-sm ${products[1].mobileAvailable === 'Yes' ? 'text-green-600' : 'text-gray-600'}`}>
                  {products[1].mobileAvailable === 'Yes' ? 'Available' : 'Not Available'}
                </span>
              }
            />

            {/* Target Users */}
            <ComparisonSection
              title="Target Users"
              content1={<TagsSection items={products[0].userCategory} />}
              content2={<TagsSection items={products[1].userCategory} />}
            />

            {/* Industries */}
            <ComparisonSection
              title="Target Industries"
              content1={<TagsSection items={products[0].industry} />}
              content2={<TagsSection items={products[1].industry} />}
            />

            {/* Practice Areas */}
            <ComparisonSection
              title="Practice Areas"
              content1={<TagsSection items={products[0].practiceAreas} />}
              content2={<TagsSection items={products[1].practiceAreas} />}
            />

            {/* Integration */}
            {products[0].integration && products[1].integration && (
              <ComparisonSection
                title="Integrations"
                content1={<TagsSection items={products[0].integration} />}
                content2={<TagsSection items={products[1].integration} />}
              />
            )}

            {/* Pricing Model */}
            {products[0].pricingModel && products[1].pricingModel && (
              <ComparisonSection
                title="Pricing Model"
                content1={<TagsSection items={products[0].pricingModel} />}
                content2={<TagsSection items={products[1].pricingModel} />}
              />
            )}

            {/* Free Trial */}
            <ComparisonSection
              title="Free Trial"
              content1={
                <span className={`text-sm ${products[0].freeTrial ? 'text-green-600' : 'text-gray-600'}`}>
                  {products[0].freeTrial ? 'Available' : 'Not Available'}
                </span>
              }
              content2={
                <span className={`text-sm ${products[1].freeTrial ? 'text-green-600' : 'text-gray-600'}`}>
                  {products[1].freeTrial ? 'Available' : 'Not Available'}
                </span>
              }
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};



import  { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Grid, List, Search, Package, FilterIcon } from 'lucide-react';
import { debounce } from 'lodash';
import DirectoryFilter from './DirectoryFilter';
import ProductCard from './ProductCard';
// import { ProductComparison } from './ProductComparison';

const ITEMS_PER_PAGE = 10;

const extractCategoryName = (categoryString) => {
  if (!categoryString) return '';
  const parts = categoryString.split('|');
  return parts[0].trim();
};

const DirectoryPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('list');
  const [compareProducts, setCompareProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  
  const getUserCategoryFromUrl = () => {
    const userCategoryParam = searchParams.get('userCategory');
    if (!userCategoryParam) return [];
    // Decode the URL parameter properly, replacing '+' with spaces
    const decodedCategory = decodeURIComponent(userCategoryParam.replace(/\+/g, ' '));
    return [decodedCategory];
  };

  const parseCategoryParam = (categoryParam) => {
    if (!categoryParam) return [];
    return decodeURIComponent(categoryParam)
      .split(',')
      .map(cat => cat.replace(/\+/g, ' '));
  };

  const [selectedFilters, setSelectedFilters] = useState({
    // categories: searchParams.get('category') ? [searchParams.get('category')] : [],
    categories: searchParams.get('category') 
  ? decodeURIComponent(searchParams.get('category'))
      .split(',')
      .map(cat => cat.replace(/\+/g, ' '))
  : [],
    userCategory: getUserCategoryFromUrl(),
    language: [],
    country: [],
    industry: [],
    practiceAreas: [],
    mobileAvailable: [],
    price: [],
  });



  

  // Helper function to extract category name from the format "Category|Value|Boolean"
  const extractCategoryName = (categoryString) => {
    return categoryString.split('|')[0].trim();
  };


  useEffect(() => {
    const initialSearch = searchParams.get('q');
    const initialUserCategory = getUserCategoryFromUrl();
    const initialCategories = parseCategoryParam(searchParams.get('category'));
    
    if (initialSearch) {
      setSearchTerm(initialSearch);
      debouncedSearch(initialSearch);
    } else {
      // Pass the initial filters to fetchProducts
      fetchProducts(1, {
        ...selectedFilters,
        categories: initialCategories,
        userCategory: initialUserCategory
      });
    }
  }, []);


  // const fetchProducts = async (page = 1, filters = selectedFilters) => {
  //   try {
  //     setLoading(true);
      
  //     // Remove userCategory from API filters since we'll handle it client-side
  //     const { userCategory, ...apiFilters } = filters;
      
  //     const response = await fetch('/api/get-all-products', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         page,
  //         limit: ITEMS_PER_PAGE,
  //         filters: apiFilters  // Send filters without userCategory
  //       })
  //     });
  
  //     if (!response.ok) throw new Error('Failed to fetch products');
  
  //     const data = await response.json();
      
  //     if (!data.success) {
  //       throw new Error(data.message || 'Failed to fetch products');
  //     }
  
  //     // Handle userCategory filtering in the frontend
  //     let filteredData = data.products;
  //     if (filters.userCategory?.length > 0) {
  //       filteredData = filteredData.filter(product => {
  //         const productCategories = product.userCategory.map(cat => extractCategoryName(cat));
  //         return filters.userCategory.some(selectedCat => 
  //           productCategories.includes(selectedCat)
  //         );
  //       });
  //     }
  
  //     setProducts(data.products); // Keep original products
  //     setFilteredProducts(filteredData); // Set filtered products
  //     setTotalPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));
  //     setError(null);
  //   } catch (err) {
  //     console.error('Error in fetchProducts:', err);
  //     setError('Failed to load products. Please try again.');
  //     setFilteredProducts([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Modify handleFilterChange to handle userCategory more efficiently
  // const handleFilterChange = (filterType, value) => {
  //   setSelectedFilters(prev => {
  //     const newFilters = {
  //       ...prev,
  //       [filterType]: prev[filterType].includes(value)
  //         ? prev[filterType].filter(item => item !== value)
  //         : [...prev[filterType], value]
  //     };

  //     // Fetch products with the new filters
  //     fetchProducts(1, newFilters);
      
  //     return newFilters;
  //   });
  //   setCurrentPage(1);
  // };

  // // Modify search function to handle userCategory
  // const debouncedSearch = useCallback(
  //   debounce(async (term) => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch('/api/search-product', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ 
  //           searchTerm: term,
  //           page: 1,
  //           limit: ITEMS_PER_PAGE,
  //           filters: {
  //             ...selectedFilters,
  //             userCategory: selectedFilters.userCategory.map(cat => extractCategoryName(cat))
  //           }
  //         })
  //       });
        
  //       if (!response.ok) throw new Error('Search failed');
        
  //       const data = await response.json();
        
  //       if (!data.success) {
  //         throw new Error(data.message || 'Search failed');
  //       }

  //       setProducts(data.products);
  //       setFilteredProducts(data.products);
  //       setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
  //       setCurrentPage(1);
  //       setError(null);
  //     } catch (err) {
  //       console.error('Error in search:', err);
  //       setError('Search failed. Please try again.');
  //       setFilteredProducts([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, 300),
  //   [selectedFilters]
  // );

  // Add useEffect to clean up filters when component unmounts
 
  

  
  // const handleSearchChange = (e) => {
  //   const term = e.target.value;
  //   setSearchTerm(term);
    
  //   if (term) {
  //     setLoading(true); // Set loading immediately when user types
  //     debouncedSearch(term);
  //   } else {
  //     setFilteredProducts(products);
  //     setCurrentPage(1);
  //   }
  // };

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

  // Handle page change
  // const handlePageChange = (newPage) => {
  //   setCurrentPage(newPage);
  //   if (searchTerm) {
  //     debouncedSearch(searchTerm);
  //   } else {
  //     fetchProducts(newPage, selectedFilters);
  //   }
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };


  // here 

  // --- MODIFY THIS FUNCTION ---
const fetchProducts = async (page = 1, filters = selectedFilters) => {
  try {
    setLoading(true);
    
    // Remove userCategory from API filters since we'll handle it client-side
    const { userCategory, ...apiFilters } = filters;
    
    const response = await fetch('/api/get-all-products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page,
        limit: ITEMS_PER_PAGE,
        filters: apiFilters  // Send filters without userCategory
      })
    });

    if (!response.ok) throw new Error('Failed to fetch products');

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch products');
    }

    // Handle userCategory filtering in the frontend
    let filteredData = data.products;
    if (filters.userCategory?.length > 0) {
      filteredData = filteredData.filter(product => {
        const productCategories = product.userCategory.map(cat => extractCategoryName(cat));
        return filters.userCategory.some(selectedCat => 
          productCategories.includes(selectedCat)
        );
      });
    }

    setProducts(data.products); // Keep this for existing functionality
    setFilteredProducts(filteredData); // Keep this for existing functionality
    
    // CHANGE: Use the total count from API for pagination
    setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
    
    setError(null);
  } catch (err) {
    console.error('Error in fetchProducts:', err);
    setError('Failed to load products. Please try again.');
    setFilteredProducts([]);
  } finally {
    setLoading(false);
  }
};

// --- MODIFY THIS FUNCTION ---
const debouncedSearch = useCallback(
  debounce(async (term, page = 1) => {
    try {
      setLoading(true);
      const response = await fetch('/api/search-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          searchTerm: term,
          page: page, // CHANGE: Use the passed page parameter
          limit: ITEMS_PER_PAGE,
          filters: {
            ...selectedFilters,
            userCategory: selectedFilters.userCategory.map(cat => extractCategoryName(cat))
          }
        })
      });
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Search failed');
      }

      setProducts(data.products);
      setFilteredProducts(data.products);
      
      // CHANGE: Use the total count from API for pagination
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
      
      setError(null);
    } catch (err) {
      console.error('Error in search:', err);
      setError('Search failed. Please try again.');
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, 300),
  [selectedFilters]
);

// --- MODIFY THIS FUNCTION ---
const handleSearchChange = (e) => {
  const term = e.target.value;
  setSearchTerm(term);
  
  if (term) {
    setLoading(true);
    // CHANGE: Reset to page 1 for new searches
    setCurrentPage(1);
    debouncedSearch(term, 1);
  } else {
    fetchProducts(1, selectedFilters); // CHANGE: Fetch page 1 when search is cleared
    setCurrentPage(1);
  }
};

// --- MODIFY THIS FUNCTION ---
const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
  
  if (searchTerm) {
    // CHANGE: Pass the page to search
    debouncedSearch(searchTerm, newPage);
  } else {
    // CHANGE: Pass the page to fetchProducts
    fetchProducts(newPage, selectedFilters);
  }
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// --- MODIFY THIS FUNCTION ---
const handleFilterChange = (filterType, value) => {
  setSelectedFilters(prev => {
    const newFilters = {
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    };

    // CHANGE: Reset to page 1 when filters change
    setCurrentPage(1);
    // Fetch products with the new filters
    fetchProducts(1, newFilters);
    
    return newFilters;
  });
};

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileFilterOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    document.body.style.overflow = isMobileFilterOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileFilterOpen]);

  // Pagination component
  const Pagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    // Show ellipsis for large number of pages
    const getPageNumbers = () => {
      const pageNumbers = [];
      let ellipsisAdded = false;

      pages.forEach(page => {
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
        ) {
          pageNumbers.push(page);
        } else if (!ellipsisAdded) {
          pageNumbers.push('...');
          ellipsisAdded = true;
        }
      });

      return pageNumbers;
    };

    return (
      <div className="flex justify-center items-center gap-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50"
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3">...</span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-200'
              }`}
            >
              {page}
            </button>
          )
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-24 pb-8">
          <div className="flex gap-8">
            {/* Filters Section */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-32">
                <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden h-[calc(100vh-8rem)]">
                  <DirectoryFilter
                    selectedFilters={selectedFilters}
                    handleFilterChange={handleFilterChange}
                    setSelectedFilters={setSelectedFilters}
                  />
                </div>
              </div>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden fixed bottom-6 right-6 z-20 p-4 bg-blue-600 text-white rounded-full shadow-lg"
            >
              <FilterIcon className="w-6 h-6" />
            </button>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header Section */}
              <div className="mb-8">
                <div className="bg-white rounded-2xl border border-blue-100 shadow-xl p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Legal Tech Directory
                  </h1>
                  
                  {/* Search and View Toggle */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={searchTerm}
                          onChange={handleSearchChange}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-3 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                      >
                        <Grid className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-3 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                      >
                        <List className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compare Products Bar */}
              {compareProducts.length > 0 && (
                <div className="mb-8">
                  <div className="bg-white rounded-xl shadow-lg p-4 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">
                          {compareProducts.length} products selected for comparison
                        </span>
                      </div>
                      {compareProducts.length === 2 && (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                        >
                          Compare Products
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading products...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-600">{error}</div>
              ) : (
                <>
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2' 
                      : 'grid-cols-1'
                  }`}>
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onCompare={toggleCompareProduct}
                        isCompared={compareProducts.some(p => p.id === product.id)}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {filteredProducts.length > 0 && <Pagination />}
                </>
              )}

              {/* Empty State */}
              {!loading && filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Comparison Modal */}
      <ProductComparison
        products={compareProducts}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <DirectoryFilter
              selectedFilters={selectedFilters}
              handleFilterChange={handleFilterChange}
              setSelectedFilters={setSelectedFilters}
              isMobileView
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectoryPage;