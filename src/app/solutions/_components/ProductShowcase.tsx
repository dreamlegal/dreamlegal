"use client"
// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { 
//   MousePointerClick, 
//   Zap, 
//   BarChart3, 
//   Search, 
//   BookOpen, 
//   TrendingUp,
//   Users
// } from 'lucide-react';

// const ProductSuite = () => {
//   const products = [
//     {
//       title: "Directory",
//       subtitle: "Software Discovery Made Easy",
//       description: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
//       features: [
//         "Identify your legal team unique needs efficiently",
//         "Build a customized feature list for ideal solutions",
//         "Filter and compare software tailored to your requirements",
//         "Kickstart direct conversations with vendors to make informed decisions"
//       ],
//       icon: Search,
//       gradient: "from-blue-600 to-indigo-600",
//       buttonText: "Try Directory"
//     },
//     {
//       title: "Learning",
//       subtitle: "Legal Technology Learning Simplified",
//       description: "Legal ops case studies, Tech adoption guides & comprehensive reports",
//       features: [
//         "Utilize grids and matrices to identify the best legal tech solutions",
//         "Access comprehensive guides on industry best practices",
//         "Explore feature-specific articles to deepen your understanding of tools",
//         "Leverage learning resources to make the most of your chosen solutions"
//       ],
//       icon: BookOpen,
//       gradient: "from-indigo-600 to-purple-600",
//       buttonText: "Try Learning"
//     },
//     {
//       title: "KPI Analysis",
//       subtitle: "Legal operations metrics for business growth",
//       description: "Increase business profitability & Revenue through KPI Analysis",
//       features: [
//         "Monitor key legal operations KPIs effectively",
//         "Assess the overall health of your legal operations",
//         "Enhance operations to drive business growth",
//         "Detect and address changes in legal workflows proactively"
//       ],
//       icon: TrendingUp,
//       gradient: "from-purple-600 to-pink-600",
//       buttonText: "Coming Soon",
//       isComingSoon: true
//     },
//     {
//       title: "Change Management",
//       subtitle: "Process based Change Management",
//       description: "Smooth Data migration, employee training, clear roadmap and integrations",
//       features: [
//         "Seamlessly onboard technology with roadmap",
//         "Measure impact with clear metrics and actionable insights",
//         "Ensure team readiness for smooth adoption and integration",
//         "Manage data and access securely for optimal efficiency"
//       ],
//       icon: Users,
//       gradient: "from-pink-600 to-red-600",
//       buttonText: "Coming Soon",
//       isComingSoon: true
//     },
//     {
//       title: "Workflow Analysis",
//       subtitle: "Analyze your legal workflows for efficiency",
//       description: "Optimize your legal workflow processes",
//       features: [
//         "Identify red flags in operational processes",
//         "Discover automation opportunities to save time",
//         "Generate implementation plans for integration",
//         "Highlight potential wins to maximize ROI"
//       ],
//       icon: BarChart3,
//       gradient: "from-red-600 to-orange-600",
//       buttonText: "Try Workflow Analysis"
//     }
//   ];

//   return (
//     <div className="w-full py-24 bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
//         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
//       </div>

//       {/* Content Container */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//           <h1 className="text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 mb-6">
//             Explore our suite of products
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Scale your Legal ops before, during, and after Legal Tech implementation
//           </p>
//         </div>

//         {/* Products Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {products.map((product, index) => (
//             <Card key={index} className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-blue-100 hover:border-blue-200 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
//               <CardHeader className="space-y-4">
//                 <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${product.gradient} flex items-center justify-center shadow-lg`}>
//                   <product.icon className="w-6 h-6 text-white" />
//                 </div>
//                 <div>
//                   <CardTitle className="text-2xl font-bold mb-2">{product.title}</CardTitle>
//                   <p className="text-sm text-gray-500">{product.subtitle}</p>
//                 </div>
//               </CardHeader>

//               <CardContent className="space-y-6">
//                 <p className="text-base font-medium text-gray-700">{product.description}</p>
                
//                 <ul className="space-y-3">
//                   {product.features.map((feature, idx) => (
//                     <li key={idx} className="flex items-start gap-3">
//                       <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-1">
//                         <Zap className="w-3 h-3 text-blue-600" />
//                       </div>
//                       <span className="text-gray-600">{feature}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 <button 
//                   className={`group inline-flex items-center gap-2 px-6 py-3 w-full justify-center
//                            ${product.isComingSoon 
//                              ? 'bg-gray-100 text-gray-600' 
//                              : `bg-gradient-to-r ${product.gradient} text-white`} 
//                            font-medium rounded-xl shadow-lg transition-all duration-300`}
//                   disabled={product.isComingSoon}
//                 >
//                   <span>{product.buttonText}</span>
//                   {!product.isComingSoon && (
//                     <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
//                   )}
//                 </button>
//               </CardContent>

//               {/* Decorative Elements */}
//               <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-2xl transform translate-x-16 -translate-y-16" />
//               <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-400/10 to-indigo-400/10 rounded-full blur-2xl transform -translate-x-16 translate-y-16" />
//             </Card>
//           ))}
//         </div>

//         {/* CTA Section */}
//         <div className="mt-16 text-center">
//           <Card className="inline-block bg-blue-600 text-white p-8 rounded-2xl relative overflow-hidden group cursor-pointer transform hover:-translate-y-1 transition-all duration-300">
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//             <div className="relative">
//               <h3 className="text-2xl font-bold mb-4">
//                 The Fastest & Easiest way to optimize your legal workflow is here
//               </h3>
//               <p className="text-blue-100 mb-6">Start for free today or reach out to learn more.</p>
//               <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
//                 <span>Contact Us</span>
//                 <MousePointerClick className="w-4 h-4" />
//               </button>
//             </div>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductSuite;
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  MousePointerClick, 
  ArrowRight,
  Search, 
  BookOpen, 
  TrendingUp,
  Users,
  BarChart3,Sparkles
} from 'lucide-react';

const ProductSuite = () => {
  const products = [
    {
      title: "Directory",
      subtitle: "Software Discovery Made Easy",
      description: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
      features: [
        "Identify your legal team unique needs efficiently",
        "Build a customized feature list for ideal solutions",
        "Filter and compare software tailored to your requirements",
        "Kickstart direct conversations with vendors to make informed decisions"
      ],
      buttonText: "Try Directory",
      imagePath: "/images/directory.png",
    },
    {
      title: "Learning",
      subtitle: "Legal Technology Learning Simplified",
      description: "Legal ops case studies, Tech adoption guides & comprehensive reports",
      features: [
        "Utilize grids and matrices to identify the best legal tech solutions",
        "Access comprehensive guides on industry best practices",
        "Explore feature-specific articles to deepen your understanding of tools",
        "Leverage learning resources to make the most of your chosen solutions"
      ],
      buttonText: "Try Learning",
      imagePath: "/learning-screenshot.png",
    },
    {
      title: "KPI Analysis",
      subtitle: "Legal operations metrics for business growth",
      description: "Increase business profitability & Revenue through KPI Analysis",
      features: [
        "Monitor key legal operations KPIs effectively",
        "Assess the overall health of your legal operations",
        "Enhance operations to drive business growth",
        "Detect and address changes in legal workflows proactively"
      ],
      buttonText: "Coming Soon",
      imagePath: "/coming-soon.png",
      isComingSoon: true
    },
    {
      title: "Change Management",
      subtitle: "Process based Change Management",
      description: "Smooth Data migration, employee training, clear roadmap and integrations",
      features: [
        "Seamlessly onboard technology with roadmap",
        "Measure impact with clear metrics and actionable insights",
        "Ensure team readiness for smooth adoption and integration",
        "Manage data and access securely for optimal efficiency"
      ],
      buttonText: "Coming Soon",
      imagePath: "/coming-soon.png",
      isComingSoon: true
    },
    {
      title: "Workflow Analysis",
      subtitle: "Analyze your legal workflows for efficiency",
      description: "Optimize your legal workflow processes",
      features: [
        "Identify red flags in operational processes",
        "Discover automation opportunities to save time",
        "Generate implementation plans for integration",
        "Highlight potential wins to maximize ROI"
      ],
      buttonText: "Try Workflow Analysis",
      imagePath: "/workflow-screenshot.png",
    }
  ];

  return (
    <div className="w-full py-24 bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
      
 <ProductsShowcase/>
     
      
      </div>
    </div>
  );
};

export default ProductSuite;






// import { ChevronRight, BarChart2, Settings, Star, Shield, Clock, Zap, CheckCircle, Award, Box } from 'lucide-react';

// const SectionHeader = ({ title, icon: Icon }) => (
//   <div className="relative w-full mb-20">
//     <div className="absolute inset-0 flex items-center">
//       <div className="w-full border-t-2 border-blue-100/50"></div>
//     </div>
//     <div className="relative flex justify-center">
//       <div className="relative group">
//         <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
//         <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg flex items-center gap-3 group-hover:scale-[1.02] transition-transform">
//           <Icon className="w-6 h-6" />
//           {title}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const FeatureIcon = ({ index }) => {
//   const icons = [Shield, Clock, Zap, CheckCircle];
//   const Icon = icons[index % icons.length];
//   return <Icon className="w-5 h-5" />;
// };

// const ProductCard = ({ title, description, features, buttonText, imageSrc, imageAlt, index, icon: Icon }) => {
//   const isEven = index % 2 === 0;
  
//   return (
//     <div className="relative group">
//       {/* Animated background effects */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl" />
//       <div className={`absolute ${isEven ? '-left-20' : '-right-20'} top-1/4 w-96 h-96 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse`} />
      
//       <div className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 py-24 px-12`}>
//         {/* Content Section */}
//         <div className="flex-1 space-y-10">
//           <div className="space-y-6">
//             <div className="flex items-center gap-4">
//               <div className="p-3 bg-blue-100 rounded-2xl">
//                 <Icon className="w-6 h-6 text-blue-600" />
//               </div>
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600">
//                 <Sparkles className="w-4 h-4" />
//                 <span className="text-sm font-medium">{title}</span>
//               </div>
//             </div>
            
//             <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent leading-tight">
//               {description}
//             </h2>
//           </div>
          
//           <ul className="space-y-6">
//             {features.map((feature, idx) => (
//               <li key={idx} className="group/item flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300">
//                 <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center group-hover/item:bg-blue-600 transition-colors duration-300">
//                   <FeatureIcon index={idx} className="w-5 h-5 text-blue-600 group-hover/item:text-white transition-colors duration-300" />
//                 </span>
//                 <span className="text-gray-600 text-lg leading-relaxed">{feature}</span>
//               </li>
//             ))}
//           </ul>
          
//           <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:scale-105">
//             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
//             <span className="relative z-10 flex items-center gap-3">
//               {buttonText}
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </span>
//           </button>
//         </div>
        
//         {/* Image Section */}
//         <div className="flex-1">
//           <div className="relative">
//             {/* Premium border effect */}
//             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
//             <div className="relative bg-white p-8 rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl opacity-50"></div>
//               <img
//                 src="/api/placeholder/600/400"
//                 alt={imageAlt}
//                 className="relative z-10 w-full h-auto object-cover rounded-xl shadow-lg"
//               />
              
//               {/* Decorative elements */}
//               <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
//                 <Award className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductsShowcase = () => {
//   const sections = [
//     {
//       header: null,
//       icon: BarChart2,
//       products: [{
//         title: "Workflow Analysis",
//         description: "Analyze your legal workflows for efficiency",
//         features: [
//           "Identify red flags in operational processes",
//           "Discover automation opportunities to save time and reduce errors",
//           "Generate implementation plans for seamless integration",
//           "Highlight potential wins to maximize productivity and ROI"
//         ],
//         buttonText: "Try Workflow Analysis",
//         imageAlt: "Workflow Analysis Interface",
//         icon: BarChart2
//       }]
//     },
//     {
//       header: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
//       icon: Search,
//       products: [{
//         title: "Directory",
//         description: "Software Discovery Made Easy",
//         features: [
//           "Identify your legal team's unique needs efficiently",
//           "Build a customized feature list for ideal solutions",
//           "Filter and compare software tailored to your requirements",
//           "Kickstart direct conversations with vendors"
//         ],
//         buttonText: "Try Directory",
//         imageAlt: "Directory Search Interface",
//         icon: Search
//       }]
//     },
//     // ... rest of the sections with their respective icons
//   ];

//   return (
//     <div className="relative max-w-7xl mx-auto px-6 py-24">
//       {/* Background Effects */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100" />
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
//       <div className="relative">
//         {/* Header Section */}
//         <div className="text-center mb-32">
//           <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 rounded-full text-blue-600 mb-8">
//             <Sparkles className="w-5 h-5" />
//             <span className="text-sm font-medium">Premium Legal Solutions</span>
//           </div>
          
//           <h1 className="text-5xl md:text-7xl font-bold mb-8">
//             <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
//               Transform Your Legal Operations
//             </span>
//           </h1>
          
//           <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
//             Comprehensive suite of tools designed to revolutionize your legal operations with cutting-edge technology and proven methodologies.
//           </p>
//         </div>

//         {/* Products Sections */}
//         <div className="space-y-32">
//           {sections.map((section, sectionIndex) => (
//             <div key={sectionIndex} className="space-y-8">
//               {section.header && (
//                 <SectionHeader title={section.header} icon={section.icon} />
//               )}
//               {section.products.map((product, productIndex) => (
//                 <ProductCard 
//                   key={productIndex} 
//                   {...product} 
//                   index={sectionIndex} 
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };


// import { ChevronRight,  BarChart2,  Settings, Shield, Clock, Zap, CheckCircle } from 'lucide-react';

// const SectionHeader = ({ title, icon: Icon }) => (
//   <div className="relative w-full mb-10">
//     <div className="absolute inset-0 flex items-center">
//       <div className="w-full border-t-2 border-blue-100/50"></div>
//     </div>
//     <div className="relative flex justify-center">
//       <div className="relative group">
//         <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
//         <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg flex items-center gap-2">
//           <Icon className="w-5 h-5" />
//           {title}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const FeatureIcon = ({ index }) => {
//   const icons = [Shield, Clock, Zap, CheckCircle];
//   const Icon = icons[index % icons.length];
//   return <Icon className="w-4 h-4" />;
// };

// const ProductCard = ({ title, description, features, buttonText, imageAlt, index, icon: Icon }) => {
//   const isEven = index % 2 === 0;
  
//   return (
//     <div className="relative group">
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl" />
      
//       <div className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 py-8 px-6`}>
//         {/* Content Section */}
//         <div className="flex-1 space-y-6">
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <Icon className="w-5 h-5 text-blue-600" />
//               </div>
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full text-blue-600">
//                 <Sparkles className="w-3.5 h-3.5" />
//                 <span className="text-sm font-medium">{title}</span>
//               </div>
//             </div>
            
//             <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent leading-tight">
//               {description}
//             </h2>
//           </div>
          
//           <ul className="space-y-3">
//             {features.map((feature, idx) => (
//               <li key={idx} className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white hover:shadow transition-all duration-300">
//                 <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center group-hover/item:bg-blue-600 transition-colors duration-300">
//                   <FeatureIcon index={idx} className="text-blue-600 group-hover/item:text-white transition-colors duration-300" />
//                 </span>
//                 <span className="text-gray-600 text-sm md:text-base leading-relaxed">{feature}</span>
//               </li>
//             ))}
//           </ul>
          
//           <button className="group relative px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:scale-105">
//             <span className="relative z-10 flex items-center gap-2">
//               {buttonText}
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </span>
//           </button>
//         </div>
        
//         {/* Image Section */}
//         <div className="flex-1">
//           <div className="relative">
//             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
//             <div className="relative bg-white p-4 rounded-xl shadow-xl transform group-hover:scale-[1.02] transition-all duration-500">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl opacity-50"></div>
//               <img
//                 src="/api/placeholder/600/400"
//                 alt={imageAlt}
//                 className="relative z-10 w-full h-auto object-cover rounded-lg shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductsShowcase = () => {
//   const sections = [
//     {
//       header: null,
//       icon: BarChart2,
//       products: [{
//         title: "Workflow Analysis",
//         description: "Analyze your legal workflows for efficiency",
//         features: [
//           "Identify red flags in operational processes",
//           "Discover automation opportunities to save time and reduce errors",
//           "Generate implementation plans for seamless integration",
//           "Highlight potential wins to maximize productivity and ROI"
//         ],
//         buttonText: "Try Workflow Analysis",
//         imageAlt: "Workflow Analysis Interface",
//         icon: BarChart2
//       }]
//     },
//     {
//       header: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
//       icon: Search,
//       products: [{
//         title: "Directory",
//         description: "Software Discovery Made Easy",
//         features: [
//           "Identify your legal team's unique needs efficiently",
//           "Build a customized feature list for ideal solutions",
//           "Filter and compare software tailored to your requirements",
//           "Kickstart direct conversations with vendors"
//         ],
//         buttonText: "Try Directory",
//         imageAlt: "Directory Search Interface",
//         icon: Search
//       }]
//     },
//     // Add other sections...
//   ];

//   return (
//     <div className="relative max-w-6xl mx-auto px-4 py-12">
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100" />
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]" />
      
//       <div className="relative">
//         {/* Header Section */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 mb-6">
//             <Sparkles className="w-4 h-4" />
//             <span className="text-sm font-medium">Premium Legal Solutions</span>
//           </div>
          
//           <h1 className="text-3xl md:text-4xl font-bold mb-6">
//             <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
//               Transform Your Legal Operations
//             </span>
//           </h1>
          
//           <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
//             Comprehensive suite of tools designed to revolutionize your legal operations
//           </p>
//         </div>

//         {/* Products Sections */}
//         <div className="space-y-16">
//           {sections.map((section, sectionIndex) => (
//             <div key={sectionIndex} className="space-y-6">
//               {section.header && (
//                 <SectionHeader title={section.header} icon={section.icon} />
//               )}
//               {section.products.map((product, productIndex) => (
//                 <ProductCard 
//                   key={productIndex} 
//                   {...product} 
//                   index={sectionIndex} 
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };


// import { ChevronRight,  BarChart2,  Settings, Shield, Clock, Zap, CheckCircle } from 'lucide-react';

// const SectionHeader = ({ title, icon: Icon }) => (
//   <div className="relative w-full mb-10">
//     <div className="absolute inset-0 flex items-center">
//       <div className="w-full border-t-2 border-blue-100/50"></div>
//     </div>
//     <div className="relative flex justify-center">
//       <div className="relative group">
//         <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
//         <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg flex items-center gap-2">
//           <Icon className="w-5 h-5" />
//           {title}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const FeatureIcon = ({ index }) => {
//   const icons = [Shield, Clock, Zap, CheckCircle];
//   const Icon = icons[index % icons.length];
//   return <Icon className="w-4 h-4" />;
// };

// const ProductCard = ({ title, description, features, buttonText, imagePath, imageAlt, index, icon: Icon }) => {
//   const isEven = index % 2 === 0;
  
//   return (
//     <div className="relative group">
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl" />
      
//       <div className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 py-8 px-6`}>
//         {/* Content Section */}
//         <div className="flex-1 space-y-6">
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <Icon className="w-5 h-5 text-blue-600" />
//               </div>
//               <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full text-blue-600">
//                 <Sparkles className="w-3.5 h-3.5" />
//                 <span className="text-sm font-medium">{title}</span>
//               </div>
//             </div>
            
//             <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent leading-tight">
//               {description}
//             </h2>
//           </div>
          
//           <ul className="space-y-3">
//             {features.map((feature, idx) => (
//               <li key={idx} className="group/item flex items-start gap-3 p-2 rounded-lg hover:bg-white hover:shadow transition-all duration-300">
//                 <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center group-hover/item:bg-blue-600 transition-colors duration-300">
//                   <FeatureIcon index={idx} className="text-blue-600 group-hover/item:text-white transition-colors duration-300" />
//                 </span>
//                 <span className="text-gray-600 text-sm md:text-base leading-relaxed">{feature}</span>
//               </li>
//             ))}
//           </ul>
          
//           <button className="group relative px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-xl hover:scale-105">
//             <span className="relative z-10 flex items-center gap-2">
//               {buttonText}
//               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </span>
//           </button>
//         </div>
        
//         {/* Image Section */}
//         <div className="flex-1">
//           <div className="relative">
//             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
//             <div className="relative bg-white p-4 rounded-xl shadow-xl transform group-hover:scale-[1.02] transition-all duration-500">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl opacity-50"></div>
//               <img
//                 src={imagePath || "/api/placeholder/600/400"}
//                 alt={imageAlt}
//                 className="relative z-10 w-full h-auto object-cover rounded-lg shadow-lg"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductsShowcase = () => {

// const sections = [
//     {
//       header: null,
//       icon: BarChart2,
//       products: [{
//         title: "Workflow Analysis",
//         subtitle: "Analyze your legal workflows for efficiency",
//         description: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
//         features: [
//           "Identify red flags in operational processes",
//           "Discover automation opportunities to save time and reduce errors",
//           "Generate implementation plans for seamless integration",
//           "Highlight potential wins to maximize productivity and ROI"
//         ],
//         buttonText: "Try Workflow Analysis",
//         imagePath: "images/workflow dashboard.png", 
//         icon: BarChart2,
//         isComingSoon: false
//       }]
//     },
//     {
//       header: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
//       icon: Search,
//       products: [{
//         title: "Directory",
//         subtitle: "Software Discovery Made Easy",
//         description: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
//         features: [
//           "Identify your legal team's unique needs efficiently",
//           "Build a customized feature list for ideal solutions",
//           "Filter and compare software tailored to your requirements",
//           "Kickstart direct conversations with vendors"
//         ],
//         buttonText: "Try Directory",
//         imagePath: "images/directory.png",
//         icon: Search,
//         isComingSoon: false
//       }]
//     },
//     {
//       header: "Legal ops case studies, Tech adoption guides & comprehensive reports",
//       icon: BookOpen,
//       products: [{
//         title: "Learning",
//         subtitle: "Legal Technology Learning Simplified",
//         description: "Legal ops case studies, Tech adoption guides & comprehensive reports",
//         features: [
//           "Utilize grids and matrices to identify the best legal tech solutions",
//           "Access comprehensive guides on industry best practices",
//           "Explore feature-specific articles to deepen your understanding of tools",
//           "Leverage learning resources to make the most of your chosen solutions"
//         ],
//         buttonText: "Try Learning",
//         imagePath: "images/blog.png",
//         icon: BookOpen,
//         isComingSoon: false
//       }]
//     },
//     {
//       header: "Increase business profitability & Revenue through KPI Analysis",
//       icon: TrendingUp,
//       products: [{
//         title: "KPI Analysis",
//         subtitle: "Legal operations metrics for business growth",
//         description: "Increase business profitability & Revenue through KPI Analysis",
//         features: [
//           "Monitor key legal operations KPIs effectively",
//           "Assess the overall health of your legal operations",
//           "Enhance operations to drive business growth",
//           "Detect and address changes in legal workflows proactively"
//         ],
//         buttonText: "Coming Soon",
//         imagePath: "images/coming-soon.webp",
//         icon: TrendingUp,
//         isComingSoon: true
//       }]
//     },
//     {
//       header: "Smooth Data migration, employee training, clear roadmap and integrations",
//       icon: Settings,
//       products: [{
//         title: "Change Management",
//         subtitle: "Process based Change Management",
//         description: "Smooth Data migration, employee training, clear roadmap and integrations",
//         features: [
//           "Seamlessly onboard technology with roadmap",
//           "Measure impact with clear metrics and actionable insights",
//           "Ensure team readiness for smooth adoption and integration",
//           "Manage data and access securely for optimal efficiency"
//         ],
//         buttonText: "Coming Soon",
//         imagePath: "images/coming-soon.webp",
//         icon: Settings,
//         isComingSoon: true
//       }]
//     }
//   ];
//   return (
//     <div className="relative max-w-6xl mx-auto px-4 py-12">
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100" />
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]" />
      
//       <div className="relative">
//         {/* Header Section */}
//       <div className="text-center mb-12">
//         <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 mb-6">
//           <Sparkles className="w-4 h-4" />
//           <span className="text-sm font-medium">Premium Legal Solutions</span>
//         </div>
//         <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
//           Explore our suit of products
//         </h1>
//         <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//           Explore our suit of products to scale your Legal ops before, during, and after Legal Tech implementation
//         </p>
//       </div>

//       {/* Main Card */}
//       <div className="relative">
//         {/* Background blur effects */}
//         <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
//         <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        
//         {/* Main content card */}
//         <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 shadow-2xl overflow-hidden">
//           {/* Decorative elements */}
//           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full transform translate-x-1/2 -translate-y-1/2" />
//           <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full transform -translate-x-1/2 translate-y-1/2" />
          
//           {/* Grid pattern overlay */}
//           <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]" />

//           {/* Content */}
//           <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
//             <div className="flex-1 space-y-6">
//               <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
//                 The Fastest & Easiest way to optimize your legal workflow is here
//               </h2>
//               <p className="text-blue-100 text-lg">
//                 Start for free today or reach out to learn more.
//               </p>
//             </div>
//             <div className="flex-shrink-0">
//               <button className="group relative px-8 py-4 bg-white rounded-xl font-semibold text-blue-600 hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl">
//                 <span className="relative z-10 flex items-center gap-2">
//                   Contact Us
//                   <Sparkles className="w-4 h-4 text-blue-600" />
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//         {/* Products Sections */}
//         <div className="space-y-16">
//           {sections.map((section, sectionIndex) => (
//             <div key={sectionIndex} className="space-y-6">
//               {section.header && (
//                 <SectionHeader title={section.header} icon={section.icon} />
//               )}
//               {section.products.map((product, productIndex) => (
//                 <ProductCard 
//                   key={productIndex} 
//                   {...product} 
//                   index={sectionIndex} 
//                 />
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// best 
// import { ChevronRight, BarChart2,  Settings, Shield, Clock, Zap, CheckCircle } from 'lucide-react';

// const SectionHeader = ({ title, icon: Icon }) => (
//   <div className="relative w-full mb-10">
//     <div className="absolute inset-0 flex items-center">
//       <div className="w-full border-t-2 border-blue-100/50"></div>
//     </div>
//     <div className="relative flex justify-center">
//       <div className="relative group">
//         <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
//         <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-lg font-semibold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300">
//           <Icon className="w-5 h-5" />
//           {title}
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const FeatureIcon = ({ index }) => {
//   const icons = [Shield, Clock, Zap, CheckCircle];
//   const Icon = icons[index % icons.length];
//   return <Icon className="w-4 h-4" />;
// };

// const ProductCard = ({ title, subtitle, description, features, buttonText, imagePath, imageAlt, index, icon: Icon, isComingSoon }) => {
//   const isEven = index % 2 === 0;
  
//   return (
//     <div className="relative group">
//       {/* Enhanced hover effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl blur-xl" />
//       <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl" />
      
//       <div className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 py-10 px-8`}>
//         {/* Enhanced Content Section */}
//         <div className="space-y-4">
//       <div className="flex items-center gap-2">
//         <div className="p-2 bg-blue-100 rounded-lg">
//           <Icon className="w-5 h-5 text-blue-600" />
//         </div>
//         <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-full">
//           <Sparkles className="w-3 h-3 text-blue-600" />
//           <span className="text-sm text-blue-600">{title}</span>
//         </div>
//       </div>
      
//       <h3 className="text-base text-gray-600">{subtitle}</h3>
      
//       <ul className="space-y-2">
//         {features.map((feature, idx) => (
//           <li key={idx} className="flex items-start gap-2 p-2 hover:bg-white hover:shadow rounded-lg group">
//             <span className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center group-hover:bg-blue-600">
//               <FeatureIcon index={idx} className="w-4 h-4 text-blue-600 group-hover:text-white" />
//             </span>
//             <span className="text-sm text-gray-600 group-hover:text-gray-800">
//               {feature}
//             </span>
//           </li>
//         ))}
//       </ul>
      
//       <button 
//         className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-500 disabled:hover:bg-gray-500"
//         disabled={isComingSoon}
//       >
//         <span className="flex items-center justify-center gap-1">
//           {buttonText}
//           <ArrowRight className="w-4 h-4" />
//         </span>
//       </button>
//     </div>
//         {/* Enhanced Image Section */}
//         <div className="flex-1">
//           <div className="relative">
//             {/* Enhanced glow effect */}
//             <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
//             <div className="relative bg-white p-6 rounded-2xl shadow-xl transform group-hover:scale-[1.02] transition-all duration-500 border border-gray-100">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl opacity-50"></div>
//               <img
//                 src={imagePath || "/api/placeholder/600/400"}
//                 alt={imageAlt}
//                 className="relative z-10 w-full h-auto object-cover rounded-xl shadow-lg"
//               />
              
//               {/* Coming Soon Overlay */}
//               {isComingSoon && (
//                 <div className="absolute inset-0 bg-gray-900/50 rounded-xl z-20 flex items-center justify-center">
//                   <div className="text-white text-2xl font-bold">Coming Soon</div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductsShowcase = () => {
    // const sections = [
    //         {
    //           header: null,
    //           icon: BarChart2,
    //           products: [{
    //             title: "Workflow Analysis",
    //             subtitle: "Analyze your legal workflows for efficiency",
    //             description: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
    //             features: [
    //               "Identify red flags in operational processes",
    //               "Discover automation opportunities to save time and reduce errors",
    //               "Generate implementation plans for seamless integration",
    //               "Highlight potential wins to maximize productivity and ROI"
    //             ],
    //             buttonText: "Try Workflow Analysis",
    //             imagePath: "images/workflow dashboard.png", 
    //             icon: BarChart2,
    //             isComingSoon: false
    //           }]
    //         },
    //         {
    //           header: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
    //           icon: Search,
    //           products: [{
    //             title: "Directory",
    //             subtitle: "Software Discovery Made Easy",
    //             description: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
    //             features: [
    //               "Identify your legal team's unique needs efficiently",
    //               "Build a customized feature list for ideal solutions",
    //               "Filter and compare software tailored to your requirements",
    //               "Kickstart direct conversations with vendors"
    //             ],
    //             buttonText: "Try Directory",
    //             imagePath: "images/directory.png",
    //             icon: Search,
    //             isComingSoon: false
    //           }]
    //         },
    //         {
    //           header: "Legal ops case studies, Tech adoption guides & comprehensive reports",
    //           icon: BookOpen,
    //           products: [{
    //             title: "Learning",
    //             subtitle: "Legal Technology Learning Simplified",
    //             description: "Legal ops case studies, Tech adoption guides & comprehensive reports",
    //             features: [
    //               "Utilize grids and matrices to identify the best legal tech solutions",
    //               "Access comprehensive guides on industry best practices",
    //               "Explore feature-specific articles to deepen your understanding of tools",
    //               "Leverage learning resources to make the most of your chosen solutions"
    //             ],
    //             buttonText: "Try Learning",
    //             imagePath: "images/blog.png",
    //             icon: BookOpen,
    //             isComingSoon: false
    //           }]
    //         },
    //         {
    //           header: "Increase business profitability & Revenue through KPI Analysis",
    //           icon: TrendingUp,
    //           products: [{
    //             title: "KPI Analysis",
    //             subtitle: "Legal operations metrics for business growth",
    //             description: "Increase business profitability & Revenue through KPI Analysis",
    //             features: [
    //               "Monitor key legal operations KPIs effectively",
    //               "Assess the overall health of your legal operations",
    //               "Enhance operations to drive business growth",
    //               "Detect and address changes in legal workflows proactively"
    //             ],
    //             buttonText: "Coming Soon",
    //             imagePath: "images/coming-soon.webp",
    //             icon: TrendingUp,
    //             isComingSoon: true
    //           }]
    //         },
    //         {
    //           header: "Smooth Data migration, employee training, clear roadmap and integrations",
    //           icon: Settings,
    //           products: [{
    //             title: "Change Management",
    //             subtitle: "Process based Change Management",
    //             description: "Smooth Data migration, employee training, clear roadmap and integrations",
    //             features: [
    //               "Seamlessly onboard technology with roadmap",
    //               "Measure impact with clear metrics and actionable insights",
    //               "Ensure team readiness for smooth adoption and integration",
    //               "Manage data and access securely for optimal efficiency"
    //             ],
    //             buttonText: "Coming Soon",
    //             imagePath: "images/coming-soon.webp",
    //             icon: Settings,
    //             isComingSoon: true
    //           }]
    //         }
    //       ];
//   return (


//     <div className='max-w-6xl'>
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 mb-6">
//             <Sparkles className="w-4 h-4" />
//             <span className="text-sm font-medium">Premium Legal Solutions</span>
//           </div>
          
//           <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
//             Explore our suit of products
//           </h1>
          
//           <p className="text-gray-600 text-lg max-w-2xl mx-auto">
//             Explore our suit of products to scale your Legal ops before, during, and after Legal Tech implementation
//           </p>
//         </div>
//         <div className="relative mb-24">
//           <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl blur-xl opacity-20"></div>
//           <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 shadow-2xl overflow-hidden">
//             <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full transform translate-x-1/2 -translate-y-1/2" />
//             <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full transform -translate-x-1/2 translate-y-1/2" />
//             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]" />

//             <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
//               <div className="flex-1 space-y-6">
//                 <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
//                   The Fastest & Easiest way to optimize your legal workflow is here
//                 </h2>
//                 <p className="text-blue-100 text-lg">
//                   Start for free today or reach out to learn more.
//                 </p>
//               </div>
//               <div className="flex-shrink-0">
//                 <button className="group relative px-8 py-4 bg-white rounded-xl font-semibold text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl">
//                   <span className="relative z-10 flex items-center gap-2">
//                     Contact Us
//                     <Sparkles className="w-4 h-4 text-blue-600" />
//                   </span>
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="relative  mx-auto px-4 py-12 my-12 rounded-2xl shadow-2xl overflow-hidden">
//     <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl" />
//     <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px] rounded-2xl" />
        
        
//         <div className="relative">
//             {/* Enhanced Header Section */}
            

//             {/* Enhanced Hero Card */}
            

//             {/* Products Sections */}
//             <div className="space-y-24">
//             {sections.map((section, sectionIndex) => (
//                 <div key={sectionIndex} className="space-y-6">
//                 {section.header && (
//                     <SectionHeader title={section.header} icon={section.icon} />
//                 )}
//                 {section.products.map((product, productIndex) => (
//                     <ProductCard 
//                     key={productIndex} 
//                     {...product} 
//                     index={sectionIndex} 
//                     />
//                 ))}
//                 </div>
//             ))}
//             </div>
//         </div>
//         </div>
//     </div>
//   );
// };

import { ChevronRight, BarChart2, Settings, Shield, Clock, Zap, CheckCircle, } from 'lucide-react';

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="relative w-full mb-6 md:mb-10">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t-2 border-blue-100/50"></div>
    </div>
    <div className="relative flex justify-center">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 md:px-6 py-2 rounded-full text-base md:text-lg font-semibold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          <Icon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">{title}</span>
        </div>
      </div>
    </div>
  </div>
);

const FeatureIcon = ({ index }) => {
  const icons = [Shield, Clock, Zap, CheckCircle];
  const Icon = icons[index % icons.length];
  return <Icon className="w-4 h-4" />;
};

const ProductCard = ({ title, subtitle, description, features, buttonText, imagePath, imageAlt, index, icon: Icon, isComingSoon }) => {
  const isEven = index % 2 === 0;
  
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl blur-xl" />
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl" />
      
      <div className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 md:gap-12 py-6 md:py-10 px-4 md:px-8`}>
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Icon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 rounded-full">
              <Sparkles className="w-3 h-3 text-blue-600" />
              <span className="text-xs md:text-sm text-blue-600">{title}</span>
            </div>
          </div>
          
          <h3 className="text-sm md:text-base text-gray-600">{subtitle}</h3>
          
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 p-2 hover:bg-white hover:shadow rounded-lg group">
                <span className="w-5 h-5 md:w-6 md:h-6 rounded bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 flex-shrink-0">
                  <FeatureIcon index={idx} className="w-3 h-3 md:w-4 md:h-4 text-blue-600 group-hover:text-white" />
                </span>
                <span className="text-xs md:text-sm text-gray-600 group-hover:text-gray-800">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          
          <button 
            className="w-full px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg text-xs md:text-sm font-medium hover:bg-blue-700 disabled:bg-gray-500 disabled:hover:bg-gray-500"
            disabled={isComingSoon}
          >
            <span className="flex items-center justify-center gap-1">
              {buttonText}
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </span>
          </button>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-white p-3 md:p-6 rounded-2xl shadow-xl transform group-hover:scale-[1.02] transition-all duration-500 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl opacity-50"></div>
              <img
                src={imagePath || "/api/placeholder/600/400"}
                alt={imageAlt}
                className="relative z-10 w-full h-auto object-cover rounded-xl shadow-lg"
              />
              
              {isComingSoon && (
                <div className="absolute inset-0 bg-gray-900/50 rounded-xl z-20 flex items-center justify-center">
                  <div className="text-white text-lg md:text-2xl font-bold">Coming Soon</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsShowcase = () => {
    const sections = [
        {
          header: null,
          icon: BarChart2,
          products: [{
            title: "Workflow Analysis",
            subtitle: "Analyze your legal workflows for efficiency",
            description: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
            features: [
              "Identify red flags in operational processes",
              "Discover automation opportunities to save time and reduce errors",
              "Generate implementation plans for seamless integration",
              "Highlight potential wins to maximize productivity and ROI"
            ],
            buttonText: "Try Workflow Analysis",
            imagePath: "images/workflow dashboard.png", 
            icon: BarChart2,
            isComingSoon: false
          }]
        },
        {
          header: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
          icon: Search,
          products: [{
            title: "Directory",
            subtitle: "Software Discovery Made Easy",
            description: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
            features: [
              "Identify your legal team's unique needs efficiently",
              "Build a customized feature list for ideal solutions",
              "Filter and compare software tailored to your requirements",
              "Kickstart direct conversations with vendors"
            ],
            buttonText: "Try Directory",
            imagePath: "images/directory.png",
            icon: Search,
            isComingSoon: false
          }]
        },
        {
          header: "Legal ops case studies, Tech adoption guides & comprehensive reports",
          icon: BookOpen,
          products: [{
            title: "Learning",
            subtitle: "Legal Technology Learning Simplified",
            description: "Legal ops case studies, Tech adoption guides & comprehensive reports",
            features: [
              "Utilize grids and matrices to identify the best legal tech solutions",
              "Access comprehensive guides on industry best practices",
              "Explore feature-specific articles to deepen your understanding of tools",
              "Leverage learning resources to make the most of your chosen solutions"
            ],
            buttonText: "Try Learning",
            imagePath: "images/blog.png",
            icon: BookOpen,
            isComingSoon: false
          }]
        },
        {
          header: "Increase business profitability & Revenue through KPI Analysis",
          icon: TrendingUp,
          products: [{
            title: "KPI Analysis",
            subtitle: "Legal operations metrics for business growth",
            description: "Increase business profitability & Revenue through KPI Analysis",
            features: [
              "Monitor key legal operations KPIs effectively",
              "Assess the overall health of your legal operations",
              "Enhance operations to drive business growth",
              "Detect and address changes in legal workflows proactively"
            ],
            buttonText: "Coming Soon",
            imagePath: "images/coming-soon.webp",
            icon: TrendingUp,
            isComingSoon: true
          }]
        },
        {
          header: "Smooth Data migration, employee training, clear roadmap and integrations",
          icon: Settings,
          products: [{
            title: "Change Management",
            subtitle: "Process based Change Management",
            description: "Smooth Data migration, employee training, clear roadmap and integrations",
            features: [
              "Seamlessly onboard technology with roadmap",
              "Measure impact with clear metrics and actionable insights",
              "Ensure team readiness for smooth adoption and integration",
              "Manage data and access securely for optimal efficiency"
            ],
            buttonText: "Coming Soon",
            imagePath: "images/coming-soon.webp",
            icon: Settings,
            isComingSoon: true
          }]
        }
      ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-8 md:mb-16">
        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 bg-blue-50 rounded-full text-blue-600 mb-4 md:mb-6">
          <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
          <span className="text-xs md:text-sm font-medium">Premium Legal Solutions</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Explore our suit of products
        </h1>
        
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto px-4">
          Explore our suit of products to scale your Legal ops before, during, and after Legal Tech implementation
        </p>
      </div>

      <div className="relative mb-12 md:mb-24">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl blur-xl opacity-20"></div>
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 md:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-blue-500/20 rounded-full transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-blue-400/20 rounded-full transform -translate-x-1/2 translate-y-1/2" />
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
            <div className="flex-1 space-y-4 md:space-y-6 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
                The Fastest & Easiest way to optimize your legal workflow is here
              </h2>
              <p className="text-blue-100 text-base md:text-lg">
                Start for free today or reach out to learn more.
              </p>
            </div>
            <div className="flex-shrink-0">
              <button className="group relative px-6 md:px-8 py-3 md:py-4 bg-white rounded-xl font-semibold text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">
                  Contact Us
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto py-8 md:py-12 my-8 md:my-12 rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px] rounded-2xl" />
        
        <div className="relative">
          <div className="space-y-12 md:space-y-24">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-6">
                {section.header && (
                  <SectionHeader title={section.header} icon={section.icon} />
                )}
                {section.products.map((product, productIndex) => (
                  <ProductCard 
                    key={productIndex} 
                    {...product} 
                    index={sectionIndex} 
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
