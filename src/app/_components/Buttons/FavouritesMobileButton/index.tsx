'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { useFavourites } from '../../../_providers/Favourites'

import classes from './index.module.scss'

export const FavouritesLinkMobile: React.FC<{
  className?: string
}> = props => {
  const { className } = props
  const { favourites } = useFavourites()
  const [length, setLength] = useState<number>()

  useEffect(() => {
    setLength(favourites?.items?.length || 0)
  }, [favourites])

  return (
    <Link
      className={[classes.favouritesLink, className].filter(Boolean).join(' ')}
      href="/favourites"
    >
      <MdOutlineFavoriteBorder
        className={classes.heartIcon}
        style={{ width: '26px', height: '26px', marginTop: '2px' }}
      />
      {typeof length === 'number' && length > 0 && (
        <span className={classes.quantityBadge}>{length}</span>
      )}
    </Link>
  )
}
