"use client"

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Users, ArrowRight, HelpCircle } from 'lucide-react';
import Script from 'next/script';
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

const FAQSection = () => {
  const [sectionRef, isInView] = useIntersectionObserver();
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Can I start with a Free listing and upgrade later?",
      answer: "Yes. Many vendors begin with a Free profile and then upgrade to Verified or Premium as they grow. Upgrading is seamless, and all your data stays intact."
    },
    {
      question: "What does a \"Verified Vendor\" badge mean?",
      answer: "The Verified badge shows buyers that your company has been authenticated by DreamLegal. It signals trust, improves your ranking, and increases buyer engagement with your profile."
    },
    {
      question: "What is included in \"Premium Vendor\" leads?",
      answer: "Premium vendors receive a fixed number of qualified leads—buyers who are actively searching and match your ideal customer profile (ICP). Every lead is validated before we share it."
    },
    {
      question: "How do you define a \"qualified lead\"?",
      answer: "A qualified lead is a buyer who has expressed intent (e.g., demo request, product comparison, or category inquiry) and matches your target criteria like size, industry, or region."
    },
    {
      question: "Can I cancel or downgrade my plan?",
      answer: "Plans are annual commitments and cannot be cancelled or downgraded mid-cycle. This ensures consistency and better visibility for vendors while buyers see only reliable, long-term profiles."
    },
    {
      question: "Do you offer refunds?",
      answer: "No. We do not offer refunds once a plan is activated. This policy ensures fairness across all vendors and allows us to commit resources fully to delivering your visibility, credibility, and leads."
    },
    {
      question: "What's the first step for vendors?",
      answer: "The first step is simple: create your DreamLegal profile. This is your foundation for visibility—buyers can only discover, trust, and connect with you once your profile is live. From there, you can choose to stay Free, or upgrade to Verified or Premium for higher impact."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const FAQItem = ({ faq, index, isActive }) => (
    <div
      className={`relative group transform transition-all duration-700 
                 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`bg-[#f5f7fa] rounded-xl border-2 transition-all duration-300 overflow-hidden
                     ${isActive ? 'border-[#7cc6ee] shadow-lg' : 'border-gray-200 hover:border-[#7cc6ee]/50 hover:shadow-md'}`}>
        <button
          onClick={() => toggleFAQ(index)}
          className="w-full p-4 md:p-6 text-left flex items-center justify-between gap-4 group-hover:bg-[#7cc6ee]/5 transition-colors duration-300"
        >
          <h3 className="text-base md:text-lg font-semibold text-[#1e2556] leading-relaxed pr-4">
            {faq.question}
          </h3>
          <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300
                         ${isActive ? 'bg-[#7cc6ee] text-white' : 'bg-[#1e2556] text-white group-hover:bg-[#7cc6ee]'}`}>
            {isActive ? (
              <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
            )}
          </div>
        </button>
        
        <div className={`overflow-hidden transition-all duration-300 ease-in-out
                       ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 md:px-6 pb-4 md:pb-6">
            <div className="w-full h-px bg-[#7cc6ee]/20 mb-4"></div>
            <p className="text-[#2d2d2d] text-sm md:text-base leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div ref={sectionRef} className="w-full bg-white py-8 md:py-12 lg:py-16 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className={`mb-8 md:mb-12 text-center relative transition-all duration-700 transform
                      ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block">
            <span className="block text-xs sm:text-sm font-semibold text-[#7cc6ee] mb-2 tracking-wider">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e2556] mb-4 relative inline-block leading-tight">
              Got Questions? We've Got Answers
              <div className={`absolute -bottom-2 left-0 right-0 h-1 bg-[#7cc6ee] 
                           transform origin-left transition-transform duration-1000 
                           ${isInView ? 'scale-x-100' : 'scale-x-0'}`} />
            </h2>
            <p className="text-[#334155] mt-4 md:mt-6 max-w-2xl mx-auto text-base md:text-lg">
              Everything you need to know about our vendor partnership program
            </p>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 md:space-y-6 mb-12 md:mb-16">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isActive={activeIndex === index}
            />
          ))}
        </div>

        {/* Final CTA */}
     
     
        {/* <div className={`text-center transition-all duration-700 transform
                     ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
         style={{ transitionDelay: '800ms' }}>
      <div className="bg-[#1e2556] rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-3 md:mb-4">
          <Users className="w-6 h-6 md:w-8 md:h-8 text-[#7cc6ee]" />
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
            Ready to accelerate your growth?
          </h3>
        </div>
        <p className="text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          Join hundreds of legal tech vendors who trust DreamLegal to connect them with qualified buyers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <a href="#contact" className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-3.5 rounded-lg md:rounded-xl font-semibold 
                           hover:bg-white hover:text-[#1e2556] transition-all duration-300
                           flex items-center justify-center gap-2 text-sm md:text-base">
            Talk to Partnership Team
          </a>
        </div>
        
      </div>
    </div>


       
        <div className={`text-center mt-8 md:mt-12 transition-all duration-700 transform
                     ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
         style={{ transitionDelay: '900ms' }}>
      <div className="flex items-center justify-center gap-2 text-[#334155]">
        <HelpCircle className="w-5 h-5" />
        <span className="text-sm md:text-base">
          Still have questions? 
          <a href="#contact" className="text-[#7cc6ee] hover:text-[#6bb3db] font-semibold ml-1 transition-colors">
            
          </a>
          {' '} - {' '}
          <a href="https://calendly.com/ranjansinghania1909/30min" 
             target="_blank" 
             rel="noopener noreferrer"
             className="text-[#7cc6ee] hover:text-[#6bb3db] font-semibold transition-colors">
            Talk to our founder
          </a>
        </span>
      </div>
    </div> */}

      </div>
      <ZohoBuyerInsightsForm/>
    </div>
  );
};

export default FAQSection;



const ZohoBuyerInsightsForm = () => {
  const formLoadedRef = useRef(false);

  const initializeZohoForm = () => {
    console.log('🔄 [Buyer Insights] Attempting to initialize Zoho form...');
    
    if (typeof window !== 'undefined') {
      const setupSF = (window as any).setupSF;
      
      if (setupSF && !formLoadedRef.current) {
        console.log('✅ [Buyer Insights] setupSF function found, initializing...');
        try {
          setupSF(
            'sf3zde811905b71cf38137308e36d8a2f34b603819032f48810441540a5aade4bcab',
            'ZCFORMVIEW',
            false,
            'light',
            false,
            '0'
          );
          formLoadedRef.current = true;
          console.log('✅ [Buyer Insights] Zoho form initialized successfully!');
        } catch (error) {
          console.error('❌ [Buyer Insights] Error initializing Zoho form:', error);
        }
      } else if (!setupSF) {
        console.log('⏳ [Buyer Insights] setupSF not available yet, will retry...');
      } else {
        console.log('ℹ️ [Buyer Insights] Form already initialized');
      }
    }
  };

  useEffect(() => {
    // Try to initialize if script is already loaded
    if ((window as any).setupSF) {
      initializeZohoForm();
    }

    // Add button click listener for debugging
    const button = document.getElementById('zcWebOptin');
    if (button) {
      console.log('✅ [Buyer Insights] Button found in DOM');
      
      const handleClick = () => {
        console.log('🖱️ [Buyer Insights] Button clicked!');
        
        const email = (document.getElementById('EMBED_FORM_EMAIL_LABEL') as HTMLInputElement)?.value;
        const company = (document.getElementById('EMBED_FORM_NAME_LABEL') as HTMLInputElement)?.value;
        
        console.log('📧 [Buyer Insights] Email:', email);
        console.log('🏢 [Buyer Insights] Company:', company);
        
        if ((window as any).checkMandatory) {
          console.log('✅ [Buyer Insights] Zoho validation function found');
        } else {
          console.log('⚠️ [Buyer Insights] Zoho validation function NOT found');
        }
      };
      
      button.addEventListener('click', handleClick);
      
      return () => {
        button.removeEventListener('click', handleClick);
      };
    } else {
      console.log('⚠️ [Buyer Insights] Button not found yet');
    }
  }, []);

  return (
    <>
      {/* Load Zoho Scripts */}
      <Script
        src="https://jcjdi-zgph.maillist-manage.in/js/optin.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('📦 [Buyer Insights] Zoho script loaded successfully');
          setTimeout(() => {
            initializeZohoForm();
          }, 100);
        }}
        onError={(e) => {
          console.error('❌ [Buyer Insights] Failed to load Zoho script:', e);
        }}
      />

      <section className="py-16 md:py-20 ">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-12">
            {/* Header Section */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e2556] mb-4">
                Get Buyer Insights & Growth Strategies
              </h2>
              <p className="text-base md:text-lg text-[#334155]">
                Sign up for buyer insights, growth strategies and market intel
              </p>
            </div>

            {/* Zoho Form Container */}
            <div className="max-w-2xl mx-auto">
              <div 
                id="sf3zde811905b71cf38137308e36d8a2f34b603819032f48810441540a5aade4bcab" 
                data-type="signupform"
                style={{ opacity: 1 }}
              >
                <div id="customForm">
                  <div 
                    className="quick_form_11_css" 
                    style={{
                      backgroundColor: 'rgb(30, 37, 86)',
                      width: '100%',
                      maxWidth: '500px',
                      margin: '0 auto',
                      zIndex: 2,
                      fontFamily: 'Arial',
                      borderWidth: '4px 1px 1px',
                      borderStyle: 'solid',
                      borderColor: 'rgb(124, 198, 238)',
                      overflow: 'hidden',
                      borderRadius: '12px'
                    }}
                    name="SIGNUP_BODY"
                  >
                    <div>
                      <span 
                        style={{
                          fontSize: '14px',
                          fontFamily: 'Arial',
                          fontWeight: 'bold',
                          color: 'rgb(255, 255, 255)',
                          textAlign: 'left',
                          padding: '15px 20px 5px',
                          width: '100%',
                          display: 'block'
                        }}
                        id="SIGNUP_HEADING"
                      >
                        Sign up for buyer insights, growth strategies and market intel
                      </span>
                      
                      <div style={{ position: 'relative' }}>
                        <div 
                          id="Zc_SignupSuccess" 
                          style={{
                            display: 'none',
                            position: 'absolute',
                            marginLeft: '4%',
                            width: '90%',
                            backgroundColor: 'white',
                            padding: '3px',
                            border: '3px solid rgb(194, 225, 154)',
                            marginTop: '10px',
                            marginBottom: '10px',
                            wordBreak: 'break-all'
                          }}
                        >
                          <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
                            <tbody>
                              <tr>
                                <td width="10%">
                                  <img 
                                    className="successicon" 
                                    src="https://jcjdi-zgph.maillist-manage.in/images/challangeiconenable.jpg" 
                                    alt="Success"
                                  />
                                </td>
                                <td>
                                  <span 
                                    id="signupSuccessMsg" 
                                    style={{
                                      color: 'rgb(73, 140, 132)',
                                      fontFamily: 'sans-serif',
                                      fontSize: '14px',
                                      wordBreak: 'break-word'
                                    }}
                                  >
                                    &nbsp;&nbsp;Thank you for Signing Up
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <form 
                        method="POST" 
                        id="zcampaignOptinForm" 
                        style={{ margin: '0px', width: '100%' }}
                        action="https://jcjdi-zgph.maillist-manage.in/weboptin.zc" 
                        target="_zcSignup"
                      >
                        <div 
                          style={{
                            backgroundColor: 'rgb(255, 235, 232)',
                            padding: '10px',
                            color: 'rgb(210, 0, 0)',
                            fontSize: '11px',
                            margin: '20px 10px 0px',
                            border: '1px solid rgb(255, 217, 211)',
                            opacity: 1,
                            display: 'none'
                          }}
                          id="errorMsgDiv"
                        >
                          Please correct the marked field(s) below.
                        </div>

                        <div style={{ position: 'relative', margin: '25px 0 15px 15px', width: '150px', height: '28px', display: 'inline-block' }}>
                          <div 
                            id="Zc_SignupSuccess" 
                            style={{
                              position: 'absolute',
                              width: '87%',
                              backgroundColor: 'white',
                              padding: '3px',
                              border: '3px solid rgb(194, 225, 154)',
                              marginBottom: '10px',
                              wordBreak: 'break-all',
                              opacity: 1,
                              display: 'none'
                            }}
                          >
                            <div style={{ width: '20px', padding: '5px', display: 'table-cell' }}>
                              <img 
                                className="successicon" 
                                src="https://campaigns.zoho.com/images/challangeiconenable.jpg" 
                                style={{ width: '20px' }}
                                alt="Success"
                              />
                            </div>
                            <div style={{ display: 'table-cell' }}>
                              <span 
                                id="signupSuccessMsg" 
                                style={{
                                  color: 'rgb(73, 140, 132)',
                                  fontFamily: 'sans-serif',
                                  fontSize: '14px',
                                  lineHeight: '30px',
                                  display: 'block'
                                }}
                              ></span>
                            </div>
                          </div>
                          <input 
                            type="text" 
                            style={{
                              fontSize: '12px',
                              borderWidth: '0 0 1px',
                              borderColor: 'rgb(132, 156, 179)',
                              borderStyle: 'solid',
                              width: '100%',
                              height: '100%',
                              zIndex: 4,
                              outline: 'none',
                              padding: '5px 10px',
                              color: 'rgb(255, 255, 255)',
                              textAlign: 'left',
                              fontFamily: 'Arial',
                              borderRadius: '0px',
                              backgroundColor: 'transparent'
                            }}
                            placeholder="Email" 
                            name="CONTACT_EMAIL" 
                            id="EMBED_FORM_EMAIL_LABEL"
                          />
                        </div>

                        <div style={{ position: 'relative', margin: '15px 15px 15px 15px', width: '150px', height: '28px', display: 'inline-block' }}>
                          <input 
                            type="text" 
                            style={{
                              fontSize: '12px',
                              borderWidth: '0 0 1px',
                              borderColor: 'rgb(132, 156, 179)',
                              borderStyle: 'solid',
                              width: '100%',
                              height: '100%',
                              zIndex: 4,
                              outline: 'none',
                              padding: '5px 10px',
                              color: 'rgb(255, 255, 255)',
                              textAlign: 'left',
                              fontFamily: 'Arial',
                              borderRadius: '0px',
                              backgroundColor: 'transparent'
                            }}
                            placeholder="Company Name" 
                            name="LASTNAME" 
                            id="EMBED_FORM_NAME_LABEL"
                          />
                        </div>

                        <div style={{ position: 'relative', width: '100px', height: '28px', margin: '0 0 15px 12px', display: 'inline-block' }}>
                          <input 
                            type="button" 
                            style={{
                              textAlign: 'center',
                              width: '100%',
                              height: '100%',
                              zIndex: 5,
                              border: '0px',
                              color: 'rgb(255, 255, 255)',
                              cursor: 'pointer',
                              outline: 'none',
                              fontSize: '14px',
                              backgroundColor: 'rgb(124, 198, 238)',
                              borderRadius: '0px'
                            }}
                            name="SIGNUP_SUBMIT_BUTTON" 
                            id="zcWebOptin" 
                            value="Join Now"
                          />
                        </div>

                        {/* Hidden Fields */}
                        <input type="hidden" id="fieldBorder" value="" />
                        <input type="hidden" id="submitType" name="submitType" value="optinCustomView" />
                        <input type="hidden" id="emailReportId" name="emailReportId" value="" />
                        <input type="hidden" id="formType" name="formType" value="QuickForm" />
                        <input type="hidden" name="zx" id="cmpZuid" value="1df9ba2de2" />
                        <input type="hidden" name="zcvers" value="2.0" />
                        <input type="hidden" name="oldListIds" id="allCheckedListIds" value="" />
                        <input type="hidden" id="mode" name="mode" value="OptinCreateView" />
                        <input type="hidden" id="zcld" name="zcld" value="121e65773289c605" />
                        <input type="hidden" id="zctd" name="zctd" value="121e657732813279" />
                        <input type="hidden" id="document_domain" value="" />
                        <input type="hidden" id="zc_Url" value="jcjdi-zgph.maillist-manage.in" />
                        <input type="hidden" id="new_optin_response_in" value="0" />
                        <input type="hidden" id="duplicate_optin_response_in" value="0" />
                        <input type="hidden" name="zc_trackCode" id="zc_trackCode" value="ZCFORMVIEW" />
                        <input type="hidden" id="zc_formIx" name="zc_formIx" value="3zde811905b71cf38137308e36d8a2f34b603819032f48810441540a5aade4bcab" />
                        <input type="hidden" id="viewFrom" value="URL_ACTION" />
                        <span style={{ display: 'none' }} id="dt_CONTACT_EMAIL">1,true,6,Contact Email,2</span>
                        <span style={{ display: 'none' }} id="dt_FIRSTNAME">1,false,1,First Name,2</span>
                        <span style={{ display: 'none' }} id="dt_LASTNAME">1,false,1,Last Name,2</span>
                      </form>
                    </div>
                  </div>
                </div>
                <img 
                  src="https://jcjdi-zgph.maillist-manage.in/images/spacer.gif" 
                  id="refImage" 
                  style={{ display: 'none' }}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <input type="hidden" id="signupFormType" value="QuickForm_Horizontal" />
      <div 
        id="zcOptinOverLay" 
        style={{ display: 'none' }}
      />
      <div 
        id="zcOptinSuccessPopup" 
        style={{ display: 'none' }}
      >
        <span style={{ position: 'absolute', top: '-16px', right: '-14px', zIndex: 99999, cursor: 'pointer' }} id="closeSuccess">
          <img src="https://jcjdi-zgph.maillist-manage.in/images/videoclose.png" alt="Close" />
        </span>
        <div id="zcOptinSuccessPanel"></div>
      </div>
    </>
  );
};

