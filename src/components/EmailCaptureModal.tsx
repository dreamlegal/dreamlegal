// components/EmailCaptureModal.tsx
'use client'
import React, { useState } from 'react';
import { X, Mail, Send } from 'lucide-react';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  isLoading: boolean;
}

const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit,
  isLoading 
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }
    
    onSubmit(email);
  };

  const handleChange = (value: string) => {
    setEmail(value);
    if (error) setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1e2556] to-[#7cc6ee] text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Almost Done! 🎉</h2>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-blue-100 text-sm">
            Get your personalized RFP and vendor matches delivered to your inbox
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-[#1e2556] mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="your.email@company.com"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent transition-all ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs mt-1">{error}</p>
            )}
          </div>

          {/* Benefits */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-[#1e2556] mb-2">
              What you'll receive:
            </h4>
            <ul className="text-sm text-[#334155] space-y-1">
              <li className="flex items-start">
                <span className="text-[#7cc6ee] mr-2">✓</span>
                Your complete RFP document
              </li>
              <li className="flex items-start">
                <span className="text-[#7cc6ee] mr-2">✓</span>
                Top 5 matched vendor recommendations
              </li>
              <li className="flex items-start">
                <span className="text-[#7cc6ee] mr-2">✓</span>
                Direct access links to your personalized pages
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-[#1e2556] text-white hover:bg-opacity-90'
            }`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send to My Email
              </>
            )}
          </button>

          <p className="text-xs text-center text-[#334155]">
            By submitting, you agree to receive email communications about your RFP and vendor matches.
          </p>
        </form>
      </div>
    </div>
  );
};

export default EmailCaptureModal;