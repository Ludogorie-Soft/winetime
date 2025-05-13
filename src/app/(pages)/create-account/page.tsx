import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { RenderParams } from '../../_components/RenderParams'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import CreateAccountForm from './CreateAccountForm'

import classes from './index.module.scss'

export default async function CreateAccount() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent(
      'Не може да създадете акаънт когато сте висани вече, може разлогнете се и опитайте отново.',
    )}`,
  })

  return (
    <section className={classes.createAccount}>
      <div className={classes.heroImg}>
        <Link href="/">
          {/* <h2 className="text-3xl font-bold">winetime</h2> */}
          <Image src="/wine-logo-white.svg" alt="logo" width={130} height={90} className={classes.logo} />
        </Link>
      </div>

      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <RenderParams className={classes.params} />

          <div className={classes.formTitle}>
            <h3>Създай Акаунт</h3>
          </div>

          <p>Въведете вашите детайли</p>

          <CreateAccountForm />
        </div>
      </div>
    </section>
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
