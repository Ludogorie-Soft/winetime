import type { Block } from 'payload/types'

export const BannerProduct: Block = {
  slug: 'bannerProduct',
  labels: {
    singular: 'Banner Product',
    plural: 'Banner Products',
  },
  fields: [
    {
      type: 'relationship',
      name: 'selectedDoc',
      label: 'Select Product',
      relationTo: ['products'],
    },
    {
      name: 'reverse',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
