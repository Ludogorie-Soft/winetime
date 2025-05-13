import type { CollectionConfig } from 'payload/types'
import richText from '../../fields/richText'

const GlassTypes: CollectionConfig = {
  slug: 'glass-types',
  labels: {
    singular: {
      en: 'Glass Type',
      bg: 'Вид чаша',
    },
    plural: {
      en: 'Glass Type',
      bg: 'Видове чаши',
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

export default GlassTypes
