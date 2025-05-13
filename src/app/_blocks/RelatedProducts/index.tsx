import React from 'react'

import { Product } from '../../../payload/payload-types'
import { Card } from '../../_components/Cards/Card'
import { Gutter } from '../../_components/ui-components/Gutter'

import classes from './index.module.scss'
import { TypographyH3 } from '../../_components/typography/typography-h3'

export type RelatedProductsProps = {
  blockType: 'relatedProducts'
  blockName?: string
  introContent?: any
  docs?: (string | Product)[]
  relationTo: 'products'
}

export const RelatedProducts: React.FC<RelatedProductsProps> = props => {
  const { docs, relationTo } = props

  return (
    <div className={classes.relatedProducts}>
      <Gutter>
        <div className="mt-4 mb-4 underline">
          <TypographyH3 text="Подобни продукти" />
        </div>
        <div className={classes.grid}>
          {docs?.map(doc => {
            if (typeof doc === 'string') return null

            return <Card key={doc.id} relationTo={relationTo} doc={doc} showCategories />
          })}
        </div>
      </Gutter>
    </div>
  )
}
