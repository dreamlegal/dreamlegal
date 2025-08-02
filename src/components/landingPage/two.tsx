
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Sparkles, 
  FileText, 
  Brain, 
  FolderOpen, 
  Scale, 
  Shield, 
  BookOpen, 
  Eye 
} from 'lucide-react';
// import ProductCategories from './_components/ProductsPart';
// import CategoriesProducts from "./_components/PaidFeaturing"
import CategoriesProducts from "@/app/(home)/directory/_components/PaidFeaturing"
import LandingSections from '@/app/(home)/directory/_components/LandingSections';

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
      <div className="bg-[#1e2556] relative overflow-hidden pt-24 pb-8">
        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-white/10 
                           rounded-full border border-white/20 shadow-lg mb-8">
              <Sparkles className="w-4 h-4 text-[#7cc6ee] animate-pulse" />
              <span className="text-sm font-semibold text-[#7cc6ee]">
                LEGAL TECH DIRECTORY
              </span>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">
              Where legal teams find the right technology
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
              Discover and evaluate the legal technology products for your unique needs
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <form onSubmit={handleSearch}>
              <div className="flex items-center p-2 bg-[#f5f7fa] rounded-2xl shadow-lg">
                <input
                  type="text"
                  placeholder="Search for legal technology solutions..."
                  className="w-full px-6 py-4 text-lg border-0 focus:ring-0 focus:outline-none bg-[#f5f7fa] text-[#2d2d2d]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="px-8 py-4 bg-[#7cc6ee] text-white rounded-xl hover:bg-[#1e2556]/90
                           transition-colors duration-200 flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Categories Grid */}
          <div className="max-w-5xl mx-auto mb-8">
            <h2 className="text-2xl font-semibold text-white text-center mb-8">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
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
                                   transition-all duration-200 mb-3`}>
                      <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    
                    {/* Category Name */}
                    <span className="text-sm md:text-base font-medium text-white text-center
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
      </div>
      
      <CategoriesProducts/>
      <LandingSections />
    </>
  );
};

export default DirectoryLanding;