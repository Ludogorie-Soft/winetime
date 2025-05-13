'use client'

import React from 'react'
import Image from 'next/image'

import { useFilter } from '../../../_providers/Filter'
import { WobbleCard } from '../../ui/wobble-cards'
import { Gutter } from '../../ui-components/Gutter'
import Link from 'next/link'

export function WobbleCardsHero() {
  const {
    setCategoryFilters,
    setSpirtsFilters,
    setBrandFilters,
    setRegionFilters,
    setSortsFilters,
    setFoodsFilters,
  } = useFilter()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-full mx-auto w-full px-12">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        backgroundImageSrc={'/assets/banner-images/rose_banner.jpg'}
      >
        <Link
          href="/products"
          onClick={() => {
            setCategoryFilters(['65773a76e38ca9d680c6f8d6'])
            setSpirtsFilters([])
            setBrandFilters([])
            setRegionFilters([])
            setSortsFilters([])
            setFoodsFilters([])
          }}
        >
          <div className="max-w-xs">
            <h2 className="text-center text-balance text-3xl md:text-5xl font-semibold tracking-[-0.015em] text-white drop-shadow-lg">
              РОЗЕ
            </h2>
            <p className="mt-4 text-center text-lg text-white drop-shadow-lg">
              ПРЕЗ ЦЯЛАТА ГОДИНА.
            </p>
          </div>
        </Link>
      </WobbleCard>

      <WobbleCard
        containerClassName="col-span-1 min-h-[300px] bg-yellow-500 contrast-75"
        backgroundImageSrc={'/assets/banner-images/jefferson.jpg'}
      >
        <Link
          href="/products"
          onClick={() => {
            setCategoryFilters([])
            setSpirtsFilters(['666b2977845f6d085bfec272'])
            setBrandFilters([])
            setRegionFilters([])
            setSortsFilters([])
            setFoodsFilters([])
          }}
        >
          <div className="max-w-sm">
            <h2 className="max-w-80 text-center text-balance text-3xl md:text-5xl font-semibold tracking-[-0.015em] text-white drop-shadow-lg capitalize">
              ЛИКЬОР
            </h2>
            <p className="mt-4 max-w-[26rem] text-center text-lg text-neutral-200 drop-shadow-lg">
              111 БИЛКИ И МНОГО ДРУГИ
            </p>
          </div>
        </Link>
      </WobbleCard>
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]"
        backgroundImageSrc={'/assets/banner-images/Gin.jpg'}
      >
        <Link
          href="/products"
          onClick={() => {
            setCategoryFilters([])
            setSpirtsFilters(['665f59aea2cd09d8a2babbc6'])
            setBrandFilters([])
            setRegionFilters([])
            setSortsFilters([])
            setFoodsFilters([])
          }}
        >
          <div className="max-w-sm">
            <h2 className="max-w-sm md:max-w-lg text-center text-balance text-2xl md:text-4xl font-semibold tracking-[-0.015em] text-white drop-shadow-lg">
              ИЗСЛЕДВАЙТЕ СВЕТА НА ДЖИНА
            </h2>
            <p className="mt-4 max-w-[26rem] text-center text-md text-white drop-shadow-lg">
              ОТ ИТАЛИАНСКИ ЕСЕНЦИИ НА БОСИЛЕК ДО СМЕЛИ ЩРИХИ НА КАФЕ И ПИПЕР. ВСЯКА ГЛЪТКА, А
              ПЪТУВАНЕ НА УНИКАЛНИ ВКУСОВЕ!"
            </p>
          </div>
        </Link>
      </WobbleCard>
      <WobbleCard
        containerClassName="col-span-1 min-h-[300px] bg-yellow-500 "
        backgroundImageSrc={'/assets/banner-images/Bio.jpg'}
      >
        <Link href="/bio">
          <div className="max-w-sm">
            <h2 className="max-w-80 text-center text-balance text-3xl md:text-5xl font-semibold tracking-[-0.015em] text-white drop-shadow-lg">
              БИО
            </h2>
            <p className="mt-4 max-w-[26rem] text-center text-lg text-neutral-200 drop-shadow-lg">
              ГЛЪТКА СЛЕД ГЛЪТКА
            </p>
          </div>
        </Link>
      </WobbleCard>
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        backgroundImageSrc={'/assets/banner-images/Cocktail.jpg'}
      >
        <Link
          href="/products"
          onClick={() => {
            setCategoryFilters([])
            setSpirtsFilters([
              '66c88762fa1af91c75533632',
              '66c88458fa1af91c75533014',
              '66c8835efa1af91c75532e49',
              '66c87e53fa1af91c755326d0',
              '66c83904fa1af91c7552e4ba',
              '66c831adfa1af91c7552dd4f',
              '666b2977845f6d085bfec272',
              '665f59aea2cd09d8a2babbc6',
            ])
            setBrandFilters([])
            setRegionFilters([])
            setSortsFilters([])
            setFoodsFilters([])
          }}
        >
          <div className="max-w-xs">
            <h2 className="text-center text-balance text-xl md:text-2xl font-semibold tracking-[-0.015em] text-white drop-shadow-lg">
              НАЙ-ДОБРИТЕ ЛИКЬОРИ ЗА КОКТЕЙЛИ СЪЗДАВАЙТЕ НЕУСТОИМИ МИКСОВЕ С УНИКАЛЕН ВКУС!"
            </h2>
            <p className="mt-4 text-center text-lg text-neutral-200 drop-shadow-lg"></p>
          </div>
        </Link>
      </WobbleCard>
    </div>
  )
}
