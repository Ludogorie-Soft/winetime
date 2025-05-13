import React from 'react'
import { Gutter } from '../../_components/ui-components/Gutter'
import { HR } from '../../_components/ui-components/HR'
import TransitonLayout from '../../_components/TransitionLayout'

import classes from './index.module.scss'
import { PromotionPage } from './PromotionPage'

const DiscountProducts = async () => {
  return (
    <TransitonLayout>
      <div className={classes.container}>
        <Gutter className={classes.products}>
          <h3 className="text-3xl leading-10 font-normal mb-6">Промоционални Продукти</h3>
          <PromotionPage />
        </Gutter>
        <HR />
      </div>
    </TransitonLayout>
  )
}

export default DiscountProducts
