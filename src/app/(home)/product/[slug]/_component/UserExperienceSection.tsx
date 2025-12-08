
'use client';

import { useState, useEffect, useRef } from 'react';
import { useNewAuth } from '@/context/NewAuthContext';
import UserExperienceModal from './UserExperienceModal';

interface UserExperience {
  id: string;
  userId: string;
  beforeUsing: string;
  afterUsing: string;
  recommendationScore: number;
  createdAt: string;
  updatedAt: string;
}

interface UserExperienceSectionProps {
  productId: string;
  productName: string;
  slug: string;
  isMobile?: boolean;
}

// ShareDropdown Component
interface ShareDropdownProps {
  productName: string;
  slug: string;
  onCopySuccess: () => void;
}

const ShareDropdown = ({ productName, slug, onCopySuccess }: ShareDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const generateShareableLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/user-experiences?product=${slug}`;
  };

  const shareText = `Check out user experiences with ${productName}`;
  const shareUrl = generateShareableLink();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      onCopySuccess();
      setIsOpen(false);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      onCopySuccess();
      setIsOpen(false);
    }
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      action: handleCopyLink,
      color: '#64748b'
    },
    {
      name: 'WhatsApp',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
      action: () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank');
        setIsOpen(false);
      },
      color: '#25D366'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      action: () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        setIsOpen(false);
      },
      color: '#1DA1F2'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      action: () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        setIsOpen(false);
      },
      color: '#1877F2'
    },
    {
      name: 'LinkedIn',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      action: () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        setIsOpen(false);
      },
      color: '#0A66C2'
    },
    {
      name: 'Email',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: () => {
        window.location.href = `mailto:?subject=${encodeURIComponent(`Check out ${productName}`)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
        setIsOpen(false);
      },
      color: '#6B7280'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs border border-[#1e2556] rounded-md font-medium hover:bg-[#1e2556] hover:text-white transition-all duration-200"
        style={{ color: '#1e2556' }}
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        Share
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            {shareOptions.map((option, index) => (
              <button
                key={option.name}
                onClick={option.action}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 transition-colors duration-150"
              >
                <div style={{ color: option.color }}>
                  {option.icon}
                </div>
                <span className="text-gray-700">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const UserExperienceSection = ({ productId, productName, slug, isMobile = false }: UserExperienceSectionProps) => {
  const { userId, vendorId, isLoading: authLoading } = useNewAuth();
  const isAuthenticated = !!(userId || vendorId);

  const [experiences, setExperiences] = useState<UserExperience[]>([]);
  const [userExperience, setUserExperience] = useState<UserExperience | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedExperience, setExpandedExperience] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const queryParams = userId ? `?userId=${userId}` : '';
      const response = await fetch(`/api/software/${slug}/experiences${queryParams}`);
      
      if (response.ok) {
        const data = await response.json();
        setExperiences(data.experiences || []);
        setUserExperience(data.userExperience || null);
      }
    } catch (error) {
      console.error('Error fetching user experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [slug, userId]);

  const handleAddExperience = () => {
    if (vendorId && !userId) {
      alert('Vendors cannot submit reviews');
      return;
    }
    
    if (!userId) {
      alert('Please login to share your experience');
      return;
    }
    
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    fetchExperiences();
  };

  const handleCopySuccess = () => {
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + '...';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRecommendationColor = (score: number) => {
    if (score >= 9) return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' };
    if (score >= 7) return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' };
    if (score >= 5) return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' };
    return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' };
  };

  const averageScore = experiences.length > 0 
    ? Math.round((experiences.reduce((sum, exp) => sum + exp.recommendationScore, 0) / experiences.length) * 10) / 10
    : 0;

  if (authLoading) {
    return (
      <section className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-3 border-gray-200 border-t-[#7cc6ee]"></div>
        </div>
      </section>
    );
  }

  return (
    <section id="user-experiences" className={`mb-8 ${isMobile ? 'scroll-mt-40' : 'scroll-mt-24'}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold" style={{ color: '#1e2556' }}>
          User Experiences with {productName}
        </h2>
        
        <div className="flex items-center gap-2">
          {copySuccess && (
            <span className="text-xs text-green-600 font-medium">Copied!</span>
          )}
          
          <ShareDropdown 
            productName={productName}
            slug={slug}
            onCopySuccess={handleCopySuccess}
          />
          
          <button
            onClick={handleAddExperience}
            className="flex items-center gap-2 px-4 py-1.5 text-white rounded-md font-medium text-xs hover:shadow-md transition-all duration-200"
            style={{ backgroundColor: '#1e2556' }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {userExperience ? 'Update Experience' : 'Share Experience'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#7cc6ee] border-t-transparent"></div>
            <span className="ml-2 text-sm" style={{ color: '#334155' }}>Loading experiences...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          {experiences.length > 0 && (
            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#1e2556' }}>{experiences.length}</div>
                    <div className="text-xs" style={{ color: '#334155' }}>
                      {experiences.length === 1 ? 'Experience' : 'Experiences'}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#7cc6ee' }}>{averageScore}</div>
                    <div className="text-xs" style={{ color: '#334155' }}>Average Rating</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: '#1e2556' }}>
                      {Math.round((experiences.filter(exp => exp.recommendationScore >= 7).length / experiences.length) * 100)}%
                    </div>
                    <div className="text-xs" style={{ color: '#334155' }}>Would Recommend</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User's Experience - Minimal Design */}
          {userExperience && (
            <div className="bg-white rounded-lg p-5 shadow-sm border-2 border-[#7cc6ee] mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#7cc6ee' }}>
                    You
                  </div>
                  <div>
                    <span className="text-base font-bold" style={{ color: '#1e2556' }}>Your Experience</span>
                    <p className="text-xs" style={{ color: '#334155' }}>
                      Last updated: {formatDate(userExperience.updatedAt)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-2 rounded-full text-sm font-bold ${getRecommendationColor(userExperience.recommendationScore).bg} ${getRecommendationColor(userExperience.recommendationScore).text}`}>
                    {userExperience.recommendationScore}/10
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    style={{ color: '#7cc6ee' }}
                  >
                    Edit
                  </button>
                </div>
              </div>
              
              {/* Before/After in One Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <h4 className="text-sm font-bold mb-2 flex items-center" style={{ color: '#334155' }}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Before
                  </h4>
                  <div className="p-3 rounded-md" style={{ backgroundColor: '#f8fafc' }}>
                    <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                      {userExperience.beforeUsing}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-bold mb-2 flex items-center" style={{ color: '#334155' }}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    After
                  </h4>
                  <div className="p-3 rounded-md" style={{ backgroundColor: '#f0f9ff' }}>
                    <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                      {userExperience.afterUsing}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other Experiences - Clean Cards */}
          {experiences.length > 0 ? (
            <div className="space-y-4">
              {experiences
                .filter(exp => exp.userId !== userId)
                .map((experience, index) => (
                  <div key={experience.id} className="bg-white rounded-lg p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#1e2556' }}>
                          {index + 1}
                        </div>
                        <div>
                          <span className="text-sm font-bold" style={{ color: '#1e2556' }}>Anonymous User</span>
                          <div className="text-xs" style={{ color: '#334155' }}>{formatDate(experience.createdAt)}</div>
                        </div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRecommendationColor(experience.recommendationScore).bg} ${getRecommendationColor(experience.recommendationScore).text}`}>
                        {experience.recommendationScore}/10
                      </div>
                    </div>
                    
                    {/* Before/After in One Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <h4 className="text-sm font-bold mb-2 flex items-center" style={{ color: '#334155' }}>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Before
                        </h4>
                        <div className="p-3 rounded-md" style={{ backgroundColor: '#f8fafc' }}>
                          <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                            {expandedExperience === experience.id 
                              ? experience.beforeUsing 
                              : truncateText(experience.beforeUsing, 120)
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-bold mb-2 flex items-center" style={{ color: '#334155' }}>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                          After
                        </h4>
                        <div className="p-3 rounded-md" style={{ backgroundColor: '#f0f9ff' }}>
                          <p className="text-sm leading-relaxed" style={{ color: '#2d2d2d' }}>
                            {expandedExperience === experience.id 
                              ? experience.afterUsing 
                              : truncateText(experience.afterUsing, 120)
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {(experience.beforeUsing.length > 120 || experience.afterUsing.length > 120) && (
                      <div className="text-center mt-3">
                        <button
                          onClick={() => setExpandedExperience(
                            expandedExperience === experience.id ? null : experience.id
                          )}
                          className="text-sm font-medium hover:underline"
                          style={{ color: '#7cc6ee' }}
                        >
                          {expandedExperience === experience.id ? 'Show less' : 'Read more'}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          ) : !userExperience ? (
            <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f5f7fa' }}>
                <svg className="w-8 h-8" style={{ color: '#7cc6ee' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#1e2556' }}>No experiences yet</h3>
              <p className="text-sm mb-4" style={{ color: '#334155' }}>
                Be the first to share your experience with {productName} and help other legal professionals make informed decisions.
              </p>
              <button
                onClick={handleAddExperience}
                className="px-6 py-2 text-white rounded-md font-medium text-sm transition-all duration-200 hover:shadow-md"
                style={{ backgroundColor: '#1e2556' }}
              >
                Share Your Experience
              </button>
            </div>
          ) : null}
        </>
      )}

      <UserExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={productId}
        productName={productName}
        slug={slug}
        existingExperience={userExperience ? {
          beforeUsing: userExperience.beforeUsing,
          afterUsing: userExperience.afterUsing,
          recommendationScore: userExperience.recommendationScore
        } : null}
        onSuccess={handleSuccess}
      />
    </section>
  );
};

export default UserExperienceSection;