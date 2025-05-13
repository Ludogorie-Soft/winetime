export const PRODUCT_FOODS = `foods {
  title
  id
  media {
    alt
    width
    height
    url
  }
}`

export const FOODS = `
  query Foods {
    Foods(limit: 300) {
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
