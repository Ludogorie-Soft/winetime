'use client';

import React from 'react';
import CarouselSection from '../../_components/CarouselSection';
import { Media, Product, Category, Brand, Sort, Region, Food, Spirt } from '../../../payload/payload-types';

interface CarouselDoc {
  relationTo: string;
  value: Product;
}

interface CarouselData {
  categories?: string[];
  brands?: string[];
  sorts?: string[];
  regions?: string[];
  foods?: string[];
  spirts?: string[];
  tags?: string[];
}

export const TwoRowCarousel = ({
  name,
  media,
  reverse = false,
  firstCarousel,
  secondCarousel,
}: any) => {
  const mediaUrl =
    typeof media === 'string' ? media : media?.url || `/media/${media?.filename}`;

  const extractProducts = (docs?: CarouselDoc[]): Product[] => {
    if (!docs) return [];
    return docs
      .map(doc => {
        if (doc.value && typeof doc.value === 'object') {
          return doc.value;
        }
        return null;
      })
      .filter((product): product is Product => product !== null);
  };

  const extractIds = (arr?: any[]): string[] => {
    if (!arr) return [];
    const uniqueIds: string[] = [];
    const idSet = new Set();

    arr.forEach(item => {
      const id = typeof item === 'object' && item.id ? item.id : item;
      if (!idSet.has(id)) {
        idSet.add(id);
        uniqueIds.push(id);
      }
    });

    return uniqueIds;
  };

  const mergedCarouselData: CarouselData = {
    categories: extractIds([...firstCarousel.categories, ...secondCarousel.categories]),
    brands: extractIds([...firstCarousel.brands, ...secondCarousel.brands]),
    sorts: extractIds([...firstCarousel.sorts, ...secondCarousel.sorts]),
    regions: extractIds([...firstCarousel.regions, ...secondCarousel.regions]),
    foods: extractIds([...firstCarousel.foods, ...secondCarousel.foods]),
    spirts: extractIds([...firstCarousel.spirts, ...secondCarousel.spirts]),
    tags: extractIds([...firstCarousel.tags, ...secondCarousel.tags]),
  };

  const firstProducts = extractProducts(firstCarousel.populatedDocs);
  const secondProducts = extractProducts(secondCarousel.populatedDocs);

  return (
    <section className="two-row-carousel">
      <CarouselSection
        firstProducts={firstProducts}
        secondProducts={secondProducts}
        label={name || ''}
        mainImageUrl={mediaUrl}
        layoutDirection={reverse ? 'reverse' : ''}
        {...mergedCarouselData}
      />
    </section>
  );
};
