import { BRAND } from '../_graphql/brands'
import { GRAPHQL_API_URL } from './shared'

export const fetchBrandById = async <T>(args: { id: string }): Promise<T | null> => {
  const { id } = args || {}

  const brand: T | null = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: BRAND,
      variables: {
        id,
      },
    }),
  })
    .then(res => res.json())
    .then(res => {
      if (res.errors) {
        throw new Error(res?.errors?.[0]?.message ?? 'Error fetching brand')
      }
      return res?.data?.Brands?.docs?.[0] || null
    })
    .catch(err => {
      console.error('Error fetching brand:', err)
      return null
    })

  return brand
}
