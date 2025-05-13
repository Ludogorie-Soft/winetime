import type { CollectionConfig } from 'payload/types'

const Regions: CollectionConfig = {
  slug: 'regions',
  labels: {
    singular: {
      en: 'Region',
      bg: 'Регион',
    },
    plural: {
      en: 'Regions',
      bg: 'Региони',
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
      name: 'otherRegion',
      label: {
        en: 'Other Region',
        bg: 'Друг регион',
      },
      type: 'checkbox',
      defaultValue: false,
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

export default Regions
