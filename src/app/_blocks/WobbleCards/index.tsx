'use client';

import React from 'react';
import Link from 'next/link';
import { WobbleCard } from '@/app/_components/ui/wobble-cards';
import { useFilter } from '@/app/_providers/Filter';

export const WobbleCards = (props) => {
  const cards = ['card1', 'card2', 'card3', 'card4', 'card5']
    .map((key) => props[key])
    .filter((card) => card && card.media);

    const {
        setCategoryFilters,
        setBrandFilters,
        setRegionFilters,
        setFoodsFilters,
        setSortsFilters,
        setSpirtsFilters,
        setTagsFilters
      } = useFilter();

      const extractMediaUrl = (card) => {
        return typeof card?.media === 'string'
          ? card?.media
          : card?.media?.url || `/media/${card?.media?.filename}`;
      };

      const handleFilterClick = (card) => {
        if (card.categories) setCategoryFilters(card.categories.map((c) => (typeof c === 'object' ? c.id : c)));
        if (card.brands) setBrandFilters(card.brands.map((b) => (typeof b === 'object' ? b.id : b)));
        if (card.regions) setRegionFilters(card.regions.map((r) => (typeof r === 'object' ? r.id : r)));
        if (card.foods) setFoodsFilters(card.foods.map((f) => (typeof f === 'object' ? f.id : f)));
        if (card.sorts) setSortsFilters(card.sorts.map((s) => (typeof s === 'object' ? s.id : s)));
        if (card.spirts) setSpirtsFilters(card.spirts.map((s) => (typeof s === 'object' ? s.id : s)));
      };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-full mx-auto w-full px-12">
        <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
            backgroundImageSrc={extractMediaUrl(cards[0])}
        >
            <Link href="/products" onClick={() =>  handleFilterClick(cards[0])}>
                <div className="max-w-xs">
                    <h2 className="text-center text-balance text-3xl md:text-5xl font-semibold tracking-[-0.015em] text-white drop-shadow-lg">
                        {cards[0]?.cardTitle}
                    </h2>
                    <p className="mt-4 text-center text-lg text-white drop-shadow-lg">
                        {cards[0]?.cardSubTitle}
                    </p>
                </div>
            </Link>
        </WobbleCard>

        <WobbleCard
            containerClassName="col-span-1 min-h-[300px] bg-yellow-500 contrast-75"
            backgroundImageSrc={extractMediaUrl(cards[1])}
        >
            <Link href="/products" onClick={() => handleFilterClick(cards[1])}>
                <div className="max-w-sm">
                    <h2 className="max-w-80 text-center text-balance text-3xl md:text-5xl font-semibold tracking-[-0.015em] text-white drop-shadow-lg capitalize">
                        {cards[1]?.cardTitle}
                    </h2>
                    <p className="mt-4 max-w-[26rem] text-center text-lg text-neutral-200 drop-shadow-lg">
                        {cards[1]?.cardSubTitle}
                    </p>
                </div>
            </Link>
        </WobbleCard>
        <WobbleCard
            containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]"
            backgroundImageSrc={extractMediaUrl(cards[2])}
        >
            <Link href="/products" onClick={() => handleFilterClick(cards[2])}>
                <div className="max-w-sm">
                    <h2 className="max-w-sm md:max-w-lg text-center text-balance text-2xl md:text-4xl font-semibold tracking-[-0.015em] text-white drop-shadow-lg">
                        {cards[2]?.cardTitle}
                    </h2>
                    <p className="mt-4 max-w-[26rem] text-center text-md text-white drop-shadow-lg">
                        {cards[2]?.cardSubTitle}
                    </p>
                </div>
            </Link>
        </WobbleCard>
        <WobbleCard
            containerClassName="col-span-1 min-h-[300px] bg-yellow-500 "
            backgroundImageSrc={extractMediaUrl(cards[3])}
        >
            <Link href="/bio" onClick={() => handleFilterClick(cards[3])}>
                <div className="max-w-sm">
                    <h2 className="max-w-80 text-center text-balance text-3xl md:text-5xl font-semibold tracking-[-0.015em] text-white drop-shadow-lg">
                        {cards[3]?.cardTitle}
                    </h2>
                    <p className="mt-4 max-w-[26rem] text-center text-lg text-neutral-200 drop-shadow-lg">
                        {cards[3]?.cardSubTitle}
                    </p>
                </div>
            </Link>
        </WobbleCard>
        <WobbleCard
            containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
            backgroundImageSrc={extractMediaUrl(cards[4])}
        >
            <Link
                href="/products" onClick={() => handleFilterClick(cards[4])}
            >
                <div className="max-w-xs">
                    <h2 className="text-center text-balance text-xl md:text-2xl font-semibold tracking-[-0.015em] text-white drop-shadow-lg">
                        {cards[4]?.cardTitle}
                    </h2>
                    <p className="mt-4 text-center text-lg text-neutral-200 drop-shadow-lg">{cards[4]?.cardSubTitle}</p>
                </div>
            </Link>
        </WobbleCard>
    </div>
    </>
  );
};
