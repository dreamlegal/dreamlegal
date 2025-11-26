// components/SuccessModal.tsx
'use client'
import React from 'react';
import { Check, X, ExternalLink, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  rfpId: string | number;
  vendorsMatched: number;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  rfpId,
  vendorsMatched 
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleViewRFP = () => {
    router.push(`/rfp/${rfpId}`);
    onClose();
  };

  const handleViewVendors = () => {
    router.push(`/rfp/${rfpId}/vendors`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-fadeIn">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-lg relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white hover:bg-opacity-20 rounded transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center justify-center mb-3">
            <div className="bg-white bg-opacity-20 rounded-full p-3">
              <Check className="w-12 h-12" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center">Success! 🎉</h2>
          <p className="text-center text-green-50 mt-2">Your RFP has been generated and sent</p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Email Confirmation */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">Email Sent!</p>
                  <p className="text-xs text-blue-700 mt-1">Check your inbox for the complete RFP details</p>
                </div>
              </div>
            </div>

            {/* Vendors Matched */}
            {vendorsMatched > 0 && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-purple-800">{vendorsMatched} Vendors Matched!</p>
                    <p className="text-xs text-purple-700 mt-1">We've found the best matches for your requirements</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleViewRFP}
                className="w-full flex items-center justify-center px-6 py-3 bg-[#1e2556] text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 font-medium"
              >
                <FileText className="w-5 h-5 mr-2" />
                View Your RFP
              </button>

              {vendorsMatched > 0 && (
                <button
                  onClick={handleViewVendors}
                  className="w-full flex items-center justify-center px-6 py-3 bg-[#7cc6ee] text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 font-medium"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View Matched Vendors
                </button>
              )}

              <button
                onClick={onClose}
                className="w-full flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;