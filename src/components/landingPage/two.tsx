
// "use client"
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import CategoriesProducts from "@/app/(home)/directory/_components/PaidFeaturing"
// import LandingSections from '@/app/(home)/directory/_components/LandingSections';
// import { 
//   Search, 
//   FileText, 
//   Brain, 
//   FolderOpen, 
//   Scale, 
//   Shield, 
//   BookOpen, 
//   Eye,
//   MessageCircle,
//   Sparkles
// } from 'lucide-react';
// import { FolderKanban, ShieldCheck, FileSearch } from 'lucide-react';
// // Category data with icons and display names
// const categoryData = [
//   {
//     id: 'CONTRACT-LIFECYCLE-MANAGEMENT',
//     name: 'Contract Lifecycle Management',
//     shortName: 'Contracts',
//     icon: FileText,
//     color: 'bg-[#7cc6ee]'
//   },
//   {
//     id: 'LEGAL-AI',
//     name: 'Legal AI',
//     shortName: 'Legal AI',
//     icon: Brain,
//     color: 'bg-[#7cc6ee]'
//   },
//   {
//     id: 'DOCUMENT-MANAGEMENT-SYSTEM',
//     name: 'Document Management System',
//     shortName: 'Documents',
//     icon: FolderOpen,
//     color: 'bg-[#7cc6ee]'
//   },
//   {
//     id: 'LITIGATION-MANAGEMENT-AND-ANALYTICS',
//     name: 'Litigation Management & Analytics',
//     shortName: 'Litigation',
//     icon: Scale,
//     color: 'bg-[#7cc6ee]'
//   },
//   {
//     id: 'IP-MANAGEMENT',
//     name: 'IP Management',
//     shortName: 'IP Management',
//     icon: Shield,
//     color: 'bg-[#7cc6ee]'
//   },
//   {
//     id: 'LEGAL-RESEARCH',
//     name: 'Legal Research',
//     shortName: 'Research',
//     icon: BookOpen,
//     color: 'bg-[#7cc6ee]'
//   },
//   {
//     id: 'E-DISCOVERY',
//     name: 'E-Discovery',
//     shortName: 'E-Discovery',
//     icon: Eye,
//     color: 'bg-[#7cc6ee]'
//   },
//   {
//     id: 'CASE-MANAGEMENT',
//     name: 'Case Management Software',
//     shortName: 'Case Management',
//     icon: FolderKanban,
//     color: 'bg-[#7cc6ee]'
//   },
//   {
//     id: 'GOVERNANCE-RISK-COMPLIANCE',
//     name: 'Governance, Risk & Compliance (GRC)',
//     shortName: 'GRC',
//     icon: ShieldCheck,
//     color: 'bg-[#7cc6ee]'
//   },
//   {
//     id: 'LEGAL-DUE-DILIGENCE',
//     name: 'Legal Due Diligence Software',
//     shortName: 'Due Diligence',
//     icon: FileSearch,
//     color: 'bg-[#7cc6ee]'
//   }
// ];

// const DirectoryLanding = () => {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [searchMode, setSearchMode] = useState('rfp'); // 'directory' or 'rfp' - default to rfp to match image
  
//   // Typing effect state
//   const [currentWordIndex, setCurrentWordIndex] = useState(0);
//   const [displayText, setDisplayText] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);
  
//   const typingWords = ['Contract Management', 'Legal AI', 'IP Management', 'Legal Research'];

//   // Typing effect
//   useEffect(() => {
//     const currentWord = typingWords[currentWordIndex];
//     const typingSpeed = isDeleting ? 50 : 100;
//     const pauseTime = isDeleting ? 500 : 2000;

//     const timer = setTimeout(() => {
//       if (!isDeleting && displayText === currentWord) {
//         setTimeout(() => setIsDeleting(true), pauseTime);
//       } else if (isDeleting && displayText === '') {
//         setIsDeleting(false);
//         setCurrentWordIndex((prev) => (prev + 1) % typingWords.length);
//       } else {
//         setDisplayText(prev => 
//           isDeleting 
//             ? prev.slice(0, -1)
//             : currentWord.slice(0, prev.length + 1)
//         );
//       }
//     }, typingSpeed);

//     return () => clearTimeout(timer);
//   }, [displayText, isDeleting, currentWordIndex, typingWords]);

//   const handleSearch = (e) => {
//     e.preventDefault();
    
//     if (searchMode === 'directory') {
//       // Navigate to directory products with search query
//       const params = new URLSearchParams();
//       if (searchQuery) params.append('q', searchQuery);
//       router.push(`/directory/products${params.toString() ? `?${params.toString()}` : ''}`);
//     } else {
//       // Navigate to RFP form with pre-selected category
//       if (selectedCategory) {
//         router.push(`/rfp?category=${selectedCategory}`);
//       }
//     }
//   };

//   const handleCategoryClick = (categoryId) => {
//     router.push(`/category/${categoryId.toLowerCase()}`);
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="bg-[#1e2556] relative overflow-hidden pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-14 md:pb-16 min-h-[500px] sm:min-h-[550px] md:min-h-[600px]">
//         {/* Background Image with Overlay */}
//         <div className="absolute inset-0">
//           <div className="absolute inset-0 bg-[#1e2556]/80 z-10"></div>
//           <img 
//             src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
//             alt="Legal team background" 
//             className="w-full h-full object-cover opacity-30"
//           />
//         </div>

//         {/* Background decorative elements */}
//         <div className="absolute inset-0 z-5">
//           <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-40 h-40 sm:w-64 sm:h-64 bg-[#7cc6ee]/10 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-48 h-48 sm:w-80 sm:h-80 bg-[#7cc6ee]/5 rounded-full blur-3xl"></div>
//         </div>

//         {/* Main Content */}
//         <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center min-h-[400px] sm:min-h-[450px] md:min-h-[500px]">
//             {/* Left Side - Content */}
//             <div className="lg:col-span-7 text-center lg:text-left">
//               {/* Hero Heading with Typing Effect */}
//               <div className="mb-6 sm:mb-8">
//                 <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
//                   Discover, Compare and Implement<br className="hidden sm:block" />
//                   <span className="sm:hidden"> </span>the best{' '}
//                   <span className="text-[#7cc6ee] relative inline-block">
//                     <span className="break-words">{displayText}</span>
//                     <span className="animate-pulse">|</span>
//                   </span>
//                 </h1>
//               </div>

//               {/* Toggle Buttons - Matching the image design */}
//               <div className="flex items-center justify-center lg:justify-start gap-0 mb-5 sm:mb-6">
//                 <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20 w-full sm:w-auto max-w-md sm:max-w-none">
//                   <button
//                     onClick={() => setSearchMode('rfp')}
//                     className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-200 text-sm sm:text-base flex-1 sm:flex-initial ${
//                       searchMode === 'rfp'
//                         ? 'bg-[#1a1f3a] text-white shadow-lg'
//                         : 'text-white/80 hover:text-white'
//                     }`}
//                   >
//                     <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                     <span className="whitespace-nowrap text-xs sm:text-sm md:text-base">Let us match you</span>
//                   </button>
//                   <button
//                     onClick={() => setSearchMode('directory')}
//                     className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-200 text-sm sm:text-base flex-1 sm:flex-initial ${
//                       searchMode === 'directory'
//                         ? 'bg-[#1a1f3a] text-white shadow-lg'
//                         : 'text-white/80 hover:text-white'
//                     }`}
//                   >
//                     <span className="whitespace-nowrap text-xs sm:text-sm md:text-base">Browse on your own</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Search Bar / Category Selector - Same row on desktop, stacked on mobile */}
//               <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-4xl mx-auto lg:mx-0 mb-5 sm:mb-6">
//                 {searchMode === 'directory' ? (
//                   // Directory Search Mode
//                   <>
//                     <input
//                       type="text"
//                       placeholder="What do you need help with?"
//                       className="flex-1 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base border-0 focus:ring-2 focus:ring-[#7cc6ee] focus:outline-none bg-white text-gray-700 placeholder:text-gray-400 rounded-xl sm:rounded-2xl shadow-xl"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       onKeyPress={(e) => {
//                         if (e.key === 'Enter') {
//                           handleSearch(e);
//                         }
//                       }}
//                     />
//                     <button 
//                       onClick={(e) => handleSearch(e)}
//                       className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-[#ef4444] text-white font-semibold hover:bg-[#dc2626] active:bg-[#b91c1c]
//                                transition-colors duration-200 rounded-xl sm:rounded-2xl shadow-xl whitespace-nowrap text-sm sm:text-base"
//                     >
//                       Get Matched
//                     </button>
//                   </>
//                 ) : (
//                   // RFP Category Selection Mode
//                   <>
//                     <select
//                       value={selectedCategory}
//                       onChange={(e) => setSelectedCategory(e.target.value)}
//                       onKeyPress={(e) => {
//                         if (e.key === 'Enter' && selectedCategory) {
//                           handleSearch(e);
//                         }
//                       }}
//                       className="flex-1 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base border-0 focus:ring-2 focus:ring-[#7cc6ee] focus:outline-none bg-white text-gray-700 cursor-pointer appearance-none rounded-xl sm:rounded-2xl shadow-xl"
//                       style={{
//                         backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
//                         backgroundRepeat: 'no-repeat',
//                         backgroundPosition: 'right 0.75rem center',
//                         backgroundSize: '1.25em 1.25em',
//                         paddingRight: '2.5rem'
//                       }}
//                     >
//                       <option value="">What do you need help with?</option>
//                       {categoryData.map((category) => (
//                         <option key={category.id} value={category.id}>
//                           {category.name}
//                         </option>
//                       ))}
//                     </select>
//                     <button 
//                       onClick={(e) => handleSearch(e)}
//                       disabled={!selectedCategory}
//                       className={`px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 font-semibold transition-all duration-200 rounded-xl sm:rounded-2xl shadow-xl whitespace-nowrap text-sm sm:text-base ${
//                         selectedCategory
//                           ? 'bg-[#ef4444] text-white hover:bg-[#dc2626] active:bg-[#b91c1c]'
//                           : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                       }`}
//                     >
//                       Get Matched
//                     </button>
//                   </>
//                 )}
//               </div>

//               {/* Subtitle */}
//               <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
//                 We simplify technology decisions with trusted product data and industry insights for legal teams.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Browse by Category Section - Separated with White Background */}
//       <div className="bg-white py-12 sm:py-14 md:py-16">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1e2556] text-center mb-3 sm:mb-4">
//             Browse by Category
//           </h2>
//           <p className="text-sm sm:text-base text-[#334155] text-center mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4">
//             Explore our comprehensive directory of legal technology solutions tailored to your specific needs
//           </p>
          
//           <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
//             {categoryData.map((category) => {
//               const IconComponent = category.icon;
//               return (
//                 <div
//                   key={category.id}
//                   onClick={() => handleCategoryClick(category.id)}
//                   className="flex flex-col items-center cursor-pointer group transform hover:scale-105 active:scale-95 transition-all duration-200"
//                 >
//                   {/* Icon Container */}
//                   <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 ${category.color} rounded-xl sm:rounded-2xl 
//                                  flex items-center justify-center shadow-lg group-hover:shadow-xl
//                                  transition-all duration-200 mb-2 sm:mb-3 group-hover:bg-[#1e2556]`}>
//                     <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
//                   </div>
                  
//                   {/* Category Name */}
//                   <span className="text-xs sm:text-sm md:text-base font-medium text-[#2d2d2d] text-center
//                                  group-hover:text-[#7cc6ee] transition-colors duration-200
//                                  leading-tight max-w-[80px] sm:max-w-[100px] md:max-w-[120px] px-1">
//                     {category.shortName}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
      
//       {/* Categories Products and Landing Sections */}
//       <CategoriesProducts/>
//       <LandingSections />
      
//       {/* Mobile Floating Ask Question Button */}
//       <div className="md:hidden fixed bottom-4 sm:bottom-6 right-4 z-50">
//         <a 
//           href="/ask-question"
//           className="flex items-center gap-2 bg-[#7cc6ee] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
//         >
//           <MessageCircle className="w-5 h-5" />
//           <span className="text-sm font-semibold">Ask a Question</span>
//         </a>
//       </div>
//     </>
//   );
// };

// export default DirectoryLanding;
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
import { FolderKanban, ShieldCheck, FileSearch } from 'lucide-react';

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
  },
  {
    id: 'CASE-MANAGEMENT',
    name: 'Case Management Software',
    shortName: 'Case Management',
    icon: FolderKanban,
    color: 'bg-[#7cc6ee]'
  },
  {
    id: 'GOVERNANCE-RISK-COMPLIANCE',
    name: 'Governance, Risk & Compliance (GRC)',
    shortName: 'GRC',
    icon: ShieldCheck,
    color: 'bg-[#7cc6ee]'
  },
  {
    id: 'LEGAL-DUE-DILIGENCE',
    name: 'Legal Due Diligence Software',
    shortName: 'Due Diligence',
    icon: FileSearch,
    color: 'bg-[#7cc6ee]'
  }
];

const DirectoryLanding = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchMode, setSearchMode] = useState('directory'); // 'directory' or 'rfp' - default to directory
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');
  
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.relative')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

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
      <div className="bg-[#1e2556] relative pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-14 md:pb-16 min-h-[500px] sm:min-h-[550px] md:min-h-[600px]">
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
          <div className="absolute top-10 sm:top-20 right-5 sm:right-10 w-40 h-40 sm:w-64 sm:h-64 bg-[#7cc6ee]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-48 h-48 sm:w-80 sm:h-80 bg-[#7cc6ee]/5 rounded-full blur-3xl"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center min-h-[400px] sm:min-h-[450px] md:min-h-[500px]">
            {/* Left Side - Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Hero Heading with Typing Effect */}
              <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Discover, Compare and Implement<br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>the best{' '}
                  <span className="text-[#7cc6ee] relative inline-block">
                    <span className="break-words">{displayText}</span>
                    <span className="animate-pulse">|</span>
                  </span>
                </h1>
              </div>

              {/* Toggle Buttons - Matching the image design */}
              <div className="flex items-center justify-center lg:justify-start gap-0 mb-5 sm:mb-6">
                <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20 w-full sm:w-auto max-w-md sm:max-w-none">
                  <button
                    onClick={() => setSearchMode('directory')}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-200 text-sm sm:text-base flex-1 sm:flex-initial ${
                      searchMode === 'directory'
                        ? 'bg-[#1a1f3a] text-white shadow-lg'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <span className="whitespace-nowrap text-xs sm:text-sm md:text-base">Browse on your own</span>
                  </button>
                  <button
                    onClick={() => setSearchMode('rfp')}
                    className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-200 text-sm sm:text-base flex-1 sm:flex-initial ${
                      searchMode === 'rfp'
                        ? 'bg-[#1a1f3a] text-white shadow-lg'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="whitespace-nowrap text-xs sm:text-sm md:text-base">Let us match you</span>
                  </button>
                </div>
              </div>

              {/* Search Bar / Category Selector - Same row on desktop, stacked on mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 max-w-4xl mx-auto lg:mx-0 mb-5 sm:mb-6">
                {searchMode === 'directory' ? (
                  // Directory Search Mode
                  <>
                    <input
                      type="text"
                      placeholder="Search categories and products"
                      className="flex-1 px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base border-0 focus:ring-2 focus:ring-[#7cc6ee] focus:outline-none bg-white text-gray-700 placeholder:text-gray-400 rounded-xl sm:rounded-2xl shadow-xl"
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
                      className="px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-[#7cc6ee] text-white font-semibold hover:bg-[#5fb5dd] active:bg-[#4da4cc]
                               transition-colors duration-200 rounded-xl sm:rounded-2xl shadow-xl whitespace-nowrap text-sm sm:text-base"
                    >
                      Search
                    </button>
                  </>
                ) : (
                  // RFP Category Selection Mode - Custom Dropdown
                  <>
                    <div className="flex-1 relative z-[9999]">
                      {/* Custom Dropdown Button */}
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 md:py-4 text-sm sm:text-base border-0 focus:ring-2 focus:ring-[#7cc6ee] focus:outline-none bg-white text-gray-700 rounded-xl sm:rounded-2xl shadow-xl text-left flex items-center justify-between"
                      >
                        <span className={selectedCategory ? 'text-gray-700' : 'text-gray-400'}>
                          {selectedCategory 
                            ? categoryData.find(cat => cat.id === selectedCategory)?.name 
                            : 'What do you need help with?'}
                        </span>
                        <svg 
                          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Custom Dropdown Menu */}
                      {isDropdownOpen && (
                        <div className="absolute z-[100] w-full mt-2 bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-100 max-h-96 overflow-hidden">
                          {/* Search Input */}
                          <div className="p-3 border-b border-gray-100 sticky top-0 bg-white">
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Search categories..."
                                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:outline-none focus:border-transparent"
                                value={dropdownSearch}
                                onChange={(e) => setDropdownSearch(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          </div>

                          {/* Options List */}
                          <div className="max-h-80 overflow-y-auto">
                            {categoryData
                              .filter(category => 
                                category.name.toLowerCase().includes(dropdownSearch.toLowerCase())
                              )
                              .map((category) => {
                                const IconComponent = category.icon;
                                return (
                                  <button
                                    key={category.id}
                                    onClick={() => {
                                      setSelectedCategory(category.id);
                                      setIsDropdownOpen(false);
                                      setDropdownSearch('');
                                    }}
                                    className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-[#7cc6ee]/10 transition-colors duration-150 ${
                                      selectedCategory === category.id ? 'bg-[#7cc6ee]/5' : ''
                                    }`}
                                  >
                                    <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                      <IconComponent className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="text-sm sm:text-base text-gray-700 font-medium">
                                      {category.name}
                                    </span>
                                    {selectedCategory === category.id && (
                                      <svg className="w-5 h-5 text-[#7cc6ee] ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </button>
                                );
                              })}
                            {categoryData.filter(category => 
                              category.name.toLowerCase().includes(dropdownSearch.toLowerCase())
                            ).length === 0 && (
                              <div className="px-4 py-8 text-center text-gray-400 text-sm">
                                No categories found
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={(e) => handleSearch(e)}
                      disabled={!selectedCategory}
                      className={`px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 font-semibold transition-all duration-200 rounded-xl sm:rounded-2xl shadow-xl whitespace-nowrap text-sm sm:text-base ${
                        selectedCategory
                          ? 'bg-[#7cc6ee] text-white hover:bg-[#5fb5dd] active:bg-[#4da4cc]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Get Matched
                    </button>
                  </>
                )}
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
                We simplify technology decisions with trusted product data and industry insights for legal teams.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Browse by Category Section - Separated with White Background */}
      <div className="bg-white py-12 sm:py-14 md:py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1e2556] text-center mb-3 sm:mb-4">
            Browse by Category
          </h2>
          <p className="text-sm sm:text-base text-[#334155] text-center mb-8 sm:mb-10 md:mb-12 max-w-2xl mx-auto px-4">
            Explore our comprehensive directory of legal technology solutions tailored to your specific needs
          </p>
          
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3 sm:gap-4 md:gap-6">
            {categoryData.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="flex flex-col items-center cursor-pointer group transform hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  {/* Icon Container */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 ${category.color} rounded-xl sm:rounded-2xl 
                                 flex items-center justify-center shadow-lg group-hover:shadow-xl
                                 transition-all duration-200 mb-2 sm:mb-3 group-hover:bg-[#1e2556]`}>
                    <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  
                  {/* Category Name */}
                  <span className="text-xs sm:text-sm md:text-base font-medium text-[#2d2d2d] text-center
                                 group-hover:text-[#7cc6ee] transition-colors duration-200
                                 leading-tight max-w-[80px] sm:max-w-[100px] md:max-w-[120px] px-1">
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
      <div className="md:hidden fixed bottom-4 sm:bottom-6 right-4 z-50">
        <a 
          href="/ask-question"
          className="flex items-center gap-2 bg-[#7cc6ee] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-semibold">Ask a Question</span>
        </a>
      </div>
    </>
  );
};

export default DirectoryLanding;