"use client"
import React, { useState, useMemo } from 'react';
import { Search, Copy, Check } from 'lucide-react';

// Import from data.ts file
import { prompts, categories, getDepartmentColor, Prompt } from './_components/data';

export default function PromptLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<number | null>(null);

  // Filter prompts based on search and category
  const filteredPrompts = useMemo(() => {
    return prompts.filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           prompt.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || prompt.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const copyToClipboard = async (text: string, promptId: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPromptId(promptId);
      setTimeout(() => setCopiedPromptId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // Main library view
  if (!selectedPrompt) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header - Added top padding for navbar */}
        <div className="bg-blue-50 py-16 px-4 pt-24">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-5xl font-bold mb-4" style={{ color: '#1e2556' }}>
              Prompt Library
            </h1>
            <p className="text-lg" style={{ color: '#334155' }}>
              Create and discover prompts that unlock more powerful ways to use Assistant.
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Category Filter */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search prompts"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p style={{ color: '#334155' }}>
              Showing {filteredPrompts.length} of {prompts.length} prompts
            </p>
          </div>

          {/* Prompt Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPrompts.map(prompt => (
              <div
                key={prompt.id}
                onClick={() => setSelectedPrompt(prompt)}
                className="p-6 rounded-lg cursor-pointer hover:shadow-lg transition-shadow"
                style={{ backgroundColor: '#f5f7fa' }}
              >
                <h3 className="font-semibold text-lg mb-3" style={{ color: '#1e2556' }}>
                  {prompt.title}
                </h3>
                <p 
                  className="text-sm mb-4 overflow-hidden"
                  style={{ 
                    color: '#2d2d2d',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: '1.4em',
                    maxHeight: '4.2em'
                  }}
                >
                  {prompt.description}
                </p>
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: getDepartmentColor(prompt.category) }}
                >
                  {prompt.category}
                </span>
              </div>
            ))}
          </div>

          {/* No results message */}
          {filteredPrompts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: '#334155' }}>
                No prompts found matching your search criteria.
              </p>
              <p className="text-sm mt-2" style={{ color: '#2d2d2d' }}>
                Try adjusting your search terms or category filter.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Individual prompt view
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Added top padding for navbar */}
      <div className="bg-blue-50 py-8 px-4 pt-20">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setSelectedPrompt(null)}
            className="text-blue-600 mb-4 hover:underline"
            style={{ color: '#7cc6ee' }}
          >
            ← Back to Library
          </button>
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#1e2556' }}>
            {selectedPrompt.title}
          </h1>
          <p className="text-lg" style={{ color: '#334155' }}>
            {selectedPrompt.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Category Badge */}
        <span 
          className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white mb-8"
          style={{ backgroundColor: getDepartmentColor(selectedPrompt.category) }}
        >
          {selectedPrompt.category}
        </span>

        {/* Prompt Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold" style={{ color: '#1e2556' }}>
              Prompt
            </h2>
            <button
              onClick={() => copyToClipboard(selectedPrompt.prompt, selectedPrompt.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: copiedPromptId === selectedPrompt.id ? '#10b981' : '#1e2556' }}
            >
              {copiedPromptId === selectedPrompt.id ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
          <div 
            className="p-6 rounded-lg font-mono text-sm leading-relaxed"
            style={{ backgroundColor: '#f5f7fa', color: '#2d2d2d' }}
          >
            {selectedPrompt.prompt}
          </div>
        </div>

        {/* Expected Result Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#1e2556' }}>
            Expected Result
          </h2>
          <div 
            className="p-6 rounded-lg"
            style={{ backgroundColor: '#f5f7fa', color: '#2d2d2d' }}
          >
            {selectedPrompt.expectedResult}
          </div>
        </div>
      </div>
    </div>
  );
}