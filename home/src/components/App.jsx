import React from 'react'

const Tracking = React.lazy(() => import('tracking/Tracking'))

const App = ({}) => {
  return (
    <div id="tracking-micro-ui" style={{width: '100%', height: '100vh'}}>
      <React.Suspense fallback="Loading app">
        <Tracking/>
      </React.Suspense>
    </div>
  )
}

export default App
