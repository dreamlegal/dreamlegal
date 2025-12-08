
"use client"
import React, { Suspense } from 'react'
import BookmarksPage from '../../_components/BookmarksPage'
import { useNewAuth } from '@/context/NewAuthContext';;

const Page = () => {
  const { userId, userType } = useNewAuth();
  console.log(userId, userType)
  
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <BookmarksPage userId={userId} />
    </Suspense>
  )
}

export default Page