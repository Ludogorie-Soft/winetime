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
    console.error(`Cannot format price`)
  }

  return formattedPrice
}

export const Price: React.FC<{
  product: Product
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
  colored?: boolean
  bigPrice?: boolean
}> = props => {
  const { product: { price } = {}, quantity, colored = false, bigPrice = false } = props

  const [displayPrice, setDisplayPrice] = useState<string>(() => priceFromRaw(price, quantity))

  useEffect(() => {
    setDisplayPrice(priceFromRaw(price, quantity))
  }, [price, quantity])

  return (
    <div className={classes.actions}>
      {displayPrice !== '' && (
        <div
          className={`${classes.price} ${colored ? classes.colored : ''} ${
            bigPrice ? classes.bigPrice : ''
          }`}
        >
          <p>{displayPrice}</p>
        </div>
      )}
    </div>
  )
}
