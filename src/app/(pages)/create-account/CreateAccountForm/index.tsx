'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Buttons/Button'
import { Input } from '../../../_components/ui-components/Input'
import { Message } from '../../../_components/ui-components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

type FormData = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = useCallback(
    async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const message = response.statusText || 'There was an error creating the account.'
        setError(message)
        return
      }

      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        await login(data)
        clearTimeout(timer)
        if (redirect) router.push(redirect as string)
        else router.push(`/`)
        window.location.href = '/'
      } catch (_) {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Message error={error} className={classes.message} />
      <Input
        name="email"
        label="Емайл Адрес"
        required
        register={register}
        error={errors.email}
        type="email"
      />
      <Input
        name="name"
        label="Пълно Име"
        required
        register={register}
        error={errors.email}
        type="text"
      />
      <Input
        name="password"
        type="password"
        label="Парола"
        required
        register={register}
        error={errors.password}
      />
      <Input
        name="passwordConfirm"
        type="password"
        label="Потвърди Парола"
        required
        register={register}
        validate={value => value === password.current || 'The passwords do not match'}
        error={errors.passwordConfirm}
      />
      <Button
        type="submit"
        label={loading ? 'Обработка' : 'Регистрирай се'}
        disabled={loading}
        appearance="primary"
        className={classes.submit}
      />
      <div>
        {'Вече имате акаунт? '}
        <Link href={`/login${allParams}`} className="font-bold">
          Влез
        </Link>
      </div>
    </form>
  )
}

export default CreateAccountForm
