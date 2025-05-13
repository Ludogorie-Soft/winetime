import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'promotionBanner',
      label: {
        en: 'Promotion Banner',
        bg: 'Промоционален Банер',
      },
      type: 'text',
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 8,
      fields: [
        link({
          appearances: false,
        }),
      ],
      hidden: true,
    },
  ],
}
