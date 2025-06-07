
// import React from 'react';
// import { motion } from 'framer-motion';
// import { ShieldAlert, LayoutGrid, AlertTriangle, Workflow } from 'lucide-react';

// const ChallengeCard = ({ icon, step, title, description, delay, isLast = false }) => {
//   const Icon = icon;
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay }}
//       viewport={{ once: true }}
//       className={`
//         group relative bg-white transition-all duration-300
//         hover:z-10 hover:shadow-2xl hover:-translate-y-1
//       `}
//     >
//       <div className="relative space-y-8 py-12 p-8">
//         {/* Background gradients */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7fa] to-white opacity-0 
//                       group-hover:opacity-100 transition-opacity duration-300" />
        
//         {/* Content */}
//         <div className="relative z-10">
//           <div className="w-16 h-16 rounded-2xl bg-[#7cc6ee]/10 p-3 mb-8 
//                        group-hover:bg-[#1e2556] group-hover:text-white transition-colors duration-300">
//             <Icon className="w-full h-full" />
//           </div>

//           <div className="space-y-4">
//             <div className="space-y-2">
//               {/* <span className="text-sm font-medium text-[#334155]">
//                 {step}
//               </span> */}
//               <h5 className="text-xl font-semibold text-[#1e2556]">
//                 {title}
//               </h5>
//               <p className="text-[#2d2d2d]">
//                 {description}
//               </p>
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
//     </motion.div>
//   );
// };

// const LegalChallenges = () => {
//   const challenges = [
//     {
//       icon: AlertTriangle,
//       step: "Challenge 1️⃣",
//       title: "Compliance and privacy concerns",
//       // description: "Lawyers rely on familiar processes, avoiding disruptions."
//     },
//     {
//       icon: LayoutGrid,
//       step: "Challenge 2️⃣",
//       title: "Time and resources spent on wrong tools",
//       // description: "Siloed tools create inefficiencies instead of solutions."
//     },
//     {
//       icon: ShieldAlert,
//       step: "Challenge 3️⃣",
//       title: "Complexity in vendor comparison",
//       // description: "Data security and regulatory alignment slow tech adoption."
//     },
//     {
//       icon: Workflow,
//       step: "Challenge 4️⃣",
//       title: "Lack of internal clarity on team needs",
//       // description: "Technology must adapt to legal processes, not vice versa.",
//       isLast: true
//     }
//   ];

//   return (
//     <div className="relative bg-white overflow-hidden" id="challenges">
//       {/* Background Pattern */}
//       {/* <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e255608_1px,transparent_1px),linear-gradient(to_bottom,#1e255608_1px,transparent_1px)] bg-[size:24px_24px]" />
//       </div> */}

//       <div className="max-w-7xl mx-auto px-4 py-4 relative">
//         {/* Section Header */}
//         <div className="md:w-2/3 lg:w-1/2 mb-16">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="w-12 h-12 rounded-xl bg-[#7cc6ee]/10 p-3 mb-8"
//           >
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
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.1 }}
//             className="text-3xl sm:text-4xl font-bold text-[#1e2556] mb-4"
//           >
//             Why 87% legal teams are failing in tech adoption?




//           </motion.h2>

//           {/* <motion.p
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//             className="text-[#2d2d2d]"
//           >
//             Legal teams operate in high-stakes environments with strict regulations, legacy systems, and deep-rooted workflows. Adopting new technology isn't just about buying software—it's about overcoming real challenges.
//           </motion.p> */}
//         </div>

//         {/* Challenges Grid */}
//         <div className="grid divide-x divide-y divide-[#7cc6ee]/10 overflow-hidden rounded-3xl 
//                       border border-[#7cc6ee]/20 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0">
//           {challenges.map((challenge, index) => (
//             <ChallengeCard
//               key={index}
//               {...challenge}
//               delay={0.3 + index * 0.1}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LegalChallenges;
import React from 'react';
import { ShieldAlert, LayoutGrid, AlertTriangle, Workflow } from 'lucide-react';

const ChallengeCard = ({ icon, step, title, description, delay, isLast = false }) => {
  const Icon = icon;
  
  return (
    <div
      className={`
        group relative bg-white transition-all duration-300
        hover:z-10 hover:shadow-xl hover:-translate-y-1
      `}
      style={{
        animation: `fadeInUp 0.5s ease-out ${delay}s both`
      }}
    >
      <div className="relative space-y-4 sm:space-y-6 md:space-y-8 py-6 sm:py-8 md:py-12 p-4 sm:p-6 md:p-8">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7fa] to-white opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content */}
        <div className="relative z-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-[#7cc6ee]/10 p-2 sm:p-2.5 md:p-3 mb-4 sm:mb-6 md:mb-8 
                       group-hover:bg-[#1e2556] group-hover:text-white transition-colors duration-300">
            <Icon className="w-full h-full" />
          </div>

          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <h5 className="text-base sm:text-lg md:text-xl font-semibold text-[#1e2556] leading-tight">
                {title}
              </h5>
              {description && (
                <p className="text-sm sm:text-base text-[#2d2d2d] leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Border Gradients */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r 
                      from-transparent via-[#7cc6ee]/20 to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b 
                      from-transparent via-[#7cc6ee]/20 to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
};

const LegalChallenges = () => {
  const challenges = [
    {
      icon: AlertTriangle,
      step: "Challenge 1️⃣",
      title: "Compliance and privacy concerns",
    },
    {
      icon: LayoutGrid,
      step: "Challenge 2️⃣",
      title: "Time and resources spent on wrong tools",
    },
    {
      icon: ShieldAlert,
      step: "Challenge 3️⃣",
      title: "Complexity in vendor comparison",
    },
    {
      icon: Workflow,
      step: "Challenge 4️⃣",
      title: "Lack of internal clarity on team needs",
      isLast: true
    }
  ];

  return (
    <div className="relative bg-white overflow-hidden" id="challenges">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 relative">
        {/* Section Header */}
        <div className="md:w-2/3 lg:w-1/2 mb-8 sm:mb-12 md:mb-16">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-[#7cc6ee]/10 p-2 sm:p-2.5 md:p-3 mb-4 sm:mb-6 md:mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full text-[#1e2556]"
            >
              <path
                fillRule="evenodd"
                d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e2556] mb-3 sm:mb-4 leading-tight">
            Why 87% legal teams are failing in tech adoption?
          </h2>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-0 
                      sm:divide-x sm:divide-y sm:divide-[#7cc6ee]/10 overflow-hidden 
                      rounded-2xl sm:rounded-3xl border border-[#7cc6ee]/20 
                      lg:divide-y-0">
          {challenges.map((challenge, index) => (
            <ChallengeCard
              key={index}
              {...challenge}
              delay={0.3 + index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Add keyframes for animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LegalChallenges;