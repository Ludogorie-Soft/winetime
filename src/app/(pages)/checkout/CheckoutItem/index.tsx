import Link from 'next/link'
import Image from 'next/image'

import { Media } from '../../../../payload/payload-types'
import { Price } from '../../../_components/Price'

import classes from './index.module.scss'
import { DiscountPrice } from '../../../_components/DiscountPrice'

export const CheckoutItem = ({ product, title, quantity, index }) => {
  const testImage = product.meta.image as Media
  const metaImage = testImage.filename as string
  const imagePath = `/media/${metaImage}`

  return (
    <li className={classes.item} key={index}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No image</span>}
        {metaImage && (
          <Image
            src={imagePath}
            alt={product.title}
            fill
            style={{ objectFit: 'contain', objectPosition: 'cover' }}
            placeholder="blur"
            blurDataURL={'assets/icons/placeholder.svg'}
            loading="lazy"
          />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title}</h6>
          {product.discountPrice ? (
            <div className="flex flex-col md:flex-row gap-2 items-start sm:items-center justify-start">
              <div className="line-through text-gray-500">
                <Price product={product} button={false} />
              </div>
              <DiscountPrice product={product} button={false} />
            </div>
          ) : (
            <Price product={product} button={false} />
          )}
        </div>
        <p className={classes.quantity}>x{quantity}</p>
      </div>

      <div className={classes.subtotal}>
        {product.discountPrice ? (
          <DiscountPrice product={product} button={false} quantity={quantity} />
        ) : (
          <Price product={product} button={false} quantity={quantity} />
        )}
      </div>
    </li>
  )
}
