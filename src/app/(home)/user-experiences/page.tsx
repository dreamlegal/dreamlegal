'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import UserExperienceModal from '@/app/(home)/product/[slug]/_component/UserExperienceModal';
import Link from 'next/link';

interface Product {
  id: string;
  slug: string;
  productName: string;
  companyName: string;
  logoUrl: string;
  description: string;
}

const ReviewPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if a product is pre-selected via URL parameter
  useEffect(() => {
    const productSlug = searchParams.get('product');
    
    if (productSlug) {
      fetchProductBySlug(productSlug);
    }
  }, [searchParams]);

  const fetchProductBySlug = async (slug: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/software/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedProduct({
          id: data.id,
          slug: data.slug,
          productName: data.productName,
          companyName: data.companyName,
          logoUrl: data.logoUrl,
          description: data.description
        });
        // Automatically open the modal
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    // Redirect to the product page after successful submission
    if (selectedProduct) {
      router.push(`/product/${selectedProduct.slug}#user-experiences`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-3 border-gray-200 border-t-[#7cc6ee] mx-auto mb-3"></div>
          <p style={{ color: '#334155' }} className="text-sm font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f7fa' }}>
      {/* Header */}
      <div className="bg-white mt-10 shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#1e2556' }}>
                Share Your Experience
              </h1>
              <p className="text-sm mt-1" style={{ color: '#334155' }}>
                Help the legal community by sharing your software experience
              </p>
            </div>
            
            <Link
              href="/"
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md font-medium text-sm hover:bg-gray-50 transition-all duration-200"
              style={{ color: '#1e2556' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {selectedProduct ? (
          // Product Selected - Show product info and review button
          <div className="space-y-6">
            {/* Product Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 relative rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={selectedProduct.logoUrl || '/placeholder-logo.png'}
                      alt={`${selectedProduct.productName} logo`}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: '#1e2556' }}>
                      {selectedProduct.productName}
                    </h2>
                    <p className="text-sm" style={{ color: '#334155' }}>
                      by {selectedProduct.companyName}
                    </p>
                    <p className="text-sm mt-2 max-w-2xl" style={{ color: '#2d2d2d' }}>
                      {selectedProduct.description.length > 200 
                        ? `${selectedProduct.description.substring(0, 200)}...`
                        : selectedProduct.description
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Link
                    href={`/product/${selectedProduct.slug}`}
                    className="px-4 py-2 border border-[#7cc6ee] rounded-md font-medium text-sm text-center hover:bg-[#7cc6ee] hover:text-white transition-all duration-200"
                    style={{ color: '#7cc6ee' }}
                  >
                    View Product
                  </Link>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md font-medium text-sm hover:bg-gray-50 transition-all duration-200"
                    style={{ color: '#334155' }}
                  >
                    Choose Different
                  </button>
                </div>
              </div>
            </div>

            {/* Review CTA */}
            <div className="bg-gradient-to-r from-[#1e2556] to-[#0f1729] rounded-xl p-8 text-center text-white">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4">Ready to share your experience?</h2>
                <p className="text-lg mb-6 opacity-90">
                  Your insights help other legal professionals make informed software decisions.
                </p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-3 bg-white text-[#1e2556] px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Share Your Experience
                </button>
              </div>
            </div>
          </div>
        ) : (
          // No Product Selected - Show search interface
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
                <svg className="w-10 h-10" style={{ color: '#7cc6ee' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-4" style={{ color: '#1e2556' }}>
                Find the Product You've Used
              </h1>
              <p className="text-lg max-w-2xl mx-auto" style={{ color: '#334155' }}>
                Search for the legal software you've experienced and share your insights with the community.
              </p>
            </div>

            {/* Search Card */}
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
              <UserExperienceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
                showProductSearch={true}
              />
              
              <div className="text-center">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-3 px-8 py-4 text-white rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  style={{ backgroundColor: '#1e2556' }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Start Searching for Products
                </button>
                
                
              </div>
            </div>

            
           
          </div>
        )}
      </div>

      {/* Modal for when product is selected */}
      {selectedProduct && (
        <UserExperienceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          productId={selectedProduct.id}
          productName={selectedProduct.productName}
          slug={selectedProduct.slug}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

// Main component with Suspense wrapper
const ReviewPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-gray-200 border-t-[#7cc6ee]"></div>
      </div>
    }>
      <ReviewPageContent />
    </Suspense>
  );
};

export default ReviewPage;