import { CART } from './cart'
import { FAVOURITES } from './favourites'

export const ME_QUERY = `query {
  meUser {
    user {
      id
      email
      name
      ${CART}
      ${FAVOURITES}
      roles
    }
    exp
  }
}`
