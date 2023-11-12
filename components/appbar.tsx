'use client'

import { signOut, useSession } from 'next-auth/react'
import React from 'react'
import { Button } from './ui/button'

function Appbar() {
    const {data: session} = useSession()

  return (
    <div className='flex justify-between'>
        <h1 className='text-4xl tracking-tight text-gray-500'>Dashboard</h1>
        <div className="flex justify-center align-middle p-2">
            <div className="font-semibold">
                Hello, {session?.user?.email}
            </div>
            <Button 
            onClick={() => signOut({callbackUrl: '/'})}
            className='ml-2'>Logout</Button>
        </div>
    </div>
  )
}

export default Appbar