"use client"


import React, { useState } from 'react';
import { Users, Zap, BarChart3, LineChart, Layout, BrainCircuit, } from 'lucide-react';



const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [hoveredCard, setHoveredCard] = useState(null);

  const FloatingElement = ({ children, className, delay = 0 }) => (
    <div className={className}>
      {children}
    </div>
  );

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async () => {
    setStatus({ type: '', message: '' });
    
    if (!validateEmail(email)) {
      setStatus({ 
        type: 'error', 
        message: 'Please enter a valid email address' 
      });
      return;
    }

    setIsLoading(true);
    console.log('Email:', email);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#60A5FA20_0%,transparent_50%)]" />

      {/* Grid Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
      </div>

      {/* Hero Section Floating Elements */}
      <FloatingElement 
        delay={0.2} 
        className="absolute hidden md:block top-20 left-10 w-32 h-40 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg transform -rotate-12 border border-blue-100"
      >
        <div className="p-4">
          <div className="w-full h-4 bg-blue-100 rounded-md mb-2" />
          <div className="w-3/4 h-4 bg-blue-100 rounded-md mb-2" />
          <div className="w-1/2 h-4 bg-blue-100 rounded-md" />
        </div>
      </FloatingElement>

      <FloatingElement 
        delay={0.4}
        className="absolute hidden md:block top-40 right-16 w-12 h-12 rounded-full bg-blue-500 shadow-lg"
      />

      <FloatingElement 
        delay={0.3}
        className="absolute hidden md:block bottom-32 left-24 w-16 h-16 rounded-full bg-blue-400/20 backdrop-blur-sm shadow-lg"
      />

      <FloatingElement 
        delay={0.5}
        className="absolute hidden lg:block top-60 right-32 w-40 h-32 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg transform rotate-6 border border-blue-100"
      >
        <div className="p-4">
          <div className="w-full h-3 bg-blue-100 rounded-md mb-2" />
          <div className="w-2/3 h-3 bg-blue-100 rounded-md" />
        </div>
      </FloatingElement>

      {/* Hero Section */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-20">
        <div className="text-center">
          {/* Logo */}
            <FloatingElement delay={0.1} className="inline-block mb-8 sm:mb-12">
              <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className="h-8 mx-auto hidden sm:block" />
              <div className="block sm:hidden h-6"></div>
            </FloatingElement>
           

          {/* Headline */}
          <FloatingElement delay={0.2}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
              The easiest way to manage your legal operations
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Streamline your legal operations with our powerful platform
            </p>
          </FloatingElement>

          {/* Email Capture Form */}

    <div className="relative z-50 max-w-xl mx-auto mt-8 sm:mt-12 px-4">
      <div className={`relative z-50 flex flex-col sm:flex-row gap-3 transition-all duration-200 
                   ${isInputFocused ? 'transform -translate-y-1' : ''}`}>
        <div className="relative flex-1 z-50">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="Enter your work email"
            className={`relative z-50 w-full px-6 py-4 bg-white rounded-xl text-gray-700 placeholder-gray-400
                     border-2 ${status.type === 'error' ? 'border-red-300' : 'border-blue-100'} 
                     focus:border-blue-400 outline-none
                     shadow-sm hover:shadow-md focus:shadow-lg
                     transition-all duration-200`}
          />
          {isInputFocused && (
            <div className="absolute -bottom-2 left-6 text-xs text-blue-600 bg-white px-2 z-50">
              Work email address
            </div>
          )}
        </div>
        <button 
          onClick={handleSubmit}
          disabled={isLoading}
          className={`group relative z-50 px-8 py-4 bg-blue-600 text-white rounded-xl font-medium
                   ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'}
                   shadow-sm hover:shadow-md
                   transition-all duration-200 flex items-center justify-center gap-2`}
        >
          {isLoading ? (
            <div
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
            />
          ) : (
            <>
              Get started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-blue-300 
                       opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
        </button>
      </div>

      {status.message && (
        <div className={`mt-3 text-sm z-50 relative ${
            status.type === 'error' ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {status.message}
        </div>
      )}
    </div>



          {/* Trust Badges */}
          <FloatingElement delay={0.4} className="mt-12">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span>🛡️ Enterprise-ready</span>
              <span>⚡ Lightning fast</span>
              <span>🔒 Highly secure</span>
            </div>
          </FloatingElement>
        </div>
      </div>

      {/* Top SVG Decorative Lines */}
      {/* <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
        <svg className="w-full h-full" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid meet">
          <path
            d="M 700,100 C 700,160 700,360 700,420"
            stroke="#93C5FD"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6,6"
          />
          <path
            d="M 350,220 C 500,280 600,160 700,220"
            stroke="#93C5FD"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6,6"
          />
          <path
            d="M 700,220 C 700,220 700,220 700,220"
            stroke="#93C5FD"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6,6"
          />
          <path
            d="M 1050,220 C 900,280 800,160 700,220"
            stroke="#93C5FD"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6,6"
          />
        </svg>
      </div> */}

<div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
  <svg className="w-full h-full" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid meet">
    <path
      d="M 700,280 C 700,340 700,440 700,500"
      stroke="#93C5FD"
      strokeWidth="2"
      fill="none"
      strokeDasharray="6,6"
    />
    <path
      d="M 350,400 C 500,460 600,340 700,400"
      stroke="#93C5FD"
      strokeWidth="2"
      fill="none"
      strokeDasharray="6,6"
    />
    <path
      d="M 700,400 C 700,400 700,400 700,400"
      stroke="#93C5FD"
      strokeWidth="2"
      fill="none"
      strokeDasharray="6,6"
    />
    <path
      d="M 1050,400 C 900,460 800,340 700,400"
      stroke="#93C5FD"
      strokeWidth="2"
      fill="none"
      strokeDasharray="6,6"
    />
  </svg>
</div>
      {/* Animated Background Elements */}
      <div className="absolute left-0 top-1/3 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute right-0 bottom-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-20 animate-pulse delay-700" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-300 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Landing Page Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 relative">
        {/* Solutions Section */}
        <div className="text-center max-w-2xl mx-auto mb-12 opacity-0 animate-fadeIn">
          <div className="inline-block px-4 py-1 bg-blue-100 rounded-full mb-4 hover:bg-blue-200 transition-colors duration-300">
            <p className="text-blue-600 font-medium text-sm">PRODUCT SOLUTIONS</p>
          </div>
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Select Your Solution.
          </h2>
          <h3 className="text-xl font-bold text-gray-700">Scale with Innovation.</h3>
        </div>

        {/* Solutions Cards */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
          {['Legal Process Optimization', 'Legal Technology Planning', 'Change Management'].map((title, index) => (
            <div
              key={title}
              className="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-xl 
                       transition-all duration-500 border border-blue-100 hover:border-blue-300 
                       transform hover:-translate-y-1"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 
                           group-hover:scale-110 transition-transform duration-300">
                {index === 0 && <Zap className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />}
                {index === 1 && <LineChart className="w-6 h-6 text-blue-600 group-hover:animate-pulse" />}
                {index === 2 && <Users className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed opacity-80 group-hover:opacity-100 
                           transition-opacity duration-300">
                  {index === 0 && "Streamline legal workflows by identifying bottlenecks and inefficiencies. Leverage actionable insights to automate repetitive tasks, reduce turnaround time, and enhance operational precision."}
                  {index === 1 && "Strategically assess and implement the right legal tech stack. Our platform analyzes your team's needs, compares tools, and creates a seamless plan for technology adoption that maximizes ROI."}
                  {index === 2 && "Enable smooth transitions with data-driven strategies. Support your legal team with tailored change management plans that ensure effective onboarding, user adoption, and minimized disruption."}
                </p>
              </div>
            </div>
          ))}
        </div> */}
     

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
      {[
        {
          title: ['Process Opt.', 'Legal Process Optimization'],
          icon: <Zap className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />,
          desc: [
            "Streamline workflows and automate tasks.",
            "Streamline legal workflows by identifying bottlenecks and inefficiencies. Leverage actionable insights to automate repetitive tasks, reduce turnaround time, and enhance operational precision."
          ]
        },
        {
          title: ['Tech Plan', 'Legal Technology Planning'],
          icon: <LineChart className="w-6 h-6 text-blue-600 group-hover:animate-pulse" />,
          desc: [
            "Implement the right tech stack for ROI.",
            "Strategically assess and implement the right legal tech stack. Our platform analyzes your team's needs, compares tools, and creates a seamless plan for technology adoption that maximizes ROI."
          ]
        },
        {
          title: ['Change Mgt', 'Change Management'],
          icon: <Users className="w-6 h-6 text-blue-600 group-hover:animate-bounce" />,
          desc: [
            "Enable smooth data-driven transitions.",
            "Enable smooth transitions with data-driven strategies. Support your legal team with tailored change management plans that ensure effective onboarding, user adoption, and minimized disruption."
          ]
        }
      ].map((item, index) => (
        <div
          key={item.title[0]}
          className="group bg-white/70 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-xl 
                   transition-all duration-500 border border-blue-100 hover:border-blue-300 
                   transform hover:-translate-y-1"
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className="bg-blue-100 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4 
                       group-hover:scale-110 transition-transform duration-300">
            {item.icon}
          </div>
          <div className="space-y-1 md:space-y-2">
            <h3 className="text-lg md:text-xl font-bold">
              <span className="md:hidden">{item.title[0]}</span>
              <span className="hidden md:block">{item.title[1]}</span>
            </h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed opacity-80 group-hover:opacity-100 
                       transition-opacity duration-300">
              <span className="md:hidden">{item.desc[0]}</span>
              <span className="hidden md:block">{item.desc[1]}</span>
            </p>
          </div>
        </div>
      ))}
    </div>


        {/* Central Logo */}
        <div className="flex justify-center mb-12 relative z-10">
          <div className="bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-md border border-blue-100 
                       hover:shadow-xl transition-shadow duration-300 animate-float">
            <div className="flex items-center gap-3">
              {/* <Layout className="w-6 h-6 text-blue-600 animate-spin-slow" /> */}
              <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className="h-6" />
            </div>
          </div>
        </div>

        {/* Unified Data Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto mb-12 relative z-10 
                     border border-blue-100 hover:shadow-lg transition-shadow duration-300 group">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">
              Legal Operations Intelligence
            </h2>
            <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
              We unify fragmented legal processes, workflow data, and technology usage insights to deliver actionable intelligence across your operations.
            </p>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
          {[
            { icon: Zap, text: 'Workflows' },
            { icon: BarChart3, text: 'Technology' },
            { icon: BrainCircuit, text: 'Modern Legal Teams' }
          ].map(({ icon: Icon, text }, index) => (
            <div
              key={text}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 shadow-sm 
                       hover:shadow-lg transition-all duration-300 border border-blue-100 
                       hover:border-blue-300 transform hover:-translate-y-1"
            >
              <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-semibold">{text}</span>
            </div>
          ))}
        </div>

        {/* Bottom SVG Decorative Lines */}
        <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none overflow-visible">
          <svg className="w-full h-full" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid meet">
            <path
              d="M 700,40 C 700,120 700,80 700,140"
              stroke="#93C5FD"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,6"
            />
            <path
              d="M 200,70 C 400,140 500,0 700,120"
              stroke="#93C5FD"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,6"
            />
            <path
              d="M 1200,70 C 1000,140 900,0 700,120"
              stroke="#93C5FD"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,6"
            />
          </svg>
        </div>

        {/* Team Section */}
        <div className="flex justify-center relative z-10">
          <div className="flex -space-x-4">
            {[11, 2, 3, 9, 5].map((i) => (
              <img 
                key={i}
                src={`t${i}.jpg`}
                alt={`Team member ${i}`}
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm 
                     hover:transform hover:scale-110 transition-transform duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>

        
      </div>
      <FinalSection/>

      {/* Additional Floating Elements */}
      <FloatingElement 
        delay={0.6}
        className="absolute hidden md:block bottom-20 right-10 w-24 h-24 rounded-xl bg-blue-100/50 backdrop-blur-sm shadow-lg transform -rotate-6"
      />
      
      <FloatingElement 
        delay={0.7}
        className="absolute hidden md:block bottom-40 left-16 w-10 h-10 rounded-full bg-blue-300/30 backdrop-blur-sm shadow-lg"
      />

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 2s ease-in-out forwards;
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

import { Building2, Briefcase,  } from 'lucide-react';



import { X, ArrowRight, Sparkles } from 'lucide-react';


import { useRef, } from 'react';
import { Cpu,  MousePointerClick, ChevronRight } from 'lucide-react';

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.2, ...options });

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};


const FinalSection = () => {
  const [sectionRef, isInView] = useIntersectionObserver();
  const [isChoicesVisible, setIsChoicesVisible] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const options = [
    { 
      title: "Law Firm",
      icon: Building2,
      gradient: "from-blue-600 to-indigo-600"
    },
    { 
      title: "Inhouse Legal Team",
      icon: Users,
      gradient: "from-blue-600 to-cyan-600"
    },
    { 
      title: "Legal Tech Company",
      icon: Cpu,
      gradient: "from-indigo-600 to-purple-600"
    }
  ];

  const handleCategorySelect = (title) => {
    setSelectedCategory(title);
    setIsModalOpen(true);
  };

  return (
    <div ref={sectionRef} className="w-full py-6 md:py-12 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
        <div className={`bg-white/90 rounded-xl md:rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden backdrop-blur-sm
                      transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Content Side */}
            <div className="relative p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
              <div className="space-y-4 md:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-blue-100/50 to-indigo-100/50 border border-blue-200/50 shadow-sm">
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                  <span className="text-xs md:text-sm font-semibold text-blue-600 tracking-wide">GET STARTED</span>
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                  What Describes You{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                    Best?
                  </span>
                </h2>
                
                {/* Initial Choose Button */}
                {!isChoicesVisible && (
                  <div className="relative">
                    <button
                      onClick={() => setIsChoicesVisible(true)}
                      className="group relative w-full inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl
                               bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg 
                               ring-2 ring-blue-100 ring-offset-2
                               transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/20">
                        <MousePointerClick className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <span className="block text-base md:text-lg font-semibold text-white mb-0.5">Choose Your Category</span>
                        <span className="text-xs md:text-sm text-white/70">Click to explore options</span>
                      </div>
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white/70" />
                    </button>
                  </div>
                )}
              </div>
              
              {/* Decorative Bottom Corner */}
              <div className="absolute bottom-0 right-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-100/20 to-indigo-100/20 rounded-tl-3xl" />
            </div>

            {/* Right Options Side */}
            <div className={`relative p-4 sm:p-6 md:p-8 transition-all duration-500
                         ${isChoicesVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="space-y-2 md:space-y-3">
                {options.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={index}
                      className="w-full transform transition-all duration-500"
                      style={{ 
                        transitionDelay: isChoicesVisible ? `${index * 100}ms` : '0ms',
                        opacity: isChoicesVisible ? 1 : 0,
                        transform: isChoicesVisible ? 'translateX(0)' : 'translateX(100px)'
                      }}
                      onClick={() => handleCategorySelect(option.title)}
                    >
                      <div className={`group w-full inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl
                                   bg-gradient-to-r ${option.gradient} shadow-lg transition-all duration-300 
                                   hover:-translate-y-0.5 hover:shadow-xl
                                   ${selectedCategory === option.title 
                                     ? 'ring-2 ring-blue-200 ring-offset-2' 
                                     : 'hover:ring-2 hover:ring-blue-100 hover:ring-offset-2'}`}>
                        <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg 
                                     bg-white/20 transition-transform duration-300">
                          <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                        <span className="flex-1 text-left text-sm md:text-base font-medium text-white">
                          {option.title}
                        </span>
                        <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-white/20">
                          <MousePointerClick className="w-4 h-4 md:w-5 md:h-5 text-white" />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Premium gradient line */}
          <div className="h-px bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
        </div>
      </div>

      <FormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};



import { InlineWidget } from 'react-calendly';

const FormModal = ({ isOpen, onClose, selectedCategory }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: ''
  });
  const [showCalendly, setShowCalendly] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', {
      category: selectedCategory,
      ...formData
    });
    setShowCalendly(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop with enhanced blur */}
      <div 
        className="fixed inset-0 bg-blue-50/30 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl max-w-md w-full shadow-2xl 
                     transform transition-all duration-500 scale-100 overflow-hidden">

          {/* Content container */}
          <div className="relative p-8">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 p-2 rounded-full hover:bg-blue-50/50 
                       transition-all duration-300 group"
            >
              <X className="w-5 h-5 text-gray-400 group-hover:text-blue-600 
                        transition-colors duration-300" />
            </button>

            {!showCalendly ? (
              <>
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
                    <span className="text-sm font-semibold text-blue-600 tracking-wider">
                      GET STARTED
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 
                             bg-clip-text text-transparent mb-2">
                    Talk to us!
                  </h2>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 
                               border border-blue-100">
                    <span className="text-sm text-blue-600 font-medium">
                      {selectedCategory}
                    </span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your name' },
                    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email' },
                    { name: 'organization', label: 'Organization', type: 'text', placeholder: 'Enter your organization' }
                  ].map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        required
                        value={formData[field.name]}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 
                               focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                               transition-all duration-300 placeholder:text-gray-400
                               hover:border-blue-200 hover:bg-white/80"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="group relative w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 
                           hover:from-blue-700 hover:to-blue-600 text-white font-medium
                           rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl
                           hover:shadow-blue-500/30 transition-all duration-300
                           focus:ring-2 focus:ring-blue-200 focus:ring-offset-2
                           overflow-hidden"
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      <span className="transform group-hover:translate-x-[-4px] transition-transform duration-300">
                        Continue to Schedule
                      </span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 
                                 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </button>
                </form>
              </>
            ) : (
              <div className="h-screen max-h-[600px] w-full">
                <InlineWidget 
                  url="https://calendly.com/rohanvkumarv"
                  prefill={{
                    name: formData.name,
                    email: formData.email,
                    customAnswers: {
                      organization: formData.organization
                    }
                  }}
                  styles={{
                    height: '100%',
                    width: '100%'
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};





import { motion } from 'framer-motion';


const MinimalHero = () => {
  const [email, setEmail] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const FloatingElement = ({ children, className, delay = 0 }) => (
    <div className={className}>
      {children}
    </div>
  );

  const validateEmail = (email) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async () => {
    // Reset status
    setStatus({ type: '', message: '' });

    // Validate email
    if (!validateEmail(email)) {
      setStatus({ 
        type: 'error', 
        message: 'Please enter a valid email address' 
      });
      return;
    }

    setIsLoading(true);
    console.log('Email:', email);
    setIsLoading(false);

    // try {
    //   const response = await fetch('/api/subscribe', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email }),
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     throw new Error(data.message || 'Something went wrong');
    //   }

    //   setStatus({
    //     type: 'success',
    //     message: 'Thanks for subscribing!'
    //   });
    //   setEmail('');
      
    // } catch (error) {
    //   setStatus({
    //     type: 'error',
    //     message: error.message || 'Failed to submit email'
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#60A5FA20_0%,transparent_50%)]" />
      
      {/* Floating UI Elements */}
      <FloatingElement 
        delay={0.2} 
        className="absolute hidden md:block top-20 left-10 w-32 h-40 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg transform -rotate-12 border border-blue-100"
      >
        <div className="p-4">
          <div className="w-full h-4 bg-blue-100 rounded-md mb-2" />
          <div className="w-3/4 h-4 bg-blue-100 rounded-md mb-2" />
          <div className="w-1/2 h-4 bg-blue-100 rounded-md" />
        </div>
      </FloatingElement>

      <FloatingElement 
        delay={0.4}
        className="absolute hidden md:block top-40 right-16 w-12 h-12 rounded-full bg-blue-500 shadow-lg"
      />
       <FloatingElement 
        delay={0.3}
        className="absolute hidden md:block bottom-32 left-24 w-16 h-16 rounded-full bg-blue-400/20 backdrop-blur-sm shadow-lg"
      />

      <FloatingElement 
        delay={0.5}
        className="absolute hidden lg:block top-60 right-32 w-40 h-32 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg transform rotate-6 border border-blue-100"
      >
        <div className="p-4">
          <div className="w-full h-3 bg-blue-100 rounded-md mb-2" />
          <div className="w-2/3 h-3 bg-blue-100 rounded-md" />
        </div>
      </FloatingElement>


      {/* Main Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-32 pb-20">
        <div className="text-center">
          {/* Logo */}
          <FloatingElement delay={0.1} className="inline-block mb-8 sm:mb-12">
            <div className="text-2xl font-bold text-blue-600">Your Logo</div>
          </FloatingElement>

          {/* Headline */}
          <FloatingElement delay={0.2}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
              The easiest way to manage your business finances
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Streamline your financial operations with our powerful platform
            </p>
          </FloatingElement>

          {/* Email Capture Form */}
          <FloatingElement delay={0.3} className="max-w-xl mx-auto mt-8 sm:mt-12 px-4">
            <div 
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
                  className={`w-full px-6 py-4 bg-white rounded-xl text-gray-700 placeholder-gray-400
                           border-2 ${status.type === 'error' ? 'border-red-300' : 'border-blue-100'} 
                           focus:border-blue-400 outline-none
                           shadow-sm hover:shadow-md focus:shadow-lg
                           transition-all duration-200`}
                />
                {isInputFocused && (
                  <div className="absolute -bottom-2 left-6 text-xs text-blue-600 bg-white px-2">
                    Work email address
                  </div>
                )}
              </div>
              <button 
                onClick={handleSubmit}
                disabled={isLoading}
                className={`group relative px-8 py-4 bg-blue-600 text-white rounded-xl font-medium
                         ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-700'}
                         shadow-sm hover:shadow-md
                         transition-all duration-200 flex items-center justify-center gap-2`}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Get started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-blue-300 
                             opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm" />
              </button>
            </div>

            {/* Status Message */}
            {status.message && (
              <div className={`mt-3 text-sm ${
                  status.type === 'error' ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {status.message}
              </div>
            )}
          </FloatingElement>

          {/* Trust Badges */}
          <FloatingElement delay={0.4} className="mt-12">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span>🛡️ Enterprise-ready</span>
              <span>⚡ Lightning fast</span>
              <span>🔒 Bank-grade security</span>
            </div>
          </FloatingElement>
        </div>
      </div>

      {/* Additional Floating Elements */}
      <FloatingElement 
        delay={0.6}
        className="absolute hidden md:block bottom-20 right-10 w-24 h-24 rounded-xl bg-blue-100/50 backdrop-blur-sm shadow-lg transform -rotate-6"
      />
      
      <FloatingElement 
        delay={0.7}
        className="absolute hidden md:block bottom-40 left-16 w-10 h-10 rounded-full bg-blue-300/30 backdrop-blur-sm shadow-lg"
      />
    </div>
  );
};
