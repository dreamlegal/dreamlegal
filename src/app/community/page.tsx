"use client"
import React, { useState } from 'react';
import { Users, Zap, MessageSquare, Bookmark, FileText, Bell, Search, Award, ArrowRight, ChevronDown, ThumbsUp } from 'lucide-react';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('FOR YOU');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [question, setQuestion] = useState('');
  
  const categories = [
    { name: 'All', count: 324 },
    { name: 'Legal Operations', count: 156 },
    { name: 'Legal Tech', count: 89 },
    { name: 'Corporate Counsel', count: 79 }
  ];
  
  const topics = [
    { id: 1, label: 'Legal Operations', color: 'bg-blue-100 text-blue-700' },
    { id: 2, label: 'Legal Tech', color: 'bg-indigo-100 text-indigo-700' },
    { id: 3, label: 'AI & Machine Learning', color: 'bg-purple-100 text-purple-700' },
    { id: 4, label: 'Automation', color: 'bg-cyan-100 text-cyan-700' },
    { id: 5, label: 'Knowledge Management', color: 'bg-emerald-100 text-emerald-700' },
    { id: 6, label: 'Legal Risk', color: 'bg-amber-100 text-amber-700' }
  ];
  
  const recentPosts = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: '/api/placeholder/32/32',
        role: 'General Counsel',
        company: 'TechGlobal Inc.'
      },
      type: 'question',
      title: 'Best practices for implementing CLM across multiple jurisdictions?',
      content: 'Were expanding our contract lifecycle management system to our international offices. Has anyone successfully managed multiple jurisdiction requirements in one system?',
      topics: [1, 2],
      votes: 24,
      comments: 7,
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      user: {
        name: 'Michael Chan',
        avatar: '/api/placeholder/32/32',
        role: 'Legal Operations Director',
        company: 'Finance Direct Ltd.'
      },
      type: 'discussion',
      title: 'ROI metrics for legal tech investments - whats working for you?',
      content: 'Our leadership is asking for better ROI metrics on our legal tech investments. What metrics have been most meaningful in your organizations?',
      topics: [2, 5],
      votes: 18,
      comments: 12,
      timeAgo: '4 hours ago'
    },
    {
      id: 3,
      user: {
        name: 'Elena Rodriguez',
        avatar: '/api/placeholder/32/32',
        role: 'Head of Legal Innovation',
        company: 'Innovex Systems'
      },
      type: 'resource',
      title: 'Shared my legal ops automation roadmap template',
      content: 'After several requests, I ve created a shareable version of our legal operations automation roadmap. This has helped us prioritize our tech investments and show clear business value.',
      topics: [1, 4, 5],
      votes: 31,
      comments: 9,
      timeAgo: '1 day ago'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle question submission
    console.log('Question submitted:', question);
    setQuestion('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative p-16">
      {/* Subtle grid background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Header and welcome section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Legal Community
            </h1>
            <p className="text-gray-600">
              Connect, learn and grow with other legal professionals
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <Users className="w-4 h-4" />
              <span>My Network</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Categories</h3>
              </div>
              <div className="p-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    className={`flex justify-between items-center w-full px-3 py-2.5 rounded-lg text-left transition-all ${
                      selectedCategory === category.name
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <span>{category.name}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Explore Topics</h3>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <span
                      key={topic.id}
                      className={`${topic.color} text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer hover:shadow-sm transition-all`}
                    >
                      {topic.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-md overflow-hidden text-white">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <Award className="w-10 h-10 text-blue-100" />
                  <span className="bg-blue-400/30 text-xs font-medium px-2.5 py-1 rounded-full">Premium</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Unlock Expert Networks</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Connect with legal operations specialists and get personalized advice for your organization.
                </p>
                <button className="group w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Question input */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                  <div className="mb-4">
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                      Ask a question or share insights
                    </label>
                    <textarea
                      id="question"
                      rows="3"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 transition-all resize-none"
                      placeholder="What's on your mind about legal operations?"
                    ></textarea>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button type="button" className="text-gray-500 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-all">
                        <FileText className="w-5 h-5" />
                      </button>
                      <button type="button" className="text-gray-500 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-all">
                        <Users className="w-5 h-5" />
                      </button>
                      <div className="relative inline-block">
                        <button type="button" className="flex items-center gap-1 text-gray-700 text-sm border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all">
                          <span>Topics</span>
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={!question.trim()}
                      className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
                        question.trim()
                          ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-lg'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
              {['FOR YOU', 'TRENDING', 'LATEST', 'BOOKMARKED'].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-3 font-medium text-sm transition-all ${
                    activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Posts */}
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                  <div className="p-6">
                    <div className="flex justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.user.avatar}
                          alt={post.user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{post.user.name}</div>
                          <div className="text-xs text-gray-500">{post.user.role} · {post.user.company}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">{post.timeAgo}</div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-600">{post.content}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.topics.map((topicId) => {
                        const topic = topics.find(t => t.id === topicId);
                        return (
                          <span
                            key={topicId}
                            className={`${topic.color} text-xs font-medium px-2.5 py-1 rounded-full`}
                          >
                            {topic.label}
                          </span>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{post.votes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">{post.comments} comments</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600">
                        <Bookmark className="w-4 h-4" />
                        <span className="text-sm">Save</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load more button */}
            <div className="mt-8 text-center">
              <button className="group inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-200 font-medium text-gray-700 hover:shadow-md transition-all">
                <span>Load more posts</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;