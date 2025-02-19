import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBookmark } from 'react-icons/fa6';
import { FiShare2 } from 'react-icons/fi';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { useAuth } from '@/context/authContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Category icons mapping
const userCategories = [
  { name: "Law firms", icon: "/lawfirmicon.svg" },
  { name: "Individual Practitioner", icon: "/prac.svg" },
  { name: "Government departments", icon: "/govdepticon.svg" },
  { name: "Startups", icon: "/startupicon.svg" },
  { name: "Enterprises", icon: "/enterpriceicon.svg" },
  { name: "Judiciary", icon: "/judge1.svg" },
  { name: "In-House Counsels", icon: "/lawyers.svg" },
];

const ProductCard = ({ 
  product, 
  onCompare, 
  isCompared = false,
  className = '' 
}) => {
  const { userId, userType } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [tooltip, setTooltip] = useState('');

  console.log(product);

  // Check bookmark status when component mounts or userId changes
  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!userId) return;
      
      try {
        const response = await fetch("/api/check-bookmark", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, productId: product.id }),
        });
        
        if (response.ok) {
          const { isBookmarked } = await response.json();
          setIsBookmarked(isBookmarked);
        }
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    };

    checkBookmarkStatus();
  }, [userId, product.id]);

  // Set share URL when component mounts
  useEffect(() => {
    setShareUrl(`${window.location.origin}/product/${product.slug}`);
  }, [product.slug]);

  // Handle bookmark toggle
  const handleBookmarkClick = async () => {
    if (userType === "vendor") {
      showTooltip("Vendors cannot bookmark products");
      return;
    }
    
    if (!userId) {
      showTooltip("Please log in to bookmark products");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/save-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId, 
          productId: product.id,
          idForBookmark: product.id,
          userOrgType: userType,
          country: product.company?.headQuaters || null
        }),
      });

      if (response.ok) {
        setIsBookmarked(!isBookmarked);
        showTooltip(isBookmarked ? "Product removed from bookmarks" : "Product bookmarked");
      } else {
        throw new Error('Failed to toggle bookmark');
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
      showTooltip("Failed to update bookmark");
    } finally {
      setLoading(false);
    }
  };

  // Show tooltip message temporarily
  const showTooltip = (message) => {
    setTooltip(message);
    setTimeout(() => setTooltip(''), 3000);
  };

  // Handle share link copy
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showTooltip("Link copied to clipboard!");
    } catch (error) {
      showTooltip("Failed to copy link");
    }
  };

  // Parse user categories and match with icons
  const userCategoryIcons = product.userCategory
    .map(category => {
      const [name] = category.split("|");
      return userCategories.find(cat => cat.name === name) || null;
    })
    .filter(Boolean);

  // Calculate average rating
  const calculateRating = () => {
    if (!product.Review?.length) return 'N/A';
    
    const total = product.Review.reduce((acc, review) => {
      const rating = parseFloat(review.overallExperienc) || 0;
      return acc + rating;
    }, 0);
    
    return (total / product.Review.length).toFixed(1);
  };

  const avgRating = calculateRating();

  return (
    <div className={`relative bg-white rounded-xl shadow-lg transition-all duration-300 
                   hover:shadow-xl ${className}`}>
      {/* Compare Badge */}
      {isCompared && (
        <div className="absolute -top-2 -right-2 bg-blue-600 text-white px-3 py-1 
                     rounded-full text-xs font-medium shadow-lg z-10">
          Selected for Comparison
        </div>
      )}

      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-4">
          {/* Logo and Title */}
          <div className="flex items-start gap-4">
            <div className="relative group">
            <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm bg-white">
      <img
        src={product.logoUrl}
        alt={product.name}
        className="w-full h-full object-contain p-2 transition-transform duration-300 
                   group-hover:scale-110"
      />
    </div>
              {product.featured && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 
                             to-yellow-500 text-white text-xs px-2 py-1 rounded-full 
                             shadow-sm">
                  Featured
                </span>
              )}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.category.map(cat => (
                  <span key={cat} className="inline-flex items-center px-3 py-1 rounded-full 
                                         text-xs font-medium bg-blue-50 text-blue-700">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Bookmark Button */}
            <button
              onClick={handleBookmarkClick}
              disabled={loading}
              className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 
                     relative"
            >
              <FaBookmark
                className={`w-5 h-5 ${
                  isBookmarked ? 'text-blue-600' : 'text-gray-400'
                } transition-colors duration-200`}
              />
              {tooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 
                            mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg 
                            whitespace-nowrap z-20">
                  {tooltip}
                </div>
              )}
            </button>

            {/* Share Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors 
                               duration-200">
                  <FiShare2 className="w-5 h-5 text-gray-400" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Share Product</DialogTitle>
                  <DialogDescription>
                    Share this product with your network
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 p-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="flex-1 px-3 py-2 border rounded-lg bg-gray-50"
                    />
                    <Button onClick={handleCopyLink} variant="outline">
                      Copy
                    </Button>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Compare Button */}
            <button
              onClick={() => onCompare(product)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all 
                       duration-200 ${
                         isCompared
                           ? 'bg-blue-50 text-blue-600'
                           : 'text-gray-600 hover:bg-gray-50'
                       }`}
            >
              {isCompared ? 'Remove Compare' : 'Compare'}
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="mt-4 text-gray-600 text-base line-clamp-2">
          {product.description}
        </p>

        {/* Features Grid */}
        {/* <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Deployment</p>
            <div className="flex flex-wrap gap-1">
              {product.deployement?.map(type => (
                <span key={type} className="text-xs font-medium text-gray-900">
                  {type}
                </span>
              ))}
            </div>
          </div>

         
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Mobile App</p>
            <p className="text-xs font-medium text-gray-900">
              {product.mobileAvailable === "Yes" ? "Available" : "Not Available"}
            </p>
          </div>

         
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">Free Trial</p>
            <p className="text-xs font-medium text-gray-900">
              {product.freeTrial ? "Available" : "Not Available"}
            </p>
          </div>

         
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 mb-1">User Rating</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-semibold text-yellow-500">
                {avgRating}
              </span>
              {avgRating !== 'N/A' && (
                <span className="text-xs text-gray-500">/5</span>
              )}
            </div>
          </div>
        </div> */}

        {/* Target Users */}
        <div className="mt-6">
          <p className="text-xs text-gray-500 mb-2">Target Users</p>
          <div className="flex flex-wrap gap-3">
            {userCategoryIcons.map(category => (
              <div
                key={category.name}
                className="group relative flex items-center p-2 bg-gray-50 rounded-lg 
                         hover:bg-blue-50 transition-colors duration-200"
              >
                <img
                  src={category.icon}
                  alt={category.name}
                  className="w-5 h-5"
                />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 
                              mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded 
                              opacity-0 group-hover:opacity-100 transition-opacity 
                              duration-200 whitespace-nowrap z-10">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4">
              <div>
              <p className="text-xs text-gray-500">Company</p>
              <p className="text-sm font-medium text-gray-900">
                {product.company?.companyName || product.CompanyName || 'N/A'}
              </p>
              </div>
              <div>
              <p className="text-xs text-gray-500">Headquarters</p>
              <p className="text-sm font-medium text-gray-900">
                {product.company?.headQuaters || product.Headquarters || 'N/A'}
              </p>
              </div>
            </div>
            <Link
              href={`/product/${product.slug}`}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white 
                     rounded-lg hover:bg-blue-700 transition-colors duration-200 
                     group"
            >
              View Details
              <IoIosArrowRoundForward className="w-5 h-5 transition-transform 
                                             duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;