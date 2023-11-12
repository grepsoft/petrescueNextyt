
import React from 'react'
import Link from 'next/link'
import RegistrationForm from './registrationForm'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

async function Signup() {

    const session = await getServerSession()

    if( session ) redirect('/dashboard')
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                
                <RegistrationForm />
                <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <Link href="/auth/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Signin
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup