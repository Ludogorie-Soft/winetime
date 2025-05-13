'use client'

import React, { useCallback } from 'react'

import { Gutter } from '../../_components/ui-components/Gutter'
import { HR } from '../../_components/ui-components/HR'
import TransitonLayout from '../../_components/TransitionLayout'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Input } from '../../_components/ui-components/Input'
import { TextArea } from '../../_components/ui-components/Textarea'
import { Button } from '../../_components/Buttons/Button'
import { TypographyH4 } from '../../_components/typography/typography-h4'
import { TypographyP } from '../../_components/typography/typography-p'
import * as phone from '../../../../public/assets/icons-json/phone.json'
import * as clock from '../../../../public/assets/icons-json/clock.json'
import * as shop from '../../../../public/assets/icons-json/shop.json'
import Lottie from 'react-lottie'
import { FaWpforms } from 'react-icons/fa'

import classes from './index.module.scss'

export const dynamic = 'force-dynamic'

type FormData = {
  name: string
  email: string
  text: string
}

export default function Delivery() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm<FormData>()

  const OnSubmit = useCallback(
    async (data: FormData) => {
      try {
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact-us`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            text: data.text,
          }),
        })

        toast.success(`Успешно изпратихте вашето съобщение!`, {
          duration: 5000,
          position: 'top-center',
          style: {
            fontSize: '1rem',
          },
        })

        if (!orderReq.ok) throw new Error(orderReq.statusText || 'Нещо се обърка.')

        const {
          error: errorFromRes,
          doc,
        }: {
          message?: string
          error?: string
          doc: any
        } = await orderReq.json()

        reset()

        if (errorFromRes) throw new Error(errorFromRes)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Нещо се обърка.'
        toast.error(`Грешка при заявка: ${msg}`, {
          duration: 5000,
          position: 'top-center',
          style: {
            fontSize: '1rem',
          },
        })
      }
    },
    [reset],
  )

  const defaultOptions = animationData => ({
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  })

  return (
    <TransitonLayout>
      <div className={classes.container}>
        <Gutter>
          <div className="flex justify-start gap-4 items-center">
            <FaWpforms style={{ width: '36px', height: '36px' }} />
            <h3 className="text-3xl leading-10 font-normal">Контакт с нас</h3>
          </div>
          <HR />

          <div className="flex flex-col sm:flex-row w-full">
            <div className="w-full sm:w-1/2 p-2 gap-6 flex flex-col">
              <div>
                <div className="flex justify-start gap-3 items-center">
                  <div className="w-[30px] h-[30px] m-0 pointer-events-none">
                    <Lottie options={defaultOptions(shop)} height={30} width={30} />
                  </div>
                  <TypographyH4 text="WineTime" />
                </div>
                <TypographyP text="Oнлайн магазин WineTime" />
              </div>
              <div>
                <div className="flex justify-start gap-3 items-center">
                  <div className="w-[30px] h-[30px] m-0 pointer-events-none">
                    <Lottie options={defaultOptions(phone)} height={30} width={30} />
                  </div>
                  <TypographyH4 text="Телефон" />
                </div>
                <TypographyP text="0899 801 049" />
              </div>
              <div>
                <div className="flex justify-start gap-3 items-center">
                  <div className="w-[30px] h-[30px] m-0 pointer-events-none">
                    <Lottie options={defaultOptions(clock)} height={30} width={30} />
                  </div>
                  <TypographyH4 text="Работно време" />
                </div>
                <TypographyP text="Понеделник- петък от 12:00 до 20:00" />
              </div>
            </div>

            <div className="w-full sm:w-1/2 p-2">
              <form onSubmit={handleSubmit(OnSubmit)} className={classes.form}>
                <h3 className="text-2xl leading-10 font-normal">Информация</h3>
                <Input
                  name="name"
                  label="Име:"
                  required
                  register={register}
                  error={errors.name}
                  type="text"
                />
                <Input
                  name="email"
                  label="Емайл:"
                  required
                  register={register}
                  error={errors.email}
                  type="email"
                />
                <TextArea name="text" label="Съобщение:" register={register} error={errors.text} />
                <div className={classes.actions}>
                  <Button label="Начало" href="/" appearance="secondary" />
                  <Button
                    label={isLoading ? 'Обработка...' : 'Изпрати'}
                    type="submit"
                    appearance="primary"
                    disabled={isLoading}
                  />
                </div>
              </form>
            </div>
          </div>
        </Gutter>
      </div>
    </TransitonLayout>
  )
}
