import type { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: {
      en: 'Category',
      bg: 'Категория',
    },
    plural: {
      en: 'Categories',
      bg: 'Категории',
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

export default Categories
