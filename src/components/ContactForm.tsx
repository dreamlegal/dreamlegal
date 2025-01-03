
"use client";
import React, { useState } from 'react';
import { Send, Linkedin, Instagram, MessageSquare } from 'lucide-react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
  });

  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Email sent successfully');
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          message: '',
        });
      } else {
        alert('Error sending email');
      }
    } catch (error) {
      alert('Error sending email');
    }
  };

  return (
    <div className="relative w-full">
      {/* Animated background gradient - Adjusted for mobile */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-blue-50 opacity-50 rounded-lg md:rounded-xl" />

      <form onSubmit={handleSubmit} className="relative bg-white/80 backdrop-blur-sm px-3 md:px-5 py-4 md:py-6 space-y-4 md:space-y-6 rounded-lg md:rounded-xl">
        {/* Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 font-clarity">
          <div className="flex flex-col gap-1.5 md:gap-2 group">
            <label 
              htmlFor="name" 
              className="text-xs font-bold text-gray-900 ml-2 group-hover:text-blue-600 transition-colors duration-300"
            >
              Full name
            </label>
            <div className="relative">
              <input
                type="text"
                className={`rounded-full border-2 text-sm px-4 md:px-5 py-3 md:py-4 w-full transition-all duration-300
                  ${focusedField === 'name' 
                    ? 'border-blue-400 shadow-lg shadow-blue-100' 
                    : 'border-slate-200 shadow-sm hover:border-blue-200'}`}
                placeholder="What is your name?"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField('')}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 md:gap-2 group">
            <label 
              htmlFor="email" 
              className="text-xs font-bold text-gray-900 ml-2 group-hover:text-blue-600 transition-colors duration-300"
            >
              Email address
            </label>
            <input
              type="email"
              className={`rounded-full border-2 text-sm px-4 md:px-5 py-3 md:py-4 w-full transition-all duration-300
                ${focusedField === 'email' 
                  ? 'border-blue-400 shadow-lg shadow-blue-100' 
                  : 'border-slate-200 shadow-sm hover:border-blue-200'}`}
              placeholder="What is your email?"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField('')}
              required
            />
          </div>
        </div>

        {/* Phone and Organization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 font-clarity">
          <div className="flex flex-col gap-1.5 md:gap-2 group">
            <label 
              htmlFor="phone" 
              className="text-xs font-bold text-gray-900 ml-2 group-hover:text-blue-600 transition-colors duration-300"
            >
              Phone number
            </label>
            <input
              type="text"
              className={`rounded-full border-2 text-sm px-4 md:px-5 py-3 md:py-4 w-full transition-all duration-300
                ${focusedField === 'phone' 
                  ? 'border-blue-400 shadow-lg shadow-blue-100' 
                  : 'border-slate-200 shadow-sm hover:border-blue-200'}`}
              placeholder="What is your Phone number?"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField('')}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 md:gap-2 group">
            <label 
              htmlFor="organization" 
              className="text-xs font-bold text-gray-900 ml-2 group-hover:text-blue-600 transition-colors duration-300"
            >
              Organization
            </label>
            <input
              type="text"
              className={`rounded-full border-2 text-sm px-4 md:px-5 py-3 md:py-4 w-full transition-all duration-300
                ${focusedField === 'organization' 
                  ? 'border-blue-400 shadow-lg shadow-blue-100' 
                  : 'border-slate-200 shadow-sm hover:border-blue-200'}`}
              placeholder="ex. Microsoft"
              name="organization"
              id="organization"
              value={formData.organization}
              onChange={handleChange}
              onFocus={() => setFocusedField('organization')}
              onBlur={() => setFocusedField('')}
              required
            />
          </div>
        </div>

        {/* Message */}
        <div className="grid grid-cols-1 gap-3 md:gap-4 font-clarity">
          <div className="flex flex-col gap-1.5 md:gap-2 group">
            <label 
              htmlFor="message" 
              className="text-xs font-bold text-gray-900 ml-2 group-hover:text-blue-600 transition-colors duration-300"
            >
              Message
            </label>
            <textarea
              className={`rounded-xl border-2 text-sm px-4 md:px-5 py-3 md:py-4 w-full transition-all duration-300 resize-none
                ${focusedField === 'message' 
                  ? 'border-blue-400 shadow-lg shadow-blue-100' 
                  : 'border-slate-200 shadow-sm hover:border-blue-200'}`}
              placeholder="Tell us about your query..."
              name="message"
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField('')}
              required
            />
          </div>
        </div>

        {/* Submit and Social Links - Mobile optimized */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center pt-2 md:pt-4">
          <button
            type="submit"
            className="group flex gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold px-5 md:px-6 py-2.5 md:py-3 text-sm transition-all duration-300 items-center hover:opacity-90 w-full sm:w-auto justify-center sm:justify-start"
          >
            Send Message
            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          <div className="flex gap-3 md:gap-4 items-center flex-wrap justify-center sm:justify-start w-full sm:w-auto">
            {[
              { icon: Linkedin, href: "https://www.linkedin.com/company/dreamlegal", label: "LinkedIn" },
              { icon: MessageSquare, href: "https://wa.link/jqy0vt", label: "WhatsApp" },
              { icon: Instagram, href: "https://www.instagram.com/dreamlegal_?igsh=MTZ3dnloNjdydmYzcQ==", label: "Instagram" }
            ].map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
                aria-label={social.label}
              >
                <div className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-300">
                  <social.icon className="w-4 h-4 md:w-5 md:h-5 transform group-hover:scale-110 transition-transform duration-300" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </form>

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        .animate-shimmer {
          background: linear-gradient(
            to right,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.8) 50%,
            rgba(255,255,255,0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default ContactForm;