'use client';

import { useState, useEffect, useRef } from 'react';

interface Software {
  id: string;
  slug: string;
  productName: string;
  companyName: string;
  logoUrl: string;
  category: string;
  description: string;
}

interface SearchModalProps {
  onClose: () => void;
  onSelect: (software: Software) => void;
  excludeSlugs: string[];
}

export default function SearchModal({ onClose, onSelect, excludeSlugs }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Software[]>([]);
  const [loading, setLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus on search input when modal opens
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.length >= 2) {
        searchSoftware();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, excludeSlugs]);

  const searchSoftware = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        q: searchQuery,
        exclude: excludeSlugs.join(',')
      });

      const response = await fetch(`/api/software/search?${params}`);
      const data = await response.json();

      if (data.success) {
        setSearchResults(data.software);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatCategory = (category: string) => {
    return category.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Search Software</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Search Input */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for software by name, company, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}

          {!loading && searchQuery.length >= 2 && searchResults.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No software found matching your search.
            </div>
          )}

          {!loading && searchQuery.length > 0 && searchQuery.length < 2 && (
            <div className="text-center py-8 text-gray-500">
              Please enter at least 2 characters to search.
            </div>
          )}

          {!loading && searchQuery.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Start typing to search for software...
            </div>
          )}

          <div className="space-y-3">
            {searchResults.map((software) => (
              <div
                key={software.id}
                onClick={() => onSelect(software)}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <img
                  src={software.logoUrl}
                  alt={software.productName}
                  className="w-12 h-12 rounded-lg mr-4 object-contain"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{software.productName}</h3>
                  <p className="text-sm text-gray-600">{software.companyName}</p>
                  <p className="text-xs text-blue-600 mt-1">{formatCategory(software.category)}</p>
                </div>
                <div className="text-blue-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}