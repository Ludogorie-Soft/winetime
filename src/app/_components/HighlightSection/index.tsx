'use client'

import React from 'react'
import Image from 'next/image'

import { Media, Product } from '../../../payload/payload-types'
import { Button } from '../Buttons/Button'
import { Price } from '../Price'
import { TypographyH2 } from '../typography/typography-h2'

import classes from './index.module.scss'
import Link from 'next/link'
import { useFilter } from '../../_providers/Filter'
import { DiscountPrice } from '../DiscountPrice'

const HighlightProduct = ({
  product,
  reverse = false,
}: {
  product: Product
  reverse?: boolean
}) => {
  const {
    setCategoryFilters,
    setSpirtsFilters,
    setBrandFilters,
    setRegionFilters,
    setSortsFilters,
    setFoodsFilters,
  } = useFilter()
  const testImage = product.meta.image as Media
  const metaImage = testImage.filename as string
  const imagePath = `/media/${metaImage}`
  const productPath = `/products/${product.slug}`

  return (
    <section className={`${classes.highlightContainer} ${reverse ? classes.reverse : ''}`}>
      <div className={classes.productInfo}>
        {product.brands && (
          <Link
            href="/products"
            onClick={() => {
              setCategoryFilters([])
              setSpirtsFilters([])
              setBrandFilters([(product.brands as any).id])
              setRegionFilters([])
              setSortsFilters([])
              setFoodsFilters([])
            }}
          >
            <h4 className="max-w-full uppercase text-left m-0 text-xs text-blue-500 font-semibold whitespace-nowrap overflow-hidden truncate">
              {(product.brands as any).title}
            </h4>
          </Link>
        )}

        <TypographyH2 text={product.title} />

        <div className={classes.productPrice}>
          {' '}
          {product.discountPrice ? (
            <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-start">
              <div className="line-through text-gray-500">
                <Price product={product} button={false} />
              </div>
              <DiscountPrice product={product} button={false} />
            </div>
          ) : (
            <Price product={product} button={false} />
          )}
        </div>
        {product.meta.description && (
          <p className={classes.productDescription}>{product.meta.description}</p>
        )}

        <div className={classes.productButton}>
          <Button el="link" href={productPath} label="Разгледай" appearance="primary" />
        </div>
      </div>

      <div className={classes.productImageWrapper}>
        <Image
          src={imagePath}
          alt={product.title}
          fill
          style={{ objectFit: 'contain' }}
          loading="lazy"
          placeholder="blur"
          blurDataURL={'assets/icons/placeholder.svg'}
        />
      </div>
    </section>
  )
}

export default HighlightProduct
