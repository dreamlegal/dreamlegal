
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles } from 'lucide-react';
import ProductCategories from './_components/ProductsPart';
import CategoriesProducts from "./_components/PaidFeaturing"
import LandingSections from './_components/LandingSections';
// Modified categories to use simple strings
const categories = [
  "Client Relationship Management",
  "Contract Lifecycle Management",
  "E-Signature",
  "Document Management System",
  "E-billing and Invoicing",
  "E-discovery",
  "Governance,Risk and Compliance",
  "Intellectual Property Management",
  "Legal Research",
  "Legal Workflow Automation",
  "Litigation Management and Analytics"
];

// First row categories
const firstRowCategories = [
  { id: 1, name: "CONTRACTS", category: "Contract Lifecycle Management" },
  { id: 2, name: "COMPLIANCE", category: "Governance,Risk and Compliance" },
  { id: 3, name: "INTELLECTUAL PROPERTY", category: "Intellectual Property Management" },
  { id: 4, name: "RESEARCH", category: "Legal Research" }
];

// Second row categories
const secondRowCategories = [
  { id: 5, name: "DOCUMENTS", category: "Document Management System"},
  { id: 6, name: "E-SIGNATURE", category: "E-Signature" },
  { id: 7, name: "E-DISCOVERY", category: "E-discovery"},
  { id: 8, name: "BILLING & INVOICING", category: "E-billing and Invoicing" },
  // { id: 9, name: "Litigation/ Client management", category: "Client Relationship Management" }
  { 
    id: 9, 
    name: "Litigation/ Client management", 
    category: ["Client Relationship Management", "Litigation Management and Analytics"] 
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
      // Don't modify the category string - send as is
      params.append('category', category);
    }
    if (userCategory) {
      params.append('userCategory', userCategory);
    }
    router.push(`/directory/products${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleFirstRowCategoryClick = (category) => {
    const newCategory = selectedCategory === category.name ? '' : category.category;
    setSelectedCategory(category.name);
    updateFiltersInUrl(newCategory, selectedUserCategory, searchQuery);
  };

  const handleSecondRowCategoryClick = (category) => {
    const newCategory = selectedCategory === category.name ? '' : category.category;
    setSelectedCategory(category.name);
    updateFiltersInUrl(newCategory, selectedUserCategory, searchQuery);
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
  <div className="max-w-3xl mx-auto mb-8">
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
</div>


</div>
    <CategoriesProducts/>
    <ProductCategories />
    <LandingSections />
  </>
  );
};

export default DirectoryLanding;