'use client'

import React, { Fragment } from 'react'
import Link from 'next/link'

import { Page, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Buttons/Button'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import CartItem from '../CartItem'

import classes from './index.module.scss'

export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { user } = useAuth()

  const { cart, cartIsEmpty, addItemToCart, cartTotal, hasInitializedCart } = useCart()

  return (
    <Fragment>
      <br />
      {!hasInitializedCart ? (
        <div className={classes.loading}>
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {cartIsEmpty ? (
            <div className={classes.empty}>
              Количката е празна.
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  {' '}
                  <Link
                    href={`/${productsPage.slug}`}
                    style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                  >
                    Натисни тук
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
                  {` за да видите любими вашата количка.`}
                </Fragment>
              )}
            </div>
          ) : (
            <div className={classes.cartWrapper}>
              <div>
                <div className={classes.header}>
                  <p>Продукти</p>
                  <div className={classes.headerItemDetails}>
                    <p></p>
                    <p></p>
                    <p>Количество</p>
                  </div>
                  <p className={classes.headersubtotal}>Цена</p>
                </div>
                <ul className={classes.itemsList}>
                  {cart?.items?.map((item, index) => {
                    if (typeof item.product === 'object') {
                      const {
                        quantity,
                        product,
                        product: { id, title, meta, stripeProductID },
                      } = item

                      const isLast = index === (cart?.items?.length || 0) - 1

                      return (
                        <CartItem
                          product={product}
                          title={title}
                          qty={quantity}
                          addItemToCart={addItemToCart}
                        />
                      )
                    }
                    return null
                  })}
                </ul>
              </div>

              <div className={classes.summary}>
                <div className={classes.row}>
                  <p className={classes.cartTotal}>Крайна Цена</p>
                  <p className={classes.cartTotal}>{cartTotal.formatted}</p>
                </div>

                <Button
                  className={classes.checkoutButton}
                  href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                  label={user ? 'Поръчка' : 'Влез за да поръчаш'}
                  appearance="primary"
                />

                {!user && <p className="text-center">или</p>}

                {!user && (
                  <div className="w-full">
                    <Button
                      className="w-full"
                      href="/quick-checkout"
                      label="Бърза Поръчка"
                      appearance="secondary"
                    />
                    <p className="text-center mt-0">(ние ще се свържен с вас)</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
