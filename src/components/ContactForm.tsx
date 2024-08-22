"use client";
import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { RiInstagramFill } from 'react-icons/ri';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa6';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
  });

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e:any) => {
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
    <div>
      <form onSubmit={handleSubmit} className="bg-white px-5 py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-clarity">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs font-bold text-gray-900 ml-2">
              Full name
            </label>
            <input
              type="text"
              className="rounded-full border text-sm border-slate-200 px-5 py-4 shadow-sm w-full"
              placeholder="What is your name?"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-bold text-gray-900 ml-2">
              Email address
            </label>
            <input
              type="email"
              className="rounded-full border text-sm border-slate-200 px-5 py-4 shadow-sm w-full"
              placeholder="What is your email?"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-clarity">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-xs font-bold text-gray-900 ml-2">
              Phone number
            </label>
            <input
              type="text"
              className="rounded-full border text-sm border-slate-200 px-5 py-4 shadow-sm w-full"
              placeholder="What is your Phone number?"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="organization" className="text-xs font-bold text-gray-900 ml-2">
              Organization
            </label>
            <input
              type="text"
              className="rounded-full border text-sm border-slate-200 px-5 py-4 shadow-sm w-full"
              placeholder="ex. Microsoft"
              name="organization"
              id="organization"
              value={formData.organization}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-clarity">
          <div className="flex flex-col gap-2 col-span-2">
            <label htmlFor="message" className="text-xs font-bold text-gray-900 ml-2">
              Message
            </label>
            <textarea
              className="rounded-xl border text-sm border-slate-200 px-5 py-4 shadow-sm w-full"
              placeholder="Tell us about your query..."
              name="message"
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex gap-6 items-center">
          <button
            type="submit"
            className="flex gap-2 rounded-full bg-primary1 text-white font-bold px-6 py-3 text-xs transition-all w-fit items-center hover:bg-gray-900 hover:gap-4"
          >
            Send us
            <AiOutlineSend className="text-xl" />
          </button>

          <div className="flex gap-4 items-center flex-wrap">
            <div className="text-primary1 p-1 md:p-3 rounded-full bg-primary2">
              <a href="https://www.linkedin.com/company/dreamlegal">
                <FaLinkedinIn className="md:text-2xl" />
              </a>
            </div>

            <div className="text-primary1 p-1 md:p-3 rounded-full bg-primary2">
              <a href="https://wa.link/jqy0vt">
                <FaWhatsapp className="md:text-2xl" />
              </a>
            </div>

            <div className="text-primary1 p-1 md:p-3 rounded-full bg-primary2">
              <a href="https://www.instagram.com/dreamlegal_?igsh=MTZ3dnloNjdydmYzcQ==">
                <RiInstagramFill className="md:text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
