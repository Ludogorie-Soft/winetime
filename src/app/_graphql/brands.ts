export const PRODUCT_BRANDS = `brands {
  title
  id
  richText
  media {
    alt
    width
    height
    filename
  }
}`

export const BRANDS = `
  query Brands {
    Brands(limit: 300) {
      docs {
        id
        title
        media {
          alt
          width
          height
          url
        }
      }
    }
  }
`

export const BRAND = `
  query Brand($id: String!) {
    Brands(where: { id: { equals: $id } }, limit: 1) {
      docs {
        id
        title
        richText
        media {
          alt
          width
          height
          filename
        }
      }
    }
  }
`
