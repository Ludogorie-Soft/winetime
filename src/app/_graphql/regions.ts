export const PRODUCT_REGIONS = `regions {
  title
  id
}`

export const REGIONS = `
  query Regions {
    Regions(limit: 300) {
      docs {
        id
        title
        media {
          alt
          width
          height
          url
        }
        otherRegion
      }
    }
  }
`
