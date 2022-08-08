import { ToastContainer, toast } from 'react-toastify';

import React from 'react'

export default function ToastContainer_() {
  return (
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
  )
}
