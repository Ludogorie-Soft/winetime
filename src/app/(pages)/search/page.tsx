import React from 'react'

import { Gutter } from '../../_components/ui-components/Gutter'
import { HR } from '../../_components/ui-components/HR'
import { SearchPage } from './SearchPage'
import TransitonLayout from '../../_components/TransitionLayout'

import classes from './index.module.scss'
import { Metadata } from 'next'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'

export const dynamic = 'force-dynamic'

export default function Search() {
  return (
    <TransitonLayout>
      <div className={classes.container}>
        <Gutter>
          <h3 className="text-3xl leading-10 font-normal mb-6">Търси</h3>
          <SearchPage />
          <HR />
        </Gutter>
      </div>
    </TransitonLayout>
  )
}

export const metadata: Metadata = {
  title: 'Търси в Wine Time',
  description: 'Търси в Wine Time.',
  openGraph: mergeOpenGraph({
    title: 'Search',
    url: '/search',
  }),
}
