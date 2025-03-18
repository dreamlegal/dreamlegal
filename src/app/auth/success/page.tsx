'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// This is a simple loading page that will handle redirects
// NextAuth will redirect here after successful verification
// The redirect callback will then determine the final destination

export default function AuthSuccessPage() {
  const router = useRouter()
  
  useEffect(() => {
    // The page itself doesn't need to do anything
    // NextAuth's redirect callback will handle the actual redirect
    // This is just a loading indicator
  }, [])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Authentication Successful</h2>
          <p className="mt-2 text-sm text-gray-600">
            You've successfully authenticated. Redirecting you now...
          </p>
          <div className="mt-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    </div>
  )
}