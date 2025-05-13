'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { useCart } from '../../../_providers/Cart'
import { HiOutlineShoppingBag } from 'react-icons/hi'

import classes from './index.module.scss'

export const CartLinkMobile: React.FC<{
  className?: string
}> = props => {
  const { className } = props
  const { cart } = useCart()
  const [length, setLength] = useState<number>()

  useEffect(() => {
    setLength(cart?.items?.length || 0)
  }, [cart])

  return (
    <Link className={[classes.cartLink, className].filter(Boolean).join(' ')} href="/cart">
      <div className={classes.imageContainer}>
        <div className={classes.swing}>
          <HiOutlineShoppingBag style={{ width: '28px', height: '28px', paddingBottom: '2px' }} />
        </div>
        {typeof length === 'number' && length > 0 && (
          <span className={classes.quantityBadge}>{length}</span>
        )}
      </div>
    </Link>
  )
}
