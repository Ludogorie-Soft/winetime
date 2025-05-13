import richText from '../../fields/richText'
import type { Block } from 'payload/types'

export const Promotion: Block = {
  slug: 'promotionBlock',
  labels: {
    singular: 'Promotion',
    plural: 'Promotions',
  },
  fields: [
    {
      name: 'media',
      label: {
        en: 'Promotions Image',
        bg: 'Изображение на промоциите',
      },
      type: 'upload',
      relationTo: 'media',
    },
    richText({ name: 'richText', label: { en: 'Promotions Description', bg: 'Описание на промоциите' } }),
  ],
}
