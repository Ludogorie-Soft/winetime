import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK, TWOROWCAROUSEL_BLOCK, BANNERPRODUCT_BLOCK, WOBBLECARDS_BLOCK, PROMOTION_BLOCK } from './blocks';
import { LINK_FIELDS } from './link';
import { MEDIA } from './media';
import { META } from './meta';
import { PRODUCT_REGIONS } from './regions'
import { PRODUCT_SORTS } from './sorts'
import { PRODUCT_OTHER_CATEGORIES } from './spirts'
import { PRODUCT_BRANDS } from './brands'
import { PRODUCT_CATEGORIES } from './categories'
import { PRODUCT_FOODS } from './foods'
import { PRODUCT_TAGS } from './tags';

export const PAGES = `
  query Pages {
    Pages(limit: 300, where: { slug: { not_equals: "cart" } })  {
      docs {
        slug
      }
    }
  }
`

export const PAGE = `
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { AND: [{ slug: { equals: $slug }}] }, limit: 1, draft: $draft) {
      docs {
        id
        title
        hero {
          type
          richText
          relationTo
          ${PRODUCT_CATEGORIES}
          ${PRODUCT_BRANDS}
          ${PRODUCT_REGIONS}
          ${PRODUCT_SORTS}
          ${PRODUCT_FOODS}
          ${PRODUCT_OTHER_CATEGORIES}
          ${PRODUCT_TAGS}
          ${MEDIA}
        }
        layout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
          ${TWOROWCAROUSEL_BLOCK}
          ${BANNERPRODUCT_BLOCK}
          ${WOBBLECARDS_BLOCK}
          ${PROMOTION_BLOCK}
        }
        ${META}
      }
    }
  }
`
