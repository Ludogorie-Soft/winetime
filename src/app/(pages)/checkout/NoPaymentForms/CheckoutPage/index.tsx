'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Settings } from '../../../../../payload/payload-types'
import { useAuth } from '../../../../_providers/Auth'
import { useCart } from '../../../../_providers/Cart'
import { CheckoutForm } from '../CheckoutForm'
import { CheckoutItem } from '../../CheckoutItem'
import { HR } from '../../../../_components/ui-components/HR'
import Image from 'next/image'

import classes from './index.module.scss'

export const CheckoutPage: React.FC<{
  settings: Settings
}> = props => {
  const {
    settings: { productsPage },
  } = props

  const { user } = useAuth()
  const router = useRouter()
  const { cart, cartIsEmpty, cartTotal, calculatedData, cartTotalFinal } = useCart()
  
  // Declare state variables and their setters
  const [isFetchingOffices, setIsFetchingOffices] = useState(false) 
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    if (user !== null && cartIsEmpty) {
      router.push('/cart')
    }
  }, [router, user, cartIsEmpty])

  if (!user) return null

  return (
    <Fragment>
      {cartIsEmpty && (
        <div>
          {'Твоята '}
          <Link href="/cart">количка</Link>
          {' е празна.'}
          {typeof productsPage === 'object' && productsPage?.slug && (
            <Fragment>
              {' '}
              <Link href={`/${productsPage.slug}`}>Продължи да пазаруваш?</Link>
            </Fragment>
          )}
        </div>
      )}
      {!cartIsEmpty && (
        <div className={classes.items}>
          <div className={classes.header}>
            <p>Продукти</p>
            <div className={classes.headerItemDetails}>
              <p></p>
              <p className={classes.quantity}>Количество</p>
            </div>
            <p className={classes.subtotal}>Цена</p>
          </div>

          <ul>
            {cart?.items?.map((item, index) => {
              if (typeof item.product === 'object') {
                const {
                  quantity,
                  product,
                  product: { title, meta },
                } = item

                if (!quantity) return null

                return (
                  <Fragment key={index}>
                    <CheckoutItem
                      product={product}
                      title={title}
                      quantity={quantity}
                      index={index}
                    />
                  </Fragment>
                )
              }
              return null
            })}
            <div className={classes.orderTotal}>
              <p>Цена</p>
              <p>{cartTotal.formatted}</p>
            </div>

            {/* Show Truck Icon while fetching offices or calculating price */}
            <div className={classes.orderTotal}>
              <p>Доставка</p>
              <p>
                {isFetchingOffices || isCalculating ? (
                  <Image src="/speedy_truck.svg" alt="Loading" width={40} height={40} />
                ) : (
                  calculatedData || '0'
                )}
              </p>
            </div>

            <div className={classes.orderTotal}>
              <p>Крайна Цена</p>
              <p>
                {isFetchingOffices || isCalculating ? (
                  <Image src="/speedy_truck.svg" alt="Loading" width={40} height={40} />
                ) : (
                  cartTotalFinal.formatted
                )}
              </p>
            </div>
          </ul>
        </div>
      )}

      <Fragment>
        <h3 className={classes.payment}>Детайли за поръчката</h3>
        <HR className={classes.paymentHr} />
        <CheckoutForm
          setIsFetchingOffices={setIsFetchingOffices}
          setIsCalculating={setIsCalculating}
          isFetchingOffices={isFetchingOffices}
          isCalculating={isCalculating}
        />
      </Fragment>
    </Fragment>
  )
}

export default CheckoutPage
