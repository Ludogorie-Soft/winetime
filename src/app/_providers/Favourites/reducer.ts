import type { FavouriteItems, Product, User } from '../../../payload/payload-types'

export type FavouriteItem = FavouriteItems[0]

type FavouritesType = User['favourites']

type FavouritesAction =
  | {
      type: 'SET_FAVOURITES'
      payload: FavouritesType
    }
  | {
      type: 'MERGE_FAVOURITES'
      payload: FavouritesType
    }
  | {
      type: 'ADD_ITEM'
      payload: FavouriteItem
    }
  | {
      type: 'DELETE_ITEM'
      payload: Product
    }
  | {
      type: 'CLEAR_FAVOURITES'
    }

export const favouritesReducer = (favourites: FavouritesType, action: FavouritesAction): FavouritesType => {
  switch (action.type) {
    case 'SET_FAVOURITES': {
      return action.payload
    }

    case 'MERGE_FAVOURITES': {
      const { payload: incomingFavourites } = action

      const syncedItems: FavouriteItem[] = [
        ...(favourites?.items || []),
        ...(incomingFavourites?.items || []),
      ].reduce((acc: FavouriteItem[], item) => {
        // remove duplicates
        const productId = typeof item.product === 'string' ? item.product : item?.product?.id

        const indexInAcc = acc.findIndex(({ product }) =>
          typeof product === 'string' ? product === productId : product?.id === productId,
        ) // eslint-disable-line function-paren-newline

        if (indexInAcc > -1) {
          acc[indexInAcc] = {
            ...acc[indexInAcc],
            // customize the merge logic here, e.g.:
            // quantity: acc[indexInAcc].quantity + item.quantity
          }
        } else {
          acc.push(item)
        }
        return acc
      }, [])

      return {
        ...favourites,
        items: syncedItems,
      }
    }

    case 'ADD_ITEM': {
      const { payload: incomingItem } = action
      const productId =
        typeof incomingItem.product === 'string' ? incomingItem.product : incomingItem?.product?.id

      const indexInFavourites = favourites?.items?.findIndex(({ product }) =>
        typeof product === 'string' ? product === productId : product?.id === productId,
      ) // eslint-disable-line function-paren-newline

      let withAddedItem = [...(favourites?.items || [])]

      if (indexInFavourites === -1) {
        withAddedItem.push(incomingItem)
      }

      if (typeof indexInFavourites === 'number' && indexInFavourites > -1) {
        withAddedItem[indexInFavourites] = {
          ...withAddedItem[indexInFavourites],
        }
      }

      return {
        ...favourites,
        items: withAddedItem,
      }
    }

    case 'DELETE_ITEM': {
      const { payload: incomingProduct } = action
      const withDeletedItem = { ...favourites }

      const indexInFavourites = favourites?.items?.findIndex(({ product }) =>
        typeof product === 'string'
          ? product === incomingProduct.id
          : product?.id === incomingProduct.id,
      ) // eslint-disable-line function-paren-newline

      if (typeof indexInFavourites === 'number' && withDeletedItem.items && indexInFavourites > -1)
        withDeletedItem.items.splice(indexInFavourites, 1)

      return withDeletedItem
    }

    case 'CLEAR_FAVOURITES': {
      return {
        ...favourites,
        items: [],
      }
    }

    default: {
      return favourites
    }
  }
}
