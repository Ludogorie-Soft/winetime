import type { Field } from 'payload/types'

import linkGroup from './linkGroup'
import richText from './richText'
import label from './richText/label'
import largeBody from './richText/largeBody'

export const hero: Field = {
  name: 'hero',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Type',
      required: true,
      defaultValue: 'lowImpact',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Custom Hero',
          value: 'customHero',
        },
      ],
    },
    richText({
      admin: {
        elements: ['h1', largeBody, label, 'link'],
        leaves: [],
      },
    }),
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
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { type } = {}) =>
          ['highImpact', 'mediumImpact', 'customHero'].includes(type),
      },
    },
  ],
}
