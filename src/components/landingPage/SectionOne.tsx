
// import React, { useState } from "react";
// import { ArrowRight } from 'lucide-react';
// import Link from "next/link";
// import ContactForm from "./ContactForm";
// import VideoPlayer from "./VideoPlayer"
// import CreateRfps from "./CreateRfp"
// const HeroSection = () => {
//   // const [isContactFormOpen, setIsContactFormOpen] = useState(false);
//   const [isRfpFormOpen, setIsRfpFormOpen] = useState(false);
//   return (
//     <div className="relative overflow-hidden bg-[#1e2556]">
//       {/* Background subtle gradient */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#7cc6ee20_0%,transparent_70%)]" />
      
//       {/* Animated orbs */}
//       <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-[#7cc6ee]/10 rounded-full blur-3xl animate-pulse" />
//       <div className="absolute right-1/4 bottom-1/3 w-64 h-64 bg-[#7cc6ee]/10 rounded-full blur-3xl animate-pulse delay-700" />
    
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-20">
//         <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
//           {/* Left Content */}
//           <div className="max-w-2xl lg:max-w-none lg:pr-8 lg:w-1/2">
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 
//                    leading-[1.1] lg:leading-[1.1]">
//               Discover, evaluate, & implement 
//               <span className="text-[#7cc6ee]">
//                 {" "} the right legal tech {" "}
//               </span>
//             </h1>
            
//             <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl font-medium leading-relaxed">
//             DreamLegal helps law firms and legal departments make smarter tech decisions- through reliable product information and easy vendor connect.
//             </p>

//             {/* Buttons Section */}
//             <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
//               {/* Sign Up Button */}
//               {/* <Link href="/auth/user/signup" passHref> */}
//                 <button 
//                  onClick={() => setIsRfpFormOpen(true)}
//                   className="relative z-20 group whitespace-nowrap px-8 py-4 bg-[#7cc6ee] 
//                           text-white rounded-xl font-medium hover:bg-[#5eb6e0] active:bg-[#7cc6e0] 
//                           transition-all duration-200 flex items-center 
//                           justify-center gap-2 shadow-sm hover:shadow-md text-lg 
//                           cursor-pointer focus:outline-none 
//                           hover:ring-2 hover:ring-[#5eb6e0] hover:ring-opacity-50 
//                           hover:scale-105 active:scale-95 w-full sm:w-auto"
//                 >
//                   Share Requirements
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
//               {/* </Link> */}

//               {/* Contact Us Button */}
//               <Link href="/directory" passHref>
//               <button 
               
//                 className="relative z-20 group whitespace-nowrap px-8 py-4 bg-white 
//                           text-[#1e2556] rounded-xl font-medium hover:bg-gray-100 active:bg-white
//                           transition-all duration-200 flex items-center 
//                           justify-center gap-2 shadow-sm hover:shadow-md text-lg 
//                           cursor-pointer focus:outline-none 
//                           hover:ring-2 hover:ring-white hover:ring-opacity-50 
//                           hover:scale-105 active:scale-95 w-full sm:w-auto"
//               >
//                 Explore marketplace
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>
//               </Link>
//             </div>
//           </div>

//           {/* Right Video */}
//           <div className="relative z-10 w-full max-w-2xl lg:max-w-none mx-auto lg:w-1/2">
//             <div className="lg:ml-auto">
//               <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#7cc6ee]/20">
//                 <VideoPlayer />
//               </div>
//             </div>
//             <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-white/80 font-medium">
//               <span className="flex items-center gap-2 bg-[#1e2556]/30 border border-[#7cc6ee]/20 px-3 py-1.5 rounded-lg">
//                 <span className="text-[#7cc6ee]">🌐</span> Enterprise-ready
//               </span>
//               <span className="flex items-center gap-2 bg-[#1e2556]/30 border border-[#7cc6ee]/20 px-3 py-1.5 rounded-lg">
//                 <span className="text-[#7cc6ee]">⚡</span> AI powered
//               </span>
//               <span className="flex items-center gap-2 bg-[#1e2556]/30 border border-[#7cc6ee]/20 px-3 py-1.5 rounded-lg">
//                 <span className="text-[#7cc6ee]">🔒</span> Highly secure
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Contact Form Modal */}
//       {isRfpFormOpen && (
//         <CreateRfps 
//           isOpen={isRfpFormOpen} 
//           onClose={() => setIsRfpFormOpen(false)} 
//         />
//       )}
      
//       <style jsx global>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 0.2; }
//           50% { opacity: 0.3; }
//         }
//         .animate-pulse {
//           animation: pulse 4s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default HeroSection;
import React, { useState } from "react";
import { ArrowRight, Search, Sparkles } from 'lucide-react';

const categoryData = [
  { id: 'CONTRACT-LIFECYCLE-MANAGEMENT', name: 'Contract Lifecycle Management', shortName: 'Contracts' },
  { id: 'LEGAL-AI', name: 'Legal AI', shortName: 'Legal AI' },
  { id: 'DOCUMENT-MANAGEMENT-SYSTEM', name: 'Document Management System', shortName: 'Documents' },
  { id: 'LITIGATION-MANAGEMENT-AND-ANALYTICS', name: 'Litigation Management & Analytics', shortName: 'Litigation' },
  { id: 'IP-MANAGEMENT', name: 'IP Management', shortName: 'IP Management' },
  { id: 'LEGAL-RESEARCH', name: 'Legal Research', shortName: 'Research' },
  { id: 'E-DISCOVERY', name: 'E-Discovery', shortName: 'E-Discovery' }
];

const HeroSection = () => {
  const [isRfpFormOpen, setIsRfpFormOpen] = useState(false);
  const [searchMode, setSearchMode] = useState('directory'); // 'directory' or 'rfp'
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchMode === 'directory') {
      // Navigate to directory with search query
      window.location.href = `/directory?search=${encodeURIComponent(searchQuery)}`;
    } else {
      // Open RFP form with selected category
      if (selectedCategory) {
        setIsRfpFormOpen(true);
      }
    }
  };

  return (
    <div className="relative overflow-hidden bg-[#1e2556]">
      {/* Background subtle gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#7cc6ee20_0%,transparent_70%)]" />
      
      {/* Animated orbs */}
      <div className="absolute left-1/4 top-1/3 w-64 h-64 bg-[#7cc6ee]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute right-1/4 bottom-1/3 w-64 h-64 bg-[#7cc6ee]/10 rounded-full blur-3xl animate-pulse delay-700" />
    
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-20">
        <div className="flex flex-col gap-12">
          {/* Header Section */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Connect with trusted companies
              <br />
              <span className="text-[#7cc6ee]">for your next project</span>
            </h1>
            
            <p className="text-xl text-white/80 mb-8 font-medium">
              Find the perfect legal tech solution for your needs
            </p>

            {/* Search Bar with Toggle */}
            <div className="max-w-3xl mx-auto">
              {/* Toggle Buttons */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <button
                  onClick={() => setSearchMode('directory')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    searchMode === 'directory'
                      ? 'bg-white text-[#1e2556] shadow-lg'
                      : 'bg-[#1e2556]/50 text-white/70 hover:text-white border border-white/20'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  Browse on your own
                </button>
                <button
                  onClick={() => setSearchMode('rfp')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                    searchMode === 'rfp'
                      ? 'bg-white text-[#1e2556] shadow-lg'
                      : 'bg-[#1e2556]/50 text-white/70 hover:text-white border border-white/20'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Let us match you
                </button>
              </div>

              {/* Search Input Area */}
              <div className="bg-white rounded-2xl shadow-2xl p-3">
                {searchMode === 'directory' ? (
                  /* Directory Search */
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      placeholder="What do you need help with?"
                      className="flex-1 px-6 py-4 text-lg text-gray-700 placeholder-gray-400 bg-transparent focus:outline-none"
                    />
                    <button
                      onClick={handleSearch}
                      className="px-8 py-4 bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold rounded-xl transition-all duration-200 whitespace-nowrap"
                    >
                      Get Matched
                    </button>
                  </div>
                ) : (
                  /* RFP Category Selection */
                  <div className="flex gap-3">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="flex-1 px-6 py-4 text-lg text-gray-700 bg-transparent focus:outline-none cursor-pointer"
                    >
                      <option value="">Select a category...</option>
                      {categoryData.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={handleSearch}
                      disabled={!selectedCategory}
                      className={`px-8 py-4 font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${
                        selectedCategory
                          ? 'bg-[#ef4444] hover:bg-[#dc2626] text-white'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Get Matched
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="text-white font-semibold text-lg mb-2">Enterprise-ready</h3>
              <p className="text-white/70 text-sm">Built for scale and reliability</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-white font-semibold text-lg mb-2">AI powered</h3>
              <p className="text-white/70 text-sm">Smart matching technology</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-200">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-white font-semibold text-lg mb-2">Highly secure</h3>
              <p className="text-white/70 text-sm">Your data is protected</p>
            </div>
          </div>
        </div>
      </div>

      {/* RFP Form Modal - would open with selectedCategory */}
      {isRfpFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-[#1e2556] mb-4">
              Create RFP
            </h3>
            <p className="text-gray-600 mb-4">
              Selected category: <strong>{categoryData.find(c => c.id === selectedCategory)?.name}</strong>
            </p>
            <button
              onClick={() => setIsRfpFormOpen(false)}
              className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.3; }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;