import { META } from './meta'

export const FAVOURITES = `cart {
  items {
    product {
      id
      slug
      priceJSON
      ${META}
    }
  }
}`
