export const PRODUCT_OTHER_CATEGORIES = `otherCategories {
  title
  id
  breadcrumbs {
    id
    label
  }
}`

export const OTHER_CATEGORIES = `
  query OtherCategories {
    OtherCategories(limit: 300) {
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
