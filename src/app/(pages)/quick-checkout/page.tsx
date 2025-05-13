import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/ui-components/Gutter'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'

import classes from './index.module.scss'
import TransitonLayout from '../../_components/TransitionLayout'
import QuickCheckoutForm from './QuickCheckoutForm'
import { HR } from '../../_components/ui-components/HR'

export default async function Checkout() {
  return (
    <TransitonLayout>
      <div className={classes.checkout}>
        <Gutter>
          <h3 className="text-3xl leading-10 font-normal">
            Попълнете данните и наш сътрудник ще се свържете с вас по зададения телефон
          </h3>
          <HR />
          <QuickCheckoutForm />
        </Gutter>
      </div>
    </TransitonLayout>
  )
}

export const metadata: Metadata = {
  title: 'Бърза Поръчка',
  description: 'Направете бърза поръчка и ние ще се свържем с вас.',
  openGraph: mergeOpenGraph({
    title: 'Бърза Поръчка',
    url: '/quick-checkout',
  }),
}
