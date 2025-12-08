// // app/providers.tsx
// "use client";

// import { SessionProvider } from "next-auth/react";
// import { AuthProvider } from '@/context/authContext';

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <SessionProvider>
//       <AuthProvider>
//         {children}
//       </AuthProvider>
//     </SessionProvider>
//   );
// }

// app/providers.tsx
'use client';

import { NewAuthProvider } from '@/context/NewAuthContext';
import OnboardingPopup from '@/components/OnboardingPopup';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NewAuthProvider>
      {children}
      <OnboardingPopup />
    </NewAuthProvider>
  );
}