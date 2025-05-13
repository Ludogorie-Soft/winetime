import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import type { Config } from '../../payload/payload-types'
import { CATEGORIES } from '../_graphql/categories'
import { ORDERS } from '../_graphql/orders'
import { PAGES } from '../_graphql/pages'
import { BRANDS } from '../_graphql/brands'
import { GLASSTYPES } from '../_graphql/glassTypes'
import { PRODUCTS } from '../_graphql/products'
import { GRAPHQL_API_URL } from './shared'
import { payloadToken } from './token'
import { FOODS } from '../_graphql/foods'
import { REGIONS } from '../_graphql/regions'
import { SORTS } from '../_graphql/sorts'
import { OTHER_CATEGORIES as OTHER_BEVERAGES } from '../_graphql/spirts'
import { OTHER_CATEGORIES } from '../_graphql/otherCategories'
import { BLOGS } from '../_graphql/blogs'

const queryMap = {
  pages: {
    query: PAGES,
    key: 'Pages',
  },
  products: {
    query: PRODUCTS,
    key: 'Products',
  },
  foods: {
    query: FOODS,
    key: 'Foods',
  },
  brands: {
    query: BRANDS,
    key: 'Brands',
  },
  glassTypes: {
    query: GLASSTYPES,
    key: 'Glass Types',
  },
  sorts: {
    query: SORTS,
    key: 'Sorts',
  },
  regions: {
    query: REGIONS,
    key: 'Regions',
  },
  orders: {
    query: ORDERS,
    key: 'Orders',
  },
  categories: {
    query: CATEGORIES,
    key: 'Categories',
  },
  spirts: {
    query: OTHER_BEVERAGES,
    key: 'Spirts',
  },
  otherCategories: {
    query: OTHER_CATEGORIES,
    key: 'OtherCategories',
  },
  blog: {
    query: BLOGS,
    key: 'Blogs',
  },
}

export const fetchDocs = async <T>(
  collection: keyof Config['collections'],
  draft?: boolean,
): Promise<T[]> => {
  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`)

  let token: RequestCookie | undefined

  if (draft) {
    const { cookies } = await import('next/headers')
    token = cookies().get(payloadToken)
  }

  const docs: T[] = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token?.value && draft ? { Authorization: `JWT ${token.value}` } : {}),
    },
    cache: 'no-store',
    next: { tags: [collection] },
    body: JSON.stringify({
      query: queryMap[collection].query,
    }),
  })
    ?.then(res => res.json())
    ?.then(res => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching docs')
      return res?.data?.[queryMap[collection].key]?.docs
    })

  return docs
}
