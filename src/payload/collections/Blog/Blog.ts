import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { slugField } from '../../fields/slug'
import richText from '../../fields/richText'

const Blog: CollectionConfig = {
  slug: 'blog',
  labels: {
    plural: {
      en: 'Blogs',
      bg: 'Блогове',
    },
    singular: {
      en: 'Blog',
      bg: 'Блог',
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'richText', '_status'],
    livePreview: {
      url: ({ data }) => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/${data.slug}`
    },
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
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
    richText(),
    {
      name: 'publishedOn',
      label: {
        en: 'Published On',
        bg: 'Побликуван на',
      },
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    slugField(),
    {
      name: 'skipSync',
      label: 'Skip Sync',
      hidden: true,
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'relatedProductsText',
      label: {
        en: 'Text for related products',
        bg: 'Текст за сродни продукти',
      },
      type: 'text',
    },
    {
      name: 'relatedProducts',
      label: {
        en: 'Related Products',
        bg: 'Сродни Продукти',
      },
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
    },
    {
      name: 'media',
      label: {
        en: 'Media',
        bg: 'Снимка',
      },
      type: 'array',
      fields: [
        {
          name: 'upload',
          type: 'upload',
          relationTo: 'media'
        }
      ],
    },
  ],
}

export default Blog
