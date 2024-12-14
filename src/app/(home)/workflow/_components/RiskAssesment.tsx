// // "use client"
// // import React, { useState } from 'react';
// // import { motion } from 'framer-motion';
// // import { 
// //   Flag, ShieldCheck, ArrowUpRight, Server,
// //   Lock, AlertCircle, Activity, Users, Target, Settings,Shield
// // } from 'lucide-react';

// // const IconBadge = ({ Icon, gradient }) => (
// //   <div className={`relative group`}>
// //     <div className="absolute inset-0 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"
// //          style={{ background: gradient }} />
// //     <div className="relative p-2 bg-white/90 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg">
// //       <Icon className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
// //     </div>
// //   </div>
// // );

// // const StatusLine = ({ status, description, icon: Icon, index }) => {
// //   const [isHovered, setIsHovered] = useState(false);

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0, x: -20 }}
// //       animate={{ opacity: 1, x: 0 }}
// //       transition={{ delay: index * 0.1 }}
// //       onMouseEnter={() => setIsHovered(true)}
// //       onMouseLeave={() => setIsHovered(false)}
// //       className="relative flex items-start gap-4 group"
// //     >
// //       <div className="relative">
// //         <motion.div
// //           animate={{ scale: isHovered ? 1.1 : 1 }}
// //           className="relative z-10 bg-white rounded-xl p-2 shadow-lg border border-gray-100"
// //         >
// //           <Icon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
// //         </motion.div>
// //       </div>

// //       <div className="flex-1 space-y-2 py-1">
// //         <div className="flex items-center justify-between">
// //           <h4 className="font-medium text-gray-900">{status}</h4>
// //           <motion.div
// //             animate={{ 
// //               x: isHovered ? 0 : 10,
// //               opacity: isHovered ? 1 : 0
// //             }}
// //             transition={{ duration: 0.2 }}
// //           >
// //             <ArrowUpRight className="w-4 h-4 text-gray-500" />
// //           </motion.div>
// //         </div>
// //         <p className="text-sm text-gray-600">{description}</p>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // const FlagCard = ({ flags, title, icon: Icon, isRed }) => {
// //   const gradientFrom = isRed ? "#f87171" : "#22c55e";
// //   const gradientTo = isRed ? "#ef4444" : "#16a34a";
// //   const borderColor = isRed ? "border-red-100" : "border-green-100";

// //   return (
// //     <motion.div 
// //       initial={{ opacity: 0, y: 20 }}
// //       animate={{ opacity: 1, y: 0 }}
// //       className={`w-full p-6 rounded-2xl bg-white/95 border backdrop-blur-sm
// //                  shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative overflow-hidden
// //                  ${borderColor}`}
// //     >
// //       {/* Background Gradient */}
// //       <div className="absolute inset-0 bg-gradient-to-br opacity-10"
// //            style={{ background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})` }} />
      
// //       {/* Content */}
// //       <div className="relative z-10">
// //         <div className="flex items-center gap-3 mb-6">
// //           <div className={`p-2 rounded-xl bg-gradient-to-br shadow-sm`}
// //                style={{ background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})` }}>
// //             <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
// //           </div>
// //           <h3 className="font-semibold text-gray-800">{title}</h3>
// //         </div>

// //         <div className="space-y-4">
// //           {flags.map((flag, index) => (
// //             <StatusLine 
// //               key={index} 
// //               {...flag} 
// //               index={index} 
// //             />
// //           ))}
// //         </div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // const FlagsDashboard = ({ data }) => {
// //   const redFlags = (data?.Risk_Assessment?.["Critical_Red_Flags"] || []).map(flag => ({
// //     status: "Critical Flag",
// //     description: flag,
// //     icon: Activity
// //   }));

// //   const greenFlags = (data?.Risk_Assessment?.["Positive_Green_Flags"] || []).map(flag => ({
// //     status: "Positive Flag",
// //     description: flag,
// //     icon: ShieldCheck
// //   }));

// //   // Determine which flags to show first based on count
// //   const showRedFirst = redFlags.length >= greenFlags.length;
// //   const primaryFlags = showRedFirst ? redFlags : greenFlags;
// //   const secondaryFlags = showRedFirst ? greenFlags : redFlags;

// //   // Split secondary flags into two groups if needed
// //   const secondaryFlagsPart1 = secondaryFlags.slice(0, Math.ceil(secondaryFlags.length / 2));
// //   const secondaryFlagsPart2 = secondaryFlags.slice(Math.ceil(secondaryFlags.length / 2));

// //   return (
// //     <div className="w-full max-w-6xl mx-auto p-8">
// //       <motion.div 
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         className="bg-white/95 rounded-2xl border border-gray-200/50 
// //                    shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm p-8"
// //       >
// //         {/* Decorative Background */}
// //         <div className="absolute inset-0 overflow-hidden">
// //           <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
// //         </div>

// //         <div className="space-y-8 relative">
// //           {/* Header */}
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center gap-3">
// //               <motion.div
// //                 animate={{ 
// //                   rotate: [0, 10, -10, 10, 0],
// //                 }}
// //                 transition={{
// //                   duration: 4,
// //                   repeat: Infinity,
// //                   repeatDelay: 2,
// //                 }}
// //                 className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 
// //                            border border-blue-200/50 shadow-sm"
// //               >
// //                 <Flag className="w-6 h-6 text-blue-500" strokeWidth={1.5} />
// //               </motion.div>
// //               <div>
// //                 <h2 className="text-xl font-semibold text-gray-800">Status Analysis</h2>
// //                 <p className="text-sm text-gray-500">System health and performance indicators</p>
// //               </div>
// //             </div>

// //             <div className="flex gap-2">
// //               <IconBadge Icon={Shield} gradient="linear-gradient(45deg, #f87171, #ef4444)" />
// //               <IconBadge Icon={Shield} gradient="linear-gradient(45deg, #22c55e, #16a34a)" />
// //               <IconBadge Icon={Lock} gradient="linear-gradient(45deg, #6366f1, #4f46e5)" />
// //             </div>
// //           </div>

// //           {/* Main Large Card */}
// //           <FlagCard 
// //             flags={primaryFlags}
// //             title={showRedFirst ? "Critical Attention Points" : "Positive Indicators"}
// //             icon={showRedFirst ? AlertCircle : ShieldCheck}
// //             isRed={showRedFirst}
// //           />

// //           {/* Secondary Cards Grid */}
// //           <div className="grid md:grid-cols-2 gap-8">
// //             <FlagCard 
// //               flags={secondaryFlagsPart1}
// //               title={!showRedFirst ? "Critical Attention Points" : "Positive Indicators"}
// //               icon={!showRedFirst ? AlertCircle : ShieldCheck}
// //               isRed={!showRedFirst}
// //             />
// //             {secondaryFlagsPart2.length > 0 && (
// //               <FlagCard 
// //                 flags={secondaryFlagsPart2}
// //                 title={!showRedFirst ? "Critical Attention Points" : "Positive Indicators"}
// //                 icon={!showRedFirst ? AlertCircle : ShieldCheck}
// //                 isRed={!showRedFirst}
// //               />
// //             )}
// //           </div>
// //         </div>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default FlagsDashboard;

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   Flag, ShieldCheck, ArrowUpRight, Server,
//   Lock, AlertCircle, Activity, Users, Target, Settings, Shield,
//   Clock, ChevronRight, Zap, BarChart2
// } from 'lucide-react';

// const IconBadge = ({ Icon, gradient }) => (
//   <div className={`relative group`}>
//     <div className="absolute inset-0 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"
//          style={{ background: gradient }} />
//     <div className="relative p-2 bg-white/90 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg">
//       <Icon className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
//     </div>
//   </div>
// );

// const StatusLine = ({ status, description, icon: Icon, index }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ delay: index * 0.1 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="relative flex items-start gap-4 group"
//     >
//       <div className="relative">
//         <motion.div
//           animate={{ scale: isHovered ? 1.1 : 1 }}
//           className="relative z-10 bg-white rounded-xl p-2 shadow-lg border border-gray-100"
//         >
//           <Icon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
//         </motion.div>
//       </div>

//       <div className="flex-1 space-y-2 py-1">
//         <div className="flex items-center justify-between">
//           <h4 className="font-medium text-gray-900">{status}</h4>
//           <motion.div
//             animate={{ 
//               x: isHovered ? 0 : 10,
//               opacity: isHovered ? 1 : 0
//             }}
//             transition={{ duration: 0.2 }}
//           >
//             <ArrowUpRight className="w-4 h-4 text-gray-500" />
//           </motion.div>
//         </div>
//         <p className="text-sm text-gray-600">{description}</p>
//       </div>
//     </motion.div>
//   );
// };

// const FlagCard = ({ flags, title, icon: Icon, isRed }) => {
//   const gradientFrom = isRed ? "#f87171" : "#22c55e";
//   const gradientTo = isRed ? "#ef4444" : "#16a34a";
//   const borderColor = isRed ? "border-red-100" : "border-green-100";

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`w-full p-6 rounded-2xl bg-white/95 border backdrop-blur-sm
//                  shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative overflow-hidden
//                  ${borderColor}`}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br opacity-10"
//            style={{ background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})` }} />
      
//       <div className="relative z-10">
//         <div className="flex items-center gap-3 mb-6">
//           <div className={`p-2 rounded-xl bg-gradient-to-br shadow-sm`}
//                style={{ background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})` }}>
//             <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
//           </div>
//           <h3 className="font-semibold text-gray-800">{title}</h3>
//         </div>

//         <div className="space-y-4">
//           {flags.map((flag, index) => (
//             <StatusLine key={index} {...flag} index={index} />
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const MitigationTimelineItem = ({ strategy, index, total }) => {
//   const [isHovered, setIsHovered] = useState(false);
  
//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.2 }}
//       className="relative mb-16 last:mb-0"
//     >
//       {/* Connecting Line */}
//       {index < total - 1 && (
//         <div className="absolute left-1/2 top-full -translate-x-1/2 w-px h-16 bg-gradient-to-b from-indigo-200 to-transparent" />
//       )}
      
//       {/* Timeline Node */}
//       <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//         <motion.div
//           animate={{ scale: isHovered ? 1.2 : 1 }}
//           className="w-8 h-8 rounded-full bg-white border-4 border-indigo-400 shadow-lg z-20 relative"
//         />
//         <motion.div
//           animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.8 : 0.5 }}
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-indigo-400/20 rounded-full"
//         />
//       </div>

//       {/* Content */}
//       <div 
//         className="grid grid-cols-1 md:grid-cols-2 gap-8"
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Risk Side */}
//         <div className="md:text-right md:pr-12">
//           <motion.div 
//             whileHover={{ y: -4 }}
//             className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl p-6 shadow-lg"
//           >
//             <div className="flex items-center justify-end gap-2 mb-2">
//               <AlertCircle className="w-5 h-5 text-rose-500" />
//               <div className="text-sm font-medium text-rose-600">Risk Factor</div>
//             </div>
//             <p className="text-slate-700">{strategy.Risk}</p>
//           </motion.div>
//         </div>

//         {/* Solution Side */}
//         <div className="md:pl-12">
//           <motion.div 
//             whileHover={{ y: -4 }}
//             className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-lg"
//           >
//             <div className="flex items-center gap-2 mb-2">
//               <ShieldCheck className="w-5 h-5 text-emerald-500" />
//               <div className="text-sm font-medium text-emerald-600">Mitigation Strategy</div>
//             </div>
//             <p className="text-slate-700">{strategy.Mitigation}</p>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const MitigationTimeline = ({ strategies }) => {
//   return (
//     <div className="relative mt-24">
//       {/* Section Header */}
//       <div className="flex items-center gap-4 mb-16 justify-center">
//         <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-md">
//           <Shield className="w-8 h-8 text-indigo-600" />
//         </div>
//         <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
//           Risk Mitigation Timeline
//         </h3>
//       </div>

//       {/* Timeline Content */}
//       <div className="relative px-4">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200" />
        
//         {strategies.map((strategy, index) => (
//           <MitigationTimelineItem 
//             key={index} 
//             strategy={strategy} 
//             index={index}
//             total={strategies.length}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const FlagsDashboard = ({ data }) => {
//   const redFlags = (data?.Risk_Assessment?.Critical_Red_Flags || []).map(flag => ({
//     status: "Critical Flag",
//     description: flag,
//     icon: Activity
//   }));

//   const greenFlags = (data?.Risk_Assessment?.Positive_Green_Flags || []).map(flag => ({
//     status: "Positive Flag",
//     description: flag,
//     icon: ShieldCheck
//   }));

//   const mitigationStrategies = data?.Risk_Assessment?.Potential_Risks_with_Mitigation_Strategies || [];

//   const showRedFirst = redFlags.length >= greenFlags.length;
//   const primaryFlags = showRedFirst ? redFlags : greenFlags;
//   const secondaryFlags = showRedFirst ? greenFlags : redFlags;
//   const secondaryFlagsPart1 = secondaryFlags.slice(0, Math.ceil(secondaryFlags.length / 2));
//   const secondaryFlagsPart2 = secondaryFlags.slice(Math.ceil(secondaryFlags.length / 2));

//   return (
//     <div className="w-full max-w-6xl mx-auto p-8">
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-white/95 rounded-2xl border border-gray-200/50 
//                    shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm p-8"
//       >
//         <div className="absolute inset-0 overflow-hidden">
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//         </div>

//         <div className="space-y-8 relative">
//           {/* Header */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <motion.div
//                 animate={{ 
//                   rotate: [0, 10, -10, 10, 0],
//                 }}
//                 transition={{
//                   duration: 4,
//                   repeat: Infinity,
//                   repeatDelay: 2,
//                 }}
//                 className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 
//                            border border-blue-200/50 shadow-sm"
//               >
//                 <Flag className="w-6 h-6 text-blue-500" strokeWidth={1.5} />
//               </motion.div>
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-800">Status Analysis</h2>
//                 <p className="text-sm text-gray-500">System health and performance indicators</p>
//               </div>
//             </div>

//             <div className="flex gap-2">
//               <IconBadge Icon={Shield} gradient="linear-gradient(45deg, #f87171, #ef4444)" />
//               <IconBadge Icon={Shield} gradient="linear-gradient(45deg, #22c55e, #16a34a)" />
//               <IconBadge Icon={Lock} gradient="linear-gradient(45deg, #6366f1, #4f46e5)" />
//             </div>
//           </div>

//           {/* Main Large Card */}
//           <FlagCard 
//             flags={primaryFlags}
//             title={showRedFirst ? "Critical Attention Points" : "Positive Indicators"}
//             icon={showRedFirst ? AlertCircle : ShieldCheck}
//             isRed={showRedFirst}
//           />

//           {/* Secondary Cards Grid */}
//           <div className="grid md:grid-cols-2 gap-8">
//             <FlagCard 
//               flags={secondaryFlagsPart1}
//               title={!showRedFirst ? "Critical Attention Points" : "Positive Indicators"}
//               icon={!showRedFirst ? AlertCircle : ShieldCheck}
//               isRed={!showRedFirst}
//             />
//             {secondaryFlagsPart2.length > 0 && (
//               <FlagCard 
//                 flags={secondaryFlagsPart2}
//                 title={!showRedFirst ? "Critical Attention Points" : "Positive Indicators"}
//                 icon={!showRedFirst ? AlertCircle : ShieldCheck}
//                 isRed={!showRedFirst}
//               />
//             )}
//           </div>

//           {/* Mitigation Timeline Section */}
//           {mitigationStrategies.length > 0 && (
//             <MitigationTimeline strategies={mitigationStrategies} />
//           )}
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default FlagsDashboard;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Flag, ShieldCheck, ArrowUpRight, Server,
  Lock, AlertCircle, Activity, Users, Target, Settings, Shield,
  Clock, ChevronRight, Zap, BarChart2
} from 'lucide-react';

const IconBadge = ({ Icon, gradient }) => (
  <div className={`relative group`}>
    <div className="absolute inset-0 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"
         style={{ background: gradient }} />
    <div className="relative p-2 bg-white/90 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg">
      <Icon className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
    </div>
  </div>
);

const StatusLine = ({ status, description, icon: Icon, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-start gap-4 group"
    >
      <div className="relative">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          className="relative z-10 bg-white rounded-xl p-2 shadow-lg border border-gray-100"
        >
          <Icon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
        </motion.div>
      </div>

      <div className="flex-1 space-y-2 py-1">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900">{status}</h4>
          <motion.div
            animate={{ 
              x: isHovered ? 0 : 10,
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight className="w-4 h-4 text-gray-500" />
          </motion.div>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const FlagCard = ({ flags, title, icon: Icon, isRed }) => {
  const gradientFrom = isRed ? "#f87171" : "#22c55e";
  const gradientTo = isRed ? "#ef4444" : "#16a34a";
  const borderColor = isRed ? "border-red-100" : "border-green-100";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full p-6 rounded-2xl bg-white/95 border backdrop-blur-sm
                 shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative overflow-hidden
                 ${borderColor}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-10"
           style={{ background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})` }} />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 rounded-xl bg-gradient-to-br shadow-sm`}
               style={{ background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})` }}>
            <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <h3 className="font-semibold text-gray-800">{title}</h3>
        </div>

        <div className="space-y-4">
          {flags.map((flag, index) => (
            <StatusLine key={index} {...flag} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const MitigationTimelineItem = ({ strategy, index, total }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      className="relative mb-16 last:mb-0"
    >
      {/* Connecting Line */}
      {index < total - 1 && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 w-px h-16 bg-gradient-to-b from-indigo-200 to-transparent" />
      )}
      
      {/* Timeline Node */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale: isHovered ? 1.2 : 1 }}
          className="w-8 h-8 rounded-full bg-white border-4 border-indigo-400 shadow-lg z-20 relative"
        />
        <motion.div
          animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.8 : 0.5 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-indigo-400/20 rounded-full"
        />
      </div>

      {/* Content */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Risk Side */}
        <div className="md:text-right md:pr-12">
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-end gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              <div className="text-sm font-medium text-rose-600">Risk Factor</div>
            </div>
            <p className="text-slate-700">{strategy.Risk}</p>
          </motion.div>
        </div>

        {/* Solution Side */}
        <div className="md:pl-12">
          <motion.div 
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <div className="text-sm font-medium text-emerald-600">Mitigation Strategy</div>
            </div>
            <p className="text-slate-700">{strategy.Mitigation}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const MitigationTimeline = ({ strategies }) => {
  return (
    <div className="relative mt-24">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-16 justify-center">
        <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-md">
          <Shield className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="text-2xl font-semibold bg-clip-text text-black-600 mb-4">
          Risk Mitigation Timeline
        </h3>
      </div>

      {/* Timeline Content */}
      <div className="relative px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200" />
        
        {strategies.map((strategy, index) => (
          <MitigationTimelineItem 
            key={index} 
            strategy={strategy} 
            index={index}
            total={strategies.length}
          />
        ))}
      </div>
    </div>
  );
};






const FlagsDashboard = ({ data }) => {
  const redFlags = (data?.Risk_Assessment?.Critical_Red_Flags || []).map(flag => ({
    status: "Critical Flag",
    description: flag,
    icon: Activity
  }));

  const greenFlags = (data?.Risk_Assessment?.Positive_Green_Flags || []).map(flag => ({
    status: "Positive Flag",
    description: flag,
    icon: ShieldCheck
  }));

  const mitigationStrategies = data?.Risk_Assessment?.Potential_Risks_with_Mitigation_Strategies || [];

  const showRedFirst = redFlags.length >= greenFlags.length;
  const primaryFlags = showRedFirst ? redFlags : greenFlags;
  const secondaryFlags = showRedFirst ? greenFlags : redFlags;
  const secondaryFlagsPart1 = secondaryFlags.slice(0, Math.ceil(secondaryFlags.length / 2));
  const secondaryFlagsPart2 = secondaryFlags.slice(Math.ceil(secondaryFlags.length / 2));

  return (
   
    <div className="w-full max-w-6xl mx-auto p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white/95 rounded-2xl border border-gray-200/50 
                   shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm p-8"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="space-y-8 relative">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 
                           border border-blue-200/50 shadow-sm"
              >
                <Flag className="w-6 h-6 text-blue-500" strokeWidth={1.5} />
              </motion.div>
              <div>
                {/* <h2 className="text-xl font-semibold text-gray-800">Status Analysis</h2> */}
                <h2 className="text-xl font-semibold text-gray-800">Risk Assessment </h2>
                <p className="text-sm text-gray-500">System health and performance indicators</p>
              </div>
            </div>

            <div className="flex gap-2">
              <IconBadge Icon={Shield} gradient="linear-gradient(45deg, #f87171, #ef4444)" />
              <IconBadge Icon={Shield} gradient="linear-gradient(45deg, #22c55e, #16a34a)" />
              <IconBadge Icon={Lock} gradient="linear-gradient(45deg, #6366f1, #4f46e5)" />
            </div>
          </div>

          {/* Main Large Card */}
          <FlagCard 
            flags={primaryFlags}
            title={showRedFirst ? "Critical Attention Points" : "Positive Indicators"}
            icon={showRedFirst ? AlertCircle : ShieldCheck}
            isRed={showRedFirst}
          />

          {/* Secondary Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <FlagCard 
              flags={secondaryFlagsPart1}
              title={!showRedFirst ? "Critical Attention Points" : "Positive Indicators"}
              icon={!showRedFirst ? AlertCircle : ShieldCheck}
              isRed={!showRedFirst}
            />
            {secondaryFlagsPart2.length > 0 && (
              <FlagCard 
                flags={secondaryFlagsPart2}
                title={!showRedFirst ? "Critical Attention Points" : "Positive Indicators"}
                icon={!showRedFirst ? AlertCircle : ShieldCheck}
                isRed={!showRedFirst}
              />
            )}
          </div>

          {/* Mitigation Timeline Section */}
          {/* {mitigationStrategies.length > 0 && (
            <MitigationTimeline strategies={mitigationStrategies} />
          )} */}

{/* {mitigationStrategies.length > 0 && (
  <MitigationTimeline strategies={mitigationStrategies} />
)} */}

{mitigationStrategies.length > 0 && (
  <div style={{ breakBefore: 'page' }}>
    <MitigationTimeline strategies={mitigationStrategies} />
   </div>
)}


        </div>
      </motion.div>
    </div>
  );
};

export default FlagsDashboard;