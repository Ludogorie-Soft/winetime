import React, { Fragment } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Order as OrderType, Media } from '../../../../../payload/payload-types'
import { HR } from '../../../../_components/ui-components/HR'
import { Price } from '../../../../_components/Price'
import { formatDateTime } from '../../../../_utilities/formatDateTime'
import { getMeUser } from '../../../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../../../_utilities/mergeOpenGraph'

import classes from './index.module.scss'

export default async function Order({ params: { id } }) {
  const { token } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'Трабва да сте вписан за да видите поръчката.',
    )}&redirect=${encodeURIComponent(`/account/order/${id}`)}`,
  })

  let order: OrderType | null = null

  try {
    order = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${token}`,
      },
    })?.then(async res => {
      if (!res.ok) notFound()
      const json = await res.json()
      if ('error' in json && json.error) notFound()
      if ('errors' in json && json.errors) notFound()
      return json
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!order) {
    notFound()
  }

  return (
    <div>
      <h5>{`Поръчка`}</h5>
      <div className={classes.itemMeta}>
        <p>{`Номер на поръчка: ${order.id}`}</p>
        {/* <p>{`Payment Intent: ${order.stripePaymentIntentID}`}</p> */}
        <p>{`Поръчана На: ${formatDateTime(order.createdAt)}`}</p>
        <p className={classes.total}>
          {'Сума: '}
          {new Intl.NumberFormat('bg-BG', {
            style: 'currency',
            currency: 'BGN',
          }).format(order.total)}
        </p>
      </div>

      <div className={classes.order}>
        {order.items?.map((item, index) => {
          if (typeof item.product === 'object') {
            const {
              quantity,
              product,
              product: { id, title, meta, stripeProductID },
            } = item

            const testImage = product.meta.image as Media
            const metaImage = testImage.filename as string
            const imagePath = `/media/${metaImage}`

            return (
              <Fragment key={index}>
                <div className={classes.row}>
                  <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
                    {!metaImage && <span className={classes.placeholder}>No image</span>}
                    {metaImage && (
                      <Image
                        src={imagePath}
                        alt={product.title}
                        fill
                        style={{ objectFit: 'contain', objectPosition: 'center' }}
                        objectPosition="center"
                        placeholder="blur"
                        blurDataURL={'assets/icons/placeholder.svg'}
                        loading="lazy"
                      />
                    )}
                  </Link>
                  <div className={classes.rowContent}>
                    {/* {!stripeProductID && (
                      <p className={classes.warning}>
                        {'This product is not yet connected to Stripe. To link this product, '}
                        <Link
                          href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/products/${id}`}
                        >
                          edit this product in the admin panel
                        </Link>
                        {'.'}
                      </p>
                    )} */}
                    <h6 className={classes.title}>
                      <Link href={`/products/${product.slug}`} className={classes.titleLink}>
                        {title}
                      </Link>
                    </h6>
                    <p>{`Количество: ${quantity}`}</p>
                    <Price product={product} button={false} quantity={quantity} />
                  </div>
                </div>
              </Fragment>
            )
          }

          return null
        })}
      </div>
      <HR className={classes.hr} />
    </div>
  )
}

export async function generateMetadata({ params: { id } }): Promise<Metadata> {
  return {
    title: `Order ${id}`,
    description: `Order details for order ${id}.`,
    openGraph: mergeOpenGraph({
      title: `Order ${id}`,
      url: `/orders/${id}`,
    }),
  }
}
