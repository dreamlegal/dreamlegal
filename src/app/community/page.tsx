// "use client"
// import React, { useState } from 'react';
// import { Users, Zap, MessageSquare, Bookmark, FileText, Bell, Search, Award, ArrowRight, ChevronDown, ThumbsUp } from 'lucide-react';

// const CommunityPage = () => {
//   const [activeTab, setActiveTab] = useState('FOR YOU');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [question, setQuestion] = useState('');
  
//   const categories = [
//     { name: 'All', count: 324 },
//     { name: 'Legal Operations', count: 156 },
//     { name: 'Legal Tech', count: 89 },
//     { name: 'Corporate Counsel', count: 79 }
//   ];
  
//   const topics = [
//     { id: 1, label: 'Legal Operations', color: 'bg-blue-100 text-blue-700' },
//     { id: 2, label: 'Legal Tech', color: 'bg-indigo-100 text-indigo-700' },
//     { id: 3, label: 'AI & Machine Learning', color: 'bg-purple-100 text-purple-700' },
//     { id: 4, label: 'Automation', color: 'bg-cyan-100 text-cyan-700' },
//     { id: 5, label: 'Knowledge Management', color: 'bg-emerald-100 text-emerald-700' },
//     { id: 6, label: 'Legal Risk', color: 'bg-amber-100 text-amber-700' }
//   ];
  
//   const recentPosts = [
//     {
//       id: 1,
//       user: {
//         name: 'Sarah Johnson',
//         avatar: '/api/placeholder/32/32',
//         role: 'General Counsel',
//         company: 'TechGlobal Inc.'
//       },
//       type: 'question',
//       title: 'Best practices for implementing CLM across multiple jurisdictions?',
//       content: 'Were expanding our contract lifecycle management system to our international offices. Has anyone successfully managed multiple jurisdiction requirements in one system?',
//       topics: [1, 2],
//       votes: 24,
//       comments: 7,
//       timeAgo: '2 hours ago'
//     },
//     {
//       id: 2,
//       user: {
//         name: 'Michael Chan',
//         avatar: '/api/placeholder/32/32',
//         role: 'Legal Operations Director',
//         company: 'Finance Direct Ltd.'
//       },
//       type: 'discussion',
//       title: 'ROI metrics for legal tech investments - whats working for you?',
//       content: 'Our leadership is asking for better ROI metrics on our legal tech investments. What metrics have been most meaningful in your organizations?',
//       topics: [2, 5],
//       votes: 18,
//       comments: 12,
//       timeAgo: '4 hours ago'
//     },
//     {
//       id: 3,
//       user: {
//         name: 'Elena Rodriguez',
//         avatar: '/api/placeholder/32/32',
//         role: 'Head of Legal Innovation',
//         company: 'Innovex Systems'
//       },
//       type: 'resource',
//       title: 'Shared my legal ops automation roadmap template',
//       content: 'After several requests, Ive created a shareable version of our legal operations automation roadmap. This has helped us prioritize our tech investments and show clear business value.',
//       topics: [1, 4, 5],
//       votes: 31,
//       comments: 9,
//       timeAgo: '1 day ago'
//     }
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle question submission
//     console.log('Question submitted:', question);
//     setQuestion('');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative">
//       {/* Subtle grid background */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
//         {/* Header and welcome section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Legal Community
//             </h1>
//             <p className="text-gray-600">
//               Connect, learn and grow with other legal professionals
//             </p>
//           </div>
          
//           <div className="mt-4 md:mt-0 flex items-center gap-4">
//             <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all">
//               <Bell className="w-4 h-4" />
//               <span>Notifications</span>
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
//               <Users className="w-4 h-4" />
//               <span>My Network</span>
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Left sidebar */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
//               <div className="p-5 border-b border-gray-100">
//                 <h3 className="font-semibold text-gray-800">Categories</h3>
//               </div>
//               <div className="p-2">
//                 {categories.map((category) => (
//                   <button
//                     key={category.name}
//                     className={`flex justify-between items-center w-full px-3 py-2.5 rounded-lg text-left transition-all ${
//                       selectedCategory === category.name
//                         ? 'bg-blue-50 text-blue-700 font-medium'
//                         : 'hover:bg-gray-50 text-gray-700'
//                     }`}
//                     onClick={() => setSelectedCategory(category.name)}
//                   >
//                     <span>{category.name}</span>
//                     <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                       {category.count}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
//               <div className="p-5 border-b border-gray-100">
//                 <h3 className="font-semibold text-gray-800">Explore Topics</h3>
//               </div>
//               <div className="p-4">
//                 <div className="flex flex-wrap gap-2">
//                   {topics.map((topic) => (
//                     <span
//                       key={topic.id}
//                       className={`${topic.color} text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer hover:shadow-sm transition-all`}
//                     >
//                       {topic.label}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-md overflow-hidden text-white">
//               <div className="p-5">
//                 <div className="flex justify-between items-start mb-4">
//                   <Award className="w-10 h-10 text-blue-100" />
//                   <span className="bg-blue-400/30 text-xs font-medium px-2.5 py-1 rounded-full">Premium</span>
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Unlock Expert Networks</h3>
//                 <p className="text-blue-100 text-sm mb-4">
//                   Connect with legal operations specialists and get personalized advice for your organization.
//                 </p>
//                 <button className="group w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all">
//                   <span>Learn more</span>
//                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Main content */}
//           <div className="lg:col-span-3">
//             {/* Question input */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
//               <form onSubmit={handleSubmit}>
//                 <div className="flex flex-col">
//                   <div className="mb-4">
//                     <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
//                       Ask a question or share insights
//                     </label>
//                     <textarea
//                       id="question"
//                       rows="3"
//                       value={question}
//                       onChange={(e) => setQuestion(e.target.value)}
//                       className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 transition-all resize-none"
//                       placeholder="What's on your mind about legal operations?"
//                     ></textarea>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                       <button type="button" className="text-gray-500 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-all">
//                         <FileText className="w-5 h-5" />
//                       </button>
//                       <button type="button" className="text-gray-500 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-all">
//                         <Users className="w-5 h-5" />
//                       </button>
//                       <div className="relative inline-block">
//                         <button type="button" className="flex items-center gap-1 text-gray-700 text-sm border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-all">
//                           <span>Topics</span>
//                           <ChevronDown className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                     <button
//                       type="submit"
//                       disabled={!question.trim()}
//                       className={`px-5 py-2.5 rounded-xl font-medium transition-all ${
//                         question.trim()
//                           ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-lg'
//                           : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                       }`}
//                     >
//                       Post
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>

//             {/* Tabs */}
//             <div className="flex border-b border-gray-200 mb-6">
//               {['FOR YOU', 'TRENDING', 'LATEST', 'BOOKMARKED'].map((tab) => (
//                 <button
//                   key={tab}
//                   className={`px-4 py-3 font-medium text-sm transition-all ${
//                     activeTab === tab
//                       ? 'text-blue-600 border-b-2 border-blue-600'
//                       : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             {/* Posts */}
//             <div className="space-y-6">
//               {recentPosts.map((post) => (
//                 <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
//                   <div className="p-6">
//                     <div className="flex justify-between mb-4">
//                       <div className="flex items-center gap-3">
//                         <img
//                           src={post.user.avatar}
//                           alt={post.user.name}
//                           className="w-10 h-10 rounded-full"
//                         />
//                         <div>
//                           <div className="font-medium text-gray-900">{post.user.name}</div>
//                           <div className="text-xs text-gray-500">{post.user.role} · {post.user.company}</div>
//                         </div>
//                       </div>
//                       <div className="text-xs text-gray-400">{post.timeAgo}</div>
//                     </div>

//                     <div className="mb-4">
//                       <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
//                         {post.title}
//                       </h3>
//                       <p className="text-gray-600">{post.content}</p>
//                     </div>

//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {post.topics.map((topicId) => {
//                         const topic = topics.find(t => t.id === topicId);
//                         return (
//                           <span
//                             key={topicId}
//                             className={`${topic.color} text-xs font-medium px-2.5 py-1 rounded-full`}
//                           >
//                             {topic.label}
//                           </span>
//                         );
//                       })}
//                     </div>

//                     <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
//                       <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600">
//                         <ThumbsUp className="w-4 h-4" />
//                         <span className="text-sm">{post.votes}</span>
//                       </button>
//                       <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600">
//                         <MessageSquare className="w-4 h-4" />
//                         <span className="text-sm">{post.comments} comments</span>
//                       </button>
//                       <button className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600">
//                         <Bookmark className="w-4 h-4" />
//                         <span className="text-sm">Save</span>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Load more button */}
//             <div className="mt-8 text-center">
//               <button className="group inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-200 font-medium text-gray-700 hover:shadow-md transition-all">
//                 <span>Load more posts</span>
//                 <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CommunityPage;
// "use client"
// import React, { useState, useEffect } from 'react';
// import { 
//   Search, Users, MessageSquare, PlusCircle, BarChart2, 
//   ChevronDown, Filter
// } from 'lucide-react';
// import Feed from './_components/Feed';
// import PostCreator from './_components/PostCreator';

// const CommunityPage = () => {
//   const [activeTab, setActiveTab] = useState('FOR YOU');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showPostCreator, setShowPostCreator] = useState(false);
//   const [showPollCreator, setShowPollCreator] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
  
//   const topics = [
//     { id: 1, label: 'Legal Operations', color: 'bg-blue-100 text-blue-700' },
//     { id: 2, label: 'Legal Tech', color: 'bg-indigo-100 text-indigo-700' },
//     { id: 3, label: 'AI & Machine Learning', color: 'bg-purple-100 text-purple-700' },
//     { id: 4, label: 'Automation', color: 'bg-cyan-100 text-cyan-700' },
//     { id: 5, label: 'Knowledge Management', color: 'bg-emerald-100 text-emerald-700' },
//     { id: 6, label: 'Legal Risk', color: 'bg-amber-100 text-amber-700' }
//   ];

//   // Handle search submission
//   const handleSearch = (e) => {
//     e.preventDefault();
//     // Handle search logic
//     console.log('Searching for:', searchQuery);
//   };

//   // Handle closing modals
//   const handleCloseModals = () => {
//     setShowPostCreator(false);
//     setShowPollCreator(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative">
//       {/* Background pattern */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Legal Community
//             </h1>
//             <p className="text-gray-600">
//               Connect, learn and grow with other legal professionals
//             </p>
//           </div>
          
//           <div className="mt-4 md:mt-0 flex items-center gap-4">
//             <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all">
//               <Filter className="w-4 h-4" />
//               <span>Filter</span>
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
//               <Users className="w-4 h-4" />
//               <span>My Network</span>
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main content (left side) */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Search bar */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
//               <form onSubmit={handleSearch}>
//                 <div className="flex flex-col">
//                   <div className="relative mb-4">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Search className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-blue-400 focus:border-blue-400"
//                       placeholder="Search discussions, questions, and resources..."
//                     />
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                       <button
//                         type="button"
//                         onClick={() => setShowPostCreator(true)}
//                         className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
//                       >
//                         <MessageSquare className="w-4 h-4" />
//                         <span>Ask Question</span>
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => setShowPollCreator(true)}
//                         className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all"
//                       >
//                         <BarChart2 className="w-4 h-4" />
//                         <span>Create Poll</span>
//                       </button>
//                     </div>
//                     <button
//                       type="submit"
//                       disabled={!searchQuery.trim()}
//                       className={`px-5 py-2 rounded-lg font-medium transition-all ${
//                         searchQuery.trim()
//                           ? 'bg-gray-800 text-white hover:bg-gray-700'
//                           : 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                       }`}
//                     >
//                       Search
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>

//             {/* Tabs */}
//             <div className="flex border-b border-gray-200 mb-6">
//               {['FOR YOU', 'TRENDING', 'LATEST', 'BOOKMARKED'].map((tab) => (
//                 <button
//                   key={tab}
//                   className={`px-4 py-3 font-medium text-sm transition-all ${
//                     activeTab === tab
//                       ? 'text-blue-600 border-b-2 border-blue-600'
//                       : 'text-gray-500 hover:text-gray-700'
//                   }`}
//                   onClick={() => setActiveTab(tab)}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             {/* Feed component */}
//             <Feed />

//             {/* Load more button */}
//             <div className="mt-8 text-center">
//               <button 
//                 className="group inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-200 font-medium text-gray-700 hover:shadow-md transition-all"
//                 onClick={() => setPage(prev => prev + 1)}
//                 disabled={!hasMore || loading}
//               >
//                 <span>{loading ? 'Loading...' : 'Load more posts'}</span>
//                 <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
//               </button>
//             </div>
//           </div>

//           {/* Right sidebar */}
//           <div className="lg:col-span-1">
//             {/* Explore Topics */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
//               <div className="p-5 border-b border-gray-100">
//                 <h3 className="font-semibold text-gray-800">Explore Topics</h3>
//               </div>
//               <div className="p-4">
//                 <div className="flex flex-wrap gap-2">
//                   {topics.map((topic) => (
//                     <span
//                       key={topic.id}
//                       className={`${topic.color} text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer hover:shadow-sm transition-all`}
//                     >
//                       {topic.label}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Premium feature promo */}
//             <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-md overflow-hidden text-white mb-6">
//               <div className="p-5">
//                 <div className="flex justify-between items-start mb-4">
//                   <PlusCircle className="w-10 h-10 text-blue-100" />
//                   <span className="bg-blue-400/30 text-xs font-medium px-2.5 py-1 rounded-full">Premium</span>
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Unlock Expert Networks</h3>
//                 <p className="text-blue-100 text-sm mb-4">
//                   Connect with legal operations specialists and get personalized advice for your organization.
//                 </p>
//                 <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all">
//                   <span>Learn more</span>
//                 </button>
//               </div>
//             </div>

//             {/* Popular users section */}
//             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//               <div className="p-5 border-b border-gray-100">
//                 <h3 className="font-semibold text-gray-800">Active Contributors</h3>
//               </div>
//               <div className="p-4">
//                 <div className="space-y-4">
//                   {[1, 2, 3].map((user) => (
//                     <div key={user} className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium">
//                         {`U${user}`}
//                       </div>
//                       <div>
//                         <div className="font-medium text-gray-800">User {user}</div>
//                         <div className="text-xs text-gray-500">Legal Operations Director</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
                
//                 <button className="w-full mt-4 text-blue-600 text-sm py-2 hover:bg-blue-50 rounded-lg transition-all">
//                   View all contributors
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Post Creator Modal */}
//       {showPostCreator && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
//             <div className="p-4 border-b border-gray-100 flex justify-between items-center">
//               <h3 className="font-bold text-lg">Ask a Question</h3>
//               <button 
//                 onClick={handleCloseModals}
//                 className="p-1 rounded-full hover:bg-gray-100"
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="p-4">
//               <PostCreator />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Poll Creator Modal */}
//       {showPollCreator && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
//             <div className="p-4 border-b border-gray-100 flex justify-between items-center">
//               <h3 className="font-bold text-lg">Create a Poll</h3>
//               <button 
//                 onClick={handleCloseModals}
//                 className="p-1 rounded-full hover:bg-gray-100"
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="p-4">
//               <PostCreator />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommunityPage;
"use client"
import React, { useState, useEffect } from 'react';
import { Users, Search, BarChart2, MessageSquare, X, ChevronDown } from 'lucide-react';
import Feed from './_components/Feed';
import PostCreator from './_components/PostCreator';

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('FOR YOU');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);
  const [modalType, setModalType] = useState(null); // 'question' or 'poll'
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  
  const topics = [
    { id: 1, label: 'Legal Operations', color: 'bg-blue-100 text-blue-700' },
    { id: 2, label: 'Legal Tech', color: 'bg-indigo-100 text-indigo-700' },
    { id: 3, label: 'AI & Machine Learning', color: 'bg-purple-100 text-purple-700' },
    { id: 4, label: 'Automation', color: 'bg-cyan-100 text-cyan-700' },
    { id: 5, label: 'Knowledge Management', color: 'bg-emerald-100 text-emerald-700' },
    { id: 6, label: 'Legal Risk', color: 'bg-amber-100 text-amber-700' }
  ];

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    // This will trigger the search via the Feed component's useEffect when searchQuery changes
  };

  // Open modal for creating either a question or poll
  const openPostModal = (type) => {
    setModalType(type);
    setShowPostModal(true);
  };

  // Close the post creation modal
  const closePostModal = () => {
    setShowPostModal(false);
    setModalType(null);
  };

  return (
    <div className="min-h-screen mt-16 bg-gradient-to-b from-blue-50 via-white to-blue-50 relative">
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
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
              <Users className="w-4 h-4" />
              <span>My Network</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content - Left side (3 columns) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            {/* Search bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-5 mb-6">
  <form onSubmit={handleSearch}>
    <div className="flex flex-col">
      <div className="mb-3 sm:mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 transition-all"
            placeholder="Search discussions..."
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
        <div className="flex flex-wrap gap-2 sm:space-x-2">
          <button
            type="button"
            onClick={() => openPostModal('question')}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Ask a Question
          </button>
          <button
            type="button"
            onClick={() => openPostModal('poll')}
            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
          >
            <BarChart2 className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
            Create Poll
          </button>
        </div>
        {searchQuery && (
          <button
            type="submit"
            className="px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm rounded-xl font-medium bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-lg transition-all mt-2 sm:mt-0"
          >
            Search
          </button>
        )}
      </div>
    </div>
  </form>
</div>
            {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
              <form onSubmit={handleSearch}>
                <div className="flex flex-col">
                  <div className="mb-4">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring focus:ring-blue-100 transition-all"
                        placeholder="Search discussions, questions, and resources..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="space-x-2">
                      <button
                        type="button"
                        onClick={() => openPostModal('question')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                      >
                        Ask a Question
                      </button>
                      <button
                        type="button"
                        onClick={() => openPostModal('poll')}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
                      >
                        <BarChart2 className="w-4 h-4 inline mr-1" />
                        Create Poll
                      </button>
                    </div>
                    {searchQuery && (
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-lg transition-all"
                      >
                        Search
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div> */}

            {/* Tabs */}
            {/* <div className="flex border-b border-gray-200 mb-6">
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
            </div> */}
            <div className="flex flex-wrap border-b border-gray-200 mb-6">
  {['FOR YOU', 'TRENDING', 'LATEST', 'BOOKMARKED'].map((tab) => (
    <button
      key={tab}
      className={`px-2 py-2 md:px-4 md:py-3 font-medium text-xs md:text-sm transition-all whitespace-nowrap ${
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

            {/* Feed Component */}
            <Feed searchQuery={searchQuery} />

            {/* Load more button */}
            {hasMore && (
              <div className="mt-8 text-center">
                <button 
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-sm border border-gray-200 font-medium text-gray-700 hover:shadow-md transition-all"
                  onClick={() => {
                    // This would be implemented to load more posts
                    setIsLoading(true);
                    // Simulate loading more posts
                    setTimeout(() => {
                      setIsLoading(false);
                      // If no more posts, set hasMore to false
                      // setHasMore(false);
                    }, 1000);
                  }}
                >
                  {isLoading ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      <span>Load more posts</span>
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
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

            {/* <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-md overflow-hidden text-white mb-6">
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2">Join Discussions</h3>
                <p className="text-blue-100 text-sm mb-4">
                  Share your expertise and learn from others in the legal community.
                </p>
                <button 
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-all"
                  onClick={() => openPostModal('question')}
                >
                  Start a discussion
                </button>
              </div>
            </div> */}

<div className="hidden lg:block bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-md overflow-hidden text-white mb-6">
    <div className="p-5">
        <h3 className="text-xl font-bold mb-2">Contact Us</h3>
        <p className="text-blue-100 text-sm mb-4">
            Reach out to us for any inquiries or support.
        </p>
        <div className="text-blue-100 text-sm mb-2">
            <strong>Email:</strong> support@dreamlegal.com
        </div>
        <div className="text-blue-100 text-sm mb-4">
            <strong>Phone:</strong> +91-91095-07900
        </div>
        <button 
            className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-all"
            onClick={() => openPostModal('question')}
        >
            Start a discussion
        </button>
    </div>
</div>
        

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Recent Activities In </h3>
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">#legaltech</span>
                    {/* <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">128</span> */}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">#compliance</span>
                    {/* <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">93</span> */}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">#contractmanagement</span>
                    {/* <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">87</span> */}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">#legalops</span>
                    {/* <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">64</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post Creation Modal */}
      {showPostModal && (
       <div className="  fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
       <div className="mt-24 bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
         <div className="flex justify-between items-center p-4 border-b">
           <h2 className="text-xl font-bold text-gray-800">
             {modalType === 'question' ? 'Ask a Question' : 'Create a Poll'}
           </h2>
           <button 
             onClick={closePostModal}
             className="text-gray-500 hover:text-gray-700"
           >
             <X className="w-6 h-6" />
           </button>
         </div>
         
         {/* Remove width restrictions on the container so PostCreator can expand fully */}
         <div className="w-full">
           <PostCreator 
             initialMode={modalType === 'poll' ? 'poll' : null} 
             className="w-full" 
           />
         </div>
       </div>
     </div>
      )}
    </div>
  );
};

export default CommunityPage;