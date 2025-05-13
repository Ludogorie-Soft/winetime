'use client'

import React from 'react'
import Link from 'next/link'
import { useFilter } from '@/app/_providers/Filter'

const LinkFilter = ({ id }: { id: string }) => {
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
        setBrandFilters([id])
        setRegionFilters([])
        setSortsFilters([])
        setFoodsFilters([])
      }}
    >
      <h4 className="max-w-full uppercase text-left m-0 text-xl text-blue-500 font-semibold whitespace-nowrap overflow-hidden truncate">
        Виж Продукти
      </h4>
    </Link>
  )
}

export default LinkFilter
