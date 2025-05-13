import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Product as ProductType } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { ProductHero } from '../../../_heros/Product'
import { generateMeta } from '../../../_utilities/generateMeta'
import TransitonLayout from '../../../_components/TransitionLayout'
import { fetchRandomDiscountProducts, fetchRandomProducts } from '../../../_api/fetchRandomProducts'
import { Carousel, CarouselContent, CarouselItem } from '../../../_components/ui/carousel'
import ProductCard from '../../../_components/Cards/ProductCard'
import { Gutter } from '../../../_components/ui-components/Gutter'
import { BadgePercent, Grape } from 'lucide-react'

export const dynamic = 'force-dynamic'

function shuffleArray<T>(array: T[]): T[] {
  let currentIndex = array.length
  let randomIndex: number

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export default async function Product({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let product: ProductType | null = null
  let randomProducts: ProductType[] = []
  let randomDiscountProducts: ProductType[] = []

  try {
    product = await fetchDoc<ProductType>({
      collection: 'products',
      slug,
      draft: isDraftMode,
    })
    
    const categoryId = typeof product?.categories === 'object' && product?.categories !== null 
  ? product?.categories.id 
  : undefined;

    randomProducts = await fetchRandomProducts(categoryId)
    randomDiscountProducts = await fetchRandomDiscountProducts()
  } catch (error) {
    console.error(error)
  }

  if (!product) {
    notFound()
  }

  return (
    <TransitonLayout>
      <ProductHero product={product} />
      <div className="overflow-hidden">
        <Gutter>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full mt-10"
          >
            <div className="flex items-center p-6">
              <h3 className="text-3xl font-normal items-center p-2">Често купувани заедно</h3>
            </div>
            <CarouselContent>
              {randomProducts?.map(product => (
                <CarouselItem key={product.id}>
                  <ProductCard key={product.id} product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Gutter>

        <Gutter>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full mt-10"
          >
            <div className="flex items-center p-6">
              <h3 className="text-3xl font-normal items-center p-2">Не пропускай тези намаления</h3>
            </div>
            <CarouselContent>
              {randomDiscountProducts?.map(product => (
                <CarouselItem key={product.id}>
                  <ProductCard key={product.id} product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Gutter>
      </div>
    </TransitonLayout>
  )
}

export async function generateStaticParams() {
  try {
    const products = await fetchDocs<ProductType>('products')
    return products?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let product: ProductType | null = null

  try {
    product = await fetchDoc<ProductType>({
      collection: 'products',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta({ doc: product })
}
