import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import ProductCard from '@/app/(home)/directory/_components/ProductCard';
import ProductComparison from '@/app/(home)/directory/_components/ProductComparison';

const ITEMS_PER_PAGE = 12;

// Custom debounce function
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null);
  
  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
};
// . 
// Map category slugs to enum values
const categorySlugToEnum = {
  'contract-lifecycle-management': 'CONTRACT_LIFECYCLE_MANAGEMENT',
  'legal-ai': 'LEGAL_AI',
  'document-management-system': 'DOCUMENT_MANAGEMENT_SYSTEM',
  'litigation-management-and-analytics': 'LITIGATION_MANAGEMENT_AND_ANALYTICS',
  'intellectual-property-management': 'IP_MANAGEMENT',
  'legal-research': 'LEGAL_RESEARCH',
  'e-discovery': 'E_DISCOVERY'
};

const pricingTierOptions = [
  { value: '', label: 'All Pricing' },
  { value: 'BUDGET', label: 'Budget ($)' },
  { value: 'MID_RANGE', label: 'Mid-Range ($$)' },
  { value: 'PREMIUM', label: 'Premium ($$$)' },
  { value: 'ENTERPRISE', label: 'Enterprise ($$$+)' }
];

const ProductsSection = ({ categorySlug, categoryName }) => {
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [compareProducts, setCompareProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPricingTier, setSelectedPricingTier] = useState('');

  // Get category enum from slug
  const categoryEnum = categorySlugToEnum[categorySlug];

  // Initialize on component mount
  useEffect(() => {
    if (categoryEnum) {
      fetchProducts(1, '', '');
    }
  }, [categoryEnum]);

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

  const getFilters = (pricingTier = selectedPricingTier) => {
    const filters = {
      categories: [categoryEnum] // Always filter by current category
    };
    if (pricingTier) {
      filters.pricingTiers = [pricingTier];
    }
    return filters;
  };

  const fetchProducts = async (page = 1, search = searchTerm, pricingTier = selectedPricingTier) => {
    try {
      setLoading(true);
      
      // Choose API endpoint based on whether we have a search term
      const endpoint = search.trim() ? '/api/search-legal-softwares' : '/api/get-legal-softwares';
      const body = search.trim() 
        ? {
            searchTerm: search,
            page,
            limit: ITEMS_PER_PAGE,
            filters: getFilters(pricingTier)
          }
        : {
            page,
            limit: ITEMS_PER_PAGE,
            filters: getFilters(pricingTier)
          };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to fetch products');

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch products');
      }

      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
      setError(null);
      
      // Log premium product info for debugging
      const premiumCount = data.products.filter(p => p.isPremium).length;
      console.log(`Loaded ${data.products.length} products for ${categoryName}, ${premiumCount} are premium`);
      
    } catch (err) {
      console.error('Error in fetchProducts:', err);
      setError('Failed to load products. Please try again.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Custom debounced search function
  const debouncedSearch = useDebounce((term, page = 1) => {
    fetchProducts(page, term);
  }, 300);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setCurrentPage(1);
    
    if (term.trim()) {
      setLoading(true);
      debouncedSearch(term, 1);
    } else {
      fetchProducts(1, '');
    }
  };

  const handlePricingTierChange = (value) => {
    setSelectedPricingTier(value);
    setCurrentPage(1);
    
    setTimeout(() => fetchProducts(1, searchTerm, value), 100);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchProducts(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pagination component
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
      <div className="flex justify-center items-center gap-2 mt-8 px-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors"
        >
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-2 sm:px-3 text-gray-400">...</span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg transition-colors ${
                  currentPage === page
                    ? 'bg-[#1e2556] text-white'
                    : 'border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            )
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors"
        >
          <span className="hidden sm:inline">Next</span>
          <span className="sm:hidden">Next</span>
        </button>
      </div>
    );
  };

  // Don't render if category enum is not found
  if (!categoryEnum) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
    {/* Header Section */}
    <div className="mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Products Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1e2556]">Products</h2>
            
            {/* Search and Pricing Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1 sm:min-w-[300px]">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder={`Search ${categoryName.toLowerCase()} software...`}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 sm:pl-12 pr-4 py-3 text-sm sm:text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
                />
              </div>

              {/* Pricing Tier Filter */}
              <div className="relative sm:min-w-[180px]">
                <select
                  value={selectedPricingTier}
                  onChange={(e) => handlePricingTierChange(e.target.value)}
                  className="appearance-none w-full pl-3 sm:pl-4 pr-8 sm:pr-10 py-3 text-sm sm:text-base rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent bg-white text-[#2d2d2d] cursor-pointer"
                >
                  {pricingTierOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Compare Products Bar */}
        {compareProducts.length > 0 && (
          <div className="mb-6 sm:mb-8">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7cc6ee] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {compareProducts.length}
                  </div>
                  <span className="font-medium text-[#1e2556] text-sm sm:text-base">
                    {compareProducts.length} products selected for comparison
                  </span>
                </div>
                {compareProducts.length === 2 && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto px-4 py-2 bg-[#1e2556] text-white rounded-lg hover:bg-[#1e2556]/90 transition-colors text-sm sm:text-base font-medium"
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
            <div className="animate-spin w-6 h-6 sm:w-8 sm:h-8 border-4 border-[#7cc6ee] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-[#2d2d2d] text-sm sm:text-base">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 text-sm sm:text-base px-4">{error}</div>
          </div>
        ) : (
          <>
            {/* Premium indicator if any premium products are visible */}
            {products.some(p => p.isPremium) && (
              <div className="mb-4 text-sm text-amber-700 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200">
                ⭐ Premium products are highlighted and shown first
              </div>
            )}
            
            {/* Products Grid - 1 column on mobile, 2 columns on laptop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onCompare={toggleCompareProduct}
                  isCompared={compareProducts.some(p => p.id === product.id)}
                />
              ))}
            </div>

            {/* Pagination */}
            {products.length > 0 && <Pagination />}
          </>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-12 px-4">
            <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-medium text-[#1e2556] mb-2">
              No {categoryName.toLowerCase()} products found
            </h3>
            <p className="text-[#2d2d2d] text-sm sm:text-base">
              Try adjusting your search or pricing filter
            </p>
          </div>
        )}
      </div>

      {/* Product Comparison Modal */}
      <ProductComparison
        products={compareProducts}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProductsSection;