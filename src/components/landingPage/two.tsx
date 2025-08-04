
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
  MessageCircle
} from 'lucide-react';

// Updated categories
const categoryOptions = [
  'CONTRACT_LIFECYCLE_MANAGEMENT',
  'LEGAL_AI',
  'DOCUMENT_MANAGEMENT_SYSTEM',
  'LITIGATION_MANAGEMENT_AND_ANALYTICS',
  'IP_MANAGEMENT',
  'LEGAL_RESEARCH',
  'E_DISCOVERY'
];

// Category data with icons and display names using theme colors
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

const userCategories = [
  "Individual Practitioner",
  "Law firms",
  "Government departments",
  "Startups",
  "Enterprises",
  "Judiciary",
  "In-House Counsels"
];

const DirectoryLanding = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedUserCategory, setSelectedUserCategory] = useState('');
  
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
    updateFiltersInUrl(selectedCategory, selectedUserCategory, searchQuery);
  };

  const updateFiltersInUrl = (category, userCategory, search) => {
    const params = new URLSearchParams();
    if (search) params.append('q', search);
    if (category) {
      params.append('category', category);
    }
    if (userCategory) {
      params.append('userCategory', userCategory);
    }
    router.push(`/directory/products${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleCategoryClick = (categoryId) => {
    router.push(`/category/${categoryId.toLowerCase()}`);
  };

  const handleUserCategoryClick = (userCategory) => {
    const newUserCategory = selectedUserCategory === userCategory ? '' : userCategory;
    setSelectedUserCategory(newUserCategory);
    updateFiltersInUrl(selectedCategory, newUserCategory, searchQuery);
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
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Discover, Compare and Implement<br />
                  the best{' '}
                  <span className="text-[#7cc6ee] relative">
                    {displayText}
                    <span className="animate-pulse">|</span>
                  </span>
                </h1>
              </div>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto lg:mx-0 mb-6">
                <div className="flex items-center p-2 bg-white rounded-2xl shadow-lg">
                  <input
                    type="text"
                    placeholder="Search by Category, Product or Keyword"
                    className="w-full px-4 py-3 text-base border-0 focus:ring-0 focus:outline-none bg-white text-[#2d2d2d] rounded-l-xl"
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
                    className="px-6 py-3 bg-[#1e2556] text-white rounded-xl hover:bg-[#1e2556]/90
                             transition-colors duration-200 flex items-center gap-2 font-semibold"
                  >
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>
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