"use client"
// import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     role: "CEO at TechCorp",
//     image: "/api/placeholder/80/80",
//     content: "This product has completely transformed how we operate. The ROI we've seen is incredible, and the support team is absolutely outstanding.",
//     rating: 5
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     role: "Product Manager",
//     image: "/api/placeholder/80/80",
//     content: "Implementing this solution was the best decision we made this year. Our productivity has increased by 300% since we started using it.",
//     rating: 5
//   },
//   {
//     id: 3,
//     name: "Emma Williams",
//     role: "Marketing Director",
//     image: "/api/placeholder/80/80",
//     content: "The attention to detail and the user experience is unmatched. It's rare to find a product that exceeds expectations in every way.",
//     rating: 5
//   }
// ];

// const TestimonialCard = ({ testimonial, isActive }) => {
//   return (
//     <div className={`transform transition-all duration-500 ${
//       isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-40'
//     }`}>
//       <div className="bg-white rounded-xl shadow-lg p-8 relative">
//         <Quote className="absolute text-blue-500/10 w-24 h-24 -top-4 -left-4" />
//         <div className="relative">
//           <div className="flex items-center gap-4 mb-6">
//             <img
//               src={testimonial.image}
//               alt={testimonial.name}
//               className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
//             />
//             <div>
//               <h3 className="font-bold text-xl text-gray-800">{testimonial.name}</h3>
//               <p className="text-gray-600">{testimonial.role}</p>
//             </div>
//           </div>
//           <div className="flex gap-1 mb-4">
//             {[...Array(testimonial.rating)].map((_, i) => (
//               <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
//             ))}
//           </div>
//           <p className="text-gray-700 text-lg leading-relaxed">{testimonial.content}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const PremiumTestimonials = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//   };

//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-20 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">
//             What Our Clients Say
//           </h2>
//           <p className="text-xl text-gray-600">
//             Don't just take our word for it - hear from our satisfied customers
//           </p>
//         </div>

//         <div className="relative">
//           <div className="flex justify-center items-center gap-8">
//             {testimonials.map((testimonial, index) => (
//               <div
//                 key={testimonial.id}
//                 className="w-full max-w-xl"
//                 style={{
//                   display: Math.abs(currentIndex - index) <= 1 ? 'block' : 'none'
//                 }}
//               >
//                 <TestimonialCard
//                   testimonial={testimonial}
//                   isActive={currentIndex === index}
//                 />
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={handlePrev}
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
//           >
//             <ChevronLeft className="w-6 h-6 text-gray-600" />
//           </button>

//           <button
//             onClick={handleNext}
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
//           >
//             <ChevronRight className="w-6 h-6 text-gray-600" />
//           </button>
//         </div>

//         <div className="flex justify-center gap-2 mt-8">
//           {testimonials.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentIndex(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 currentIndex === index ? 'bg-blue-500 w-6' : 'bg-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PremiumTestimonials;

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Quote, Star, ArrowRight } from 'lucide-react';

// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     role: "CEO at TechCorp",
//     image: "/api/placeholder/120/120",
//     content: "This product has completely transformed how we operate. The ROI we've seen is incredible, and the support team is absolutely outstanding.",
//     rating: 5,
//     companyLogo: "/api/placeholder/60/30",
//     metrics: { improvement: "300%", timeframe: "3 months" }
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     role: "Product Manager",
//     image: "/api/placeholder/120/120",
//     content: "Implementing this solution was the best decision we made this year. Our productivity has increased by 300% since we started using it.",
//     rating: 5,
//     companyLogo: "/api/placeholder/60/30",
//     metrics: { improvement: "200%", timeframe: "2 months" }
//   },
//   {
//     id: 3,
//     name: "Emma Williams",
//     role: "Marketing Director",
//     image: "/api/placeholder/120/120",
//     content: "The attention to detail and the user experience is unmatched. It's rare to find a product that exceeds expectations in every way.",
//     rating: 5,
//     companyLogo: "/api/placeholder/60/30",
//     metrics: { improvement: "450%", timeframe: "6 months" }
//   }
// ];

// const TestimonialCard = ({ testimonial, index, isActive }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       animate={{ 
//         opacity: isActive ? 1 : 0.3, 
//         y: 0,
//         scale: isActive ? 1 : 0.9,
//         rotateY: isActive ? 0 : 15
//       }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className="relative"
//     >
//       <div className="grid grid-cols-12 gap-6 relative">
//         {/* Dynamic background shape */}
//         <div className="absolute -z-10 w-4/5 h-4/5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-[3rem] blur-lg transform -rotate-6" />
        
//         {/* Main content area */}
//         <div className="col-span-8 bg-white backdrop-blur-lg bg-opacity-90 rounded-[2rem] p-8 shadow-2xl">
//           <div className="flex items-start gap-8">
//             {/* Quote and rating section */}
//             <div className="flex flex-col items-center">
//               <Quote className="w-12 h-12 text-indigo-500 mb-4" />
//               <div className="h-32 w-0.5 bg-gradient-to-b from-indigo-500 to-transparent" />
//               <div className="flex flex-col gap-1 mt-4">
//                 {[...Array(testimonial.rating)].map((_, i) => (
//                   <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                 ))}
//               </div>
//             </div>

//             {/* Testimonial content */}
//             <div className="flex-1">
//               <p className="text-xl font-light leading-relaxed text-gray-700 mb-6">
//                 "{testimonial.content}"
//               </p>
              
//               {/* Metrics display */}
//               <div className="flex gap-8 mb-8">
//                 <div className="bg-indigo-50 rounded-xl p-4">
//                   <p className="text-3xl font-bold text-indigo-600">{testimonial.metrics.improvement}</p>
//                   <p className="text-sm text-gray-600">Improvement</p>
//                 </div>
//                 <div className="bg-purple-50 rounded-xl p-4">
//                   <p className="text-3xl font-bold text-purple-600">{testimonial.metrics.timeframe}</p>
//                   <p className="text-sm text-gray-600">Timeframe</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Profile section */}
//         <div className="col-span-4">
//           <motion.div
//             initial={{ x: 50, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[2rem] p-8 text-white relative overflow-hidden"
//           >
//             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
//             <div className="relative z-10">
//               <img
//                 src={testimonial.image}
//                 alt={testimonial.name}
//                 className="w-24 h-24 rounded-2xl object-cover mb-6 ring-4 ring-white/20"
//               />
//               <h3 className="text-2xl font-bold mb-2">{testimonial.name}</h3>
//               <p className="text-white/80 mb-4">{testimonial.role}</p>
//               <img
//                 src={testimonial.companyLogo}
//                 alt="Company logo"
//                 className="h-8 opacity-80"
//               />
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const CreativeTestimonials = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//     }, 6000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-24 px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header section */}
//         <div className="mb-20">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex items-center gap-4 mb-6"
//           >
//             <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500" />
//             <p className="text-xl text-indigo-600 font-medium">Success Stories</p>
//           </motion.div>
//           <h2 className="text-5xl font-bold text-gray-900 mb-4">
//             Transforming Businesses
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
//               {" "}Every Day
//             </span>
//           </h2>
//         </div>

//         {/* Testimonials carousel */}
//         <div className="relative">
//           {testimonials.map((testimonial, index) => (
//             <div
//               key={testimonial.id}
//               style={{
//                 display: currentIndex === index ? 'block' : 'none'
//               }}
//             >
//               <TestimonialCard
//                 testimonial={testimonial}
//                 index={index}
//                 isActive={currentIndex === index}
//               />
//             </div>
//           ))}

//           {/* Navigation */}
//           <div className="flex justify-between items-center mt-12">
//             <div className="flex gap-3">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`h-1 transition-all duration-300 ${
//                     currentIndex === index ? 'w-12 bg-indigo-500' : 'w-6 bg-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>
//             <button
//               onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
//               className="group flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors"
//             >
//               Next Success Story
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreativeTestimonials;

// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Quote, Star, ArrowRight, ArrowLeft, Globe } from 'lucide-react';

// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     role: "CEO at TechCorp",
//     image: "/api/placeholder/120/120",
//     content: "This product has completely transformed how we operate. The ROI we've seen is incredible, and the support team is absolutely outstanding.",
//     rating: 5,
//     companyLogo: "/api/placeholder/60/30",
//     metrics: { improvement: "300%", timeframe: "3 months", satisfaction: "99%" },
//     location: "New York, USA",
//     industry: "Technology"
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     role: "Product Manager",
//     image: "/api/placeholder/120/120",
//     content: "Implementing this solution was the best decision we made this year. Our productivity has increased by 300% since we started using it.",
//     rating: 5,
//     companyLogo: "/api/placeholder/60/30",
//     metrics: { improvement: "200%", timeframe: "2 months", satisfaction: "98%" },
//     location: "Singapore",
//     industry: "Finance"
//   },
//   {
//     id: 3,
//     name: "Emma Williams",
//     role: "Marketing Director",
//     image: "/api/placeholder/120/120",
//     content: "The attention to detail and the user experience is unmatched. It's rare to find a product that exceeds expectations in every way.",
//     rating: 5,
//     companyLogo: "/api/placeholder/60/30",
//     metrics: { improvement: "450%", timeframe: "6 months", satisfaction: "100%" },
//     location: "London, UK",
//     industry: "Marketing"
//   }
// ];

// const MetricCircle = ({ value, label }) => (
//   <div className="relative group cursor-pointer">
//     <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity" />
//     <div className="relative bg-white rounded-full p-4 w-24 h-24 flex flex-col items-center justify-center transform transition-transform group-hover:scale-105">
//       <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//         {value}
//       </span>
//       <span className="text-xs text-gray-600 text-center">{label}</span>
//     </div>
//   </div>
// );

// const TestimonialCard = ({ testimonial, isActive, direction }) => {
//   const variants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//       scale: 0.5,
//       rotateY: direction > 0 ? 45 : -45
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//       scale: 1,
//       rotateY: 0
//     },
//     exit: (direction) => ({
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//       scale: 0.5,
//       rotateY: direction < 0 ? 45 : -45
//     })
//   };

//   return (
//     <motion.div
//       custom={direction}
//       variants={variants}
//       initial="enter"
//       animate="center"
//       exit="exit"
//       transition={{
//         x: { type: "spring", stiffness: 300, damping: 30 },
//         opacity: { duration: 0.4 },
//         rotateY: { duration: 0.8 }
//       }}
//       className="w-full"
//     >
//       <div className="grid lg:grid-cols-12 gap-6 md:gap-8 p-4 md:p-6">
//         {/* Left Section - Profile */}
//         <div className="lg:col-span-4 order-2 lg:order-1">
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden h-full"
//           >
//             {/* Decorative Elements */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
//             <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
            
//             <div className="relative z-10">
//               <div className="relative">
//                 <img
//                   src={testimonial.image}
//                   alt={testimonial.name}
//                   className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover mb-6 ring-4 ring-white/20 transform transition-transform hover:scale-105"
//                 />
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.5 }}
//                   className="absolute -bottom-3 -right-3 bg-white rounded-full p-2"
//                 >
//                   <img
//                     src={testimonial.companyLogo}
//                     alt="Company logo"
//                     className="w-8 h-8 rounded-full"
//                   />
//                 </motion.div>
//               </div>
              
//               <h3 className="text-2xl md:text-3xl font-bold mb-2">{testimonial.name}</h3>
//               <p className="text-white/80 mb-4">{testimonial.role}</p>
              
//               <div className="flex items-center gap-2 text-sm">
//                 <Globe className="w-4 h-4" />
//                 {testimonial.location}
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* Right Section - Content */}
//         <div className="lg:col-span-8 order-1 lg:order-2">
//           <motion.div
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="bg-white backdrop-blur-lg bg-opacity-90 rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden"
//           >
//             {/* Decorative gradient blob */}
//             <div className="absolute -z-10 w-4/5 h-4/5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-xl transform -rotate-6 animate-pulse" />
            
//             <div className="flex flex-col md:flex-row gap-8">
//               <Quote className="w-12 h-12 text-indigo-500 shrink-0" />
              
//               <div className="flex-1">
//                 <p className="text-lg md:text-xl font-light leading-relaxed text-gray-700 mb-8">
//                   "{testimonial.content}"
//                 </p>
                
//                 {/* Metrics */}
//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
//                   <MetricCircle 
//                     value={testimonial.metrics.improvement} 
//                     label="Growth"
//                   />
//                   <MetricCircle 
//                     value={testimonial.metrics.timeframe} 
//                     label="Timeframe"
//                   />
//                   <MetricCircle 
//                     value={testimonial.metrics.satisfaction} 
//                     label="Satisfaction"
//                   />
//                 </div>

//                 {/* Rating */}
//                 <div className="flex gap-1">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <motion.div
//                       key={i}
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ delay: 0.1 * i }}
//                     >
//                       <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
//                     </motion.div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const UltraPremiumTestimonials = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [direction, setDirection] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setDirection(1);
//       setCurrentIndex((prev) => (prev + 1) % testimonials.length);
//     }, 8000);
//     return () => clearInterval(timer);
//   }, []);

//   const paginate = (newDirection) => {
//     setDirection(newDirection);
//     setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 md:py-24 px-4 md:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-12 md:mb-20">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex items-center gap-4 mb-6"
//           >
//             <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500" />
//             <p className="text-xl text-indigo-600 font-medium">Voice of Success</p>
//           </motion.div>
//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
//             From Vision to
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
//               {" "}Reality
//             </span>
//           </h2>
//         </div>

//         {/* Testimonials Carousel */}
//         <div className="relative overflow-hidden">
//           <motion.div
//             key={currentIndex}
//             custom={direction}
//             className="relative"
//           >
//             <TestimonialCard
//               testimonial={testimonials[currentIndex]}
//               isActive={true}
//               direction={direction}
//             />
//           </motion.div>

//           {/* Navigation */}
//           <div className="flex flex-col md:flex-row justify-between items-center mt-8 md:mt-12 gap-6">
//             <div className="flex gap-3">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => {
//                     setDirection(index > currentIndex ? 1 : -1);
//                     setCurrentIndex(index);
//                   }}
//                   className="group relative"
//                 >
//                   <div className={`h-1 transition-all duration-300 ${
//                     currentIndex === index ? 'w-12 bg-indigo-500' : 'w-6 bg-gray-300 group-hover:bg-indigo-300'
//                   }`} />
//                 </button>
//               ))}
//             </div>
            
//             <div className="flex gap-4">
//               <button
//                 onClick={() => paginate(-1)}
//                 className="group flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
//               >
//                 <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
//               </button>
//               <button
//                 onClick={() => paginate(1)}
//                 className="group flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
//               >
//                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UltraPremiumTestimonials;

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Quote, Star, ArrowRight, ArrowLeft, Globe, Award, TrendingUp } from 'lucide-react';

// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     role: "CEO at TechCorp",
//     image: "/api/placeholder/120/120",
//     content: "This product has completely transformed how we operate. The ROI we've seen is incredible, and the support team is absolutely outstanding.",
//     rating: 5,
//     companyLogo: "/api/placeholder/60/30",
//     metrics: { improvement: "300%", timeframe: "3 months" },
//     achievement: "Doubled Team Productivity"
//   },
//   {
//     id: 2,
//     name: "Michael Chen",
//     role: "Product Manager",
//     image: "/api/placeholder/120/120",
//     content: "Implementing this solution was the best decision we made this year. Our productivity has increased by 300% since we started using it.",
//     rating: 5,
//     companyLogo: "/api/placeholder/60/30",
//     metrics: { improvement: "200%", timeframe: "2 months" },
//     achievement: "Reduced Costs by 50%"
//   },
//   {
//     id: 3,
//     name: "Emma Williams",
//     role: "Marketing Director",
//     image: "/api/placeholder/120/120",
//     content: "The attention to detail and the user experience is unmatched. It's rare to find a product that exceeds expectations in every way.",
//     rating: 5,
//     companyLogo: "/api/placeholder/60/30",
//     metrics: { improvement: "450%", timeframe: "6 months" },
//     achievement: "10x Customer Growth"
//   }
// ];

// const TestimonialCard = ({ testimonial, isActive }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.6, ease: "easeOut" }}
//       className="grid grid-cols-12 gap-6 relative"
//     >
//       {/* Floating background elements */}
//       <motion.div
//         animate={{ 
//           rotate: [0, 5, -5, 0],
//           scale: [1, 1.02, 0.98, 1]
//         }}
//         transition={{ 
//           duration: 20,
//           repeat: Infinity,
//           ease: "linear"
//         }}
//         className="absolute -z-10 w-4/5 h-4/5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-[3rem] blur-xl"
//       />
      
//       {/* Main content area */}
//       <motion.div 
//         className="col-span-8 bg-white backdrop-blur-lg bg-opacity-90 rounded-[2rem] p-8 shadow-2xl"
//         initial={{ x: -50 }}
//         animate={{ x: 0 }}
//         transition={{ delay: 0.2 }}
//       >
//         <div className="flex items-start gap-8">
//           {/* Quote and rating column */}
//           <div className="flex flex-col items-center">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ type: "spring" }}
//             >
//               <Quote className="w-12 h-12 text-indigo-500 mb-4" />
//             </motion.div>
//             <motion.div
//               initial={{ height: 0 }}
//               animate={{ height: "8rem" }}
//               transition={{ delay: 0.3 }}
//               className="w-0.5 bg-gradient-to-b from-indigo-500 to-transparent"
//             />
//             <motion.div 
//               className="flex flex-col gap-1 mt-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//             >
//               {[...Array(testimonial.rating)].map((_, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.1 * i }}
//                 >
//                   <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>

//           {/* Testimonial content */}
//           <div className="flex-1">
//             <motion.p 
//               className="text-xl font-light leading-relaxed text-gray-700 mb-6"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               "{testimonial.content}"
//             </motion.p>

//             {/* Achievement banner */}
//             <motion.div
//               initial={{ x: -20, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.4 }}
//               className="flex items-center gap-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6"
//             >
//               <Award className="w-6 h-6 text-indigo-500" />
//               <span className="text-gray-700 font-medium">{testimonial.achievement}</span>
//             </motion.div>
            
//             {/* Metrics display */}
//             <div className="flex gap-8">
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//                 className="bg-indigo-50 rounded-xl p-4"
//               >
//                 <p className="text-3xl font-bold text-indigo-600">{testimonial.metrics.improvement}</p>
//                 <p className="text-sm text-gray-600">Improvement</p>
//               </motion.div>
//               <motion.div
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ delay: 0.6 }}
//                 className="bg-purple-50 rounded-xl p-4"
//               >
//                 <p className="text-3xl font-bold text-purple-600">{testimonial.metrics.timeframe}</p>
//                 <p className="text-sm text-gray-600">Timeframe</p>
//               </motion.div>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Profile section */}
//       <motion.div 
//         className="col-span-4"
//         initial={{ x: 50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ delay: 0.4 }}
//       >
//         <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[2rem] p-8 text-white relative overflow-hidden h-full">
//           <motion.div 
//             className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"
//             animate={{
//               scale: [1, 1.2, 1],
//               rotate: [0, 90, 0],
//             }}
//             transition={{
//               duration: 20,
//               repeat: Infinity,
//               ease: "linear"
//             }}
//           />
          
//           <div className="relative z-10">
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <img
//                 src={testimonial.image}
//                 alt={testimonial.name}
//                 className="w-24 h-24 rounded-2xl object-cover mb-6 ring-4 ring-white/20"
//               />
//             </motion.div>
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.5 }}
//             >
//               <h3 className="text-2xl font-bold mb-2">{testimonial.name}</h3>
//               <p className="text-white/80 mb-4">{testimonial.role}</p>
//               <img
//                 src={testimonial.companyLogo}
//                 alt="Company logo"
//                 className="h-8 opacity-80"
//               />
//             </motion.div>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// };

// const PremiumTestimonials = () => {
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
//     <div className="min-h-screen bg-gray-50 py-24 px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header section */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-20"
//         >
//           <div className="flex items-center gap-4 mb-6">
//             <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500" />
//             <p className="text-xl text-indigo-600 font-medium">Success Stories</p>
//           </div>
//           <h2 className="text-5xl font-bold text-gray-900 mb-4">
//             Transforming Businesses
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
//               {" "}Every Day
//             </span>
//           </h2>
//         </motion.div>

//         {/* Testimonials carousel */}
//         <div className="relative">
//           <AnimatePresence mode="wait">
//             {testimonials.map((testimonial, index) => (
//               currentIndex === index && (
//                 <TestimonialCard
//                   key={testimonial.id}
//                   testimonial={testimonial}
//                   isActive={currentIndex === index}
//                 />
//               )
//             ))}
//           </AnimatePresence>

//           {/* Navigation buttons */}
//           <div className="flex justify-between items-center mt-12">
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
//                 <ArrowLeft className="w-6 h-6 text-gray-600 transform transition-transform group-hover:-translate-x-1" />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={nextTestimonial}
//                 className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
//               >
//                 <ArrowRight className="w-6 h-6 text-gray-600 transform transition-transform group-hover:translate-x-1" />
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PremiumTestimonials;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Quote, MapPin, Building2, TrendingUp, Award, Globe, Users, Timer } from 'lucide-react';
import { Quote, MapPin, Building2, TrendingUp, Award, Globe, Users, Timer, ArrowLeft, ArrowRight } from 'lucide-react';
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

const TestimonialCard = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <div className="grid lg:grid-cols-3 gap-6 relative">
        {/* Background gradient */}
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.02, 0.98, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -z-10 w-4/5 h-4/5 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl"
        />
        
        {/* Main testimonial content */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur-lg rounded-3xl p-6 lg:p-8 shadow-xl">
          <div className="flex flex-col h-full">
            {/* Company Info Banner */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                <span className="font-semibold text-gray-800">{testimonial.company.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-600">{testimonial.company.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-600" />
                <span className="text-gray-600">{testimonial.company.global}</span>
              </div>
            </motion.div>

            {/* Testimonial Content */}
            <div className="mb-8">
              <div className="flex gap-4 mb-6">
                <Quote className="w-8 h-8 text-indigo-500 flex-shrink-0" />
                <motion.p 
                  className="text-lg lg:text-xl font-light leading-relaxed text-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {testimonial.content}
                </motion.p>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="mt-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center justify-center text-center"
              >
                <TrendingUp className="w-6 h-6 text-indigo-600 mb-2" />
                <p className="text-lg font-bold text-indigo-600">{testimonial.impact.revenue}</p>
                <p className="text-xs text-gray-600">Revenue Impact</p>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-purple-50 rounded-xl p-4 flex flex-col items-center justify-center text-center"
              >
                <Users className="w-6 h-6 text-purple-600 mb-2" />
                <p className="text-lg font-bold text-purple-600">{testimonial.impact.users}</p>
                <p className="text-xs text-gray-600">Active Users</p>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center justify-center text-center"
              >
                <Timer className="w-6 h-6 text-indigo-600 mb-2" />
                <p className="text-lg font-bold text-indigo-600">{testimonial.impact.timeframe}</p>
                <p className="text-xs text-gray-600">Implementation</p>
              </motion.div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-purple-50 rounded-xl p-4 flex flex-col items-center justify-center text-center"
              >
                <Award className="w-6 h-6 text-purple-600 mb-2" />
                <p className="text-lg font-bold text-purple-600">Award</p>
                <p className="text-xs text-gray-600">Recognition</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 lg:p-8 text-white h-full">
            <div className="flex flex-col h-full justify-center items-center text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="mb-6"
              >
                <img
                  src={testimonial.user.image}
                  alt={testimonial.user.name}
                  className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white/20"
                />
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="space-y-2"
              >
                <h3 className="text-xl lg:text-2xl font-bold">{testimonial.user.name}</h3>
                <p className="text-white/80">{testimonial.user.role}</p>
                <div className="pt-4">
                  <p className="text-sm text-white/60">{testimonial.company.industry}</p>
                  <p className="text-sm text-white/60">{testimonial.company.size}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const EnhancedTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <div className="min-h-screen bg-gray-50 py-12 lg:py-24 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 lg:mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500" />
            <p className="text-lg lg:text-xl text-indigo-600 font-medium">Global Impact Stories</p>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Transforming Enterprises
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500"> Worldwide</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={testimonials[currentIndex].id}
              testimonial={testimonials[currentIndex]}
            />
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-8 lg:mt-12">
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className="group relative"
                >
                  <motion.div
                    className={`h-1 transition-all duration-300 ${
                      currentIndex === index ? 'w-12 bg-indigo-500' : 'w-6 bg-gray-300'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                </button>
              ))}
            </div>
            
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevTestimonial}
                className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextTestimonial}
                className="bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <ArrowRight className="w-6 h-6 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTestimonials;