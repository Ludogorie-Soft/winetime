'use client'

import React from 'react'
import Link from 'next/link'
import { Brand, Media } from '../../../../payload/payload-types'

import classes from './index.module.scss'

type BrandCardProps = {
  brand: Brand
}

const BrandCard = ({ brand }: BrandCardProps) => {
  const media = brand.media as Media
  const href = `/brands/${brand.id}`

  const backgroundStyle = media && media.url ? { backgroundImage: `url(${media.url})` } : {}

  return (
    <Link href={href}>
      <div
        className={`${classes.card} transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl bg-gray-400 h-14 w-14`}
        style={backgroundStyle}
      ></div>
      <p
        className={`text-center text-lg text-black whitespace-normal overflow-hidden h-12 max-w-[150px]`}
      >
        {brand.title}
      </p>
    </Link>
  )
}

export default BrandCard
