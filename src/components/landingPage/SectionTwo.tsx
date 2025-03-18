
// import React, { useState, useRef, useEffect } from 'react';
// import { Server, Globe, Cpu } from 'lucide-react';

// const ITServicesSection = () => {
//   const [sectionRef, isInView] = useIntersectionObserver();
  
//   const stats = [
//     {
//       count: "35+",
//       title: "Industries Mastered",
//       description: "With our agility & engineering expertise, we equip your critical business functions with customized tech, and expand digital capabilities.",
//       icon: Globe,
//       delay: 0
//     },
//     {
//       count: "1600+",
//       title: "Tech Evangelists",
//       description: "We are a dynamic team of technology enthusiasts and experts passionately driven to achieve the best results for our clients.",
//       icon: Cpu,
//       delay: 100
//     },
//     {
//       count: "3000+",
//       title: "Solutions Designed And Delivered",
//       description: "We have empowered businesses with thousands of successful futuristic solutions that have helped them grow and scale.",
//       icon: Server,
//       delay: 200
//     }
//   ];

//   return (
//     <div ref={sectionRef} className="relative w-full py-16 md:py-24 bg-white overflow-hidden">
//       {/* Background effects */}
//       <div className="absolute inset-0 bg-[linear-gradient(to_right,#3B82F610_1px,transparent_1px),linear-gradient(to_bottom,#3B82F610_1px,transparent_1px)] bg-[size:24px_24px]" />
      
//       {/* Content container */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Top section with split layout */}
//         <div className={`mb-16 transition-all duration-1000 transform
//                       ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
//             {/* Left side - Title */}
//             <div className="flex items-center h-full">
//               <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black tracking-tight leading-tight">
//                 Transforming Businesses With
//                 <br />
//                 Technology That Transcends
//                 <br />
//                 Geographies And Platforms
//               </h2>
//             </div>
            
//             {/* Right side - Description */}
//             <div className="flex items-center h-full">
//               <p className="text-base md:text-lg text-gray-700 leading-relaxed">
//                 AppInventiv is one of the world's largest IT service providers helping companies redefine their digital possibilities for nearly a decade now. With our team of 1600+ tech evangelists, we are building the digital infrastructure of our clients positioning them to be the market leaders of their respective industries.
//               </p>
//             </div>
//           </div>
//         </div>
        
//         {/* Stats Grid - Exactly as in the image */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {stats.map((stat, index) => {
//             const Icon = stat.icon;
//             return (
//               <div 
//                 key={index}
//                 className={`relative transition-all duration-700 transform
//                          ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
//                 style={{ transitionDelay: `${stat.delay}ms` }}
//               >
//                 <div className="relative px-6 py-8">
//                   {/* Count */}
//                   <div className="mb-3">
//                     <span className="text-4xl lg:text-5xl font-bold text-blue-600 tracking-tight">
//                       {stat.count}
//                     </span>
//                   </div>
                  
//                   {/* Title */}
//                   <h3 className="text-xl font-bold text-black mb-3">
//                     {stat.title}
//                   </h3>
                  
//                   {/* Description */}
//                   <p className="text-gray-700 text-sm leading-relaxed">
//                     {stat.description}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
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

// export default ITServicesSection;
import React, { useState, useRef, useEffect } from 'react';
import { FileSearch, Scale, PieChart } from 'lucide-react';

const LegalServicesSection = () => {
  const [sectionRef, isInView] = useIntersectionObserver();
  
  const stats = [
    {
      count: "1200+",
      title: "Legal Technology Products Mapped",
      description: "We have meticulously mapped over 1200 legal tech products, helping legal teams find solutions tailored to their needs.",
      icon: FileSearch,
      delay: 0
    },
    {
      count: "1700+",
      title: "Legal Processes Analyzed",
      description: "Our in-depth analysis of 1700+ legal processes ensures that technology aligns with operational workflows for maximum efficiency.",
      icon: Scale,
      delay: 100
    },
    {
      count: "99.2%",
      title: "Client Satisfaction",
      description: "With a 99.2% satisfaction rate, we have consistently delivered impactful digital transformation projects for law firms and legal departments.",
      icon: PieChart,
      delay: 200
    }
  ];

  return (
    <div ref={sectionRef} className="relative w-full py-16 md:py-24 bg-white overflow-hidden">
      {/* Background effects */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e255610_1px,transparent_1px),linear-gradient(to_bottom,#1e255610_1px,transparent_1px)] bg-[size:24px_24px]" />
       */}
      {/* Content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top section with split layout */}
        <div className={`mb-16 transition-all duration-1000 transform
                      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Left side - Title */}
            <div className="flex items-center h-full">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e2556] tracking-tight leading-tight">
                Transforming legal teams with
                <br />
                technology that transcends
                <br />
                complexities and challenges
              </h2>
            </div>
            
            {/* Right side - Description */}
            <div className="flex items-center h-full">
              <p className="text-base md:text-lg text-[#2d2d2d] leading-relaxed">
                DreamLegal is a one-of-a-kind Platform-as-a-Service company dedicated to driving digital transformation for legal teams. We focus on identifying inefficiencies, selecting the right technology, and ensuring deep team adoption—all while making legal tech seamlessly compatible with existing legal processes.
              </p>
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className={`relative transition-all duration-700 transform
                         ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${stat.delay}ms` }}
              >






                <div className="relative px-6 py-8 bg-[#f5f7fa] rounded-lg">
                  {/* Count */}
                  <div className="mb-3">
                    <span className="text-4xl lg:text-5xl font-bold text-[#1e2556] tracking-tight">
                      {stat.count}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-[#334155] mb-3">
                    {stat.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[#2d2d2d] text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
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