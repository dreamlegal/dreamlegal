

// "use client"
// import React, { useState, useEffect } from 'react';
// import { ChevronRight, ChevronLeft, Sparkles, Calendar, ArrowRight, BookOpen } from 'lucide-react';

// const LandingSections = () => {
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [currentBlog, setCurrentBlog] = useState(0);
//   const [blogs, setBlogs] = useState([]);

//   const testimonials = [
//     {
//       quote: "A one-stop hub for LegalTech! The legal technology directory captures every essential tool, making it effortless to discover, compare, and choose the right solutions.",
//       name: "Suruchi Kanoongo",
//       position: "Senior Process Executive, Infosys",
//       image: "/images/review1.jpg"
//     },
//     {
//       quote: "Dream Legal has been exceptional in bridging traditional legal practices with modern tools. Their professionalism and guidance make them invaluable for modernizing legal workflows and adopting technologies",
//       name: "Ayush Chandra",
//       position: "In-House Legal Expert",
//       image: "/images/review2.jpg"
//     },
//     {
//       quote: "DreamLegal is a trusted resource for dependable insights on legal tech solutions. Their evaluations are unbiased and tailored to meet the specific needs of legal teams.",
//       name: "Rahul Hingmire",
//       position: "Managing Partner at Vis Legis Law Practice",
//       image: "/images/review3.jpg"
//     },
//     {
//       quote: "I'm thrilled to recommend Mr. Ranjan Singhania, Co-Founder of Dream Legal. Ranjan's expertise in legal tech and innovation has been instrumental in reshaping our approach at Tuhin & Partners. DreamLegal's partnership has been invaluable in our journey to becoming a tech-powered firm. Mr. Ranjan is the ideal collaborator if you want to innovate and thrive in the legal sector.",
//       name: "Osman Gani Tuhin",
//       position: "CEO Tuhin & Partners",
//       image: "/images/review4.jpg"
//     }
//   ];

//   // Auto-slide testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
//     }, 5000); // Change every 5 seconds

//     return () => clearInterval(interval);
//   }, [testimonials.length]);

//   // Fetch blogs
//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await fetch('/api/home-insights?limit=6'); // Fetch latest 6 blogs
//         const data = await response.json();
//         setBlogs(data.blogs || []);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   const nextTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
//   };

//   const prevTestimonial = () => {
//     setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
//   };

//   const nextBlog = () => {
//     const cardsPerSlide = 4; // Show 4 cards at a time
//     const maxSlide = Math.max(0, blogs.length - cardsPerSlide);
//     setCurrentBlog((prev) => (prev >= maxSlide ? 0 : prev + 1));
//   };

//   const prevBlog = () => {
//     const cardsPerSlide = 4; // Show 4 cards at a time
//     const maxSlide = Math.max(0, blogs.length - cardsPerSlide);
//     setCurrentBlog((prev) => (prev <= 0 ? maxSlide : prev - 1));
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const truncateContent = (content, maxLength = 150) => {
//     if (content.length <= maxLength) return content;
//     return content.substring(0, maxLength) + '...';
//   };

//   return (
//     <div className="w-full">
//       {/* 1. Review Section */}
//       <section className="py-20 bg-white text-center">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center">
//             <h2 className="text-4xl font-bold text-[#1e2556] mb-6">Unlock Smarter Legal Tech Choices. Sign Up Today.</h2>
//             <p className="text-xl text-[#334155] mb-10">Join thousands of legal professionals in discovering, comparing, and choosing the best legal technology for your needs.</p>
//             <a href="/auth/user/signup" className="inline-block px-10 py-3 bg-[#1e2556] text-white border-2 border-[#1e2556] rounded-full font-semibold hover:bg-[#1e2556]/90 transition-colors">Sign Up</a>
//           </div>
//         </div>
//       </section>
      
//       {/* 2. Testimonial Slider Section */}
//       <section className="py-20 bg-[#1e2556] text-white relative overflow-hidden">
//         {/* Background decorative elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-20 left-20 w-40 h-40 bg-[#7cc6ee]/10 rounded-full blur-xl"></div>
//           <div className="absolute bottom-20 right-20 w-56 h-56 bg-[#7cc6ee]/5 rounded-full blur-2xl"></div>
//           <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-lg"></div>
//           <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-[#7cc6ee]/8 rounded-full blur-xl"></div>
//         </div>

//         <div className="relative z-10 w-full">
//           <div className="text-center mb-12 px-4">
//             <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full mb-6">
//               <Sparkles className="w-5 h-5 text-[#7cc6ee]" />
//               <span className="text-sm font-semibold text-[#7cc6ee] uppercase tracking-wider">
//                 Testimonials
//               </span>
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
//               What Legal Professionals Say
//             </h2>
//             <p className="text-lg text-white/70 max-w-2xl mx-auto">
//               Trusted by thousands of legal teams worldwide
//             </p>
//           </div>

//           <div className="relative w-full flex items-center justify-center">
//             {/* Navigation Arrows */}
//             <button 
//               onClick={prevTestimonial}
//               className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-xl"
//             >
//               <ChevronLeft className="w-6 h-6" />
//             </button>
            
//             <button 
//               onClick={nextTestimonial}
//               className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-xl"
//             >
//               <ChevronRight className="w-6 h-6" />
//             </button>

//             {/* Testimonial Content */}
//             <div className="overflow-hidden w-full max-w-4xl mx-auto">
//               <div 
//                 className="flex transition-transform duration-700 ease-in-out"
//                 style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
//               >
//                 {testimonials.map((testimonial, index) => (
//                   <div key={index} className="min-w-full flex-shrink-0 px-6">
//                     <div className="flex flex-col items-center text-center">
//                       {/* Profile Section */}
//                       <div className="flex flex-col items-center mb-8">
//                         <div className="relative mb-4">
//                           <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-[#7cc6ee]/60 shadow-2xl">
//                             <img 
//                               src={testimonial.image}
//                               alt={testimonial.name}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#7cc6ee] rounded-full flex items-center justify-center shadow-xl">
//                             <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
//                               <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                             </svg>
//                           </div>
//                         </div>
//                         <div>
//                           <h4 className="text-xl md:text-2xl font-bold text-white mb-1">
//                             {testimonial.name}
//                           </h4>
//                           <p className="text-[#7cc6ee] font-semibold text-sm md:text-base">
//                             {testimonial.position}
//                           </p>
//                         </div>
//                       </div>
                      
//                       {/* Quote Section */}
//                       <div className="text-center">
//                         <div className="mb-6">
//                           <svg className="w-12 h-12 text-[#7cc6ee] mx-auto opacity-80" fill="currentColor" viewBox="0 0 24 24">
//                             <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
//                           </svg>
//                         </div>
//                         <blockquote className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-white max-w-3xl mx-auto">
//                           "{testimonial.quote}"
//                         </blockquote>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Dots Indicator */}
//             <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
//               <div className="flex space-x-3">
//                 {testimonials.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setCurrentTestimonial(index)}
//                     className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                       currentTestimonial === index 
//                         ? 'bg-[#7cc6ee] scale-125 shadow-lg' 
//                         : 'bg-white/40 hover:bg-white/60'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 3. Insights Section */}
//       <section className="py-24 bg-gradient-to-br from-[#f5f7fa] to-white relative overflow-hidden">
//         {/* Background decorative elements */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute top-20 right-10 w-64 h-64 bg-[#7cc6ee]/5 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#1e2556]/5 rounded-full blur-3xl"></div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 relative z-10">
//           <div className="text-left mb-16">
//             <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#7cc6ee]/10 to-[#1e2556]/10 backdrop-blur-sm rounded-full mb-8 border border-[#7cc6ee]/20">
//               <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-pulse"></div>
//               <Sparkles className="w-5 h-5 text-[#7cc6ee]" />
//               <span className="text-sm font-bold text-[#7cc6ee] uppercase tracking-wider">
//                 Latest Insights
//               </span>
//             </div>
//             <h2 className="text-4xl md:text-5xl font-bold text-[#1e2556] mb-6 leading-tight">
//               Legal Tech Insights
//             </h2>
//             <p className="text-xl text-[#334155] max-w-3xl leading-relaxed">
//               Stay ahead with cutting-edge insights, trends, and developments shaping the future of legal technology.
//             </p>
//           </div>

//           {blogs.length > 0 && (
//             <div className="relative">
//               {/* Navigation Arrows */}
//               <button 
//                 onClick={prevBlog}
//                 className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-[#7cc6ee] text-[#1e2556] hover:text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
//               >
//                 <ChevronLeft className="w-6 h-6" />
//               </button>
              
//               <button 
//                 onClick={nextBlog}
//                 className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-[#7cc6ee] text-[#1e2556] hover:text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 border border-gray-200"
//               >
//                 <ChevronRight className="w-6 h-6" />
//               </button>

//               {/* Blog Cards */}
//               <div className="overflow-hidden">
//                 <div 
//                   className="flex transition-transform duration-700 ease-in-out gap-6"
//                   style={{ transform: `translateX(-${currentBlog * 25}%)` }}
//                 >
//                   {blogs.map((blog, index) => (
//                     <div key={blog.id} className="min-w-[calc(25%-1.125rem)] flex-shrink-0">
//                       <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:scale-105 h-full border border-gray-100 group">
//                         {blog.bannerImage && (
//                           <div className="h-40 overflow-hidden relative">
//                             <img 
//                               src={blog.bannerImage}
//                               alt={blog.title}
//                               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                             />
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                           </div>
//                         )}
//                         <div className="p-6">
//                           <div className="flex items-center gap-2 mb-4">
//                             <div className="p-1.5 bg-[#7cc6ee]/10 rounded-full">
//                               <Calendar className="w-4 h-4 text-[#7cc6ee]" />
//                             </div>
//                             <span className="text-sm text-[#334155] font-medium">
//                               {formatDate(blog.publishedAt || blog.createdAt)}
//                             </span>
//                           </div>
                          
//                           <h3 className="text-lg font-bold text-[#1e2556] mb-3 line-clamp-2 leading-tight group-hover:text-[#7cc6ee] transition-colors duration-300">
//                             {blog.title}
//                           </h3>
                          
//                           {blog.content && (
//                             <p className="text-sm text-[#2d2d2d] mb-4 line-clamp-3 leading-relaxed opacity-80">
//                               {truncateContent(blog.content.replace(/<[^>]*>/g, ''), 100)}
//                             </p>
//                           )}
                          
//                           <div className="flex items-center justify-between">
//                             <div className="flex flex-wrap gap-2">
//                               {blog.category.slice(0, 1).map((cat, catIndex) => (
//                                 <span 
//                                   key={catIndex}
//                                   className="px-3 py-1.5 bg-gradient-to-r from-[#7cc6ee]/10 to-[#7cc6ee]/5 text-[#7cc6ee] text-xs font-semibold rounded-full border border-[#7cc6ee]/20"
//                                 >
//                                   {cat.replace(/_/g, ' ').toLowerCase().substring(0, 12)}
//                                 </span>
//                               ))}
//                             </div>
                            
//                             <a 
//                               href={`/blog/${blog.slug}`}
//                               className="flex items-center gap-2 text-[#7cc6ee] hover:text-[#1e2556] transition-all duration-300 text-sm font-bold group-hover:gap-3"
//                             >
//                               Read
//                               <div className="p-1 bg-[#7cc6ee]/10 rounded-full group-hover:bg-[#7cc6ee] transition-colors duration-300">
//                                 <ArrowRight className="w-3 h-3 group-hover:text-white" />
//                               </div>
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Progress Indicator */}
//               <div className="flex justify-center mt-12">
//                 <div className="flex space-x-2">
//                   {Array.from({ length: Math.ceil(blogs.length / 4) }).map((_, index) => (
//                     <div
//                       key={index}
//                       className={`h-2 rounded-full transition-all duration-300 ${
//                         Math.floor(currentBlog / 1) === index 
//                           ? 'w-8 bg-[#7cc6ee]' 
//                           : 'w-2 bg-gray-300 hover:bg-gray-400'
//                       }`}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {blogs.length === 0 && (
//             <div className="text-center py-20">
//               <div className="w-24 h-24 bg-[#7cc6ee]/10 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <BookOpen className="w-12 h-12 text-[#7cc6ee]" />
//               </div>
//               <h3 className="text-2xl font-bold text-[#1e2556] mb-4">No Insights Available</h3>
//               <p className="text-[#334155] text-lg">Check back soon for the latest legal tech insights and trends.</p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* 4. Why Us Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
//             <div className="md:col-span-5">
//               <h2 className="text-4xl font-bold text-[#1e2556] mb-4">Finding the Right Legal Technology</h2>
//               <p className="text-lg text-[#334155] mb-8">
//                 Finding the right legal technology can be overwhelming. DreamLegal makes it easier by providing everything you need in one place.
//               </p>
              
//               {/* Image replacing the complex UI mockup */}
//               <div className="relative">
//                 <div className="absolute inset-0 border border-gray-200/50 rounded-lg"></div>
//                 <img 
//                   src="/images/Light Blue White Minimalist We Are Hiring Project Manager Linkedin Post.png" 
//                   alt="Legal technology decision-making tools" 
//                   className="w-full rounded-lg aspect-video object-cover"
//                 />
//               </div>
//             </div>
            
//             <div className="md:col-span-7">
//               <div className="space-y-8">
//                 <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
//                   <div className="text-[#7cc6ee] flex-shrink-0">
//                     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-[#1e2556] mb-2">Find the Right Fit</h3>
//                     <p className="text-[#2d2d2d]">
//                       Get tailored recommendations based on your team's specific needs and workflows—no more guesswork.
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
//                   <div className="text-[#7cc6ee] flex-shrink-0">
//                     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M7 16L13 10L18 15M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-[#1e2556] mb-2">Compare and Evaluate with Clarity</h3>
//                     <p className="text-[#2d2d2d]">
//                       Access side-by-side product comparisons, feature breakdowns, and insights to make informed decisions.
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
//                   <div className="text-[#7cc6ee] flex-shrink-0">
//                     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-[#1e2556] mb-2">Make Confident Decisions</h3>
//                     <p className="text-[#2d2d2d]">
//                       Structured evaluations and expert insights help legal teams assess solutions with a clear understanding.
//                     </p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start gap-4">
//                   <div className="text-[#7cc6ee] flex-shrink-0 relative">
//                     <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M17 20H7C4.79086 20 3 18.2091 3 16V8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V16C21 18.2091 19.2091 20 17 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       <path d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                       <path d="M8 14C8 12.8954 9.79086 12 12 12C14.2091 12 16 12.8954 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                     <span className="absolute top-0 right-0 w-4 h-4 bg-[#7cc6ee] rounded-full text-white text-xs font-bold flex items-center justify-center">+</span>
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-semibold text-[#1e2556] mb-2">Learn from Trusted Peer Reviews</h3>
//                     <p className="text-[#2d2d2d]">
//                       Gain real-world insights from professionals who have used these tools, ensuring you make the right choice.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default LandingSections;
"use client"
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Sparkles, Calendar, ArrowRight, BookOpen } from 'lucide-react';

const LandingSections = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentBlog, setCurrentBlog] = useState(0);
  const [blogs, setBlogs] = useState([]);

  const testimonials = [
    {
      quote: "A one-stop hub for LegalTech! The legal technology directory captures every essential tool, making it effortless to discover, compare, and choose the right solutions.",
      name: "Suruchi Kanoongo",
      position: "Senior Process Executive, Infosys",
      image: "/images/review1.jpg"
    },
    {
      quote: "Dream Legal has been exceptional in bridging traditional legal practices with modern tools. Their professionalism and guidance make them invaluable for modernizing legal workflows and adopting technologies",
      name: "Ayush Chandra",
      position: "In-House Legal Expert",
      image: "/images/review2.jpg"
    },
    {
      quote: "DreamLegal is a trusted resource for dependable insights on legal tech solutions. Their evaluations are unbiased and tailored to meet the specific needs of legal teams.",
      name: "Rahul Hingmire",
      position: "Managing Partner at Vis Legis Law Practice",
      image: "/images/review3.jpg"
    },
    {
      quote: "I'm thrilled to recommend Mr. Ranjan Singhania, Co-Founder of Dream Legal. Ranjan's expertise in legal tech and innovation has been instrumental in reshaping our approach at Tuhin & Partners. DreamLegal's partnership has been invaluable in our journey to becoming a tech-powered firm. Mr. Ranjan is the ideal collaborator if you want to innovate and thrive in the legal sector.",
      name: "Osman Gani Tuhin",
      position: "CEO Tuhin & Partners",
      image: "/images/review4.jpg"
    }
  ];

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/home-insights?limit=6'); // Fetch latest 6 blogs
        const data = await response.json();
        setBlogs(data.blogs || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextBlog = () => {
    const cardsPerSlide = 3; // Show 3 cards at a time
    const maxSlide = Math.max(0, blogs.length - cardsPerSlide);
    setCurrentBlog((prev) => (prev >= maxSlide ? 0 : prev + 1));
  };

  const prevBlog = () => {
    const cardsPerSlide = 3; // Show 3 cards at a time
    const maxSlide = Math.max(0, blogs.length - cardsPerSlide);
    setCurrentBlog((prev) => (prev <= 0 ? maxSlide : prev - 1));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="w-full">
      {/* 1. Review Section */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#1e2556] mb-6">Unlock Smarter Legal Tech Choices. Sign Up Today.</h2>
            <p className="text-xl text-[#334155] mb-10">Join thousands of legal professionals in discovering, comparing, and choosing the best legal technology for your needs.</p>
            <a href="/auth/user/signup" className="inline-block px-10 py-3 bg-[#1e2556] text-white border-2 border-[#1e2556] rounded-full font-semibold hover:bg-[#1e2556]/90 transition-colors">Sign Up</a>
          </div>
        </div>
      </section>
      
      {/* 2. Testimonial Slider Section */}
      <section className="py-12 md:py-20 bg-[#1e2556] text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 md:top-20 left-10 md:left-20 w-20 md:w-40 h-20 md:h-40 bg-[#7cc6ee]/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-32 md:w-56 h-32 md:h-56 bg-[#7cc6ee]/5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/3 right-1/4 w-16 md:w-32 h-16 md:h-32 bg-white/5 rounded-full blur-lg"></div>
          <div className="absolute bottom-1/3 left-1/4 w-12 md:w-24 h-12 md:h-24 bg-[#7cc6ee]/8 rounded-full blur-xl"></div>
        </div>

        <div className="relative z-10 w-full">
          <div className="text-center mb-8 md:mb-12 px-4">
            <div className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-white/10 backdrop-blur-sm rounded-full mb-4 md:mb-6">
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-[#7cc6ee]" />
              <span className="text-xs md:text-sm font-semibold text-[#7cc6ee] uppercase tracking-wider">
                Testimonials
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 leading-tight">
              What Legal Professionals Say
            </h2>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Trusted by thousands of legal teams worldwide
            </p>
          </div>

          <div className="relative w-full flex items-center justify-center">
            {/* Navigation Arrows - Hidden on mobile, shown on desktop */}
            <button 
              onClick={prevTestimonial}
              className="hidden md:block absolute left-2 lg:left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-xl"
            >
              <ChevronLeft className="w-5 lg:w-6 h-5 lg:h-6" />
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="hidden md:block absolute right-2 lg:right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white p-3 lg:p-4 rounded-full transition-all duration-300 hover:scale-110 shadow-xl"
            >
              <ChevronRight className="w-5 lg:w-6 h-5 lg:h-6" />
            </button>

            {/* Testimonial Content */}
            <div className="w-full mx-auto overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="flex flex-col items-center text-center px-6 md:px-12 lg:px-16 max-w-4xl mx-auto">
                      {/* Profile Section */}
                      <div className="flex flex-col items-center mb-6 md:mb-8">
                        <div className="relative mb-3 md:mb-4">
                          <div className="w-16 md:w-24 lg:w-28 h-16 md:h-24 lg:h-28 rounded-full overflow-hidden border-2 md:border-4 border-[#7cc6ee]/60 shadow-2xl">
                            <img 
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -bottom-0.5 md:-bottom-1 -right-0.5 md:-right-1 w-5 md:w-8 h-5 md:h-8 bg-[#7cc6ee] rounded-full flex items-center justify-center shadow-xl">
                            <svg className="w-2.5 md:w-4 h-2.5 md:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                          </div>
                        </div>
                        <div className="text-center">
                          <h4 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 leading-tight">
                            {testimonial.name}
                          </h4>
                          <p className="text-[#7cc6ee] font-semibold text-xs md:text-sm lg:text-base leading-tight">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                      
                      {/* Quote Section */}
                      <div className="text-center w-full">
                        <div className="mb-4 md:mb-6">
                          <svg className="w-8 md:w-12 h-8 md:h-12 text-[#7cc6ee] mx-auto opacity-80" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                          </svg>
                        </div>
                        <blockquote className="text-sm md:text-lg lg:text-xl xl:text-2xl font-medium leading-relaxed text-white">
                          "{testimonial.quote}"
                        </blockquote>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center justify-center gap-4 mt-6">
            <button 
              onClick={prevTestimonial}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-xl"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <span className="text-sm text-white/70 font-medium px-4">
              {currentTestimonial + 1} / {testimonials.length}
            </span>
            
            <button 
              onClick={nextTestimonial}
              className="bg-white/15 hover:bg-white/25 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 md:mt-12">
            <div className="flex space-x-2 md:space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index 
                      ? 'bg-[#7cc6ee] scale-125 shadow-lg' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* 3. Insights Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#f5f7fa] to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 bg-[#7cc6ee]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#1e2556]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-left mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[#7cc6ee]/10 to-[#1e2556]/10 backdrop-blur-sm rounded-full mb-6 md:mb-8 border border-[#7cc6ee]/20">
              <div className="w-2 h-2 bg-[#7cc6ee] rounded-full animate-pulse"></div>
              <Sparkles className="w-4 md:w-5 h-4 md:h-5 text-[#7cc6ee]" />
              <span className="text-xs md:text-sm font-bold text-[#7cc6ee] uppercase tracking-wider">
                Latest Insights
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e2556] mb-4 md:mb-6 leading-tight">
              Legal Tech Insights
            </h2>
            <p className="text-lg md:text-xl text-[#334155] max-w-3xl leading-relaxed">
              Stay ahead with cutting-edge insights, trends, and developments shaping the future of legal technology.
            </p>
          </div>

          {blogs.length > 0 && (
            <>
              {/* Blog Cards */}
              <div className="w-full">
                <div 
                  className="flex transition-transform duration-700 ease-in-out gap-4 md:gap-8 px-4 md:px-8"
                  style={{ transform: `translateX(-${currentBlog * (window.innerWidth < 768 ? 100 : 33.333)}%)` }}
                >
                  {blogs.map((blog, index) => (
                    <div key={blog.id} className="w-full md:w-80 flex-shrink-0">
                      <a 
                        href={`/blog/${blog.slug}`}
                        className="block bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 h-full border border-gray-100 group hover:-translate-y-2 cursor-pointer"
                      >
                        {blog.bannerImage && (
                          <div className="h-32 md:h-40 overflow-hidden relative">
                            <img 
                              src={blog.bannerImage}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                        )}
                        <div className="p-4 md:p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="p-1 bg-[#7cc6ee]/10 rounded-full">
                              <Calendar className="w-3 h-3 text-[#7cc6ee]" />
                            </div>
                            <span className="text-xs text-[#334155] font-medium">
                              {formatDate(blog.publishedAt || blog.createdAt)}
                            </span>
                          </div>
                          
                          <h3 className="text-base md:text-lg font-bold text-[#1e2556] mb-3 line-clamp-2 leading-tight group-hover:text-[#7cc6ee] transition-colors duration-300">
                            {blog.title}
                          </h3>
                          
                          {blog.content && (
                            <p className="text-sm text-[#2d2d2d] mb-4 line-clamp-2 leading-relaxed opacity-80">
                              {truncateContent(blog.content.replace(/<[^>]*>/g, ''), 80)}
                            </p>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-1">
                              {blog.category.slice(0, 1).map((cat, catIndex) => (
                                <span 
                                  key={catIndex}
                                  className="px-2 py-1 bg-gradient-to-r from-[#7cc6ee]/10 to-[#7cc6ee]/5 text-[#7cc6ee] text-xs font-semibold rounded-full border border-[#7cc6ee]/20"
                                >
                                  {cat.replace(/_/g, ' ').toLowerCase().substring(0, 10)}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center gap-1 text-[#7cc6ee] transition-all duration-300 text-xs font-bold group-hover:gap-2">
                              Read
                              <div className="p-0.5 bg-[#7cc6ee]/10 rounded-full group-hover:bg-[#7cc6ee] transition-colors duration-300">
                                <ArrowRight className="w-3 h-3 group-hover:text-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Controls & Progress Indicator */}
              <div className="flex flex-col items-center mt-8 md:mt-12 space-y-6">
                {/* Navigation Arrows */}
                <div className="flex items-center justify-center gap-4">
                  <button 
                    onClick={prevBlog}
                    className="bg-white hover:bg-[#7cc6ee] text-[#1e2556] hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <span className="text-sm text-[#334155] font-medium px-4">
                    <span className="md:hidden">{currentBlog + 1} / {blogs.length}</span>
                    <span className="hidden md:inline">{Math.floor(currentBlog / 3) + 1} / {Math.ceil(blogs.length / 3)}</span>
                  </span>
                  
                  <button 
                    onClick={nextBlog}
                    className="bg-white hover:bg-[#7cc6ee] text-[#1e2556] hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 border border-gray-200"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Progress Indicator */}
                <div className="flex space-x-2">
                  {/* Mobile: Show dot for each blog */}
                  <div className="flex space-x-2 md:hidden">
                    {blogs.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          currentBlog === index 
                            ? 'w-8 bg-[#7cc6ee]' 
                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        onClick={() => setCurrentBlog(index)}
                      />
                    ))}
                  </div>
                  
                  {/* Desktop: Show dot for each page (3 blogs) */}
                  <div className="hidden md:flex space-x-2">
                    {Array.from({ length: Math.ceil(blogs.length / 3) }).map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          Math.floor(currentBlog / 3) === index 
                            ? 'w-8 bg-[#7cc6ee]' 
                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                        onClick={() => setCurrentBlog(index * 3)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {blogs.length === 0 && (
            <div className="text-center py-16 md:py-20">
              <div className="w-20 md:w-24 h-20 md:h-24 bg-[#7cc6ee]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 md:w-12 h-10 md:h-12 text-[#7cc6ee]" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-[#1e2556] mb-4">No Insights Available</h3>
              <p className="text-[#334155] text-base md:text-lg">Check back soon for the latest legal tech insights and trends.</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. Why Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <h2 className="text-4xl font-bold text-[#1e2556] mb-4">Finding the Right Legal Technology</h2>
              <p className="text-lg text-[#334155] mb-8">
                Finding the right legal technology can be overwhelming. DreamLegal makes it easier by providing everything you need in one place.
              </p>
              
              {/* Image replacing the complex UI mockup */}
              <div className="relative">
                <div className="absolute inset-0 border border-gray-200/50 rounded-lg"></div>
                <img 
                  src="/images/Light Blue White Minimalist We Are Hiring Project Manager Linkedin Post.png" 
                  alt="Legal technology decision-making tools" 
                  className="w-full rounded-lg aspect-video object-cover"
                />
              </div>
            </div>
            
            <div className="md:col-span-7">
              <div className="space-y-8">
                <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                  <div className="text-[#7cc6ee] flex-shrink-0">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1e2556] mb-2">Find the Right Fit</h3>
                    <p className="text-[#2d2d2d]">
                      Get tailored recommendations based on your team's specific needs and workflows—no more guesswork.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                  <div className="text-[#7cc6ee] flex-shrink-0">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 16L13 10L18 15M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1e2556] mb-2">Compare and Evaluate with Clarity</h3>
                    <p className="text-[#2d2d2d]">
                      Access side-by-side product comparisons, feature breakdowns, and insights to make informed decisions.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
                  <div className="text-[#7cc6ee] flex-shrink-0">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1e2556] mb-2">Make Confident Decisions</h3>
                    <p className="text-[#2d2d2d]">
                      Structured evaluations and expert insights help legal teams assess solutions with a clear understanding.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-[#7cc6ee] flex-shrink-0 relative">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 20H7C4.79086 20 3 18.2091 3 16V8C3 5.79086 4.79086 4 7 4H17C19.2091 4 21 5.79086 21 8V16C21 18.2091 19.2091 20 17 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 14C8 12.8954 9.79086 12 12 12C14.2091 12 16 12.8954 16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="absolute top-0 right-0 w-4 h-4 bg-[#7cc6ee] rounded-full text-white text-xs font-bold flex items-center justify-center">+</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1e2556] mb-2">Learn from Trusted Peer Reviews</h3>
                    <p className="text-[#2d2d2d]">
                      Gain real-world insights from professionals who have used these tools, ensuring you make the right choice.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingSections;