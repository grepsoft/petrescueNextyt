import Appbar from '@/components/appbar'
import React from 'react'
import AuthContext from './auth-context'

function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AuthContext>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Appbar />
        <section className='px-4'>{children}</section>
      </div>
    </AuthContext>

  )
}

export default DashboardLayout