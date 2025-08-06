"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, CheckCircle, MessageSquare, Bell } from 'lucide-react';

const SoftwareQALanding = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    question: '',
    purpose: ''
  });
  const [questions, setQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const descriptionOptions = [
    'Law firm',
    'Inhouse Professional',
    'Law Student',
    'Legal tech company'
  ];

  const purposeOptions = [
    'Buying software',
    'Market research',
    'Just information'
  ];

  // Fetch questions on component mount
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      if (response.ok) {
        const data = await response.json();
        setQuestions(data.filter(q => q.answer)); // Only show answered questions
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage('');

    // Validate required fields
    if (!formData.name || !formData.email || !formData.description || !formData.question || !formData.purpose) {
      setSubmitMessage('Please fill in all required fields.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage('Question submitted successfully! You will be notified by email once answered.');
        setFormData({
          name: '',
          email: '',
          description: '',
          question: '',
          purpose: ''
        });
      } else {
        setSubmitMessage('Error submitting question. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('Error submitting question. Please try again.');
    }

    setIsSubmitting(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-50 overflow-hidden mt-8">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 opacity-50"></div>
  <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-20">
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Left Content */}
      <div className="space-y-6 lg:space-y-8">
        <div className="space-y-4 lg:space-y-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#1e2556] leading-tight">
          Anything About legal tech... Ask experts!!
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#334155] leading-relaxed">
           
Get expert advice on any technology. Our legal tech experts are here to help you make the right choice.
      </p>
        </div>
        



        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1e2556]">20,000+</div>
            <div className="text-xs sm:text-sm lg:text-base text-[#334155] font-medium">visitors</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1e2556]">8543</div>
            <div className="text-xs sm:text-sm lg:text-base text-[#334155] font-medium">Queries Resolved</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#1e2556]">1300 </div>
            <div className="text-xs sm:text-sm lg:text-base text-[#334155] font-medium">Software Mapped</div>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100 mt-6 lg:mt-0">
        <div className="space-y-4 lg:space-y-6">
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1e2556] mb-2">Ask your question</h3>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              placeholder='E.g "Best use of accounting software"'
              rows="4"
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent resize-none text-[#2d2d2d] text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-[#334155] font-medium mb-2 text-sm sm:text-base">Question Quality:</label>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <span className="text-[#334155] text-sm sm:text-base">I am looking for:</span>
              </label>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                {purposeOptions.map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="purpose"
                      value={option}
                      checked={formData.purpose === option}
                      onChange={handleInputChange}
                      required
                      className="text-[#1e2556] focus:ring-[#7cc6ee]"
                    />
                    <span className="text-[#2d2d2d] text-sm sm:text-base">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#334155] font-medium mb-2 text-sm sm:text-base">Where should we send secure notifications?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                required
                className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent text-[#2d2d2d] text-sm sm:text-base"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email ID"
                required
                className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent text-[#2d2d2d] text-sm sm:text-base"
              />
            </div>
          </div>

          <div>
            <select
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent text-[#2d2d2d] text-sm sm:text-base"
            >
              <option value="">Select Profession</option>
              {descriptionOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-[#1e2556] text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Your Question'}
          </button>

          {submitMessage && (
            <div className={`p-3 sm:p-4 rounded-lg text-center text-sm sm:text-base ${submitMessage.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {submitMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  </div>

  {/* Hidden professional image for larger screens only */}
  <div className="hidden lg:block absolute left-8 top-1/2 transform -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-[#7cc6ee] to-[#1e2556] rounded-full opacity-10"></div>
</div>
      {/* How It Works Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e2556] text-center mb-12">How It Works?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#1e2556] rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1e2556]">Submit Your Question</h3>
              <p className="text-[#2d2d2d]">Ask your query related to any software, its features, functionalities, benefits or anything.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#1e2556] rounded-full flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1e2556]">Answers from Experts</h3>
              <p className="text-[#2d2d2d]">You will receive quick, precise answers from our software experts and verified users.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#1e2556] rounded-full flex items-center justify-center mx-auto">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1e2556]">Quick Notifications</h3>
              <p className="text-[#2d2d2d]">If your query is answered, you will be notified by email.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="py-16 bg-[#f5f7fa]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e2556] mb-12">Tips for Asking a Question</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-[#7cc6ee] mt-1 flex-shrink-0" />
              <p className="text-[#2d2d2d] text-lg">Ask a descriptive and elaborate question.</p>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-[#7cc6ee] mt-1 flex-shrink-0" />
              <p className="text-[#2d2d2d] text-lg">Keep your language and tone professional.</p>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-[#7cc6ee] mt-1 flex-shrink-0" />
              <p className="text-[#2d2d2d] text-lg">Ask questions that will lead to a deeper understanding.</p>
            </div>
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-6 h-6 text-[#7cc6ee] mt-1 flex-shrink-0" />
              <p className="text-[#2d2d2d] text-lg">Make sure your questions aren't intended to provoke anyone.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-[#1e2556]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Over 8500+ Queries Resolved</h2>
          <div className="bg-white rounded-xl p-8 max-w-4xl mx-auto">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-[#2d2d2d] text-lg mb-6">
            A one-stop hub for LegalTech! The legal technology directory captures every essential tool, making it effortless to discover, compare, and choose the right solutions.

  </p>
            <p className="text-[#334155] font-semibold">- Suruchi Kanoongo,Senior Process Executive, Infosys</p>
          </div>
          
          <div className="flex justify-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-white text-lg font-semibold">100%</div>
              <div className="text-[#7cc6ee]">Privacy Protection</div>
            </div>
            <div className="text-center">
              <div className="text-white text-lg font-semibold">Verified</div>
              <div className="text-[#7cc6ee]">Software Experts</div>
            </div>
            <div className="text-center">
              <div className="text-white text-lg font-semibold">Quick</div>
              <div className="text-[#7cc6ee]">Question Responses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Questions and Answers Section */}
      {questions.length > 0 && (
        <div className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#1e2556] text-center mb-12">Recent Questions & Expert Answers</h2>
            <div className="space-y-8">
              {questions.map((item) => (
                <div key={item.id} className="bg-[#f5f7fa] rounded-lg p-6 border border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#1e2556] mb-2">Q: {item.question}</h3>
                      <div className="text-sm text-[#334155]">
                        Asked by {item.name} • {item.description} • {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="border-l-4 border-[#7cc6ee] pl-4">
                      <h4 className="font-semibold text-[#1e2556] mb-2">Expert Answer:</h4>
                      <p className="text-[#2d2d2d] leading-relaxed">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoftwareQALanding;