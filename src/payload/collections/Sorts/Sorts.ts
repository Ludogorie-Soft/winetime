import type { CollectionConfig } from 'payload/types'

const Sorts: CollectionConfig = {
  slug: 'sorts',
  labels: {
    singular: {
      en: 'Sort',
      bg: 'Сорт',
    },
    plural: {
      en: 'Sorts',
      bg: 'Сортове',
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
  ],
}

export default Sorts
