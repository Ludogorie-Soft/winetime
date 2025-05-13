export const PRODUCT_SORTS= `sorts {
  title
  id
}`

export const SORTS = `
  query Sorts {
    Sorts(limit: 300) {
      docs {
        id
        title
      }
    }
  }
`
