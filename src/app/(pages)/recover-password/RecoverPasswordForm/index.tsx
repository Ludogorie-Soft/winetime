'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../../../_components/Buttons/Button'
import { Input } from '../../../_components/ui-components/Input'
import { Message } from '../../../_components/ui-components/Message'

import classes from './index.module.scss'

type FormData = {
  email: string
}

export const RecoverPasswordForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = useCallback(async (data: FormData) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    if (response.ok) {
      setSuccess(true)
      setError('')
    } else {
      setError(
        'There was a problem while attempting to send you a password reset email. Please try again.',
      )
    }
  }, [])

  return (
    <Fragment>
      {!success && (
        <React.Fragment>
          <p>
            Въведете вашия регистриан емайл адрес. Ще ви изпратим код за рестартиране на паролата.
          </p>

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
            <Button
              type="submit"
              appearance="primary"
              label="Възстанови паролата"
              className={classes.submit}
            />
          </form>
        </React.Fragment>
      )}
      {success && (
        <React.Fragment>
          <h1>Запитването Изпратено</h1>
          <p>Проверете емайл адреса си за линк с който ще можете да смените паролата.</p>
        </React.Fragment>
      )}
    </Fragment>
  )
}
