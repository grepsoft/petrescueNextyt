'use client'

import React from 'react'
import { useFormState } from 'react-dom'
import { registerUser } from '../actions/actions'
import { Input } from '@/components/ui/input'
import SubmitButton from '@/components/ui/submit-button'

const initialState = {
    message: ''
}
function RegistrationForm() {
    const [state, formAction] = useFormState(registerUser, initialState)
    return (
        <form className='space-y-6 shadow-md p-4' action={formAction}>
            {
                state.message &&
                <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    <p>{state.message}</p>
                </div>
            }
            <div>
                <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">
                    Firstname
                </label>
                <div className="mt-2">
                    <Input
                        id="firstname"
                        name="firstname"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">
                    Lastname
                </label>
                <div className="mt-2">
                    <Input
                        id="lastname"
                        name="lastname"
                        type="text"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="mt-2">
                    <Input
                        id="email"
                        name='email'
                        type="email"
                        placeholder="Email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
                        name="password"
                        type="password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <SubmitButton title='Register' />
            </div>
        </form>
    )
}

export default RegistrationForm