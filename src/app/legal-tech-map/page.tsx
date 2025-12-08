


// app/legal-tech-map/page.tsx
'use client';
import LoginGate from '@/components/LoginGate';
import LegalSoftwareCanvas from '@/components/LegalSoftwareCanvas';

export default function LegalTechMapPage() {
  return (
    <LoginGate 
      message="Sign in to explore the Legal Tech Map"
      blur={false}
    >
      <LegalSoftwareCanvas />
    </LoginGate>
  );
}