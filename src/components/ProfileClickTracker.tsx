import { useEffect, useRef } from 'react';

interface ProfileClickTrackerProps {
  productId?: string;
  slug?: string;
}

const ProfileClickTracker = ({ productId, slug }: ProfileClickTrackerProps) => {
  const hasTracked = useRef(false);

  useEffect(() => {
    // Don't track if neither productId nor slug is provided
    if (!productId && !slug) return;

    // Don't track if already tracked in this component instance
    if (hasTracked.current) return;

    // Cookie name based on product identifier
    const cookieName = `view_${productId || slug}`;
    
    // Check if cookie exists
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
      return null;
    };

    // Set cookie with 3-hour expiry
    const setCookie = (name: string, value: string, hours: number) => {
      const date = new Date();
      date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value};${expires};path=/`;
    };

    // Check if view was already tracked
    const existingCookie = getCookie(cookieName);
    if (existingCookie) {
      console.log('View already tracked within 3 hours');
      return;
    }

    // Wait 1 second to ensure user is actually viewing the page
    const timer = setTimeout(async () => {
      try {
        const response = await fetch('/api/track-activity', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId,
            slug,
            actionType: 'profileClick',
            increment: 1
          }),
        });

        if (response.ok) {
          // Set cookie to prevent duplicate tracking for 3 hours
          setCookie(cookieName, 'tracked', 3);
          hasTracked.current = true;
          console.log('Profile view tracked successfully');
        } else {
          console.error('Failed to track profile view');
        }
      } catch (error) {
        console.error('Error tracking profile view:', error);
      }
    }, 1000); // 1 second delay

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [productId, slug]);

  // This component doesn't render anything
  return null;
};

export default ProfileClickTracker;