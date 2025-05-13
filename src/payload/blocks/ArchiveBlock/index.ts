import type { Block } from 'payload/types'

import richText from '../../fields/richText'

export const Archive: Block = {
  slug: 'archive',
  labels: {
    singular: 'Archive',
    plural: 'Archives',
  },
  fields: [
    richText({
      name: 'introContent',
      label: 'Intro Content',
    }),
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
      label: 'Tags To Show',
      relationTo: 'tags',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      type: 'relationship',
      name: 'otherCategories',
      label: 'Othert Categories To Show',
      relationTo: 'otherCategories',
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
  ],
}
