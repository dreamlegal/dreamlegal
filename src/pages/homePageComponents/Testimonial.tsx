"use client"

// // export default PremiumTestimonials;
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// // import { Quote, MapPin, Building2, TrendingUp, Award, Globe, Users, Timer } from 'lucide-react';
// import { Quote, MapPin, Building2, TrendingUp, Award, Globe, Users, Timer, ArrowLeft, ArrowRight } from 'lucide-react';
const testimonials = [
  {
    id: 1,
    content: "This product has completely transformed how we operate. The ROI we've seen is incredible, and the support team is absolutely outstanding.",
    company: {
      name: "TechCorp Industries",
      size: "500+ employees",
      location: "San Francisco, CA",
      industry: "Enterprise Software",
      global: "12 countries served"
    },
    impact: {
      revenue: "+285% Revenue",
      users: "10k+ Active Users",
      timeframe: "3 months",
      achievement: "Enterprise Solution of the Year"
    },
    user: {
      name: "Sarah Johnson",
      role: "Chief Technology Officer",
      image: "/api/placeholder/120/120"
    }
  },
  {
    id: 2,
    content: "The scalability and performance gains we've achieved are beyond our expectations. Our global team collaboration has reached new heights.",
    company: {
      name: "GlobalTech Solutions",
      size: "1000+ employees",
      location: "Singapore",
      industry: "FinTech",
      global: "25 countries served"
    },
    impact: {
      revenue: "+450% Growth",
      users: "50k+ Users",
      timeframe: "6 months",
      achievement: "Digital Innovation Award"
    },
    user: {
      name: "Michael Chen",
      role: "Head of Innovation",
      image: "/api/placeholder/120/120"
    }
  },
  {
    id: 3,
    content: "We've seen unprecedented growth in user engagement and market reach. The platform's analytics capabilities have revolutionized our decision-making.",
    company: {
      name: "DataDrive Analytics",
      size: "200+ employees",
      location: "London, UK",
      industry: "Data Analytics",
      global: "8 countries served"
    },
    impact: {
      revenue: "+320% ROI",
      users: "25k+ Users",
      timeframe: "4 months",
      achievement: "Best SaaS Solution"
    },
    user: {
      name: "Emma Williams",
      role: "Growth Director",
      image: "/api/placeholder/120/120"
    }
  }
];

// const TestimonialCard = ({ testimonial }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="w-full"
//     >
//       <div className="grid lg:grid-cols-3 gap-6 relative">
//         {/* Background gradient */}
//         <motion.div
//           animate={{ 
//             rotate: [0, 5, -5, 0],
//             scale: [1, 1.02, 0.98, 1]
//           }}
//           transition={{ 
//             duration: 20,
//             repeat: Infinity,
//             ease: "linear"
//           }}
//           className="absolute -z-10 w-4/5 h-4/5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl"
//         />
        
//         {/* Main testimonial content */}
//         <div className="lg:col-span-2 bg-white/90 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-xl">
//           <div className="flex flex-col h-full">
//             {/* Company Info Banner */}
//             <motion.div
//               initial={{ y: -20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl"
//             >
//               <div className="flex items-center gap-2">
//                 <Building2 className="w-5 h-5 text-indigo-600" />
//                 <span className="font-semibold text-gray-800">{testimonial.company.name}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <MapPin className="w-5 h-5 text-indigo-600" />
//                 <span className="text-gray-600">{testimonial.company.location}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Globe className="w-5 h-5 text-indigo-600" />
//                 <span className="text-gray-600">{testimonial.company.global}</span>
//               </div>
//             </motion.div>

//             {/* Testimonial Content */}
//             <div className="mb-8">
//               <div className="flex gap-4 mb-6">
//                 <Quote className="w-8 h-8 text-indigo-500 flex-shrink-0" />
//                 <motion.p 
//                   className="text-lg lg:text-xl font-light leading-relaxed text-gray-700"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                 >
//                   {testimonial.content}
//                 </motion.p>
//               </div>
//             </div>

//             {/* Impact Metrics */}
//             <div className="mt-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center justify-center text-center"
//               >
//                 <TrendingUp className="w-6 h-6 text-indigo-600 mb-2" />
//                 <p className="text-lg font-bold text-indigo-600">{testimonial.impact.revenue}</p>
//                 <p className="text-xs text-gray-600">Revenue Impact</p>
//               </motion.div>
              
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 className="bg-purple-50 rounded-xl p-4 flex flex-col items-center justify-center text-center"
//               >
//                 <Users className="w-6 h-6 text-purple-600 mb-2" />
//                 <p className="text-lg font-bold text-purple-600">{testimonial.impact.users}</p>
//                 <p className="text-xs text-gray-600">Active Users</p>
//               </motion.div>
              
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center justify-center text-center"
//               >
//                 <Timer className="w-6 h-6 text-indigo-600 mb-2" />
//                 <p className="text-lg font-bold text-indigo-600">{testimonial.impact.timeframe}</p>
//                 <p className="text-xs text-gray-600">Implementation</p>
//               </motion.div>
              
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 className="bg-purple-50 rounded-xl p-4 flex flex-col items-center justify-center text-center"
//               >
//                 <Award className="w-6 h-6 text-purple-600 mb-2" />
//                 <p className="text-lg font-bold text-purple-600">Award</p>
//                 <p className="text-xs text-gray-600">Recognition</p>
//               </motion.div>
//             </div>
//           </div>
//         </div>

//         {/* Profile Card */}
//         <motion.div 
//           className="relative"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//         >
//           <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 lg:p-8 text-white h-full">
//             <div className="flex flex-col h-full justify-center items-center text-center">
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 className="mb-6"
//               >
//                 <img
//                   src={testimonial.user.image}
//                   alt={testimonial.user.name}
//                   className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white/20"
//                 />
//               </motion.div>
//               <motion.div
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 className="space-y-2"
//               >
//                 <h3 className="text-xl lg:text-2xl font-bold">{testimonial.user.name}</h3>
//                 <p className="text-white/80">{testimonial.user.role}</p>
//                 <div className="pt-4">
//                   <p className="text-sm text-white/60">{testimonial.company.industry}</p>
//                   <p className="text-sm text-white/60">{testimonial.company.size}</p>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// const EnhancedTestimonials = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextTestimonial = () => {
//     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   useEffect(() => {
//     const timer = setInterval(nextTestimonial, 6000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 lg:py-24 px-4 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-12 lg:mb-20 text-center"
//         >
//           <div className="flex items-center justify-center gap-4 mb-6">
//             <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500" />
//             <p className="text-lg lg:text-xl text-indigo-600 font-medium">Global Impact Stories</p>
//           </div>
//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
//             Transforming Enterprises
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"> Worldwide</span>
//           </h2>
//         </motion.div>

//         {/* Testimonial Carousel */}
//         <div className="relative">
//           <AnimatePresence mode="wait">
//             <TestimonialCard
//               key={testimonials[currentIndex].id}
//               testimonial={testimonials[currentIndex]}
//             />
//           </AnimatePresence>

//           {/* Navigation */}
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-8 lg:mt-12">
//             <div className="flex gap-3">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className="group relative"
//                 >
//                   <motion.div
//                     className={`h-1 transition-all duration-300 ${
//                       currentIndex === index ? 'w-12 bg-indigo-500' : 'w-6 bg-gray-300'
//                     }`}
//                     whileHover={{ scale: 1.2 }}
//                   />
//                 </button>
//               ))}
//             </div>
            
//             <div className="flex gap-4">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={prevTestimonial}
//                 className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
//               >
//                 <ArrowLeft className="w-6 h-6 text-gray-600" />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={nextTestimonial}
//                 className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
//               >
//                 <ArrowRight className="w-6 h-6 text-gray-600" />
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EnhancedTestimonials;


// import React, { useState } from 'react';
// import { Quote, Building, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

// const RefinedTestimonial = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
  
//   const testimonials = [
//     {
//       name: "Sarah Chen",
//       role: "Legal Director",
//       organization: "Thomson & Associates",
//       location: "San Francisco, CA",
//       message: "DreamLegal has transformed how we handle our contract management. The interface is intuitive and the automation features have saved us countless hours.",
//       image: "/api/placeholder/80/80"
//     },
//     {
//       name: "Michael Rodriguez",
//       role: "Senior Partner",
//       organization: "Rodriguez Legal Group",
//       location: "Chicago, IL",
//       message: "An exceptional platform that understands the unique needs of legal professionals. The customer support is outstanding and the features are exactly what we needed.",
//       image: "/api/placeholder/80/80"
//     },
//     {
//       name: "Emily Watson",
//       role: "Managing Partner",
//       organization: "Watson & Partners LLP",
//       location: "New York, NY",
//       message: "The best legal tech solution we've implemented in years. It's streamlined our workflow and improved our team's productivity significantly.",
//       image: "/api/placeholder/80/80"
//     }
//   ];

//   const nextTestimonial = () => {
//     setActiveIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto py-16 px-4 relative">
//       {/* Subtle background elements */}
//       <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full opacity-30 blur-lg" />
//       <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50 rounded-full opacity-30 blur-lg" />
      
//       <div className="relative">
//         <div className="flex flex-col items-center mb-12">
//           <h2 className="text-3xl font-bold mb-2">Client Stories</h2>
//           <div className="w-20 h-1 bg-blue-600 rounded-full" />
//         </div>

//         <div className="relative overflow-hidden">
//           {/* Main content container with slide effect */}
//           <div 
//             className="transition-transform duration-500 ease-in-out flex"
//             style={{ transform: `translateX(-${activeIndex * 100}%)` }}
//           >
//             {testimonials.map((testimonial, idx) => (
//               <div key={idx} className="w-full flex-shrink-0 px-4">
//                 <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
//                   {/* Left side - Visual elements */}
//                   <div className="md:col-span-4 flex justify-center">
//                     <div className="relative w-48 h-48">
//                       {/* Decorative elements */}
//                       <div className="absolute inset-0 bg-blue-100 rounded-lg transform rotate-6" />
//                       <div className="absolute inset-0 bg-white rounded-lg transform -rotate-3 shadow-lg">
//                         <div className="relative h-full w-full p-4">
//                           <Quote className="absolute top-0 right-0 w-8 h-8 text-blue-200 transform rotate-12" />
//                           <img 
//                             src={testimonial.image}
//                             alt={testimonial.name}
//                             className="w-full h-full object-cover rounded-lg"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Right side - Content */}
//                   <div className="md:col-span-8 space-y-6">
//                     <p className="text-lg italic leading-relaxed text-gray-700">
//                       "{testimonial.message}"
//                     </p>
                    
//                     <div className="space-y-3">
//                       <div className="space-y-1">
//                         <h3 className="text-xl font-semibold text-gray-900">
//                           {testimonial.name}
//                         </h3>
//                         <p className="text-blue-600 font-medium">
//                           {testimonial.role}
//                         </p>
//                       </div>
                      
//                       <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-600">
//                         <div className="flex items-center">
//                           <Building className="w-4 h-4 mr-2" />
//                           {testimonial.organization}
//                         </div>
//                         <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full" />
//                         <div className="flex items-center">
//                           <MapPin className="w-4 h-4 mr-2" />
//                           {testimonial.location}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Navigation controls */}
//           <div className="absolute inset-y-0 left-0 flex items-center">
//             <button 
//               onClick={prevTestimonial}
//               className="p-2 rounded-full bg-white shadow-lg hover:bg-blue-50 transition-colors transform -translate-x-1/2"
//             >
//               <ChevronLeft className="w-5 h-5 text-blue-600" />
//             </button>
//           </div>
          
//           <div className="absolute inset-y-0 right-0 flex items-center">
//             <button 
//               onClick={nextTestimonial}
//               className="p-2 rounded-full bg-white shadow-lg hover:bg-blue-50 transition-colors transform translate-x-1/2"
//             >
//               <ChevronRight className="w-5 h-5 text-blue-600" />
//             </button>
//           </div>
//         </div>

//         {/* Progress indicators */}
//         <div className="mt-8 flex justify-center items-center space-x-3">
//           {testimonials.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => setActiveIndex(idx)}
//               className={`transition-all duration-300 ${
//                 idx === activeIndex
//                   ? 'w-8 bg-blue-600'
//                   : 'w-2 bg-blue-200 hover:bg-blue-300'
//               } h-2 rounded-full`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RefinedTestimonial;

// import React, { useState, useEffect } from 'react';
// import { Quote, Building, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';

// const PremiumTestimonial = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [direction, setDirection] = useState('right');
  
//   const testimonials = [
//     {
//       name: "Sarah Chen",
//       role: "Legal Director",
//       organization: "Thomson & Associates",
//       location: "San Francisco, CA",
//       message: "DreamLegal has transformed how we handle our contract management. The interface is intuitive and the automation features have saved us countless hours.",
//       image: "/api/placeholder/80/80",
//       rating: 5,
//       tags: ["Contract Management", "Automation"]
//     },
//     {
//       name: "Michael Rodriguez",
//       role: "Senior Partner",
//       organization: "Rodriguez Legal Group",
//       location: "Chicago, IL",
//       message: "An exceptional platform that understands the unique needs of legal professionals. The customer support is outstanding and the features are exactly what we needed.",
//       image: "/api/placeholder/80/80",
//       rating: 5,
//       tags: ["Customer Support", "Legal Tech"]
//     },
//     {
//       name: "Emily Watson",
//       role: "Managing Partner",
//       organization: "Watson & Partners LLP",
//       location: "New York, NY",
//       message: "The best legal tech solution we've implemented in years. It's streamlined our workflow and improved our team's productivity significantly.",
//       image: "/api/placeholder/80/80",
//       rating: 5,
//       tags: ["Workflow", "Productivity"]
//     }
//   ];

//   // Auto-advance slides
//   useEffect(() => {
//     const timer = setInterval(() => {
//       nextTestimonial();
//     }, 8000);
//     return () => clearInterval(timer);
//   }, [activeIndex]);

//   const nextTestimonial = () => {
//     if (!isTransitioning) {
//       setDirection('right');
//       setIsTransitioning(true);
//       setActiveIndex((prev) => (prev + 1) % testimonials.length);
//       setTimeout(() => setIsTransitioning(false), 500);
//     }
//   };

//   const prevTestimonial = () => {
//     if (!isTransitioning) {
//       setDirection('left');
//       setIsTransitioning(true);
//       setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//       setTimeout(() => setIsTransitioning(false), 500);
//     }
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto py-20 px-4 relative bg-gradient-to-br from-white to-blue-50">
//       {/* Premium background elements */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
//       </div>
      
//       <div className="relative">
//         {/* Premium header */}
//         <div className="flex flex-col items-center mb-16">
//           <div className="flex items-center space-x-2 text-blue-600 mb-4">
//             <Quote className="w-6 h-6 transform -rotate-12" />
//             <span className="text-sm font-medium uppercase tracking-wider">Client Testimonials</span>
//             <Quote className="w-6 h-6 transform rotate-12" />
//           </div>
//           <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
//             What Our Clients Say
//           </h2>
//           <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
//         </div>

//         <div className="relative overflow-hidden">
//           {/* Main content container with enhanced slide effect */}
//           <div 
//             className={`transition-all duration-500 ease-out flex ${
//               isTransitioning ? 'opacity-80 scale-95' : 'opacity-100 scale-100'
//             }`}
//             style={{ transform: `translateX(-${activeIndex * 100}%)` }}
//           >
//             {testimonials.map((testimonial, idx) => (
//               <div key={idx} className="w-full flex-shrink-0 px-4">
//                 <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
//                   <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
//                     {/* Left side - Enhanced visual elements */}
//                     <div className="md:col-span-4">
//                       <div className="relative">
//                         <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg transform rotate-6" />
//                         <div className="absolute inset-0 bg-gradient-to-tr from-white to-blue-50 rounded-lg transform -rotate-3 shadow-lg">
//                           <div className="relative h-full w-full p-4">
//                             <Quote className="absolute -top-2 -right-2 w-8 h-8 text-blue-200 transform rotate-12" />
//                             <img 
//                               src={testimonial.image}
//                               alt={testimonial.name}
//                               className="w-full h-full object-cover rounded-lg shadow-inner"
//                             />
//                           </div>
//                         </div>
//                       </div>
                      
//                       {/* Rating stars */}
//                       <div className="flex justify-center mt-6 space-x-1">
//                         {[...Array(testimonial.rating)].map((_, i) => (
//                           <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                         ))}
//                       </div>
//                     </div>

//                     {/* Right side - Enhanced content */}
//                     <div className="md:col-span-8 space-y-6">
//                       <p className="text-xl italic leading-relaxed text-gray-700 font-light">
//                         "{testimonial.message}"
//                       </p>
                      
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <h3 className="text-2xl font-semibold text-gray-900">
//                             {testimonial.name}
//                           </h3>
//                           <p className="text-blue-600 font-medium">
//                             {testimonial.role}
//                           </p>
//                         </div>
                        
//                         <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 space-y-2 sm:space-y-0">
//                           <div className="flex items-center">
//                             <Building className="w-4 h-4 mr-2 text-blue-500" />
//                             {testimonial.organization}
//                           </div>
//                           <div className="hidden sm:block mx-4 w-1 h-1 bg-blue-200 rounded-full" />
//                           <div className="flex items-center">
//                             <MapPin className="w-4 h-4 mr-2 text-blue-500" />
//                             {testimonial.location}
//                           </div>
//                         </div>

//                         {/* Tags */}
//                         <div className="flex flex-wrap gap-2 pt-2">
//                           {testimonial.tags.map((tag, tagIdx) => (
//                             <span 
//                               key={tagIdx}
//                               className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
//                             >
//                               {tag}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Enhanced navigation controls */}
//           <div className="absolute inset-y-0 left-0 flex items-center">
//             <button 
//               onClick={prevTestimonial}
//               className="p-3 rounded-full bg-white shadow-lg hover:bg-blue-50 transition-all duration-300 transform -translate-x-1/2 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
//             >
//               <ChevronLeft className="w-5 h-5 text-blue-600" />
//             </button>
//           </div>
          
//           <div className="absolute inset-y-0 right-0 flex items-center">
//             <button 
//               onClick={nextTestimonial}
//               className="p-3 rounded-full bg-white shadow-lg hover:bg-blue-50 transition-all duration-300 transform translate-x-1/2 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
//             >
//               <ChevronRight className="w-5 h-5 text-blue-600" />
//             </button>
//           </div>
//         </div>

//         {/* Enhanced progress indicators */}
//         <div className="mt-12 flex justify-center items-center space-x-4">
//           {testimonials.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => setActiveIndex(idx)}
//               className={`transition-all duration-500 ${
//                 idx === activeIndex
//                   ? 'w-12 bg-gradient-to-r from-blue-400 to-blue-600'
//                   : 'w-3 bg-blue-200 hover:bg-blue-300'
//               } h-3 rounded-full hover:scale-110`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PremiumTestimonial;

// import React, { useState, useEffect } from 'react';
// import { Quote, Building, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';

// const PremiumTestimonial = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isTransitioning, setIsTransitioning] = useState(false);
//   const [direction, setDirection] = useState('right');
  
//   const testimonials = [
//     {
//       name: "Sarah Chen",
//       role: "Legal Director",
//       organization: "Thomson & Associates",
//       location: "San Francisco, CA",
//       message: "DreamLegal has transformed how we handle our contract management. The interface is intuitive and the automation features have saved us countless hours.",
//       image: "/api/placeholder/80/80",
//       rating: 5,
//       tags: ["Contract Management", "Automation"]
//     },
//     {
//       name: "Michael Rodriguez",
//       role: "Senior Partner",
//       organization: "Rodriguez Legal Group",
//       location: "Chicago, IL",
//       message: "An exceptional platform that understands the unique needs of legal professionals. The customer support is outstanding and the features are exactly what we needed.",
//       image: "/api/placeholder/80/80",
//       rating: 5,
//       tags: ["Customer Support", "Legal Tech"]
//     },
//     {
//       name: "Emily Watson",
//       role: "Managing Partner",
//       organization: "Watson & Partners LLP",
//       location: "New York, NY",
//       message: "The best legal tech solution we've implemented in years. It's streamlined our workflow and improved our team's productivity significantly.",
//       image: "/api/placeholder/80/80",
//       rating: 5,
//       tags: ["Workflow", "Productivity"]
//     }
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       nextTestimonial();
//     }, 8000);
//     return () => clearInterval(timer);
//   }, [activeIndex]);

//   const nextTestimonial = () => {
//     if (!isTransitioning) {
//       setDirection('right');
//       setIsTransitioning(true);
//       setActiveIndex((prev) => (prev + 1) % testimonials.length);
//       setTimeout(() => setIsTransitioning(false), 500);
//     }
//   };

//   const prevTestimonial = () => {
//     if (!isTransitioning) {
//       setDirection('left');
//       setIsTransitioning(true);
//       setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//       setTimeout(() => setIsTransitioning(false), 500);
//     }
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto py-20 px-4 relative bg-gradient-to-br from-white to-blue-50">
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
//       </div>
      
//       <div className="relative">
//         <div className="flex flex-col items-center mb-16">
//           <div className="flex items-center space-x-2 text-blue-600 mb-4">
//             <Quote className="w-6 h-6 transform -rotate-12" />
//             <span className="text-sm font-medium uppercase tracking-wider">Client Testimonials</span>
//             <Quote className="w-6 h-6 transform rotate-12" />
//           </div>
//           <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
//             What Our Clients Say
//           </h2>
//           <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" />
//         </div>

//         <div className="relative overflow-hidden">
//           <div 
//             className={`transition-all duration-500 ease-out flex ${
//               isTransitioning ? 'opacity-80 scale-95' : 'opacity-100 scale-100'
//             }`}
//             style={{ transform: `translateX(-${activeIndex * 100}%)` }}
//           >
//             {testimonials.map((testimonial, idx) => (
//               <div key={idx} className="w-full flex-shrink-0 px-4">
//                 <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
//                   <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
//                     {/* Left side - Layered photo effect */}
//                     <div className="md:col-span-4">
//                       <div className="relative w-48 h-48 mx-auto">
//                         {/* Background layers */}
//                         <div className="absolute inset-0 bg-blue-100 rounded-lg transform rotate-12" />
//                         <div className="absolute inset-0 bg-blue-200 rounded-lg transform rotate-6" />
//                         <div className="absolute inset-0 bg-gradient-to-tr from-white to-blue-50 rounded-lg transform -rotate-3 shadow-lg">
//                           <div className="relative h-full w-full p-4">
//                             <Quote className="absolute -top-2 -right-2 w-8 h-8 text-blue-200 transform rotate-12" />
//                             <img 
//                               src={testimonial.image}
//                               alt={testimonial.name}
//                               className="w-full h-full object-cover rounded-lg shadow-inner"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Right side - Content with stars */}
//                     <div className="md:col-span-8 space-y-6">
//                       <div className="flex justify-end mb-2">
//                         <div className="flex space-x-1">
//                           {[...Array(testimonial.rating)].map((_, i) => (
//                             <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
//                           ))}
//                         </div>
//                       </div>

//                       <p className="text-xl italic leading-relaxed text-gray-700 font-light">
//                         "{testimonial.message}"
//                       </p>
                      
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <h3 className="text-2xl font-semibold text-gray-900">
//                             {testimonial.name}
//                           </h3>
//                           <p className="text-blue-600 font-medium">
//                             {testimonial.role}
//                           </p>
//                         </div>
                        
//                         <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 space-y-2 sm:space-y-0">
//                           <div className="flex items-center">
//                             <Building className="w-4 h-4 mr-2 text-blue-500" />
//                             {testimonial.organization}
//                           </div>
//                           <div className="hidden sm:block mx-4 w-1 h-1 bg-blue-200 rounded-full" />
//                           <div className="flex items-center">
//                             <MapPin className="w-4 h-4 mr-2 text-blue-500" />
//                             {testimonial.location}
//                           </div>
//                         </div>

//                         <div className="flex flex-wrap gap-2 pt-2">
//                           {testimonial.tags.map((tag, tagIdx) => (
//                             <span 
//                               key={tagIdx}
//                               className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
//                             >
//                               {tag}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Navigation controls */}
//           <div className="absolute inset-y-0 left-0 flex items-center">
//             <button 
//               onClick={prevTestimonial}
//               className="p-3 rounded-full bg-white shadow-lg hover:bg-blue-50 transition-all duration-300 transform -translate-x-1/2 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
//             >
//               <ChevronLeft className="w-5 h-5 text-blue-600" />
//             </button>
//           </div>
          
//           <div className="absolute inset-y-0 right-0 flex items-center">
//             <button 
//               onClick={nextTestimonial}
//               className="p-3 rounded-full bg-white shadow-lg hover:bg-blue-50 transition-all duration-300 transform translate-x-1/2 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
//             >
//               <ChevronRight className="w-5 h-5 text-blue-600" />
//             </button>
//           </div>
//         </div>

//         {/* Progress indicators */}
//         <div className="mt-12 flex justify-center items-center space-x-4">
//           {testimonials.map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => setActiveIndex(idx)}
//               className={`transition-all duration-500 ${
//                 idx === activeIndex
//                   ? 'w-12 bg-gradient-to-r from-blue-400 to-blue-600'
//                   : 'w-3 bg-blue-200 hover:bg-blue-300'
//               } h-3 rounded-full hover:scale-110`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PremiumTestimonial;

// import React, { useState, useEffect, useRef } from 'react';
// import { Quote, MapPin, Building2, TrendingUp, Award, Globe, Users, Timer, ArrowLeft, ArrowRight } from 'lucide-react';

// // Custom hook for intersection observer
// const useIntersectionObserver = (options = {}) => {
//   const [isIntersecting, setIsIntersecting] = useState(false);
//   const targetRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       setIsIntersecting(entry.isIntersecting);
//     }, { threshold: 0.2, ...options });

//     const currentTarget = targetRef.current;
//     if (currentTarget) {
//       observer.observe(currentTarget);
//     }

//     return () => {
//       if (currentTarget) {
//         observer.unobserve(currentTarget);
//       }
//     };
//   }, [options]);

//   return [targetRef, isIntersecting];
// };

// const TestimonialCard = ({ testimonial, isVisible }) => {
//   return (
//     <div className={`w-full transition-all duration-1000 transform
//                     ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//       <div className="grid lg:grid-cols-3 gap-6 relative">
//         {/* Background Elements */}
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl -z-10" />
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000A_1px,transparent_1px),linear-gradient(to_bottom,#0000000A_1px,transparent_1px)] bg-[size:24px_24px] rounded-3xl -z-10" />
        
//         {/* Main testimonial content */}
//         <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
//           <div className="flex flex-col h-full">
//             {/* Company Info Banner */}
//             <div className={`flex flex-wrap items-center gap-4 mb-6 p-4 bg-gradient-to-r 
//                          from-blue-50 to-blue-100/50 rounded-xl border border-blue-100/50
//                          transition-all duration-700 delay-300 transform
//                          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
//               <div className="flex items-center gap-2">
//                 <Building2 className="w-5 h-5 text-blue-600" />
//                 <span className="font-semibold text-gray-900">{testimonial.company.name}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <MapPin className="w-5 h-5 text-blue-600" />
//                 <span className="text-gray-600">{testimonial.company.location}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Globe className="w-5 h-5 text-blue-600" />
//                 <span className="text-gray-600">{testimonial.company.global}</span>
//               </div>
//             </div>

//             {/* Testimonial Content */}
//             <div className="mb-8">
//               <div className="flex gap-4 mb-6">
//                 <Quote className="w-8 h-8 text-blue-600 flex-shrink-0" />
//                 <p className={`text-lg lg:text-xl text-gray-700 leading-relaxed
//                              transition-all duration-700 delay-500
//                              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//                   {testimonial.content}
//                 </p>
//               </div>
//             </div>

//             {/* Impact Metrics */}
//             <div className="mt-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
//               {[
//                 {
//                   icon: <TrendingUp className="w-6 h-6 text-blue-600" />,
//                   value: testimonial.impact.revenue,
//                   label: "Revenue Impact"
//                 },
//                 {
//                   icon: <Users className="w-6 h-6 text-blue-600" />,
//                   value: testimonial.impact.users,
//                   label: "Active Users"
//                 },
//                 {
//                   icon: <Timer className="w-6 h-6 text-blue-600" />,
//                   value: testimonial.impact.timeframe,
//                   label: "Implementation"
//                 },
//                 {
//                   icon: <Award className="w-6 h-6 text-blue-600" />,
//                   value: "Award",
//                   label: "Recognition"
//                 }
//               ].map((metric, index) => (
//                 <div
//                   key={index}
//                   className={`bg-gradient-to-br from-blue-50 to-transparent rounded-xl p-4 
//                            flex flex-col items-center justify-center text-center border border-blue-100/50
//                            transition-all duration-500 transform
//                            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
//                   style={{ transitionDelay: `${700 + index * 100}ms` }}
//                 >
//                   {metric.icon}
//                   <p className="text-lg font-bold text-gray-900 mt-2">{metric.value}</p>
//                   <p className="text-sm text-gray-600">{metric.label}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Profile Card */}
//         <div className={`transition-all duration-700 delay-300 transform
//                       ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
//           <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white h-full
//                          shadow-lg shadow-blue-500/20">
//             <div className="flex flex-col h-full justify-center items-center text-center">
//               <div className="mb-6 relative">
//                 <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/20 to-transparent 
//                              rounded-full blur-lg" />
//                 <img
//                   src={testimonial.user.image}
//                   alt={testimonial.user.name}
//                   className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white/20 relative z-10"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <h3 className="text-2xl font-bold">{testimonial.user.name}</h3>
//                 <p className="text-blue-100">{testimonial.user.role}</p>
//                 <div className="pt-4">
//                   <p className="text-sm text-blue-200">{testimonial.company.industry}</p>
//                   <p className="text-sm text-blue-200">{testimonial.company.size}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PremiumTestimonials = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [sectionRef, isInView] = useIntersectionObserver();

//   const nextTestimonial = () => {
//     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   useEffect(() => {
//     const timer = setInterval(nextTestimonial, 6000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
    
//     <div ref={sectionRef} className="w-full  bg-gradient-to-br from-blue-50 to-white    py-24 relative">
     
//       <div className="absolute inset-0">
//         {/* Primary blue grid */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
        
//         {/* White fade overlays */}
//         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
//         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
        
//         {/* Side fades */}
//         <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
//         <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4">
//         {/* Header */}
//         <div className={`mb-20 text-center relative transition-all duration-700 transform
//                       ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="inline-block">
//             <span className="block text-sm font-semibold text-blue-600 mb-2 tracking-wider">
//               GLOBAL IMPACT STORIES
//             </span>
//             <h2 className="text-5xl font-bold text-gray-900 mb-4 relative inline-block">
//               Transforming Enterprises
//               <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 
//                            transform origin-left transition-transform duration-1000 
//                            ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
//             </h2>
//             <p className="text-gray-600 mt-4 max-w-xl mx-auto">
//               See how leading companies achieve remarkable results with our solutions
//             </p>
//           </div>
//         </div>

//         {/* Testimonial Carousel */}
//         <div className="relative">
//           <TestimonialCard
//             testimonial={testimonials[currentIndex]}
//             isVisible={isInView}
//           />

//           {/* Navigation */}
//           <div className={`flex justify-between items-center gap-6 mt-12 transition-all duration-700 delay-1000
//                         ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//             <div className="flex gap-3">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className="group relative h-2"
//                 >
//                   <div className={`h-0.5 transition-all duration-300 rounded-full
//                                 ${currentIndex === index 
//                                   ? 'w-12 bg-blue-600' 
//                                   : 'w-6 bg-blue-200 group-hover:bg-blue-300'}`} />
//                 </button>
//               ))}
//             </div>
            
//             <div className="flex gap-4">
//               <button
//                 onClick={prevTestimonial}
//                 className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl 
//                          transition-all duration-300 hover:bg-blue-50 group"
//               >
//                 <ArrowLeft className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
//               </button>
//               <button
//                 onClick={nextTestimonial}
//                 className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl 
//                          transition-all duration-300 hover:bg-blue-50 group"
//               >
//                 <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PremiumTestimonials;
import React, { useState, useEffect, useRef } from 'react';
import { Quote, MapPin, Building2, TrendingUp, Award, Globe, Users, Timer, ArrowLeft, ArrowRight } from 'lucide-react';

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.2, ...options });

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

const TestimonialCard = ({ testimonial, isVisible }) => {
  return (
    <div className={`w-full transition-all duration-1000 transform overflow-hidden
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl lg:rounded-3xl -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000A_1px,transparent_1px),linear-gradient(to_bottom,#0000000A_1px,transparent_1px)] bg-[size:24px_24px] rounded-2xl lg:rounded-3xl -z-10" />
        
        {/* Main testimonial content */}
        <div className="lg:col-span-2 bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-8 shadow-lg border border-gray-100">
          <div className="flex flex-col h-full">
            {/* Company Info Banner */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-4 mb-4 lg:mb-6 p-3 lg:p-4 bg-gradient-to-r 
                         from-blue-50 to-blue-100/50 rounded-xl border border-blue-100/50
                         transition-all duration-700 delay-300 transform">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                <span className="font-semibold text-gray-900 text-sm lg:text-base">{testimonial.company.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                <span className="text-gray-600 text-sm lg:text-base">{testimonial.company.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                <span className="text-gray-600 text-sm lg:text-base">{testimonial.company.global}</span>
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="mb-6 lg:mb-8">
              <div className="flex gap-3 lg:gap-4">
                <Quote className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 flex-shrink-0" />
                <p className="text-base lg:text-xl text-gray-700 leading-relaxed
                             transition-all duration-700 delay-500">
                  {testimonial.content}
                </p>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="mt-auto grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
              {[
                {
                  icon: <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />,
                  value: testimonial.impact.revenue,
                  label: "Revenue Impact"
                },
                {
                  icon: <Users className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />,
                  value: testimonial.impact.users,
                  label: "Active Users"
                },
                {
                  icon: <Timer className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />,
                  value: testimonial.impact.timeframe,
                  label: "Implementation"
                },
                {
                  icon: <Award className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />,
                  value: "Award",
                  label: "Recognition"
                }
              ].map((metric, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-transparent rounded-lg lg:rounded-xl p-3 lg:p-4 
                           flex flex-col items-center justify-center text-center border border-blue-100/50
                           transition-all duration-500 transform"
                  style={{ transitionDelay: `${700 + index * 100}ms` }}
                >
                  {metric.icon}
                  <p className="text-sm lg:text-lg font-bold text-gray-900 mt-1 lg:mt-2">{metric.value}</p>
                  <p className="text-xs lg:text-sm text-gray-600">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="lg:block">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white h-full
                         shadow-lg shadow-blue-500/20">
            <div className="flex flex-col h-full justify-center items-center text-center">
              <div className="mb-4 lg:mb-6 relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/20 to-transparent 
                             rounded-full blur-lg" />
                <img
                  src={testimonial.user.image}
                  alt={testimonial.user.name}
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl lg:rounded-2xl object-cover ring-4 ring-white/20 relative z-10"
                />
              </div>
              <div className="space-y-1 lg:space-y-2">
                <h3 className="text-xl lg:text-2xl font-bold">{testimonial.user.name}</h3>
                <p className="text-blue-100 text-sm lg:text-base">{testimonial.user.role}</p>
                <div className="pt-2 lg:pt-4">
                  <p className="text-xs lg:text-sm text-blue-200">{testimonial.company.industry}</p>
                  <p className="text-xs lg:text-sm text-blue-200">{testimonial.company.size}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PremiumTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sectionRef, isInView] = useIntersectionObserver();

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={sectionRef} className="w-full bg-gradient-to-br from-blue-50 to-white py-12 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        {/* Primary blue grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F61A_1px,transparent_1px),linear-gradient(to_bottom,#3B82F61A_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* White fade overlays */}
        <div className="absolute inset-x-0 top-0 h-24 lg:h-32 bg-gradient-to-b from-white via-white/95 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 lg:h-32 bg-gradient-to-t from-white via-white/95 to-transparent" />
        
        {/* Side fades */}
        <div className="absolute inset-y-0 left-0 w-16 lg:w-32 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 lg:w-32 bg-gradient-to-l from-white via-white/90 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <div className="mb-12 lg:mb-20 text-center">
          <div className="inline-block">
            <span className="block text-sm font-semibold text-blue-600 mb-2 tracking-wider">
              GLOBAL IMPACT STORIES
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 relative inline-block">
            Transforming Law Firms & Enterprises 
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 
                           transform origin-left transition-transform duration-1000" />
            </h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto text-sm lg:text-base">
            See how leading companies achieve remarkable results with our solutions

            </p>
          </div>
        </div>



        {/* Testimonial Carousel */}
        <div className="relative">
          <TestimonialCard
            testimonial={testimonials[currentIndex]}
            isVisible={isInView}
          />

          {/* Navigation */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6 mt-8 lg:mt-12">
            <div className="flex gap-2 lg:gap-3 order-2 lg:order-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="group relative h-2"
                >
                  <div className={`h-0.5 transition-all duration-300 rounded-full
                                ${currentIndex === index 
                                  ? 'w-8 lg:w-12 bg-blue-600' 
                                  : 'w-4 lg:w-6 bg-blue-200 group-hover:bg-blue-300'}`} />
                </button>
              ))}
            </div>
            
            <div className="flex gap-3 lg:gap-4 order-1 lg:order-2">
              <button
                onClick={prevTestimonial}
                className="p-2 lg:p-3 rounded-full bg-white shadow-md lg:shadow-lg hover:shadow-xl 
                         transition-all duration-300 hover:bg-blue-50 group"
              >
                <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 lg:p-3 rounded-full bg-white shadow-md lg:shadow-lg hover:shadow-xl 
                         transition-all duration-300 hover:bg-blue-50 group"
              >
                <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumTestimonials;