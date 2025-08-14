"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Shield, BarChart2, Globe } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import Alert from '@/components/Alert';

const ResponsiveHero = () => {
  // Animation variant for floating elements
  const floatingAnimation = {
    initial: { y: 0 },
    animate: (delay) => ({
      y: [0, -10, 0],
      transition: {
        delay,
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  // Updated decorative elements with better mobile positioning
  const decorativeElements = [
    {
      Icon: Shield,
      position: "left-4 top-40 sm:left-12 sm:top-32",
      size: "w-10 h-10 sm:w-16 sm:h-16",
      delay: 0
    },
    {
      Icon: BarChart2,
      position: "left-8 bottom-32 sm:left-24 sm:bottom-48",
      size: "w-12 h-12 sm:w-20 sm:h-20",
      delay: 1
    },
    {
      Icon: Zap,
      position: "right-6 top-48 sm:right-16 sm:top-40",
      size: "w-12 h-12 sm:w-20 sm:h-20",
      delay: 2
    },
    {
      Icon: Globe,
      position: "right-8 bottom-28 sm:right-28 sm:bottom-44",
      size: "w-10 h-10 sm:w-16 sm:h-16",
      delay: 3
    }
  ];

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = false;
      videoElement.play().catch(error => {
        console.error('Autoplay was prevented:', error);
      });
    }
  }, []);

  const [email, setEmail] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const FloatingElement = ({ children, className, delay = 0 }) => (
    <div className={className}>
      {children}
    </div>
  );

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setAlert({
        show: true,
        message: 'Please enter a valid email address',
        type: 'error'
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/save-potential-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          typeOfLead: 'vendor'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register email');
      }

      setAlert({
        show: true,
        message: 'Thank you for your interest! We\'ll be in touch soon.',
        type: 'success'
      });

      // Clear the form
      setEmail('');

    } catch (error) {
      console.error('Submission error:', error);
      setAlert({
        show: true,
        message: error instanceof Error ? error.message : 'Failed to submit email',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section with navbar spacing */}
      <section className="w-full min-h-screen pt-20 sm:pt-24 relative overflow-hidden bg-[#1e2556]">
        {alert.show && (
          <Alert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert({ ...alert, show: false })}
          />
        )}
        
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[#1e2556]" />
        <div className="absolute inset-0 opacity-30 bg-[#7cc6ee]/10" />

        {/* Container for main content and decorative elements */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Decorative Icons */}
          {decorativeElements.map(({ Icon, position, size, delay }, index) => (
            <motion.div
              key={index}
              className={`absolute ${position} pointer-events-none`}
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
              custom={delay}
            >
              <div className={`relative ${size}`}>
                <div className={`absolute inset-0 bg-[#7cc6ee]/20 rounded-full blur-xl`} />
                <div className="relative bg-[#1e2556]/80 rounded-2xl p-4 backdrop-blur-sm border border-[#7cc6ee]/20">
                  <Icon className="w-full h-full text-[#7cc6ee]" />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center min-h-[80vh] text-center relative z-10"
          >
            <span className="text-xs sm:text-sm font-semibold text-[#7cc6ee] mb-4 tracking-wider">
              LEGAL TECH SOLUTIONS
            </span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mx-auto mb-4 sm:mb-6 px-4"
            >
              The only client prospecting solution 
              <span className="text-[#7cc6ee]">
                {" "}for legal tech companies. 
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
            >
              Intelligence and insights driven pre sales solution to close more law firms and inhouse teams
            </motion.p>

            {/* Email Input */}
            <FloatingElement delay={0.3} className="max-w-xl mx-auto mt-8 sm:mt-12 px-4">
              {/* <div 
                className={`flex flex-col sm:flex-row gap-3 transition-all duration-200 
                           ${isInputFocused ? 'transform -translate-y-1' : ''}`}
              >
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    placeholder="Enter your work email"
                    className={`w-full px-6 py-4 bg-white rounded-xl text-[#2d2d2d] placeholder-[#334155]/50
                             border-2 ${status.type === 'error' ? 'border-red-300' : 'border-[#7cc6ee]/20'} 
                             focus:border-[#7cc6ee] outline-none
                             shadow-sm hover:shadow-md focus:shadow-lg
                             transition-all duration-200`}
                  />
                  {isInputFocused && (
                    <div className="absolute -bottom-2 left-6 text-xs text-[#7cc6ee] bg-white px-2">
                      Work email address
                    </div>
                  )}
                </div>
                <button 
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`group relative px-8 py-4 bg-[#7cc6ee] text-[#1e2556] rounded-xl font-medium
                           ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#60b2df]'}
                           shadow-sm hover:shadow-md
                           transition-all duration-200 flex items-center justify-center gap-2`}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-[#1e2556] border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Get started
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div> */}
    
              {/* Status Message */}
              {status.message && (
                <div className={`mt-3 text-sm ${
                    status.type === 'error' ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {status.message}
                </div>
              )}
              {/* Login and Signup Buttons */}
              <div className="flex flex-col gap-4 mt-8 md:flex-row">
  <a href="/auth/vendor/login" className="w-full px-8 py-3 bg-[#1e2556] text-white rounded-md font-medium hover:bg-[#2d2d2d] transition duration-200 text-center md:w-44">
    Login
  </a>
  <a href="/auth/vendor/signup" className="w-full px-8 py-3 bg-[#7cc6ee] text-[#1e2556] rounded-md font-medium hover:bg-[#60b2df] transition duration-200 text-center md:w-44">
    Signup
  </a>
</div>
            </FloatingElement>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ResponsiveHero;