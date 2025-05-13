import type { CollectionConfig } from 'payload/types'

const Spirts: CollectionConfig = {
  slug: 'spirts',
  labels: {
    singular: {
      en: 'Spirt Category',
      bg: 'Спиртнa Категория',
    },
    plural: {
      en: 'Spirt Categories',
      bg: 'Спиртни Категории',
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

export default Spirts
