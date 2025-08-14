'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, Search, ArrowRight, Filter, Grid, List } from 'lucide-react';

export default function AllCompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'name', 'articles'

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  useEffect(() => {
    filterAndSortCompanies();
  }, [companies, searchTerm, filterCategory, sortBy]);

  const fetchAllCompanies = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ca/all?limit=all');
      if (response.ok) {
        const data = await response.json();
        setCompanies(data.companies);
      } else {
        console.error('Failed to fetch companies');
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortCompanies = () => {
    let filtered = [...companies];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(company =>
        company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (company.product?.category || []).some(cat => 
          cat.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(company => {
        if (filterCategory === 'with-product') return company.hasProductMatch;
        if (filterCategory === 'without-product') return !company.hasProductMatch;
        return company.product?.category?.includes(filterCategory);
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name':
          return a.companyName.localeCompare(b.companyName);
        case 'articles':
          return b.totalArticlesCount - a.totalArticlesCount;
        default:
          return 0;
      }
    });

    setFilteredCompanies(filtered);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getUniqueCategories = () => {
    const categories = new Set();
    companies.forEach(company => {
      if (company.product?.category) {
        company.product.category.forEach(cat => categories.add(cat));
      }
    });
    return Array.from(categories);
  };

  const CompanyCard = ({ company, isListView = false }) => (
    <Link 
      href={`/competitor_analysis/${company.id}`} 
      className="group"
    >
      <div className={`bg-white rounded-xl border border-slate-200/60 hover:shadow-xl transition-all duration-300 p-6 group-hover:border-[#7cc6ee] hover:-translate-y-1 ${
        isListView ? 'flex items-center space-x-6' : 'h-full'
      }`}>
        <div className={`flex items-start space-x-4 ${isListView ? 'flex-1' : 'mb-4'}`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            {company.product?.logoUrl ? (
              <img
                src={company.product.logoUrl}
                alt={`${company.companyName} logo`}
                className="w-12 h-12 rounded-lg object-cover border border-slate-100"
                onError={(e) => {
                  const target = e.target;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`w-12 h-12 bg-gradient-to-br from-[#7cc6ee] to-[#1e2556] rounded-lg flex items-center justify-center text-white font-bold text-lg ${company.product?.logoUrl ? 'hidden' : ''}`}>
              {company.companyName.charAt(0).toUpperCase()}
            </div>
          </div>
          
          {/* Company Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-[#2d2d2d] truncate group-hover:text-[#1e2556] transition-colors duration-200">
              {company.companyName}
            </h3>
            
            {/* Categories */}
            {company.product?.category && company.product.category.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {company.product.category.slice(0, isListView ? 5 : 2).map((cat, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-lg border border-blue-200"
                  >
                    {cat}
                  </span>
                ))}
                {company.product.category.length > (isListView ? 5 : 2) && (
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg border border-slate-200">
                    +{company.product.category.length - (isListView ? 5 : 2)}
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* Match indicator */}
          <div className="flex-shrink-0">
            <div className={`w-3 h-3 rounded-full ${company.hasProductMatch ? 'bg-green-400' : 'bg-slate-300'}`} />
          </div>
        </div>
        
        {/* Stats */}
        {!isListView && (
          <div className="space-y-3 mb-4">
            {/* <div className="flex items-center justify-between text-sm">
              <span className="text-[#334155]">Articles:</span>
              <span className="font-bold text-[#2d2d2d]">{company.totalArticlesCount}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#334155]">Categories:</span>
              <span className="font-bold text-[#2d2d2d]">{company._count.articles}</span>
            </div> */}
            {company.product && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#334155]">Product:</span>
                <span className="font-bold text-[#2d2d2d] truncate ml-2">{company.product.productName}</span>
              </div>
            )}
          </div>
        )}
        
        {/* Bottom section */}
        <div className={`${isListView ? 'flex items-center space-x-6' : 'border-t border-slate-100 pt-3'}`}>
          <div className={`text-xs text-[#334155] ${isListView ? '' : 'mb-4'}`}>
            Analyzed: {formatDate(company.createdAt)}
          </div>
          
          {isListView && (
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-[#334155]">Articles: <span className="font-bold text-[#2d2d2d]">{company.totalArticlesCount}</span></span>
              <span className="text-[#334155]">Categories: <span className="font-bold text-[#2d2d2d]">{company._count.articles}</span></span>
            </div>
          )}
          
          <div className={isListView ? 'ml-auto' : 'text-center'}>
            <span className="inline-flex items-center space-x-2 text-sm text-[#7cc6ee] group-hover:text-[#6bb8e0] font-medium transition-colors duration-200">
              <span>View Analysis</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-500 mx-auto mb-6"></div>
              <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-300 animate-ping mx-auto"></div>
            </div>
            <p className="text-slate-600 font-medium">Loading all companies...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-24">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Building2 className="w-8 h-8 text-[#7cc6ee]" />
            <h1 className="text-3xl font-bold text-[#1e2556]">All Analyzed Companies</h1>
          </div>
          <p className="text-[#334155] text-lg">
            Browse through {companies.length} companies that have been analyzed
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-xl border border-slate-200/60 shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="with-product">With Product Match</option>
              <option value="without-product">Without Product Match</option>
              {getUniqueCategories().map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Name A-Z</option>
              <option value="articles">Most Articles</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-[#7cc6ee] text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-[#7cc6ee] text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[#334155]">
            Showing <span className="font-bold">{filteredCompanies.length}</span> of <span className="font-bold">{companies.length}</span> companies
          </p>
        </div>

        {/* Companies Grid/List */}
        {filteredCompanies.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {filteredCompanies.map((company) => (
              <CompanyCard 
                key={company.id} 
                company={company} 
                isListView={viewMode === 'list'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-12">
              <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-[#334155] text-lg font-medium mb-2">No companies found</p>
              <p className="text-[#334155] text-sm">
                {searchTerm || filterCategory !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No companies have been analyzed yet'
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}