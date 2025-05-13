import React from 'react'

import { Gutter } from '../../_components/ui-components/Gutter'
import TransitonLayout from '../../_components/TransitionLayout'
import { Beef } from 'lucide-react'

import classes from './index.module.scss'
import { Brand } from '../../../payload/payload-types'
import { fetchDocs } from '../../_api/fetchDocs'
import { HR } from '../../_components/ui-components/HR'
import BrandCard from '../../_components/Cards/BrandCard'

const Brands = async () => {
  let brands: Brand[] | null = null

  try {
    brands = await fetchDocs<Brand>('brands')
  } catch (error) {
    console.log(error)
  }
  return (
    <TransitonLayout>
      <div className={classes.container}>
        <Gutter>
          <div className="flex justify-start gap-4 items-center">
            <Beef style={{ width: '36px', height: '36px' }} />
            <h3 className="text-3xl leading-10 font-normal">Производители</h3>
          </div>
          <HR />
          <div className="flex flex-wrap items-center justify-center gap-4">
            {brands?.map((brand: Brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
        </Gutter>
      </div>
    </TransitonLayout>
  )
}

export default Brands
