import React from 'react'
import { Metadata } from 'next'

import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import AccountForm from './AccountForm'
import TransitonLayout from '../../_components/TransitionLayout'

import classes from './index.module.scss'

export default async function Account() {
  return (
    <TransitonLayout>
      <div>
        <h5 className={classes.personalInfo}>Персонална Информация</h5>
        <AccountForm />
      </div>
    </TransitonLayout>
  )
}

export const metadata: Metadata = {
  title: 'Акаунт',
  description: 'Създайте акаунт или се впишете със съществуващ.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
}
