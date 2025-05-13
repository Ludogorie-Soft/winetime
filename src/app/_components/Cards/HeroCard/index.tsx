'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Media, Product } from '../../../../payload/payload-types'
import { AddToFavouritesButton } from '../../Buttons/AddToFavouritesButton'
import { Price } from '../../Price'
import { DiscountPrice } from '../../DiscountPrice'
import { calculateDiscount } from '../../../_utilities/calculateDiscount'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip'
import { LuGrape } from 'react-icons/lu'
import { useFilter } from '../../../_providers/Filter'

type HeroCardProps = {
  product: Product
}

const HeroCard = ({ product }: HeroCardProps) => {
  const {
    setCategoryFilters,
    setSpirtsFilters,
    setBrandFilters,
    setRegionFilters,
    setSortsFilters,
    setFoodsFilters,
  } = useFilter()

  const testImage = product.meta.image as Media
  const metaImage = testImage.filename as string

  const discountPercentage =
    product.price && product.discountPrice
      ? calculateDiscount(product.price, product.discountPrice)
      : 0

  return (
    <div className="w-full relative h-64 shadow-lg shadow-gray-200 border-2 rounded border-gray-200">
      <div className="absolute z-10 right-0 top-[3.3%] mid:top-[4%]">
        <AddToFavouritesButton product={product} />
      </div>
      <Link
        href={`/products/${product.slug}`}
        className="relative h-56 w-full flex flex-col items-center justify-center cursor-pointer"
      >
        <div className="relative w-full min-h-56 flex items-center justify-center p-4">
          {metaImage ? (
            <>
              {/* <Image
                src={`/media/${metaImage}`}
                alt={product.title}
                fill
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                placeholder="blur"
                blurDataURL={'/icons/placeholder.svg'}
                loading="lazy"
              /> */}
              <div style={{ width: '80%', height: '80%' }}>
                <Image
                  src={`/media/${metaImage}`}
                  alt={product.title}
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'center', paddingTop: '3rem' }}
                  placeholder="blur"
                  blurDataURL={'/icons/placeholder.svg'}
                  loading="lazy"
                />
              </div>
              {product.isChosen && (
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

              {product.isHomemade && (
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

              {product.isBio && (
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
          ) : (
            <div>No image</div>
          )}
        </div>

        <div className="w-full flex flex-col gap-1 items-start p-2">
          <div className="w-full flex flex-col items-start justify-center mt-1">
            {product.brands && (
              <Link href={`/brands/${(product?.brands as any)?.id}`} >
                <h4 className="max-w-full uppercase text-left m-0 text-[12px] text-blue-500 font-semibold whitespace-nowrap overflow-hidden truncate">
                  {(product.brands as any).title}
                </h4>
              </Link>
            )}
            <h4 className="max-w-full uppercase text-left m-0 text-xs font-bold whitespace-nowrap overflow-hidden truncate">
              {product.title}
            </h4>
          </div>
          {product && (
            <div>
              {product.discountPrice ? (
                <div className="flex gap-1 items-center justify-start text-xs">
                  <div className="line-through text-gray-500">
                    <Price product={product} button={false} />
                  </div>
                  <DiscountPrice product={product} button={false} />
                </div>
              ) : (
                <div className="pb-2">
                  <Price product={product} button={false} />
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default HeroCard
