// components/EventAuthModal.tsx
'use client';

import { useState, useEffect } from 'react';
import AuthModal from './AuthModal'; // Your existing modal

export default function EventAuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Sign in to continue');
  const [userType, setUserType] = useState<'user' | 'vendor'>('user');

  useEffect(() => {
    const handleShowModal = (event: CustomEvent) => {
      const { message: customMessage, userType: customUserType } = event.detail || {};
      
      if (customMessage) setMessage(customMessage);
      if (customUserType) setUserType(customUserType);
      
      setIsOpen(true);
    };

    window.addEventListener('showAuthModal' as any, handleShowModal);
    return () => window.removeEventListener('showAuthModal' as any, handleShowModal);
  }, []);

  return (
    <AuthModal 
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      message={message}
      userType={userType}
    />
  );
}