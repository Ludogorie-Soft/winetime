'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Blog, Media } from '../../../../payload/payload-types'
import RichText from '../../ui-components/RichText'

type BlogCardProps = {
  blog: Blog
}

const BrandCard = ({ blog }: BlogCardProps) => {
  const mediaUrl = typeof blog?.meta?.image === 'object' && 'filename' in blog?.meta?.image 
    ? `/media/${(blog.meta.image as Media).filename}` 
    : '';

  return (
      <>
        <Link key={blog.id} href={`/blog/${blog.slug}`} className="group">
          <div className="relative h-72 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={mediaUrl}
              alt={blog.title}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000]/30 via-[#000]/10 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-all duration-300 ease-in-out group-hover:translate-y-[-2rem]">
                <h2 className="text-xl font-semibold text-white mb-2 transition-transform duration-300 ease-in-out group-hover:translate-y-[-0.5rem]">
                  {blog.title}
                </h2>
                <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out line-clamp-2">
                  <RichText content={blog && (blog as any).richText} />
                </p>
              </div>
            </div>
          </div>
        </Link>
    </>
  )
}

export default BrandCard
