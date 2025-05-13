'use client'

import React, { useEffect, useState } from 'react'
import { Page } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { Blocks } from '../../_components/Blocks'
import { Gutter } from '../../_components/ui-components/Gutter'
import { HR } from '../../_components/ui-components/HR'
import Filters from './Filters'
import TransitonLayout from '../../_components/TransitionLayout'

import classes from './index.module.scss'

const Products = () => {
  const [page, setPage] = useState<Page | null>(null)

  useEffect(() => {
    fetchDoc<Page>({
      collection: 'pages',
      slug: 'products',
    })
      .then(setPage)
      .catch(console.log)
  }, [])

  return (
    <TransitonLayout>
      <div className={classes.container}>
        <Gutter className={classes.products}>
          <Filters />
          <Blocks blocks={page?.layout} disableTopPadding={true} />
        </Gutter>
        <HR />
      </div>
    </TransitonLayout>
  )
}

export default Products
