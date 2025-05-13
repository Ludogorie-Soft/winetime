'use client'

import React from 'react'
import { Toaster } from 'sonner'
import { useWindowSize } from '../../_providers/Resize'

const ToastNotification = () => {
  const { width } = useWindowSize()
  const breakpointSmall = 768

  return <Toaster position={width <= breakpointSmall ? 'top-center' : 'bottom-right'} richColors />
}

export default ToastNotification
