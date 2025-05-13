import React from 'react'
import { Gutter } from '../../_components/ui-components/Gutter'
import { HR } from '../../_components/ui-components/HR'
import TransitonLayout from '../../_components/TransitionLayout'
import { OtherProductsPage } from './OtherProductsPage'

import classes from './index.module.scss'

const OtherProductsProducts = async () => {
  return (
    <TransitonLayout>
      <div className={classes.container}>
        <Gutter className={classes.products}>
          <h3 className="text-3xl leading-10 font-normal mb-6">Други Продукти</h3>
          <OtherProductsPage />
        </Gutter>
        <HR />
      </div>
    </TransitonLayout>
  )
}

export default OtherProductsProducts
