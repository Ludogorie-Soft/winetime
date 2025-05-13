import type { CollectionConfig } from 'payload/types'

const OtherCategories: CollectionConfig = {
  slug: 'otherCategories',
  labels: {
    singular: {
      en: 'Other Category',
      bg: 'Друга категория',
    },
    plural: {
      en: 'Other Categories',
      bg: 'Други категории',
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
        en: 'Title',
        bg: 'Заглавие',
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
  ],
}

export default OtherCategories
