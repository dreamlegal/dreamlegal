
import React, { useState, useEffect, useCallback } from 'react';
import { Grid, List, Search, Package, Filter, X, Bell } from 'lucide-react';
import { FaCircleCheck } from 'react-icons/fa6';
import { debounce } from 'lodash';
import ProductCard from "@/app/(home)/directory/_components/ProductCard"
import DirectoryFilter from './DirectoryFilter';
const ITEMS_PER_PAGE = 10;

// Custom Modal Component
const Modal = ({ isOpen, onClose, children, fullWidth = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
  
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className={`
          ${fullWidth 
            ? 'fixed right-0 top-0 bottom-0 w-full max-w-md transform'
            : 'inline-block w-full max-w-5xl my-8 overflow-hidden align-middle'
          } 
          relative z-50 bg-white shadow-xl transition-all rounded-lg
          ${!fullWidth && 'mx-auto'}`
        }>
          {children}
        </div>
      </div>
    </div>
  );
};


const DirectoryPage = () => {
  // State management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewMode, setViewMode] = useState('list');
  const [compareProducts, setCompareProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
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
  const [totalResults, setTotalResults] = useState(0);


// const debouncedSearch = useCallback(
//   debounce(async (term) => {
//     try {
//       setLoading(true);
//       const response = await fetch('/api/search-product', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ 
//           searchTerm: term,
//           page: currentPage,
//           limit: ITEMS_PER_PAGE,
//           filters: selectedFilters
//         })
//       });
      
//       if (!response.ok) throw new Error('Search failed');
      
//       const data = await response.json();
//       setFilteredProducts(data.products);
//       setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
      
//       // Update total results count
//       setTotalResults(data.total);
//     } catch (err) {
//       setError('Search failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   }, 300),
//   [selectedFilters, currentPage]
// );
const debouncedSearch = useCallback(
  debounce(async (term) => {
    try {
      setLoading(true);
      const response = await fetch('/api/search-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          searchTerm: term,
          page: 1, // Reset to page 1 on new search
          limit: ITEMS_PER_PAGE,
          filters: selectedFilters
        })
      });
      
      if (!response.ok) throw new Error('Search failed');
      
      const data = await response.json();
      setFilteredProducts(data.products);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
      setTotalResults(data.total);
      setCurrentPage(1); // Reset page on new search
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, 300),
  [selectedFilters]
);
  
const fetchProducts = async (page = 1, filters = selectedFilters, term = searchTerm) => {
  try {
    setLoading(true);
    const response = await fetch('/api/get-all-products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page,
        limit: ITEMS_PER_PAGE,
        filters,
        searchTerm: term
      })
    });

    if (!response.ok) throw new Error('Failed to fetch products');

    const data = await response.json();
    setFilteredProducts(data.products);
    setTotalResults(data.total);
    setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE)); // Add this line
    setError(null);
  } catch (err) {
    setError('Failed to load products. Please try again.');
  } finally {
    setLoading(false);
  }
};
 
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      debouncedSearch(term);
    } else {
      setFilteredProducts(products);
      setCurrentPage(1);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => {
      const newFilters = {
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter(item => item !== value)
          : [...prev[filterType], value]
      };
      fetchProducts(1, newFilters);
      return newFilters;
    });
    setCurrentPage(1);
  };

  // Handle product comparison
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

  // Initial fetch
  useEffect(() => {
    fetchProducts();
  }, []);

  // Prevent body scroll when filter is open
  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFilterOpen]);

  
const Pagination = () => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

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
        className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50
                 hover:bg-gray-50 transition-colors duration-200"
      >
        Previous
      </button>

      {getPageNumbers().map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="px-3 text-gray-500">...</span>
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              currentPage === page
                ? 'bg-purple-600 text-white'
                : 'border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        )
        ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50
                 hover:bg-gray-50 transition-colors duration-200"
      >
        Next
      </button>
    </div>
  );
};

// Update the handlePageChange function
const handlePageChange = async (newPage) => {
  if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
  
  try {
    setLoading(true);
    const response = await fetch('/api/get-all-products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: newPage,
        limit: ITEMS_PER_PAGE,
        filters: selectedFilters,
        searchTerm: searchTerm
      })
    });

    if (!response.ok) throw new Error('Failed to fetch products');

    const data = await response.json();
    setFilteredProducts(data.products);
    setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    setError('Failed to load products. Please try again.');
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50">
      {/* Header */}

    <div className="w-full bg-gradient-to-b from-white via-purple-50/30 to-gray-50">
      {/* Top decorative line */}
     
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Header Section with floating effect */}
          <div className="space-y-3 animate-fade-in">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent
                          hover:scale-[1.01] transform transition-transform duration-300">
              Directory Search
            </h1>
            <p className="text-gray-600 text-lg font-medium pl-1">
              Find and compare the perfect products for your needs
            </p>
          </div>
          
          {/* Search and Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-6 
                          backdrop-blur-sm bg-white/50 p-6 rounded-2xl shadow-lg">


          
          
            {/* Search Bar with enhanced effects */}
            <div className="relative w-full sm:max-w-xl group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 group-hover:scale-110 
                                 transition-all duration-300" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200/80 rounded-xl bg-white/90
                         focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         transition-all duration-300 hover:shadow-xl shadow-md
                         backdrop-blur-sm hover:bg-white"
              />
              {/* Decorative gradient ring */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 opacity-0 
                            group-hover:opacity-10 -z-10 blur-xl transition-opacity duration-300" />
            </div>

            {/* Controls with enhanced styling */}
            <div className="flex items-center gap-4">
              {/* Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-gray-200/80 rounded-xl text-gray-700
                         hover:bg-white hover:border-purple-200 hover:text-purple-600 
                         transition-all duration-300 shadow-md hover:shadow-xl
                         bg-white/90 backdrop-blur-sm hover:scale-105"
              >
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filters</span>
              </button>

              {/* View Toggle with glassmorphism */}
              <div className="flex items-center gap-1 p-1.5 bg-white/80 rounded-xl shadow-lg backdrop-blur-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-purple-500 text-white shadow-md scale-105'
                      : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-purple-500 text-white shadow-md scale-105'
                      : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>

              {/* Notifications with pulse effect */}
              <button className="p-3 rounded-xl hover:bg-white transition-all duration-300 relative group
                               shadow-md hover:shadow-xl bg-white/90 backdrop-blur-sm hover:scale-105">
                <Bell className="h-5 w-5 text-gray-500 group-hover:text-purple-600 transition-colors duration-300" />
                <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full 
                                animate-pulse ring-2 ring-red-500 ring-opacity-50" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  
      {/* Main Content */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Compare Products Bar */}
        {compareProducts.length > 0 && (
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-lg p-4 border border-purple-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-purple-600" />
                  <span className="font-medium">
                    {compareProducts.length} products selected for comparison
                  </span>
                </div>
                {compareProducts.length === 2 && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700
                           transition-colors duration-200"
                  >
                    Compare Products
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {loading && filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">{error}</div>
        ) : (
          <>
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onCompare={toggleCompareProduct}
                  isCompared={compareProducts.some(p => p.id === product.id)}
                  viewMode={viewMode}
                />
              ))}
            </div>

          
{filteredProducts.length > 0 && totalPages > 1 && <Pagination />}

          </>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && !loading && (
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

      {/* Filter Modal */}
      <Modal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} fullWidth>
        <div className="h-full flex flex-col bg-white">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={() => setIsFilterOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* DirectoryFilter component would go here */}
        </div>
      </Modal>

      {/* Comparison Modal */}
      <ProductComparison
        compareProducts={compareProducts}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {/* Filter Modal */}
      <Modal isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} fullWidth>
        <DirectoryFilter
          selectedFilters={selectedFilters}
          handleFilterChange={handleFilterChange}
          setSelectedFilters={setSelectedFilters}
          onClose={() => setIsFilterOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default DirectoryPage;



const TagsSection = ({ items }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={index}
          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
        >
          {item}
        </span>
      ))}
    </div>
  );
};

const DeploymentSection = ({ options }) => {
  return (
    <div className="flex flex-col gap-1">
      {options.map((option, index) => (
        <span key={index} className="text-sm text-gray-600">
          {option}
        </span>
      ))}
    </div>
  );
};

const ComparisonSection = ({ title, content1, content2 }) => {
  return (
    <div className="flex border-b border-gray-200">
      <div className="w-1/2 border-r border-gray-200 p-4">
        <h3 className="font-medium mb-2">{title}</h3>
        {content1}
      </div>
      <div className="w-1/2 p-4">
        <h3 className="font-medium mb-2">{title}</h3>
        {content2}
      </div>
    </div>
  );
};

const ProductComparison = ({ isOpen, onClose, compareProducts }) => {
  if (!compareProducts || compareProducts.length !== 2) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Product Comparison</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto">
          <div className="bg-white rounded-lg border border-gray-200">
            {/* Headers */}
            <div className="flex bg-gray-50 border-b border-gray-200">
              <div className="w-1/2 border-r border-gray-200 p-4 text-center font-medium">
                {compareProducts[0].name}
              </div>
              <div className="w-1/2 p-4 text-center font-medium">
                {compareProducts[1].name}
              </div>
            </div>

            {/* Logos */}
            <div className="flex border-b border-gray-200">
              <div className="w-1/2 border-r border-gray-200 p-6 flex justify-center">
                <img
                  src={compareProducts[0].logoUrl}
                  alt={compareProducts[0].name}
                  className="h-20 w-20 object-contain"
                />
              </div>
              <div className="w-1/2 p-6 flex justify-center">
                <img
                  src={compareProducts[1].logoUrl}
                  alt={compareProducts[1].name}
                  className="h-20 w-20 object-contain"
                />
              </div>
            </div>

            {/* Description */}
            <ComparisonSection
              title="Description"
              content1={<p className="text-sm text-gray-600">{compareProducts[0].description}</p>}
              content2={<p className="text-sm text-gray-600">{compareProducts[1].description}</p>}
            />

            {/* Categories */}
            <ComparisonSection
              title="Categories"
              content1={<TagsSection items={compareProducts[0].category} />}
              content2={<TagsSection items={compareProducts[1].category} />}
            />

            {/* Deployment */}
            <ComparisonSection
              title="Deployment Options"
              content1={<DeploymentSection options={compareProducts[0].deployement} />}
              content2={<DeploymentSection options={compareProducts[1].deployement} />}
            />

            {/* Mobile Availability */}
            <ComparisonSection
              title="Mobile Availability"
              content1={
                <span className={`text-sm ${compareProducts[0].mobileAvailable === 'Yes' ? 'text-green-600' : 'text-gray-600'}`}>
                  {compareProducts[0].mobileAvailable === 'Yes' ? 'Available' : 'Not Available'}
                </span>
              }
              content2={
                <span className={`text-sm ${compareProducts[1].mobileAvailable === 'Yes' ? 'text-green-600' : 'text-gray-600'}`}>
                  {compareProducts[1].mobileAvailable === 'Yes' ? 'Available' : 'Not Available'}
                </span>
              }
            />

            {/* Target Users */}
            <ComparisonSection
              title="Target Users"
              content1={<TagsSection items={compareProducts[0].userCategory} />}
              content2={<TagsSection items={compareProducts[1].userCategory} />}
            />

            {/* Industries */}
            <ComparisonSection
              title="Target Industries"
              content1={<TagsSection items={compareProducts[0].industry} />}
              content2={<TagsSection items={compareProducts[1].industry} />}
            />

            {/* Practice Areas */}
            <ComparisonSection
              title="Practice Areas"
              content1={<TagsSection items={compareProducts[0].practiceAreas} />}
              content2={<TagsSection items={compareProducts[1].practiceAreas} />}
            />

            {/* Integration */}
            {compareProducts[0].integration && compareProducts[1].integration && (
              <ComparisonSection
                title="Integrations"
                content1={<TagsSection items={compareProducts[0].integration} />}
                content2={<TagsSection items={compareProducts[1].integration} />}
              />
            )}

            {/* Pricing Model */}
            {compareProducts[0].pricingModel && compareProducts[1].pricingModel && (
              <ComparisonSection
                title="Pricing Model"
                content1={<TagsSection items={compareProducts[0].pricingModel} />}
                content2={<TagsSection items={compareProducts[1].pricingModel} />}
              />
            )}

            {/* Free Trial */}
            <ComparisonSection
              title="Free Trial"
              content1={
                <span className={`text-sm ${compareProducts[0].freeTrial ? 'text-green-600' : 'text-gray-600'}`}>
                  {compareProducts[0].freeTrial ? 'Available' : 'Not Available'}
                </span>
              }
              content2={
                <span className={`text-sm ${compareProducts[1].freeTrial ? 'text-green-600' : 'text-gray-600'}`}>
                  {compareProducts[1].freeTrial ? 'Available' : 'Not Available'}
                </span>
              }
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
