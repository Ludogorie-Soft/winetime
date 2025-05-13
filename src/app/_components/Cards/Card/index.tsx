'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Product, Media } from '../../../../payload/payload-types'
import { Price } from '../../Price'
import { AddToFavouritesButton } from '../../Buttons/AddToFavouritesButton'

import classes from './index.module.scss'
import { DiscountPrice } from '../../DiscountPrice'
import { calculateDiscount } from '../../../_utilities/calculateDiscount'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip'
import { LuGrape } from 'react-icons/lu'

const priceFromJSON = (priceJSON): string => {
  let price = ''

  if (priceJSON) {
    try {
      const parsed = JSON.parse(priceJSON)?.data[0]
      const priceValue = parsed.unit_amount
      const priceType = parsed.type
      price = `${parsed.currency === 'usd' ? '$' : ''}${(priceValue / 100).toFixed(2)}`
      if (priceType === 'recurring') {
        price += `/${
          parsed.recurring.interval_count > 1
            ? `${parsed.recurring.interval_count} ${parsed.recurring.interval}`
            : parsed.recurring.interval
        }`
      }
    } catch (e) {
      console.error(`Cannot parse priceJSON`) // eslint-disable-line no-console
    }
  }

  return price
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  showCategories?: boolean
  hideImagesOnMobile?: boolean
  title?: string
  relationTo?: 'products'
  doc?: Product
}> = props => {
  const {
    showCategories,
    title: titleFromProps,
    doc,
    doc: { slug, title, categories, meta, priceJSON, isBio } = {},
    className,
  } = props

  const { description } = meta || {}

  const testImage = meta.image as Media
  const metaImage = testImage.filename as string
  const mediaAlt = testImage.alt
  const imagePath = `/media/${metaImage}`

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/products/${slug}`

  const discountPercentage =
    doc.price && doc.discountPrice ? calculateDiscount(doc.price, doc.discountPrice) : 0

  const [
    price, // eslint-disable-line no-unused-vars
    setPrice,
  ] = useState(() => priceFromJSON(priceJSON))

  useEffect(() => {
    setPrice(priceFromJSON(priceJSON))
  }, [priceJSON])

  return (
    <div className={classes.cardWrapper}>
      <Link href={href} className={[classes.card, className].filter(Boolean).join(' ')}>
        <div className={classes.mediaWrapper}>
          {!metaImage && <div className={classes.placeholder}>No image</div>}
          {imagePath && (
            <>
              <Image
                src={imagePath}
                alt={mediaAlt}
                fill
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                placeholder="blur"
                blurDataURL={'/icons/placeholder.svg'}
                loading="lazy"
              />

              {doc.isChosen && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="absolute bottom-[80px] left-[12px]">
                        <Image src="/wine-icon.svg" alt="Bio" width={70} height={70} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Winetime препоръчва</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {doc.isHomemade && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="absolute bottom-[44px] left-[12px]">
                        <LuGrape style={{ width: '28px', height: '28px', color: 'purple' }} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Занаятчийски продукт</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {doc.isBio && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <div className="absolute bottom-[8px] left-[8px]">
                        <Image src="/assets/icons/bio.svg" alt="Bio" width={35} height={35} />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Био Продукт</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {discountPercentage > 0 && (
                <div className="absolute bottom-[8px] right-[8px] bg-red-500 text-white text-md px-3 rounded-md">
                  -{discountPercentage}%
                </div>
              )}
            </>
          )}
        </div>

        <div className={classes.content}>
          {doc.brands && (
            <h4 className="max-w-full uppercase bg-white text-left m-0 text-xs text-blue-500 font-semibold whitespace-nowrap overflow-hidden truncate">
              {(doc.brands as any).title}
            </h4>
          )}
          {titleToUse && <h4 className={classes.title}>{titleToUse}</h4>}
          {description && (
            <div className={classes.body}>
              {description && <p className={classes.description}>{sanitizedDescription}</p>}
            </div>
          )}
          {doc && doc.discountPrice ? (
            <div className="flex gap-1 items-center justify-start">
              <div className="line-through text-gray-500">
                <Price product={doc} button={false} />
              </div>
              <DiscountPrice product={doc} button={false} />
            </div>
          ) : (
            <Price product={doc} button={false} /> 
          )}
        </div>
      </Link>
      <div className={classes.favouritesButton}>
        <AddToFavouritesButton product={doc} />
      </div>
    </div>
  )
}
