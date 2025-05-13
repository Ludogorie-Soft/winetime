import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { Archive } from '../../blocks/ArchiveBlock'
import { CallToAction } from '../../blocks/CallToAction'
import { Content } from '../../blocks/Content'
import { MediaBlock } from '../../blocks/MediaBlock'
import { slugField } from '../../fields/slug'
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { checkUserPurchases } from './access/checkUserPurchases'
import { beforeProductChange } from './hooks/beforeChange'
import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
import { revalidateProduct } from './hooks/revalidateProduct'
import { ProductSelect } from './ui/ProductSelect'
import richText from '../../fields/richText'

const Products: CollectionConfig = {
  slug: 'products',
  labels: {
    plural: {
      en: 'Products',
      bg: 'Продукти',
    },
    singular: {
      en: 'Product',
      bg: 'Продукт',
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status', 'productType', 'barcode', 'quantity', 'categories', 'tags', 'visible'],
    preview: doc => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/products/${doc.slug}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
  },
  hooks: {
    beforeChange: [beforeProductChange],
    afterChange: [revalidateProduct],
    afterRead: [populateArchiveBlock],
    afterDelete: [deleteProductFromCarts],
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
      name: 'productType',
      label: { en: 'Product Type', bg: 'Тип Продукт' },
      type: 'select',
      required: true,
      defaultValue: 'wine',
      options: [
        { label: { en: 'Wine', bg: 'Вино' }, value: 'wine' },
        { label: { en: 'Other Beverage', bg: 'Спиртни Напитки' }, value: 'otherBeverage' },
        { label: { en: 'Others', bg: 'Други' }, value: 'other' },
      ],
      admin: {
        description: ({ value }) => {
          if (value === 'wine') {
            return 'Продуктът ще бъде качен в раздел "Вина" в менюто на сайта.';
          } else if (value === 'otherBeverage') {
            return 'Продуктът ще бъде качен в раздел "Спиртни Напитки" в менюто на сайта.';
          } else if (value === 'other') {
            return 'Продуктът ще бъде качен в раздел "Други" в менюто на сайта.';
          }
          return null;
        },
      }
    },
    {
      name: 'title',
      label: {
        en: 'Title',
        bg: 'Заглавие',
      },
      type: 'text',
      required: true,
    },
    {
      name: 'price',
      label: {
        en: 'Price',
        bg: 'Цена',
      },
      type: 'number',
      required: true,
    },
    {
      name: 'discountPrice',
      label: {
        en: 'Price with Discount',
        bg: 'Цена с отстъпка',
      },
      type: 'number',
    },
    {
      name: 'barcode',
      label: {
        en: 'Barcode',
        bg: 'Баркод',
      },
      type: 'number',
      required: true,
      admin: {
        description: `Баркод от системата Yanak, ще синхронизира цена и количество.`
      }
    },
    richText(),
    {
      type: 'tabs',
      hidden: true,
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive],
            },
          ],
        },
        {
          label: 'Product Details',
          fields: [
            {
              name: 'stripeProductID',
              label: 'Stripe Product',
              type: 'text',
              admin: {
                components: {
                  Field: ProductSelect,
                },
              },
            },
            {
              name: 'priceJSON',
              label: 'Price JSON',
              type: 'textarea',
              admin: {
                readOnly: true,
                rows: 10,
              },
            },
            {
              name: 'enablePaywall',
              label: 'Enable Paywall',
              type: 'checkbox',
            },
            {
              name: 'paywall',
              label: 'Paywall',
              type: 'blocks',
              access: {
                read: checkUserPurchases,
              },
              blocks: [CallToAction, Content, MediaBlock, Archive],
            },
          ],
        },
      ],
    },
    {
      name: 'quantity',
      label: {
        en: 'Quantity',
        bg: 'Количество',
      },
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'weight',
      label: {
        en: 'Weight',
        bg: 'Тегло',
      },
      type: 'number',
      defaultValue: 1.0,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'categories',
      label: {
        en: 'Categories',
        bg: 'Категории',
      },
      type: 'relationship',
      required: true,
      relationTo: 'categories',
      admin: {
        position: 'sidebar',
        condition: ({ productType }) => productType === 'wine',
      },
    },
    {
      name: 'spirts',
      label: {
        en: 'Other Beverage',
        bg: 'Спиртни Напитки',
      },
      type: 'relationship',
      required: true,
      relationTo: 'spirts',
      admin: {
        position: 'sidebar',
        condition: ({ productType }) => productType === 'otherBeverage',
      },
    },
    {
      name: 'otherCategories',
      label: {
        en: 'Other Categories',
        bg: 'Други Категории',
      },
      type: 'relationship',
      required: true,
      relationTo: 'otherCategories',
      admin: {
        position: 'sidebar',
        condition: ({ productType }) => productType === 'other',
      },
    },
    {
      name: 'brands',
      label: {
        en: 'Brands',
        bg: 'Производители',
      },
      type: 'relationship',
      relationTo: 'brands',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'glassTypes',
      label: {
        en: 'Glass Type',
        bg: 'Вид чаша',
      },
      type: 'relationship',
      relationTo: 'glass-types',
      admin: {
        position: 'sidebar',
        condition: ({ productType }) => productType === 'wine' || productType === 'otherBeverage',
      },
    },
    {
      name: 'sorts',
      label: {
        en: 'Sorts',
        bg: 'Сортове',
      },
      type: 'relationship',
      relationTo: 'sorts',
      hasMany: true,
      admin: {
        position: 'sidebar',
        condition: ({ productType }) => productType === 'wine',
      },
    },
    {
      name: 'regions',
      label: {
        en: 'Regions',
        bg: 'Региони',
      },
      type: 'relationship',
      relationTo: 'regions',
      hasMany: true,
      admin: {
        position: 'sidebar',
        condition: ({ productType }) => productType === 'wine',
      },
    },
    {
      name: 'foods',
      label: {
        en: 'Foods',
        bg: 'Храни',
      },
      type: 'relationship',
      relationTo: 'foods',
      hasMany: true,
      admin: {
        position: 'sidebar',
        condition: ({ productType }) => productType === 'wine' || productType === 'otherBeverage',
      },
    },
    {
      name: 'visible',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: ({ value }) => (
          value == true ? `Продуктът ще бъде видим в сайта и в интернет` : `Продуктът няма да бъде видим в сайта, само в интернет`
        )
      },
    },
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
      name: 'milliliters',
      label: {
        en: 'Milliliters',
        bg: 'Милилитри',
      },
      type: 'select',
      options: [
        {
          label: {
            en: '50',
            bg: '50',
          },
          value: '50',
        },
        {
          label: {
            en: '250',
            bg: '250',
          },
          value: '250',
        },
        {
          label: {
            en: '330',
            bg: '330',
          },
          value: '330',
        },
        {
          label: {
            en: '375',
            bg: '375',
          },
          value: '375',
        },
        {
          label: {
            en: '500',
            bg: '500',
          },
          value: '500',
        },
        {
          label: {
            en: '700',
            bg: '700',
          },
          value: '700',
        },
        {
          label: {
            en: '750',
            bg: '750',
          },
          value: '750',
        },
        {
          label: {
            en: '1l',
            bg: '1l',
          },
          value: '1l',
        },
        {
          label: {
            en: '1.5l',
            bg: '1.5l',
          },
          value: '15l',
        },
      ],
      admin: {
        condition: ({ productType }) => productType === 'wine' || productType === 'otherBeverage',
      },
    },
    {
      name: 'alchoholPercentage',
      label: {
        en: '% Alchohol',
        bg: '% Алкохол',
      },
      type: 'number',
      admin: {
        condition: ({ productType }) => productType === 'wine' || productType === 'otherBeverage',
      },
    },
    {
      name: 'isBio',
      label: {
        en: 'Bio',
        bg: 'Био',
      },
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: ({ productType }) => productType === 'wine' || productType === 'otherBeverage',
        description: ({ value }) => (
          value == true ? `Продуктът ще бъде видим в категория БИО и ще има бадж БИО` : ``
        )
      },
    },
    {
      name: 'isHomemade',
      label: {
        en: 'Homemade',
        bg: 'Занаятчийски',
      },
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: ({ productType }) => productType === 'wine' || productType === 'otherBeverage',
        description: ({ value }) => (
          value == true ? `Продуктът ще има бадж Homemade` : ``
        )
      },
    },
    {
      name: 'isChosen',
      label: {
        en: 'Chosen',
        bg: 'Избрани',
      },
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: ({ productType }) => productType === 'wine' || productType === 'otherBeverage',
        description: ({ value }) => (
          value == true ? `Продуктът ще има бадж с логото на WineTime` : ``
        )
      },
    },
    {
      name: 'isPrestige',
      label: {
        en: 'Wine from prestige collection',
        bg: 'Вино от престижната колекция',
      },
      type: 'checkbox',
      defaultValue: false,
      admin: {
        condition: ({ productType }) => productType === 'wine',
        description: ({ value }) => (
          value == true ? `Продуктът ще бъде в категория Престижни вина` : ``
        )
      },
    },
    {
      name: 'tags',
      label: {
        en: 'Tags',
        bg: 'Тагове',
      },
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'wineClass',
      label: {
        en: 'Class',
        bg: 'Клас',
      },
      type: 'select',
      options: [
        {
          label: {
            en: 'IGT',
            bg: 'IGT',
          },
          value: 'igt',
        },
        {
          label: {
            en: 'DOC',
            bg: 'DOC',
          },
          value: 'doc',
        },
        {
          label: {
            en: 'DOCG',
            bg: 'DOCG',
          },
          value: 'docg',
        },
        {
          label: {
            en: 'DOP',
            bg: 'DOP',
          },
          value: 'dop',
        },
        {
          label: {
            en: 'AOC',
            bg: 'AOC',
          },
          value: 'aoc',
        },
        {
          label: {
            en: 'IGP',
            bg: 'IGP',
          },
          value: 'igp',
        },
      ],
      admin: {
        condition: ({ productType }) => productType === 'wine',
      },
    },
    {
      name: 'wineColor',
      label: {
        en: 'Color',
        bg: 'Цвят',
      },
      type: 'text',
      admin: {
        condition: ({ productType }) => productType === 'wine',
      },
    },
    {
      name: 'wineAroma',
      label: {
        en: 'Aroma',
        bg: 'Аромат',
      },
      type: 'text',
      admin: {
        condition: ({ productType }) => productType === 'wine',
      },
    },
    {
      name: 'wineTaste',
      label: {
        en: 'Taste',
        bg: 'Вкус',
      },
      type: 'text',
      admin: {
        condition: ({ productType }) => productType === 'wine',
      },
    },
    {
      name: 'wineTemperature',
      label: {
        en: 'Temperature',
        bg: 'Температура',
      },
      type: 'text',
      admin: {
        condition: ({ productType }) => productType === 'wine',
      },
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
      admin: {
        description: ({ value }) => (
          `НЕАКТИВНО! В сайта се показват вина на произволен принцип.`
        )
      },
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
      admin: {
        description: ({ value }) => (
          `Заглавната снимка се слага в Meta image, тук се слагат всички допълнителни снимки.`
        )
      },
      fields: [
        {
          name: 'upload',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'yanakName',
      label: {
        en: 'Yanak Name',
        bg: 'Янак Име',
      },
      type: 'text',
      hidden: true,
      admin: {
        readOnly: true,
      },
    },
  ],
}

export default Products
