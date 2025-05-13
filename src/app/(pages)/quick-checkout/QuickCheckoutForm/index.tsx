'use client'

import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Buttons/Button'
import { useCart } from '../../../_providers/Cart'
import { Input } from '../../../_components/ui-components/Input'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import classes from './index.module.scss'

type FormData = {
  name: string
  phone: string
}

export const QuickCheckoutForm: React.FC<{}> = () => {
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useCart()

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>()

  const OnSubmit = useCallback(
    async (data: FormData) => {
      try {
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quickOrder: true,
            total: cartTotal.raw,
            name: data.name,
            phone: data.phone,
            deliveryMethod: 'quickOrder',
            placeOfResident: '',
            ekontOffice: '',
            addressNeighborhood: '',
            addressStreet: '',
            items: (cart?.items || [])?.map(({ product, quantity }) => ({
              product: typeof product === 'string' ? product : product.id,
              quantity,
            })),
          }),
        })

        if (!orderReq.ok) throw new Error(orderReq.statusText || 'Нещо се обърка.')

        const { error: errorFromRes, doc }: { message?: string; error?: string; doc: Order } =
          await orderReq.json()

        if (errorFromRes) throw new Error(errorFromRes)

        toast.success('Поръчката е изпратена успешно!', {
          duration: 8000,
          position: 'top-center',
          style: {
            fontSize: '1rem',
          },
        })

        clearCart()

        router.push(`/`)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Нещо се обърка.'
        toast.error(`Грешка при поръчка: ${msg}`, {
          duration: 5000,
          position: 'top-center',
          style: {
            fontSize: '1rem',
          },
        })
      }
    },
    [router, cart, cartTotal],
  )

  const validatePhoneNumber = value => {
    const phoneRegex = /^\+?(\d{1,3})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/
    if (value && !phoneRegex.test(value)) {
      return 'Невалиден формат на телефонния номер'
    }
    return true
  }

  return (
    <form onSubmit={handleSubmit(OnSubmit)} className={classes.form}>
      <Input name="name" label="Имена:" required register={register} error={errors.name} />

      <Input
        name="phone"
        label="Телефонен Номер:"
        required
        register={register}
        error={errors.phone}
        validate={validatePhoneNumber}
      />

      <div className={classes.actions}>
        <Button label="Към Количка" href="/cart" appearance="secondary" />
        <Button
          label={isLoading ? 'Обработка...' : 'Поръчай'}
          type="submit"
          appearance="primary"
          disabled={isLoading}
        />
      </div>
    </form>
  )
}

export default QuickCheckoutForm
