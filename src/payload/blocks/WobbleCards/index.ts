import type { Block, Field } from 'payload/types'

const columnFields: Field[] = [
  {
    name: 'media',
    label: {
      en: 'Card image',
      bg: 'Снимка на картичката',
    },
    type: 'upload',
    relationTo: 'media',
  },
  {
    name: 'cardTitle',
    label: {
      en: 'Card title',
      bg: 'Заглавие на картичката',
    },
    type: 'text',
  },
  {
    name: 'cardSubTitle',
    label: {
      en: 'Card Subtitle',
      bg: 'Подзаглавие на картичката',
    },
    type: 'text',
  },
  {
    type: 'select',
    name: 'relationTo',
    label: 'Collections To Show',
    defaultValue: 'products',
    options: [
      {
        label: 'Products',
        value: 'products',
      },
      {
        label: 'Bio',
        value: 'bio',
      },
    ],
  },
  {
    type: 'relationship',
    name: 'categories',
    label: 'Categories To Show',
    relationTo: 'categories',
    hasMany: true,
  },
  {
    type: 'relationship',
    name: 'brands',
    label: 'Brands To Show',
    relationTo: 'brands',
    hasMany: true,
  },
  {
    type: 'relationship',
    name: 'sorts',
    label: 'Sorts To Show',
    relationTo: 'sorts',
    hasMany: true,
  },
  {
    type: 'relationship',
    name: 'regions',
    label: 'Regions To Show',
    relationTo: 'regions',
    hasMany: true,
  },
  {
    type: 'relationship',
    name: 'foods',
    label: 'Foods To Show',
    relationTo: 'foods',
    hasMany: true,
  },
  {
    type: 'relationship',
    name: 'spirts',
    label: 'Spirts To Show',
    relationTo: 'spirts',
    hasMany: true,
  },
  {
    type: 'relationship',
    name: 'tags',
    label: 'Filter By Tags',
    relationTo: 'tags',
    hasMany: true,
  },
]

export const WobbleCards: Block = {
  slug: 'wobbleCards',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'card1',
          label: '🃏 1st Card',
          fields: [...columnFields],
        },
        {
          name: 'card2',
          label: '🃏 2nd Card',
          fields: [...columnFields],
        },
        {
          name: 'card3',
          label: '🃏 3d Card',
          fields: [...columnFields],
        },
        {
          name: 'card4',
          label: '🃏 4th Card',
          fields: [...columnFields],
        },
        {
          name: 'card5',
          label: '🃏 5th Card',
          fields: [...columnFields],
        },
      ],
    },
  ],
}
