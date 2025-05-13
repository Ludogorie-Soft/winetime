import type { CollectionConfig } from 'payload/types'

const Requests: CollectionConfig = {
  slug: 'requests',
  labels: {
    singular: {
      en: 'Request',
      bg: 'Заявка',
    },
    plural: {
      en: 'Requests',
      bg: 'Заявки',
    },
  },
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      label: {
        en: 'Name',
        bg: 'Име',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: {
        en: 'Email',
        bg: 'Емаил',
      },
      type: 'email',
      required: true,
    },
    {
      name: 'wineName',
      label: {
        en: 'Wine Name',
        bg: 'Име на виното',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'wineQuantity',
      label: {
        en: 'Quantity',
        bg: 'Количество',
      },
      type: 'number',
      required: true,
    },
    {
      name: 'addMore',
      label: {
        en: 'Additional Information',
        bg: 'Допълнителна информация',
      },
      type: 'textarea',
    },
  ],
}

export default Requests
