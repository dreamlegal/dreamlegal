"use client"
// import React, { useState } from 'react';

// import { 
//   Search, 
//   FileText, 
//   BarChart2, 
//   Megaphone, 
//   Share2, 
//   Building2,
//   Settings,
//   X
// } from 'lucide-react';

// const services = [
//   {
//     id: 'seo',
//     title: 'SEO',
//     icon: <Settings className="w-5 h-5" />
//   },
//   {
//     id: 'content',
//     title: 'Content Marketing',
//     icon: <FileText className="w-5 h-5" />
//   },
//   {
//     id: 'research',
//     title: 'Market Research',
//     icon: <BarChart2 className="w-5 h-5" />
//   },
//   {
//     id: 'advertising',
//     title: 'Advertising',
//     icon: <Megaphone className="w-5 h-5" />
//   },
//   {
//     id: 'social',
//     title: 'Social Media',
//     icon: <Share2 className="w-5 h-5" />
//   },
//   {
//     id: 'agency',
//     title: 'Agency Solutions',
//     icon: <Building2 className="w-5 h-5" />
//   }
// ];

// // SVG Component for the circular graph
// const CircularGraph = () => (
//   <svg viewBox="0 0 200 200" className="w-48 h-48">
//     <circle cx="100" cy="100" r="80" fill="none" stroke="#eee" strokeWidth="2" />
//     <circle cx="100" cy="100" r="60" fill="none" stroke="#eee" strokeWidth="2" />
//     <circle cx="100" cy="100" r="40" fill="none" stroke="#eee" strokeWidth="2" />
//     <path
//       d="M100,20 A80,80 0 0,1 180,100"
//       fill="none"
//       stroke="#4CAF50"
//       strokeWidth="4"
//     />
//     <text x="100" y="100" textAnchor="middle" className="text-xs font-medium">
//       SEO Writing Assistant
//     </text>
//   </svg>
// );

// const ContentMarketing = () => {
//   const [activeTab, setActiveTab] = useState('content');

//   return (
//     <div className="w-full max-w-6xl mx-auto bg-white p-8">
//       {/* Navigation */}
//       <div className="flex items-center space-x-8 border-b border-gray-200 mb-8">
//         {services.map((service) => (
//           <button
//             key={service.id}
//             onClick={() => setActiveTab(service.id)}
//             className={`flex items-center gap-2 pb-4 ${
//               activeTab === service.id
//                 ? 'border-b-2 border-indigo-600 text-indigo-600'
//                 : 'text-gray-600'
//             }`}
//           >
//             {service.icon}
//             <span className="font-medium">{service.title}</span>
//           </button>
//         ))}
//       </div>

//       {/* Main Content */}
//       <div className="grid grid-cols-2 gap-12">
//         {/* Left Column */}
//         <div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-6">
//             Create content that ranks
//             <br />
//             <span className="text-gray-500 text-lg font-normal">(no expert knowledge required)</span>
//           </h2>

//           <ul className="space-y-4 mb-8">
//             <li>Find topics that resonate with your audience</li>
//             <li>Get actionable tips to create SEO-friendly content</li>
//             <li>Optimize your content for engagement and organic traffic</li>
//             <li>Use AI features to easily rewrite and improve your copy</li>
//           </ul>

//           <button className="bg-orange-400 text-white px-6 py-3 rounded-lg hover:bg-orange-500 transition-colors">
//             Try Content Marketing Toolkit
//           </button>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Topic Research */}
//           <div className="bg-gray-50 rounded-lg p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="font-medium">Topic Research</h3>
//               <X className="w-4 h-4 text-gray-400" />
//             </div>
            
//             <div className="flex gap-2 mb-4">
//               <div className="flex-1">
//                 <input
//                   type="text"
//                   placeholder="Search Content on Domain"
//                   className="w-full px-4 py-2 border border-gray-200 rounded-lg"
//                 />
//               </div>
//               <button className="px-4 py-2 bg-green-500 text-white rounded-lg">
//                 Get Content Ideas
//               </button>
//             </div>

//             <div className="relative">
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="font-medium text-lg mb-1">content</div>
//                   <div className="text-sm text-gray-500">SEO Writing Assistant</div>
//                 </div>
//               </div>
//               <CircularGraph />
//             </div>
//           </div>

//           {/* Metrics Grid */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-white p-4 rounded-lg border border-gray-100">
//               <div className="text-sm text-gray-600">Readability</div>
//               <div className="mt-2 flex items-center justify-between">
//                 <span className="text-green-500 font-medium">Good</span>
//                 <span className="text-sm text-gray-500">92/100</span>
//               </div>
//             </div>
//             <div className="bg-white p-4 rounded-lg border border-gray-100">
//               <div className="text-sm text-gray-600">SEO</div>
//               <div className="mt-2 flex items-center justify-between">
//                 <span className="text-green-500 font-medium">Good</span>
//                 <span className="text-sm text-gray-500">88/100</span>
//               </div>
//             </div>
//             <div className="bg-white p-4 rounded-lg border border-gray-100">
//               <div className="text-sm text-gray-600">Originality</div>
//               <div className="mt-2 flex items-center justify-between">
//                 <span className="text-green-500 font-medium">Good</span>
//                 <span className="text-sm text-gray-500">95/100</span>
//               </div>
//             </div>
//             <div className="bg-white p-4 rounded-lg border border-gray-100">
//               <div className="text-sm text-gray-600">Tone of voice</div>
//               <div className="mt-2 flex items-center justify-between">
//                 <span className="text-green-500 font-medium">Good</span>
//                 <span className="text-sm text-gray-500">90/100</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContentMarketing;

// import React, { useState } from 'react';
// import { Settings, FileText, BarChart2, Megaphone, Share2, Users } from 'lucide-react';

const services = [
  {
    id: 'seo',
    icon: Settings,
    title: 'SEO',
    content: {
      title: "Optimize Your Search Engine Rankings",
      description: "Unveil your website's true SEO potential",
      features: [
        "Advanced keyword ranking analysis",
        "Technical SEO audit automation",
        "Competitor backlink analysis",
        "Content gap identification"
      ],
      stats: [
        { label: "Organic", value: "52.1%", visits: "17.1M" },
        { label: "Direct", value: "31.2%", visits: "10.2M" },
        { label: "Social", value: "10.5%", visits: "3.4M" },
        { label: "Referral", value: "6.2%", visits: "2.1M" }
      ]
    }
  },
  {
    id: 'content',
    icon: FileText,
    title: 'Content Marketing',
    content: {
      title: "Create Content That Converts",
      description: "Master your content strategy",
      features: [
        "Content performance tracking",
        "Topic cluster analysis",
        "Content ROI measurement",
        "Audience engagement metrics"
      ],
      stats: [
        { label: "Blog Posts", value: "45.3%", visits: "14.2M" },
        { label: "Videos", value: "28.4%", visits: "8.9M" },
        { label: "Infographics", value: "15.2%", visits: "4.7M" },
        { label: "Podcasts", value: "11.1%", visits: "3.5M" }
      ]
    }
  },
  {
    id: 'research',
    icon: BarChart2,
    title: 'Market Research',
    content: {
      title: "Unveil Your Competitors' Strategy",
      description: "Get ahead with data-driven insights",
      features: [
        "Analyze traffic of any website",
        "Unveil competitor promotion strategies",
        "Get ideas for growing your market share",
        "Discover keyword & backlink gaps"
      ],
      stats: [
        { label: "Search", value: "48.2%", visits: "15.8M" },
        { label: "Paid", value: "26.7%", visits: "8.7M" },
        { label: "Social", value: "15.6%", visits: "5.1M" },
        { label: "Other", value: "9.5%", visits: "3.1M" }
      ]
    }
  },
  {
    id: 'advertising',
    icon: Megaphone,
    title: 'Advertising',
    content: {
      title: "Maximize Your Ad Performance",
      description: "Optimize your advertising ROI",
      features: [
        "Cross-channel ad performance",
        "Budget optimization tools",
        "A/B testing automation",
        "Conversion tracking"
      ],
      stats: [
        { label: "Display", value: "42.3%", visits: "13.8M" },
        { label: "Search", value: "35.6%", visits: "11.6M" },
        { label: "Social", value: "14.8%", visits: "4.8M" },
        { label: "Video", value: "7.3%", visits: "2.4M" }
      ]
    }
  },
  {
    id: 'social',
    icon: Share2,
    title: 'Social Media',
    content: {
      title: "Dominate Social Media Channels",
      description: "Enhance your social media presence",
      features: [
        "Social engagement tracking",
        "Competitor social analysis",
        "Content performance metrics",
        "Audience growth tracking"
      ],
      stats: [
        { label: "Instagram", value: "38.4%", visits: "12.5M" },
        { label: "Facebook", value: "31.2%", visits: "10.2M" },
        { label: "Twitter", value: "18.6%", visits: "6.1M" },
        { label: "LinkedIn", value: "11.8%", visits: "3.9M" }
      ]
    }
  },
  {
    id: 'agency',
    icon: Users,
    title: 'Agency Solutions',
    content: {
      title: "Scale Your Agency Operations",
      description: "All-in-one agency management platform",
      features: [
        "Client reporting automation",
        "Team collaboration tools",
        "Project management suite",
        "White-label solutions"
      ],
      stats: [
        { label: "Projects", value: "45.2%", visits: "14.8M" },
        { label: "Clients", value: "28.9%", visits: "9.4M" },
        { label: "Tasks", value: "16.4%", visits: "5.3M" },
        { label: "Reports", value: "9.5%", visits: "3.1M" }
      ]
    }
  }
];

// const ServiceTab = ({ service, isActive, onClick }) => {

//   const Icon = service.icon;
//   return (
//     <button
//       onClick={() => onClick(service.id)}
//       className={`
//         flex items-center gap-3 px-6 py-4 w-full transition-all duration-300
//         border-b-2 hover:bg-white/5
//         ${isActive ? 
//           'border-blue-500 bg-white/5 text-white' : 
//           'border-transparent text-gray-400 hover:text-white'
//         }
//       `}
//     >
//       <Icon className="w-5 h-5" />
//       <span className="font-medium">{service.title}</span>
//     </button>
//   );
// };

// const StatBar = ({ label, value, visits }) => (
//   <div className="space-y-2">
//     <div className="flex justify-between text-sm">
//       <span className="text-gray-400">{label}</span>
//       <div className="flex gap-4">
//         <span className="text-gray-400">{value}</span>
//         <span className="text-blue-400">{visits}</span>
//       </div>
//     </div>
//     <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
//       <div 
//         className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
//         style={{ width: value }}
//       />
//     </div>
//   </div>
// );

// const MarketingDashboard = () => {
//   const [activeTab, setActiveTab] = useState('research');
//   const activeService = services.find(s => s.id === activeTab);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-white mb-8">See what's inside</h1>
        
//         <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden">
//           {/* Tabs Navigation */}
//           <div className="grid grid-cols-3 md:grid-cols-6">
//             {services.map(service => (
//               <ServiceTab 
//                 key={service.id}
//                 service={service}
//                 isActive={activeTab === service.id}
//                 onClick={setActiveTab}
//               />
//             ))}
//           </div>

//           {/* Content Section */}
//           <div className="p-8 grid md:grid-cols-2 gap-12">
//             {/* Left Column */}
//             <div className="space-y-6">
//               <div>
//                 <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-2">
//                   {activeService.content.title}
//                 </h2>
//                 <p className="text-gray-400">
//                   {activeService.content.description}
//                 </p>
//               </div>

//               <div className="space-y-4">
//                 {activeService.content.features.map((feature, index) => (
//                   <div key={index} className="flex items-center gap-3 text-gray-300">
//                     <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
//                     <span>{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
//                 Try Competitive Research Toolkit
//               </button>
//             </div>

//             {/* Right Column - Stats */}
//             <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-gray-800">
//               <div className="mb-6">
//                 <h3 className="text-lg font-medium text-white mb-1">Market Overview</h3>
//                 <div className="flex justify-between text-sm text-gray-500">
//                   <span>Traffic Sources by Type</span>
//                   <span>Last 30 days</span>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {activeService.content.stats.map((stat, index) => (
//                   <StatBar key={index} {...stat} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarketingDashboard;
// import React, { useState } from 'react';
// import { Settings, FileText, BarChart2, Megaphone, Share2, Users } from 'lucide-react';

// // ... (previous services data remains the same)

// const ServiceTab = ({ service, isActive, onClick }) => {
//   const Icon = service.icon;
//   return (
//     <button
//       onClick={() => onClick(service.id)}
//       className={`
//         flex items-center gap-3 px-4 md:px-6 py-4 w-full transition-all duration-300
//         relative isolate
//         ${isActive ? 
//           'text-gray-900 font-medium' : 
//           'text-gray-500 hover:text-gray-800'
//         }
//       `}
//     >
//       {/* Active Tab Indicator */}
//       {isActive && (
//         <>
//           {/* Bottom border */}
//           <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
//           {/* Background */}
//           <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-50 -z-10" />
//         </>
//       )}
      
//       <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-gray-900' : 'text-gray-400'}`} />
//       <span className="text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">
//         {service.title}
//       </span>
//     </button>
//   );
// };

// const StatBar = ({ label, value, visits }) => (
//   <div className="space-y-2">
//     <div className="flex justify-between text-sm">
//       <span className="text-gray-600">{label}</span>
//       <div className="flex gap-4">
//         <span className="text-gray-600">{value}</span>
//         <span className="text-gray-900 font-medium">{visits}</span>
//       </div>
//     </div>
//     <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//       <div 
//         className="h-full bg-gradient-to-r from-gray-700 to-gray-900 rounded-full transition-all duration-500"
//         style={{ width: value }}
//       />
//     </div>
//   </div>
// );

// const MarketingDashboard = () => {
//   const [activeTab, setActiveTab] = useState('research');
//   const activeService = services.find(s => s.id === activeTab);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
//           See what's inside
//         </h1>
        
//         <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
//           {/* Tabs Navigation */}
//           <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
//             {services.map(service => (
//               <div key={service.id} className="flex-shrink-0 w-1/3 md:w-1/6">
//                 <ServiceTab 
//                   service={service}
//                   isActive={activeTab === service.id}
//                   onClick={setActiveTab}
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Content Section */}
//           <div className="p-4 md:p-8 grid md:grid-cols-2 gap-6 md:gap-12">
//             {/* Left Column */}
//             <div className="space-y-4 md:space-y-6">
//               <div>
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
//                   {activeService.content.title}
//                 </h2>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   {activeService.content.description}
//                 </p>
//               </div>

//               <div className="space-y-3 md:space-y-4">
//                 {activeService.content.features.map((feature, index) => (
//                   <div key={index} className="flex items-center gap-3 text-gray-700 text-sm md:text-base">
//                     <div className="h-1.5 w-1.5 rounded-full bg-gray-900 flex-shrink-0" />
//                     <span>{feature}</span>
//                   </div>
//                 ))}
//               </div>

//               <button className="w-full md:w-auto group px-6 md:px-8 py-3 bg-gray-900 rounded-lg text-white font-medium hover:bg-gray-800 relative overflow-hidden transition-all duration-300">
//                 <span className="relative z-10">Try Competitive Research Toolkit</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-950 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </button>
//             </div>

//             {/* Right Column - Stats */}
//             <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6 border border-gray-100">
//               <div className="mb-4 md:mb-6">
//                 <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1">
//                   Market Overview
//                 </h3>
//                 <div className="flex justify-between text-xs md:text-sm text-gray-500">
//                   <span>Traffic Sources by Type</span>
//                   <span>Last 30 days</span>
//                 </div>
//               </div>

//               <div className="space-y-4 md:space-y-6">
//                 {activeService.content.stats.map((stat, index) => (
//                   <StatBar key={index} {...stat} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarketingDashboard;

import React, { useState, useEffect } from 'react';
import { Settings, FileText, BarChart2, Megaphone, Share2, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceTab = ({ service, isActive, onClick, index }) => {
  const Icon = service.icon;
  
  return (
    <motion.button
      onClick={() => onClick(service.id)}
      className={`
        flex items-center gap-3 px-4 md:px-6 py-4 w-full
        relative isolate group
        ${isActive ? 'text-gray-900 font-medium' : 'text-gray-500'}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 -z-10"
          initial={false}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
      
      <Icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-300
        ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
      <span className="text-sm md:text-base whitespace-nowrap overflow-hidden text-ellipsis">
        {service.title}
      </span>
    </motion.button>
  );
};

const StatBar = ({ label, value, visits, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
    className="space-y-2"
  >
    <div className="flex justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <div className="flex gap-4">
        <span className="text-gray-600">{value}</span>
        <span className="text-gray-900 font-medium">{visits}</span>
      </div>
    </div>
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <motion.div 
        className="h-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: value }}
        transition={{ duration: 1, delay }}
      />
    </div>
  </motion.div>
);

const MobileTabSelector = ({ services, activeTab, setActiveTab }) => {
  return (
    <div className="relative md:hidden">
      <select
        value={activeTab}
        onChange={(e) => setActiveTab(e.target.value)}
        className="w-full p-3 bg-white border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {services.map(service => (
          <option key={service.id} value={service.id}>
            {service.title}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <BarChart2 className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

const MarketingDashboard = () => {
  const [activeTab, setActiveTab] = useState('research');
  const [mounted, setMounted] = useState(false);
  const activeService = services.find(s => s.id === activeTab);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-4 md:p-8">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Marketing Intelligence
        </h1>
        
        <div className="bg-white rounded-xl md:rounded-2xl shadow-[0_10px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden backdrop-blur-sm">
          <MobileTabSelector services={services} activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="hidden md:flex overflow-x-auto scrollbar-hide border-b border-gray-200">
            {services.map((service, index) => (
              <div key={service.id} className="flex-shrink-0 w-1/6">
                <ServiceTab 
                  service={service}
                  isActive={activeTab === service.id}
                  onClick={setActiveTab}
                  index={index}
                />
              </div>
            ))}
          </div>

          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 md:p-8 grid md:grid-cols-2 gap-6 md:gap-12"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {activeService.content.title}
                </h2>
                <p className="text-gray-600">
                  {activeService.content.description}
                </p>
              </motion.div>

              <div className="space-y-4">
                {activeService.content.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto group px-6 md:px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg text-white font-medium relative overflow-hidden"
              >
                <span className="relative z-10">Try {activeService.content.title}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </div>

            <div className="bg-gray-50 rounded-lg md:rounded-xl p-4 md:p-6 border border-gray-100">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  Market Overview
                </h3>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Traffic Sources</span>
                  <span>Last 30 days</span>
                </div>
              </motion.div>

              <div className="space-y-6">
                {activeService.content.stats.map((stat, index) => (
                  <StatBar key={index} {...stat} delay={0.5 + index * 0.1} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketingDashboard;