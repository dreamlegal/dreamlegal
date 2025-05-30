// import React from 'react';
// import { ArrowRight } from 'lucide-react';

// const HeroSection = () => {
//   return (
//     <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
//       {/* Background */}
//       <div className="absolute inset-0">
//         {/* Base gradient background */}
//         <div className="absolute inset-0 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800"></div>
        
//         {/* Dark overlay to match original */}
//         <div 
//           className="absolute inset-0" 
//           style={{ backgroundColor: 'rgba(30, 37, 86, 0.92)' }}
//         ></div>
        
//         {/* Subtle texture */}
//         <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-white via-transparent to-white"></div>
//       </div>

//       {/* Content Container */}
//       <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
//         <div className="max-w-4xl">
//           {/* Main Heading */}
//           <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-8 text-white tracking-tight">
//             Be the first choice of{' '}
//             <span className="block">legal teams</span>
//           </h1>

//           {/* Subtitle */}
//           <p className="text-xl sm:text-2xl lg:text-2xl mb-10 text-white/95 leading-relaxed max-w-2xl font-light">
//             High-intent leads and market insights for legal AI companies
//           </p>

//           {/* CTA Button */}
//           <div className="mb-8">
//             <button 
//               className="inline-flex items-center px-10 py-5 text-xl font-semibold text-white rounded-md transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-2xl shadow-lg"
//               style={{ backgroundColor: '#1e2556' }}
//             >
//               Talk to us
//             </button>
//           </div>

//           {/* Secondary Link */}
//           <div className="text-white/85">
//             <span className="text-lg">Don't have a profile yet? </span>
//             <a 
//               href="#" 
//               className="text-lg font-medium hover:underline transition-all duration-300 inline-flex items-center group underline-offset-4"
//               style={{ color: '#7cc6ee' }}
//             >
//               Claim a free profile
//               <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Atmospheric Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {/* Simulated office environment */}
//         <div className="absolute right-1/4 top-1/3 w-32 h-40 bg-white/5 rounded-full blur-sm transform rotate-12"></div>
//         <div className="absolute right-1/3 top-1/2 w-24 h-32 bg-white/3 rounded-full blur-sm"></div>
//         <div className="absolute right-1/6 top-2/5 w-28 h-36 bg-white/4 rounded-full blur-sm transform -rotate-6"></div>
        
//         {/* Meeting table suggestion */}
//         <div className="absolute right-0 bottom-0 w-96 h-24 bg-white/5 blur-xl"></div>
//         <div className="absolute right-1/4 bottom-1/4 w-64 h-12 bg-white/3 blur-lg"></div>
        
//         {/* Additional atmospheric touches */}
//         <div className="absolute top-1/4 right-1/5 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
//         <div className="absolute top-1/2 right-1/8 w-12 h-12 bg-white/3 rounded-full blur-md"></div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
import React from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Background image with people in office setting */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
          }}
        ></div>
        
        {/* Dark overlay to match original */}
        <div 
          className="absolute inset-0" 
          style={{ backgroundColor: 'rgba(30, 37, 86, 0.85)' }}
        ></div>
        
        {/* Additional gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="max-w-3xl mr-auto">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight mb-8 text-white tracking-tight text-left">
            Be the first choice of{' '}
            <span className="block">legal teams</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl lg:text-2xl mb-10 text-white/95 leading-relaxed max-w-2xl font-light text-left">
            High-intent leads and market insights for legal AI companies
          </p>

          {/* CTA Button */}
          <div className="mb-8 text-left">
            <button 
              className="inline-flex items-center px-10 py-5 text-xl font-semibold text-white rounded-md transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-2xl shadow-lg"
              style={{ backgroundColor: '#1e2556' }}
            >
              Talk to us
            </button>
          </div>

          {/* Secondary Link */}
          <div className="text-white/85 text-left">
            <span className="text-lg">Don't have a profile yet? </span>
            <a 
              href="#" 
              className="text-lg font-medium hover:underline transition-all duration-300 inline-flex items-center group underline-offset-4"
              style={{ color: '#7cc6ee' }}
            >
              Claim a free profile
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Subtle Atmospheric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Minimal light effects to enhance the image */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/6 w-24 h-24 bg-white/2 rounded-full blur-2xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;