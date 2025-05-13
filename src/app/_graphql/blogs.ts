import { META } from './meta'

export const BLOGS = `
  query Blog {
    Blogs(limit: 300) {
      docs {
        id
        slug
        title
        richText
        media {
          upload {
            id
            filename
            url
          }
        }
        ${META}
      }
    }
  }
`

export const BLOG = `
  query Blog($slug: String, $draft: Boolean) {
    Blogs(where: { slug: { equals: $slug}}, limit: 1, draft: $draft) {
      docs {
        id
        slug
        title
        richText
        media {
          upload {
            id
            filename
            url
          }
        }
        relatedProductsText
        relatedProducts {
          id
          slug
          title
          price
          discountPrice
          ${META}
        }
        ${META}
      }
    }
  }
`