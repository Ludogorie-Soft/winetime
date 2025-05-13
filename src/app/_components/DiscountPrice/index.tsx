'use client'

import React, { useEffect, useState } from 'react'

import { Product } from '../../../payload/payload-types'

import classes from './index.module.scss'

export const priceFromRaw = (price: number, quantity: number = 1): string => {
  let formattedPrice = ''

  try {
    const priceValue = price * quantity
    formattedPrice = priceValue.toLocaleString('bg-BG', {
      style: 'currency',
      currency: 'BGN',
    })
  } catch (e) {
    console.error(`Cannot format price`) // eslint-disable-line no-console
  }

  return formattedPrice
}

export const DiscountPrice: React.FC<{
  product: Product
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
  bigPrice?: boolean
}> = props => {
  const { product: { discountPrice } = {}, quantity, bigPrice = false } = props

  const [displayPrice, setDisplayPrice] = useState<string>(() =>
    priceFromRaw(discountPrice, quantity),
  )

  useEffect(() => {
    setDisplayPrice(priceFromRaw(discountPrice, quantity))
  }, [discountPrice, quantity])

  return (
    <div className={classes.actions}>
      {displayPrice !== '' && (
        <div className={`${classes.price} ${bigPrice ? classes.bigPrice : ''}`}>
          <p>{displayPrice}</p>
        </div>
      )}
    </div>
  )
}
