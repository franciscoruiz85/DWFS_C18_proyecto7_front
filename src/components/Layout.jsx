import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { ErrorBoundary } from './ErrorBoundary'

const Layout = () => {
  return (
    <div>
        <ErrorBoundary>
          <Navbar />
        </ErrorBoundary>
        <Outlet />
    </div>
  )
}

export default Layout
