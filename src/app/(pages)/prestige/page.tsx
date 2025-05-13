import React from 'react'

import { Gutter } from '../../_components/ui-components/Gutter'
import TransitonLayout from '../../_components/TransitionLayout'
import PrestigeProducts from '../../_components/PrestigeProductsSection'
import { Product } from '../../../payload/payload-types'
import { fetchPrestigeProducts } from '../../_api/fetchPrestigeProducts'

import classes from './index.module.scss'

const Promotion = async () => {
  let products: Product[] | null = null

  try {
    products = await fetchPrestigeProducts()
  } catch (error) {
    console.error('Failed to fetch prestige products:', error)
  }

  return (
    <TransitonLayout>
      <div className={classes.container}>
        <Gutter>
          <PrestigeProducts products={products || []} />
        </Gutter>
      </div>
    </TransitonLayout>
  )
}

export default Promotion
