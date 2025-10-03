

"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CategoriesProducts from "@/app/(home)/directory/_components/PaidFeaturing"
import LandingSections from '@/app/(home)/directory/_components/LandingSections';
import { 
  Search, 
  FileText, 
  Brain, 
  FolderOpen, 
  Scale, 
  Shield, 
  BookOpen, 
  Eye,
  MessageCircle,
  Sparkles
} from 'lucide-react';

// Category data with icons and display names
const categoryData = [
  {
    id: 'CONTRACT-LIFECYCLE-MANAGEMENT',
    name: 'Contract Lifecycle Management',
    shortName: 'Contracts',
    icon: FileText,
    color: 'bg-[#7cc6ee]'
  },
  {
    id: 'LEGAL-AI',
    name: 'Legal AI',
    shortName: 'Legal AI',
    icon: Brain,
    color: 'bg-[#7cc6ee]'
  },
  {
    id: 'DOCUMENT-MANAGEMENT-SYSTEM',
    name: 'Document Management System',
    shortName: 'Documents',
    icon: FolderOpen,
    color: 'bg-[#7cc6ee]'
  },
  {
    id: 'LITIGATION-MANAGEMENT-AND-ANALYTICS',
    name: 'Litigation Management & Analytics',
    shortName: 'Litigation',
    icon: Scale,
    color: 'bg-[#7cc6ee]'
  },
  {
    id: 'IP-MANAGEMENT',
    name: 'IP Management',
    shortName: 'IP Management',
    icon: Shield,
    color: 'bg-[#7cc6ee]'
  },
  {
    id: 'LEGAL-RESEARCH',
    name: 'Legal Research',
    shortName: 'Research',
    icon: BookOpen,
    color: 'bg-[#7cc6ee]'
  },
  {
    id: 'E-DISCOVERY',
    name: 'E-Discovery',
    shortName: 'E-Discovery',
    icon: Eye,
    color: 'bg-[#7cc6ee]'
  }
];

const DirectoryLanding = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchMode, setSearchMode] = useState('rfp'); // 'directory' or 'rfp' - default to rfp to match image
  
  // Typing effect state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  const typingWords = ['Contract Management', 'Legal AI', 'IP Management', 'Legal Research'];

  // Typing effect
  useEffect(() => {
    const currentWord = typingWords[currentWordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
      } else {
        setDisplayText(prev => 
          isDeleting 
            ? prev.slice(0, -1)
            : currentWord.slice(0, prev.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, typingWords]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchMode === 'directory') {
      // Navigate to directory products with search query
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      router.push(`/directory/products${params.toString() ? `?${params.toString()}` : ''}`);
    } else {
      // Navigate to RFP form with pre-selected category
      if (selectedCategory) {
        router.push(`/rfp?category=${selectedCategory}`);
      }
    }
  };

  const handleCategoryClick = (categoryId) => {
    router.push(`/category/${categoryId.toLowerCase()}`);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-[#1e2556] relative overflow-hidden pt-24 pb-16 min-h-[600px]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#1e2556]/80 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Legal team background" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-20 right-10 w-64 h-64 bg-[#7cc6ee]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#7cc6ee]/5 rounded-full blur-3xl"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[500px]">
            {/* Left Side - Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Hero Heading with Typing Effect */}
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Discover, Compare and Implement<br />
                  the best{' '}
                  <span className="text-[#7cc6ee] relative">
                    {displayText}
                    <span className="animate-pulse">|</span>
                  </span>
                </h1>
              </div>

              {/* Toggle Buttons - Matching the image design */}
              <div className="flex items-center justify-center lg:justify-start gap-0 mb-6">
                <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
                  <button
                    onClick={() => setSearchMode('rfp')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                      searchMode === 'rfp'
                        ? 'bg-[#1a1f3a] text-white shadow-lg'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    Let us match you
                  </button>
                  <button
                    onClick={() => setSearchMode('directory')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                      searchMode === 'directory'
                        ? 'bg-[#1a1f3a] text-white shadow-lg'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    Browse on your own
                  </button>
                </div>
              </div>

              {/* Search Bar / Category Selector - Same row, separate elements */}
              <div className="flex items-center gap-4 max-w-4xl mx-auto lg:mx-0 mb-6">
                {searchMode === 'directory' ? (
                  // Directory Search Mode
                  <>
                    <input
                      type="text"
                      placeholder="What do you need help with?"
                      className="flex-1 px-6 py-4 text-base border-0 focus:ring-2 focus:ring-[#7cc6ee] focus:outline-none bg-white text-gray-700 placeholder:text-gray-400 rounded-2xl shadow-xl"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch(e);
                        }
                      }}
                    />
                    <button 
                      onClick={(e) => handleSearch(e)}
                      className="px-10 py-4 bg-[#ef4444] text-white font-semibold hover:bg-[#dc2626]
                               transition-colors duration-200 rounded-2xl shadow-xl whitespace-nowrap"
                    >
                      Get Matched
                    </button>
                  </>
                ) : (
                  // RFP Category Selection Mode
                  <>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && selectedCategory) {
                          handleSearch(e);
                        }
                      }}
                      className="flex-1 px-6 py-4 text-base border-0 focus:ring-2 focus:ring-[#7cc6ee] focus:outline-none bg-white text-gray-700 cursor-pointer appearance-none rounded-2xl shadow-xl"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1rem center',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '3rem'
                      }}
                    >
                      <option value="">What do you need help with?</option>
                      {categoryData.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <button 
                      onClick={(e) => handleSearch(e)}
                      disabled={!selectedCategory}
                      className={`px-10 py-4 font-semibold transition-all duration-200 rounded-2xl shadow-xl whitespace-nowrap ${
                        selectedCategory
                          ? 'bg-[#ef4444] text-white hover:bg-[#dc2626]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Get Matched
                    </button>
                  </>
                )}
              </div>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                We simplify technology decisions with trusted product data and industry insights for legal teams.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Browse by Category Section - Separated with White Background */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e2556] text-center mb-4">
            Browse by Category
          </h2>
          <p className="text-[#334155] text-center mb-12 max-w-2xl mx-auto">
            Explore our comprehensive directory of legal technology solutions tailored to your specific needs
          </p>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 md:gap-6">
            {categoryData.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex flex-col items-center cursor-pointer group transform hover:scale-105 transition-all duration-200"
                >
                  {/* Icon Container */}
                  <div className={`w-16 h-16 md:w-20 md:h-20 ${category.color} rounded-2xl 
                                 flex items-center justify-center shadow-lg group-hover:shadow-xl
                                 transition-all duration-200 mb-3 group-hover:bg-[#1e2556]`}>
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  
                  {/* Category Name */}
                  <span className="text-sm md:text-base font-medium text-[#2d2d2d] text-center
                                 group-hover:text-[#7cc6ee] transition-colors duration-200
                                 leading-tight max-w-[100px] md:max-w-[120px]">
                    {category.shortName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Categories Products and Landing Sections */}
      <CategoriesProducts/>
      <LandingSections />
      
      {/* Mobile Floating Ask Question Button */}
      <div className="md:hidden fixed bottom-6 right-4 z-50">
        <a 
          href="/ask-question"
          className="flex items-center gap-2 bg-[#7cc6ee] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-semibold">Ask a Question</span>
        </a>
      </div>
    </>
  );
};

export default DirectoryLanding;