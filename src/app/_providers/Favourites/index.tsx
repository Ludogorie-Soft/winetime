'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'

import { Product, User } from '../../../payload/payload-types'
import { useAuth } from '../Auth'
import { FavouriteItem, favouritesReducer } from './reducer'

export type FavouritesContext = {
  favourites: User['favourites']
  addItemToFavourites: (item: FavouriteItem) => void
  deleteItemFromFavourites: (product: Product) => void
  favouritesIsEmpty: boolean | undefined
  clearFavourites: () => void
  isProductInFavourites: (product: Product) => boolean
  favouritesTotal: {
    formatted: string
    raw: number
  }
  hasInitializedFavourites: boolean
}

const Context = createContext({} as FavouritesContext)

export const useFavourites = () => useContext(Context)

const arrayHasItems = array => Array.isArray(array) && array.length > 0

export const FavouritesProvider = props => {
  const { children } = props
  const { user, status: authStatus } = useAuth()

  const [favourites, dispatchFavourites] = useReducer(favouritesReducer, {
    items: [],
  })

  const [total, setTotal] = useState<{
    formatted: string
    raw: number
  }>({
    formatted: '0.00',
    raw: 0,
  })

  const hasInitialized = useRef(false)
  const [hasInitializedFavourites, setHasInitialized] = useState(false)

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true

      const syncFavouritesFromLocalStorage = async () => {
        const localFavourites = localStorage.getItem('favourites')

        const parsedFavourites = JSON.parse(localFavourites || '{}')

        if (parsedFavourites?.items && parsedFavourites?.items?.length > 0) {
          const initialFavourites = await Promise.all(
            parsedFavourites.items.map(async ({ product, quantity }) => {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${product}`,
              )
              const data = await res.json()
              return {
                product: data,
                quantity,
              }
            }),
          )

          dispatchFavourites({
            type: 'SET_FAVOURITES',
            payload: {
              items: initialFavourites,
            },
          })
        } else {
          dispatchFavourites({
            type: 'SET_FAVOURITES',
            payload: {
              items: [],
            },
          })
        }
      }

      syncFavouritesFromLocalStorage()
    }
  }, [])

  useEffect(() => {
    if (!hasInitialized.current) return

    if (authStatus === 'loggedIn') {
      dispatchFavourites({
        type: 'MERGE_FAVOURITES',
        payload: user?.favourites,
      })
    }

    if (authStatus === 'loggedOut') {
      dispatchFavourites({
        type: 'CLEAR_FAVOURITES',
      })
    }
  }, [user, authStatus])

  useEffect(() => {
    if (!hasInitialized.current || user === undefined) return

    const flattenedFavourites = {
      ...favourites,
      items: favourites?.items
        ?.map(item => {
          if (!item?.product || typeof item?.product !== 'object') {
            return null
          }

          return {
            ...item,
            // flatten relationship to product
            product: item?.product?.id,
          }
        })
        .filter(Boolean) as FavouriteItem[],
    }

    if (user) {
      try {
        const syncFavouritesToPayload = async () => {
          const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
            // Make sure to include cookies with fetch
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify({
              favourites: flattenedFavourites,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          })

          if (req.ok) {
            localStorage.setItem('favourites', '[]')
          }
        }

        syncFavouritesToPayload()
      } catch (e) {
        console.error('Error while syncing favourites to Payload.') // eslint-disable-line no-console
      }
    } else {
      localStorage.setItem('favourites', JSON.stringify(flattenedFavourites))
    }

    setHasInitialized(true)
  }, [user, favourites])

  const isProductInFavourites = useCallback(
    (incomingProduct: Product): boolean => {
      let isInFavourites = false
      const { items: itemsInFavourites } = favourites || {}
      if (Array.isArray(itemsInFavourites) && itemsInFavourites.length > 0) {
        isInFavourites = Boolean(
          itemsInFavourites.find(({ product }) =>
            typeof product === 'string'
              ? product === incomingProduct.id
              : product?.id === incomingProduct.id,
          ), // eslint-disable-line function-paren-newline
        )
      }
      return isInFavourites
    },
    [favourites],
  )

  const addItemToFavourites = useCallback(incomingItem => {
    dispatchFavourites({
      type: 'ADD_ITEM',
      payload: incomingItem,
    })
  }, [])

  const deleteItemFromFavourites = useCallback((incomingProduct: Product) => {
    dispatchFavourites({
      type: 'DELETE_ITEM',
      payload: incomingProduct,
    })
  }, [])

  const clearFavourites = useCallback(() => {
    dispatchFavourites({
      type: 'CLEAR_FAVOURITES',
    })
  }, [])

  return (
    <Context.Provider
      value={{
        favourites,
        addItemToFavourites,
        deleteItemFromFavourites,
        favouritesIsEmpty: hasInitializedFavourites && !arrayHasItems(favourites?.items),
        clearFavourites,
        isProductInFavourites,
        favouritesTotal: total,
        hasInitializedFavourites,
      }}
    >
      {children && children}
    </Context.Provider>
  )
}
