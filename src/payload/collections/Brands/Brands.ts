import type { CollectionConfig } from 'payload/types'
import richText from '../../fields/richText'

const Brands: CollectionConfig = {
  slug: 'brands',
  labels: {
    singular: {
      en: 'Brand',
      bg: 'Производител',
    },
    plural: {
      en: 'Brands',
      bg: 'Производители',
    },
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: {
        en: 'Name',
        bg: 'Име',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'media',
      label: {
        en: 'Media',
        bg: 'Снимка',
      },
      type: 'upload',
      relationTo: 'media',
    },
    richText(),
  ],
}

export default Brands
