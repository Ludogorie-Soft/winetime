export const PRODUCT_TAGS = `tags {
  title
  id
}`

export const TAGS = `
  query Tags {
    Tags(limit: 20) {
      docs {
        id
        title
      }
    }
  }
`
