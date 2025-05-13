import { PRODUCT_BRANDS } from './brands'
import { PRODUCT_CATEGORIES } from './categories'
import { PRODUCT_FOODS } from './foods'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'
import { PRODUCT_REGIONS } from './regions'
import { PRODUCT_SORTS } from './sorts'
import { PRODUCT_OTHER_CATEGORIES } from './spirts'
import { PRODUCT_TAGS } from './tags'

export const CALL_TO_ACTION = `
...on Cta {
  blockType
  invertBackground
  richText
  links {
    link ${LINK_FIELDS()}
  }
}
`

export const CONTENT = `
...on Content {
  blockType
  invertBackground
  columns {
    size
    richText
    enableLink
    link ${LINK_FIELDS()}
  }
}
`

export const MEDIA_BLOCK = `
...on MediaBlock {
  blockType
  invertBackground
  position
  ${MEDIA}
}
`

export const ARCHIVE_BLOCK = `
...on Archive {
  blockType
  introContent
  populateBy
  relationTo
  ${PRODUCT_CATEGORIES}
  ${PRODUCT_BRANDS}
  ${PRODUCT_REGIONS}
  ${PRODUCT_SORTS}
  ${PRODUCT_FOODS}
  ${PRODUCT_OTHER_CATEGORIES}
  ${PRODUCT_TAGS}
  limit
  selectedDocs {
    relationTo
    value {
      ...on Product {
        id
        slug
        title
        priceJSON
      }
    }
  }
  populatedDocs {
    relationTo
    value {
      ...on Product {
        id
        slug
        title
        priceJSON
        ${PRODUCT_CATEGORIES}
        ${PRODUCT_BRANDS}
        ${PRODUCT_REGIONS}
        ${PRODUCT_SORTS}
        ${PRODUCT_FOODS}
        ${PRODUCT_OTHER_CATEGORIES}
        ${PRODUCT_TAGS}
        ${META}
      }
    }
  }
  populatedDocsTotal
  showOnlyDiscountedProducts
  showOnlyOtherProducts
}
`

export const TWOROWCAROUSEL_BLOCK = `
...on TwoRowCarousel {
  blockType
  name
  ${MEDIA}
  reverse
  firstCarousel {
    populateBy
    relationTo
    ${PRODUCT_CATEGORIES}
    ${PRODUCT_BRANDS}
    ${PRODUCT_REGIONS}
    ${PRODUCT_SORTS}
    ${PRODUCT_FOODS}
    ${PRODUCT_OTHER_CATEGORIES}
    ${PRODUCT_TAGS}
    limit
    priceOver
    priceLimit
    selectedDocs {
      relationTo
      value {
        ...on Product {
          id
          slug
          title
          priceJSON
        }
      }
    }
    populatedDocs {
      relationTo
      value {
        ...on Product {
          id
          slug
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
    populatedDocsTotal
    showOnlyDiscountedProducts
    showOnlyOtherProducts
  }
  secondCarousel {
    populateBy
    relationTo
    ${PRODUCT_CATEGORIES}
    ${PRODUCT_BRANDS}
    ${PRODUCT_REGIONS}
    ${PRODUCT_SORTS}
    ${PRODUCT_FOODS}
    ${PRODUCT_OTHER_CATEGORIES}
    ${PRODUCT_TAGS}
    limit
    priceOver
    priceLimit
    selectedDocs {
      relationTo
      value {
        ...on Product {
          id
          slug
          title
          priceJSON
        }
      }
    }
    populatedDocs {
      relationTo
      value {
        ...on Product {
          id
          slug
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
    populatedDocsTotal
    showOnlyDiscountedProducts
    showOnlyOtherProducts
  }
}
`

export const WOBBLECARDS_BLOCK = `
...on WobbleCards {
  blockType
  card1 { 
    ${MEDIA}
    cardTitle
    cardSubTitle
    relationTo
    ${PRODUCT_CATEGORIES}
    ${PRODUCT_BRANDS}
    ${PRODUCT_REGIONS}
    ${PRODUCT_SORTS}
    ${PRODUCT_FOODS}
    ${PRODUCT_OTHER_CATEGORIES}
  }
  card2 { 
    ${MEDIA}
    cardTitle
    cardSubTitle
    relationTo
    ${PRODUCT_CATEGORIES}
    ${PRODUCT_BRANDS}
    ${PRODUCT_REGIONS}
    ${PRODUCT_SORTS}
    ${PRODUCT_FOODS}
    ${PRODUCT_OTHER_CATEGORIES}
  }
  card3 { 
    ${MEDIA}
    cardTitle
    cardSubTitle
    relationTo
    ${PRODUCT_CATEGORIES}
    ${PRODUCT_BRANDS}
    ${PRODUCT_REGIONS}
    ${PRODUCT_SORTS}
    ${PRODUCT_FOODS}
    ${PRODUCT_OTHER_CATEGORIES}
  }
  card4 { 
    ${MEDIA}
    cardTitle
    cardSubTitle
    relationTo
    ${PRODUCT_CATEGORIES}
    ${PRODUCT_BRANDS}
    ${PRODUCT_REGIONS}
    ${PRODUCT_SORTS}
    ${PRODUCT_FOODS}
    ${PRODUCT_OTHER_CATEGORIES}
  }
  card5 { 
    ${MEDIA}
    cardTitle
    cardSubTitle
    relationTo
    ${PRODUCT_CATEGORIES}
    ${PRODUCT_BRANDS}
    ${PRODUCT_REGIONS}
    ${PRODUCT_SORTS}
    ${PRODUCT_FOODS}
    ${PRODUCT_OTHER_CATEGORIES}
  }
}
`

export const BANNERPRODUCT_BLOCK = `
...on BannerProduct {
  blockType
  reverse
  selectedDoc {
    relationTo
    value {
      ...on Product {
        id
        slug
        title
        price
        discountPrice
        ${META}
      }
    }
  }
}
`

export const PROMOTION_BLOCK = `
...on PromotionBlock {
  blockType
  ${MEDIA}
  richText
}
`
