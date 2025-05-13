'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '../../../payload/payload-types';
import { Gutter } from '../ui-components/Gutter';
import {
  CarouselContent,
  CarouselHeroNext,
  CarouselHeroPrevious,
  Carousel,
  CarouseHerolItem,
} from '../ui/carousel';
import HeroCard from '../Cards/HeroCard';
import { useFilter } from '@/app/_providers/Filter';
import Link from 'next/link';

interface CarouselSectionProps {
  firstProducts: Product[];
  secondProducts: Product[];
  label: string;
  mainImageUrl?: string;
  bannerImageUrl?: string;
  categories?: string[]; 
  brands?: string[];     
  sorts?: string[];      
  regions?: string[];    
  foods?: string[];      
  spirits?: string[];  
  tags?: string[];      
  layoutDirection?: 'reverse' | '';
}

const CarouselSection = ({
  firstProducts,
  secondProducts,
  label,
  mainImageUrl,
  bannerImageUrl,
  categories,
  brands,
  sorts,
  regions,
  foods,
  spirits,
  tags,
  layoutDirection,
}: CarouselSectionProps) => {
  if (!firstProducts || firstProducts.length === 0) {
    return null;
  }

  const {
    setCategoryFilters,
    setBrandFilters,
    setRegionFilters,
    setFoodsFilters,
    setSortsFilters,
    setSpirtsFilters,
    setTagsFilters,
  } = useFilter();

  const isLeftLayout = layoutDirection === 'reverse';

  return (
    <section>
      <Gutter>
        <div
          className={`flex flex-col xl:flex-row gap-6 ${
            isLeftLayout ? 'xl:flex-row-reverse' : ''
          }`}
        >
          {/* Image Section */}
          <div className="relative w-full xl:w-1/2 lg:w-full">
            <Image
              src={mainImageUrl || bannerImageUrl}
              alt="banner-image"
              width={1920}
              height={1080}
              style={{ objectFit: 'cover' }}
              className="block xl:hidden"
            />

            <Image
              src={mainImageUrl || bannerImageUrl}
              alt="banner-image"
              fill
              style={{ objectFit: 'cover' }}
              className="hidden xl:block"
            />

            <div className="absolute inset-0 flex justify-center items-center gap-2 text-white">
              <Link
                href="/products"
                onClick={() => {
                  setCategoryFilters(categories);
                  setSortsFilters(sorts); 
                  setBrandFilters(brands); 
                  setRegionFilters(regions); 
                  setFoodsFilters(foods); 
                  setSpirtsFilters(spirits);
                  setTagsFilters(tags);
                }}
              >
                <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                  {label}
                </h2>
              </Link>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="w-full xl:w-1/2 flex flex-col gap-6">
            {/* First Carousel */}
            <div className="relative w-full overflow-hidden">
              <Carousel
                opts={{
                  align: 'start',
                }}
                className="w-full h-64"
              >
                <CarouselContent>
                  {firstProducts?.map((product, index) => (
                    <CarouseHerolItem key={index}>
                      <HeroCard key={product.id} product={product} />
                    </CarouseHerolItem>
                  ))}
                </CarouselContent>
                <div className="absolute z-10 right-[0] top-[0] flex items-center justify-center gap-1">
                  <CarouselHeroPrevious />
                  <CarouselHeroNext />
                </div>
              </Carousel>
            </div>

            {/* Second Carousel */}
            <div className="relative w-full overflow-hidden">
              <Carousel
                opts={{
                  align: 'start',
                }}
                className="w-full h-64"
              >
                <CarouselContent>
                  {secondProducts?.map((product, index) => (
                    <CarouseHerolItem key={index}>
                      <HeroCard key={product.id} product={product} />
                    </CarouseHerolItem>
                  ))}
                </CarouselContent>
                <div className="absolute z-10 right-[0] top-[0] flex items-center justify-center gap-1">
                  <CarouselHeroPrevious />
                  <CarouselHeroNext />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </Gutter>
    </section>
  );
};

export default CarouselSection;
