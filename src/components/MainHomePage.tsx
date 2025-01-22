"use client"


import React, { useState } from 'react';
import { Users, Zap, BarChart3, LineChart, Layout, BrainCircuit, } from 'lucide-react';
import VideoPlayer  from "@/app/tech_vendor/HomaPageComponents/VideoPlayer"


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
          typeOfLead: 'user'
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
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
     
    
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-20">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-start">
        {/* Left Content */}
        <div className="max-w-2xl lg:max-w-none lg:pr-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 tracking-tight mb-6 
               leading-[1.1] lg:leading-[1.1] bg-clip-text text-transparent 
               bg-gradient-to-r from-gray-900 to-gray-700">
    Maximize the Impact of 
    
    
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                {" "}Legal Operations{" "}
              </span>
    
    on Business Growth
</h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-xl font-medium leading-relaxed">
            Optimize legal workflows, implement right legal tech and improve business KPIs through legal ops intelligence platform
          </p>

          {/* Email Input Section */}
          <div className="relative max-w-lg">
            <div className="relative z-20 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  placeholder="Enter your work email"
                  className="relative z-20 w-full px-6 py-4 bg-white rounded-xl text-gray-700 
                           placeholder-gray-400 border border-gray-200
                           focus:border-blue-400 outline-none shadow-sm 
                           hover:shadow-md transition-all duration-200 text-lg"
                />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="relative z-20 group whitespace-nowrap px-8 py-4 bg-gradient-to-r 
                         from-blue-600 to-blue-500 text-white 
                         rounded-xl font-medium hover:from-blue-700 hover:to-blue-600
                         transition-all duration-200 flex items-center 
                         justify-center gap-2 shadow-sm hover:shadow-md text-lg"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Get started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Video */}
        <div className="relative z-10 w-full max-w-2xl lg:max-w-none mx-auto">
          <div className="lg:ml-auto">
            <VideoPlayer />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-2 bg-gray-50/50 px-3 py-1.5 rounded-lg">
              <span className="text-blue-500">🌐</span> Enterprise-ready
            </span>
            <span className="flex items-center gap-2 bg-gray-50/50 px-3 py-1.5 rounded-lg">
              <span className="text-blue-500">⚡</span> AI powered
            </span>
            <span className="flex items-center gap-2 bg-gray-50/50 px-3 py-1.5 rounded-lg">
              <span className="text-blue-500">🔒</span> Highly secure
            </span>
          </div>
        </div>
      </div>
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

   
      <div className="max-w-6xl mx-auto px-4 py-8 relative">
      
      {/* Logo Section */}
      <div className="flex justify-center mb-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-md border border-blue-100 
                    hover:shadow-xl transition-shadow duration-300 animate-float">
          <div className="flex items-center gap-3">
            <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className="h-6" />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="flex justify-center mb-2 relative z-10">
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

      {/* Vertical Connection Lines */}
      <div className="relative flex justify-center -mt-12 mb-2">
        <svg className="w-4 h-16" viewBox="0 0 4 64">
          <path
            d="M 2,0 L 2,64"
            stroke="#93C5FD"
            strokeWidth="2"
            fill="none"
            strokeDasharray="6,6"
          />
        </svg>
      </div>

      {/* Legal Operations Intelligence Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 max-w-3xl mx-auto -mb-4 relative z-10 
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

      {/* Connection Lines */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid meet">
  {/* Continuous central vertical line from top to bottom */}
  <path
    d="M 700,0 L 700,200"
    stroke="#93C5FD"
    strokeWidth="2"
    fill="none"
    strokeDasharray="6,6"
  />
  
  {/* Modified left curve with even lower endpoint */}
  <path
    d="M 200,190 C 400,60 500,200 700,80"
    stroke="#93C5FD"
    strokeWidth="2"
    fill="none"
    strokeDasharray="6,6"
  />
  
  {/* Modified right curve with even lower endpoint */}
  <path
    d="M 1200,190 C 1000,60 900,200 700,80"
    stroke="#93C5FD"
    strokeWidth="2"
    fill="none"
    strokeDasharray="6,6"
  />
</svg>

      {/* Bottom Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {[
          { icon: Zap, text: 'Workflows' },
          { icon: BarChart3, text: 'Technology' },
          { icon: BrainCircuit, text: 'Business KPIs' }
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
    </div>
      
      <LegalProblemsSection/>
      <FinalSection/>
      <DownloadBox/>
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











import { useRef,  } from 'react';
import { Cpu, MousePointerClick,  FileText,  } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const options = [
    { 
      title: "Analyse legal processes",
      icon: Building2,
      gradient: "from-blue-600 to-indigo-600"
    },
    { 
      title: "Discover technology requirement",
      icon: Users,
      gradient: "from-blue-600 to-cyan-600"
    },
    { 
      title: "Align legal ops with business goals",
      icon: Cpu,
      gradient: "from-indigo-600 to-purple-600"
    },
    { 
      title: "Let us help you from scratch",
      icon: FileText,
      gradient: "from-purple-600 to-pink-600"
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
          
          <div className="p-4 sm:p-6 md:p-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-blue-100/50 to-indigo-100/50 border border-blue-200/50 shadow-sm mb-4">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                <span className="text-xs md:text-sm font-semibold text-blue-600 tracking-wide">GET STARTED</span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                Here is how you can get started with {' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  DreamLegal
                </span>
              </h2>
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {options.map((option, index) => {
                const Icon = option.icon;
                return (
                  <button
                    key={index}
                    className="transform transition-all duration-500"
                    onClick={() => handleCategorySelect(option.title)}
                  >
                    <div className={`group w-full inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl
                                 bg-gradient-to-r ${option.gradient} shadow-lg transition-all duration-300 
                                 hover:-translate-y-0.5 hover:shadow-xl
                                 ${selectedCategory === option.title 
                                   ? 'ring-2 ring-blue-200 ring-offset-2' 
                                   : 'hover:ring-2 hover:ring-blue-100 hover:ring-offset-2'}`}>
                     
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




interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, selectedCategory }) => {
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    organization: ''
  });
  const [showCalendly, setShowCalendly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/save-potential-lead-detailed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: formData.role,
          email: formData.email,
          organisation: formData.organization, // Note the spelling change for the API
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setAlert({
        show: true,
        message: 'Information submitted successfully',
        type: 'success'
      });

      setShowCalendly(true);

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
        className="fixed inset-0 bg-blue-50/30 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl max-w-md w-full shadow-2xl 
                     transform transition-all duration-500 scale-100 overflow-hidden">

          <div className="relative p-8">
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

                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: 'role', label: 'Role', type: 'text', placeholder: 'Enter your role' },
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
                    disabled={isLoading}
                    className="group relative w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 
                           hover:from-blue-700 hover:to-blue-600 text-white font-medium
                           rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl
                           hover:shadow-blue-500/30 transition-all duration-300
                           focus:ring-2 focus:ring-blue-200 focus:ring-offset-2
                           overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      <span className="transform group-hover:translate-x-[-4px] transition-transform duration-300">
                        {isLoading ? 'Submitting...' : 'Continue to Schedule'}
                      </span>
                      {!isLoading && (
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      )}
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
                    name: formData.role,
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

import { Scale, Banknote, Clock, Laptop } from 'lucide-react';







const LegalProblemsSection = () => {
  const [sectionRef, isInView] = useIntersectionObserver();

  const problems = [
    {
      icon: Banknote,
      title: "Legal as a Cost Centre"
    },
    {
      icon: Scale,
      title: "Misaligned Priorities of Legal and Business Functions"
    },
    {
      icon: Clock,
      title: "No Yield of Legal Ops on Revenue and Profit"
    },
    {
      icon: Laptop,
      title: "Conventional Legal Teams with No Tech"
    }
  ];

  return (
    <div ref={sectionRef} className="w-full pt-16 pb-12 relative overflow-hidden flex justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Enhanced Header Section with better mobile spacing */}
        <div className={`mb-8 sm:mb-16 text-center relative transition-all duration-1000 transform
                      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 rounded-xl blur-2xl"></div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 mb-4 relative inline-block leading-tight sm:leading-normal px-2">
              Why Legal Function is a
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Pain </span>
              for Enterprises?
              <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 
                           transform origin-left transition-transform duration-1000 
                           ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
            </h2>
          </div>
        </div>

        {/* Responsive card layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className={`relative group transition-all duration-700 transform
                           ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative rounded-2xl overflow-hidden h-full border border-gray-200 bg-white 
                             shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm
                             transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-blue-50/50" />
                  
                  <div className="relative p-6 h-full flex flex-col items-center justify-center text-center">
                    <div className="mb-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-full blur-xl transform group-hover:scale-110 transition-transform duration-500" />
                      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-500 to-blue-500 
                                  flex items-center justify-center shadow-lg shadow-blue-500/30
                                  transform group-hover:-translate-y-1 transition-all duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 transition-all duration-300 group-hover:text-blue-600 leading-relaxed pb-4">
                      {problem.title}
                    </h3>

                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 rounded-2xl transition-all duration-300" />
                    
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 
                                transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


// import { Download, Mail } from 'lucide-react';

// const DownloadBox = () => {
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleDownload = (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setTimeout(() => setIsLoading(false), 1500);
//   };

//   return (
//     <div className="w-full flex items-center justify-center p-8">
//       <div className="w-full max-w-5xl h-auto min-h-[16rem] relative group">
//         <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#4285f4]/95 to-[#4285f4]/90 backdrop-blur-xl shadow-2xl 
//                     border border-[#4285f4] overflow-hidden transform transition-all duration-500 group-hover:scale-[1.01]">
          
//           {/* Background Effects */}
//           <div className="absolute inset-0">
//             {/* Grid Pattern */}
//             <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] 
//                         bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]" />
            
//             {/* Decorative Shapes */}
//             <div className="absolute top-4 right-8 w-12 h-12 border-4 border-white/20 rounded-full rotate-45" />
//             <div className="absolute bottom-8 left-12 w-8 h-8 bg-white/10 rounded-lg" />
//             <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-white/15 rotate-12 transform" />
            
//             {/* Gradient Orbs */}
//             <div className="absolute -top-16 -left-16 sm:-top-24 sm:-left-24 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-[#4285f4]/40 to-[#4285f4]/40 rounded-full blur-3xl opacity-70 
//                         animate-pulse mix-blend-overlay group-hover:opacity-85 duration-1000" />
//             <div className="absolute -bottom-16 -right-16 sm:-bottom-24 sm:-right-24 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-l from-[#4285f4]/40 to-[#4285f4]/40 rounded-full blur-3xl opacity-70 
//                         animate-pulse delay-300 mix-blend-overlay group-hover:opacity-85 duration-1000" />
//           </div>

//           {/* Content Container */}
//           <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-8 py-8 gap-6 sm:gap-8">
//             {/* Heading */}
//             <div className="text-center space-y-3">
//               <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white px-2">
//               100 CLM CASE STUDY REPORT
//               </h2>
//               <div className="flex justify-center space-x-2">
//                 <div className="h-1 w-6 sm:w-8 bg-gradient-to-r from-transparent via-white to-white rounded-full" />
//                 <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-white to-white/80 rounded-full" />
//                 <div className="h-1 w-6 sm:w-8 bg-gradient-to-r from-white/80 to-transparent rounded-full" />
//               </div>
//             </div>

//             {/* Input and Button Group */}
//             <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full sm:w-auto 
//                           bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/20 
//                           shadow-xl shadow-[#4285f4]/20 group-hover:shadow-2xl group-hover:shadow-[#4285f4]/30 
//                           transition-all duration-300">
//               <div className="relative flex-1 sm:flex-initial">
//                 <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
//                   <Mail className="h-4 w-4 text-white/70" />
//                 </div>
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   className="w-full sm:w-72 pl-10 pr-4 py-3 rounded-lg bg-white/20 border-0 
//                          placeholder-white/50 text-white
//                          focus:ring-2 focus:ring-white/30 focus:outline-none
//                          transition-all duration-300"
//                 />
//               </div>
              
//               <button
//                 onClick={handleDownload}
//                 disabled={isLoading}
//                 className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-[#4285f4] relative overflow-hidden
//                          transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105
//                          ${isLoading 
//                            ? 'bg-white/50 cursor-not-allowed' 
//                            : 'bg-white hover:shadow-lg hover:shadow-white/20'
//                          }`}
//               >
//                 {isLoading ? (
//                   <div className="w-5 h-5 border-2 border-[#4285f4]/30 border-t-[#4285f4] rounded-full animate-spin" />
//                 ) : (
//                   <div className="flex items-center justify-center gap-2">
//                     <Download className="w-4 h-4" />
//                     <span>Download</span>
//                   </div>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { Download, Mail } from 'lucide-react';

import Alert from '@/components/Alert';

const DownloadBox = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setAlert({
        show: true,
        message: "Please enter your email address",
        type: 'error'
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/saving-contentEmail-leadLists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          contentType: 'pdf',
          contentName: '100 CLM CASE STUDY REPORT',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register email');
      }

      // Show success message
      setAlert({
        show: true,
        message: "Download link has been sent to your email",
        type: 'success'
      });

      // Optional: Trigger actual file download
      const fileUrl = '/download/CLM - 100 customer case study.pdf'; // Replace with actual file path
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = '100-CLM-Case-Study.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Download error:', error);
      setAlert({
        show: true,
        message: error instanceof Error ? error.message : "Failed to process download",
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {alert.show && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-5xl h-auto min-h-[16rem] relative group">
          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#4285f4]/95 to-[#4285f4]/90 backdrop-blur-xl shadow-2xl 
                      border border-[#4285f4] overflow-hidden transform transition-all duration-500 group-hover:scale-[1.01]">
            
            {/* Background Effects */}
            <div className="absolute inset-0">
              {/* Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] 
                          bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_85%)]" />
              
              {/* Decorative Shapes */}
              <div className="absolute top-4 right-8 w-12 h-12 border-4 border-white/20 rounded-full rotate-45" />
              <div className="absolute bottom-8 left-12 w-8 h-8 bg-white/10 rounded-lg" />
              <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-white/15 rotate-12 transform" />
              
              {/* Gradient Orbs */}
              <div className="absolute -top-16 -left-16 sm:-top-24 sm:-left-24 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-[#4285f4]/40 to-[#4285f4]/40 rounded-full blur-3xl opacity-70 
                          animate-pulse mix-blend-overlay group-hover:opacity-85 duration-1000" />
              <div className="absolute -bottom-16 -right-16 sm:-bottom-24 sm:-right-24 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-l from-[#4285f4]/40 to-[#4285f4]/40 rounded-full blur-3xl opacity-70 
                          animate-pulse delay-300 mix-blend-overlay group-hover:opacity-85 duration-1000" />
            </div>

            {/* Content Container */}
            <form onSubmit={handleDownload} className="relative h-full flex flex-col items-center justify-center px-4 sm:px-8 py-8 gap-6 sm:gap-8">
              {/* Heading */}
              <div className="text-center space-y-3">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white px-2">
                  100 CLM CASE STUDY REPORT
                </h2>
                <div className="flex justify-center space-x-2">
                  <div className="h-1 w-6 sm:w-8 bg-gradient-to-r from-transparent via-white to-white rounded-full" />
                  <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-white to-white/80 rounded-full" />
                  <div className="h-1 w-6 sm:w-8 bg-gradient-to-r from-white/80 to-transparent rounded-full" />
                </div>
              </div>

              {/* Input and Button Group */}
              <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full sm:w-auto 
                            bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/20 
                            shadow-xl shadow-[#4285f4]/20 group-hover:shadow-2xl group-hover:shadow-[#4285f4]/30 
                            transition-all duration-300">
                <div className="relative flex-1 sm:flex-initial">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-white/70" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full sm:w-72 pl-10 pr-4 py-3 rounded-lg bg-white/20 border-0 
                           placeholder-white/50 text-white
                           focus:ring-2 focus:ring-white/30 focus:outline-none
                           transition-all duration-300"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-[#4285f4] relative overflow-hidden
                           transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105
                           ${isLoading 
                             ? 'bg-white/50 cursor-not-allowed' 
                             : 'bg-white hover:shadow-lg hover:shadow-white/20'
                           }`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-[#4285f4]/30 border-t-[#4285f4] rounded-full animate-spin" />
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};




