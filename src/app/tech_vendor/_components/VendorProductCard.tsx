"use client";
import React, { useState } from "react";
import { Eye, Star, Plus, Edit2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import Alert from '@/components/Alert';
import PremiumInfoModal from './PremiumInfoModal';

function VendorProductCard({ 
  slug,
  id, 
  image, 
  title, 
  description,
  company,
  category,
  vendorId,
  onProductUpdated,
  showAlert: parentShowAlert,
  tag,
  hasPremiumInfo,
  isPremium
}) {
  const router = useRouter();
  const [alert, setAlert] = useState(null);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Use parent alert function if provided, otherwise use local
  const showAlert = (message, type = 'success') => {
    if (parentShowAlert) {
      parentShowAlert(message, type);
    } else {
      setAlert({ message, type });
      // Auto dismiss after 3 seconds
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  };

  const handleView = () => {
    window.location.href = `/product/${slug}`; 
  };

  const handleAddPremiumInfo = () => {
    setIsEditMode(false);
    setShowPremiumModal(true);
  };

  const handleEditPremiumInfo = () => {
    setIsEditMode(true);
    setShowPremiumModal(true);
  };

  const handlePremiumInfoSaved = (updatedProduct) => {
    setShowPremiumModal(false);
    if (onProductUpdated) {
      onProductUpdated(updatedProduct);
    }
    showAlert(isEditMode ? "Premium information updated successfully!" : "Premium information added successfully!", "success");
  };

  // Format category for display
  const formatCategory = (category) => {
    return category?.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden">
      {/* Alert Component */}
      {alert && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert(null)} 
        />
      )}

      {/* Premium Info Modal */}
      <PremiumInfoModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSave={handlePremiumInfoSaved}
        productId={id}
        vendorId={vendorId}
        isEditMode={isEditMode}
      />

      {/* Product Header */}
      <div className="p-5">
        {/* Premium Badge */}
        {tag && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <Star size={12} />
              {tag}
            </span>
          </div>
        )}

        {/* Product Info */}
        <div className="flex items-start space-x-4 mb-4">
          <img
            src={image || '/placeholder-product.png'}
            alt={title}
            className="w-16 h-16 rounded-lg object-cover border border-gray-200 flex-shrink-0"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-product.png';
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
            <p className="text-sm text-indigo-600 font-medium">{company}</p>
            <p className="text-xs text-gray-500 mb-2">{formatCategory(category)}</p>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleView}
              className="inline-flex items-center space-x-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <Eye size={16} />
              <span>View Product</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            {isPremium ? (
              <button
                onClick={handleEditPremiumInfo}
                className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200"
                title="Edit premium information"
              >
                <Edit2 size={14} />
                Edit Premium
              </button>
            ) : (
              <button
                onClick={handleAddPremiumInfo}
                className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200"
                title="Add premium information"
              >
                <Plus size={14} />
                Add Premium
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorProductCard;