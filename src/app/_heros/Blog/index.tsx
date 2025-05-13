'use client'

import React from 'react'
import { Blog, Media } from '../../../payload/payload-types'
import { Gutter } from '../../_components/ui-components/Gutter'
import Image from 'next/image'
import RichText from '../../_components/ui-components/RichText'

export const BlogHero: React.FC<{ blog: Blog }> = ({ blog }) => {
  const { title, media, meta } = blog

  const blogRichText = blog && (blog as any).richText

  const testImage = meta?.image as Media
  const metaImagePath = meta && meta.image ? `/media/${testImage.filename as string}` : null

  const allImagesPaths =
    media && Array.isArray(media)
      ? media
          .filter((m: any) => m?.upload?.filename)
          .map((m: any) => `/media/${m.upload.filename as any}`)
      : []

  return (
    <Gutter>
      <article className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {title && (
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">{title}</h1>
        )}

        {metaImagePath && (
          <div className="mb-8 flex justify-center">
            <Image
              src={metaImagePath}
              alt={title || 'Featured image'}
              width={1200}
              height={600}
              className="rounded-lg shadow-lg"
              style={{
                height: 'auto',
                maxHeight: '600px',
                width: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>
        )}

        {blogRichText && (
          <div className="prose prose-lg max-w-none mb-12">
            <RichText content={blogRichText} />
          </div>
        )}

        {allImagesPaths.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {allImagesPaths.map((imagePath, index) => (
                <div
                  key={index}
                  className="aspect-square relative overflow-hidden rounded-lg shadow-md"
                >
                  <Image
                    src={imagePath}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </Gutter>
  )
}
