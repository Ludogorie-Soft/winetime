'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'

import { Page, Settings } from '../../../../payload/payload-types'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { useAuth } from '../../../_providers/Auth'
import { useFavourites } from '../../../_providers/Favourites'

import classes from './index.module.scss'
import FavouriteItem from '../FavouriteItem'

export const FavouritesPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { user } = useAuth()

  const { favourites, favouritesIsEmpty, hasInitializedFavourites } = useFavourites()

  return (
    <Fragment>
      <br />
      {!hasInitializedFavourites ? (
        <div className={classes.loading}>
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {favouritesIsEmpty ? (
            <div className={classes.empty}>
              Нямате запазени продукти.
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  {' '}
                  <Link
                    href={`/${productsPage.slug}`}
                    style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                  >
                    Натиснете тук
                  </Link>
                  {` за да продължите пазаруване.`}
                </Fragment>
              )}
              {!user && (
                <Fragment>
                  {' '}
                  <Link
                    href={`/login?redirect=%2Fcart`}
                    style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                  >
                    Впиши се
                  </Link>
                  {` за да видите любими продукти.`}
                </Fragment>
              )}
            </div>
          ) : (
            <div className={classes.favouriteWrapper}>
              {favourites?.items?.map((item, index) => {
                if (typeof item.product === 'object') {
                  const {
                    product,
                    product: { id, title, meta },
                  } = item

                  const isLast = index === (favourites?.items?.length || 0) - 1

                  const metaImage = meta?.image

                  return <FavouriteItem product={product} title={title} />
                }
                return null
              })}
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
