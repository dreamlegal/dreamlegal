import React, { useState } from 'react';
import { ArrowRight, X, Sparkles } from 'lucide-react';
import Alert from '@/components/Alert';

const FormModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyName || !formData.email) {
      setAlert({
        show: true,
        message: 'Please fill in all required fields',
        type: 'error'
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/save-vendor-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setAlert({
        show: true,
        message: 'Thank you for your interest! We\'ll be in touch soon.',
        type: 'success'
      });

      // Clear form after successful submission
      setFormData({
        companyName: '',
        email: '',
        message: ''
      });

    } catch (error) {
      console.error('Submission error:', error);
      setAlert({
        show: true,
        message: error instanceof Error ? error.message : 'Failed to submit form',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#1e2556]/20 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl max-w-md w-full 
                     shadow-2xl transform transition-all duration-500 scale-100 overflow-hidden
                     border border-[#7cc6ee]/20">
          
          {/* Content */}
          <div className="relative p-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 p-2 rounded-full hover:bg-[#f5f7fa] 
                       transition-all duration-300 group"
            >
              <X className="w-5 h-5 text-[#334155] group-hover:text-[#7cc6ee] 
                        transition-colors duration-300" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f5f7fa] rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-[#7cc6ee]" />
                <span className="text-sm font-semibold text-[#7cc6ee]">BECOME A VENDOR</span>
              </div>
              <h2 className="text-3xl font-bold text-[#1e2556]">
                Join Our Marketplace
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#1e2556]">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#7cc6ee]/20 
                         focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
                         transition-all duration-300 placeholder:text-[#334155]/50
                         hover:border-[#7cc6ee]/50"
                  placeholder="Enter your company name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#1e2556]">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#7cc6ee]/20 
                         focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
                         transition-all duration-300 placeholder:text-[#334155]/50
                         hover:border-[#7cc6ee]/50"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#1e2556]">
                  Message (Optional)
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#7cc6ee]/20 
                         focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
                         transition-all duration-300 placeholder:text-[#334155]/50
                         hover:border-[#7cc6ee]/50 min-h-[100px] resize-none"
                  placeholder="Tell us about your company and products..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-3.5 px-4 bg-[#1e2556] 
                       text-white font-medium rounded-xl shadow-lg hover:shadow-xl
                       transition-all duration-300 transform hover:-translate-y-0.5
                       disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="relative flex items-center justify-center gap-2">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="transform group-hover:translate-x-[-4px] transition-transform duration-300">
                        Submit Application
                      </span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;