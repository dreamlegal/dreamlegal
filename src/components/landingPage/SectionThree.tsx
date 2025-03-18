// // import React, { useState, useRef, useEffect } from 'react';
// // import { 
// //   Smartphone, 
// //   Code, 
// //   Zap, 
// //   Lightbulb, 
// //   Server, 
// //   Workflow, 
// //   Cloud, 
// //   ChevronRight 
// // } from 'lucide-react';

// // const DigitalServicesSection = () => {
// //   const [sectionRef, isInView] = useIntersectionObserver();
// //   const [hoveredCard, setHoveredCard] = useState(null);

// //   const services = [
// //     {
// //       icon: Smartphone,
// //       title: "Mobile App Development",
// //       description: "We build intuitive, responsive mobile apps tailored to meet your specific business needs and enhance user engagement.",
// //       delay: 0
// //     },
// //     {
// //       icon: Code,
// //       title: "Software Development",
// //       description: "From custom development to system upgrades, we craft software that enhances operational efficiency and drives innovation.",
// //       delay: 100
// //     },
// //     {
// //       icon: Zap,
// //       title: "Digital Transformation",
// //       description: "We help businesses stay competitive by transforming legacy systems with modern, digital-first solutions that drive growth.",
// //       delay: 200
// //     },
// //     {
// //       icon: Lightbulb,
// //       title: "Ideation And Design Strategy",
// //       description: "Our strategic ideation and design processes ensure that your digital products are not only functional but also well-resonated with users.",
// //       delay: 300
// //     },
// //     {
// //       icon: Server,
// //       title: "IT Consulting",
// //       description: "We provide expert IT consulting services to help your organization navigate complex technology decisions and align IT strategies with business objectives.",
// //       delay: 400
// //     },
// //     {
// //       icon: Workflow,
// //       title: "DevOps",
// //       description: "Our DevOps services streamline development and operations to accelerate your project timelines and improve the overall product quality.",
// //       delay: 500
// //     },
// //     {
// //       icon: Cloud,
// //       title: "Cloud Managed Services",
// //       description: "We manage your cloud infrastructure end-to-end, ensuring it is optimized, secure, and cost-effective; allowing you to focus on strategic business activities.",
// //       delay: 600
// //     },
// //     {
// //       title: "Our Services",
// //       isCtaCard: true,
// //       delay: 700
// //     }
// //   ];

// //   return (
// //     <div ref={sectionRef} className="relative w-full py-16 md:py-24 bg-black overflow-hidden">
// //       {/* Background patterns */}
// //       <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]" />
      
// //       {/* Content container */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
// //         {/* Header section */}
// //         <div className={`mb-12 md:mb-16 transition-all duration-1000 transform
// //                        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
// //           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 max-w-4xl">
// //             Navigate The Digital Frontier With
// //             <br />
// //             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500">
// //               Our Engineering Excellence
// //             </span>
// //           </h2>
// //         </div>
        
// //         {/* Services grid */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //           {services.map((service, index) => {
// //             const Icon = service.icon;
// //             return (
// //               <div
// //                 key={index}
// //                 className={`relative group transition-all duration-700 transform
// //                           ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
// //                 style={{ transitionDelay: `${service.delay}ms` }}
// //                 onMouseEnter={() => setHoveredCard(index)}
// //                 onMouseLeave={() => setHoveredCard(null)}
// //               >
// //                 {service.isCtaCard ? (
// //                   // CTA Card with blue background
// //                   <div className="h-full relative rounded-2xl overflow-hidden bg-blue-600 shadow-lg shadow-blue-500/20
// //                                transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-blue-500/30">
// //                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700" />
// //                     <div className="h-full flex flex-col items-center justify-center p-8 relative">
// //                       <div className="flex flex-col items-center justify-center h-full w-full">
// //                         <span className="text-xl font-bold text-white mb-4">{service.title}</span>
// //                         <button className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-white rounded-full text-blue-600 font-medium
// //                                        hover:bg-blue-50 transition-colors duration-300 group">
// //                           <span>Explore More</span>
// //                           <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ) : (
// //                   // Regular service card
// //                   <div className="h-full relative rounded-2xl overflow-hidden bg-gray-900 backdrop-blur-sm 
// //                                border border-gray-800 shadow-lg 
// //                                transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:border-gray-700">
// //                     <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-gray-900 to-gray-900" />
                    
// //                     <div className="h-full flex flex-col p-6 relative">
// //                       {/* Icon */}
// //                       <div className="mb-4 relative">
// //                         {Icon && (
// //                           <div className="p-3 bg-gray-800 rounded-xl inline-flex items-center justify-center
// //                                       group-hover:bg-blue-900/30 transition-colors duration-300">
// //                             <Icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
// //                           </div>
// //                         )}
// //                       </div>
                      
// //                       {/* Content */}
// //                       <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
// //                         {service.title}
// //                       </h3>
// //                       <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
// //                         {service.description}
// //                       </p>
                      
// //                       {/* Accent line at bottom */}
// //                       <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 
// //                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
      
// //       {/* Decorative elements */}
// //       <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
// //       <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
// //     </div>
// //   );
// // };

// // // Custom hook for intersection observer
// // const useIntersectionObserver = (options = {}) => {
// //   const [isIntersecting, setIsIntersecting] = useState(false);
// //   const targetRef = useRef(null);

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(([entry]) => {
// //       setIsIntersecting(entry.isIntersecting);
// //     }, { threshold: 0.2, ...options });

// //     const currentTarget = targetRef.current;
// //     if (currentTarget) {
// //       observer.observe(currentTarget);
// //     }

// //     return () => {
// //       if (currentTarget) {
// //         observer.unobserve(currentTarget);
// //       }
// //     };
// //   }, [options]);

// //   return [targetRef, isIntersecting];
// // };

// // export default DigitalServicesSection;
// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   Smartphone, 
//   Code, 
//   Zap, 
//   Lightbulb, 
//   Server, 
//   Workflow, 
//   Cloud, 
//   ChevronRight 
// } from 'lucide-react';

// const DigitalServicesSection = () => {
//   const [sectionRef, isInView] = useIntersectionObserver();
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const services = [
//     {
//       icon: Smartphone,
//       title: "Mobile App Development",
//       description: "We build intuitive, responsive mobile apps tailored to meet your specific business needs and enhance user engagement.",
//       delay: 0
//     },
//     {
//       icon: Code,
//       title: "Software Development",
//       description: "From custom development to system upgrades, we craft software that enhances operational efficiency and drives innovation.",
//       delay: 100
//     },
//     {
//       icon: Zap,
//       title: "Digital Transformation",
//       description: "We help businesses stay competitive by transforming legacy systems with modern, digital-first solutions that drive growth.",
//       delay: 200
//     },
//     {
//       icon: Lightbulb,
//       title: "Ideation And Design Strategy",
//       description: "Our strategic ideation and design processes ensure that your digital products are not only functional but also well-resonated with users.",
//       delay: 300
//     },
//     {
//       icon: Server,
//       title: "IT Consulting",
//       description: "We provide expert IT consulting services to help your organization navigate complex technology decisions and align IT strategies with business objectives.",
//       delay: 400
//     },
//     {
//       icon: Workflow,
//       title: "DevOps",
//       description: "Our DevOps services streamline development and operations to accelerate your project timelines and improve the overall product quality.",
//       delay: 500
//     },
//     {
//       icon: Cloud,
//       title: "Cloud Managed Services",
//       description: "We manage your cloud infrastructure end-to-end, ensuring it is optimized, secure, and cost-effective; allowing you to focus on strategic business activities.",
//       delay: 600
//     },
//     {
//       title: "Our Services",
//       isCtaCard: true,
//       delay: 700
//     }
//   ];

//   return (
//     <div ref={sectionRef} className="relative w-full py-16 md:py-24 bg-gradient-to-b from-blue-900 to-blue-950 overflow-hidden">
//       {/* Background patterns */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#60A5FA15_1px,transparent_1px),linear-gradient(to_bottom,#60A5FA15_1px,transparent_1px)] bg-[size:24px_24px]" />
      
//       {/* Background glow effects */}
//       <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-blue-500/10 rounded-full blur-3xl" />
//       <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-blue-400/5 rounded-full blur-3xl" />
      
//       {/* Content container */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Header section */}
//         <div className={`mb-12 md:mb-16 transition-all duration-1000 transform
//                        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 max-w-4xl">
//             Navigate The Digital Frontier With
//             <br />
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-200 to-blue-400">
//               Our Engineering Excellence
//             </span>
//           </h2>
//         </div>
        
//         {/* Services grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {services.map((service, index) => {
//             const Icon = service.icon;
//             return (
//               <div
//                 key={index}
//                 className={`relative group transition-all duration-700 transform
//                           ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
//                 style={{ transitionDelay: `${service.delay}ms` }}
//                 onMouseEnter={() => setHoveredCard(index)}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 {service.isCtaCard ? (
//                   // CTA Card with blue background
//                   <div className="h-full relative rounded-2xl overflow-hidden bg-blue-600 shadow-lg shadow-blue-500/20
//                                transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-blue-500/30">
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600" />
//                     <div className="h-full flex flex-col items-center justify-center p-8 relative">
//                       <div className="flex flex-col items-center justify-center h-full w-full">
//                         <span className="text-xl font-bold text-white mb-4">{service.title}</span>
//                         <button className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-white rounded-full text-blue-600 font-medium
//                                        hover:bg-blue-50 transition-colors duration-300 group">
//                           <span>Explore More</span>
//                           <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   // Regular service card
//                   <div className="h-full relative rounded-2xl overflow-hidden bg-blue-800/20 backdrop-blur-sm 
//                                border border-blue-700/20 shadow-lg 
//                                transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:border-blue-600/30">
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-800/30 via-blue-900/40 to-blue-900/50" />
                    
//                     <div className="h-full flex flex-col p-6 relative">
//                       {/* Icon */}
//                       <div className="mb-4 relative">
//                         {Icon && (
//                           <div className="p-3 bg-blue-700/30 rounded-xl inline-flex items-center justify-center
//                                       group-hover:bg-blue-600/40 transition-colors duration-300">
//                             <Icon className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors duration-300" />
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Content */}
//                       <h3 className="text-lg font-bold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">
//                         {service.title}
//                       </h3>
//                       <p className="text-blue-100/80 text-sm leading-relaxed group-hover:text-blue-50 transition-colors duration-300">
//                         {service.description}
//                       </p>
                      
//                       {/* Accent line at bottom */}
//                       <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-white to-blue-400 
//                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
      
//       {/* Decorative elements */}
//       <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
//       <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl" />
//     </div>
//   );
// };

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

// export default DigitalServicesSection;
// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   Smartphone, 
//   Code, 
//   Zap, 
//   Lightbulb, 
//   Server, 
//   Workflow, 
//   Cloud, 
//   ChevronRight 
// } from 'lucide-react';

// const DigitalServicesSection = () => {
//   const [sectionRef, isInView] = useIntersectionObserver();
//   const [hoveredCard, setHoveredCard] = useState(null);

//   const services = [
//     {
//       icon: Smartphone,
//       title: "Mobile App Development",
//       description: "We build intuitive, responsive mobile apps tailored to meet your specific business needs and enhance user engagement.",
//       delay: 0
//     },
//     {
//       icon: Code,
//       title: "Software Development",
//       description: "From custom development to system upgrades, we craft software that enhances operational efficiency and drives innovation.",
//       delay: 100
//     },
//     {
//       icon: Zap,
//       title: "Digital Transformation",
//       description: "We help businesses stay competitive by transforming legacy systems with modern, digital-first solutions that drive growth.",
//       delay: 200
//     },
//     {
//       icon: Lightbulb,
//       title: "Ideation And Design Strategy",
//       description: "Our strategic ideation and design processes ensure that your digital products are not only functional but also well-resonated with users.",
//       delay: 300
//     },
//     {
//       icon: Server,
//       title: "IT Consulting",
//       description: "We provide expert IT consulting services to help your organization navigate complex technology decisions and align IT strategies with business objectives.",
//       delay: 400
//     },
//     {
//       icon: Workflow,
//       title: "DevOps",
//       description: "Our DevOps services streamline development and operations to accelerate your project timelines and improve the overall product quality.",
//       delay: 500
//     },
//     {
//       icon: Cloud,
//       title: "Cloud Managed Services",
//       description: "We manage your cloud infrastructure end-to-end, ensuring it is optimized, secure, and cost-effective; allowing you to focus on strategic business activities.",
//       delay: 600
//     },
//     {
//       title: "Our Services",
//       isCtaCard: true,
//       delay: 700
//     }
//   ];

//   return (
//     <div ref={sectionRef} className="relative w-full py-16 md:py-24 bg-[#1e2556] overflow-hidden">
//       {/* Background patterns */}
    
      
//       {/* Content container */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Header section */}
//         <div className={`mb-12 md:mb-16 transition-all duration-1000 transform
//                        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-8 max-w-4xl">
//             Navigate The Digital Frontier With
//             <br />
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700">
//               Our Engineering Excellence
//             </span>
//           </h2>
//         </div>
        
//         {/* Services grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {services.map((service, index) => {
//             const Icon = service.icon;
//             return (
//               <div
//                 key={index}
//                 className={`relative group transition-all duration-700 transform
//                           ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
//                 style={{ transitionDelay: `${service.delay}ms` }}
//                 onMouseEnter={() => setHoveredCard(index)}
//                 onMouseLeave={() => setHoveredCard(null)}
//               >
//                 {service.isCtaCard ? (
//                   // CTA Card with blue background
//                   <div className="h-full relative rounded-2xl overflow-hidden bg-blue-600 shadow-lg shadow-blue-500/20
//                                transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-blue-500/30">
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600" />
//                     <div className="h-full flex flex-col items-center justify-center p-8 relative">
//                       <div className="flex flex-col items-center justify-center h-full w-full">
//                         <span className="text-xl font-bold text-white mb-4">{service.title}</span>
//                         <button className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-white rounded-full text-blue-600 font-medium
//                                        hover:bg-blue-50 transition-colors duration-300 group">
//                           <span>Explore More</span>
//                           <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   // Regular service card
//                   <div className="h-full relative rounded-2xl overflow-hidden bg-white backdrop-blur-sm 
//                                border border-blue-100 shadow-lg 
//                                transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:border-blue-200">
//                     <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50/50" />
                    
//                     <div className="h-full flex flex-col p-6 relative">
//                       {/* Icon */}
//                       <div className="mb-4 relative">
//                         {Icon && (
//                           <div className="p-3 bg-blue-50 rounded-xl inline-flex items-center justify-center
//                                       group-hover:bg-blue-100 transition-colors duration-300">
//                             <Icon className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
//                           </div>
//                         )}
//                       </div>
                      
//                       {/* Content */}
//                       <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">
//                         {service.title}
//                       </h3>
//                       <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
//                         {service.description}
//                       </p>
                      
//                       {/* Accent line at bottom */}
//                       <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 
//                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
      
//       {/* Decorative elements */}
//       <div className="absolute top-1/4 right-0 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl" />
//       <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-blue-300/5 rounded-full blur-3xl" />
//     </div>
//   );
// };

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

// export default DigitalServicesSection;
import React, { useState, useRef, useEffect } from 'react';
import { 
  Brain, 
  Cog, 
  FileContract, 
  ShieldCheck, 
  FileText, 
  Briefcase, 
  Scale, 
  ChevronRight 
} from 'lucide-react';

import ContactForm from "./ContactForm";

const LegalServicesSection = () => {
  const [sectionRef, isInView] = useIntersectionObserver();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  const services = [
    {
      icon: Brain,
      title: "AI Strategy",
      description: "We help legal teams craft and execute AI-driven strategies that enhance decision-making, streamline processes, and unlock new efficiencies.",
      delay: 0
    },
    {
      icon: Cog,
      title: "Technology Implementation",
      description: "From selecting the right tools to ensuring seamless integration, we guide legal teams through every step of successful technology adoption.",
      delay: 100
    },
    {
      icon: Cog,
      title: "Contract Automation",
      description: "We enable end-to-end contract lifecycle automation, reducing turnaround times and ensuring compliance with minimal manual intervention.",
      delay: 200
    },
    {
      icon: ShieldCheck,
      title: "Compliance Automation",
      description: "Our solutions help legal teams stay ahead of evolving regulations, automating compliance workflows to mitigate risks and improve efficiency.",
      delay: 300
    },
    {
      icon: FileText,
      title: "Legal Document Automation",
      description: "We streamline the creation, review, and management of legal documents, ensuring accuracy, consistency, and faster execution.",
      delay: 400
    },
    {
      icon: Briefcase,
      title: "Case Management",
      description: "We optimize case workflows, enabling legal teams to track matters efficiently, collaborate seamlessly, and manage deadlines with precision.",
      delay: 500
    },
    {
      icon: Scale,
      title: "Litigation Management",
      description: "We provide data-driven insights and technology solutions to simplify litigation workflows, improving efficiency and strategic decision-making.",
      delay: 600
    },
    {
      title: "Contact Us",
      isCtaCard: true,
      delay: 700
    }
  ];

  return (
    <div ref={sectionRef} className="relative w-full py-16 md:py-24 bg-[#1e2556] overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#7cc6ee]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-[#7cc6ee]/10 rounded-full blur-3xl" />
      
      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header section */}
        <div className={`mb-12 md:mb-16 transition-all duration-1000 transform
                       ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 max-w-4xl">
            Top goals legal teams share with us
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7cc6ee] via-[#8ad0f7] to-[#7cc6ee]">
              Designed for legal excellence
            </span>
          </h2>
        </div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`relative group transition-all duration-700 transform
                          ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${service.delay}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {service.isCtaCard ? (
                  // CTA Card with blue background
                  <div className="h-full relative rounded-2xl overflow-hidden bg-[#7cc6ee] shadow-lg shadow-[#7cc6ee]/20
                               transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-[#7cc6ee]/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7cc6ee] to-[#5eb6e0]" />
                    <div className="h-full flex flex-col items-center justify-center p-8 relative">
                      <div className="flex flex-col items-center justify-center h-full w-full">
                        {/* <span className="text-xl font-bold text-white mb-4">{service.title}</span> */}
                        <button 
                        onClick={() => setIsContactFormOpen(true)}
                        className="inline-flex items-center justify-center gap-1 px-4 py-2 bg-white rounded-full text-[#1e2556] font-medium
                                       hover:bg-[#f5f7fa] transition-colors duration-300 group">
                          <span>Contact Us</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular service card
                  <div className="h-full relative rounded-2xl overflow-hidden bg-[#f5f7fa] backdrop-blur-sm 
                               border border-[#7cc6ee]/20 shadow-lg 
                               transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:border-[#7cc6ee]/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7fa] via-[#f5f7fa] to-[#7cc6ee]/10" />
                    
                    <div className="h-full flex flex-col p-6 relative">
                      {/* Icon */}
                      <div className="mb-4 relative">
                        {Icon && (
                          <div className="p-3 bg-[#7cc6ee]/10 rounded-xl inline-flex items-center justify-center
                                      group-hover:bg-[#7cc6ee]/20 transition-colors duration-300">
                            <Icon className="w-5 h-5 text-[#1e2556] group-hover:text-[#1e2556] transition-colors duration-300" />
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-lg font-bold text-[#1e2556] mb-3 group-hover:text-[#1e2556] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-[#2d2d2d] text-sm leading-relaxed group-hover:text-[#2d2d2d] transition-colors duration-300">
                        {service.description}
                      </p>
                      
                      {/* Accent line at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#7cc6ee] via-[#5eb6e0] to-[#7cc6ee] 
                                 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {isContactFormOpen && (
        <ContactForm 
          isOpen={isContactFormOpen} 
          onClose={() => setIsContactFormOpen(false)} 
        />
      )}
    </div>
  );
};

// Custom hook for intersection observer
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

export default LegalServicesSection;