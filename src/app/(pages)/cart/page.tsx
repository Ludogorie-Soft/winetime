import React, { Fragment } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Page, Settings } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchSettings } from '../../_api/fetchGlobals'
import { Gutter } from '../../_components/ui-components/Gutter'
import { generateMeta } from '../../_utilities/generateMeta'
import { CartPage } from './CartPage'
import { HR } from '../../_components/ui-components/HR'
import TransitonLayout from '../../_components/TransitionLayout'

import classes from './index.module.scss'

export const dynamic = 'force-dynamic'

export default async function Cart() {
  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'cart',
    })
  } catch (error) {
    console.log(error)
  }

  if (!page) {
    return notFound()
  }

  let settings: Settings | null = null

  try {
    settings = await fetchSettings()
  } catch (error) {
    console.log(error)
  }

  return (
    <TransitonLayout>
      <div className={classes.container}>
        <Gutter>
          <h3 className="text-3xl leading-10 font-normal">Количка</h3>
          <CartPage settings={settings} page={page} />
          <HR />
        </Gutter>
      </div>
    </TransitonLayout>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'cart',
    })
  } catch (error) {
    console.log(error)
  }

  return generateMeta({ doc: page })
}
