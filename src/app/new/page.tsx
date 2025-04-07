"use client"
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Target, PieChart, TrendingDown, AlertTriangle, Zap, Rocket, Award, FileSpreadsheet, Compass, BarChart2 } from 'lucide-react';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.2, ...options });

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting];
};

// Hero Section Component
const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
  };

  return (
    <section className="w-full min-h-screen relative overflow-hidden bg-[#1e2556] py-16">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-[#1e2556]" />
      <div className="absolute inset-0 opacity-30 bg-[#7cc6ee]/10" />
      
      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <span className="text-xs sm:text-sm font-semibold text-[#7cc6ee] mb-4 tracking-wider">
            THE FUTURE OF ENTERPRISE SOLUTIONS
          </span>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-4xl mx-auto mb-4 sm:mb-6 px-4">
            Transform Your Business With
            <span className="text-[#7cc6ee]"> Data-Driven Intelligence</span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
            Streamline operations, enhance efficiency, and make informed decisions with our comprehensive enterprise platform
          </p>

          {/* Email subscription */}
          <div className="max-w-xl w-full mx-auto mt-8 sm:mt-12 px-4">
            <form onSubmit={handleSubmit}>
              <div className={`flex flex-col sm:flex-row gap-3 transition-all duration-200 
                             ${isInputFocused ? 'transform -translate-y-1' : ''}`}>
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    placeholder="Enter your work email"
                    className="w-full px-6 py-4 bg-white rounded-xl text-[#2d2d2d] placeholder-[#334155]/50
                               border-2 border-[#7cc6ee]/20 focus:border-[#7cc6ee] outline-none
                               shadow-sm hover:shadow-md focus:shadow-lg
                               transition-all duration-200"
                  />
                  {isInputFocused && (
                    <div className="absolute -bottom-2 left-6 text-xs text-[#7cc6ee] bg-white px-2">
                      Work email address
                    </div>
                  )}
                </div>
                <button 
                  type="submit"
                  className="group relative px-8 py-4 bg-[#7cc6ee] text-[#1e2556] rounded-xl font-medium
                             shadow-sm hover:shadow-md hover:bg-[#60b2df]
                             transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Get started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Problem Section Component
const ProblemSection = () => {
  const [sectionRef, isInView] = useIntersectionObserver();

  const problems = [
    {
      icon: AlertTriangle,
      title: "Resource Inefficiency",
      description: "Manual processes consume valuable time and resources, creating bottlenecks that hinder productivity and limit growth potential.",
      stat: "42%",
      impact: "Productivity Loss"
    },
    {
      icon: PieChart,
      title: "Fragmented Data Systems",
      description: "Siloed information across departments leads to inconsistent reporting, delayed insights, and missed opportunities for strategic decisions.",
      stat: "58%",
      impact: "Decision Delays"
    },
    {
      icon: TrendingDown,
      title: "Scaling Limitations",
      description: "Legacy systems struggle to adapt to changing business needs, creating technical debt and restricting expansion into new markets.",
      stat: "37%",
      impact: "Growth Constraints"
    }
  ];

  return (
    <div ref={sectionRef} className="w-full bg-[#f5f7fa] pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className={`mb-20 text-center relative transition-all duration-700 transform
                        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block">
            <span className="block text-sm font-semibold text-[#7cc6ee] mb-2 tracking-wider">
              CHALLENGES WE SOLVE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e2556] mb-4 relative inline-block">
              Common Enterprise Challenges
              <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-[#7cc6ee] 
                             transform origin-left transition-transform duration-1000 
                             ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
            </h2>
            <p className="text-[#2d2d2d] mt-6 max-w-2xl mx-auto text-lg">
              Identify and address the critical obstacles preventing your organizational growth
            </p>
          </div>
        </div>

        {/* Problem Cards */}
        <div className="flex flex-col md:flex-row gap-8 relative">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className={`relative flex-1 group transition-all duration-700 transform
                           ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Card */}
                <div className="relative rounded-2xl overflow-hidden h-full">
                  {/* Card background */}
                  <div className="absolute inset-0 bg-white shadow-md" />
                  
                  {/* Content container */}
                  <div className="relative p-8 h-full flex flex-col">
                    {/* Icon with background effect */}
                    <div className="mb-6 relative">
                      <div className="absolute inset-0 bg-[#7cc6ee]/10 rounded-full blur-xl transform group-hover:scale-110 transition-transform" />
                      <div className="relative w-14 h-14 rounded-2xl bg-[#1e2556] 
                                    flex items-center justify-center shadow-lg
                                    transform group-hover:-translate-y-1 transition-transform">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>

                    {/* Text content */}
                    <h3 className="text-xl font-bold text-[#1e2556] mb-3 group-hover:text-[#7cc6ee] transition-colors">
                      {problem.title}
                    </h3>
                    <p className="text-[#2d2d2d] mb-6 leading-relaxed flex-grow">
                      {problem.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm mt-auto">
                      <div className="font-bold text-2xl text-[#7cc6ee]">
                        {problem.stat}
                      </div>
                      <div className="text-[#334155] font-medium">
                        {problem.impact}
                      </div>
                    </div>

                    {/* Bottom highlight */}
                    <div className="absolute bottom-0 left-4 right-4 h-1 bg-[#7cc6ee]/20
                                  transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const [activeTab, setActiveTab] = useState('analytics-dashboard');
  const [sectionRef, isInView] = useIntersectionObserver();
  
  const services = [
    {
      id: 'analytics-dashboard',
      icon: BarChart2,
      title: 'Analytics Dashboard',
      content: {
        title: 'Comprehensive Analytics',
        description: 'Gain powerful insights with our interactive analytics dashboard',
        features: [
          'Real-time data visualization and reporting',
          'Customizable KPIs and performance metrics',
          'AI-powered trend analysis and forecasting',
          'Exportable reports for stakeholder presentations'
        ],
        buttonText: "Explore Analytics",
        imagePath: "/api/placeholder/600/340",
      }
    },
    {
      id: 'workflow-automation',
      icon: Zap,
      title: 'Workflow Automation',
      content: {
        title: 'Streamline Operations',
        description: 'Automate repetitive tasks and optimize business processes',
        features: [
          'Visual workflow builder with drag-and-drop interface',
          'Conditional logic and decision trees',
          'Integration with existing business systems',
          'Automated notifications and escalations'
        ],
        buttonText: "Explore Automation",
        imagePath: "/api/placeholder/600/340",
      }
    },
    {
      id: 'resource-optimization',
      icon: Rocket,
      title: 'Resource Optimization',
      content: {
        title: 'Maximize Efficiency',
        description: 'Optimize resource allocation for maximum ROI and productivity',
        features: [
          'AI-driven resource allocation recommendations',
          'Capacity planning and utilization tracking',
          'Predictive modeling for resource requirements',
          'Cost management and budget optimization'
        ],
        buttonText: "Explore Optimization",
        imagePath: "/api/placeholder/600/340",
      }
    },
    {
      id: 'performance-insights',
      icon: Target,
      title: 'Performance Insights',
      content: {
        title: 'Performance Analytics',
        description: 'Track, measure, and improve key performance metrics',
        features: [
          'Customizable performance dashboards',
          'Benchmarking against industry standards',
          'Team and individual performance tracking',
          'Goal setting and achievement monitoring'
        ],
        buttonText: "Explore Insights",
        imagePath: "/api/placeholder/600/340",
      }
    },
    {
      id: 'strategic-planning',
      icon: Compass,
      title: 'Strategic Planning',
      content: {
        title: 'Future-Proof Planning',
        description: 'Develop and track strategic initiatives with data-driven insights',
        features: [
          'Scenario planning and what-if analysis',
          'OKR and goal tracking frameworks',
          'Initiative management and progress reporting',
          'Strategic alignment visualization'
        ],
        buttonText: "Explore Planning",
        imagePath: "/api/placeholder/600/340",
      }
    },
    {
      id: 'compliance-management',
      icon: FileSpreadsheet,
      title: 'Compliance Management',
      content: {
        title: 'Simplified Compliance',
        description: 'Streamline regulatory compliance and risk management',
        features: [
          'Automated compliance monitoring and alerts',
          'Document management and version control',
          'Audit trails and compliance reporting',
          'Risk assessment and mitigation tools'
        ],
        buttonText: "Explore Compliance",
        imagePath: "/api/placeholder/600/340",
      }
    }
  ];
  
  const activeService = services.find(s => s.id === activeTab) || services[0];

  const ServiceTab = ({ service, isActive, onClick, index, isInView }) => {
    const Icon = service.icon;
    
    return (
      <div
        onClick={() => onClick(service.id)}
        className={`
          cursor-pointer flex items-center gap-3 px-6 py-4 w-full
          relative group transition-all duration-300
          transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          ${isActive ? 'text-[#7cc6ee] font-medium' : 'text-[#2d2d2d]'}
        `}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        {isActive && (
          <div
            className="absolute inset-0 bg-[#f5f7fa] -z-10"
          />
        )}
        
        <Icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-300
          ${isActive ? 'text-[#7cc6ee]' : 'text-[#334155] group-hover:text-[#7cc6ee]'}`} />
        <span className="text-sm md:text-base whitespace-nowrap">
          {service.title}
        </span>
        
        <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-[#7cc6ee] transform scale-y-0 transition-transform duration-300
                      ${isActive ? 'scale-y-100' : 'group-hover:scale-y-50'}`} />
      </div>
    );
  };

  return (
    <div
      ref={sectionRef}
      className="w-full bg-white pt-16 pb-16 relative"
    >
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className={`mb-16 text-center relative transition-all duration-700 transform
                        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block">
            <span className="block text-sm font-semibold text-[#7cc6ee] mb-2 tracking-wider">
              POWERFUL CAPABILITIES
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e2556] mb-4 relative inline-block">
              Our Solution Suite
              <div
                className={`absolute -bottom-2 left-0 right-0 h-1 bg-[#7cc6ee] 
                            transform origin-left transition-transform duration-1000 
                            ${isInView ? 'scale-x-100' : 'scale-x-0'}`}
              />
            </h2>
            <p className="text-[#2d2d2d] mt-4 max-w-xl mx-auto text-lg">
              Comprehensive tools designed to solve your most complex business challenges
            </p>
          </div>
        </div>

        <div className={`bg-[#f5f7fa] rounded-2xl shadow-xl border border-[#7cc6ee]/10 overflow-hidden
                        transform transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex border-b border-[#7cc6ee]/10">
            {services.map((service, index) => (
              <div key={service.id} className="flex-1">
                <ServiceTab 
                  service={service}
                  isActive={activeTab === service.id}
                  onClick={setActiveTab}
                  index={index}
                  isInView={isInView}
                />
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-8 p-8">
            <div className={`space-y-8 transition-all duration-700 delay-300 transform md:w-1/2
                            ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div>
                <h2 className="text-3xl font-bold text-[#1e2556] mb-4">
                  {activeService.content.title}
                </h2>
                <p className="text-[#2d2d2d]">
                  {activeService.content.description}
                </p>
              </div>

              <div className="space-y-4">
                {activeService.content.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-[#2d2d2d]"
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-[#7cc6ee] flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                className="px-8 py-3 bg-[#1e2556] 
                          rounded-lg text-white font-medium relative overflow-hidden"
              >
                <span className="relative z-10">{activeService.content.buttonText}</span>
              </button>
            </div>

            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-2 bg-[#1e2556] rounded-2xl blur opacity-20 transition duration-300"></div>
                
                <div className="relative bg-white p-3 md:p-6 rounded-2xl shadow-xl transform transition-all duration-500 border border-[#7cc6ee]/10">
                  <div className="absolute inset-0 bg-[#f5f7fa] rounded-2xl opacity-50"></div>
                  
                  <img
                    src={activeService.content.imagePath}
                    alt={activeService.content.title}
                    className="relative z-10 w-full h-auto object-cover rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// CTA Section Component
const CTASection = () => {
  const [sectionRef, isInView] = useIntersectionObserver();

  return (
    <div ref={sectionRef} className="w-full bg-[#1e2556] py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`transition-all duration-700 transform
                        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          <div className="relative bg-white rounded-3xl shadow-xl border border-[#7cc6ee]/10 overflow-hidden">
            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f5f7fa] rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f5f7fa] rounded-tr-full" />

            <div className="relative p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between 
                          gap-8 md:gap-12">
              {/* Left side with text */}
              <div className="text-center md:text-left space-y-6 max-w-2xl">
                <span className={`inline-block text-sm font-semibold text-[#7cc6ee] tracking-wider
                                transition-all duration-700 delay-300
                                ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  START YOUR JOURNEY
                </span>
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e2556] transition-all duration-700 delay-500
                              ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Transform Your{' '}
                  <span className="text-[#7cc6ee]">
                    Business Today
                  </span>
                </h2>
                <p className={`text-lg text-[#2d2d2d] transition-all duration-700 delay-700
                            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Join thousands of companies already growing with our enterprise solutions
                </p>
              </div>
              
              {/* Right side with button */}
              <div className={`transition-all duration-700 delay-1000
                            ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <button 
                  className="group relative px-8 py-5 bg-[#1e2556] hover:bg-[#161c44] rounded-xl 
                                  text-white font-semibold text-lg transition-all duration-300
                                  hover:shadow-lg transform hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Achievements Section Component
const AchievementsSection = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [sectionRef, isInView] = useIntersectionObserver();
  
  const achievements = [
    {
      icon: <Target className="w-6 h-6" />,
      metric: "98",
      suffix: "%",
      title: "Client Satisfaction",
      description: "We pride ourselves on delivering exceptional service and solutions that exceed client expectations.",
      accentColor: "bg-[#7cc6ee]"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      metric: "32",
      prefix: "+",
      suffix: "%",
      title: "Efficiency Improvement",
      description: "Our clients report significant improvements in operational efficiency after implementing our solutions.",
      accentColor: "bg-[#1e2556]"
    },
    {
      icon: <Award className="w-6 h-6" />,
      metric: "15",
      suffix: "+",
      title: "Industry Awards",
      description: "Our innovative approach has been recognized with multiple industry accolades and awards.",
      accentColor: "bg-[#7cc6ee]"
    }
  ];

  // Custom hook for animated counter
  const useCounter = (end, duration = 2000, start = 0, shouldStart = false) => {
    const [count, setCount] = useState(start);
    
    useEffect(() => {
      if (!shouldStart) return;
      
      let startTime;
      let animationFrame;
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * (end - start) + start);
        
        setCount(current);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, start, shouldStart]);
    
    return count;
  };

  const AnimatedMetric = ({ value, suffix = '', prefix = '', isVisible }) => {
    const count = useCounter(parseFloat(value), 2000, 0, isVisible);
    
    const formattedCount = suffix === '%' ? count.toFixed(1) : count;
    
    return (
      <div className="relative">
        <span className={`text-3xl font-bold transition-all duration-300
                       ${isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-4'}`}>
          {prefix}{formattedCount}{suffix}
        </span>
        <div className="absolute -inset-1 bg-[#1e2556]/20 
                      blur-lg transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
      </div>
    );
  };

  return (
    <div className="w-full bg-[#1e2556] py-12 md:py-24 relative overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header section */}
        <div className={`mb-8 md:mb-20 text-center relative transition-all duration-700 transform
                        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block">
            <span className="block text-xs sm:text-sm font-semibold text-[#7cc6ee] mb-2 tracking-wider">
              PROVEN RESULTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 relative inline-block">
              Our Impact
              <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-[#7cc6ee] 
                             transform origin-left transition-transform duration-1000 
                             ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
            </h2>
            <p className="text-sm sm:text-base text-white/80 mt-4 max-w-xl mx-auto px-4 sm:px-0">
              Transforming businesses with innovative solutions and measurable results
            </p>
          </div>
        </div>

        {/* Main achievements container */}
        <div className="relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-[#7cc6ee]/20" />

          {/* Responsive flex container - centered */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`relative group transform transition-all duration-700 w-full md:w-1/3 max-w-sm
                            ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                            ${activeIndex === index ? 'scale-100 md:scale-105 z-10' : 'scale-95 opacity-90'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="relative overflow-hidden rounded-xl bg-white p-4 sm:p-6 
                                 border border-[#7cc6ee]/10 
                                 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#1e2556] opacity-0 
                                  group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="p-2 sm:p-2.5 bg-[#1e2556] rounded-md
                                    transition-colors duration-300">
                      <div className="text-white transition-colors duration-300">
                        {achievement.icon}
                      </div>
                    </div>
                    <AnimatedMetric 
                      value={achievement.metric}
                      suffix={achievement.suffix}
                      prefix={achievement.prefix}
                      isVisible={isInView}
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-semibold text-[#1e2556]">
                      {achievement.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main HomePage Component
const ModernHomePage = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <HeroSection />
      <ProblemSection />
      <AchievementsSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default ModernHomePage;