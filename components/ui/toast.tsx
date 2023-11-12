import React from 'react'
import { ToastContainer } from 'react-toastify'

function ToastContainerWrapper() {
  return (
    <ToastContainer autoClose={5000} theme='colored' />
  )
}

export default ToastContainerWrapper