// // Dashboard.tsx
// "use client"
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Users, TrendingUp, Briefcase, Code, Zap } from 'lucide-react';

// // Floating Icon Component
// const FloatingIcon = ({ Icon, color, top, left, delay }) => (
//   <motion.div
//     className="absolute"
//     style={{ top: `${top}%`, left: `${left}%` }}
//     animate={{
//       y: [0, -10, 0],
//       opacity: [0.3, 0.6, 0.3],
//     }}
//     transition={{
//       duration: 3,
//       delay: delay,
//       repeat: Infinity,
//       ease: "easeInOut"
//     }}
//   >
//     <Icon className={`w-6 h-6 ${color}`} />
//   </motion.div>
// );

// // Card Component
// const Card = ({ section, index }) => (
//   <div className="group">
//     <motion.div
//       key={section.title}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       className={`h-full min-w-[300px] p-8 rounded-2xl bg-gradient-to-br ${section.gradient}
//                 border ${section.border} shadow-lg relative overflow-hidden backdrop-blur-sm`}
//     >
//       <div
//         className="absolute inset-0"
//         style={{
//           backgroundImage: `radial-gradient(circle, ${section.accent} 1px, transparent 1px)`,
//           backgroundSize: '16px 16px',
//           opacity: 0.4,
//         }}
//       />
//       <div className="relative z-10">
//         <motion.div
//           className="flex items-center gap-3 mb-4"
//           whileHover={{ x: 10 }}
//           transition={{ type: 'spring', stiffness: 300 }}
//         >
//           <div className={`p-2 rounded-lg bg-gradient-to-br ${section.iconGradient}`}>
//             <section.Icon className="w-6 h-6 text-white" />
//           </div>
//           <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
//         </motion.div>
//         <p className="text-gray-600 leading-relaxed">{section.content}</p>
//       </div>
//     </motion.div>
//   </div>
// );

// const Dashboard = ({ data }) => {
//   // Map the Current_Observation data to sections format
//   const sections = Object.entries(data?.Current_Observation || {}).map(([title, content], index) => {
//     const iconMap = {
//       "Team Structure Analysis": { 
//         Icon: Users, 
//         gradient: "from-blue-50 to-blue-100",
//         accent: "bg-blue-200",
//         border: "border-blue-200",
//         iconGradient: "from-blue-400 to-blue-500"
//       },
//       "Technical Workflow Assessment": { 
//         Icon: Code,
//         gradient: "from-orange-50 to-orange-100",
//         accent: "bg-orange-200",
//         border: "border-orange-200",
//         iconGradient: "from-orange-400 to-orange-500"
//       },
//       "Key Performance Metrics": { 
//         Icon: TrendingUp,
//         gradient: "from-purple-50 to-purple-100",
//         accent: "bg-purple-200",
//         border: "border-purple-200",
//         iconGradient: "from-purple-400 to-purple-500"
//       },
//       "Resource Utilization Insights": { 
//         Icon: Briefcase,
//         gradient: "from-green-50 to-green-100",
//         accent: "bg-green-200",
//         border: "border-green-200",
//         iconGradient: "from-green-400 to-green-500"
//       }
//     };

//     const defaultStyle = {
//       Icon: Briefcase,
//       gradient: "from-gray-50 to-gray-100",
//       accent: "bg-gray-200",
//       border: "border-gray-200",
//       iconGradient: "from-gray-400 to-gray-500"
//     };

//     return {
//       title,
//       content,
//       ...(iconMap[title] || defaultStyle)
//     };
//   });

//   // Floating icons configuration
//   const floatingIcons = [
//     { Icon: Users, color: "text-blue-300", top: 20, left: 15, delay: 0 },
//     { Icon: TrendingUp, color: "text-green-300", top: 30, left: 80, delay: 1 },
//     { Icon: Briefcase, color: "text-purple-300", top: 70, left: 25, delay: 2 },
//     { Icon: Code, color: "text-red-300", top: 60, left: 85, delay: 1.5 },
//   ];

//   // Helper function to get grid configuration based on number of sections
//   const getGridConfig = (totalSections, isSecondRow = false) => {
//     if (isSecondRow) {
//       if (totalSections === 4) return 'grid-cols-1 md:grid-cols-2 md:w-2/3 mx-auto';
//       if (totalSections === 5) return 'grid-cols-1 md:grid-cols-2 md:w-2/3 mx-auto';
//       if (totalSections === 6) return 'grid-cols-1 md:grid-cols-3 w-full';
//       return '';
//     }

//     switch (totalSections) {
//       case 1: return 'grid-cols-1 md:w-1/3 mx-auto';
//       case 2: return 'grid-cols-1 md:grid-cols-2 md:w-2/3 mx-auto';
//       case 3: return 'grid-cols-1 md:grid-cols-3 w-full';
//       case 4: return 'grid-cols-1 md:grid-cols-2 md:w-2/3 mx-auto';
//       case 5:
//       case 6: return 'grid-cols-1 md:grid-cols-3 w-full';
//       default: return 'grid-cols-1';
//     }
//   };

//   // Calculate how many items should be in the first row
//   const getFirstRowCount = (total) => {
//     if (total <= 3) return total;
//     if (total === 4) return 2;
//     return 3;
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-50 pt-32 pb-16 overflow-hidden">
//       {/* Background patterns */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//       </div>
      
//       <div className="absolute inset-0">
//         <div className="absolute inset-0"
//              style={{
//                backgroundImage: 'radial-gradient(circle, #00000005 1px, transparent 1px)',
//                backgroundSize: '24px 24px'
//              }} />
//       </div>

//       {/* Floating Icons */}
//       <div className="absolute inset-0 pointer-events-none">
//         {floatingIcons.map((icon, index) => (
//           <FloatingIcon key={index} {...icon} />
//         ))}
//       </div>

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-16"
//         >
//           <div className="flex items-center justify-center mb-4 space-x-2">
//             <Zap className="w-5 h-5 text-gray-400" />
//             <span className="text-sm text-gray-500 uppercase tracking-widest">
//               Workflow Analysis Dashboard
//             </span>
//             <Zap className="w-5 h-5 text-gray-400" />
//           </div>
//           <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
//             Comprehensive Analysis
//             <br />
//             <span className="text-gray-600">of Team Performance</span>
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Detailed insights into team structure, performance metrics, resource utilization, and technical workflow assessment
//           </p>
//         </motion.div>

//         {/* Cards Layout */}
//         <div className="flex flex-col gap-8">
//           {/* First row */}
//           <div className={`grid gap-8 ${getGridConfig(sections.length)}`}>
//             {sections.slice(0, getFirstRowCount(sections.length)).map((section, index) => (
//               <Card key={section.title} section={section} index={index} />
//             ))}
//           </div>

//           {/* Second row (if needed) */}
//           {sections.length > 3 && (
//             <div className={`grid gap-8 ${getGridConfig(sections.length, true)}`}>
//               {sections.slice(getFirstRowCount(sections.length)).map((section, index) => (
//                 <Card key={section.title} section={section} index={index + getFirstRowCount(sections.length)} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, TrendingUp, Briefcase, Code, Zap,
  BarChart2, FileText, Settings, Target, 
  Clock, Shield, Server, Globe, Database,
  Cpu,  Activity, ArrowUpRight,
  Brain,  CircleDollarSign, Cog,
  FileBarChart, FolderCog, GitCommit, HeartPulse,
  LineChart, Network, Scale, UserCog, 
} from 'lucide-react';

// Array of available icons
const availableIcons = [
  Users, TrendingUp, Briefcase, Code, 
  BarChart2, FileText, Settings, Target,
  Clock, Shield, Server, Globe, Database,
  Cpu, Network, Activity, Brain, 
  CircleDollarSign, Cog, FileBarChart,
  FolderCog, GitCommit, HeartPulse, LineChart,
  Scale, UserCog
];

// Array of color combinations
const colorSchemes = [
  {
    gradient: "from-blue-50 to-blue-100",
    accent: "bg-blue-200",
    border: "border-blue-200",
    iconGradient: "from-blue-400 to-blue-500",
    textColor: "text-blue-600"
  },
  {
    gradient: "from-purple-50 to-purple-100",
    accent: "bg-purple-200",
    border: "border-purple-200",
    iconGradient: "from-purple-400 to-purple-500",
    textColor: "text-purple-600"
  },
  {
    gradient: "from-green-50 to-green-100",
    accent: "bg-green-200",
    border: "border-green-200",
    iconGradient: "from-green-400 to-green-500",
    textColor: "text-green-600"
  },
  {
    gradient: "from-orange-50 to-orange-100",
    accent: "bg-orange-200",
    border: "border-orange-200",
    iconGradient: "from-orange-400 to-orange-500",
    textColor: "text-orange-600"
  },
  {
    gradient: "from-red-50 to-red-100",
    accent: "bg-red-200",
    border: "border-red-200",
    iconGradient: "from-red-400 to-red-500",
    textColor: "text-red-600"
  },
  {
    gradient: "from-indigo-50 to-indigo-100",
    accent: "bg-indigo-200",
    border: "border-indigo-200",
    iconGradient: "from-indigo-400 to-indigo-500",
    textColor: "text-indigo-600"
  },
  {
    gradient: "from-cyan-50 to-cyan-100",
    accent: "bg-cyan-200",
    border: "border-cyan-200",
    iconGradient: "from-cyan-400 to-cyan-500",
    textColor: "text-cyan-600"
  },
  {
    gradient: "from-teal-50 to-teal-100",
    accent: "bg-teal-200",
    border: "border-teal-200",
    iconGradient: "from-teal-400 to-teal-500",
    textColor: "text-teal-600"
  },
  {
    gradient: "from-rose-50 to-rose-100",
    accent: "bg-rose-200",
    border: "border-rose-200",
    iconGradient: "from-rose-400 to-rose-500",
    textColor: "text-rose-600"
  },
  {
    gradient: "from-yellow-50 to-yellow-100",
    accent: "bg-yellow-200",
    border: "border-yellow-200",
    iconGradient: "from-yellow-400 to-yellow-500",
    textColor: "text-yellow-600"
  }
];

// Floating Icon Component
const FloatingIcon = ({ Icon, color, top, left, delay }) => (
  <motion.div
    className="absolute"
    style={{ top: `${top}%`, left: `${left}%` }}
    animate={{
      y: [0, -10, 0],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 3,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <Icon className={`w-6 h-6 ${color}`} />
  </motion.div>
);

// Card Component
// const Card = ({ section, index }) => (
//   <div className="group">
//     <motion.div
//       key={section.title}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       className={`h-full min-w-[300px] p-8 rounded-2xl bg-gradient-to-br ${section.gradient}
//                 border ${section.border} shadow-lg relative overflow-hidden backdrop-blur-sm
//                 hover:shadow-xl transition-all duration-300`}
//     >
//       <div
//         className="absolute inset-0"
//         style={{
//           backgroundImage: `radial-gradient(circle, ${section.accent} 1px, transparent 1px)`,
//           backgroundSize: '16px 16px',
//           opacity: 0.4,
//         }}
//       />
//       <div className="relative z-10">
//         <motion.div
//           className="flex items-center gap-3 mb-4"
//           whileHover={{ x: 10 }}
//           transition={{ type: 'spring', stiffness: 300 }}
//         >
//           <div className={`p-2 rounded-lg bg-gradient-to-br ${section.iconGradient}`}>
//             <section.Icon className="w-6 h-6 text-white" />
//           </div>
//           <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
//         </motion.div>
//         <p className="text-gray-600 leading-relaxed">{section.content}</p>
//       </div>
//     </motion.div>
//   </div>
// );
// const Card = ({ section, index }) => (
//   <div className="group w-full">
//     <motion.div
//       key={section.title}
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: index * 0.1 }}
//       className={`h-full w-full p-8 rounded-2xl bg-gradient-to-br ${section.gradient}
//                 border ${section.border} shadow-lg relative overflow-hidden backdrop-blur-sm
//                 hover:shadow-xl transition-all duration-300`}
//     >
//       <div
//         className="absolute inset-0"
//         style={{
//           backgroundImage: `radial-gradient(circle, ${section.accent} 1px, transparent 1px)`,
//           backgroundSize: '16px 16px',
//           opacity: 0.4,
//         }}
//       />
//       <div className="relative z-10">
//         <motion.div
//           className="flex items-center gap-3 mb-4"
//           whileHover={{ x: 10 }}
//           transition={{ type: 'spring', stiffness: 300 }}
//         >
//           <div className={`p-2 rounded-lg bg-gradient-to-br ${section.iconGradient}`}>
//             <section.Icon className="w-6 h-6 text-white" />
//           </div>
//           <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
//         </motion.div>
//         <p className="text-gray-600 leading-relaxed">{section.content}</p>
//       </div>
//     </motion.div>
//   </div>
// );

const Card = ({ section, index }) => {
  // Convert underscores to spaces in the title
  const formattedTitle = section.title.replace(/_/g, ' ');
  
  return (
    <div className="group w-full">
      <motion.div
        key={formattedTitle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className={`h-full w-full p-8 rounded-2xl bg-gradient-to-br ${section.gradient}
                  border ${section.border} shadow-lg relative overflow-hidden backdrop-blur-sm
                  hover:shadow-xl transition-all duration-300`}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${section.accent} 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
            opacity: 0.4,
          }}
        />
        <div className="relative z-10">
          <motion.div
            className="flex items-center gap-3 mb-4 flex-wrap"
            whileHover={{ x: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={`p-2 rounded-lg bg-gradient-to-br ${section.iconGradient} shrink-0`}>
              <section.Icon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 break-words">{formattedTitle}</h2>
          </motion.div>
          <p className="text-gray-600 leading-relaxed">{section.content}</p>
        </div>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ data }) => {
  // Function to get a deterministic but seemingly random index
  const getConsistentRandomIndex = (str, max) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % max;
  };

  // Map the Current_Observation data to sections format
  const sections = Object.entries(data?.Current_Observation || {}).map(([title, content], index) => {
    // Get consistent indices for icons and colors based on the title
    const iconIndex = getConsistentRandomIndex(title, availableIcons.length);
    const colorIndex = getConsistentRandomIndex(title + 'color', colorSchemes.length);

    return {
      title,
      content,
      Icon: availableIcons[iconIndex],
      ...colorSchemes[colorIndex]
    };
  });

  // Generate floating icons based on the number of sections
  const floatingIcons = sections.slice(0, 4).map((section, index) => ({
    Icon: section.Icon,
    color: section.textColor,
    top: 20 + (index * 15),
    left: 15 + (index * 20),
    delay: index * 0.5
  }));

  // Helper function to get grid configuration based on number of sections
  // const getGridConfig = (totalSections, isSecondRow = false) => {
  //   if (isSecondRow) {
  //     if (totalSections === 4) return 'grid-cols-1 md:grid-cols-2 md:w-2/3 mx-auto';
  //     if (totalSections === 5) return 'grid-cols-1 md:grid-cols-2 md:w-2/3 mx-auto';
  //     if (totalSections === 6) return 'grid-cols-1 md:grid-cols-3 w-full';
  //     return '';
  //   }

  //   switch (totalSections) {
  //     case 1: return 'grid-cols-1 md:w-1/3 mx-auto';
  //     case 2: return 'grid-cols-1 md:grid-cols-2 md:w-2/3 mx-auto';
  //     case 3: return 'grid-cols-1 md:grid-cols-3 w-full';
  //     case 4: return 'grid-cols-1 md:grid-cols-2 md:w-2/3 mx-auto';
  //     case 5:
  //     case 6: return 'grid-cols-1 md:grid-cols-3 w-full';
  //     default: return 'grid-cols-1';
  //   }
  // };
  const getGridConfig = (totalSections, isSecondRow = false) => {
    if (isSecondRow) {
      if (totalSections === 4) return 'grid-cols-1 md:grid-cols-2 w-full';
      if (totalSections === 5) return 'grid-cols-1 md:grid-cols-2 w-full';
      if (totalSections === 6) return 'grid-cols-1 md:grid-cols-3 w-full';
      return '';
    }
    switch (totalSections) {
      case 1: return 'grid-cols-1 w-full';
      case 2: return 'grid-cols-1 md:grid-cols-2 w-full';
      case 3: return 'grid-cols-1 md:grid-cols-3 w-full';
      case 4: return 'grid-cols-1 md:grid-cols-2 w-full';
      case 5:
      case 6: return 'grid-cols-1 md:grid-cols-3 w-full';
      default: return 'grid-cols-1 w-full';
    }
  };

  // Calculate how many items should be in the first row
  const getFirstRowCount = (total) => {
    if (total <= 3) return total;
    if (total === 4) return 2;
    return 3;
  };

  return (
    // <div className="relative min-h-screen bg-gray-50 pt-8 pb-16 overflow-hidden">
    <div className="relative min-h-screen  pt-8 pb-16 overflow-hidden">
      {/* Background patterns */}
      {/* <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="absolute inset-0">
        <div className="absolute inset-0"
             style={{
               backgroundImage: 'radial-gradient(circle, #00000005 1px, transparent 1px)',
               backgroundSize: '24px 24px'
             }} />
      </div> */}

      {/* Floating Icons */}
      {/* <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((icon, index) => (
          <FloatingIcon key={index} {...icon} />
        ))}
      </div> */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4 space-x-2">
            <Zap className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500 uppercase tracking-widest">
              Workflow Analysis Dashboard
            </span>
            <Zap className="w-5 h-5 text-gray-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Comprehensive Analysis
            <br />
            <span className="text-gray-600">of Team Performance</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Detailed insights into team structure, performance metrics, resource utilization, and technical workflow assessment
          </p>
        </motion.div> */}



                         <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.6 }}
                                                className="text-center mb-8 mt-4"
                                              >
                                                <div className="flex items-center justify-center mb-4 space-x-2">
                                                 
                                                  
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
                          Current Observation 
                        
                        
                        </h1>
                 
                                                </div>
                                               
                                              </motion.div>
                       
        {/* Cards Layout */}
        <div className="flex flex-col gap-8">
          {/* First row */}
          <div className={`grid gap-8 ${getGridConfig(sections.length)}`}>
            {sections.slice(0, getFirstRowCount(sections.length)).map((section, index) => (
              <Card key={section.title} section={section} index={index} />
            ))}
          </div>

          {/* Second row (if needed) */}
          {sections.length > 3 && (
            <div className={`grid gap-8 ${getGridConfig(sections.length, true)}`}>
              {sections.slice(getFirstRowCount(sections.length)).map((section, index) => (
                <Card key={section.title} section={section} index={index + getFirstRowCount(sections.length)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;