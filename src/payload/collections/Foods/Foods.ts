import type { CollectionConfig } from 'payload/types'

const Foods: CollectionConfig = {
  slug: 'foods',
  labels: {
    singular: {
      en: 'Food',
      bg: 'Храна',
    },
    plural: {
      en: 'Foods',
      bg: 'Храни',
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
  ],
}

export default Foods
