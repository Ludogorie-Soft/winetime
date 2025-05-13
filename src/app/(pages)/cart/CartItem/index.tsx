'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Media } from '../../../../payload/payload-types'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/Buttons/RemoveFromCartButton'

import classes from './index.module.scss'
import { DiscountPrice } from '../../../_components/DiscountPrice'

const CartItem = ({ product, title, qty, addItemToCart }) => {
  const [quantity, setQuantity] = useState(qty)

  const decrementQty = () => {
    const updatedQty = quantity > 1 ? quantity - 1 : 1

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const incrementQty = () => {
    const updatedQty = quantity + 1

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQty = Number(e.target.value)

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const testImage = product.meta.image as Media
  const metaImage = testImage.filename as string
  const imagePath = `/media/${metaImage}`

  return (
    <li className={classes.item} key={title}>
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
        </div>

        <div className={classes.quantity}>
          <div className={classes.quantityBtn} onClick={decrementQty}>
            <Image
              src="/assets/icons/minus.svg"
              alt="minus"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>

          <input
            type="text"
            className={classes.quantityInput}
            value={quantity}
            onChange={enterQty}
          />

          <div className={classes.quantityBtn} onClick={incrementQty}>
            <Image
              src="/assets/icons/plus.svg"
              alt="plus"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div>
        </div>
      </div>

      <div className={classes.subtotalWrapper}>
        {product.discountPrice ? (
          <DiscountPrice product={product} button={false} quantity={quantity} />
        ) : (
          <Price product={product} button={false} quantity={quantity} />
        )}
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

export default CartItem
