
import React, { useState, useEffect } from 'react';
import { Bookmark, RefreshCw, ExternalLink, Share2, Trash2, Star, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const BookmarkCard = ({ product, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card 
      className="group relative overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column - Logo */}
          <div className="flex-shrink-0">
            <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 shadow-inner">
              {product.logoUrl ? (
                <img
                  src={product.logoUrl}
                  alt={product.name}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-100">
                  <Bookmark className="w-8 h-8 text-indigo-600" />
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {Array.isArray(product.category) ? product.category.map((cat, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800 border border-indigo-100 shadow-sm"
                    >
                      {cat}
                    </span>
                  )) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-800 border border-indigo-100 shadow-sm">
                      {product.category}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className={`flex items-center gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                <button className="p-2 text-gray-400 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onDelete && onDelete(product.id)} 
                  className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
              {product.description}
            </p>

            {/* Footer Info */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Added {formatDate(product.createdAt || new Date())}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-400" />
                <span>{product.rating || '4.5'}</span>
              </div>
            </div>
          </div>

          {/* Right Column - CTA */}
          <div className="flex-shrink-0 flex flex-col items-end justify-between">
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-lg shadow-indigo-100 hover:shadow-xl hover:shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span className="mr-2">View Details</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


const BookmarksPage = ({ userId }) => {
  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [view, setView] = useState('grid'); // 'grid' or 'list'

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/user-bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      setSavedProducts(data.products);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBookmarks();
    }
  }, [userId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchBookmarks();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleDelete = async (productId) => {
    // Add your delete logic here
    console.log('Delete product:', productId);
  };

  return (
    <div className="min-h-screen p-6 overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-indigo-50/20 shadow-md">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
              <Bookmark className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Bookmarks</h1>
              <p className="text-sm text-gray-600">
                {savedProducts.length} saved items
              </p>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading || isRefreshing}
            className="p-2 text-gray-600 hover:text-indigo-600 rounded-full hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw 
              className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : 'transform transition-transform hover:rotate-180 duration-500'}`} 
            />
          </button>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="max-w-5xl mx-auto space-y-4">
        {loading ? (
          // Enhanced loading skeleton
          [...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : savedProducts.length === 0 ? (
          <Card className="border-dashed border-2">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <Bookmark className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No bookmarks yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start exploring and save your favorite products and services
              </p>
              <button className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                Explore Products
              </button>
            </CardContent>
          </Card>
        ) : (
          savedProducts.map((product) => (
            <BookmarkCard 
              key={product.id} 
              product={product} 
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};



export default BookmarksPage;




























