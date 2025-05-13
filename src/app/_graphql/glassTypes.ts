export const PRODUCT_GLASSTYPES = `glassTypes {
  title
  id
  richText
  media {
    alt
    width
    height
    url
    filename
  }
}`

export const GLASSTYPES = `
  query GlassTypes {
    GlassTypes(limit: 300) {
      docs {
        id
        title
        richText
        media {
          alt
          width
          height
          url
          filename
        }
      }
    }
  }
`
