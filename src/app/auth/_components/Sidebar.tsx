'use client'

import { useState, useEffect } from 'react'
import { 
  Home, 
  Box, 
  Briefcase, 
  Users, 
  Star, 
  FileText,
  MessageSquare,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Link,
  Menu,
  X
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className = '' }: SidebarProps) => {
  const [isVendor, setIsVendor] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const navigationItems = [
    { icon: Home, text: 'Home' },
    { icon: Box, text: 'Products' },
    { icon: Briefcase, text: 'Workflow' },
    { icon: Users, text: 'About Us' },
    { icon: Star, text: 'Testimonials' },
    { icon: FileText, text: 'Blog' },
  ]

  const socialIcons = [Facebook, Twitter, Linkedin, Youtube, Link]

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  }

  if (isMobile) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="bg-white/80 backdrop-blur-lg shadow-sm px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-semibold text-sm text-gray-900">
                DreamLegal
              </span>
            </div>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={mobileMenuVariants}
                className="bg-white/80 backdrop-blur-lg shadow-lg p-4 mx-2 mt-2 rounded-xl"
              >
                <div className="space-y-1 mb-4">
                  {navigationItems.map((item) => (
                    <button
                      key={item.text}
                      className="w-full flex items-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 text-sm"
                    >
                      <item.icon size={16} />
                      <span className="font-medium">{item.text}</span>
                    </button>
                  ))}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4" />

                <button
                  onClick={() => setIsVendor(!isVendor)}
                  className="w-full mb-4 px-3 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 text-sm"
                >
                  {isVendor ? 'Switch to User' : 'Switch to Vendor'}
                </button>

                <div className="bg-gray-50 p-3 rounded-xl mb-4">
                  <h2 className="font-semibold mb-3 text-sm text-gray-900">Contact us</h2>
                  <div className="flex justify-between items-center">
                    <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
                      <MessageSquare size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
                      <span className="text-xs text-gray-600 group-hover:text-gray-900">Chat</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
                      <Mail size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
                      <span className="text-xs text-gray-600 group-hover:text-gray-900">Email</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
                      <Phone size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
                      <span className="text-xs text-gray-600 group-hover:text-gray-900">Call</span>
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-2">
                  <div className="flex justify-between">
                    {socialIcons.map((Icon, index) => (
                      <button
                        key={index}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 transition-all duration-200"
                      >
                        <Icon size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    )
  }

  return (
    <div className={`w-64 bg-white p-6 shadow-lg fixed top-4 left-8 bottom-4 rounded-2xl overflow-y-auto ${className}`}>
      {/* Logo Section */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 bg-gray-900 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">D</span>
        </div>
        <span className="font-semibold text-sm text-gray-900">
          DreamLegal
        </span>
      </div>

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

      {/* Navigation Links */}
      <div className="space-y-1 mb-6">
        {navigationItems.map((item) => (
          <button
            key={item.text}
            className="w-full flex items-center gap-2 p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 text-sm"
          >
            <item.icon size={16} />
            <span className="font-medium">{item.text}</span>
          </button>
        ))}
      </div>

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6" />

      {/* Vendor Switch */}
      <button
        onClick={() => setIsVendor(!isVendor)}
        className="w-full mb-6 px-3 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-200 text-sm"
      >
        {isVendor ? 'Switch to User' : 'Switch to Vendor'}
      </button>

      {/* Chat Section */}
      <div className="mb-6 bg-gray-50 p-4 rounded-xl">
        <h2 className="font-semibold mb-3 text-sm text-gray-900">Contact us</h2>
        <div className="flex justify-between items-center mb-2">
          <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
            <MessageSquare size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
            <span className="text-xs text-gray-600 group-hover:text-gray-900">Chat</span>
          </button>
          <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
            <Mail size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
            <span className="text-xs text-gray-600 group-hover:text-gray-900">Email</span>
          </button>
          <button className="flex-1 flex flex-col items-center p-2 rounded-lg hover:bg-white transition-all duration-200 group">
            <Phone size={16} className="text-gray-600 group-hover:text-gray-900 mb-1" />
            <span className="text-xs text-gray-600 group-hover:text-gray-900">Call</span>
          </button>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-gray-50 rounded-xl p-2">
        <div className="flex justify-between">
          {socialIcons.map((Icon, index) => (
            <button
              key={index}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white text-gray-600 hover:text-gray-900 transition-all duration-200"
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
