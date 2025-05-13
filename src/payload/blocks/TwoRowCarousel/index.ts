import type { Block, Field } from 'payload/types'

const carouselFields: Field[] = [
  {
    name: 'populateBy',
    type: 'select',
    defaultValue: 'collection',
    options: [
      {
        label: 'Collection',
        value: 'collection',
      },
      {
        label: 'Individual Selection',
        value: 'selection',
      },
    ],
  },
  {
    type: 'select',
    name: 'relationTo',
    label: 'Collections To Show',
    defaultValue: 'products',
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
    },
    options: [
      {
        label: 'Products',
        value: 'products',
      },
    ],
  },
  {
    type: 'relationship',
    name: 'categories',
    label: 'Categories To Show',
    relationTo: 'categories',
    hasMany: true,
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
    },
  },
  {
    type: 'relationship',
    name: 'brands',
    label: 'Brands To Show',
    relationTo: 'brands',
    hasMany: true,
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
    },
  },
  {
    type: 'relationship',
    name: 'sorts',
    label: 'Sorts To Show',
    relationTo: 'sorts',
    hasMany: true,
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
    },
  },
  {
    type: 'relationship',
    name: 'regions',
    label: 'Regions To Show',
    relationTo: 'regions',
    hasMany: true,
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
    },
  },
  {
    type: 'relationship',
    name: 'foods',
    label: 'Foods To Show',
    relationTo: 'foods',
    hasMany: true,
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
    },
  },
  {
    type: 'relationship',
    name: 'spirts',
    label: 'Spirts To Show',
    relationTo: 'spirts',
    hasMany: true,
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
    },
  },
  {
    type: 'relationship',
    name: 'tags',
    label: 'Filter By Tags',
    relationTo: 'tags',
    hasMany: true,
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
    },
  },
  {
    type: 'number',
    name: 'limit',
    label: 'Limit',
    defaultValue: 10,
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
      step: 1,
    },
  },
  {
    type: 'number',
    name: 'priceOver',
    label: 'Price From',
    defaultValue: 0,
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
      step: 1,
    },
  },
  {
    type: 'number',
    name: 'priceLimit',
    label: 'Price To',
    defaultValue: 50,
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
      step: 1,
    },
  },
  {
    type: 'relationship',
    name: 'selectedDocs',
    label: 'Selection',
    relationTo: ['products'],
    hasMany: true,
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'selection',
    },
  },
  {
    type: 'relationship',
    name: 'populatedDocs',
    label: 'Populated Docs',
    relationTo: ['products'],
    hasMany: true,
    admin: {
      disabled: true,
      description: 'This field is auto-populated after-read',
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
    },
  },
  {
    type: 'number',
    name: 'populatedDocsTotal',
    label: 'Populated Docs Total',
    admin: {
      step: 1,
      disabled: true,
      description: 'This field is auto-populated after-read',
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
    },
  },
  {
    type: 'checkbox',
    name: 'showOnlyDiscountedProducts',
    label: 'Show Only Discounted Products',
    defaultValue: false,
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
    },
  },
  {
    type: 'checkbox',
    name: 'showOnlyOtherProducts',
    label: 'Show Only Other Products',
    defaultValue: false,
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
    },
  },
  {
    type: 'checkbox',
    name: 'quantityOverZero',
    label: 'Show Only Available Products',
    defaultValue: true,
    admin: {
      condition: (_, siblingData) => siblingData.populateBy === 'collection',
    },
  },
]

export const TwoRowCarousel: Block = {
  slug: 'twoRowCarousel',
  labels: {
    singular: 'Two Row Carousel',
    plural: 'Two Row Carousels',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'media',
      label: {
        en: 'carousel Image',
        bg: 'Снимка на карусела',
      },
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'reverse',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      type: 'tabs',
      tabs: [
        {
          name:  'firstCarousel',
          label: '🔗 First Carousel',
          fields: [...carouselFields],
        },{
          name:  'secondCarousel',
          label: '🔗 Second Carousel',
          fields: [...carouselFields],
        },
      ],
    },
  ],
}
