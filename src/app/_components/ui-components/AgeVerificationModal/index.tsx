'use client'

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContentWithoutClose, DialogHeader, DialogTitle } from '../../ui/dialog'
import { Button } from '../../Buttons/Button'

const AgeVerificationModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const ageVerified = localStorage.getItem('ageVerified')
    if (!ageVerified) {
      setIsOpen(true)
    }
  }, [])

  const handleVerification = (verified: boolean) => {
    if (verified) {
      localStorage.setItem('ageVerified', 'true')
    } else {
      window.location.href = 'https://www.google.com'
    }
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContentWithoutClose>
        <DialogHeader>
          <DialogTitle>
            <div className="w-full flex items-center justify-center">
              <h2 className="text-2xl">Имате ли навършени 18 години?</h2>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center space-x-4">
          <Button label="Да" appearance="secondary" onClick={() => handleVerification(true)} />
          <Button label="Не" onClick={() => handleVerification(false)} appearance="primary" />
        </div>
      </DialogContentWithoutClose>
    </Dialog>
  )
}

export default AgeVerificationModal
