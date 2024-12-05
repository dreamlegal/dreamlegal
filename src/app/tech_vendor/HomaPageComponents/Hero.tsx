"use client";

import {  Zap, Shield, BarChart2, Globe } from "lucide-react";



import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Code, LineChart, Workflow } from 'lucide-react';
import VideoPlayer from "./VideoPlayer";

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
      color: "from-blue-400/20 to-blue-600/20",
      position: "left-4 top-40 sm:left-12 sm:top-32",
      size: "w-10 h-10 sm:w-16 sm:h-16",
      delay: 0
    },
    {
      Icon: BarChart2,
      color: "from-blue-500/20 to-blue-700/20",
      position: "left-8 bottom-32 sm:left-24 sm:bottom-48",
      size: "w-12 h-12 sm:w-20 sm:h-20",
      delay: 1
    },
    {
      Icon: Zap,
      color: "from-blue-600/20 to-blue-800/20",
      position: "right-6 top-48 sm:right-16 sm:top-40",
      size: "w-12 h-12 sm:w-20 sm:h-20",
      delay: 2
    },
    {
      Icon: Globe,
      color: "from-blue-500/20 to-blue-700/20",
      position: "right-8 bottom-28 sm:right-28 sm:bottom-44",
      size: "w-10 h-10 sm:w-16 sm:h-16",
      delay: 3
    }
  ];

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.muted = false; // Autoplay requires muted for most browsers
      videoElement.play().catch(error => {
        console.error('Autoplay was prevented:', error);
      });
    }
  }, []);


  return (
    <>
      {/* Hero Section with navbar spacing */}
      <section className="w-full min-h-screen pt-20 sm:pt-24 relative overflow-hidden bg-gradient-to-br from-blue-50 to-white">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(at_top_right,#60A5FA_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(at_top_left,#93C5FD_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.015] bg-[url('/noise.png')] animate-grain" />

        {/* Container for main content and decorative elements */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Decorative Icons - Now within container but positioned absolutely */}
          {decorativeElements.map(({ Icon, color, position, size, delay }, index) => (
            <motion.div
              key={index}
              className={`absolute ${position} pointer-events-none`}
              variants={floatingAnimation}
              initial="initial"
              animate="animate"
              custom={delay}
            >
              <div className={`relative ${size}`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-full blur-xl`} />
                <div className="relative bg-white/80 rounded-2xl p-4 backdrop-blur-sm border border-blue-100">
                  <Icon className="w-full h-full text-blue-600" />
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
            <span className="text-xs sm:text-sm font-semibold text-blue-600 mb-4 tracking-wider">
              LEGAL TECH SOLUTIONS
            </span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 max-w-4xl mx-auto mb-4 sm:mb-6 px-4"
            >
         
         The only client prospecting solution 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                {" "}for legal tech companies. 
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-12 px-4"
            >
             Intelligence and insights driven pre sales solution to close more law firms and inhouse teams


            </motion.p>



            {/* Premium CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg 
                       font-medium text-white transition-all duration-300 ease-in-out rounded-full 
                       bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 
                       shadow-lg hover:shadow-xl hover:shadow-blue-500/25"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-300 
                           opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-lg" />
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-pulse" />
              Call Now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Premium Video Section */}
      <motion.section
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.6 }}
  className="relative -mt-16 sm:-mt-20 pb-12 sm:pb-20 z-20"
>
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative max-w-5xl mx-auto"
    >
      <VideoPlayer/>
    </motion.div>
  </div>
</motion.section>
    </>
  );
};

export default ResponsiveHero;