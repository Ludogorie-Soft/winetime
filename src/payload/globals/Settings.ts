import type { GlobalConfig } from 'payload/types'
import richText from '../fields/richText'

export const Settings: GlobalConfig = {
  slug: 'settings',
  label: {
    en: 'Settings',
    bg: 'Настройки',
  },
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'indexPage',
      label: {
        en: 'Home Page',
        bg: 'Изберете начална страница',
      },
      type: 'relationship',
      relationTo: 'pages',
    },
    {
      name: 'newOrderEmails',
      type: 'array',
      label: 'New Order Emails',
      minRows: 1,
      maxRows: 10,
      interfaceName: 'Email',
      labels: {
        singular: 'Email',
        plural: 'Emails',
      },
      fields: [
        {
          name: 'Email',
          type: 'email',
        },
      ],
    },
    {
      name: 'requestProductEmails',
      type: 'array',
      label: 'Request Product Emails',
      minRows: 1,
      maxRows: 10,
      interfaceName: 'Email',
      labels: {
        singular: 'Email',
        plural: 'Emails',
      },
      fields: [
        {
          name: 'Email',
          type: 'email',
        },
      ],
    },
    {
      name: 'contactUsFormEmails',
      type: 'array',
      label: 'Contact Us Form Emails',
      minRows: 1,
      maxRows: 10,
      interfaceName: 'Email',
      labels: {
        singular: 'Email',
        plural: 'Emails',
      },
      fields: [
        {
          name: 'Email',
          type: 'email',
        },
      ],
    },
    {
      name: 'productsPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Products page',
      hidden: true,
    },
  ],
}
