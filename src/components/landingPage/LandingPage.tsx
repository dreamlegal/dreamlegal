"use client"


import React, { useState } from 'react';
import { Users, Zap, BarChart3, LineChart, Layout, BrainCircuit, } from 'lucide-react';
import VideoPlayer  from "@/app/tech_vendor/HomaPageComponents/VideoPlayer"
import ITServicesSection from "./SectionTwo"
import DigitalServicesSection from "./SectionThree"
import ContactFaq from "@/components/ContactFaq"
import SectionSix from "./SectionSix"
import SectionFour from "./SectionFour"
import SectionFive from "./SectionFive"
import SectionSeven from "./SectionSeven"
import SectionOne from "./SectionOne"
const LandingPage = () => {
  const [email, setEmail] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [hoveredCard, setHoveredCard] = useState(null);

  const FloatingElement = ({ children, className, delay = 0 }) => (
    <div className={className}>
      {children}
    </div>
  );

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success' as 'success' | 'error'
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setAlert({
        show: true,
        message: 'Please enter a valid email address',
        type: 'error'
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/save-potential-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          typeOfLead: 'user'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register email');
      }

      setAlert({
        show: true,
        message: 'Thank you for your interest! We\'ll be in touch soon.',
        type: 'success'
      });

      // Clear the form
      setEmail('');

    } catch (error) {
      console.error('Submission error:', error);
      setAlert({
        show: true,
        message: error instanceof Error ? error.message : 'Failed to submit email',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Gradient Overlay */}
      {/*  */}

     


     

      {/* Animated Background Elements */}
     
      {/* Floating particles */}
    
<SectionOne/>
      <ITServicesSection/>
     <SectionFive/>
      <DigitalServicesSection/>
     <SectionFour/>
      <SectionSix/>
      <SectionSeven/>
    {/* <ContactFaq/> */}

      {/* <LegalProblemsSection/>
      <FinalSection/>
      <DownloadBox/> */}

      {/* Additional Floating Elements */}
    

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .animate-draw {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 2s ease-in-out forwards;
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

import { Building2, Briefcase,  } from 'lucide-react';



import { X, ArrowRight, Sparkles } from 'lucide-react';











import { useRef,  } from 'react';
import { Cpu, MousePointerClick,  FileText,  } from 'lucide-react';

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



import { InlineWidget } from 'react-calendly';






import { motion } from 'framer-motion';

import { Scale, Banknote, Clock, Laptop } from 'lucide-react';









import { Download, Mail } from 'lucide-react';

import Alert from '@/components/Alert';


