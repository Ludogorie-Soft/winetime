import React from 'react';
import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

import { Media, Page as PageType, Settings } from '../../../payload/payload-types';
import { fetchDoc } from '../../_api/fetchDoc';
import { generateMeta } from '../../_utilities/generateMeta';

export const dynamic = 'force-dynamic';

import classes from './index.module.scss';
import { fetchHomepageSettings } from '../../_api/fetchGlobals';
import { SummerLayout } from './SummerLayout';

export default async function Page({ params: { slug = 'home' } }) {
  const { isEnabled: isDraftMode } = draftMode();

  let page: PageType | null = null;
  let homeSettings: Settings | null = null;

  try {
    homeSettings = await fetchHomepageSettings();

    const themeSlug =
      typeof homeSettings?.indexPage === 'object' && 'slug' in homeSettings.indexPage
        ? (homeSettings.indexPage as PageType).slug
        : slug;

    page = await fetchDoc<PageType>({
      collection: 'pages',
      slug: themeSlug,
      draft: isDraftMode,
    });
  } catch (error) {
    console.error(error);
  }

  if (!page) {
    return notFound();
  }

  return <SummerLayout page={page} homeSettings={homeSettings} classes={classes} />;
}

export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode();

  let page: PageType | null = null;

  try {
    page = await fetchDoc<PageType>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    });
  } catch (error) {
    return notFound();
  }

  return generateMeta({ doc: page });
}
