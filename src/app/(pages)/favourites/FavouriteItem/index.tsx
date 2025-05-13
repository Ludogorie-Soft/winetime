'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Media } from '../../../../payload/payload-types'
import { Price } from '../../../_components/Price'
import { RemoveFromFavouritesButton } from '../../../_components/Buttons/RemoveFromFavouritesButton'
import { DiscountPrice } from '../../../_components/DiscountPrice'

import classes from './index.module.scss'

const FavouriteItem = ({ product, title }) => {
  const testImage = product.meta.image as Media
  const metaImage = testImage.filename as string
  const imagePath = `/media/${metaImage}`

  return (
    <div className={classes.item} key={title}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No image</span>}
        {metaImage && (
          <Image
            src={imagePath}
            alt={product.title}
            fill
            style={{ objectFit: 'contain', objectPosition: 'center' }}
            placeholder="blur"
            blurDataURL={'assets/icons/placeholder.svg'}
            loading="lazy"
          />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
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
          <div className={classes.buttonWrapper}>
            <RemoveFromFavouritesButton product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FavouriteItem
