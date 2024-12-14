"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2 } from 'lucide-react';

// const AnalysisBox = ({ title, content, isShort = false }) => {
//   // Extract number from content if exists
//   const number = content.match(/\d+(?:-\d+)?%?/)?.[0] || '?';

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6 }}
//       className={`relative flex flex-col items-start bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-100 group ${isShort ? 'max-w-md' : ''}`}
//     >
//       <div className="relative mb-4 w-full">
//         <div className="bg-gray-200 text-gray-800 w-full px-4 py-2 rounded-md shadow-md group-hover:shadow-lg transition-shadow duration-300">
//           <span className="font-bold text-lg">{number}</span>
//         </div>
//       </div>
//       <h3 className="text-xl font-bold mb-2">{title}</h3>
//       <p className="text-gray-600 text-sm leading-relaxed">{content}</p>

//       {/* Premium corner accents */}
//       <div className="absolute top-0 right-0 w-20 h-20 rounded-tr-2xl 
//                    bg-gradient-to-bl from-gray-200/50 to-transparent 
//                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       <div className="absolute bottom-0 left-0 w-20 h-20 rounded-bl-2xl 
//                    bg-gradient-to-tr from-gray-200/50 to-transparent 
//                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//     </motion.div>
//   );
// };

// const AnalysisBox = ({ title, content, isShort = false }) => {
//   // Extract number from content if exists
//   const number = content.match(/\d+(?:-\d+)?%?/)?.[0] || '?';
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6 }}
//       className={`relative flex flex-col items-start bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-100 group ${isShort ? 'max-w-md' : ''}`}
//     >
//       <div className="relative mb-4 w-auto">
//         <div className="bg-gray-200 text-gray-800 inline-flex px-4 py-2 rounded-md shadow-md group-hover:shadow-lg transition-shadow duration-300">
//           <span className="font-bold text-lg whitespace-nowrap">{number}</span>
//         </div>
//       </div>
//       <h3 className="text-xl font-bold mb-2 break-words w-full">{title}</h3>
//       <p className="text-gray-600 text-sm leading-relaxed break-words w-full">{content}</p>
      
//       {/* Premium corner accents */}
//       <div className="absolute top-0 right-0 w-20 h-20 rounded-tr-2xl
//                    bg-gradient-to-bl from-gray-200/50 to-transparent
//                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       <div className="absolute bottom-0 left-0 w-20 h-20 rounded-bl-2xl
//                    bg-gradient-to-tr from-gray-200/50 to-transparent
//                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//     </motion.div>
//   );
// };

// const AnalysisBox = ({ title, content, isShort = false }) => {
//   // Extract number from content if exists
//   const number = content.match(/\d+(?:-\d+)?%?/)?.[0] || '?';
  
//   // Get random gradient for variety
//   const gradients = [
//     'from-blue-500 to-cyan-400',
//     'from-purple-500 to-pink-400',
//     'from-green-500 to-emerald-400',
//     'from-orange-500 to-amber-400',
//     'from-rose-500 to-red-400',
//     'from-indigo-500 to-blue-400'
//   ];
  
//   const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
  
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.6 }}
//       className={`relative flex flex-col items-start bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-100 group ${isShort ? 'max-w-md' : ''}`}
//     >
//       <div className="relative mb-4 w-auto">
//         <div className={`bg-gradient-to-r ${randomGradient} text-white inline-flex px-4 py-2 rounded-md shadow-md group-hover:shadow-lg transition-all duration-300 hover:scale-105`}>
//           <span className="font-bold text-lg whitespace-nowrap">{number}</span>
//         </div>
//       </div>
//       <h3 className="text-xl font-bold mb-2 break-words w-full">{title}</h3>
//       <p className="text-gray-600 text-sm leading-relaxed break-words w-full">{content}</p>
      
//       {/* Premium corner accents */}
//       <div className="absolute top-0 right-0 w-20 h-20 rounded-tr-2xl
//                    bg-gradient-to-bl from-gray-200/50 to-transparent
//                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//       <div className="absolute bottom-0 left-0 w-20 h-20 rounded-bl-2xl
//                    bg-gradient-to-tr from-gray-200/50 to-transparent
//                    opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//     </motion.div>
//   );
// };

const AnalysisBox = ({ title, content, isShort = false }) => {
  // Extract number from content if exists
  const number = content.match(/\d+(?:-\d+)?%?/)?.[0] || '?';
  
  // Convert underscores to spaces in the title
  const formattedTitle = title.replace(/_/g, ' ');
  
  // Get random gradient for variety
  const gradients = [
    'from-blue-500 to-cyan-400',
    'from-purple-500 to-pink-400',
    'from-green-500 to-emerald-400',
    'from-orange-500 to-amber-400',
    'from-rose-500 to-red-400',
    'from-indigo-500 to-blue-400'
  ];
  
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative flex flex-col items-start bg-white shadow-xl rounded-2xl p-6 mb-8 border border-gray-100 group ${isShort ? 'max-w-md' : ''}`}
    >
      <div className="relative mb-4 w-auto">
        <div className={`bg-gradient-to-r ${randomGradient} text-white inline-flex px-4 py-2 rounded-md shadow-md group-hover:shadow-lg transition-all duration-300 hover:scale-105`}>
          <span className="font-bold text-lg whitespace-nowrap">{number}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 break-words w-full">{formattedTitle}</h3>
      <p className="text-gray-600 text-sm leading-relaxed break-words w-full">{content}</p>
      
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

const QuantitativeAnalysis = ({ data }) => {
  // Format the data from Quantitative_Analysis section
  const analysisEntries = Object.entries(data?.Quantitative_Analysis || {});
  const numSections = analysisEntries.length;

  return (
    <div className="w-full py-16  relative overflow-hidden">
    {/* <div className="w-full py-16 bg-gradient-to-br from-gray-50/30 to-gray-100/30 relative overflow-hidden"> */}
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
                <AnalysisBox 
                  title={analysisEntries[2][0]} 
                  content={analysisEntries[2][1]} 
                  isShort 
                />
              </>
            )}

            {numSections === 3 && (
              <AnalysisBox 
                title={analysisEntries[2][0]} 
                content={analysisEntries[2][1]} 
                isShort 
              />
            )}
          </div>

          {/* Right Side */}
          <div className="w-full lg:w-2/3">
            <AnalysisBox 
              title={analysisEntries[0][0]} 
              content={analysisEntries[0][1]} 
            />
            <AnalysisBox 
              title={analysisEntries[1][0]} 
              content={analysisEntries[1][1]} 
            />
            {numSections > 3 && (
              <AnalysisBox 
                title={analysisEntries[3][0]} 
                content={analysisEntries[3][1]} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantitativeAnalysis;