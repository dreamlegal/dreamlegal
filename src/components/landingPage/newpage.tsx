
// import Link from 'next/link';
// import { Building2, Scale, Briefcase, UserRound, BookOpen, FileText, Newspaper, GitCompare, Map } from 'lucide-react';

// export default function LegalTechLanding() {
//   const targetUsers = [
//     { id: 'enterprises', label: 'Enterprises', icon: Building2 },
//     { id: 'law-firms', label: 'Law Firms', icon: Scale },
//     { id: 'legal-departments', label: 'Legal Departments', icon: Briefcase },
//     { id: 'individual-lawyers', label: 'Individual Lawyers', icon: UserRound },
//   ];

//   const services = [
//     {
//       icon: BookOpen,
//       title: 'Detailed Product Information',
//       description: 'Understand every legal tech tool inside-out with transparent, structured, and easy-to-read product breakdowns.',
//       link: '/directory',
//       linkText: 'Visit directory',
//     },
//     {
//       icon: FileText,
//       title: 'RFP-Based Vendor Procurement',
//       description: 'Create structured RFPs and receive tailored proposals from top legal tech vendors—all evaluated in a standardized format.',
//       link: '/rfp',
//       linkText: 'Generate RFP',
//     },
//     {
//       icon: Newspaper,
//       title: 'Legal Tech News & Insights',
//       description: 'Stay ahead with daily legal tech updates, trends, market movements, and expert perspectives.',
//       link: '/insights',
//       linkText: 'Read insights',
//     },
//     {
//       icon: GitCompare,
//       title: 'Unbiased Product Comparisons',
//       description: 'Compare tools feature-by-feature, price-by-price with completely neutral, data-backed assessments.',
//       link: '/comparison',
//       linkText: 'Start comparison',
//     },
//     {
//       icon: Map,
//       title: 'Legal Tech Map',
//       description: 'Explore the entire legal tech ecosystem with our category-based visual map to discover tools quickly and easily.',
//       link: '/map',
//       linkText: 'View map',
//     },
//   ];

//   return (
//     <div className="font-sans text-[#2d2d2d] bg-white">
//       {/* Target Users Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-5">
//           <h2 className="text-4xl font-bold text-[#1e2556] mb-15 text-center">
//             Solutions curated for
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
//             {targetUsers.map((user) => {
//               const IconComponent = user.icon;
//               return (
//                 <Link
//                   key={user.id}
//                   href={`#${user.id}`}
//                   className="bg-[#f5f7fa] rounded-xl p-5 text-center transition-all duration-300 border-2 border-transparent hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(30,37,86,0.1)] hover:border-[#7cc6ee] block"
//                 >
//                   <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-b from-[#a8d5e2] via-[#7cc6ee] to-[#5ab3d9] rounded-xl flex items-center justify-center border-[3px] border-[#1e2556]">
//                     <IconComponent className="w-10 h-10 text-white" strokeWidth={2.5} />
//                   </div>
//                   <div className="text-base font-semibold text-[#1e2556]">
//                     {user.label}
//                   </div>
//                 </Link>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="py-20 bg-white">
//         <div className="max-w-7xl mx-auto px-5">
//           <div className="mb-12">
//             <h2 className="text-5xl font-bold text-[#1e2556] mb-4">
//               Our Services
//             </h2>
//             <p className="text-lg text-[#334155]">
//               Delivering clarity, confidence, and control to every legal professional exploring technology.
//             </p>
//           </div>
          
//           {/* Desktop View - Single Row Card */}
//           <div className="hidden lg:block">
//             <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
//               <div className="grid grid-cols-5">
//                 {services.map((service, index) => {
//                   const IconComponent = service.icon;
//                   return (
//                     <div
//                       key={index}
//                       className={`p-8 ${index !== services.length - 1 ? 'border-r border-gray-200' : ''}`}
//                     >
//                       <div className="mb-6">
//                         <IconComponent className="w-12 h-12 text-[#7cc6ee]" strokeWidth={2} />
//                       </div>
//                       <h3 className="text-xl font-bold text-[#1e2556] mb-3">
//                         {service.title}
//                       </h3>
//                       <p className="text-sm text-[#334155] mb-5 leading-relaxed">
//                         {service.description}
//                       </p>
//                       <Link
//                         href={service.link}
//                         className="text-[#7cc6ee] no-underline font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:gap-3 text-sm"
//                       >
//                         {service.linkText}
//                         <span>→</span>
//                       </Link>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* Mobile/Tablet View - Stacked Cards */}
//           <div className="lg:hidden">
//             <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
//               {services.map((service, index) => {
//                 const IconComponent = service.icon;
//                 return (
//                   <div
//                     key={index}
//                     className={`p-6 flex items-start justify-between ${index !== services.length - 1 ? 'border-b border-gray-200' : ''}`}
//                   >
//                     <div className="flex-1 pr-4">
//                       <h3 className="text-lg font-bold text-[#1e2556] mb-2">
//                         {service.title}
//                       </h3>
//                       <p className="text-sm text-[#334155] mb-4 leading-relaxed">
//                         {service.description}
//                       </p>
//                       <Link
//                         href={service.link}
//                         className="text-[#7cc6ee] no-underline font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:gap-3 text-sm"
//                       >
//                         {service.linkText}
//                         <span>→</span>
//                       </Link>
//                     </div>
//                     <div className="flex-shrink-0">
//                       <IconComponent className="w-12 h-12 text-[#7cc6ee]" strokeWidth={2} />
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
// page.tsx
import Link from 'next/link';
import { Building2, Scale, Briefcase, UserRound, BookOpen, FileText, Newspaper, GitCompare, Map } from 'lucide-react';

export default function LegalTechLanding() {
const targetUsers = [
  { id: "ENTERPRISE", label: "Enterprises", icon: Building2 },
  { id: "LAW_FIRM", label: "Law Firms", icon: Scale },
  { id: "INHOUSE", label: "Legal Departments", icon: Briefcase },
  { id: "INDIVIDUAL", label: "Individual Lawyers", icon: UserRound },
];


  const services = [
    {
      icon: BookOpen,
      title: 'Detailed Product Information',
      description: 'Understand every legal tech tool inside-out with transparent, structured, and easy-to-read product breakdowns.',
      link: '/directory/products',
      linkText: 'Visit directory',
    },
    {
      icon: FileText,
      title: 'RFP-Based Vendor Procurement',
      description: 'Create structured RFPs and receive tailored proposals from top legal tech vendors—all evaluated in a standardized format.',
      link: '/rfp',
      linkText: 'Generate RFP',
    },
    {
      icon: Newspaper,
      title: 'Legal Tech News & Insights',
      description: 'Stay ahead with daily legal tech updates, trends, market movements, and expert perspectives.',
      link: '/resources',
      linkText: 'Read insights',
    },
    {
      icon: GitCompare,
      title: 'Unbiased Product Comparisons',
      description: 'Compare tools feature-by-feature, price-by-price with completely neutral, data-backed assessments.',
      link: '/compare',
      linkText: 'Start comparison',
    },
    {
      icon: Map,
      title: 'Legal Tech Map',
      description: 'Explore the entire legal tech ecosystem with our category-based visual map to discover tools quickly and easily.',
      link: '/legal-tech-map',
      linkText: 'View map',
    },
  ];

  return (
    <div className="font-sans text-[#2d2d2d] bg-white">
      {/* Target Users Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-[#1e2556] mb-12 text-center">
            Solutions curated for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetUsers.map((user) => {
              const IconComponent = user.icon;
              return (
                <Link
                  key={user.id}
                 href={`/directory/products?targetUser=${user.id}`}
                  className="group bg-white rounded-2xl p-8 text-center transition-all duration-300 border border-gray-200 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(30,37,86,0.15)] hover:border-[#7cc6ee] block"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-[#7cc6ee] rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:bg-[#1e2556]">
                    <IconComponent className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                  <div className="text-lg font-bold text-[#1e2556]">
                    {user.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-[#1e2556] mb-4">
              Our Services
            </h2>
            <p className="text-lg text-[#334155]">
              Delivering clarity, confidence, and control to every legal professional exploring technology.
            </p>
          </div>
          
          {/* Desktop View - Single Row Card */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="grid grid-cols-5">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <div
                      key={index}
                      className={`p-8 flex flex-col ${index !== services.length - 1 ? 'border-r border-gray-200' : ''}`}
                    >
                      <div className="mb-6">
                        <IconComponent className="w-12 h-12 text-[#7cc6ee]" strokeWidth={2} />
                      </div>
                      <h3 className="text-lg font-bold text-[#1e2556] mb-3">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#334155] mb-6 leading-relaxed flex-grow">
                        {service.description}
                      </p>
                      <Link
                        href={service.link}
                        className="text-[#7cc6ee] no-underline font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:gap-3 text-sm mt-auto"
                      >
                        {service.linkText}
                        <span>→</span>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet View - Stacked Cards */}
          <div className="lg:hidden">
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={index}
                    className={`p-6 flex items-start justify-between ${index !== services.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex-1 pr-4">
                      <h3 className="text-lg font-bold text-[#1e2556] mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#334155] mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <Link
                        href={service.link}
                        className="text-[#7cc6ee] no-underline font-semibold inline-flex items-center gap-2 transition-all duration-300 hover:gap-3 text-sm"
                      >
                        {service.linkText}
                        <span>→</span>
                      </Link>
                    </div>
                    <div className="flex-shrink-0">
                      <IconComponent className="w-12 h-12 text-[#7cc6ee]" strokeWidth={2} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}