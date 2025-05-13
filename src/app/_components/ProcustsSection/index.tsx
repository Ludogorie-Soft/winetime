'use client'

import React from 'react'
import Image from 'next/image'

import { Product } from '../../../payload/payload-types'
import ProductCard from '../Cards/ProductCard'
import { Gutter } from '../ui-components/Gutter'
import {
  CarouselContent,
  CarouselItem,
  CarouselStaitcNext,
  CarouselStaticPrevious,
  Carousel,
} from '../ui/carousel'

const ProductsSection = ({
  products,
  label,
  mainImageUrl,
  bannerImageUrl,
}: {
  products: Product[]
  label: string
  mainImageUrl?: string
  bannerImageUrl?: string
}) => {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="overflow-x-hidden">
      <Gutter>
        <div className="flex flex-col gap-6 md:gap-12">
          <div
            className={`relative w-full ${
              bannerImageUrl ? 'h-24 md:h-32 lg:h-56' : ''
            } rounded-md overflow-hidden`}
          >
            {bannerImageUrl && (
              <Image
                src={mainImageUrl || bannerImageUrl}
                alt="banner-image"
                fill
                style={{ objectFit: 'cover' }}
              />
            )}

            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div className="absolute inset-0 flex justify-center items-center gap-2 text-white">
              <h2 className="scroll-m-20 md:border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                {label}
              </h2>
            </div>
          </div>

          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent>
              {products?.map(product => (
                <CarouselItem key={product.id}>
                  <ProductCard key={product.id} product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-1 mt-2.5">
              <CarouselStaticPrevious />
              <CarouselStaitcNext />
            </div>
          </Carousel>
        </div>
      </Gutter>
    </section>
  )
}

export default ProductsSection
