"use client"
import { useEffect, useRef, useState } from "react";

/**
 * Component to track post views in the feed
 * Only counts a view if the post is visible for 3+ seconds
 */
export const PostViewTracker = ({ postId, children }) => {
  const postRef = useRef();
  const [viewed, setViewed] = useState(false);
  
  useEffect(() => {
    // Skip if already viewed in this component's lifetime
    if (viewed) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !viewed) {
            // Start a timer when post becomes visible
            const timer = setTimeout(() => {
              // Check if still visible after 3 seconds
              if (entry.isIntersecting) {
                console.log(`Recording view for post ${postId} from feed`);
                fetch(`/api/posts/increment-view?postId=${postId}`);
                setViewed(true);
              }
            }, 3000); // Wait 3 seconds before counting view
            
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.5 } // Post must be 50% visible to start counting
    );
    
    if (postRef.current) {
      observer.observe(postRef.current);
    }
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [postId, viewed]);
  
  return (
    <div ref={postRef}>
      {children}
    </div>
  );
};

/**
 * Hook to track views on individual post pages
 * Simply increments the view counter when the page loads
 */
export const usePostPageView = (postId) => {
  useEffect(() => {
    if (!postId) return;
    
    // Increment view counter when post page loads
    fetch(`/api/posts/increment-view?postId=${postId}`);
    
  }, [postId]); // Only run once when component mounts with a valid postId
};