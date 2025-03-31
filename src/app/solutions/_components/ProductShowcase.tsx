"use client"

import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  MousePointerClick, 
  ArrowRight,
  Search, 
  BookOpen, 
  TrendingUp,
  Users,
  BarChart3,
  Sparkles,
  Router
} from 'lucide-react';

const ProductSuite = () => {
  const products = [
    {
      title: "Directory",
      subtitle: "Software Discovery Made Easy",
      description: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
      features: [
        "Identify your legal team unique needs efficiently",
        "Build a customized feature list for ideal solutions",
        "Filter and compare software tailored to your requirements",
        "Kickstart direct conversations with vendors to make informed decisions"
      ],
      buttonText: "Try Directory",
      imagePath: "/images/directory.png",
    },
    {
      title: "Learning",
      subtitle: "Legal Technology Learning Simplified",
      description: "Legal ops case studies, Tech adoption guides & comprehensive reports",
      features: [
        "Utilize grids and matrices to identify the best legal tech solutions",
        "Access comprehensive guides on industry best practices",
        "Explore feature-specific articles to deepen your understanding of tools",
        "Leverage learning resources to make the most of your chosen solutions"
      ],
      buttonText: "Try Learning",
      imagePath: "/learning-screenshot.png",
    },
    {
      title: "KPI Analysis",
      subtitle: "Legal operations metrics for business growth",
      description: "Increase business profitability & Revenue through KPI Analysis",
      features: [
        "Monitor key legal operations KPIs effectively",
        "Assess the overall health of your legal operations",
        "Enhance operations to drive business growth",
        "Detect and address changes in legal workflows proactively"
      ],
      buttonText: "Coming Soon",
      imagePath: "/coming-soon.png",
      isComingSoon: true
    },
    {
      title: "Change Management",
      subtitle: "Process based Change Management",
      description: "Smooth Data migration, employee training, clear roadmap and integrations",
      features: [
        "Seamlessly onboard technology with roadmap",
        "Measure impact with clear metrics and actionable insights",
        "Ensure team readiness for smooth adoption and integration",
        "Manage data and access securely for optimal efficiency"
      ],
      buttonText: "Coming Soon",
      imagePath: "/coming-soon.png",
      isComingSoon: true
    },
    {
      title: "Workflow Analysis",
      subtitle: "Analyze your legal workflows for efficiency",
      description: "Optimize your legal workflow processes",
      features: [
        "Identify red flags in operational processes",
        "Discover automation opportunities to save time",
        "Generate implementation plans for integration",
        "Highlight potential wins to maximize ROI"
      ],
      buttonText: "Try Workflow Analysis",
      imagePath: "/workflow-screenshot.png",
    }
  ];

  return (
    <div className="w-full py-8 bg-[#f5f7fa] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#f5f7fa]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-[#f5f7fa]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[#f5f7fa]" />
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <ProductsShowcase/>
      </div>
    </div>
  );
};

export default ProductSuite;

import { ChevronRight, BarChart2, Settings, Shield, Clock, Zap, CheckCircle, } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SectionHeader = ({ title, icon: Icon }) => (
  <div className="relative w-full mb-6 md:mb-10">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t-2 border-[#7cc6ee]/20"></div>
    </div>
    <div className="relative flex justify-center">
      <div className="relative group">
        <div className="absolute -inset-1 bg-[#1e2556] rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-[#1e2556] text-white px-4 md:px-6 py-2 rounded-full text-base md:text-lg font-semibold shadow-lg flex items-center gap-2 hover:scale-105 transition-transform duration-300">
          <Icon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">{title}</span>
        </div>
      </div>
    </div>
  </div>
);

const FeatureIcon = ({ index }) => {
  const icons = [Shield, Clock, Zap, CheckCircle];
  const Icon = icons[index % icons.length];
  return <Icon className="w-4 h-4" />;
};

const ProductCard = ({ title, subtitle, description, features, href, buttonText, imagePath, imageAlt, index, icon: Icon, isComingSoon }) => {
  const router = useRouter();
  const isEven = index % 2 === 0;
  
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-[#f5f7fa] opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl blur-xl" />
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-xl" />
      
      <div className={`relative flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-12 py-6 md:py-10 px-4 md:px-8`}>
        <div className="w-full md:w-1/2 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="p-2 bg-[#f5f7fa] rounded-lg">
              <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#7cc6ee]" />
            </div>
            <div className="flex items-center gap-1 px-3 py-1 bg-[#f5f7fa] rounded-full">
              <Sparkles className="w-3 h-3 text-[#7cc6ee]" />
              <span className="text-xs md:text-sm text-[#7cc6ee]">{title}</span>
            </div>
          </div>
          
          <h3 className="text-sm md:text-base text-[#334155]">{subtitle}</h3>
          
          <ul className="space-y-2">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 p-2 hover:bg-white hover:shadow rounded-lg group">
                <span className="w-5 h-5 md:w-6 md:h-6 rounded bg-[#f5f7fa] flex items-center justify-center group-hover:bg-[#1e2556] flex-shrink-0">
                  <FeatureIcon index={idx} className="w-3 h-3 md:w-4 md:h-4 text-[#7cc6ee] group-hover:text-white" />
                </span>
                <span className="text-xs md:text-sm text-[#2d2d2d] group-hover:text-[#1e2556]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
          
          <button 
            className="w-full px-3 md:px-4 py-2 bg-[#1e2556] text-white rounded-lg text-xs md:text-sm font-medium hover:bg-[#161c44] disabled:bg-gray-500 disabled:hover:bg-gray-500"
            disabled={isComingSoon}
            onClick={() => router.push(href)}
          >
            <span className="flex items-center justify-center gap-1">
              {buttonText}
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
            </span>
          </button>
        </div>

        <div className="w-full md:w-1/2">
          <div className="relative">
            <div className="absolute -inset-2 bg-[#1e2556] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-white p-3 md:p-6 rounded-2xl shadow-xl transform group-hover:scale-[1.02] transition-all duration-500 border border-[#7cc6ee]/10">
              <div className="absolute inset-0 bg-[#f5f7fa] rounded-2xl opacity-50"></div>
              
              {imagePath ? (
                <img
                  src={imagePath}
                  alt={imageAlt || title}
                  className="relative z-10 w-full h-auto object-cover rounded-xl shadow-lg"
                />
              ) : (
                <div className="relative z-10 w-full rounded-xl shadow-lg bg-[#f5f7fa]">
                  {/* 16:9 aspect ratio placeholder */}
                  <div className="pb-[56.25%]"></div>
                </div>
              )}
              
              {isComingSoon && (
                <div className="absolute h-100 w-100 inset-0 rounded-xl z-20 flex items-center justify-center">
                  <div className="text-[#1e2556] text-lg md:text-2xl font-bold">Coming Soon</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsShowcase = () => {
    const sections = [
        {
          header: null,
          icon: BarChart3,
          description: "The Fastest & Easiest way to optimize your legal workflow is here",
          products: [{
            title: "Workflow Analysis",
            subtitle: "Analyze your legal workflows for efficiency",
            
            features: [
              "Identify red flags in operational processes",
              "Discover automation opportunities to save time and reduce errors",
              "Generate implementation plans for seamless integration",
              "Highlight potential wins to maximize productivity and ROI"
            ],
            buttonText: "Try Workflow Analysis",
            href: "/workflow-analysis",
            imagePath: "images/workflow dashboard.png", 
            icon: BarChart3,
            isComingSoon: false
          }]
        },
        {
          header: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
          icon: Search,
          description: "Find, Compare & Evaluate 1,000+ Legal Tech Products",
          products: [{
            title: "Directory",
            subtitle: "Software Discovery Made Easy",
            
            features: [
              "Identify your legal team's unique needs efficiently",
              "Build a customized feature list for ideal solutions",
              "Filter and compare software tailored to your requirements",
              "Kickstart direct conversations with vendors"
            ],
            buttonText: "Try Directory",
            href:"/directory",
            imagePath: "images/directory.png",
            icon: Search,
            isComingSoon: false
          }]
        },
        {
          header: "Legal ops case studies, Tech adoption guides & comprehensive reports",
          icon: BookOpen,
          description: "Legal ops case studies, Tech adoption guides & comprehensive reports",
          products: [{
            title: "Learning",
            subtitle: "Legal Technology Learning Simplified",
            
            features: [
              "Utilize grids and matrices to identify the best legal tech solutions",
              "Access comprehensive guides on industry best practices",
              "Explore feature-specific articles to deepen your understanding of tools",
              "Leverage learning resources to make the most of your chosen solutions"
            ],
            buttonText: "Try Learning",
            href:"https://blog.dreamlegal.in/",
            imagePath: "images/blog.png",
            icon: BookOpen,
            isComingSoon: false
          }]
        },
        {
          header: "Increase business profitability & Revenue through KPI Analysis",
          icon: TrendingUp,
          description: "Increase business profitability & Revenue through KPI Analysis",
          products: [{
            title: "KPI Analysis",
            subtitle: "Legal operations metrics for business growth",
           
            features: [
              "Monitor key legal operations KPIs effectively",
              "Assess the overall health of your legal operations",
              "Enhance operations to drive business growth",
              "Detect and address changes in legal workflows proactively"
            ],
            href:"/",
            buttonText: "Coming Soon",
            imagePath: '',
            icon: TrendingUp,
            isComingSoon: true
          }]
        },
        {
          header: "Smooth Data migration, employee training, clear roadmap and integrations",
          icon: Settings,
          description: "Smooth Data migration, employee training, clear roadmap and integrations",
          products: [{
            title: "Change Management",
            subtitle: "Process based Change Management",
           
            features: [
              "Seamlessly onboard technology with roadmap",
              "Measure impact with clear metrics and actionable insights",
              "Ensure team readiness for smooth adoption and integration",
              "Manage data and access securely for optimal efficiency"
            ],
            href:"/",
            buttonText: "Coming Soon",
            imagePath: '',
            icon: Settings,
            isComingSoon: true
          }]
        }
      ];
     

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-8 md:mb-16">
        <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-2 bg-[#f5f7fa] rounded-full text-[#7cc6ee] mb-4 md:mb-6">
          <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
          <span className="text-xs md:text-sm font-medium">Premium Legal Solutions</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-[#1e2556]">
          Explore our suit of products
        </h1>
        
        <p className="text-[#2d2d2d] text-base md:text-lg max-w-2xl mx-auto px-4">
          Explore our suit of products to scale your Legal ops before, during, and after Legal Tech implementation
        </p>
      </div>

      <div className="relative mx-auto py-8 md:py-12 my-8 md:my-12 rounded-2xl shadow-2xl overflow-hidden">
        {/* <div className="absolute inset-0 bg-[#f5f7fa] rounded-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e25561A_1px,transparent_1px),linear-gradient(to_bottom,#1e25561A_1px,transparent_1px)] bg-[size:14px_14px] rounded-2xl" /> */}
        
        <div className="relative">
          <div className="space-y-12 md:space-y-24">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-6">
                {section.description && (
                   <div className="relative mb-8 md:mb-16">
                     {/* Main card container */}
                     <div className="relative bg-[#1e2556] rounded-2xl p-4 md:p-8 shadow-xl overflow-hidden">
                       {/* Decorative circles */}
                       <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-[#7cc6ee]/20 rounded-full transform translate-x-1/2 -translate-y-1/2" />
                       <div className="absolute bottom-0 left-0 w-32 md:w-64 h-32 md:h-64 bg-[#7cc6ee]/20 rounded-full transform -translate-x-1/2 translate-y-1/2" />
                       
                       {/* Content container */}
                       <div className="relative flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                         <div className="flex-1 space-y-3 md:space-y-4 text-center md:text-left">
                           <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug">
                             {section.description}
                           </h2>
                         </div>
                       </div>
                     </div>
                   </div>
                )}

                {section.products.map((product, productIndex) => (
                  <ProductCard 
                    key={productIndex} 
                    {...product} 
                    index={sectionIndex} 
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};