import HomeHero from '@/components/HomeHero';
import React from 'react'
import TrustedClients from './homePageComponents/TrustedClients';
import Features from './homePageComponents/Features';
import PremiumTestimonials from './homePageComponents/Testimonial';
const MainHomePage = () => {
  return (
  <>
   <HomeHero />
    <TrustedClients />
    <Features />
    <PremiumTestimonials />
  </>
   
  )
}


// "use client"
// import React, { useState, useEffect, useRef } from 'react';
// import { ArrowUpRight, Plus, Minus, Circle, ArrowDown, Code2, Rocket, Terminal, ExternalLink, Github, Linkedin, Sparkles, Menu, X } from 'lucide-react';
// import { motion } from 'framer-motion';

// const MinimalPortfolio = () => {
//   const [activeSection, setActiveSection] = useState('home');
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [hoveredProject, setHoveredProject] = useState(null);
//   const [cursorVariant, setCursorVariant] = useState('default');
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const cursorRef = useRef(null);

//   useEffect(() => {
//     // Simulate loading
//     setTimeout(() => setLoading(false), 2000);

//     const handleScroll = () => {
//       const scrollY = window.scrollY;
//       const winHeight = document.documentElement.scrollHeight - window.innerHeight;
//       const progress = (scrollY / winHeight) * 100;
//       setScrollProgress(progress);

//       // Update active section based on scroll position
//       const sections = ['home', 'projects', 'services', 'about', 'contact'];
//       sections.forEach(section => {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
//             setActiveSection(section);
//           }
//         }
//       });
//     };

//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//       if (cursorRef.current) {
//         const scale = cursorVariant === 'hover' ? 1.5 : 1;
//         cursorRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px) scale(${scale})`;
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     window.addEventListener('mousemove', handleMouseMove);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, [cursorVariant]);

//   // Loading Screen
//   if (loading) {
//     return (
//       <div className="fixed inset-0 bg-white flex items-center justify-center">
//         <div className="text-4xl font-bold space-x-2">
//           {[..."LOADING"].map((letter, i) => (
//             <span
//               key={i}
//               className="inline-block animate-bounce"
//               style={{ animationDelay: `${i * 0.1}s` }}
//             >
//               {letter}
//             </span>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   const projects = [
//     { 
//       id: 1, 
//       title: 'Neural Framework', 
//       type: 'Development', 
//       year: '2024',
//       color: '#FFE4E1',
//       tags: ['React', 'Node.js', 'AI']
//     },
//     { 
//       id: 2, 
//       title: 'Quantum Interface', 
//       type: 'Design', 
//       year: '2023',
//       color: '#E6E6FA',
//       tags: ['UI/UX', 'Figma', 'Motion']
//     },
//     { 
//       id: 3, 
//       title: 'Cyber Platform', 
//       type: 'Architecture', 
//       year: '2023',
//       color: '#F0FFF0',
//       tags: ['AWS', 'Security', 'Cloud']
//     },
//   ];

//   const services = [
//     { 
//       icon: Code2, 
//       title: 'Development', 
//       desc: 'Creating digital solutions',
//       details: ['Frontend', 'Backend', 'Mobile']
//     },
//     { 
//       icon: Terminal, 
//       title: 'Architecture', 
//       desc: 'Building robust systems',
//       details: ['Cloud', 'DevOps', 'Security']
//     },
//     { 
//       icon: Rocket, 
//       title: 'Innovation', 
//       desc: 'Pushing boundaries',
//       details: ['AI/ML', 'Blockchain', 'IoT']
//     },
//   ];

//   return (
//     <div className="bg-white text-black font-mono">
//       {/* Custom Cursor */}
//       <div 
//         ref={cursorRef}
//         className={`fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300 ${
//           cursorVariant === 'hover' ? 'bg-white scale-150' : 'border-2 border-black scale-100'
//         }`}
//       >
//         <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
//       </div>

//       {/* Progress Bar */}
//       <div className="fixed top-0 left-0 w-full h-1 bg-black/10 z-50">
//         <div 
//           className="h-full bg-black origin-left transition-transform duration-300"
//           style={{ transform: `scaleX(${scrollProgress / 100})` }}
//         />
//       </div>

//       {/* Mobile Menu */}
//       <div className={`fixed inset-0 bg-black z-50 transition-transform duration-500 ${
//         isMenuOpen ? 'translate-x-0' : 'translate-x-full'
//       }`}>
//         <button 
//           onClick={() => setIsMenuOpen(false)}
//           className="absolute top-6 right-6 text-white"
//         >
//           <X className="w-8 h-8" />
//         </button>
//         <div className="h-full flex flex-col items-center justify-center space-y-8">
//           {['WORK', 'ABOUT', 'CONTACT'].map((item) => (
//             <button 
//               key={item}
//               className="text-2xl text-white tracking-widest hover:opacity-50 transition-all"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {item}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-40 border-b border-black/10">
//         <div className="container mx-auto px-6">
//           <div className="flex justify-between items-center h-20">
//             <div className="text-sm tracking-widest relative overflow-hidden group cursor-pointer">
//               <span className="block transition-transform group-hover:-translate-y-full duration-300">PORTFOLIO/2024</span>
//               <span className="block absolute top-full transition-transform group-hover:-translate-y-full duration-300">EXPLORE→</span>
//             </div>
//             <div className="hidden md:flex items-center space-x-8">
//               {['WORK', 'ABOUT', 'CONTACT'].map((item) => (
//                 <button 
//                   key={item}
//                   className="text-sm tracking-widest hover:opacity-50 transition-all relative group"
//                   onMouseEnter={() => setCursorVariant('hover')}
//                   onMouseLeave={() => setCursorVariant('default')}
//                 >
//                   {item}
//                   <div className="absolute left-0 right-0 h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
//                 </button>
//               ))}
//             </div>
//             <button 
//               className="md:hidden"
//               onClick={() => setIsMenuOpen(true)}
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section id="home" className="min-h-screen pt-32 relative">
//         <div 
//           className="absolute inset-0 grid grid-cols-[1fr,1px,1fr] opacity-5 pointer-events-none"
//           style={{
//             transform: `translateY(${scrollProgress * 0.5}px) rotate(${scrollProgress * 0.1}deg)`,
//             transition: 'transform 0.3s ease-out',
//           }}
//         >
//           <div /><div className="bg-black" /><div />
//         </div>

//         <div className="container mx-auto px-6">
//           <div className="max-w-5xl mx-auto">
//             <h1 className="text-[12vw] font-bold leading-none mb-8 relative">
//               <div className="relative overflow-hidden">
//                 <span className="block transform hover:translate-x-8 transition-transform duration-500">
//                   Digital
//                   <Sparkles className="absolute top-0 right-0 w-12 h-12 text-yellow-400 animate-pulse" />
//                 </span>
//               </div>
//               <div className="relative overflow-hidden">
//                 <span className="block transform hover:-translate-x-8 transition-transform duration-500">
//                   Craftsman
//                 </span>
//               </div>
//               <div className="absolute -right-8 top-0 text-base font-normal tracking-widest opacity-50 rotate-90 origin-left">
//                 SCROLL FOR MORE
//               </div>
//             </h1>
            
//             <div className="flex justify-between items-end">
//               <p className="text-xl max-w-md relative overflow-hidden group">
//                 <span className="block transition-transform group-hover:-translate-y-full duration-500">
//                   Crafting digital experiences through code and design
//                 </span>
//                 <span className="block absolute top-full transition-transform group-hover:-translate-y-full duration-500">
//                   Let's build something extraordinary together →
//                 </span>
//               </p>
//               <ArrowDown className="w-12 h-12 animate-bounce opacity-50" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Projects Grid */}
//       <section id="projects" className="py-32 relative">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-12 gap-8">
//             {projects.map((project, index) => (
//               <div 
//                 key={project.id}
//                 className={`col-span-12 md:col-span-4 group relative ${
//                   index % 2 === 0 ? 'md:translate-y-16' : ''
//                 }`}
//                 onMouseEnter={() => {
//                   setHoveredProject(project.id);
//                   setCursorVariant('hover');
//                 }}
//                 onMouseLeave={() => {
//                   setHoveredProject(null);
//                   setCursorVariant('default');
//                 }}
//               >
//                 <div className="relative overflow-hidden">
//                   <div 
//                     className="aspect-[3/4] mb-4 relative group-hover:scale-95 transition-all duration-500"
//                     style={{ 
//                       backgroundColor: project.color,
//                       transform: `perspective(1000px) rotateY(${
//                         mousePosition.x > window.innerWidth / 2 ? 5 : -5
//                       }deg) rotateX(${
//                         mousePosition.y > window.innerHeight / 2 ? -5 : 5
//                       }deg)`,
//                     }}
//                   >
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <Plus className={`w-12 h-12 transition-all duration-500 ${
//                         hoveredProject === project.id ? 'rotate-45 scale-150' : ''
//                       }`} />
//                     </div>
//                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    
//                     {/* Project Tags */}
//                     <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
//                       {project.tags.map((tag, i) => (
//                         <span 
//                           key={i}
//                           className="px-2 py-1 text-xs bg-white/80 backdrop-blur-sm rounded-full
//                           opacity-0 group-hover:opacity-100 transition-all duration-500"
//                           style={{ transitionDelay: `${i * 100}ms` }}
//                         >
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-500">
//                         {project.title}
//                       </h3>
//                       <p className="text-sm text-gray-600 group-hover:translate-x-1 transition-transform duration-500 delay-75">
//                         {project.type}
//                       </p>
//                     </div>
//                     <span className="text-sm opacity-50 group-hover:opacity-100 transition-opacity">
//                       {project.year}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section id="services" className="py-32 bg-black text-white relative overflow-hidden">
//   <div 
//     className="absolute inset-0 grid grid-cols-[1fr,1px,1fr,1px,1fr] opacity-10"
//     style={{
//       transform: `translateY(${(scrollProgress - 50) * 0.5}px) rotate(${scrollProgress * 0.05}deg)`,
//     }}
//   >
//     {[...Array(4)].map((_, i) => (
//       <div key={i} className="border-r border-white" />
//     ))}
//   </div>

//   <div className="container mx-auto px-6">
//     <div className="grid grid-cols-12 gap-8">
//       {services.map((service, index) => (
//         <div 
//           key={index} 
//           className="col-span-12 md:col-span-4 group"
//           onMouseEnter={() => setCursorVariant('hover')}
//           onMouseLeave={() => setCursorVariant('default')}
//         >
//           <div className="relative p-8 border border-white/20 hover:border-white transition-all duration-500">
//             <service.icon className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform duration-500" />
//             <h3 className="text-2xl mb-4 group-hover:translate-x-2 transition-transform duration-500">
//               {service.title}
//             </h3>
//             <p className="text-gray-400 group-hover:translate-x-1 transition-transform duration-500 delay-75">
//               {service.desc}
//             </p>
            
//             <div className="mt-6 space-y-2">
//               {service.details.map((detail, i) => (
//                 <div 
//                   key={i}
//                   className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//                   style={{ transitionDelay: `${i * 100}ms` }}
//                 >
//                   <Circle className="w-3 h-3" />
//                   <span className="text-sm">{detail}</span>
//                 </div>
//               ))}
//             </div>
            
//             <div className="absolute top-0 left-0 w-0 h-full bg-white/5 group-hover:w-full transition-all duration-700" />
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// </section>

//       {/* About Section */}
//       <section id="about" className="py-32 relative">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-12 gap-16">
//             <div className="col-span-12 md:col-span-6">
//               <h2 className="text-4xl font-bold mb-8 relative overflow-hidden">
//                 <span className="block hover:translate-x-4 transition-transform duration-500">
//                   About the
//                 </span>
//                 <span className="block hover:-translate-x-4 transition-transform duration-500">
//                   Process
//                 </span>
//               </h2>
//               <p className="text-lg text-gray-600 mb-8 relative group">
//                 <span className="block transition-transform group-hover:-translate-y-full duration-500">
//                   Creating digital experiences through a combination of technical expertise and creative innovation.
//                 </span>
//                 <span className="block absolute top-full transition-transform group-hover:-translate-y-full duration-500">
//                   Every project is an opportunity to push the boundaries of what's possible.
//                 </span>
//               </p>
              
//               {/* Process Steps */}
//               <div className="space-y-6 mb-8">
//                 {['Research', 'Design', 'Develop', 'Deploy'].map((step, i) => (
//                   <div 
//                     key={i}
//                     className="flex items-center space-x-4 group/step"
//                     onMouseEnter={() => setCursorVariant('hover')}
//                     onMouseLeave={() => setCursorVariant('default')}
//                   >
//                     <span className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center group-hover/step:bg-black group-hover/step:text-white transition-all duration-300">
//                       {i + 1}
//                     </span>
//                     <span className="text-lg group-hover/step:translate-x-2 transition-transform duration-300">
//                       {step}
//                     </span>
//                   </div>
//                 ))}
//               </div>
              
//               <button 
//                 className="group flex items-center space-x-4"
//                 onMouseEnter={() => setCursorVariant('hover')}
//                 onMouseLeave={() => setCursorVariant('default')}
//               >
//                 <span className="relative overflow-hidden">
//                   <span className="block transition-transform group-hover:-translate-y-full duration-300">View Process</span>
//                   <span className="block absolute top-full transition-transform group-hover:-translate-y-full duration-300">Explore →</span>
//                 </span>
//                 <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
//               </button>
//             </div>
//             <div className="col-span-12 md:col-span-6">
//               <div className="grid grid-cols-2 gap-4 relative">
//                 {[...Array(4)].map((_, i) => (
//                   <div 
//                     key={i}
//                     className="aspect-square bg-gray-100 relative overflow-hidden group cursor-pointer"
//                     style={{
//                       transform: `translateY(${Math.sin((scrollProgress + i * 30) * 0.02) * 20}px) rotate(${scrollProgress * 0.02}deg)`,
//                     }}
//                     onMouseEnter={() => setCursorVariant('hover')}
//                     onMouseLeave={() => setCursorVariant('default')}
//                   >
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <Circle className="w-8 h-8 group-hover:scale-150 transition-transform duration-500" />
//                     </div>
//                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    
//                     {/* Hover Effect */}
//                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/80 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                       <span className="text-white text-sm tracking-wider transform -rotate-12">
//                         {['Think', 'Create', 'Build', 'Launch'][i]}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-32 bg-black text-white relative overflow-hidden">
//         <div 
//           className="absolute inset-0 bg-grid opacity-10"
//           style={{
//             backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px)',
//             backgroundSize: '40px 40px',
//             transform: `translateY(${(scrollProgress - 80) * 0.5}px) rotate(${scrollProgress * 0.02}deg)`,
//           }}
//         />

//         <div className="container mx-auto px-6 relative">
//           <div className="max-w-4xl mx-auto text-center">
//             <h2 className="text-4xl font-bold mb-8">
//               <span className="block relative overflow-hidden">
//                 <span className="block hover:translate-y-8 transition-transform duration-500">Let's create something</span>
//               </span>
//               <span className="block relative overflow-hidden">
//                 <span className="block hover:-translate-y-8 transition-transform duration-500">extraordinary</span>
//               </span>
//             </h2>
            
//             {/* Contact Form */}
//             <div className="max-w-md mx-auto mb-16">
//               <div className="space-y-4">
//                 {['Name', 'Email', 'Message'].map((field, i) => (
//                   <div 
//                     key={i}
//                     className="group relative"
//                     onMouseEnter={() => setCursorVariant('hover')}
//                     onMouseLeave={() => setCursorVariant('default')}
//                   >
//                     <input
//                       type={field === 'Email' ? 'email' : 'text'}
//                       placeholder={field}
//                       className="w-full bg-transparent border-b border-white/20 py-2 px-4 outline-none focus:border-white transition-colors duration-300 placeholder-white/50"
//                     />
//                     <div className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-500" />
//                   </div>
//                 ))}
//               </div>
//             </div>
            
//             <div className="inline-block group">
//               <button 
//                 className="text-2xl flex items-center space-x-4 relative overflow-hidden"
//                 onMouseEnter={() => setCursorVariant('hover')}
//                 onMouseLeave={() => setCursorVariant('default')}
//               >
//                 <span className="relative overflow-hidden inline-block">
//                   <span className="block transition-transform group-hover:-translate-y-full duration-300">
//                     Initialize Contact
//                   </span>
//                   <span className="block absolute top-full transition-transform group-hover:-translate-y-full duration-300">
//                     Get in Touch →
//                   </span>
//                 </span>
//                 <ArrowUpRight className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
//               </button>
//             </div>
            
//             {/* Social Links */}
//             <div className="mt-16 flex justify-center space-x-8">
//               {[
//                 { icon: Github, label: 'GitHub', link: '#' },
//                 { icon: Linkedin, label: 'LinkedIn', link: '#' },
//                 { icon: ExternalLink, label: 'Website', link: '#' }
//               ].map((social, index) => (
//                 <a
//                   key={index}
//                   href={social.link}
//                   className="group relative"
//                   onMouseEnter={() => setCursorVariant('hover')}
//                   onMouseLeave={() => setCursorVariant('default')}
//                 >
//                   <social.icon className="w-6 h-6 text-white/50 group-hover:text-white transition-colors duration-300" />
//                   <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     {social.label}
//                   </span>
//                   <div className="absolute -inset-4 border border-white/0 group-hover:border-white/20 rounded-full transition-all duration-300" />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-8 bg-black text-white/50 border-t border-white/10">
//         <div className="container mx-auto px-6">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <div className="text-sm group">
//               <span className="block transition-transform group-hover:-translate-y-full duration-300">
//                 © 2024 Digital Craftsman.
//               </span>
//               <span className="block">
//                 All rights reserved.
//               </span>
//             </div>
//             <div className="flex space-x-8 text-sm">
//               {['Privacy', 'Terms', 'Sitemap'].map((item, index) => (
//                 <button
//                   key={index}
//                   className="hover:text-white transition-colors duration-300 relative group"
//                   onMouseEnter={() => setCursorVariant('hover')}
//                   onMouseLeave={() => setCursorVariant('default')}
//                 >
//                   {item}
//                   <div className="absolute left-0 right-0 bottom-0 h-px bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* Floating Action Button */}
//       <button 
//         className="fixed bottom-8 right-8 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center group z-40 hover:scale-110 transition-transform duration-300"
//         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         onMouseEnter={() => setCursorVariant('hover')}
//         onMouseLeave={() => setCursorVariant('default')}
//       >
//         <ArrowUpRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
//         <div className="absolute -inset-2 border-2 border-black rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
//       </button>
//     </div>
//   );
// };

// export default MinimalPortfolio;