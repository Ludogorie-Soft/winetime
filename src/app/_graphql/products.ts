import {
  ARCHIVE_BLOCK,
  CALL_TO_ACTION,
  CONTENT,
  MEDIA_BLOCK,
  TWOROWCAROUSEL_BLOCK,
  BANNERPRODUCT_BLOCK,
  WOBBLECARDS_BLOCK,
} from './blocks'
import { PRODUCT_BRANDS } from './brands'
import { PRODUCT_GLASSTYPES } from './glassTypes'
import { PRODUCT_CATEGORIES } from './categories'
import { META } from './meta'
import { PRODUCT_OTHER_CATEGORIES } from './spirts'
import { PRODUCT_REGIONS } from './regions'
import { PRODUCT_SORTS } from './sorts'
import { PRODUCT_FOODS } from './foods'
import { PRODUCT_TAGS } from './tags'

export const PRODUCTS = `
  query Products {
    Products(limit: 300, where: { visible: { equals: true }}) {
      docs {
        id
        slug
        visible
        productType
        weight
        title
        price
        discountPrice
        isBio
        isHomemade
        isChosen
        ${PRODUCT_BRANDS}
        ${META}
      }
    }
  }
`

export const RANDOM_PRODUCTS = `
  query RandomProducts($categoryId: [JSON]!) {
    Products(limit: 20, where: { visible: { equals: true }, categories: { in: $categoryId }}) {
      docs {
        id
        slug
        visible
        productType
        weight
        title
        price
        discountPrice
        isBio
        isHomemade
        isChosen
        ${PRODUCT_BRANDS}
        ${PRODUCT_CATEGORIES}
        ${META}
      }
    }
  }
`

export const YANAK_PRODUCTS = `
  query Products($limit: Int) {
    Products(limit: $limit, where: { visible: { equals: true }}) {
      docs {
        id
        visible
        barcode
        quantity
        price
      }
    }
  }
`

export const DISCOUNT_RANDOM_PRODUCTS = `
  query DiscountRandomProducts {
    Products(where: { discountPrice: { greater_than: 0 }, visible: { equals: true }}, limit: 4) {
      docs {
        id
        slug
        visible
        productType
        weight
        title
        price
        discountPrice
        isBio
        isHomemade
        isChosen
        ${PRODUCT_BRANDS}
        ${META}
      }
    }
  }
`

export const PRODUCT = `
  query Product($slug: String, $draft: Boolean) {
    Products(where: { slug: { equals: $slug }, visible: { equals: true }}, limit: 1, draft: $draft) {
      docs {
        id
        slug
        visible
        productType
        title
        price
        discountPrice
        weight
        isBio
        isHomemade
        isChosen
        isPrestige
        richText
        quantity
        alchoholPercentage
        milliliters
        wineClass
        wineColor
        wineAroma
        wineTaste
        wineTemperature
        ${PRODUCT_CATEGORIES}
        ${PRODUCT_OTHER_CATEGORIES}
        ${PRODUCT_BRANDS}
        ${PRODUCT_GLASSTYPES}
        ${PRODUCT_REGIONS}
        ${PRODUCT_SORTS}
        ${PRODUCT_FOODS}
        ${PRODUCT_TAGS}
        media {
          upload {
            id
            filename
            url
          }
        }
        layout {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
        priceJSON
        enablePaywall
        relatedProducts {
          id
          slug
          title
          ${META}
        }
        ${META}
      }
    }
  }
`

export const PRODUCTS_BY_QUERY = `
  query ProductsByQuery($searchQuery: String) {
    Products(where: { title: { contains: $searchQuery }, visible: { equals: true }}, limit: 300) {
      docs {
        id
        slug
        visible
        productType
        title
        price
        discountPrice
        weight
        isBio
        isHomemade
        isChosen
        ${PRODUCT_BRANDS}
        ${PRODUCT_GLASSTYPES}
        ${META}
      }
    }
  }
`

export const PRODUCT_PAYWALL = `
  query Product($slug: String, $draft: Boolean) {
    Products(where: { slug: { equals: $slug }, visible: { equals: true }}, limit: 1, draft: $draft) {
      docs {
        visible
        paywall {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
      }
    }
  }
`

export const PRESTIGE_PRODUCTS = `
  query PrestigeProducts {
    Products(where: { isPrestige: { equals: true }, visible: { equals: true }}, limit: 300) {
      docs {
        id
        slug
        visible
        productType
        title
        price
        discountPrice
        weight
        isBio
        isHomemade
        isChosen
        ${PRODUCT_BRANDS}
        ${META}
      }
    }
  }
`

export const BIO_PRODUCTS = `
  query BioProducts {
    Products(where: { isBio: { equals: true }, visible: { equals: true }}, limit: 300) {
      docs {
        id
        slug
        visible
        productType
        title
        price
        discountPrice
        weight
        isBio
        isHomemade
        isChosen
        ${PRODUCT_BRANDS}
        ${META}
      }
    }
  }
`

export const PROMOTION_PRODUCTS = `
  query DiscountedProducts {
    Products(where: { discountPrice: { greater_than: 0 }, visible: { equals: true }}, limit: 300) {
      docs {
        id
        slug
        visible
        productType
        title
        price
        discountPrice
        weight
        isBio
        isHomemade
        isChosen
        ${PRODUCT_BRANDS}
        ${META}
      }
    }
  }
`

export const OTHER_PRODUCTS = `
  query OtherProducts {
    Products(where: { productType: { equals: other }, visible: { equals: true }}, limit: 300) {
      docs {
        id
        slug
        visible
        productType
        title
        price
        discountPrice
        weight
        isBio
        isHomemade
        isChosen
        ${PRODUCT_BRANDS}
        ${META}
      }
    }
  }
`
