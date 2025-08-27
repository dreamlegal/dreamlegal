'use client';

import { useState, useEffect } from 'react';
import { useAuth } from "@/context/authContext";
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

const UserExperienceSection = ({ productId, productName, slug, isMobile = false }: UserExperienceSectionProps) => {
  const { userId, vendorId, isLoading: authLoading } = useAuth();
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

  const generateShareableLink = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/user-experiences?product=${slug}`;
  };

  const handleCopyLink = async () => {
    try {
      const link = generateShareableLink();
      await navigator.clipboard.writeText(link);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = generateShareableLink();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
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
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3 py-1.5 text-xs border border-[#1e2556] rounded-md font-medium hover:bg-[#1e2556] hover:text-white transition-all duration-200"
            style={{ color: '#1e2556' }}
          >
            {copySuccess ? (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share
              </>
            )}
          </button>
          
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