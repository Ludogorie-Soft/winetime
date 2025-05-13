'use client'

import React, { useState, useEffect } from 'react'

import { Category } from '../../../payload/payload-types'
import CategoryCard from '../Cards/CategoryCard'
import { Gutter } from '../ui-components/Gutter'
import { CarouselContent, CarouselItem, Carousel } from '../ui/carousel'
import { TypographyH2 } from '../typography/typography-h2'

import classes from './index.module.scss'

const getRandomCategories = (categories: Category[], num: number) => {
  const shuffled = [...categories].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(num, categories.length))
}

const Categories = ({ categories }: { categories: Category[] }) => {
  if (!categories || categories.length === 0) {
    return null
  }

  const [isMidBreakOrSmaller, setIsMidBreakOrSmaller] = useState(false)
  const randomCategories = getRandomCategories(categories, 4)

  useEffect(() => {
    const checkBreakpoint = () => {
      setIsMidBreakOrSmaller(window.innerWidth <= 1440)
    }

    checkBreakpoint()

    window.addEventListener('resize', checkBreakpoint)

    return () => window.removeEventListener('resize', checkBreakpoint)
  }, [])

  return (
    <section className={classes.sectionContainer}>
      <Gutter>
        <div className={classes.container}>
          <div className={classes.titleWrapper}>
            <TypographyH2 text="Пазарувай по категории" />
          </div>

          {isMidBreakOrSmaller ? (
            <Carousel
              opts={{
                align: 'start',
              }}
              className="w-full"
            >
              <CarouselContent>
                {categories?.map(category => (
                  <CarouselItem key={category.id}>
                    <CategoryCard key={category.id} category={category} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className={classes.list}>
              {randomCategories
                ?.map(category => <CategoryCard key={category.title} category={category} />)
                .reverse()}
            </div>
          )}
        </div>
      </Gutter>
    </section>
  )
}

export default Categories
