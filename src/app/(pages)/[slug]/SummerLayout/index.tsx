// SummerLayout.tsx
import React from 'react';
import { Hero } from '../../../_components/Hero';
import { WobbleCards } from '../../../_blocks/WobbleCards';
import { TwoRowCarousel } from '../../../_blocks/TwoRowCarousel';
import { BannerProduct } from '../../../_blocks/BannerProduct';
import { Promotion } from '../../../_blocks/Promotion';
import { Settings, Page as PageType } from '@/payload/payload-types';

export function SummerLayout({
  page,
  homeSettings,
  classes,
}: {
  page: PageType;
  homeSettings: Settings;
  classes: any;
}) {
  const { hero, layout } = page;

  return (
    <>
      {hero && <Hero {...hero} />}
      <div className={classes.home}>
        {layout?.map((block, index) => {
          switch (block.blockType) {
            case 'wobbleCards':
              return <WobbleCards key={index} {...block} />;
            case 'twoRowCarousel':
              return <TwoRowCarousel key={index} {...block} />;
            case 'bannerProduct':
              return <BannerProduct key={index} {...block} />;
              case 'promotionBlock':
                return <Promotion key={index} {...block} />;
            default:
              return null;
          }
        })}
      </div>
    </>
  );
}
