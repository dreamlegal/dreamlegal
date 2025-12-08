// "use client"
// import React from 'react'
// import ReviewsPage from '../../_components/ReviewsPage'
// import { useNewAuth } from '@/context/NewAuthContext';;


// const page = () => {
//       const { userId, userType } = useNewAuth();
//       console.log(userId, userType)
//   return (
//     <ReviewsPage userId={userId} />
//   )
// }

// export default page
// // import React from 'react'

// // const page = () => {
// //   return (
// //     <div>page</div>
// //   )
// // }

// // export default page

"use client"
import React, { Suspense } from 'react'
import ReviewsPage from '../../_components/ReviewsPage'
import { useNewAuth } from '@/context/NewAuthContext';;

const Page = () => {
  const { userId, userType } = useNewAuth();
  console.log(userId, userType)
  
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ReviewsPage userId={userId} />
    </Suspense>
  )
}

export default Page