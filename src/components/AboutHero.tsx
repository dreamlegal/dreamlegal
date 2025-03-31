
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Globe } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  React.useEffect(() => {
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

const Stats = () => {
  const stats = [
    { icon: Award, value: "10+", label: "Awards" },
    { icon: Users, value: "1000+", label: "Clients" },
    { icon: Globe, value: "15+", label: "Countries" },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm 
                  border-t border-[#7cc6ee]/20 py-4 px-6 rounded-b-2xl">
      <div className="flex justify-around">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center gap-3">
              <div className="p-2 bg-[#f5f7fa] rounded-lg">
                <Icon className="w-5 h-5 text-[#7cc6ee]" />
              </div>
              <div>
                <div className="text-lg font-bold text-[#1e2556]">{stat.value}</div>
                <div className="text-sm text-[#334155]">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const AboutHero = () => {
  const [sectionRef, isInView] = useIntersectionObserver();

  return (
    <div ref={sectionRef} className="w-full bg-gradient-to-b from-[#f5f7fa]/80 to-white pt-32 pb-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e255608_1px,transparent_1px),linear-gradient(to_bottom,#1e255608_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/90 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/90 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="inline-flex items-center gap-2 bg-[#f5f7fa] text-[#7cc6ee] px-4 py-2 rounded-full 
                          text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-[#7cc6ee] rounded-full" />
              ABOUT US
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1e2556] mb-6"
            >
              About DreamLegal
              <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#1e2556] to-[#7cc6ee]" />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-[#2d2d2d] leading-relaxed mb-10"
            >
              We simplify selection, onboarding and management of technology for
              legal professionals and teams. Our mission is to make technology an
              effortless part of your daily workflow, enhancing your practice and
              easing your workload.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <Link href="/directory">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 py-4 bg-[#1e2556] rounded-xl text-white font-medium 
                           overflow-hidden transition-all duration-200"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Directory
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#161c44] to-[#1e2556] 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              </Link>

              <a href="https://blog.dreamlegal.in" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group px-8 py-4 bg-white border border-[#7cc6ee]/20 text-[#1e2556] rounded-xl 
                           font-medium hover:border-[#7cc6ee]/40 hover:bg-[#f5f7fa] transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    Resources
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </a>
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white">
              <Image
                src="/aboutus2.png"
                width={1260}
                height={750}
                alt="About DreamLegal"
                className="w-full h-full object-cover"
              />
              <Stats />
            </div>
          </motion.div>
        </div>
        <FeaturedSection/>
        {/* Achievement Section */}
        <div className="mt-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 bg-[#f5f7fa] text-[#7cc6ee] px-4 py-2 
                          rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-[#7cc6ee] rounded-full" />
              RECOGNITION
            </span>
            <h2 className="mt-6 text-3xl font-bold text-[#1e2556]">
              Achievements and Mentions
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="group relative bg-white rounded-xl p-4 shadow-lg hover:shadow-xl 
                          transition-all duration-200"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7fa] to-transparent 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="relative">
                  <img
                    src={`/${index}.png`}
                    alt={`Achievement ${index}`}
                    className="h-20 md:h-24 w-auto mx-auto transition-all duration-200 
                             group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AboutHero;

const FeaturedSection = () => {
  return (
    <div className="mt-32 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mb-16"
      >
        <span className="inline-flex items-center gap-2 bg-[#f5f7fa] text-[#7cc6ee] px-4 py-2 
                      rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-[#7cc6ee] rounded-full" />
          Incubated At 
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        whileHover={{ y: -5 }}
        className="max-w-2xl mx-auto group relative bg-white rounded-xl p-8 shadow-lg 
                  hover:shadow-xl transition-all duration-200"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f7fa] to-transparent 
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        <div className="relative">
          <img
            src="/logos/NSRCEL.png"
            alt="Featured Project"
           className="h-20 md:h-24 w-auto mx-auto transition-all duration-200 
                             group-hover:scale-105"
          />
        </div>
      </motion.div>
    </div>
  );
};