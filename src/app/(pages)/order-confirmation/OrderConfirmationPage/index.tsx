'use client'

import React, { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Buttons/Button'
import { Message } from '../../../_components/ui-components/Message'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const OrderConfirmationPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const orderID = searchParams.get('order_id')
  const error = searchParams.get('error')

  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div>
      {error ? (
        <Fragment>
          <Message error={error} />
          <p>
            {`Поръчката е успешна но имаше проблем с нея. Моля свържете се с нас да отстраним проблема.`}
          </p>
          <div className={classes.actions}>
            <Button href="/account" label="Акаунт" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/account/orders`}
              label="Виж Всички Поръчки"
              appearance="secondary"
            />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <h1>Благодаря за поръчката!</h1>
          <p>
            {`Поръчката е потвърдена. Скоро ще получите емайл с потвърждението. Номер на твоята поръчка е ${orderID}.`}
          </p>
          <div className={classes.actions}>
            <Button href={`account/orders/${orderID}`} label="Виж Поръчка" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/account/orders`}
              label="Виж Всички Поръчки"
              appearance="secondary"
            />
          </div>
        </Fragment>
      )}
    </div>
  )
}
