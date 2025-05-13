'use client';

import React from 'react';
import HighlightProduct from '../../_components/HighlightSection';

export const BannerProduct = ({ selectedDoc, reverse }: any) => {
  if (!selectedDoc || !selectedDoc.value) return null;
  const product = selectedDoc.value;

  return (
    <section className="banner-product">
      <HighlightProduct product={product} reverse={reverse} />
    </section>
  );
};
