'use client'

import React from 'react'
import Link from 'next/link'

import { Food, Media } from '../../../../payload/payload-types'

import classes from './index.module.scss'
import { useFilter } from '../../../_providers/Filter'

type FoodCardProps = {
  food: Food
}

const FoodCard = ({ food }: FoodCardProps) => {
  const media = food.media as Media

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
      onClick={() => {
        setCategoryFilters([])
        setSpirtsFilters([])
        setBrandFilters([])
        setRegionFilters([])
        setSortsFilters([])
        setFoodsFilters([food.id])
      }}
    >
      <div
        className={`${classes.card} transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-xl`}
        style={{ backgroundImage: `url(${media.url})` }}
      ></div>
      <p
        className={`text-center text-lg text-black whitespace-normal overflow-hidden h-12 max-w-[150px]`}
      >
        {food.title}
      </p>
    </Link>
  )
}

export default FoodCard
