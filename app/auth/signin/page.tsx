'use client'

import React, { useState } from 'react'
import { Formik } from 'formik'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface LoginFormInterface {
  email: string,
  password: string
}
function SignIn() {
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleLogin = async (data: LoginFormInterface,
    { setSubmitting }: { setSubmitting: (value: boolean) => void }) => {

    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: '/dashboard'
    })

    setSubmitting(false)

    if (!response?.ok) {
      setError(true)
    } else {
      router.replace(response.url!)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-md">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {
            error &&
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <p>Invalid Credentials</p>
              </div>
          }
          <Formik
            initialValues={{
              email: '', password: ''
            }}
            onSubmit={handleLogin}>
            {({
              values,
              handleSubmit,
              handleChange,
              isSubmitting
            }) =>
              <form className='space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <Input
                      id='email'
                      name='email'
                      onChange={handleChange}
                      value={values.email}
                      type='email'
                      placeholder='Email'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <Input
                      id="password"
                      name='password'
                      onChange={handleChange}
                      value={values.password}
                      type="password"
                      placeholder="Password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            }
          </Formik>
        </div>
        <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <Link href="/auth/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Signup
            </Link>
          </p>
      </div>
    </div>
  )
}

export default SignIn