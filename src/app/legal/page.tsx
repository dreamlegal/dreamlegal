'use client';

import React, { useState } from 'react';

const LegalTechLanding = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
    
       {/* Hero Section */}
      <section className="px-6 pt-16 md:pt-24 max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e2556] leading-tight mb-8">
            Enabling Responsible technology and AI for legal industry
          </h1>
          <p className="text-lg text-[#334155] max-w-3xl mb-8 leading-relaxed">
            LegalTechPolicy.com is a Capacity Building Initiative, led by DreamLegal and Indic Pacific Legal
            Research to help legal teams implement technology responsibly for better business outcomes.
          </p>
          <button className="bg-[#1e2556] text-white px-8 py-4 text-lg font-semibold hover:opacity-90 transition-opacity border-2 border-[#1e2556]">
            Start Assessment
          </button>
        </div>

        {/* Unikorns Section */}
      
      </section>
   {/* Why This Matters Section */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Why this matters now</h2>
          
          <p className="text-lg text-gray-700 mb-12 max-w-4xl leading-relaxed">
            AI adoption in legal teams has accelerated at an unprecedented pace, becoming part of daily 
            workflows faster than most organisations ever anticipated. But with this rapid rise comes a new 
            layer of challenges that can no longer be ignored — from unapproved tool usage to hallucinated 
            outputs and real incidents reaching the courts. Here's where a hallucinated AI output is at surface.
          </p>

          {/* Stats Card */}
          <div className="bg-[#1e2556] text-white p-12 border-8 border-[#7cc6ee]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <div className="text-5xl font-bold mb-3">81%</div>
                <p className="text-white font-bold text-xl mb-2">corporate legal teams use unapproved tools</p>
                <p className="text-sm text-gray-300">
                  reported by Society of computer and laws, June 19 2025
                </p>
                <div className="mt-4 flex gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-4 h-12 bg-gradient-to-t from-orange-500 to-pink-500"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-3">120+</div>
                <p className="text-white font-bold text-xl mb-2">instances of fictitious case and court materials filed</p>
                <p className="text-sm text-gray-300">
                  reported by Business Insider, May 27, 2025
                </p>
                <div className="mt-4 flex gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-4 h-12 bg-gradient-to-t from-blue-500 to-purple-500"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-3">84%</div>
                <p className="text-white font-bold text-xl mb-2">of prompts are prone to hallucinations in legal domain</p>
                <p className="text-sm text-gray-300">
                  reported by Standford HAI, May 28, 2024
                </p>
                <div className="mt-4 flex gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-4 h-12 bg-gradient-to-t from-green-500 to-teal-500"></div>
                  ))}
                </div>
              </div>
            </div>
            <button className="mt-8 border-2 border-white text-white px-6 py-3 font-semibold hover:bg-white hover:text-[#1e2556] transition-colors">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* Enabling Legal Work Section */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-16">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-[#1e2556] mb-8 leading-tight">
              Enabling Legal Work that Flows
            </h2>
            <div className="relative w-64 h-64 mx-auto md:mx-0">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-400 rounded-full opacity-80"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl">⚖️</div>
              </div>
              <div className="absolute top-0 right-0 w-16 h-16">
                <div className="w-full h-full border-4 border-yellow-400 rounded-full"></div>
                <div className="absolute top-2 right-2 w-8 h-8 bg-pink-400 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-[#1e2556] mb-4">
                80 Actionable Standard Operating Principles
              </h3>
              <p className="text-[#2d2d2d] leading-relaxed text-lg">
                LegalTechPolicy.com isn't just a "Playbook". It is a System. But yes, 
                every good system needs some actionable SOPs. Thus, our capacity building playbook 
                and initiative relies upon 80 actionable SOPs, or what we call as Standard Operating Principles.
              </p>
            </div>

            <div className="bg-[#f5f7fa] p-8 border-l-8 border-[#1e2556]">
              <h3 className="text-3xl font-bold text-[#1e2556] mb-4">
                Principles → Real SOPs
              </h3>
              <p className="text-[#2d2d2d] leading-relaxed text-lg">
                We won't JUST provide actionable principles through a Playbook. If you become a 
                part of the LegalTechPolicy.com programme, we will even create an implementation 
                guide, real-life SOPs, and offer grounded strategic guidance in weeks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="px-6 py-16 md:py-24 bg-[#1e2556] text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            What's inside the document
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div 
              className="bg-black p-8 hover:scale-105 transition-transform cursor-pointer"
              onMouseEnter={() => setActiveCard(0)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="text-6xl mb-6">⚡</div>
              <h3 className="text-2xl font-bold mb-4">
                Corporate Governance Ethics x Accountability
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Literally fine-tuning what kind of accountability frameworks suits your company.
              </p>
            </div>

            <div 
              className="bg-black p-8 hover:scale-105 transition-transform cursor-pointer"
              onMouseEnter={() => setActiveCard(1)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="text-6xl mb-6">📊</div>
              <h3 className="text-2xl font-bold mb-4">
                Data Law Management 101
              </h3>
              <p className="text-gray-300 leading-relaxed">
                India's Data Protection Rules might take 18 months to implement (or less), but you shouldn't wait a single day.
              </p>
            </div>

            <div 
              className="bg-black p-8 hover:scale-105 transition-transform cursor-pointer"
              onMouseEnter={() => setActiveCard(2)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="text-6xl mb-6">🤝</div>
              <h3 className="text-2xl font-bold mb-4">
                Commercial Law & Vendor Management
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Real business matters a lot, especially how you handle your relations with vendors. The login way Starts here Clear, agile and calm.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              className="bg-black p-8 hover:scale-105 transition-transform cursor-pointer"
              onMouseEnter={() => setActiveCard(3)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="text-6xl mb-6">📱</div>
              <h3 className="text-2xl font-bold mb-4">
                Technology Adoption Management
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Adopting technology (even legaltech) beyond fancy UI is hard, and we get it. We solve it by creating the relationship that your CTO and Managers might eventually need.
              </p>
            </div>

            <div 
              className="bg-black p-8 hover:scale-105 transition-transform cursor-pointer"
              onMouseEnter={() => setActiveCard(4)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="text-6xl mb-6">💻</div>
              <h3 className="text-2xl font-bold mb-4">
                Integrated Knowledge & Legal Document Management
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Even if tech is settled, you know how to build a relationship with your vendors, ensuring an integrated way of managing your documents and knowledge assets, could be actually unique to your place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1e2556] mb-16">
          Who this is for
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="border-4 border-[#1e2556] p-8 hover:bg-[#f5f7fa] transition-colors">
            <h3 className="text-3xl font-bold text-[#1e2556] mb-4">Law firms</h3>
            <p className="text-[#2d2d2d] text-lg">
              To ensure sound client practice with AI and tech automation
            </p>
          </div>

          <div className="border-4 border-[#1e2556] p-8 hover:bg-[#f5f7fa] transition-colors">
            <h3 className="text-3xl font-bold text-[#1e2556] mb-4">Inhouse counsels</h3>
            <p className="text-[#2d2d2d] text-lg">
              To ensure ethical and compliant legal operations to support business
            </p>
          </div>

          <div className="border-4 border-[#1e2556] p-8 hover:bg-[#f5f7fa] transition-colors">
            <h3 className="text-3xl font-bold text-[#1e2556] mb-4">Legal tech companies</h3>
            <p className="text-[#2d2d2d] text-lg">
              To make ethically compatible solutions for legal usecases
            </p>
          </div>

          <div className="border-4 border-[#1e2556] p-8 hover:bg-[#f5f7fa] transition-colors">
            <h3 className="text-3xl font-bold text-[#1e2556] mb-4">Enterprises</h3>
            <p className="text-[#2d2d2d] text-lg">
              To enable efficient legal function for business growth
            </p>
          </div>
        </div>

        {/* Comparison Card */}
        <div className="bg-[#6b5d4f] text-white p-12">
          <h3 className="text-3xl font-bold mb-6">
            Raw material issues spread fast.
          </h3>
          <p className="text-gray-200 mb-12 max-w-3xl text-lg leading-relaxed">
            Most teams manage raw material inventory by reacting late or operating largely on early response methods presented with real-time signals and smart guidance — to action happens before issues escalate into expensive risks.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white text-[#2d2d2d] p-8">
              <h4 className="font-bold text-[#1e2556] mb-4 text-xl">Without EPOCH</h4>
              <ul className="space-y-3">
                <li>• Absent or bad supplier updates</li>
                <li>• Bad data or unconfirmed POs</li>
                <li>• Inventory misaligned with demand</li>
              </ul>
            </div>

            <div className="bg-[#7cc6ee] text-white p-8">
              <h4 className="font-bold mb-4 text-xl">Alternative solution</h4>
              <ul className="space-y-3">
                <li>• Tracks shipments, not material readiness</li>
                <li>• Needs clean data and full integration</li>
                <li>• Misses demand-based supply reminders</li>
              </ul>
            </div>

            <div className="bg-white text-[#2d2d2d] p-8">
              <h4 className="font-bold text-[#1e2556] mb-4 text-xl">With EPOCH</h4>
              <ul className="space-y-3">
                <li>• Agents detect design via signals</li>
                <li>• Logic updates and heals inputs</li>
                <li>• System syncs flow to actual need</li>
              </ul>
            </div>
          </div>
          <button className="mt-8 border-2 border-white text-white px-6 py-3 font-semibold hover:bg-white hover:text-[#6b5d4f] transition-colors">
            Read more
          </button>
        </div>
      </section>

      {/* How It Impacts Section */}
      <section className="px-6 py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e2556] mb-16">
            How it impacts
          </h2>

          <div className="border-4 border-[#7cc6ee] p-12 space-y-8">
            <div className="flex items-center gap-6 text-xl">
              <span className="text-[#2d2d2d] font-medium flex-1">Informal AI use</span>
              <span className="text-[#7cc6ee] text-3xl font-bold">→</span>
              <span className="text-[#1e2556] font-bold flex-1">Governed AI use</span>
            </div>

            <div className="flex items-center gap-6 text-xl">
              <span className="text-[#2d2d2d] font-medium flex-1">Uncontrolled prompts</span>
              <span className="text-[#7cc6ee] text-3xl font-bold">→</span>
              <span className="text-[#1e2556] font-bold flex-1">Approved workflows</span>
            </div>

            <div className="flex items-center gap-6 text-xl">
              <span className="text-[#2d2d2d] font-medium flex-1">Data leakage risk</span>
              <span className="text-[#7cc6ee] text-3xl font-bold">→</span>
              <span className="text-[#1e2556] font-bold flex-1">Data protection discipline</span>
            </div>

            <div className="flex items-center gap-6 text-xl">
              <span className="text-[#2d2d2d] font-medium flex-1">Silent risk</span>
              <span className="text-[#7cc6ee] text-3xl font-bold">→</span>
              <span className="text-[#1e2556] font-bold flex-1">Visible accountability</span>
            </div>

            <div className="flex items-center gap-6 text-xl">
              <span className="text-[#2d2d2d] font-medium flex-1">Tool confusion</span>
              <span className="text-[#7cc6ee] text-3xl font-bold">→</span>
              <span className="text-[#1e2556] font-bold flex-1">Strategic adoption</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="px-6 py-16 md:py-24 max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Top Banner */}
          <div className="bg-gradient-to-r from-pink-300 via-yellow-300 to-green-300 p-12">
            <div className="flex flex-col md:flex-row items-start justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-[#1e2556] mb-4">LEGALTECHPOLICY.COM</h3>
                <p className="text-[#1e2556] mb-2 font-medium">Curated with Vision.</p>
                <p className="text-[#1e2556] mb-2 font-medium">Developed with Precision</p>
                <p className="text-[#1e2556] mb-4 font-medium">Made by Real Humans, not GenAI.</p>
                <p className="text-[#1e2556] mb-4">
                  LegalTechPolicy.com is a Capacity Building Initiative, led by DreamLegal and Indic Pacific Legal Research.
                </p>
                <p className="text-[#1e2556] mb-4">
                  Our leaders at Indic Pacific and DreamLegal have been featured in genuine forums for their research solutions and knowledge deliverables.
                </p>
                <a href="#" className="text-[#1e2556] font-bold underline inline-block">
                  https://legaltechpolicy.com/playbook
                </a>
                <p className="text-sm text-[#1e2556] mt-4">
                  Delivered for conscious lawyers for their respective solutions and community at a whole.
                </p>
              </div>
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-white mb-2">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                  </div>
                  <p className="text-[#1e2556] font-bold text-sm">Ranjan Singhania</p>
                  <p className="text-[#1e2556] text-xs">DreamLegal</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-white mb-2">
                    <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500"></div>
                  </div>
                  <p className="text-[#1e2556] font-bold text-sm">Abhivardhan</p>
                  <p className="text-[#1e2556] text-xs">Indic Pacific Legal Research</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logos Section */}
          <div className="bg-[#1e2556] text-white p-12">
            <h4 className="text-sm uppercase tracking-wide mb-8 text-gray-400">DreamLegal mentions and achievements</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center mb-8">
              <div className="flex items-center justify-center">
                <div className="bg-red-600 px-6 py-3 rounded-full">
                  <span className="text-white font-bold text-xl">TCS</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-white font-bold text-lg">WARDBLAWG</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-white text-sm font-medium">TOP LEGAL TECHNOLOGIST</span>
              </div>
              <div className="flex items-center justify-center">
                <div className="border-2 border-white px-4 py-2">
                  <span className="text-white text-lg font-bold">GLOBAL STUDENT ENTREPRENEUR AWARDS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#1e2556] text-white p-12">
            <h4 className="text-sm uppercase tracking-wide mb-8 text-gray-400">Indic Pacific features</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="flex items-center justify-center">
                <span className="text-red-500 font-bold text-3xl">INDIA TODAY</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-orange-500 font-bold text-3xl">mint</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI AUSTRIA</span>
              </div>
            </div>
          </div>

          {/* Final CTA */}
         <div className="bg-black text-white p-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-left">
                <h2 className="text-2xl font-bold mb-8 tracking-wider">LEGALTECHPOLICY.COM</h2>
                <h3 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Innovate the flow of<br />Legal Work with us
                </h3>
                <p className="text-gray-300 mb-10 text-xl leading-relaxed">
                  Synchronise and enable simplify your legal & business operations with secure workflows and support
                </p>
                <button className="border-4 border-yellow-400 text-yellow-400 px-10 py-5 text-lg font-bold hover:bg-yellow-400 hover:text-black transition-all">
                  TRY OUR SURVEY AND START TODAY
                </button>
              </div>
              
              {/* Right Visual */}
              <div className="flex justify-center md:justify-end relative">
                <div className="relative">
                  {/* Brain illustration placeholder */}
                  <div className="w-96 h-96 relative">
                    {/* Yellow circle accent */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-80 -z-10"></div>
                    
                    {/* Brain and hand illustration area */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg viewBox="0 0 400 400" className="w-full h-full filter drop-shadow-2xl">
                        {/* Stylized brain outline */}
                        <path d="M200 80 Q240 80 260 100 Q280 120 280 160 Q280 200 260 220 Q240 240 200 240 Q160 240 140 220 Q120 200 120 160 Q120 120 140 100 Q160 80 200 80" 
                              fill="none" stroke="white" strokeWidth="3" opacity="0.6"/>
                        <path d="M180 100 Q190 90 200 90 Q210 90 220 100" fill="none" stroke="white" strokeWidth="2" opacity="0.5"/>
                        <path d="M160 140 Q170 130 180 130 Q190 130 200 140" fill="none" stroke="white" strokeWidth="2" opacity="0.5"/>
                        
                        {/* Hand holding brain */}
                        <path d="M150 240 L140 300 L160 320 L180 310 L200 320 L220 310 L240 320 L260 300 L250 240" 
                              fill="white" opacity="0.7"/>
                        
                        {/* Yellow accent on hand */}
                        <rect x="135" y="300" width="130" height="30" fill="#fbbf24" opacity="0.9"/>
                        
                        {/* Key icon */}
                        <circle cx="320" cy="120" r="40" fill="none" stroke="#fbbf24" strokeWidth="6"/>
                        <path d="M320 120 L360 160 M340 140 L360 160 M340 160 L360 160" 
                              stroke="#fbbf24" strokeWidth="6" strokeLinecap="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalTechLanding;