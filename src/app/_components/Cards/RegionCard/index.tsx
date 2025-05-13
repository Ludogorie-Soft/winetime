'use client'

import React from 'react'
import Link from 'next/link'

import { Region, Media } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

type RegionCardProps = {
  region: Region
}

const RegionCard = ({ region }: RegionCardProps) => {
  const media = region.media as Media
  const {
    setCategoryFilters,
    setSpirtsFilters,
    setBrandFilters,
    setRegionFilters,
    setSortsFilters,
    setFoodsFilters,
  } = useFilter()

  return (
    <Link
      href="/products"
      className={`${classes.card} transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl`}
      style={{ backgroundImage: `url(${media.url})` }}
      onClick={() => {
        setCategoryFilters([])
        setSpirtsFilters([])
        setBrandFilters([])
        setRegionFilters([region.id])
        setSortsFilters([])
        setFoodsFilters([])
      }}
    >
      <p className="text-center text-2xl text-white ">{region.title}</p>
    </Link>
  )
}

export default RegionCard
