"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Info, TrendingDown, 
  Shield, Server, Settings,
  Target, Clock, BarChart2, Zap
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
                 cursor-pointer border ${colors.border[index]}
                 shadow-sm hover:shadow-md backdrop-blur-sm`}
    >
      <div className="relative p-6 h-full">
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative z-10 bg-white rounded-xl p-2 shadow-lg border border-gray-100"
          >
            {React.createElement(icons[index % icons.length], {
              className: `w-5 h-5 ${colors.icon[index]}`,
              strokeWidth: 1.5
            })}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 
                     rounded-full bg-white/80 ${colors.icon[index]} backdrop-blur-sm
                     border border-gray-100`}
          >
            KPI {index + 1}
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
      className={`${bgColor} border ${borderColor} rounded-2xl p-6 
                 shadow-sm hover:shadow-md transition-all duration-300 group 
                 backdrop-blur-sm`}
    >
      <div className="relative">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-3 rounded-xl bg-white shadow-sm border border-gray-100"
          >
            <Icon className={`w-6 h-6 ${iconColor}`} strokeWidth={1.5} />
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
            {title}
          </h3>
        </div>
        
        <div className="pl-14 space-y-4">
          <p className="text-sm text-gray-600 group-hover:text-gray-700">
            {description}
          </p>
          {/* <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className={`flex items-center gap-2 ${iconColor}`}
          >
            <Info className="w-4 h-4" />
            <span className="text-xs font-medium">Learn More</span>
          </motion.div> */}
        </div>
      </div>
    </motion.div>
  );
};

const PerformanceTracking = ({ data }) => {
  const [activeMetric, setActiveMetric] = useState(null);

  // Transform the data
  const metrics = data?.Performance_Tracking?.["KPIs_with_Baselines"] || [];
  const methodologyData = data?.Performance_Tracking?.["Measurement_Methodology"] || "";
  const thresholdData = data?.Performance_Tracking?.["Target_Thresholds"] || "";

  return (
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
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Performance Tracking</h2>
              <p className="text-sm text-gray-500">Monitor and analyze key metrics</p>
            </div>
          </div>

          <div className="flex gap-2">
            <IconBadge Icon={Shield} gradient="linear-gradient(45deg, #818cf8, #6366f1)" />
            <IconBadge Icon={Server} gradient="linear-gradient(45deg, #34d399, #10b981)" />
            <IconBadge Icon={Settings} gradient="linear-gradient(45deg, #fb923c, #f97316)" />
          </div>
        </div>

        {/* KPI Grid */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        {/* Info Cards */}
        <div className="space-y-6">
          <InfoCard 
            icon={BarChart2}
            title="Measurement Methodology"
            description={methodologyData}
            bgColor="bg-indigo-50/50"
            iconColor="text-indigo-600"
            borderColor="border-indigo-100"
          />
          <InfoCard 
            icon={TrendingDown}
            title="Target Thresholds"
            description={thresholdData}
            bgColor="bg-blue-50/50"
            iconColor="text-blue-600"
            borderColor="border-blue-100"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default PerformanceTracking;