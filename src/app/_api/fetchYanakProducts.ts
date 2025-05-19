import { YANAK_PRODUCTS } from '../_graphql/products'

export const fetchYanakProducts = async () => {
  const GRAPHQL_API_URL = process.env.NEXT_BUILD
    ? `http://127.0.0.1:${process.env.PORT || 3000}`
    : process.env.NEXT_PUBLIC_SERVER_URL 

  const response = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify({
      query: YANAK_PRODUCTS,
      variables: {
        limit: 1000,
      },
    }),
  })

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`)
  }

  const jsonResponse = await response.json()

  if (jsonResponse.errors) {
    throw new Error(jsonResponse.errors[0].message)
  }

  return jsonResponse.data.Products.docs
}
