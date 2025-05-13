'use client'

import React, { useEffect, useState } from 'react'

import { Product } from '../../../../payload/payload-types'
import { useFavourites } from '../../../_providers/Favourites'
import { ButtonStopPagination, ButtonStopPaginationProps } from '../ButtonStopPagination'
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'
import { toast } from 'sonner'

import classes from './index.module.scss'

export const AddToFavouritesButton: React.FC<{
  product: Product
  className?: string
  appearance?: ButtonStopPaginationProps['appearance']
}> = props => {
  const { product, className, appearance = 'primary' } = props

  const {
    favourites,
    addItemToFavourites,
    deleteItemFromFavourites,
    isProductInFavourites,
    hasInitializedFavourites,
  } = useFavourites()

  const [isInFavourites, setIsInFavourites] = useState<boolean>()

  useEffect(() => {
    setIsInFavourites(isProductInFavourites(product))
  }, [isProductInFavourites, product, favourites])

  const handleClick = (event: any) => {
    event.stopPropagation()
    event.preventDefault()

    if (!isInFavourites) {
      addItemToFavourites({ product })
      toast.success('Продуктът е добавен в любими.', { duration: 1200 })
    } else {
      deleteItemFromFavourites(product)
      toast.warning('Продуктът е премахнат от любими.', { duration: 1200 })
    }
  }

  return (
    <ButtonStopPagination
      label={
        isInFavourites ? (
          <MdOutlineFavorite style={{ color: 'red' }} />
        ) : (
          <MdOutlineFavoriteBorder style={{ color: 'red' }} />
        )
      }
      el={isInFavourites ? 'link' : undefined}
      appearance={'default'}
      className={[
        className,
        classes.addToFavouritesButton,
        appearance === 'default' && isInFavourites && classes.green,
        !hasInitializedFavourites && classes.hidden,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={handleClick}
    />
  )
}
