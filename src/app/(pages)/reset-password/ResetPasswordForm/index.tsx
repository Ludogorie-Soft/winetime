'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '../../../_components/Buttons/Button'
import { Input } from '../../../_components/ui-components/Input'
import { Message } from '../../../_components/ui-components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'
import { motion } from 'framer-motion'

type FormData = {
  password: string
  token: string
}

export const ResetPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [isResetting, setIsResetting] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
    setIsResetting(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`,
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (response.ok) {
        const json = await response.json()

        // Automatically log the user in after they successfully reset password
        await login({ email: json.user.email, password: data.password })

        // Redirect them to `/account` with success message in URL
        router.push('/account?success=Password reset successfully.')
      } else {
        setError('There was a problem while resetting your password. Please try again later.')
      }
    },
    [router, login],
  )

  // when Next.js populates token within router,
  // reset form with new token value
  useEffect(() => {
    reset({ token: token || undefined })
  }, [reset, token])

  return (
    <div className="flex items-center justify-center p-4">
    <div className="max-w-md w-full">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="p-8 bg-[#dc2626]">
          <h2 className="text-3xl font-extrabold text-white text-center">Възстанови паролата си</h2>
          <p className="mt-2 text-red-100 text-center">Ново начало с нова парола</p>
        </div>
        <div className="p-8">
          <div className="mb-6 flex justify-center">
          <Image src="/wine-glass.svg" alt="Loading" width={40} height={40} />
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
            <div>
            <Message error={error} className={classes.message} />
              <div className="mt-1 mb-2 relative">
                <Input
                  name="password"
                  type="password"
                  label="Нова парола"
                  required
                  register={register} 
                  error={errors.password} 
                  />
                <input type="hidden" {...register('token')} />
                <div className="absolute bottom-3 right-0 pr-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#dc2626] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#dc2626]"
                disabled={isResetting}
              >
                {isResetting ? 'Изчакайте...' : 'Възстанови паролата'}
              </motion.button>
            </div>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
          С повторното задаване на вашата парола вие се съгласявате с нашите{' '}
            <a href="https://winetime.bg/terms-policy" className="font-medium text-[#dc2626] hover:text-red-500">
            Условия за ползване
            </a>{' '}
          </p>
        </div>
      </motion.div>
    </div>
  </div>
  )
}
