export const PRODUCT_OTHER_CATEGORIES = `spirts {
  title
  id
}`

export const OTHER_CATEGORIES = `
  query Spirts {
    Spirts(limit: 300) {
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
