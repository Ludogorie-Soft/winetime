import React from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/ui-components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { ResetPasswordForm } from './ResetPasswordForm'

import classes from './index.module.scss'

export default async function ResetPassword() {
  return (
    <Gutter className={classes.resetPassword}>
      {/* <h1>Ресет на парола</h1>
      <p>Моля напишете нова пароло отдолу.</p> */}
      <ResetPasswordForm />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'Ресет на парола',
  description: 'Въведете нова парола.',
  openGraph: mergeOpenGraph({
    title: 'Ресет на парола',
    url: '/reset-password',
  }),
}
