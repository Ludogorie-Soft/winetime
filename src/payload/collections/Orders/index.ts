import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
// import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'
import { adminsOrOrderedBy } from './access/adminsOrOrderedBy'
import { clearUserCart } from './hooks/clearUserCart'
import { populateOrderedBy } from './hooks/populateOrderedBy'
import { updateUserPurchases } from './hooks/updateUserPurchases'
import { LinkToPaymentIntent } from './ui/LinkToPaymentIntent'
import { getPriceAndWeight } from './ui/getPriceAndWeight'
import { speedyGetCities } from '../../fields/speedyGetCities/field'
import { speedyGetOffices } from '../../fields/speedyGetOffices/field'

export const Orders: CollectionConfig = {
  slug: 'orders',
  labels: {
    singular: {
      en: 'Order',
      bg: 'Поръчка',
    },
    plural: {
      en: 'Orders',
      bg: 'Поръчки',
    },
  },
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt', 'status', 'name', 'orderedBy', 'quickOrder', 'total', 'email'],
    preview: doc => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
  },
  hooks: {
    afterChange: [updateUserPurchases, clearUserCart],
  },
  access: {
    read: adminsOrOrderedBy,
    update: admins,
    create: () => true,
    delete: admins,
  },
  fields: [
    {
      name: 'status',
      label: {
        en: 'Status',
        bg: 'Статус',
      },
      type: 'select',
      defaultValue: 'new',
      options: [
        {
          label: {
            en: 'New',
            bg: 'Нова',
          },
          value: 'new',
        },
        {
          label: {
            en: 'Processing',
            bg: 'Обработване',
          },
          value: 'processing',
        },
        {
          label: {
            en: 'Sent',
            bg: 'Изпратена',
          },
          value: 'sent',
        },
        {
          label: {
            en: 'Finished',
            bg: 'Завършена',
          },
          value: 'finished',
        },
      ],
    },
    {
      name: 'quickOrder',
      label: {
        en: 'Quick Order',
        bg: 'Бърза Поръчка',
      },
      type: 'checkbox',
      defaultValue: false,
      admin: {
        readOnly: true,
      },
    },
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
      name: 'orderedBy',
      label: {
        en: 'Оrdered By',
        bg: 'Поръчана от',
      },
      type: 'relationship',
      relationTo: 'users',
      hooks: {
        beforeChange: [populateOrderedBy],
      },
      admin: {
        condition: (data) => !data.quickOrder,
      },
    },
    {
      name: 'stripePaymentIntentID',
      label: 'Stripe Payment Intent ID',
      hidden: true,
      type: 'text',
      admin: {
        position: 'sidebar',
        components: {
          Field: LinkToPaymentIntent,
        },
      },
    },
    {
      name: 'phone',
      label: {
        en: 'Phone Number',
        bg: 'Телефонен Номер',
      },
      type: 'number',
      required: true,
    },
    {
      name: 'email',
      label: {
        en: 'Email',
        bg: 'Имейл',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'total',
      label: {
        en: 'Total',
        bg: 'Цена',
      },
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'deliveryMethod',
      label: {
        en: 'Delivery Method',
        bg: 'Метод на доставка',
      },
      type: 'select',
      options: [
        {
          label: {
            en: 'Speedy Office',
            bg: 'Офис на Спиди',
          },
          value: 'econtOffice',
        },
        {
          label: {
            en: 'To Address',
            bg: 'До адрес',
          },
          value: 'econtAddress',
        },
        {
          label: {
            en: 'Quick Order',
            bg: 'Бърза Поръчка',
          },
          value: 'quickOrder',
        },
      ],
      required: true,
    },
    speedyGetCities,
    speedyGetOffices,
    {
      name: 'addressNeighborhood',
      label: {
        en: 'Neighborhood',
        bg: 'Квартал',
      },
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData.deliveryMethod === 'econtAddress',
      }
    },
    {
      name: 'addressStreet',
      label: {
        en: 'Street',
        bg: 'Улица',
      },
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) => siblingData.deliveryMethod === 'econtAddress',
      }
    },
    {
      name: 'items',
      label: {
        en: 'Items',
        bg: 'Артикули',
      },
      type: 'array',
      fields: [
        {
          name: 'product',
          label: {
            en: 'Product',
            bg: 'Продукт',
          },
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'price',
          label: {
            en: 'Price',
            bg: 'Цена',
          },
          type: 'number',
          min: 0,
        },
        {
          name: 'quantity',
          label: {
            en: 'Quantity',
            bg: 'Количество',
          },
          type: 'number',
          min: 0,
        },
      ],
    },
    {
      name: 'parcelAmount',
      label: {
        en: 'Parcel Amount',
        bg: 'Наложен платеж',
      },
      type: 'text',
      // hidden: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        components: {
          Field: getPriceAndWeight,
        },
      },
    },
    {
      name: 'shipmentNumber',
      label: {
        en: 'Shipment Number',
        bg: 'Номер на пакета',
      },
      type: 'text',
      hidden: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
