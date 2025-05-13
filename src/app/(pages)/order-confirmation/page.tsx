import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/ui-components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { OrderConfirmationPage } from './OrderConfirmationPage'

import classes from './index.module.scss'

export default async function OrderConfirmation() {
  return (
    <Gutter className={classes.confirmationPage}>
      <Suspense fallback={<div>Loading...</div>}>
        <OrderConfirmationPage />
      </Suspense>
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Потвърждение за поръчка',
  description: 'Поръчката е потвърдена.',
  openGraph: mergeOpenGraph({
    title: 'Order Confirmation',
    url: '/order-confirmation',
  }),
}
