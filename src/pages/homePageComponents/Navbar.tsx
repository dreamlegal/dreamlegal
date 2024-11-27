"use client"
// import React, { useState, useEffect } from 'react';
// import { Menu, X, ChevronDown } from 'lucide-react';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     {
//       title: 'Product',
//       hasDropdown: true,
//       dropdownItems: ['Features', 'Solutions', 'Enterprise', 'Use Cases']
//     },
//     {
//       title: 'Why us',
//       hasDropdown: true,
//       dropdownItems: ['About', 'Team', 'Testimonials']
//     },
//     {
//       title: 'Resources',
//       hasDropdown: true,
//       dropdownItems: ['Blog', 'Documentation', 'Community']
//     },
//     {
//       title: 'Pricing',
//       hasDropdown: false
//     },
//     {
//       title: 'Contact',
//       hasDropdown: true,
//       dropdownItems: ['Support', 'Sales', 'Partners']
//     }
//   ];

//   return (
//     <nav className={`fixed w-full z-50 transition-all duration-300 ${
//       scrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-white'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <div className="h-8 w-8 bg-black rounded-lg"></div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item, index) => (
//               <div key={index} className="relative group">
//                 <button className="flex items-center space-x-1 text-gray-600 hover:text-black transition-colors duration-200">
//                   <span>{item.title}</span>
//                   {item.hasDropdown && (
//                     <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
//                   )}
//                 </button>
                
//                 {item.hasDropdown && (
//                   <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
//                     <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden bg-white">
//                       <div className="py-1">
//                         {item.dropdownItems.map((dropdownItem, idx) => (
//                           <a
//                             key={idx}
//                             href="#"
//                             className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
//                           >
//                             {dropdownItem}
//                           </a>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* CTA Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             <button className="px-4 py-2 text-gray-600 hover:text-black transition-colors duration-200">
//               Open app
//             </button>
//             <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200">
//               Get a demo
//             </button>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
//             >
//               {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       <div className={`md:hidden transition-all duration-300 ease-in-out ${
//         isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
//       } overflow-hidden bg-white`}>
//         <div className="px-2 pt-2 pb-3 space-y-1">
//           {navItems.map((item, index) => (
//             <div key={index} className="space-y-1">
//               <button className="w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors duration-200">
//                 {item.title}
//               </button>
//               {item.hasDropdown && (
//                 <div className="pl-4 space-y-1">
//                   {item.dropdownItems.map((dropdownItem, idx) => (
//                     <a
//                       key={idx}
//                       href="#"
//                       className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-black hover:bg-gray-50 rounded-md transition-colors duration-200"
//                     >
//                       {dropdownItem}
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//           <div className="pt-4 space-y-2">
//             <button className="w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md transition-colors duration-200">
//               Open app
//             </button>
//             <button className="w-full px-3 py-2 text-base font-medium text-white bg-black hover:bg-gray-800 rounded-md transition-colors duration-200">
//               Get a demo
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      title: 'Product',
      hasDropdown: true,
      dropdownItems: ['Features', 'Solutions', 'Enterprise', 'Use Cases']
    },
    {
      title: 'Why us',
      hasDropdown: true,
      dropdownItems: ['About', 'Team', 'Testimonials']
    },
    {
      title: 'Resources',
      hasDropdown: true,
      dropdownItems: ['Blog', 'Documentation', 'Community']
    },
    {
      title: 'Pricing',
      hasDropdown: false
    },
    {
      title: 'Contact',
      hasDropdown: true,
      dropdownItems: ['Support', 'Sales', 'Partners']
    }
  ];

  return (
    <div className="w-full px-4 fixed top-0 left-0 right-0 z-50 pt-4">
      <nav className={`
        max-w-6xl mx-auto 
        rounded-2xl
        transition-all duration-300 ease-in-out
        ${scrolled 
          ? 'bg-white/70 backdrop-blur-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]' 
          : 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)]'
        }
      `}>
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-black rounded-lg"></div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <div key={index} className="relative group px-3">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-black py-2 transition-colors duration-200">
                    <span className="text-sm font-medium">{item.title}</span>
                    {item.hasDropdown && (
                      <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                    )}
                  </button>
                  
                  {item.hasDropdown && (
                    <div className="absolute left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                      <div className="rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-white/70 backdrop-blur-lg border border-gray-100">
                        <div className="py-1">
                          {item.dropdownItems.map((dropdownItem, idx) => (
                            <a
                              key={idx}
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50/50 transition-colors duration-200"
                            >
                              {dropdownItem}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200">
                Open app
              </button>
              <button className="px-4 py-2 text-sm font-medium bg-black text-white rounded-xl hover:bg-gray-800 transition-colors duration-200">
                Get a demo
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="px-6 pt-2 pb-4 space-y-1">
            {navItems.map((item, index) => (
              <div key={index} className="space-y-1">
                <button className="w-full text-left px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors duration-200">
                  {item.title}
                </button>
                {item.hasDropdown && (
                  <div className="pl-4 space-y-1">
                    {item.dropdownItems.map((dropdownItem, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="block px-3 py-2 text-sm text-gray-500 hover:text-black hover:bg-gray-50 rounded-xl transition-colors duration-200"
                      >
                        {dropdownItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-2">
              <button className="w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors duration-200">
                Open app
              </button>
              <button className="w-full px-3 py-2 text-base font-medium text-white bg-black hover:bg-gray-800 rounded-xl transition-colors duration-200">
                Get a demo
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;