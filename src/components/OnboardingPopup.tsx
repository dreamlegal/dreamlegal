// components/OnboardingPopup.tsx
'use client';

import { useState, useEffect } from 'react';
import { useNewAuth } from '@/context/NewAuthContext';;
import { X, Building2, Users, Briefcase } from 'lucide-react';
import Cookies from 'js-cookie';

const ONBOARDING_DISMISSED_COOKIE = 'onboarding_dismissed';

export default function OnboardingPopup() {
  const { userId, userType, hasCompletedOnboarding, checkAuth } = useNewAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    organizationType: '',
    teamSize: '',
  });

  const orgTypes = [
    { id: 'law-firm', label: 'Law Firm', icon: '⚖️' },
    { id: 'enterprise', label: 'Enterprise', icon: '🏢' },
    { id: 'individual', label: 'Individual', icon: '👤' },
    { id: 'startup', label: 'Startup', icon: '🚀' },
    { id: 'government', label: 'Government', icon: '🏛️' },
    { id: 'judiciary', label: 'Judiciary', icon: '⚡' },
  ];

  const teamSizes = [
    { value: '1', label: '1 person' },
    { value: '20', label: '2-20 people' },
    { value: '50', label: '21-50 people' },
    { value: '200', label: '51-200 people' },
    { value: '500', label: '201-500 people' },
    { value: '501', label: '500+ people' },
  ];

  useEffect(() => {
    // Show popup if:
    // 1. User is logged in as 'user' type
    // 2. Has NOT completed onboarding
    // 3. Has NOT dismissed the popup
    const dismissed = Cookies.get(ONBOARDING_DISMISSED_COOKIE);
    
    if (userId && userType === 'user' && !hasCompletedOnboarding && !dismissed) {
      // Small delay for better UX
      setTimeout(() => setIsOpen(true), 500);
    }
  }, [userId, userType, hasCompletedOnboarding]);

  const handleDismiss = () => {
    // Set cookie to remember dismissal for 30 days
    Cookies.set(ONBOARDING_DISMISSED_COOKIE, 'true', { expires: 30 });
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/onboard-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
          organizationName: formData.organizationName,
          organizationType: formData.organizationType,
          teamSize: formData.teamSize,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Update auth context
        await checkAuth();
        setIsOpen(false);
        // Don't set dismissed cookie - they completed it
      } else {
        alert('Failed to save onboarding data');
      }
    } catch (error) {
      console.error('Onboarding error:', error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />

      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#1e2556] to-[#0f1729] text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Complete Your Profile</h2>
                <p className="text-sm opacity-90 mt-1">Help us personalize your experience</p>
              </div>
              <button
                onClick={handleDismiss}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Organization Name */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#1e2556' }}>
                <Building2 className="inline w-4 h-4 mr-2" />
                Organization Name
              </label>
              <input
                type="text"
                value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7cc6ee] focus:border-transparent"
                placeholder="Enter your organization name"
                required
              />
            </div>

            {/* Organization Type */}
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: '#1e2556' }}>
                <Briefcase className="inline w-4 h-4 mr-2" />
                Organization Type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {orgTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, organizationType: type.id })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.organizationType === type.id
                        ? 'border-[#7cc6ee] bg-[#7cc6ee]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-sm font-medium" style={{ color: '#1e2556' }}>
                      {type.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Team Size */}
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: '#1e2556' }}>
                <Users className="inline w-4 h-4 mr-2" />
                Team Size
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {teamSizes.map((size) => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, teamSize: size.value })}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      formData.teamSize === size.value
                        ? 'border-[#7cc6ee] bg-[#7cc6ee]/10 text-[#1e2556]'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleDismiss}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Skip for Now
              </button>
              <button
                type="submit"
                disabled={loading || !formData.organizationName || !formData.organizationType || !formData.teamSize}
                className="flex-1 px-6 py-3 bg-[#1e2556] text-white rounded-lg font-semibold hover:bg-[#0f1729] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Complete Profile'}
              </button>
            </div>

            <p className="text-xs text-center" style={{ color: '#64748b' }}>
              You can update this information later from your dashboard settings
            </p>
          </form>
        </div>
      </div>
    </>
  );
}