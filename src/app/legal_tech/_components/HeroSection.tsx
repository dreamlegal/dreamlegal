
// import React from 'react';
// import { ArrowRight } from 'lucide-react';

// const HeroSection = () => {
//   return (
//     <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         {/* Background image with people in office setting */}
//         <div 
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: `url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
//           }}
//         ></div>
        
//         {/* Dark overlay to match original */}
//         <div 
//           className="absolute inset-0" 
//           style={{ backgroundColor: 'rgba(30, 37, 86, 0.85)' }}
//         ></div>
        
//         {/* Additional gradient overlay for better text readability */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
//       </div>

//       {/* Content Container */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
//         <div className="max-w-3xl mr-auto">
//           {/* Main Heading */}
//           <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 text-white tracking-tight text-left">
//             Be The First Choice {' '}
//             <span className="block">Of Legal Teams</span>
//           </h1>

//           {/* Subtitle */}
//           <p className="text-xl sm:text-2xl lg:text-2xl mb-10 text-white/95 leading-relaxed max-w-2xl font-light text-left">
//             High-intent leads and market insights for  legal tech companies
//           </p>

//           {/* CTA Button */}
//           <div className="mb-8 text-left">
//             <a 
//               href="#contact" 
//               className="inline-flex items-center px-10 py-5 text-xl font-semibold text-white rounded-md transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-2xl shadow-lg"
//               style={{ backgroundColor: '#1e2556' }}
//             >
//               Talk to us
//             </a>
//           </div>

//           {/* Secondary Link */}
//           <div className="text-white/85 text-left">
//             <span className="text-lg">Are you sure of your marketing plan?
// </span>
//             <a 
//               href="/auth/vendor/signup" 
//               className="text-lg font-medium hover:underline transition-all duration-300 inline-flex items-center group underline-offset-4"
//               style={{ color: '#7cc6ee' }}
//             >
//                Get a free marketing guide
//               <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Subtle Atmospheric Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {/* Minimal light effects to enhance the image */}
//         <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/3 rounded-full blur-3xl"></div>
//         <div className="absolute bottom-1/3 left-1/6 w-24 h-24 bg-white/2 rounded-full blur-2xl"></div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
"use client"
import React, { useState } from 'react';
import { ArrowRight, X, Mail, Download, Sparkles } from 'lucide-react';

// Alert component for notifications
const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`fixed top-16 sm:top-20 right-4 left-4 sm:left-auto sm:right-4 z-[9999] p-3 sm:p-4 rounded-lg shadow-lg flex items-center gap-3 max-w-sm sm:max-w-none mx-auto sm:mx-0 ${
      type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 
      'bg-red-50 text-red-700 border border-red-200'
    }`}>
      <div className="flex-1 text-sm sm:text-base">{message}</div>
      <button 
        onClick={onClose}
        className="p-1 hover:bg-white/80 rounded-full transition-colors flex-shrink-0"
      >
        ✕
      </button>
    </div>
  );
};

// Marketing Guide Popup Modal
const MarketingGuidePopup = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const handleSubmit = async () => {
    if (!email) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/marketing-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send marketing guide');
      }

      setAlert({
        show: true,
        message: 'Marketing guide sent to your email successfully!',
        type: 'success'
      });

      setEmail('');
      setTimeout(() => {
        onClose();
        setAlert({ ...alert, show: false });
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      setAlert({
        show: true,
        message: 'Failed to send marketing guide. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-[#7cc6ee]/20 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
          
          {/* Alert */}
          {alert.show && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert({ ...alert, show: false })}
            />
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-[#7cc6ee] animate-pulse" />
              <span className="text-sm font-semibold text-[#7cc6ee] tracking-wider uppercase">
                Free Resource
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#1e2556] mb-3 leading-tight">
              Get Your Free <span className="text-[#7cc6ee]">Marketing Guide</span>
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              Download our comprehensive marketing guide for legal tech companies. Sent directly to your inbox!
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-[#1e2556]">
                <Mail className="w-4 h-4 text-[#7cc6ee]" />
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full px-5 py-4 rounded-xl bg-white/70 border border-gray-200 
                         focus:border-[#7cc6ee] focus:ring-2 focus:ring-[#7cc6ee]/20 
                         transition-all duration-300 placeholder:text-gray-400
                         hover:border-[#7cc6ee]/50 hover:bg-white/90 text-[#1e2556]"
                placeholder="Enter your email address"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !email}
              className="group relative w-full py-4 px-6 bg-[#1e2556]
                       hover:bg-[#161c44] text-white font-semibold text-lg
                       rounded-xl shadow-lg shadow-[#1e2556]/25 hover:shadow-xl
                       hover:shadow-[#1e2556]/30 transition-all duration-300
                       focus:ring-2 focus:ring-[#7cc6ee]/20 focus:ring-offset-2
                       overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed
                       transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="relative flex items-center justify-center gap-3">
                <Download className="w-5 h-5" />
                <span className="transform group-hover:translate-x-[-4px] transition-transform duration-300">
                  {isLoading ? 'Sending Guide...' : 'Send My Free Guide'}
                </span>
                {!isLoading && (
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                )}
              </div>
              <div className="absolute inset-0 bg-[#7cc6ee]/10
                           opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </div>

          {/* Footer note */}
          {/* <p className="text-xs text-gray-500 text-center mt-4">
            No spam, just valuable insights. Unsubscribe anytime.
          </p> */}
        </div>
      </div>
    </>
  );
};

const HeroSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleMarketingGuideClick = (e) => {
    e.preventDefault();
    setIsPopupOpen(true);
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {/* Background image with people in office setting */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
            }}
          ></div>
          
          {/* Dark overlay to match original */}
          <div 
            className="absolute inset-0" 
            style={{ backgroundColor: 'rgba(30, 37, 86, 0.85)' }}
          ></div>
          
          {/* Additional gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mr-auto">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 text-white tracking-tight text-left">
              Be The First Choice {' '}
              <span className="block">Of Legal Teams</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl lg:text-2xl mb-10 text-white/95 leading-relaxed max-w-2xl font-light text-left">
              High-intent leads and market insights for legal tech companies
            </p>

            {/* CTA Button */}
            <div className="mb-8 text-left">
              <a 
                href="#contact" 
                className="inline-flex items-center px-10 py-5 text-xl font-semibold text-white rounded-md transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-2xl shadow-lg"
                style={{ backgroundColor: '#1e2556' }}
              >
                Talk to us
              </a>
            </div>

            {/* Secondary Link */}
            <div className="text-white/85 text-left">
              <span className="text-lg">Are you sure of your marketing plan?</span>
              <button 
                onClick={handleMarketingGuideClick}
                className="text-lg font-medium hover:underline transition-all duration-300 inline-flex items-center group underline-offset-4 ml-1"
                style={{ color: '#7cc6ee' }}
              >
                Get a free marketing guide
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle Atmospheric Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Minimal light effects to enhance the image */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/3 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/6 w-24 h-24 bg-white/2 rounded-full blur-2xl"></div>
        </div>
      </section>

      {/* Marketing Guide Popup */}
      <MarketingGuidePopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </>
  );
};

export default HeroSection;