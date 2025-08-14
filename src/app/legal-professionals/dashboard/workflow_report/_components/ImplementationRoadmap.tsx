"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, Target, Sparkles, CheckCircle2,
  Shield, Server, Settings
} from 'lucide-react';

const PremiumRoadmap = ({ data }) => {
  const [activePhase, setActivePhase] = useState(null);

  const phases = [
    {
      day: "30",
      title: "30 Day Action Plan",
      description: data?.Implementation_Roadmap?.["30_Day_Action_Plan"] || "",
      icon: Clock,
      color: "blue",
      iconColor: "text-blue-500"
    },
    {
      day: "60",
      title: "60 Day Action Plan",
      description: data?.Implementation_Roadmap?.["60_Day_Action_Plan"] || "",
      icon: Sparkles,
      color: "purple",
      iconColor: "text-purple-500"
    },
    {
      day: "90",
      title: "90 Day Action Plan",
      description: data?.Implementation_Roadmap?.["90_Day_Action_Plan"] || "",
      icon: Target,
      color: "emerald",
      iconColor: "text-emerald-500"
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-white py-12 px-4 sm:px-6"  >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 -top-8 " />
          <h1 className="relative text-3xl md:text-4xl font-semibold bg-clip-text text-black-900 mb-6">
            Implementation Roadmap
          </h1>
          <div className="relative flex items-center justify-center gap-3 text-slate-600 bg-white py-3 px-6 rounded-full shadow-lg shadow-slate-200/50 mx-auto w-fit">
            <Target className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium">Success Criteria: {data?.Implementation_Roadmap?.["Success_Criteria"]}</span>
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
                  <p className="text-purple-700 text-lg">{data?.Implementation_Roadmap?.["Key_Milestones"]}</p>
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
                  <p className="text-emerald-700 text-lg">{data?.Implementation_Roadmap?.["Resource_Allocation"]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframes for the flow animation */}
      <style>{`
        @keyframes flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-flow {
          animation: flow 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PremiumRoadmap;