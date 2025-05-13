import type { CollectionConfig } from 'payload/types'

const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: {
      en: 'Tag',
      bg: 'Таг',
    },
    plural: {
      en: 'Tags',
      bg: 'Тагове',
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

export default Tags
