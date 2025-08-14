"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Compass, BookOpen, Lightbulb, ChevronRight } from 'lucide-react';

const AnimatedConnector = ({ startRef, endRef }) => {
  const pathRef = React.useRef(null);

  React.useEffect(() => {
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

const ExecutiveSummary = ({ data }) => {
  const [activeSection, setActiveSection] = useState('Overall Assessment');
  const [sectionRefs] = useState({
    "Overall Assessment": { heading: React.useRef(), content: React.useRef() },
    "Critical Findings": { heading: React.useRef(), content: React.useRef() },
    "Strategic Direction": { heading: React.useRef(), content: React.useRef() }
  });

  // Transform the data into required format
  const executiveData = {
    "Overall Assessment": {
      text: data?.Executive_Summary?.["Overall_Assessment"] || "",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500"
    },
    "Critical Findings": {
      text: data?.Executive_Summary?.["Critical_Findings"] || "",
      icon: Compass,
      color: "from-purple-500 to-pink-500"
    },
    "Strategic Direction": {
      text: data?.Executive_Summary?.["Strategic_Direction"] || "",
      icon: Lightbulb,
      color: "from-amber-500 to-orange-500"
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center"  >
     
    
      {/* <div className="bg-white/80 rounded-2xl shadow-2xl pl-4 pt-12 pb-12 pr-24  w-full max-w-6xl relative backdrop-blur-sm"> */}
      <div className=" rounded-2xl  pl-4 pt-12 pb-12 pr-24  w-full max-w-6xl relative ">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-3 rounded-xl shadow-lg">
            <Compass className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Conclusion</h1>
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
            {/* Left Side - Section Headers */}
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
                      <data.icon className="w-5 h-5 text-white" />
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

            {/* Right Side - Content */}
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
                      <data.icon className="w-5 h-5 text-white" />
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

export default ExecutiveSummary;