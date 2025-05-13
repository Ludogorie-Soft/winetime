'use client'

import React from 'react'
import Image from 'next/image'

import { Media, Page } from '../../../payload/payload-types'
import RichText from '../../_components/ui-components/RichText'

import classes from './index.module.scss'
import Link from 'next/link'
import { useFilter } from '@/app/_providers/Filter'

export const CustomHero: React.FC<Page['hero']> = ({ richText, media, links, relationTo, categories, brands, sorts, regions, foods, spirts, tags }) => {
  const {
    setCategoryFilters,
    setBrandFilters,
    setRegionFilters,
    setFoodsFilters,
    setSortsFilters,
    setSpirtsFilters,
    setTagsFilters,
  } = useFilter()
  
  const extractIds = (items: any[] = []) => items.map(item => item.id);
  const categoryIds = extractIds(categories);
  const brandIds = extractIds(brands);
  const sortIds = extractIds(sorts);
  const regionIds = extractIds(regions);
  const foodIds = extractIds(foods);
  const spirtIds = extractIds(spirts);
  const tagIds = extractIds(tags);
  const heroMedia = media as Media;
  const mediaAlt = heroMedia.alt;
  const stringMedia = heroMedia.filename as string;
  const mediaUrl = `/media/${stringMedia}`;

  return (
    <section className={classes.hero}>
      <div className={classes.heroWrapper}>
        {mediaUrl && (
          <div className={classes.backgroundImage}>
            <Image
              src={mediaUrl}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              alt={mediaAlt}
              priority
            />
          </div>
        )}
        <div className={classes.heroTextBox}>
          <Link
            href={`/${relationTo}`}
            onClick={() => {
              setCategoryFilters(categoryIds);
              setSortsFilters(sortIds); 
              setBrandFilters(brandIds); 
              setRegionFilters(regionIds); 
              setFoodsFilters(foodIds); 
              setSpirtsFilters(spirtIds); 
              setTagsFilters(tagIds);
            }}
          >
            <RichText content={richText} />
          </Link>
          {/* {Array.isArray(links) && links.length > 0 && (
            <ul className={classes.links}>
              {links.map(({ link }, i) => (
                <li key={i}>
                  <FilterButtonWrapper>
                    <CMSLink {...link} />
                  </FilterButtonWrapper>
                </li>
              ))}
            </ul>
          )} */}
        </div>
      </div>
    </section>
  )
}
