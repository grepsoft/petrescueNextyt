

import React from 'react'
import { Button } from './button'
import { useFormStatus } from 'react-dom'
import { Loader } from './loader'

function SubmitButton({
    title
}: {
    title: string
}) {
    const { pending } = useFormStatus()
  return (
    <Button
    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    type="submit"
    >
        {pending ? <Loader /> : title}
    </Button>
  )
}

export default SubmitButton