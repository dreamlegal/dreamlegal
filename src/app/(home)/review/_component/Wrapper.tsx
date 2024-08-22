import React, { Suspense } from 'react'
import PageComponent from './PageComponent'

function Wrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageComponent />
    </Suspense>
  )
}

export default Wrapper
