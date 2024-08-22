import React, { Suspense } from 'react'
import EditReviewPage from './PageComponent'

function Wrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditReviewPage />
    </Suspense>
  )
}

export default Wrapper
