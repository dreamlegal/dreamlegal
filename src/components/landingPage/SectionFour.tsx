
// import React from 'react';
// import { ShieldAlert, LayoutGrid, AlertTriangle, Workflow } from 'lucide-react';

// const ChallengeCard = ({ icon, step, title, description, delay, isLast = false }) => {
//   const Icon = icon;
  
//   return (
//     <div
//       className={`
//         group relative bg-white transition-all duration-300
//         hover:z-10 hover:shadow-xl hover:-translate-y-1
//       `}
//       style={{
//         animation: `fadeInUp 0.5s ease-out ${delay}s both`
//       }}
//     >
//       <div className="relative space-y-4 sm:space-y-6 md:space-y-8 py-6 sm:py-8 md:py-12 p-4 sm:p-6 md:p-8">
//         {/* Background gradients */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7fa] to-white opacity-0 
//                       group-hover:opacity-100 transition-opacity duration-300" />
        
//         {/* Content */}
//         <div className="relative z-10">
//           <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-[#7cc6ee]/10 p-2 sm:p-2.5 md:p-3 mb-4 sm:mb-6 md:mb-8 
//                        group-hover:bg-[#1e2556] group-hover:text-white transition-colors duration-300">
//             <Icon className="w-full h-full" />
//           </div>

//           <div className="space-y-2 sm:space-y-3 md:space-y-4">
//             <div className="space-y-1 sm:space-y-2">
//               <h5 className="text-base sm:text-lg md:text-xl font-semibold text-[#1e2556] leading-tight">
//                 {title}
//               </h5>
//               {description && (
//                 <p className="text-sm sm:text-base text-[#2d2d2d] leading-relaxed">
//                   {description}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Border Gradients */}
//         <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r 
//                       from-transparent via-[#7cc6ee]/20 to-transparent opacity-0 
//                       group-hover:opacity-100 transition-opacity duration-300" />
//         <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b 
//                       from-transparent via-[#7cc6ee]/20 to-transparent opacity-0 
//                       group-hover:opacity-100 transition-opacity duration-300" />
//       </div>
//     </div>
//   );
// };

// const LegalChallenges = () => {
//   const challenges = [
//     {
//       icon: AlertTriangle,
//       step: "Challenge 1️⃣",
//       title: "Compliance and privacy concerns",
//     },
//     {
//       icon: LayoutGrid,
//       step: "Challenge 2️⃣",
//       title: "Time and resources spent on wrong tools",
//     },
//     {
//       icon: ShieldAlert,
//       step: "Challenge 3️⃣",
//       title: "Complexity in vendor comparison",
//     },
//     {
//       icon: Workflow,
//       step: "Challenge 4️⃣",
//       title: "Lack of internal clarity on team needs",
//       isLast: true
//     }
//   ];

//   return (
//     <div className="relative bg-white overflow-hidden" id="challenges">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 relative">
//         {/* Section Header */}
//         <div className="md:w-2/3 lg:w-1/2 mb-8 sm:mb-12 md:mb-16">
//           <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-[#7cc6ee]/10 p-2 sm:p-2.5 md:p-3 mb-4 sm:mb-6 md:mb-8">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="currentColor"
//               className="w-full h-full text-[#1e2556]"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </div>

//           <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e2556] mb-3 sm:mb-4 leading-tight">
//             Why 87% legal teams are failing in tech adoption?
//           </h2>
//         </div>

//         {/* Challenges Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0 
//                       sm:divide-x sm:divide-y sm:divide-[#7cc6ee]/10 overflow-hidden 
//                       rounded-2xl sm:rounded-3xl border border-[#7cc6ee]/20 
//                       lg:divide-y-0">
//           {challenges.map((challenge, index) => (
//             <ChallengeCard
//               key={index}
//               {...challenge}
//               delay={0.3 + index * 0.1}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Add keyframes for animation */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LegalChallenges;
// import React from 'react';
// import { ShieldAlert, LayoutGrid, AlertTriangle, Workflow, TrendingDown } from 'lucide-react';

// const ChallengeCard = ({ icon, number, title, description, delay, isEven = false }) => {
//   const Icon = icon;
  
//   return (
//     <div
//       className={`
//         group relative bg-white rounded-2xl p-6 border border-gray-100 
//         hover:border-[#7cc6ee]/30 hover:shadow-xl transition-all duration-300
//         ${isEven ? 'lg:mt-8' : 'lg:mb-8'}
//       `}
//       style={{
//         animation: `fadeInScale 0.6s ease-out ${delay}s both`
//       }}
//     >
//       {/* Number Badge */}
//       <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#1e2556] text-white rounded-full 
//                     flex items-center justify-center text-sm font-bold shadow-lg">
//         {number}
//       </div>

//       {/* Icon Container */}
//       <div className="relative mb-4">
//         <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#7cc6ee]/10 to-[#7cc6ee]/5 
//                       p-4 group-hover:from-[#7cc6ee]/20 group-hover:to-[#7cc6ee]/10 
//                       transition-all duration-300">
//           <Icon className="w-full h-full text-[#7cc6ee] group-hover:text-[#1e2556] transition-colors" />
//         </div>
        
//         {/* Decorative elements */}
//         <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#7cc6ee]/20 rounded-full 
//                       opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100" />
//         <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#1e2556]/10 rounded-full 
//                       opacity-0 group-hover:opacity-100 transition-all duration-300 delay-200" />
//       </div>

//       {/* Content */}
//       <div className="space-y-3">
//         <h3 className="text-lg font-bold text-[#1e2556] leading-tight group-hover:text-[#7cc6ee] 
//                      transition-colors duration-300">
//           {title}
//         </h3>
//         {description && (
//           <p className="text-sm text-gray-600 leading-relaxed">
//             {description}
//           </p>
//         )}
//       </div>

//       {/* Hover gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#7cc6ee]/5 to-transparent 
//                     opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
//     </div>
//   );
// };

// const LegalChallenges = () => {
//   const challenges = [
//     {
//       icon: AlertTriangle,
//       number: 1,
//       title: "Compliance and privacy concerns",
     
//     },
//     {
//       icon: LayoutGrid,
//       number: 2,
//       title: "Time and resources spent on wrong tools",
    
//     },
//     {
//       icon: ShieldAlert,
//       number: 3,
//       title: "Complexity in vendor comparison",
     
//     },
//     {
//       icon: Workflow,
//       number: 4,
//       title: "Lack of internal clarity on team needs",
      
//     }
//   ];

//   return (
//     <div className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden" id="challenges">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-[0.03]">
//         <div className="absolute inset-0 bg-[linear-gradient(45deg,#1e2556_1px,transparent_1px),linear-gradient(-45deg,#1e2556_1px,transparent_1px)] bg-[size:20px_20px]" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
//         {/* Header Section - Centered and Compact */}
//         <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          

//           {/* Main Heading */}
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e2556] mb-4 leading-tight">
//             Why <span className="text-[#7cc6ee]">87%</span> of legal teams are 
//             <br className="hidden sm:block" />
//             failing in tech adoption?
//           </h2>
          
         
//         </div>

        

//         {/* Challenges Grid - Staggered Layout for Visual Interest */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//           {challenges.map((challenge, index) => (
//             <ChallengeCard
//               key={index}
//               {...challenge}
//               delay={0.2 + index * 0.1}
//               isEven={index % 2 === 1}
//             />
//           ))}
//         </div>

//         {/* Call to Action */}
//         <div className="text-center mt-12 sm:mt-16">
//           <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
//             <h3 className="text-xl font-bold text-[#1e2556] mb-3">
//               Ready to avoid these pitfalls?
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Learn how successful legal teams are overcoming these challenges with the right approach.
//             </p>
//             <button className="bg-gradient-to-r from-[#7cc6ee] to-[#1e2556] text-white px-8 py-3 
//                            rounded-xl font-semibold hover:shadow-lg transition-all duration-300 
//                            hover:scale-105">
//               Get Our Success Guide
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Animation Keyframes */}
//       <style jsx>{`
//         @keyframes fadeInScale {
//           from {
//             opacity: 0;
//             transform: translateY(30px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LegalChallenges;
// import React from 'react';
// import { ShieldAlert, LayoutGrid, AlertTriangle, Workflow } from 'lucide-react';

// const ChallengeCard = ({ icon, number, title, description, delay }) => {
//   const Icon = icon;
  
//   return (
//     <div
//       className="group relative bg-white rounded-2xl p-8 border border-gray-100 
//                 hover:border-[#7cc6ee]/30 hover:shadow-xl transition-all duration-300"
//       style={{
//         animation: `fadeInScale 0.6s ease-out ${delay}s both`
//       }}
//     >
//       {/* Large Number/Percentage */}
//       <div className="text-4xl sm:text-5xl font-bold text-[#1e2556] mb-4">
//         {number === 1 && "87%"}
//         {number === 2 && "60%"}
//         {number === 3 && "45%"}
//         {number === 4 && "73%"}
//       </div>

//       {/* Title */}
//       <h3 className="text-xl font-bold text-[#1e2556] mb-4 leading-tight">
//         {title}
//       </h3>

//       {/* Description */}
//       <p className="text-gray-600 leading-relaxed text-sm">
//         {number === 1 && "Legal teams struggle with regulatory compliance requirements and data privacy concerns when adopting new technology solutions."}
//         {number === 2 && "Organizations waste valuable time and budget investing in legal technology tools that don't align with their actual workflow needs."}
//         {number === 3 && "The complexity of evaluating different legal technology vendors makes it difficult to make informed purchasing decisions."}
//         {number === 4 && "Teams lack clear understanding of their specific requirements and internal processes before selecting technology solutions."}
//       </p>

//       {/* Icon - Bottom Right */}
//       <div className="absolute bottom-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
//         <Icon className="w-8 h-8 text-[#7cc6ee]" />
//       </div>

//       {/* Hover gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-[#7cc6ee]/5 to-transparent 
//                     opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
//     </div>
//   );
// };

// const LegalChallenges = () => {
//   const challenges = [
//     {
//       icon: AlertTriangle,
//       number: 1,
//       title: "Face compliance and privacy concerns",
//     },
//     {
//       icon: LayoutGrid,
//       number: 2,
//       title: "Waste time and resources on wrong tools",
//     },
//     {
//       icon: ShieldAlert,
//       number: 3,
//       title: "Struggle with vendor comparison complexity",
//     },
//     {
//       icon: Workflow,
//       number: 4,
//       title: "Lack internal clarity on team needs",
//     }
//   ];

//   return (
//     <div className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden" id="challenges">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-[0.03]">
//         <div className="absolute inset-0 bg-[linear-gradient(45deg,#1e2556_1px,transparent_1px),linear-gradient(-45deg,#1e2556_1px,transparent_1px)] bg-[size:20px_20px]" />
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
//         {/* Header Section - Centered and Compact */}
//         <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
//           {/* Main Heading */}
//           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e2556] mb-4 leading-tight">
//             Why <span className="text-[#7cc6ee]">87%</span> of legal teams are 
//             <br className="hidden sm:block" />
//             failing in tech adoption?
//           </h2>
//         </div>

//         {/* Challenges Grid - Same Position Layout */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
//           {challenges.map((challenge, index) => (
//             <ChallengeCard
//               key={index}
//               {...challenge}
//               delay={0.2 + index * 0.1}
//             />
//           ))}
//         </div>

//         {/* Call to Action */}
//         <div className="text-center mt-12 sm:mt-16">
//           <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
//             <h3 className="text-xl font-bold text-[#1e2556] mb-3">
//               Ready to avoid these pitfalls?
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Learn how successful legal teams are overcoming these challenges with the right approach.
//             </p>
//             <button className="bg-gradient-to-r from-[#7cc6ee] to-[#1e2556] text-white px-8 py-3 
//                            rounded-xl font-semibold hover:shadow-lg transition-all duration-300 
//                            hover:scale-105">
//               Get Our Success Guide
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Animation Keyframes */}
//       <style jsx>{`
//         @keyframes fadeInScale {
//           from {
//             opacity: 0;
//             transform: translateY(30px) scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LegalChallenges;
import React from 'react';
import { ShieldAlert, LayoutGrid, AlertTriangle, Workflow } from 'lucide-react';

const ChallengeCard = ({ icon, number, title, description, delay }) => {
  const Icon = icon;
  
  return (
    <div
      className="group relative bg-white rounded-2xl p-8 border border-gray-100 
                hover:border-[#7cc6ee]/30 hover:shadow-xl transition-all duration-300"
      style={{
        animation: `fadeInScale 0.6s ease-out ${delay}s both`
      }}
    >
      {/* Icon at top */}
      <div className="mb-6">
        <Icon className="w-12 h-12 text-[#1e2556]" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-[#1e2556] leading-tight">
        {title}
      </h3>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7cc6ee]/5 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
    </div>
  );
};

const LegalChallenges = () => {
  const challenges = [
    {
      icon: AlertTriangle,
      number: 1,
      title: "Face compliance and privacy concerns",
    },
    {
      icon: LayoutGrid,
      number: 2,
      title: "Waste time and resources on wrong tools",
    },
    {
      icon: ShieldAlert,
      number: 3,
      title: "Struggle with vendor comparison complexity",
    },
    {
      icon: Workflow,
      number: 4,
      title: "Lack internal clarity on team needs",
    }
  ];

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-white overflow-hidden" id="challenges">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#1e2556_1px,transparent_1px),linear-gradient(-45deg,#1e2556_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
        {/* Header Section - Centered and Compact */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e2556] mb-4 leading-tight">
            Why <span className="text-[#7cc6ee]">87%</span> of legal teams are 
            <br className="hidden sm:block" />
            failing in tech adoption?
          </h2>
        </div>

        {/* Challenges Grid - Same Position Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {challenges.map((challenge, index) => (
            <ChallengeCard
              key={index}
              {...challenge}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>

        {/* Call to Action */}
     
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LegalChallenges;