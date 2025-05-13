'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Product } from '../../../../payload/payload-types'
import { useCart } from '../../../_providers/Cart'
import { Button, Props } from '../Button'
import { toast } from 'sonner'

import classes from './index.module.scss'

export const AddToCartButton: React.FC<{
  product: Product
  quantity?: number
  className?: string
  appearance?: Props['appearance']
}> = props => {
  const { product, quantity = 1, className, appearance = 'primary' } = props

  const { cart, addItemToCart, isProductInCart, hasInitializedCart } = useCart()

  const [isInCart, setIsInCart] = useState<boolean>()
  const router = useRouter()

  useEffect(() => {
    setIsInCart(isProductInCart(product))
  }, [isProductInCart, product, cart])

  return (
    <Button
      href={isInCart ? '/cart' : undefined}
      type={!isInCart ? 'button' : undefined}
      label={isInCart ? `✓ Количка` : `Добави`}
      el={isInCart ? 'link' : undefined}
      appearance={appearance}
      className={[
        className,
        classes.addToCartButton,
        appearance === 'default' && isInCart && classes.green,
        !hasInitializedCart && classes.hidden,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={
        !isInCart
          ? () => {
              addItemToCart({
                product,
                quantity,
              })
              toast.success('Продуктът е добавен в количка.', { duration: 1200 })
            }
          : undefined
      }
    />
  )
}
