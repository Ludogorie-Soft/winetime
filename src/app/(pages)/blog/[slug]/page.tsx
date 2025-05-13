import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Blog as BlogType, Product as ProductType } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { BlogHero } from '../../../_heros/Blog'
import { generateMeta } from '../../../_utilities/generateMeta'
import TransitonLayout from '../../../_components/TransitionLayout'
import { Carousel, CarouselContent, CarouselItem } from '../../../_components/ui/carousel'
import ProductCard from '../../../_components/Cards/ProductCard'
import { Gutter } from '../../../_components/ui-components/Gutter'

export const dynamic = 'force-dynamic'
export default async function Blog({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let blog: BlogType | null = null

  try {
    blog = await fetchDoc<BlogType>({
      collection: 'blog',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.error(error)
  }

  if (!blog) {
    notFound()
  }

  return (
    <TransitonLayout>
      <BlogHero blog={blog} />
      <div className="overflow-hidden">
        <Gutter>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full mt-10"
          >
            <div className="flex items-center p-6">
              <h3 className="text-3xl font-normal items-center p-2">{blog.relatedProductsText ? blog.relatedProductsText : ''}</h3>
            </div>
            <CarouselContent>
              {blog.relatedProducts?.map(product => (
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
    const blogs = await fetchDocs<BlogType>('blog')
    return blogs?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let blog: BlogType | null = null

  try {
    blog = await fetchDoc<BlogType>({
      collection: 'blog',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta({ doc: blog })
}
