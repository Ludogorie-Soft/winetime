'use client';

import React from 'react';
import { TypewriterEffect } from '../../ui/typewriter-effect';
import { Button } from '../../Buttons/Button';

interface Word {
  text: string;
  className?: string;
}
const transformRichTextToWordsArray = (richText: any[]): Word[] => {
  const words: Word[] = [];

  richText.forEach(block => {
    if (block.children && Array.isArray(block.children)) {
      block.children.forEach(child => {
        if (child.text) {
          const text = child.text.trim();
          if (text.length > 0) {
            const wordObject: Word = { text };

            if (child.color === 'red') {
              wordObject.className = 'text-red-500 dark:text-red-500';
            }

            words.push(wordObject);
          }
        }
      });
    }
  });

  return words;
};

const ProductsBanner = ({ media, richText }: { media: any; richText: any[] }) => {
  const words = transformRichTextToWordsArray(richText);
  
  const backgroundImageUrl =
    typeof media === 'string' ? media : media?.url || `/media/${media?.filename}`;

  return (
    <section
      className="flex flex-col items-center justify-center h-[20rem]"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <TypewriterEffect words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
        <Button
          el="link"
          href="/promotion"
          label="Продукти"
          appearance="primary"
          onClick={() => {
            window.location.href = '/promotion';
          }}
        />
      </div>
    </section>
  );
};

export default ProductsBanner;