

"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, TrendingUp, Briefcase, Code,
  Shield, Terminal, Command, Globe, Braces, Cpu, Zap
} from 'lucide-react';

const WorkflowAnalysis = () => {


  return (
    <>
    
    <Dashboard/>

    <QuantitativeAnalysis/>
    {/* <RiskAssessment/> */}
    {/* <FlagsLayout/> */}
    <FlagsDashboard/>
    
    
    <OptimizationDashboard/>
    <FileStructureStrategy />
    {/* <RefinedDashboard/> */}
    
    <PremiumRoadmap/>
    <PerformanceTracking/>
    
    <ExecutiveSummary/>
    </>
  );
};

export default WorkflowAnalysis;
import { useState, useEffect, useRef } from 'react';
import {  useAnimation } from 'framer-motion';
import {  BarChart2 } from 'lucide-react';

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
const Card = ({ section, index }) => (

<div className="group">
  <motion.div
    key={section.title}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className={`h-full min-w-[300px] p-8 rounded-2xl bg-gradient-to-br ${section.gradient}
                border ${section.border} shadow-lg relative overflow-hidden backdrop-blur-sm`}
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
        className="flex items-center gap-3 mb-4"
        whileHover={{ x: 10 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className={`p-2 rounded-lg bg-gradient-to-br ${section.iconGradient}`}>
          <section.Icon className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
      </motion.div>
      <p className="text-gray-600 leading-relaxed">{section.content}</p>
    </div>
  </motion.div>
</div>

);

const Dashboard = () => {
  // Floating icons configuration
  const floatingIcons = [
    { Icon: Users, color: "text-blue-300", top: 20, left: 15, delay: 0 },
    { Icon: BarChart2, color: "text-green-300", top: 30, left: 80, delay: 1 },
    { Icon: Clock, color: "text-purple-300", top: 70, left: 25, delay: 2 },
    { Icon: Target, color: "text-red-300", top: 60, left: 85, delay: 1.5 },
  ];




  const sections = [
    {
      title: "Resource Utilization Insights",
      content: "With no specific tools or team roles mentioned, resource utilization remains vague. However, contract management workflows typically employ lifecycle management software and databases to streamline processes. It's crucial for the team to have a clear understanding of each member's role.",
      Icon: Briefcase,
      gradient: "from-green-50 to-green-100",
      accent: "bg-green-200",
      border: "border-green-200",
      iconGradient: "from-green-400 to-green-500"
    },
    {
      title: "Resource Utilization Insights",
      content: "With no specific tools or team roles mentioned, resource utilization remains vague. However, contract management workflows typically employ lifecycle management software and databases to streamline processes. It's crucial for the team to have a clear understanding of each member's role.",
      Icon: Briefcase,
      gradient: "from-green-50 to-green-100",
      accent: "bg-green-200",
      border: "border-green-200",
      iconGradient: "from-green-400 to-green-500"
    },
    {
      title: "Resource Utilization Insights",
      content: "With no specific tools or team roles mentioned, resource utilization remains vague. However, contract management workflows typically employ lifecycle management software and databases to streamline processes. It's crucial for the team to have a clear understanding of each member's role.",
      Icon: Briefcase,
      gradient: "from-green-50 to-green-100",
      accent: "bg-green-200",
      border: "border-green-200",
      iconGradient: "from-green-400 to-green-500"
    },
    {
      title: "Technical Workflow Assessment",
      content: "The absence of detailed steps beyond the 'Initiation' phase indicates insufficient granularity in the workflow process. Each contract stage, from drafting to execution, is critical and should be integrated with modern technology to enhance throughput and lower error risks.",
      Icon: Code,
      gradient: "from-orange-50 to-orange-100",
      accent: "bg-orange-200",
      border: "border-orange-200",
      iconGradient: "from-orange-400 to-orange-500"
    }
  ];

  // Helper function to get grid configuration based on number of sections
  const getGridConfig = (totalSections, isSecondRow = false) => {
    if (isSecondRow) {
      if (totalSections === 4) return 'grid-cols-1 md:grid-cols-2 md:w-2/3 mx-auto';
      if (totalSections === 5) return 'grid-cols-1 md:grid-cols-2 md:w-2/3 mx-auto';
      if (totalSections === 6) return 'grid-cols-1 md:grid-cols-3 w-full';
      return '';
    }

    switch (totalSections) {
      case 1:
        return 'grid-cols-1 md:w-1/3 mx-auto';
      case 2:
        return 'grid-cols-1 md:grid-cols-2 md:w-2/3 mx-auto';
      case 3:
        return 'grid-cols-1 md:grid-cols-3 w-full';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 md:w-2/3 mx-auto';
      case 5:
      case 6:
        return 'grid-cols-1 md:grid-cols-3 w-full';
      default:
        return 'grid-cols-1';
    }
  };
  // const getGridConfig = (totalSections, isSecondRow = false) => {
  //   if (isSecondRow) {
  //     if (totalSections === 4) return 'grid-cols-1 md:grid-cols-1 w-full'; // One card per row
  //     if (totalSections === 5) return 'grid-cols-1 md:grid-cols-2 w-full'; // Two cards per row
  //     if (totalSections === 6) return 'grid-cols-1 md:grid-cols-2 w-full'; // Two cards per row
  //     return '';
  //   }
  
  //   switch (totalSections) {
  //     case 1:
  //       return 'grid-cols-1 w-full'; // Full width for one card
  //     case 2:
  //       return 'grid-cols-1 md:grid-cols-1 w-full'; // One card per row
  //     case 3:
  //       return 'grid-cols-1 md:grid-cols-2 w-full'; // Two cards per row
  //     case 4:
  //       return 'grid-cols-1 md:grid-cols-2 w-full'; // Two cards per row
  //     case 5:
  //     case 6:
  //       return 'grid-cols-1 md:grid-cols-2 w-full'; // Two cards per row
  //     default:
  //       return 'grid-cols-1';
  //   }
  // };
  

  // Calculate how many items should be in the first row
  const getFirstRowCount = (total) => {
    if (total <= 3) return total;
    if (total === 4) return 2;
    return 3;
  };

  return (
    <div className="relative min-h-screen bg-gray-50 pt-32 pb-16 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="absolute inset-0">
        <div className="absolute inset-0"
             style={{
               backgroundImage: 'radial-gradient(circle, #00000005 1px, transparent 1px)',
               backgroundSize: '24px 24px'
             }} />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((icon, index) => (
          <FloatingIcon key={index} {...icon} />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
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





const analysisData = {
  
  "Comparative Performance Metrics": "Compared to industry benchmarks where advanced automation reduces manual input by 20-30%, this team lags in efficiency, particularly in tasks like drafting and responding to motions, impacting overall case throughput and turnaround times.",
 
  // "Financial Impact Assessment": "The lack of automation and reliance on human resources for repetitive tasks could imply potential financial losses, approximating additional costs in overtime or delayed case resolutions. Potentially, operational costs might be reduced by introducing tech solutions, saving approximately 10-15% in annual legal expenditure.",
  "Financial Impadct Assessment": "The lack of automation and reliance on human resources for repetitive tasks could imply potential financial losses, approximating additional costs in overtime or delayed case resolutions. Potentially, operational costs might be reduced by introducing tech solutions, saving approximately 10-15% in annual legal expenditure.",
  "Financial Impact Assesssment": "The lack of automation and reliance on human resources for repetitive tasks could imply potential financial losses, approximating additional costs in overtime or delayed case resolutions. Potentially, operational costs might be reduced by introducing tech solutions, saving approximately 10-15% in annual legal expenditure.",
};


const AnalysisBox = ({ title, content, isShort = false }) => {
  const number = content.match(/\d+(?:-\d+)?%?/)?.[0] || '?';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative flex flex-col items-start bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-100 group ${isShort ? 'max-w-md' : ''}`}
    >
      <div className="relative mb-4 w-full">
        <div className="bg-gray-200 text-gray-800 w-full px-4 py-2 rounded-md shadow-md group-hover:shadow-lg transition-shadow duration-300">
          <span className="font-bold text-lg">{number}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{content}</p>

      {/* Premium corner accents */}
      <div className="absolute top-0 right-0 w-20 h-20 rounded-tr-2xl 
                   bg-gradient-to-bl from-gray-200/50 to-transparent 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-20 h-20 rounded-bl-2xl 
                   bg-gradient-to-tr from-gray-200/50 to-transparent 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

const QuantitativeAnalysis = () => {
  const analysisEntries = Object.entries(analysisData);
  const numSections = analysisEntries.length;

  return (
    <div className="w-full py-16 bg-gradient-to-br from-gray-50/30 to-gray-100/30 relative overflow-hidden">
      {/* Premium grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Side */}
          <div className="w-full lg:w-1/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-3xl font-bold mb-4 relative inline-block">
                Quantitative Analysis
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gray-500 to-gray-600" />
              </h2>
              <p className="text-lg text-gray-600">
                Key metrics and insights driving operational efficiency
              </p>
            </motion.div>

            {numSections === 2 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="relative rounded-2xl shadow-lg overflow-hidden">
                  <img src="/api/placeholder/400/300" alt="Placeholder" className="w-full" />
                  {/* Premium image overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </motion.div>
            )}

            {numSections > 3 && (
              <>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
                >
                  <div className="relative rounded-2xl shadow-lg overflow-hidden">
                    <img src="/api/placeholder/400/300" alt="Placeholder" className="w-full" />
                    {/* Premium image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </motion.div>
                <AnalysisBox title={analysisEntries[2][0]} content={analysisEntries[2][1]} isShort />
              </>
            )}

            {numSections === 3 && (
              <AnalysisBox title={analysisEntries[2][0]} content={analysisEntries[2][1]} isShort />
            )}
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-2/3">
            <AnalysisBox title={analysisEntries[0][0]} content={analysisEntries[0][1]} />
            <AnalysisBox title={analysisEntries[1][0]} content={analysisEntries[1][1]} />
            {numSections > 3 && (
              <AnalysisBox title={analysisEntries[3][0]} content={analysisEntries[3][1]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};




import { AlertTriangle, CheckCircle,  AlertOctagon, ArrowRight } from 'lucide-react';


import {  AnimatePresence } from 'framer-motion';
import { 
  Flag, ShieldCheck,  ArrowUpRight, Server,  Lock
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
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-10"
           style={{ background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})` }} />
      
      {/* Content */}
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

const FlagsDashboard = () => {
  const redFlags = [
    {
      status: "High Exhaustion Risk",
      description: "Case Intake and Pleadings show exhaustion scores of 5/5, indicating burnout risks.",
      icon: Activity
    },
    {
      status: "Personnel Dependencies",
      description: "Critical operations may stall if key team members are unavailable.",
      icon: Users
    },
    {
      status: "Clear Role Definition",
      description: "Each stage has well-defined roles and responsibilities.",
      icon: Target
    }
  ];

  const greenFlags = [
   
    {
      status: "Tech Integration",
      description: "Successful adoption of Court Docket Management tools.",
      icon: Server
    },
    {
      status: "Process Optimization",
      description: "Streamlined workflow with designated checkpoints.",
      icon: Settings
    }
  ];

  // Determine which flags to show first based on count
  const showRedFirst = redFlags.length >= greenFlags.length;
  const primaryFlags = showRedFirst ? redFlags : greenFlags;
  const secondaryFlags = showRedFirst ? greenFlags : redFlags;

  // Split secondary flags into two groups
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
        {/* Decorative Background */}
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
                <h2 className="text-xl font-semibold text-gray-800">Status Analysis</h2>
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
        </div>
      </motion.div>
    </div>
  );
};





import { Clock, Target, Sparkles, CheckCircle2 } from 'lucide-react';

const PremiumRoadmap = () => {
  const [activePhase, setActivePhase] = useState(null);

  const roadmapData = {
    "Implementation Roadmap": {
      "30 Day Action Plan": "Conduct requirements gathering for a document management system and begin vendor evaluations.",
      "60 Day Action Plan": "Initiate pilot testing of selected tools with a focus group of Associates and Paralegals.",
      "90 Day Action Plan": "Rollout complete software solutions firm-wide, supported by a training program and analytics setup for tracking performance metrics.",
      "Key Milestones": "Software deployment, First report on time savings, Full training completion.",
      "Success Criteria": "Achieving a 30% reduction in document processing times within the first 90 days post-system introduction.",
      "Resource Allocation": "Allocate technological budgets for AI systems, designate cross-functional task teams for implementation oversight."
    }
  };

  const phases = [
    {
      day: "30",
      title: "30 Day Action Plan",
      description: roadmapData["Implementation Roadmap"]["30 Day Action Plan"],
      icon: Clock,
      color: "blue",
      iconColor: "text-blue-500"
    },
    {
      day: "60",
      title: "60 Day Action Plan",
      description: roadmapData["Implementation Roadmap"]["60 Day Action Plan"],
      icon: Sparkles,
      color: "purple",
      iconColor: "text-purple-500"
    },
    {
      day: "90",
      title: "90 Day Action Plan",
      description: roadmapData["Implementation Roadmap"]["90 Day Action Plan"],
      icon: Target,
      color: "emerald",
      iconColor: "text-emerald-500"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 -top-8 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5 blur-3xl" />
          <h1 className="relative text-3xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 mb-6">
            Implementation Roadmap
          </h1>
          <div className="relative flex items-center justify-center gap-3 text-slate-600 bg-white py-3 px-6 rounded-full shadow-lg shadow-slate-200/50 mx-auto w-fit">
            <Target className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium">Success Criteria: {roadmapData["Implementation Roadmap"]["Success Criteria"]}</span>
          </div>
        </div>

        {/* Enhanced Timeline with Flow Animation */}
        <div className="relative mb-20">
          <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-6">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = activePhase === index;
              const isConnected = activePhase !== null && index <= activePhase;
              
              return (
                <div key={index} className="relative flex-1 w-full lg:w-auto">
                  {/* Card */}
                  <div 
                    className="relative w-full"
                    onMouseEnter={() => setActivePhase(index)}
                    onMouseLeave={() => setActivePhase(null)}
                  >
                    <div className={`bg-white rounded-2xl p-6 border transition-all duration-500 hover:border-${phase.color}-200 ${
                      isActive 
                        ? `border-${phase.color}-200 shadow-xl shadow-${phase.color}-100/50 -translate-y-2` 
                        : 'border-slate-200/60 shadow-lg shadow-slate-100/50'
                    }`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-br ${
                          isActive 
                            ? `from-${phase.color}-50 to-${phase.color}-100 scale-110` 
                            : `from-slate-50 to-slate-100/80`
                        }`}>
                          <Icon className={`w-6 h-6 ${isActive ? phase.iconColor : phase.iconColor}`} />
                        </div>
                        <div className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                          isActive 
                            ? `bg-${phase.color}-50 text-${phase.color}-700` 
                            : 'bg-slate-50 text-slate-700'
                        }`}>
                          {phase.title}
                        </div>
                      </div>
                      <p className="text-slate-600 text-base leading-relaxed pl-16">{phase.description}</p>
                    </div>

                    {/* Connecting Lines - Only show on desktop */}
                    {index < phases.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 z-10">
                        <div className="relative h-0.5 w-full">
                          {/* Base Line */}
                          <div className="absolute inset-0 bg-slate-200" />
                          
                          {/* Animated Flow Line */}
                          <div className={`absolute inset-0 transition-transform duration-700 ${
                            isConnected ? 'translate-x-0' : '-translate-x-full'
                          }`}>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500">
                              <div className="absolute inset-0 animate-flow bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestone and Resource Allocation Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Milestone Section */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl p-8 border border-purple-200/60 shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-100/60 transition-all duration-300 h-full">
              <div className="flex items-center gap-6 h-full">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-purple-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">Key Milestones</h3>
                  <p className="text-purple-700 text-lg">{roadmapData["Implementation Roadmap"]["Key Milestones"]}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resource Allocation Section */}
          <div className="relative">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl p-8 border border-emerald-200/50 shadow-lg shadow-emerald-100/50 hover:shadow-xl hover:shadow-emerald-100/60 transition-all duration-300 h-full">
              <div className="flex items-center gap-6 h-full">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-emerald-800 mb-2">Resource Allocation</h3>
                  <p className="text-emerald-700 text-lg">{roadmapData["Implementation Roadmap"]["Resource Allocation"]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add keyframes for the flow animation
const style = document.createElement('style');
style.textContent = `
  @keyframes flow {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-flow {
    animation: flow 2s linear infinite;
  }
`;
document.head.appendChild(style);


import { BarChart3, AlertCircle } from 'lucide-react';

const OptimizationDashboard = () => {
  const data = {
    "Optimization Opportunities": {
      "Actionable Workflow Improvements": [
        "Adopt Document Management Software to automate repetitive tasks like creation and categorization, thus improving processing speeds significantly.",
        "Reallocate task roles, leveraging administrative staff to handle primary document categorization and storage, enabling Associates to focus on complex legal work.",
        "Implement Access Control Systems to enhance security while reducing Partners' involvement in monitoring document activity."
      ],
      "Expected Impact Metrics": "Implementation of these automation and role reallocation strategies should cut down document processing time by at least 40%, with potential cost savings of 25% on annual operational spending.",
      "Implementation Complexity Rating": "Medium—most improvements involve software integration and role adjustments without requiring significant infrastructural changes but necessitate training and change management."
    }
  };

  return (
    <div  className='p-8'>
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 p-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <BarChart3 className="w-6 h-6 text-blue-500" strokeWidth={1.5} />
          <h2 className="text-xl font-semibold text-slate-800">Optimization Opportunities</h2>
        </div>
      </div>

      {/* Layout Container */}
      <div className="space-y-6">
        {/* Full Width Workflow Improvements Box */}
        <div className="w-full p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-blue-100 transition-all duration-300">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-2 rounded-xl bg-blue-50">
              <Zap className="w-5 h-5 text-blue-500" strokeWidth={1.5} />
            </div>
            <h3 className="font-semibold text-lg text-slate-800">Actionable Workflow Improvements</h3>
          </div>
          
          <ul className="space-y-3 pl-12">
            {data["Optimization Opportunities"]["Actionable Workflow Improvements"].map((improvement, index) => (
              <li key={index} className="text-slate-700 flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" strokeWidth={1.5} />
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Two Boxes in One Row */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Expected Impact Metrics Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 border border-green-100 hover:border-green-200 transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-xl bg-green-100">
                <TrendingUp className="w-5 h-5 text-green-600" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-lg text-green-900">Expected Impact Metrics</h3>
            </div>
            <p className="text-green-800">
              {data["Optimization Opportunities"]["Expected Impact Metrics"]}
            </p>
          </div>

          {/* Implementation Complexity Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-100 hover:border-amber-200 transition-all duration-300">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2 rounded-xl bg-amber-100">
                <AlertCircle className="w-5 h-5 text-amber-600" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-lg text-amber-900">Implementation Complexity</h3>
            </div>
            <p className="text-amber-800">
              {data["Optimization Opportunities"]["Implementation Complexity Rating"]}
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

















import {
  ChevronRight,
  FileText,
  Settings,
  DollarSign,
  Package,
  
} from 'lucide-react';

const FileStructureStrategy = () => {
  const data = {
    solutions: [
      {
        "Solution": "Adopt AI-powered contract drafting to reduce errors and increase efficiency.",
        "Cost-Benefit Analysis": "Reduction in drafting time and resource allocation.",
        "Priority Level": "High",
        "Resource Requirements": "Software acquisition and user training."
      },
      {
        "Solution": "Leverage contract analytics for predictive insights.",
        "Cost-Benefit Analysis": "Accelerated decision-making and reduced delays.",
        "Priority Level": "Medium",
        "Resource Requirements": "Analytics software and data specialists."
      }
    ]
  };

  const FileItem = ({ name, content, icon: Icon = FileText }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div className="relative pl-8 group">
        <div className="absolute left-0 top-6 w-8 h-px bg-slate-300"></div>

        <div
          className={`
            border border-slate-200 rounded-lg overflow-hidden transition-all duration-300
            ${isExpanded ? 'shadow-md' : 'hover:shadow-sm'}
          `}
        >
          <div
            className={`
              flex items-center gap-3 cursor-pointer p-3
              ${isExpanded ? 'bg-blue-100' : 'hover:bg-slate-50'}
            `}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="p-2 rounded-lg bg-blue-50">
              <Icon
                className={`w-5 h-5 ${isExpanded ? 'text-blue-600' : 'text-slate-500'}`}
                strokeWidth={1.5}
              />
            </div>
            <span className={`text-sm font-semibold ${isExpanded ? 'text-blue-700' : 'text-slate-700'}`}>
              {name}
            </span>
          </div>

          {isExpanded && (
            <div className="p-4 bg-white animate-slideDown">
              <p className="text-sm text-slate-600 leading-relaxed">{content}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Solution = ({ data, isLast }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const priorityColor = data["Priority Level"] === "High" ? "blue" : "amber";

    return (
      <div className={`relative pl-8 ${!isLast ? 'mb-8' : ''}`}>
        {!isLast && (
          <div className="absolute left-0 top-12 bottom-0 w-px bg-slate-300"></div>
        )}
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-md">
          <div
            className={`
              flex items-center gap-3 cursor-pointer p-4
              bg-gradient-to-r from-white via-slate-50 to-white hover:from-slate-50
              ${isExpanded ? 'shadow-inner' : ''}
            `}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronRight
              className={`w-5 h-5 text-${priorityColor}-500 transition-transform duration-300 
                ${isExpanded ? 'rotate-90' : ''}`}
              strokeWidth={1.5}
            />
            <div className={`p-2 rounded-lg bg-${priorityColor}-50`}>
              <Settings
                className={`w-5 h-5 text-${priorityColor}-600`}
                strokeWidth={1.5}
              />
            </div>
            <span className="text-slate-800 font-medium text-sm">{data.Solution}</span>
            <span className={`
              ml-auto text-xs font-medium px-3 py-1 rounded-full
              bg-${priorityColor}-100 text-${priorityColor}-700
            `}>
              {data["Priority Level"]} Priority
            </span>
          </div>

          {isExpanded && (
            <div className="bg-white">
              <div className="relative ml-12 p-4 space-y-4">
                <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-slate-300 via-slate-200 to-transparent"></div>

                <FileItem
                  name="Cost-Benefit Analysis"
                  content={data["Cost-Benefit Analysis"]}
                  icon={(props) => <DollarSign {...props} />}
                />
                <FileItem
                  name="Resource Requirements"
                  content={data["Resource Requirements"]}
                  icon={(props) => <Package {...props} />}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div  className='p-8'>
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 p-0">
      <div className="relative mb-8">
        <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="p-3 bg-purple-50 rounded-lg">
            <Target className="w-6 h-6 text-purple-500" strokeWidth={1.5} />
          </div>
          <span className="text-lg font-semibold text-slate-900">Strategic Recommendations</span>
        </div>

        <div className="absolute left-8 top-[72px] h-4 w-px bg-slate-300"></div>
      </div>

      <div className="relative pl-8">
        <div className="absolute left-0 top-0 bottom-12 w-px bg-gradient-to-b from-slate-300 via-slate-300 to-transparent"></div>

        {data.solutions.map((solution, index) => (
          <Solution
            key={index}
            data={solution}
            isLast={index === data.solutions.length - 1}
          />
        ))}
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
    </div>
  );
};





import { 
  Activity, Info, TrendingDown, 
} from 'lucide-react';


const AnimatedIcon = ({ Icon, color }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="relative"
  >
    <motion.div
      className={`p-2 rounded-xl bg-white shadow-sm border border-gray-100
                group-hover:scale-110 group-hover:rotate-[360deg] 
                transition-transform duration-500`}
    >
      <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.5} />
    </motion.div>
  </motion.div>
);

const MetricCard = ({ title, index, isActive, onClick }) => {
  const icons = [Target, Clock, BarChart2, Zap];
  const colors = {
    bg: [
      'bg-indigo-50/40',
      'bg-blue-50/40',
      'bg-cyan-50/40',
      'bg-sky-50/40'
    ],
    border: [
      'border-indigo-200/50 hover:border-indigo-400/70',
      'border-blue-200/50 hover:border-blue-400/70',
      'border-cyan-200/50 hover:border-cyan-400/70',
      'border-sky-200/50 hover:border-sky-400/70'
    ],
    icon: [
      'text-indigo-600',
      'text-blue-600',
      'text-cyan-600',
      'text-sky-600'
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`group relative ${colors.bg[index]} rounded-2xl transition-all duration-300 
                 cursor-pointer border-2 ${colors.border[index]}
                 shadow-sm hover:shadow-md backdrop-blur-sm`}
    >
      <div className="relative p-6 h-full">
        <div className="flex items-start justify-between mb-4">
          <AnimatedIcon Icon={icons[index]} color={colors.icon[index]} />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 
                     rounded-full bg-white/80 ${colors.icon[index]} backdrop-blur-sm
                     border border-gray-100`}
          >
            KPI {index + 1}
            <motion.div
              animate={{
                x: isActive ? 0 : -10,
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight className="w-3 h-3" />
            </motion.div>
          </motion.div>
        </div>

        <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
          {title}
        </p>
      </div>
    </motion.div>
  );
};

const InfoCard = ({ icon: Icon, title, description, bgColor, iconColor, borderColor }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${bgColor} border-2 ${borderColor} hover:border-indigo-400/70 rounded-2xl p-6 
                 shadow-sm transition-all duration-300 group backdrop-blur-sm`}
    >
      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <motion.div
              className={`p-3 rounded-xl bg-white shadow-sm border border-gray-100
                        group-hover:scale-110 group-hover:rotate-[360deg] 
                        transition-transform duration-500`}
            >
              <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-800">
            {title}
          </h3>
        </div>
        
        <div className="pl-14 space-y-4">
          <p className="text-sm text-gray-600">
            {description}
          </p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className={`flex items-center gap-2 ${iconColor}`}
          >
            <Info className="w-4 h-4" />
            <span className="text-xs font-medium">Learn More</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const PerformanceTracking = () => {

    const [activeMetric, setActiveMetric] = useState(null);
  
    const performanceData = {
      "KPIs with Baselines": [
        "Document Turnaround Time: Current baseline at 48 hours, target <24 hours.",
        "Role Utilization Metrics: Measure administrative role engagement increase by 40%.",
        "Cost Reduction: Aim to reduce recurrent operational costs by at least 15% in the first year.",
        "Efficiency Optimization: Streamline workflow processes to minimize manual interventions."
      ],
      "Measurement Methodology": "Use an analytics dashboard to capture real-time data on document processing times, role task allocation, and associated costs.",
      "Target Thresholds": "Aim for monthly reviews, targeting performance indicators meeting 90% of revised expectations."
    };
  
    const renderKPIGrid = () => {
      const metrics = performanceData["KPIs with Baselines"];
      
      if (metrics.length === 2) {
        return (
          <div className="grid grid-cols-2 gap-6 place-content-center">
            {metrics.map((metric, index) => (
              <MetricCard 
                key={index} 
                title={metric} 
                index={index}
                isActive={activeMetric === index}
                onClick={() => setActiveMetric(activeMetric === index ? null : index)}
              />
            ))}
          </div>
        );
      }
      
      if (metrics.length === 3) {
        return (
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 grid grid-cols-2 gap-6">
              {metrics.slice(0, 2).map((metric, index) => (
                <MetricCard 
                  key={index} 
                  title={metric} 
                  index={index}
                  isActive={activeMetric === index}
                  onClick={() => setActiveMetric(activeMetric === index ? null : index)}
                />
              ))}
            </div>
            <div className="col-span-2 flex justify-center">
              <div className="w-1/2">
                <MetricCard 
                  title={metrics[2]} 
                  index={2}
                  isActive={activeMetric === 2}
                  onClick={() => setActiveMetric(activeMetric === 2 ? null : 2)}
                />
              </div>
            </div>
          </div>
        );
      }
      
      return (
        <div className="grid grid-cols-2 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard 
              key={index} 
              title={metric} 
              index={index}
              isActive={activeMetric === index}
              onClick={() => setActiveMetric(activeMetric === index ? null : index)}
            />
          ))}
        </div>
      );
    };
  

 
  return (
    <>
   
    
  
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="bg-white/95 rounded-2xl border border-gray-200/50 
                    shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="p-2 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 
                         border border-indigo-200 shadow-sm"
              >
                <Activity className="w-6 h-6 text-indigo-500" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Performance Tracking</h2>
              <p className="text-sm text-gray-500">Monitor and analyze key metrics</p>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="mb-8">
          {renderKPIGrid()}
        </div>

        {/* Info Cards */}
        <div className="space-y-6">
          <InfoCard 
            icon={BarChart2}
            title="Measurement Approach"
            description={performanceData["Measurement Methodology"]}
            bgColor="bg-indigo-50/40"
            iconColor="text-indigo-600"
            borderColor="border-indigo-200/50"
          />
          <InfoCard 
            icon={TrendingDown}
            title="Performance Targets"
            description={performanceData["Target Thresholds"]}
            bgColor="bg-blue-50/40"
            iconColor="text-blue-600"
            borderColor="border-blue-200/50"
          />
        </div>
      </div>
    </motion.div>
    </>
  );
};




import { Compass, BookOpen, Lightbulb } from 'lucide-react';

const executiveData = {
  "Overall Assessment": {
    text: "The current document management workflow within the law firm shows substantial room for efficiency gains through the introduction of automated systems and better role distribution.",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500"
  },
  "Critical Findings": {
    text: "High exhaustion and repetition scores highlight urgent needs for automation and optimized task delegation.",
    icon: Target,
    color: "from-purple-500 to-pink-500"
  },
  "Strategic Direction": {
    text: "Invest strategically in technology and role restructuring to not only enhance current operations but also position the firm competitively in terms of client service efficiency and cost management.",
    icon: Lightbulb,
    color: "from-amber-500 to-orange-500"
  }
};

const AnimatedConnector = ({ startRef, endRef }) => {
  const pathRef = useRef(null);

  useEffect(() => {
    const updatePath = () => {
      if (!startRef.current || !endRef.current || !pathRef.current) return;

      const start = startRef.current.getBoundingClientRect();
      const end = endRef.current.getBoundingClientRect();
      const parentRect = pathRef.current.parentElement.getBoundingClientRect();

      const startX = start.right - parentRect.left;
      const startY = start.top - parentRect.top + start.height / 2;
      const endX = end.left - parentRect.left;
      const endY = end.top - parentRect.top + end.height / 2;

      const middleX = startX + (endX - startX) / 2;
      const controlPoint = 30;

      const path = [
        `M ${startX} ${startY}`,
        `C ${startX + controlPoint} ${startY} ${middleX - controlPoint} ${endY} ${endX} ${endY}`
      ].join(' ');

      pathRef.current.setAttribute('d', path);
    };

    updatePath();
    window.addEventListener('resize', updatePath);
    return () => window.removeEventListener('resize', updatePath);
  }, [startRef, endRef]);

  return (
    <path
      ref={pathRef}
      className="stroke-indigo-500"
      fill="none"
      strokeWidth="2"
      strokeDasharray="4,4"
    />
  );
};

const ExecutiveSummary = () => {
  const [activeSection, setActiveSection] = useState('Overall Assessment');
  const [sectionRefs] = useState({
    "Overall Assessment": { heading: useRef(), content: useRef() },
    "Critical Findings": { heading: useRef(), content: useRef() },
    "Strategic Direction": { heading: useRef(), content: useRef() }
  });

  return (
    <div className="min-h-screen  p-8 flex items-center justify-center">
      <div className="absolute inset-0">
        {/* Primary grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Secondary grid for depth */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:48px_48px] opacity-70" />
        
       
        {/* Soft radial overlay for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] opacity-40" />
        
        {/* Side fades */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/90 to-transparent" />
      </div>
      <div className="bg-white/80 rounded-2xl shadow-2xl p-12 w-full max-w-6xl relative backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-xl shadow-lg">
            <Compass className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Executive Summary</h1>
            <p className="text-gray-500 mt-1">Strategic Overview & Insights</p>
          </div>
        </div>

        <div className="relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {Object.entries(executiveData).map(([section]) => (
              <AnimatedConnector
                key={section}
                startRef={sectionRefs[section].heading}
                endRef={sectionRefs[section].content}
              />
            ))}
          </svg>

          <div className="grid grid-cols-12 gap-16">
            <div className="col-span-4 space-y-8">
              {Object.entries(executiveData).map(([section, data]) => (
                <div
                  key={section}
                  ref={sectionRefs[section].heading}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    activeSection === section
                      ? 'bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg border border-indigo-100'
                      : 'bg-white shadow-md border border-gray-100 hover:border-indigo-100'
                  }`}
                  onClick={() => setActiveSection(section)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors duration-300 bg-gradient-to-br ${data.color} shadow-md`}>
                      {React.createElement(data.icon, {
                        className: "w-5 h-5 text-white"
                      })}
                    </div>
                    <span className={`font-medium ${
                      activeSection === section
                        ? 'text-indigo-900'
                        : 'text-gray-700'
                    }`}>
                      {section}
                    </span>
                    <ChevronRight className={`w-4 h-4 ml-auto transition-transform duration-300 ${
                      activeSection === section
                        ? 'text-indigo-600 rotate-90'
                        : 'text-gray-400'
                    }`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="col-span-8 space-y-6">
              {Object.entries(executiveData).map(([section, data]) => (
                <div
                  key={section}
                  ref={sectionRefs[section].content}
                  className={`p-8 rounded-xl transition-all duration-500 ${
                    activeSection === section
                      ? 'bg-gradient-to-br from-white to-indigo-50 shadow-xl border-2 border-indigo-100 scale-100 opacity-100 transform translate-x-0'
                      : 'bg-white shadow-lg border border-gray-100 opacity-90 scale-95 transform -translate-x-4'
                  }`}
                >
                  <div className="flex gap-4 items-start">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${data.color} shadow-md mt-1`}>
                      {React.createElement(data.icon, {
                        className: "w-5 h-5 text-white"
                      })}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{data.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



// comments 
// import { 
//   ChevronRight,
//   FileText,
//   Settings,

//   DollarSign,
//   Package
// } from 'lucide-react';

// const FileStructureStrategy = () => {
//   const data = {
//     solutions: [
//       {
//         "Solution": "Adopt AI-powered contract drafting to reduce errors and increase efficiency.",
//         "Cost-Benefit Analysis": "Reduction in drafting time and resource allocation.",
//         "Priority Level": "High",
//         "Resource Requirements": "Software acquisition and user training."
//       },
//       {
//         "Solution": "Leverage contract analytics for predictive insights.",
//         "Cost-Benefit Analysis": "Accelerated decision-making and reduced delays.",
//         "Priority Level": "Medium",
//         "Resource Requirements": "Analytics software and data specialists."
//       }
//     ]
//   };

//   const FileItem = ({ name, content, icon: Icon = FileText }) => {
//     const [isExpanded, setIsExpanded] = useState(false);
    
//     return (
//       <div className="relative pl-8 group">
//         {/* Subtle horizontal connector */}
//         <div className="absolute left-0 top-6 w-8 h-px bg-slate-200"></div>
        
//         <div 
//           className={`
//             border border-slate-100 rounded-lg overflow-hidden transition-all duration-300
//             ${isExpanded ? 'shadow-sm' : 'hover:border-blue-100'}
//           `}
//         >
//           <div 
//             className={`
//               flex items-center gap-3 cursor-pointer p-3
//               ${isExpanded ? 'bg-blue-50/30' : 'hover:bg-slate-50'}
//             `}
//             onClick={() => setIsExpanded(!isExpanded)}
//           >
//             <div className="p-1">
//               <Icon 
//                 className={`w-4 h-4 ${isExpanded ? 'text-blue-500' : 'text-slate-400'}`}
//                 strokeWidth={1.5}
//               />
//             </div>
//             <span className={`text-sm font-medium ${isExpanded ? 'text-blue-600' : 'text-slate-600'}`}>
//               {name}
//             </span>
//           </div>
          
//           {isExpanded && (
//             <div className="p-4 bg-white/50">
//               <p className="text-sm text-slate-600 leading-relaxed">{content}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   const Solution = ({ data, isLast }) => {
//     const [isExpanded, setIsExpanded] = useState(true);
//     const priorityColor = data["Priority Level"] === "High" ? "blue" : "amber";
    
//     return (
//       <div className={`relative pl-8 ${!isLast ? 'mb-8' : ''}`}>
//         {/* Main vertical line */}
//         {!isLast && (
//           <div className="absolute left-0 top-12 bottom-0 w-px bg-gradient-to-b from-slate-200 to-slate-100"></div>
//         )}
        
//         {/* Horizontal connector */}
//         <div className="absolute left-0 top-6 w-8 h-px bg-slate-200"></div>

//         <div className="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
//           <div 
//             className={`
//               flex items-center gap-3 cursor-pointer p-3
//               hover:bg-slate-50 bg-white
//               ${isExpanded ? 'bg-gradient-to-r from-slate-50/50 to-white' : ''}
//             `}
//             onClick={() => setIsExpanded(!isExpanded)}
//           >
//             <ChevronRight 
//               className={`w-4 h-4 text-${priorityColor}-400 transition-transform duration-300 
//                 ${isExpanded ? 'rotate-90' : ''}`}
//               strokeWidth={1.5}
//             />
//             <div className={`p-1.5 rounded-lg bg-${priorityColor}-50`}>
//               <Settings 
//                 className={`w-4 h-4 text-${priorityColor}-500`}
//                 strokeWidth={1.5}
//               />
//             </div>
//             <span className="text-slate-700 font-medium text-sm">{data.Solution}</span>
//             <span className={`
//               ml-auto text-xs font-medium px-2.5 py-1 rounded-full
//               bg-${priorityColor}-50 text-${priorityColor}-600
//             `}>
//               {data["Priority Level"]} Priority
//             </span>
//           </div>

//           {isExpanded && (
//             <div className="bg-white/50">
//               <div className="relative ml-12 p-4 space-y-4">
//                 {/* Vertical line for file items */}
//                 <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-slate-200 via-slate-100 to-transparent"></div>
                
//                 <FileItem 
//                   name="Cost-Benefit Analysis"
//                   content={data["Cost-Benefit Analysis"]}
//                   icon={(props) => <DollarSign {...props} />}
//                 />
//                 <FileItem 
//                   name="Resource Requirements"
//                   content={data["Resource Requirements"]}
//                   icon={(props) => <Package {...props} />}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="w-full max-w-6xl  mx-auto bg-white rounded-xl shadow-sm border border-slate-100 p-2">
//       <div className="relative mb-8">
//         <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100">
//           <div className="p-2 bg-purple-50 rounded-lg">
//             <Target className="w-5 h-5 text-purple-500" strokeWidth={1.5} />
//           </div>
//           <span className="text-lg font-medium text-slate-800">Strategic Recommendations</span>
//         </div>
        
//         {/* Vertical line connecting header to first solution */}
//         <div className="absolute left-8 top-[72px] h-4 w-px bg-slate-200"></div>
//       </div>

//       <div className="relative pl-8">
//         {/* Main vertical line */}
//         <div className="absolute left-0 top-0 bottom-12 w-px bg-gradient-to-b from-slate-200 via-slate-200 to-transparent"></div>
        
//         {data.solutions.map((solution, index) => (
//           <Solution 
//             key={index} 
//             data={solution} 
//             isLast={index === data.solutions.length - 1}
//           />
//         ))}
//       </div>

//       <style>{`
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-slideDown {
//           animation: slideDown 0.3s ease-out;
//         }
//       `}</style>
//     </div>
//   );
// };



// const RiskAssessment = () => {
//   const redFlags = [
//     {
//       title: "Over-reliance on Specific Stages",
//       content: "The high repetitiveness in the initiation stage might signify a bottleneck potentially impeding smooth progression to subsequent stages."
//     },
//     {
//       title: "Lack of Role Clarity",
//       content: "The absence of clearly defined roles may lead to overlaps, overburdening specific team members, and decreased productivity."
//     },
//     {
//       title: "Dependency on Manual Tracking",
//       content: "Without automation, there is a risk of increased human error, particularly in repetitive tasks."
//     }
//   ];

//   const greenFlags = [
//     {
//       title: "Potential for Standardization",
//       content: "The high standardization at initiation indicates an opportunity to further streamline processes across other stages."
//     },
//     {
//       title: "Current Use of Digital Tools",
//       content: "Despite a lack of specificity, the potential use of digital tools suggests preliminary steps towards technological adoption."
//     }
//   ];

//   const mitigationStrategies = [
//     {
//       risk: "High Repetition Leading to Burnout",
//       mitigation: "Introduce automation tools for repetitive tasks to reduce workload."
//     },
//     {
//       risk: "Poor Communication Leading to Redundancy",
//       mitigation: "Implement structured communication protocols and check-in meetings to ensure alignment."
//     },
//     {
//       risk: "Inconsistent Contract Handling",
//       mitigation: "Develop standardized templates and training modules for team members."
//     }
//   ];

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Premium Title Section */}
//         <div className="relative mb-24 text-center">
//           <div className="absolute inset-0 flex items-center justify-center opacity-5">
//             <Shield className="w-64 h-64 text-indigo-900" />
//           </div>
//           <h2 className="relative text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
//             Risk Assessment Matrix
//           </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
//         </div>

//         {/* Enhanced Flags Section */}
//         <div className="relative mb-32">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             {/* Premium Red Flags Box */}
//             <div className="relative group">
//               <div className="absolute inset-0 bg-gradient-to-br from-rose-200 to-purple-200 rounded-3xl transform rotate-1 transition-transform group-hover:rotate-2" />
//               <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-rose-100">
//                 <div className="flex items-center gap-4 mb-8">
//                   <div className="p-3 bg-rose-100 rounded-xl">
//                     <AlertOctagon className="w-8 h-8 text-rose-600" />
//                   </div>
//                   <h3 className="text-2xl font-semibold text-rose-700">Critical Concerns</h3>
//                 </div>
//                 <div className="space-y-6">
//                   {redFlags.map((flag, index) => (
//                     <div key={index} className="relative transform transition-all hover:-translate-y-1">
//                       <div className="bg-gradient-to-br from-rose-50 to-rose-100/50 rounded-xl p-6 shadow-sm">
//                         <h4 className="text-lg font-medium text-rose-700 mb-3 flex items-center gap-2">
//                           <span className="w-2 h-2 bg-rose-500 rounded-full" />
//                           {flag.title}
//                         </h4>
//                         <p className="text-slate-700">{flag.content}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Premium Green Flags Box */}
//             <div className="relative group">
//               <div className="absolute inset-0 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-3xl transform -rotate-1 transition-transform group-hover:-rotate-2" />
//               <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-emerald-100">
//                 <div className="flex items-center gap-4 mb-8">
//                   <div className="p-3 bg-emerald-100 rounded-xl">
//                     <CheckCircle className="w-8 h-8 text-emerald-600" />
//                   </div>
//                   <h3 className="text-2xl font-semibold text-emerald-700">Positive Indicators</h3>
//                 </div>
//                 <div className="space-y-6">
//                   {greenFlags.map((flag, index) => (
//                     <div key={index} className="relative transform transition-all hover:-translate-y-1">
//                       <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-6 shadow-sm">
//                         <h4 className="text-lg font-medium text-emerald-700 mb-3 flex items-center gap-2">
//                           <span className="w-2 h-2 bg-emerald-500 rounded-full" />
//                           {flag.title}
//                         </h4>
//                         <p className="text-slate-700">{flag.content}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Premium Strategy Timeline Section */}
//         <div className="relative">
//           <div className="flex items-center gap-4 mb-16 justify-center">
//             <div className="p-3 bg-indigo-100 rounded-xl">
//               <Shield className="w-8 h-8 text-indigo-600" />
//             </div>
//             <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
//               Mitigation Strategies
//             </h3>
//           </div>
//           <div className="relative">
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-indigo-200 via-purple-200 to-pink-200 rounded-full" />
//             {mitigationStrategies.map((strategy, index) => (
//               <div key={index} className="relative mb-24 last:mb-0">
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-purple-400 shadow-lg" />
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-400/20 rounded-full animate-pulse" />
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   <div className="md:text-right pr-12 group">
//                     <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl p-6 shadow-lg transform transition-transform group-hover:-translate-y-1">
//                       <div className="text-sm font-medium text-rose-600 mb-2">Risk Factor</div>
//                       <p className="text-slate-700">{strategy.risk}</p>
//                     </div>
//                   </div>
//                   <div className="pl-12 group">
//                     <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-lg transform transition-transform group-hover:-translate-y-1">
//                       <div className="text-sm font-medium text-emerald-600 mb-2">Solution</div>
//                       <p className="text-slate-700">{strategy.mitigation}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };




// import {  Flag, ShieldCheck } from 'lucide-react';

// const FlagsDashboard = () => {
//   const redFlags = [
//     "High Exhaustion Levels: Case Intake and Pleadings show exhaustion scores of 5/5, indicating risks of burnout and error proliferation.",
//     "Over-dependence on Personnel: A small team faces critical risks if any member is unavailable, potentially stalling operations.",
   
//   ];

//   const greenFlags = [
//     "Over-dependence on Personnel: A small team faces critical risks if any member is unavailable, potentially stalling operations.",
//     "Roles Clearly Defined: Each stage has designated roles, showcasing clarity in task assignment.",
//     "Court Docket Management Tool Usage: Indicates an openness to technological solutions, which can be a foundation for further integration."
//   ];

//   // Determine which flags to show first based on count
//   const showRedFirst = redFlags.length >= greenFlags.length;
//   const primaryFlags = showRedFirst ? redFlags : greenFlags;
//   const secondaryFlags = showRedFirst ? greenFlags : redFlags;

//   // Calculate grid layout for secondary flags
//   const getGridCols = (length) => {
//     if (length <= 3) return 'md:grid-cols-' + length;
//     return 'md:grid-cols-2';
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 p-8">
//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center gap-3 mb-3">
//           <Flag className="w-6 h-6 text-blue-500" strokeWidth={1.5} />
//           <h2 className="text-xl font-semibold text-slate-800">Status Flags Analysis</h2>
//         </div>
//       </div>

//       {/* Primary Flags Section */}
//       <div className="space-y-6">
//         <div className="w-full p-6 rounded-2xl bg-gradient-to-br border transition-all duration-300"
//           className={showRedFirst ? 
//             "from-red-50 to-red-100/50 border-red-100 hover:border-red-200" :
//             "from-green-50 to-green-100/50 border-green-100 hover:border-green-200"
//           }>
//           <div className="flex items-start gap-4 mb-4">
//             <div className={`p-2 rounded-xl ${showRedFirst ? 'bg-red-100' : 'bg-green-100'}`}>
//               {showRedFirst ? 
//                 <AlertCircle className="w-5 h-5 text-red-600" strokeWidth={1.5} /> :
//                 <ShieldCheck className="w-5 h-5 text-green-600" strokeWidth={1.5} />
//               }
//             </div>
//             <h3 className={`font-semibold text-lg ${showRedFirst ? 'text-red-900' : 'text-green-900'}`}>
//               {showRedFirst ? 'Critical Red Flags' : 'Positive Green Flags'}
//             </h3>
//           </div>
          
//           <ul className="space-y-3 pl-12">
//             {primaryFlags.map((flag, index) => (
//               <li key={index} className={`${showRedFirst ? 'text-red-700' : 'text-green-700'} flex items-start gap-3`}>
//                 <span>{flag}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Secondary Flags Grid */}
//         <div className={`grid ${getGridCols(secondaryFlags.length)} gap-6`}>
//           {secondaryFlags.map((flag, index) => (
//             <div key={index} 
//               className={`p-6 rounded-2xl bg-gradient-to-br border transition-all duration-300 ${
//                 showRedFirst ? 
//                 'from-green-50 to-green-100/50 border-green-100 hover:border-green-200' :
//                 'from-red-50 to-red-100/50 border-red-100 hover:border-red-200'
//               }`}>
//               <div className="flex items-start gap-4 mb-4">
//                 <div className={`p-2 rounded-xl ${showRedFirst ? 'bg-green-100' : 'bg-red-100'}`}>
//                   {showRedFirst ? 
//                     <ShieldCheck className="w-5 h-5 text-green-600" strokeWidth={1.5} /> :
//                     <AlertCircle className="w-5 h-5 text-red-600" strokeWidth={1.5} />
//                   }
//                 </div>
//                 <h3 className={`font-semibold text-lg ${showRedFirst ? 'text-green-900' : 'text-red-900'}`}>
//                   {showRedFirst ? 'Positive Flag' : 'Critical Flag'}
//                 </h3>
//               </div>
//               <p className={showRedFirst ? 'text-green-800' : 'text-red-800'}>
//                 {flag}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// import {  AnimatePresence } from 'framer-motion';
// import { 
//   Flag, ShieldCheck, ArrowUpRight, 
//  FileCheck, Server,
//   Focus,  Lock
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
//       {/* Connecting Line */}
//       <div className="absolute left-6 top-8 bottom-0 w-px bg-gradient-to-b from-gray-200 to-transparent" />
      
//       <div className="relative">
//         <motion.div
//           animate={{ scale: isHovered ? 1.1 : 1 }}
//           className="relative z-10 bg-white rounded-xl p-2 shadow-lg border border-gray-100"
//         >
//           <Icon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
//         </motion.div>
//       </div>

//       <div className="flex-1 space-y-2 pt-1 pb-8">
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

// const FlagsDashboard = () => {
//   const flagsData = {
//     critical: [
//       {
//         status: "High Exhaustion Risk",
//         description: "Case Intake and Pleadings show exhaustion scores of 5/5, indicating burnout risks.",
//         icon: Activity
//       },
//       {
//         status: "Personnel Dependencies",
//         description: "Critical operations may stall if key team members are unavailable.",
//         icon: Users
//       }
//     ],
//     positive: [
//       {
//         status: "Clear Role Definition",
//         description: "Each stage has well-defined roles and responsibilities.",
//         icon: Target
//       },
//       {
//         status: "Tech Integration",
//         description: "Successful adoption of Court Docket Management tools.",
//         icon: Server
//       },
//       {
//         status: "Process Optimization",
//         description: "Streamlined workflow with designated checkpoints.",
//         icon: Settings
//       }
//     ]
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto">
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="relative bg-white/95 rounded-2xl border border-gray-200/50 
//                    shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm p-8"
//       >
//         {/* Decorative Background */}
//         <div className="absolute inset-0 overflow-hidden rounded-2xl">
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//           <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-red-50/30 to-transparent rotate-12 transform origin-top-right" />
//           <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-green-50/30 to-transparent -rotate-12 transform origin-bottom-left" />
//         </div>

//         {/* Content */}
//         <div className="relative z-10">
//           {/* Header */}
//           <div className="flex items-center justify-between mb-12">
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

//           {/* Main Grid */}
//           <div className="grid md:grid-cols-2 gap-8">
//             {/* Critical Flags */}
//             <div className="space-y-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-2 rounded-xl bg-gradient-to-br from-red-50 to-red-100/50 
//                               border border-red-200/30 shadow-sm">
//                   <AlertCircle className="w-5 h-5 text-red-500" strokeWidth={1.5} />
//                 </div>
//                 <h3 className="font-semibold text-gray-800">Critical Attention Points</h3>
//               </div>
              
//               <div className="relative">
//                 {flagsData.critical.map((flag, index) => (
//                   <StatusLine key={index} {...flag} index={index} />
//                 ))}
//               </div>
//             </div>

//             {/* Positive Flags */}
//             <div className="space-y-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-2 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 
//                               border border-green-200/30 shadow-sm">
//                   <ShieldCheck className="w-5 h-5 text-green-500" strokeWidth={1.5} />
//                 </div>
//                 <h3 className="font-semibold text-gray-800">Positive Indicators</h3>
//               </div>
              
//               <div className="relative">
//                 {flagsData.positive.map((flag, index) => (
//                   <StatusLine key={index} {...flag} index={index} />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };







// import {  AnimatePresence } from 'framer-motion';
// import { 
//   Flag, ShieldCheck, ArrowUpRight, 
//   FileCheck, Server,
//   Focus,  Lock
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

// const FlagCard = ({ flags, title, icon: Icon, gradientFrom, gradientTo, borderColor }) => {
//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className={`w-full p-6 rounded-2xl bg-white/95 border backdrop-blur-sm
//                  shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative overflow-hidden
//                  ${borderColor}`}
//     >
//       {/* Background Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br opacity-10"
//            style={{ background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})` }} />
      
//       {/* Content */}
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

// const FlagsDashboard = () => {
//   const flagsData = {
//     critical: [
//       {
//         status: "High Exhaustion Risk",
//         description: "Case Intake and Pleadings show exhaustion scores of 5/5, indicating burnout risks.",
//         icon: Activity
//       },
//       {
//         status: "Personnel Dependencies",
//         description: "Critical operations may stall if key team members are unavailable.",
//         icon: Users
//       }
//     ],
//     positive: [
//       {
//         status: "Clear Role Definition",
//         description: "Each stage has well-defined roles and responsibilities.",
//         icon: Target
//       },
//       {
//         status: "Tech Integration",
//         description: "Successful adoption of Court Docket Management tools.",
//         icon: Server
//       },
//       {
//         status: "Process Optimization",
//         description: "Streamlined workflow with designated checkpoints.",
//         icon: Settings
//       }
//     ]
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto">
//       <div className="space-y-8">
//         {/* Header */}
//         <motion.div 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="bg-white/95 rounded-2xl border border-gray-200/50 
//                      shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm p-8"
//         >
//           <div className="relative">
//             {/* Decorative Background */}
//             <div className="absolute inset-0 overflow-hidden">
//               <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//             </div>

//             {/* Header Content */}
//             <div className="relative z-10 flex items-center justify-between mb-8">
//               <div className="flex items-center gap-3">
//                 <motion.div
//                   animate={{ 
//                     rotate: [0, 10, -10, 10, 0],
//                   }}
//                   transition={{
//                     duration: 4,
//                     repeat: Infinity,
//                     repeatDelay: 2,
//                   }}
//                   className="p-2 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 
//                              border border-blue-200/50 shadow-sm"
//                 >
//                   <Flag className="w-6 h-6 text-blue-500" strokeWidth={1.5} />
//                 </motion.div>
//                 <div>
//                   <h2 className="text-xl font-semibold text-gray-800">Status Analysis</h2>
//                   <p className="text-sm text-gray-500">System health and performance indicators</p>
//                 </div>
//               </div>

//               <div className="flex gap-2">
//                 <IconBadge Icon={Shield} gradient="linear-gradient(45deg, #f87171, #ef4444)" />
//                 <IconBadge Icon={Shield} gradient="linear-gradient(45deg, #22c55e, #16a34a)" />
//                 <IconBadge Icon={Lock} gradient="linear-gradient(45deg, #6366f1, #4f46e5)" />
//               </div>
//             </div>

//             {/* Main Large Card */}
//             <FlagCard 
//               flags={flagsData.critical}
//               title="Critical Attention Points"
//               icon={AlertCircle}
//               gradientFrom="#f87171"
//               gradientTo="#ef4444"
//               borderColor="border-red-100"
//             />
//           </div>
//         </motion.div>

//         {/* Secondary Cards Grid */}
//         <div className="grid md:grid-cols-2 gap-8">
//           <FlagCard 
//             flags={flagsData.positive.slice(0, 2)}
//             title="Primary Indicators"
//             icon={ShieldCheck}
//             gradientFrom="#22c55e"
//             gradientTo="#16a34a"
//             borderColor="border-green-100"
//           />
//           <FlagCard 
//             flags={flagsData.positive.slice(2)}
//             title="Additional Indicators"
//             icon={Target}
//             gradientFrom="#6366f1"
//             gradientTo="#4f46e5"
//             borderColor="border-blue-100"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };





// import { 
//   Activity, 
//   Info,
//   TrendingDown 
// } from 'lucide-react';

// const PerformanceTracking = () => {
//   const [activeMetric, setActiveMetric] = useState(null);

//   const performanceData = {
//     "KPIs with Baselines": [
//       "Document Turnaround Time: Current baseline at 48 hours, target <24 hours.",
//       "Role Utilization Metrics: Measure administrative role engagement increase by 40%.",
//       "Cost Reduction: Aim to reduce recurrent operational costs by at least 15% in the first year.",
//       "Efficiency Optimization: Streamline workflow processes to minimize manual interventions."
//     ],
//     "Measurement Methodology": "Use an analytics dashboard to capture real-time data on document processing times, role task allocation, and associated costs.",
//     "Target Thresholds": "Aim for monthly reviews, targeting performance indicators meeting 90% of revised expectations."
//   };

//   const MetricCard = ({ title, index }) => {
//     const icons = [Target, Clock, BarChart2, Zap];
//     return (
//       <div 
//         className={`
//           group relative bg-white rounded-2xl transition-all duration-300 cursor-pointer
//           shadow-md hover:shadow-xl
//         `}
//         onClick={() => setActiveMetric(activeMetric === index ? null : index)}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-800 to-blue-900 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
//         <div className="relative h-full p-6">
//           <div className="flex items-start justify-between mb-4">
//             <div className={`
//               p-2 rounded-xl transition-colors duration-300
//               bg-slate-100 group-hover:bg-white/10
//             `}>
//               {React.createElement(icons[index], {
//                 className: `w-5 h-5 text-slate-600 group-hover:text-white transition-colors duration-300`,
//                 strokeWidth: 1.5
//               })}
//             </div>
//             <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:text-white group-hover:bg-white/10 transition-colors duration-300">
//               KPI {index + 1}
//             </span>
//           </div>

//           <p className="text-sm text-slate-700 group-hover:text-white transition-colors duration-300">
//             {title}
//           </p>
//         </div>
//       </div>
//     );
//   };

//   const renderKPIGrid = () => {
//     const metrics = performanceData["KPIs with Baselines"];
    
//     if (metrics.length === 2) {
//       return (
//         <div className="grid grid-cols-2 gap-4 place-content-center">
//           {metrics.map((metric, index) => (
//             <MetricCard key={index} title={metric} index={index} />
//           ))}
//         </div>
//       );
//     }
    
//     if (metrics.length === 3) {
//       return (
//         <div className="grid grid-cols-2 gap-4">
//           <div className="col-span-2 grid grid-cols-2 gap-4">
//             {metrics.slice(0, 2).map((metric, index) => (
//               <MetricCard key={index} title={metric} index={index} />
//             ))}
//           </div>
//           <div className="col-span-2 flex justify-center">
//             <div className="w-1/2">
//               <MetricCard title={metrics[2]} index={2} />
//             </div>
//           </div>
//         </div>
//       );
//     }
    
//     return (
//       <div className="grid grid-cols-2 gap-4">
//         {metrics.map((metric, index) => (
//           <MetricCard key={index} title={metric} index={index} />
//         ))}
//       </div>
//     );
//   };

//   return (

//     <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-slate-50 to-white rounded-3xl">
//       <div className="flex items-center gap-3 mb-8">
//         <Activity className="w-6 h-6 text-blue-500" strokeWidth={1.5} />
//         <h2 className="text-2xl font-bold text-slate-800">Performance Tracking</h2>
//       </div>

//       <div className="mb-8">
//         {renderKPIGrid()}
//       </div>

    
//       <div className="space-y-6">
//         <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="bg-blue-50 p-3 rounded-xl">
//               <BarChart2 className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
//             </div>
//             <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
//               Measurement Approach
//             </h3>
//           </div>
//           <div className="pl-14">
//             <p className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
//               {performanceData["Measurement Methodology"]}
//             </p>
//             <div className="mt-4 flex items-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
//               <Info className="w-4 h-4" />
//               <span className="text-xs font-medium">Learn More</span>
//             </div>
//           </div>
//         </div>
//         <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
//           <div className="flex items-center gap-4 mb-4">
//             <div className="bg-green-50 p-3 rounded-xl">
//               <TrendingDown className="w-6 h-6 text-green-600" strokeWidth={1.5} />
//             </div>
//             <h3 className="text-lg font-semibold text-slate-800 group-hover:text-green-600 transition-colors">
//               Performance Targets
//             </h3>
//           </div>
//           <div className="pl-14">
//             <p className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
//               {performanceData["Target Thresholds"]}
//             </p>
//             <div className="mt-4 flex items-center gap-2 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
//               <Info className="w-4 h-4" />
//               <span className="text-xs font-medium">Learn More</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// import { 
//   Activity, Info, TrendingDown, 
// } from 'lucide-react';

// const IconBadgee = ({ Icon, gradient, className }) => (
//   <div className={`relative group ${className}`}>
//     <div className="absolute inset-0 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"
//          style={{ background: gradient }} />
//     <div className="relative p-3 bg-white/90 rounded-xl backdrop-blur-sm border border-white/20 shadow-lg">
//       <Icon className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
//     </div>
//   </div>
// );

// const MetricCard = ({ title, index, isActive, onClick }) => {
//   const icons = [Target, Clock, BarChart2, Zap];
//   const gradients = [
//     "from-indigo-500 via-purple-500 to-pink-500",
//     "from-cyan-500 via-blue-500 to-purple-500",
//     "from-green-500 via-emerald-500 to-teal-500",
//     "from-orange-500 via-amber-500 to-yellow-500"
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1 }}
//       onClick={onClick}
//       className="group relative bg-white rounded-2xl transition-all duration-300 cursor-pointer
//                  border border-gray-100 overflow-hidden"
//     >
//       {/* Gradient Background */}
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br"
//            style={{ background: `linear-gradient(to bottom right, ${gradients[index].split(' ')[0].replace('from-', '')}, ${gradients[index].split(' ')[2].replace('to-', '')})` }} />
      
//       {/* Grid Pattern */}
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//       </div>

//       <div className="relative p-6 h-full">
//         <div className="flex items-start justify-between mb-4">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="p-2 rounded-xl bg-gray-50 group-hover:bg-white/90 
//                      transition-colors duration-300 shadow-sm group-hover:shadow-md"
//           >
//             {React.createElement(icons[index], {
//               className: `w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-300`,
//               strokeWidth: 1.5
//             })}
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full
//                      bg-gray-50 text-gray-600 group-hover:bg-white/90 group-hover:text-gray-800
//                      transition-colors duration-300"
//           >
//             KPI {index + 1}
//             <motion.div
//               animate={{
//                 x: isActive ? 0 : -10,
//                 opacity: isActive ? 1 : 0,
//               }}
//               transition={{ duration: 0.2 }}
//             >
//               <ArrowUpRight className="w-3 h-3" />
//             </motion.div>
//           </motion.div>
//         </div>

//         <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
//           {title}
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// const InfoCard = ({ icon: Icon, title, description, gradient, hoverColor }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg 
//                  transition-all duration-300 relative overflow-hidden group"
//     >
//       {/* Gradient Background */}
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
//            style={{ background: gradient }} />
      
//       {/* Grid Pattern */}
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />
//       </div>

//       <div className="relative">
//         <div className="flex items-center gap-4 mb-4">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className={`p-3 rounded-xl transition-colors duration-300
//                      ${isHovered ? hoverColor : 'bg-gray-50'}`}
//           >
//             <Icon className={`w-6 h-6 ${isHovered ? 'text-white' : 'text-gray-600'} 
//                           transition-colors duration-300`} strokeWidth={1.5} />
//           </motion.div>
//           <h3 className={`text-lg font-semibold transition-colors duration-300
//                        ${isHovered ? hoverColor.replace('bg-', 'text-').replace('-50', '-600') : 'text-gray-800'}`}>
//             {title}
//           </h3>
//         </div>
        
//         <div className="pl-14 space-y-4">
//           <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
//             {description}
//           </p>
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: isHovered ? 1 : 0 }}
//             className={`flex items-center gap-2 ${hoverColor.replace('bg-', 'text-').replace('-50', '-600')}`}
//           >
//             <Info className="w-4 h-4" />
//             <span className="text-xs font-medium">Learn More</span>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const PerformanceTracking = () => {
//   const [activeMetric, setActiveMetric] = useState(null);

//   const performanceData = {
//     "KPIs with Baselines": [
//       "Document Turnaround Time: Current baseline at 48 hours, target <24 hours.",
//       "Role Utilization Metrics: Measure administrative role engagement increase by 40%.",
//       "Cost Reduction: Aim to reduce recurrent operational costs by at least 15% in the first year.",
//       "Efficiency Optimization: Streamline workflow processes to minimize manual interventions."
//     ],
//     "Measurement Methodology": "Use an analytics dashboard to capture real-time data on document processing times, role task allocation, and associated costs.",
//     "Target Thresholds": "Aim for monthly reviews, targeting performance indicators meeting 90% of revised expectations."
//   };

//   const renderKPIGrid = () => {
//     const metrics = performanceData["KPIs with Baselines"];
    
//     if (metrics.length === 2) {
//       return (
//         <div className="grid grid-cols-2 gap-6 place-content-center">
//           {metrics.map((metric, index) => (
//             <MetricCard 
//               key={index} 
//               title={metric} 
//               index={index}
//               isActive={activeMetric === index}
//               onClick={() => setActiveMetric(activeMetric === index ? null : index)}
//             />
//           ))}
//         </div>
//       );
//     }
    
//     if (metrics.length === 3) {
//       return (
//         <div className="grid grid-cols-2 gap-6">
//           <div className="col-span-2 grid grid-cols-2 gap-6">
//             {metrics.slice(0, 2).map((metric, index) => (
//               <MetricCard 
//                 key={index} 
//                 title={metric} 
//                 index={index}
//                 isActive={activeMetric === index}
//                 onClick={() => setActiveMetric(activeMetric === index ? null : index)}
//               />
//             ))}
//           </div>
//           <div className="col-span-2 flex justify-center">
//             <div className="w-1/2">
//               <MetricCard 
//                 title={metrics[2]} 
//                 index={2}
//                 isActive={activeMetric === 2}
//                 onClick={() => setActiveMetric(activeMetric === 2 ? null : 2)}
//               />
//             </div>
//           </div>
//         </div>
//       );
//     }
    
//     return (
//       <div className="grid grid-cols-2 gap-6">
//         {metrics.map((metric, index) => (
//           <MetricCard 
//             key={index} 
//             title={metric} 
//             index={index}
//             isActive={activeMetric === index}
//             onClick={() => setActiveMetric(activeMetric === index ? null : index)}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="w-full max-w-6xl mx-auto"
//     >
//       <div className="bg-white/95 rounded-2xl border border-gray-200/50 
//                     shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm p-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8 relative z-10">
//           <div className="flex items-center gap-3">
//             <motion.div
//               animate={{ 
//                 rotate: [0, 10, -10, 10, 0],
//               }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//                 repeatDelay: 2,
//               }}
//               className="p-2 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-100 
//                        border border-indigo-200/50 shadow-sm"
//             >
//               <Activity className="w-6 h-6 text-indigo-500" strokeWidth={1.5} />
//             </motion.div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">Performance Tracking</h2>
//               <p className="text-sm text-gray-500">Monitor and analyze key metrics</p>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <IconBadge Icon={Shield} gradient="linear-gradient(45deg, #818cf8, #6366f1)" />
//             <IconBadge Icon={Server} gradient="linear-gradient(45deg, #34d399, #10b981)" />
//             <IconBadge Icon={Settings} gradient="linear-gradient(45deg, #fb923c, #f97316)" />
//           </div>
//         </div>

//         {/* KPI Grid */}
//         <div className="mb-8">
//           {renderKPIGrid()}
//         </div>

//         {/* Info Cards */}
//         <div className="space-y-6">
//           <InfoCard 
//             icon={BarChart2}
//             title="Measurement Approach"
//             description={performanceData["Measurement Methodology"]}
//             gradient="linear-gradient(45deg, #818cf8, #6366f1)"
//             hoverColor="bg-indigo-50"
//           />
//           <InfoCard 
//             icon={TrendingDown}
//             title="Performance Targets"
//             description={performanceData["Target Thresholds"]}
//             gradient="linear-gradient(45deg, #34d399, #10b981)"
//             hoverColor="bg-green-50"
//           />
//         </div>
//       </div>
//     </motion.div>
//   );
// };




// import { 
//   Activity, Info, TrendingDown, 
// } from 'lucide-react';


// const MetricCard = ({ title, index, isActive, onClick }) => {
//   const icons = [Target, Clock, BarChart2, Zap];
//   const softColors = {
//     bg: [
//       'bg-indigo-50/50',
//       'bg-blue-50/50',
//       'bg-cyan-50/50',
//       'bg-sky-50/50'
//     ],
//     border: [
//       'border-indigo-100',
//       'border-blue-100',
//       'border-cyan-100',
//       'border-sky-100'
//     ],
//     text: [
//       'text-indigo-600',
//       'text-blue-600',
//       'text-cyan-600',
//       'text-sky-600'
//     ]
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1 }}
//       onClick={onClick}
//       className={`group relative ${softColors.bg[index]} rounded-2xl transition-all duration-300 
//                  cursor-pointer border ${softColors.border[index]} hover:bg-white
//                  shadow-sm hover:shadow-md backdrop-blur-sm`}
//     >
//       <div className="relative p-6 h-full">
//         <div className="flex items-start justify-between mb-4">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="p-2 rounded-xl bg-white shadow-sm border border-gray-100"
//           >
//             {React.createElement(icons[index], {
//               className: `w-5 h-5 ${softColors.text[index]}`,
//               strokeWidth: 1.5
//             })}
//           </motion.div>
          
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 
//                      rounded-full bg-white/80 ${softColors.text[index]} backdrop-blur-sm
//                      border border-gray-100`}
//           >
//             KPI {index + 1}
//             <motion.div
//               animate={{
//                 x: isActive ? 0 : -10,
//                 opacity: isActive ? 1 : 0,
//               }}
//               transition={{ duration: 0.2 }}
//             >
//               <ArrowUpRight className="w-3 h-3" />
//             </motion.div>
//           </motion.div>
//         </div>

//         <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
//           {title}
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// const InfoCard = ({ icon: Icon, title, description, bgColor, iconColor, borderColor }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className={`${bgColor} border ${borderColor} rounded-2xl p-6 shadow-sm 
//                  hover:shadow-md transition-all duration-300 group backdrop-blur-sm`}
//     >
//       <div className="relative">
//         <div className="flex items-center gap-4 mb-4">
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             className="p-3 rounded-xl bg-white shadow-sm border border-gray-100"
//           >
//             <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={1.5} />
//           </motion.div>
//           <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
//             {title}
//           </h3>
//         </div>
        
//         <div className="pl-14 space-y-4">
//           <p className="text-sm text-gray-600 group-hover:text-gray-700">
//             {description}
//           </p>
//           <motion.div 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: isHovered ? 1 : 0 }}
//             className={`flex items-center gap-2 ${iconColor}`}
//           >
//             <Info className="w-4 h-4" />
//             <span className="text-xs font-medium">Learn More</span>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const PerformanceTracking = () => {
//   const [activeMetric, setActiveMetric] = useState(null);

//   const performanceData = {
//     "KPIs with Baselines": [
//       "Document Turnaround Time: Current baseline at 48 hours, target <24 hours.",
//       "Role Utilization Metrics: Measure administrative role engagement increase by 40%.",
//       "Cost Reduction: Aim to reduce recurrent operational costs by at least 15% in the first year.",
//       "Efficiency Optimization: Streamline workflow processes to minimize manual interventions."
//     ],
//     "Measurement Methodology": "Use an analytics dashboard to capture real-time data on document processing times, role task allocation, and associated costs.",
//     "Target Thresholds": "Aim for monthly reviews, targeting performance indicators meeting 90% of revised expectations."
//   };

//   const renderKPIGrid = () => {
//     const metrics = performanceData["KPIs with Baselines"];
    
//     if (metrics.length === 2) {
//       return (
//         <div className="grid grid-cols-2 gap-6 place-content-center">
//           {metrics.map((metric, index) => (
//             <MetricCard 
//               key={index} 
//               title={metric} 
//               index={index}
//               isActive={activeMetric === index}
//               onClick={() => setActiveMetric(activeMetric === index ? null : index)}
//             />
//           ))}
//         </div>
//       );
//     }
    
//     if (metrics.length === 3) {
//       return (
//         <div className="grid grid-cols-2 gap-6">
//           <div className="col-span-2 grid grid-cols-2 gap-6">
//             {metrics.slice(0, 2).map((metric, index) => (
//               <MetricCard 
//                 key={index} 
//                 title={metric} 
//                 index={index}
//                 isActive={activeMetric === index}
//                 onClick={() => setActiveMetric(activeMetric === index ? null : index)}
//               />
//             ))}
//           </div>
//           <div className="col-span-2 flex justify-center">
//             <div className="w-1/2">
//               <MetricCard 
//                 title={metrics[2]} 
//                 index={2}
//                 isActive={activeMetric === 2}
//                 onClick={() => setActiveMetric(activeMetric === 2 ? null : 2)}
//               />
//             </div>
//           </div>
//         </div>
//       );
//     }
    
//     return (
//       <div className="grid grid-cols-2 gap-6">
//         {metrics.map((metric, index) => (
//           <MetricCard 
//             key={index} 
//             title={metric} 
//             index={index}
//             isActive={activeMetric === index}
//             onClick={() => setActiveMetric(activeMetric === index ? null : index)}
//           />
//         ))}
//       </div>
//     );
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="w-full max-w-6xl mx-auto"
//     >
//       <div className="bg-white/95 rounded-2xl border border-gray-200/50 
//                     shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm p-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8 relative z-10">
//           <div className="flex items-center gap-3">
//             <motion.div
//               animate={{ 
//                 rotate: [0, 10, -10, 10, 0],
//               }}
//               transition={{
//                 duration: 4,
//                 repeat: Infinity,
//                 repeatDelay: 2,
//               }}
//               className="p-2 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 
//                        border border-indigo-200 shadow-sm"
//             >
//               <Activity className="w-6 h-6 text-indigo-500" strokeWidth={1.5} />
//             </motion.div>
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">Performance Tracking</h2>
//               <p className="text-sm text-gray-500">Monitor and analyze key metrics</p>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <IconBadge Icon={Shield} gradient="linear-gradient(45deg, #818cf8, #6366f1)" />
//             <IconBadge Icon={Server} gradient="linear-gradient(45deg, #0ea5e9, #0284c7)" />
//             <IconBadge Icon={Settings} gradient="linear-gradient(45deg, #22d3ee, #06b6d4)" />
//           </div>
//         </div>

//         {/* KPI Grid */}
//         <div className="mb-8">
//           {renderKPIGrid()}
//         </div>

//         {/* Info Cards */}
//         <div className="space-y-6">
//           <InfoCard 
//             icon={BarChart2}
//             title="Measurement Approach"
//             description={performanceData["Measurement Methodology"]}
//             bgColor="bg-indigo-50/50"
//             iconColor="text-indigo-600"
//             borderColor="border-indigo-100"
//           />
//           <InfoCard 
//             icon={TrendingDown}
//             title="Performance Targets"
//             description={performanceData["Target Thresholds"]}
//             bgColor="bg-blue-50/50"
//             iconColor="text-blue-600"
//             borderColor="border-blue-100"
//           />
//         </div>
//       </div>
//     </motion.div>
//   );
// };



