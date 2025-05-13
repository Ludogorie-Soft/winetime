import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Page, Settings } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchSettings } from '../../_api/fetchGlobals'
import { Gutter } from '../../_components/ui-components/Gutter'
import { generateMeta } from '../../_utilities/generateMeta'
import { FavouritesPage } from './FavouritesPage'
import { HR } from '../../_components/ui-components/HR'
import TransitonLayout from '../../_components/TransitionLayout'

import classes from './index.module.scss'

export const dynamic = 'force-dynamic'

export default async function Cart() {
  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'favourites',
    })
  } catch (error) {
    console.log('Error in fetchDoc for Page', error)
  }

  if (!page) {
    return notFound()
  }

  let settings: Settings | null = null

  try {
    settings = await fetchSettings()
  } catch (error) {
    console.log('Error in fetchSettings', error)
  }

  return (
    <TransitonLayout>
      <div className={classes.container}>
        <Gutter>
          <h3 className="text-3xl leading-10 font-normal">Любими Продукти</h3>
          <FavouritesPage settings={settings} page={page} />
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
      slug: 'favourites',
    })
  } catch (error) {
    console.log('Error in fetchDoc for Page', error)
  }

  return generateMeta({ doc: page })
}
