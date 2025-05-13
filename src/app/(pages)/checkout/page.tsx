import React from 'react'
import { Metadata } from 'next'

import { Settings } from '../../../payload/payload-types'
import { fetchSettings } from '../../_api/fetchGlobals'
import { Gutter } from '../../_components/ui-components/Gutter'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { CheckoutPage } from './NoPaymentForms/CheckoutPage'

import classes from './index.module.scss'

export default async function Checkout() {
  await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to checkout.',
    )}&redirect=${encodeURIComponent('/checkout')}`,
  })

  let settings: Settings | null = null

  try {
    settings = await fetchSettings()
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  return (
    <div className={classes.checkout}>
      <Gutter>
        <CheckoutPage settings={settings} />
      </Gutter>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Акаунт',
  description: 'Създайте акаунт или се впишете във вече съществуващ.',
  openGraph: mergeOpenGraph({
    title: 'Акаунт',
    url: '/account',
  }),
}
