// // components/EventAuthModal.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import AuthModal from './AuthModal'; // Your existing modal

// export default function EventAuthModal() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [message, setMessage] = useState('Sign in to continue');
//   const [userType, setUserType] = useState<'user' | 'vendor'>('user');

//   useEffect(() => {
//     const handleShowModal = (event: CustomEvent) => {
//       const { message: customMessage, userType: customUserType } = event.detail || {};
      
//       if (customMessage) setMessage(customMessage);
//       if (customUserType) setUserType(customUserType);
      
//       setIsOpen(true);
//     };

//     window.addEventListener('showAuthModal' as any, handleShowModal);
//     return () => window.removeEventListener('showAuthModal' as any, handleShowModal);
//   }, []);

//   return (
//     <AuthModal 
//       isOpen={isOpen}
//       onClose={() => setIsOpen(false)}
//       message={message}
//       userType={userType}
//     />
//   );
// }
// components/EventAuthModal.tsx
'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import AuthModal to avoid SSR issues
const AuthModal = dynamic(() => import('./AuthModal'), {
  ssr: false,
  loading: () => null
});

/**
 * EventAuthModal - Wrapper around your existing AuthModal
 * 
 * This listens to the custom 'showAuthModal' event from NewAuthContext
 * and triggers your existing AuthModal component with props.
 * 
 * This way:
 * - Your old code with AuthModal props still works
 * - New code using showAuthModal() also works
 * 
 * Usage in layout:
 * <EventAuthModal />
 */
function EventAuthModalContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Sign in to continue');
  const [userType, setUserType] = useState<'user' | 'vendor'>('user');

  useEffect(() => {
    const handleShowModal = (event: CustomEvent) => {
      const { 
        message: customMessage, 
        userType: customUserType,
        returnUrl 
      } = event.detail || {};
      
      // Update message if provided
      if (customMessage) {
        setMessage(customMessage);
      } else {
        setMessage('Sign in to continue');
      }
      
      // Update user type if provided
      if (customUserType) {
        setUserType(customUserType);
      } else {
        setUserType('user');
      }
      
      // Open the modal
      setIsOpen(true);
    };

    // Listen for the custom event from showAuthModal()
    window.addEventListener('showAuthModal' as any, handleShowModal);

    return () => {
      window.removeEventListener('showAuthModal' as any, handleShowModal);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AuthModal 
      isOpen={isOpen}
      onClose={handleClose}
      message={message}
      userType={userType}
    />
  );
}

export default function EventAuthModal() {
  return (
    <Suspense fallback={null}>
      <EventAuthModalContent />
    </Suspense>
  );
}