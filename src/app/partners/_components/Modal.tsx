import React, { useState } from 'react';
import { ArrowRight, X, Sparkles, ChevronDown } from 'lucide-react';
import Alert from '@/components/Alert';

const CategorySelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const categories = [
    "For Legal Tech Companies",
    "For Legal Services Providers",
    "For Legal Ops/Legal Tech Consulting Companies"
  ];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 hover:border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 text-left flex items-center justify-between"
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>
          {value || "Select category"}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300">
          <div className="max-h-64 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => {
                  onChange(category);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-200 ${category === value ? "bg-blue-50 text-blue-600" : "text-gray-700"} flex items-center gap-2`}
              >
                <span className={`w-2 h-2 rounded-full ${category === value ? "bg-blue-600" : "bg-gray-300"}`} />
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Modal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.email) {
      setAlert({
        show: true,
        message: 'Please fill in all fields',
        type: 'error'
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/save-partners-leads', {
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
        message: 'Thank you for joining our network!',
        type: 'success'
      });

      // Clear form after successful submission
      setFormData({
        name: '',
        category: '',
        email: ''
      });

      // Optional: Close modal after success
      // setTimeout(onClose, 2000);

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
        className="fixed inset-0 bg-gray-900/10 backdrop-blur-sm transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-gradient-to-b from-white to-blue-50/50 rounded-3xl max-w-md w-full 
                     shadow-2xl transform transition-all duration-500 scale-100 overflow-hidden
                     border border-blue-100">
          
          {/* Content */}
          <div className="relative p-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 p-2 rounded-full hover:bg-blue-50 
                       transition-all duration-300 group"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-blue-600 
                        transition-colors duration-300" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-600">JOIN OUR NETWORK</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 
                         bg-clip-text text-transparent">
                Get Started Today
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         transition-all duration-300 placeholder:text-gray-400
                         hover:border-blue-200"
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Category
                </label>
                <CategorySelector
                  value={formData.category}
                  onChange={(value) => setFormData({ ...formData, category: value })}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 
                         focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         transition-all duration-300 placeholder:text-gray-400
                         hover:border-blue-200"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 
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
                        Join Network
                      </span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;