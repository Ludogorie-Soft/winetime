import React from 'react'
import { InfiniteMovingCards } from '../../ui/infinite-moving-cards'

const BrandsBanner = () => {
  const brandsData = [
    {
      name: 'Иновативни ',
    },
    {
      name: 'Качествени',
    },
    {
      name: 'Креативни',
    },
    {
      name: 'Практични',
    },
    {
      name: 'Ефективни',
    },
    {
      name: 'Модерни',
    },
  ]

  return (
    <section className="h-[100px] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={brandsData} direction="right" speed="slow" />
    </section>
  )
}

export default BrandsBanner
