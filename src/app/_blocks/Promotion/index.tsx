'use client';

import React from 'react';
import ProductsBanner from '../../_components/Banners/ProductsBanner';

export const Promotion = ({ media, richText }: any) => {
  return (
    <ProductsBanner media={media} richText={richText} />
  );
};