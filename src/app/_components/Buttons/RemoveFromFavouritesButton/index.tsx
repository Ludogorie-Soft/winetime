import React from 'react'
import Image from 'next/image'

import { Product } from '../../../../payload/payload-types'
import { useFavourites } from '../../../_providers/Favourites'
import { toast } from 'sonner'

import classes from './index.module.scss'

export const RemoveFromFavouritesButton: React.FC<{
  className?: string
  product: Product
}> = props => {
  const { className, product } = props

  const { deleteItemFromFavourites, isProductInFavourites } = useFavourites()

  const productIsInFavourites = isProductInFavourites(product)

  if (!productIsInFavourites) {
    return <div>Item is not in the favourites</div>
  }

  return (
    <button
      type="button"
      onClick={() => {
        deleteItemFromFavourites(product)
        toast.warning('Продуктът е премахнат.', { duration: 1200 })
      }}
      className={[className, classes.removeFromFavouritesButton].filter(Boolean).join(' ')}
    >
      <Image
        src="/assets/icons/delete.svg"
        alt="delete"
        width={24}
        height={24}
        className={classes.qtnBt}
      />
    </button>
  )
}
