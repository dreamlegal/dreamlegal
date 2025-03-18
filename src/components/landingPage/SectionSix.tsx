// // import React from 'react'
// // import { Users, Zap, BarChart3, LineChart, Layout, BrainCircuit, } from 'lucide-react';
// // const SectionSix = () => {
// //   return (
// //    <div className="max-w-6xl mx-auto px-4 py-8 relative">
         
// //          {/* Logo Section */}
// //          <div className="flex justify-center mb-8 relative z-10">
// //            <div className="bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-md border border-blue-100 
// //                        hover:shadow-xl transition-shadow duration-300 animate-float">
// //              <div className="flex items-center gap-3">
// //                <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className="h-6" />
// //              </div>
// //            </div>
// //          </div>
   
// //          {/* Team Section */}
// //          <div className="flex justify-center mb-2 relative z-10">
// //            <div className="flex -space-x-4">
// //              {[11, 2, 3, 9, 5].map((i) => (
// //                <img 
// //                  key={i}
// //                  src={`t${i}.jpg`}
// //                  alt={`Team member ${i}`}
// //                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm 
// //                         hover:transform hover:scale-110 transition-transform duration-300"
// //                  style={{ animationDelay: `${i * 0.1}s` }}
// //                />
// //              ))}
// //            </div>
// //          </div>
   
// //          {/* Vertical Connection Lines */}
// //          <div className="relative flex justify-center -mt-12 mb-2">
// //            <svg className="w-4 h-16" viewBox="0 0 4 64">
// //              <path
// //                d="M 2,0 L 2,64"
// //                stroke="#93C5FD"
// //                strokeWidth="2"
// //                fill="none"
// //                strokeDasharray="6,6"
// //              />
// //            </svg>
// //          </div>
   
// //          {/* Legal Operations Intelligence Section */}
// //          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 max-w-3xl mx-auto -mb-4 relative z-10 
// //                      border border-blue-100 hover:shadow-lg transition-shadow duration-300 group">
// //            <div className="text-center">
// //              <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300">
// //                Legal Operations Intelligence
// //              </h2>
// //              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
// //                We unify fragmented legal processes, workflow data, and technology usage insights to deliver actionable intelligence across your operations.
// //              </p>
// //            </div>
// //          </div>
   
// //          {/* Connection Lines */}
// //          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid meet">
// //      {/* Continuous central vertical line from top to bottom */}
// //      <path
// //        d="M 700,0 L 700,200"
// //        stroke="#93C5FD"
// //        strokeWidth="2"
// //        fill="none"
// //        strokeDasharray="6,6"
// //      />
     
// //      {/* Modified left curve with even lower endpoint */}
// //      <path
// //        d="M 200,190 C 400,60 500,200 700,80"
// //        stroke="#93C5FD"
// //        strokeWidth="2"
// //        fill="none"
// //        strokeDasharray="6,6"
// //      />
     
// //      {/* Modified right curve with even lower endpoint */}
// //      <path
// //        d="M 1200,190 C 1000,60 900,200 700,80"
// //        stroke="#93C5FD"
// //        strokeWidth="2"
// //        fill="none"
// //        strokeDasharray="6,6"
// //      />
// //    </svg>
   
// //          {/* Bottom Features */}
// //          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
// //            {[
// //              { icon: Zap, text: 'Workflows' },
// //              { icon: BarChart3, text: 'Technology' },
// //              { icon: BrainCircuit, text: 'Business KPIs' }
// //            ].map(({ icon: Icon, text }, index) => (
// //              <div
// //                key={text}
// //                className="bg-white/70 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 shadow-sm 
// //                       hover:shadow-lg transition-all duration-300 border border-blue-100 
// //                       hover:border-blue-300 transform hover:-translate-y-1"
// //              >
// //                <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
// //                  <Icon className="w-5 h-5 text-blue-600" />
// //                </div>
// //                <span className="font-semibold">{text}</span>
// //              </div>
// //            ))}
// //          </div>
// //        </div>
// //   )
// // }

// // export default SectionSix
// import React from 'react'
// import { FileText, Cog,  BrainCircuit, } from 'lucide-react';

// const LegalTechAdoptionSection = () => {
//   return (
//    <div className="max-w-6xl mx-auto px-4 py-8 relative">
         
//          {/* Logo Section */}
//          <div className="flex justify-center mb-8 relative z-10">
//            <div className="bg-[#f5f7fa] backdrop-blur-sm px-8 py-4 rounded-full shadow-md border border-[#7cc6ee]/20 
//                        hover:shadow-xl transition-shadow duration-300 animate-float">
//              <div className="flex items-center gap-3">
//                <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className="h-6" />
//              </div>
//            </div>
//          </div>
   
//          {/* Team Section */}
//          <div className="flex justify-center mb-2 relative z-10">
//            <div className="flex -space-x-4">
//              {[11, 2, 3, 9, 5].map((i) => (
//                <img 
//                  key={i}
//                  src={`t${i}.jpg`}
//                  alt={`Team member ${i}`}
//                  className="w-12 h-12 rounded-full border-2 border-white shadow-sm 
//                         hover:transform hover:scale-110 transition-transform duration-300"
//                  style={{ animationDelay: `${i * 0.1}s` }}
//                />
//              ))}
//            </div>
//          </div>
   
//          {/* Vertical Connection Lines */}
//          <div className="relative flex justify-center -mt-12 mb-2">
//            <svg className="w-4 h-16" viewBox="0 0 4 64">
//              <path
//                d="M 2,0 L 2,64"
//                stroke="#7cc6ee"
//                strokeWidth="2"
//                fill="none"
//                strokeDasharray="6,6"
//              />
//            </svg>
//          </div>
   
//          {/* Legal Technology Adoption Section */}
//          <div className="bg-[#f5f7fa] backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto -mb-4 relative z-10 
//                      border border-[#7cc6ee]/20 hover:shadow-lg transition-shadow duration-300 group">
//            <div className="text-center">
//              <h2 className="text-2xl font-bold mb-3 text-[#1e2556] group-hover:text-[#1e2556] transition-colors duration-300">
//                Legal Technology Adoption
//              </h2>
//              <p className="text-[#2d2d2d] group-hover:text-[#2d2d2d] transition-colors duration-300">
//                We unify efficiency goals and technology of legal teams to build best legal processes and operations.
//              </p>
//            </div>
//          </div>
   
//          {/* Connection Lines */}
//          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid meet">
//            {/* Continuous central vertical line from top to bottom */}
//            <path
//              d="M 700,0 L 700,200"
//              stroke="#7cc6ee"
//              strokeWidth="2"
//              fill="none"
//              strokeDasharray="6,6"
//            />
           
//            {/* Modified left curve with even lower endpoint */}
//            <path
//              d="M 200,190 C 400,60 500,200 700,80"
//              stroke="#7cc6ee"
//              strokeWidth="2"
//              fill="none"
//              strokeDasharray="6,6"
//            />
           
//            {/* Modified right curve with even lower endpoint */}
//            <path
//              d="M 1200,190 C 1000,60 900,200 700,80"
//              stroke="#7cc6ee"
//              strokeWidth="2"
//              fill="none"
//              strokeDasharray="6,6"
//            />
//          </svg>
   
//          {/* Bottom Features */}
//          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
//            {[
//              { icon: FileText, text: 'Legal Workflows' },
//              { icon: Cog, text: 'Legal Technology' },
//              { icon: Cog, text: 'Legal KPIs' }
//            ].map(({ icon: Icon, text }, index) => (
//              <div
//                key={text}
//                className="bg-[#f5f7fa] backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 shadow-sm 
//                       hover:shadow-lg transition-all duration-300 border border-[#7cc6ee]/20 
//                       hover:border-[#7cc6ee]/40 transform hover:-translate-y-1"
//              >
//                <div className="bg-[#7cc6ee]/10 p-2 rounded-lg group-hover:bg-[#7cc6ee]/20 transition-colors duration-300">
//                  <Icon className="w-5 h-5 text-[#1e2556]" />
//                </div>
//                <span className="font-semibold text-[#1e2556]">{text}</span>
//              </div>
//            ))}
//          </div>
//        </div>
//   )
// }

// export default LegalTechAdoptionSection
import React from 'react'
import { FileText, Cog, BrainCircuit, } from 'lucide-react';

const LegalTechAdoptionSection = () => {
  return (
   <div className="w-full bg-[#1e2556] px-4 py-16 relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#7cc6ee20_0%,transparent_50%)]" />
     
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1A_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1A_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#1e2556] via-[#1e2556]/95 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#1e2556] via-[#1e2556]/95 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1e2556] via-[#1e2556]/90 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1e2556] via-[#1e2556]/90 to-transparent" />
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
         
         {/* Logo Section */}
         <div className="flex justify-center mb-8 relative z-10">
           <div className="bg-white backdrop-blur-sm px-8 py-4 rounded-full shadow-md border border-[#7cc6ee]/20 
                       hover:shadow-xl transition-shadow duration-300 animate-float">
             <div className="flex items-center gap-3">
               <img src="/logos/DreamLegal_logo_allblue.png" alt="DreamLegal Logo" className="h-6" />
             </div>
           </div>
         </div>
   
         {/* Team Section */}
         <div className="flex justify-center mb-2 relative z-10">
           <div className="flex -space-x-4">
             {[11, 2, 3, 9, 5].map((i) => (
               <img 
                 key={i}
                 src={`t${i}.jpg`}
                 alt={`Team member ${i}`}
                 className="w-12 h-12 rounded-full border-2 border-white shadow-sm 
                        hover:transform hover:scale-110 transition-transform duration-300"
                 style={{ animationDelay: `${i * 0.1}s` }}
               />
             ))}
           </div>
         </div>
   
         {/* Vertical Connection Lines */}
         <div className="relative flex justify-center -mt-12 mb-2">
           <svg className="w-4 h-16" viewBox="0 0 4 64">
             <path
               d="M 2,0 L 2,64"
               stroke="#7cc6ee"
               strokeWidth="2"
               fill="none"
               strokeDasharray="6,6"
             />
           </svg>
         </div>
   
         {/* Legal Technology Adoption Section */}
         <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-3xl mx-auto -mb-4 relative z-10 
                     border border-[#7cc6ee]/20 hover:shadow-lg transition-shadow duration-300 group">
           <div className="text-center">
             <h2 className="text-2xl font-bold mb-3 text-white group-hover:text-white transition-colors duration-300">
               Legal Technology Adoption
             </h2>
             <p className="text-white/80 group-hover:text-white transition-colors duration-300">
               We unify efficiency goals and technology of legal teams to build best legal processes and operations.
             </p>
           </div>
         </div>
   
         {/* Connection Lines */}
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 200" preserveAspectRatio="xMidYMid meet">
           {/* Continuous central vertical line from top to bottom */}
           <path
             d="M 700,0 L 700,200"
             stroke="#7cc6ee"
             strokeWidth="2"
             fill="none"
             strokeDasharray="6,6"
           />
           
           {/* Modified left curve with even lower endpoint */}
           <path
             d="M 200,190 C 400,60 500,200 700,80"
             stroke="#7cc6ee"
             strokeWidth="2"
             fill="none"
             strokeDasharray="6,6"
           />
           
           {/* Modified right curve with even lower endpoint */}
           <path
             d="M 1200,190 C 1000,60 900,200 700,80"
             stroke="#7cc6ee"
             strokeWidth="2"
             fill="none"
             strokeDasharray="6,6"
           />
         </svg>
   
         {/* Bottom Features */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
           {[
             { icon: FileText, text: 'Legal Workflows' },
             { icon: Cog, text: 'Legal Technology' },
             { icon: Cog, text: 'Legal KPIs' }
           ].map(({ icon: Icon, text }, index) => (
             <div
               key={text}
               className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 shadow-sm 
                      hover:shadow-lg transition-all duration-300 border border-[#7cc6ee]/20 
                      hover:border-[#7cc6ee]/40 transform hover:-translate-y-1"
             >
               <div className="bg-[#7cc6ee]/20 p-2 rounded-lg group-hover:bg-[#7cc6ee]/30 transition-colors duration-300">
                 <Icon className="w-5 h-5 text-white" />
               </div>
               <span className="font-semibold text-white">{text}</span>
             </div>
           ))}
         </div>
      </div>
       </div>
  )
}

export default LegalTechAdoptionSection