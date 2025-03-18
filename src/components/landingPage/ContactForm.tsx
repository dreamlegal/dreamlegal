import React, { useState } from "react";
import { X, ArrowRight, Sparkles } from 'lucide-react';

// Alert component
const Alert = ({ message, type, onClose }: { message: string; type: string; onClose: () => void }) => {
  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 ${
      type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
      'bg-red-50 text-red-700 border border-red-200'
    }`}>
      <div className="flex-1">{message}</div>
      <button 
        onClick={onClose}
        className="p-1 hover:bg-white/80 rounded-full transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

const ContactForm = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({
    email: '',
    organization: '',
    designation: '',
    message: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await fetch('/api/save-commonLead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
  
      // Success handling
      setAlert({
        show: true,
        message: 'Your message has been sent successfully!',
        type: 'success'
      });
  
      // Reset form
      setFormData({
        email: '',
        organization: '',
        designation: '',
        message: ''
      });
  
      // Close form after delay
      setTimeout(() => {
        onClose();
      }, 3000);
  
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
      
      <div 
        className="fixed inset-0 bg-[#1e2556]/10 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl max-w-md w-full shadow-2xl 
                     transform transition-all duration-500 scale-100 overflow-hidden
                     border border-[#7cc6ee]/20">

          <div className="relative p-8">
            <button
              onClick={onClose}
              className="absolute right-6 top-6 p-2 rounded-full hover:bg-[#7cc6ee]/10 
                       transition-all duration-300 group"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-[#7cc6ee] 
                        transition-colors duration-300" />
            </button>

            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#7cc6ee] animate-pulse" />
                <span className="text-sm font-semibold text-[#7cc6ee] tracking-wider">
                  CONTACT US
                </span>
              </div>
              <h2 className="text-3xl font-bold text-[#1e2556] mb-2">
                Get in touch
              </h2>
              <p className="text-[#334155]">
                We'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-4">
                <div className="space-y-2 flex-1">
                  <label className="block text-sm font-semibold text-[#1e2556]">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 
                                   focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
                                   transition-all duration-300 placeholder:text-gray-400
                                   hover:border-[#7cc6ee]/50 hover:bg-white/80"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <label className="block text-sm font-semibold text-[#1e2556]">
                    Organization
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 
                                   focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
                                   transition-all duration-300 placeholder:text-gray-400
                                   hover:border-[#7cc6ee]/50 hover:bg-white/80"
                    placeholder="Enter your organization"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#1e2556]">
                  Designation
                </label>
                <input
                  type="text"
                  required
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 
                           focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
                           transition-all duration-300 placeholder:text-gray-400
                           hover:border-[#7cc6ee]/50 hover:bg-white/80"
                  placeholder="Enter your designation"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-[#1e2556]">
                  Message
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 
                           focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
                           transition-all duration-300 placeholder:text-gray-400
                           hover:border-[#7cc6ee]/50 hover:bg-white/80 resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full py-3.5 px-4 bg-[#1e2556]
                       hover:bg-[#161c44] text-white font-medium
                       rounded-xl shadow-lg shadow-[#1e2556]/25 hover:shadow-xl
                       hover:shadow-[#1e2556]/30 transition-all duration-300
                       focus:ring-2 focus:ring-[#7cc6ee]/20 focus:ring-offset-2
                       overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="relative flex items-center justify-center gap-2">
                  <span className="transform group-hover:translate-x-[-4px] transition-transform duration-300">
                    {isLoading ? 'Submitting...' : 'Send Message'}
                  </span>
                  {!isLoading && (
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </div>
                <div className="absolute inset-0 bg-[#7cc6ee]/10
                             opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;