import React from 'react'
import { notFound } from 'next/navigation'
import { Brand, Media, Product as ProductType } from '../../../../payload/payload-types'
import Image from 'next/image'
import TransitonLayout from '../../../_components/TransitionLayout'
import { fetchBrandById } from '@/app/_api/fetchBrandById'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/_components/ui/card'
import RichText from '@/app/_components/ui-components/RichText'
import LinkFilter from '@/app/_components/ui/linkFilter'

export default async function BrandPage({ params: { id } }) {
  let brand: Brand | null = null

  try {
    brand = await fetchBrandById({ id })
  } catch (error) {
    console.error(error)
  }

  if (!brand) {
    notFound()
  }
  
  const heroMedia = brand.media as Media;
  const mediaAlt = heroMedia.alt;
  const stringMedia = heroMedia.filename as string;
  const mediaUrl = `/media/${stringMedia}`;

  return (
    <TransitonLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 flex flex-col items-center justify-center gap-2">
          <Image
            src={mediaUrl}
            alt={mediaAlt}
            width="600"
            height="300"
            style={{ objectFit: 'cover' }}
            className="rounded-lg h-64 md:h-96"
          />
          <h1 className="text-4xl font-bold mb-4">{brand.title}</h1>

          <LinkFilter id={brand.id} />
        </header>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Повече за марката</CardTitle>
          </CardHeader>
          <CardContent>
            <RichText content={(brand as any).richText} />
          </CardContent>
        </Card>
      </div>
    </TransitonLayout>
  )
}
