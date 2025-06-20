"use client";
import React, { useState, useEffect } from 'react';
import { Search, Package, Trash2, Loader2, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ITEMS_PER_PAGE = 10;

// Custom Notification Component
const Notification = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg text-white ${
    type === 'success' ? 'bg-green-600' : 'bg-red-600'
  } shadow-lg animate-slide-in`}>
    <span>{message}</span>
    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded">
      <X className="w-4 h-4" />
    </button>
  </div>
);

const AllProductAdmin = () => {
  // State management
  const [software, setSoftware] = useState([]);
  const [filteredSoftware, setFilteredSoftware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [deletingItems, setDeletingItems] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  
  // State for metadata modal
  const [metadataModalOpen, setMetadataModalOpen] = useState(false);
  const [selectedSoftware, setSelectedSoftware] = useState(null);

  // Show notification helper
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Fetch legal software with pagination
  const fetchSoftware = async (page = 1, search = '') => {
    try {
      setLoading(true);
      const endpoint = search ? '/api/search-legal-software' : '/api/get-legal-software';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page,
          limit: ITEMS_PER_PAGE,
          searchTerm: search
        })
      });

      if (!response.ok) throw new Error('Failed to fetch legal software');

      const data = await response.json();
      
      setSoftware(data.software);
      setFilteredSoftware(data.software);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
      setError(null);
    } catch (err) {
      setError('Failed to load legal software. Please try again.');
      showNotification('Failed to load legal software', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const newTimeout = setTimeout(() => {
      setCurrentPage(1);
      fetchSoftware(1, term);
    }, 300);

    setSearchTimeout(newTimeout);
  };

  // Handle software selection
  const toggleSoftwareSelection = (softwareId) => {
    setSelectedItems(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(softwareId)) {
        newSelection.delete(softwareId);
      } else {
        newSelection.add(softwareId);
      }
      return newSelection;
    });
  };

  // Handle bulk select/deselect
  const handleSelectAll = () => {
    if (selectedItems.size === filteredSoftware.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredSoftware.map(s => s.id)));
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedItems.size === 0) return;
    
    if (!confirm('Are you sure you want to delete the selected legal software? This action cannot be undone.')) return;
    
    setDeletingItems(true);
    try {
      const response = await fetch('/api/bulk-delete-legal-software', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedItems) })
      });

      if (!response.ok) {
        throw new Error('Failed to delete legal software');
      }

      await fetchSoftware(currentPage, searchTerm);
      setSelectedItems(new Set());
      showNotification('Selected legal software have been deleted successfully');
    } catch (error) {
      console.error('Error deleting legal software:', error);
      showNotification('Failed to delete legal software', 'error');
    } finally {
      setDeletingItems(false);
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchSoftware(newPage, searchTerm);
  };

  // Handlers for metadata editing
  const handleOpenMetadataModal = (software) => {
    setSelectedSoftware(software);
    setMetadataModalOpen(true);
  };

  const handleCloseMetadataModal = () => {
    setMetadataModalOpen(false);
    setSelectedSoftware(null);
  };

  const handleMetadataSave = (updatedSoftware) => {
    // Update the software in the local state
    setSoftware(prevSoftware => 
      prevSoftware.map(s => s.id === updatedSoftware.id ? updatedSoftware : s)
    );
    setFilteredSoftware(prevSoftware => 
      prevSoftware.map(s => s.id === updatedSoftware.id ? updatedSoftware : s)
    );
    showNotification('Metadata updated successfully');
  };

  // Initial fetch
  useEffect(() => {
    fetchSoftware();
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 p-6">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      
      {/* Metadata Modal */}
      {metadataModalOpen && selectedSoftware && (
        <MetadataModal
          software={selectedSoftware}
          onClose={handleCloseMetadataModal}
          onSave={handleMetadataSave}
        />
      )}
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl border border-blue-100 shadow-xl p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Legal Software Admin
            </h1>
            
            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search legal software..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSelectAll}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  {selectedItems.size === filteredSoftware.length 
                    ? 'Deselect All' 
                    : 'Select All'}
                </Button>

                {selectedItems.size > 0 && (
                  <Button
                    onClick={handleBulkDelete}
                    disabled={deletingItems}
                    variant="destructive"
                  >
                    {deletingItems ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 mr-2" />
                    )}
                    Delete ({selectedItems.size})
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Software List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading legal software...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSoftware.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => toggleSoftwareSelection(item.id)}
                      className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <img
                      src={item.logoUrl}
                      alt={item.productName}
                      className="h-16 w-16 object-contain rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.companyName}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                          {item.category?.replace(/_/g, ' ')}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                          {item.pricingTier?.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/product/edit/${item.id}`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Edit
                      </Link>
                      <Button
                        onClick={() => handleOpenMetadataModal(item)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Metadata
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredSoftware.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No legal software found
                </h3>
                <p className="text-gray-600">
                  {searchTerm ? 'Try adjusting your search' : 'No legal software available'}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50"
                >
                  Previous
                </Button>

                {(() => {
                  const pageNumbers = [];
                  let ellipsisAdded = false;

                  for (let i = 1; i <= totalPages; i++) {
                    if (
                      i === 1 ||
                      i === totalPages ||
                      (i >= currentPage - 1 && i <= currentPage + 1)
                    ) {
                      pageNumbers.push(
                        <Button
                          key={i}
                          onClick={() => handlePageChange(i)}
                          className={`px-4 py-2 rounded-lg ${
                            currentPage === i
                              ? 'bg-blue-600 text-white'
                              : 'border border-gray-200'
                          }`}
                        >
                          {i}
                        </Button>
                      );
                    } else if (!ellipsisAdded) {
                      pageNumbers.push(
                        <span key={`ellipsis-${i}`} className="px-3">
                          ...
                        </span>
                      );
                      ellipsisAdded = true;
                    }
                  }

                  return pageNumbers;
                })()}

                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                  className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

// Metadata Modal Component
const MetadataModal = ({ software, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    metaTitle: software.metaTitle || '',
    metaDescription: software.metaDescription || '',
    ogTitle: software.ogTitle || '',
    ogDescription: software.ogDescription || '',
    ogImage: software.ogImage || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/update-legal-software-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          softwareId: software.id,
          ...formData
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update metadata');
      }

      const data = await response.json();
      onSave(data.software);
      onClose();
    } catch (err) {
      setError('Failed to update metadata. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Edit SEO Metadata - {software.productName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title (SEO)
              </label>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="SEO optimized title (50-60 characters)"
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.metaTitle.length} characters (recommended: 50-60)
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description (SEO)
              </label>
              <textarea
                name="metaDescription"
                value={formData.metaDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="SEO optimized description (150-160 characters)"
              />
              <p className="mt-1 text-sm text-gray-500">
                {formData.metaDescription.length} characters (recommended: 150-160)
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OG Title (Social Sharing)
              </label>
              <input
                type="text"
                name="ogTitle"
                value={formData.ogTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Open Graph title for social sharing"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OG Description (Social Sharing)
              </label>
              <textarea
                name="ogDescription"
                value={formData.ogDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Open Graph description for social sharing"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OG Image URL (Social Sharing)
              </label>
              <input
                type="text"
                name="ogImage"
                value={formData.ogImage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="URL for Open Graph image"
              />
              {formData.ogImage && (
                <div className="mt-2 border p-2 rounded-md">
                  <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                  <img 
                    src={formData.ogImage} 
                    alt="OG Image Preview" 
                    className="max-h-32 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Metadata'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AllProductAdmin;